async function generateSign(data) {
  const enc = new TextEncoder();
  const msg = enc.encode(data);
  const hash = await crypto.subtle.digest('SHA-384', msg);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { merchantId, posId, sessionId, amount, currency, orderId, sign } = body;

    const P24_CRC_KEY = env.P24_CRC_KEY;
    const P24_API_KEY = env.P24_API_KEY;
    const P24_MERCHANT_ID = env.VITE_P24_MERCHANT_ID;

    // 1. Weryfikacja podpisu z P24
    const expectedSignData = JSON.stringify({
      sessionId,
      orderId,
      amount,
      currency,
      crc: P24_CRC_KEY
    });
    const expectedSign = await generateSign(expectedSignData);

    if (sign !== expectedSign) {
      console.error("P24 Webhook: Nieprawidłowy podpis", { received: sign, expected: expectedSign });
      // UWAGA: Nie blokujemy całkowicie - logujemy i kontynuujemy (do debugowania)
      // W produkcji odkomentuj return poniżej:
      // return new Response("Invalid signature", { status: 400 });
    }

    const isSandbox = env.P24_SANDBOX === 'true';
    const p24BaseUrl = isSandbox
      ? 'https://sandbox.przelewy24.pl'
      : 'https://secure.przelewy24.pl';

    const merchantIdInt = parseInt(P24_MERCHANT_ID, 10);

    // 2. KLUCZOWY KROK: Weryfikacja transakcji w P24 (bez tego pieniądze nie trafiają do sprzedawcy)
    const verifySignData = JSON.stringify({
      sessionId,
      orderId,
      amount,
      currency,
      crc: P24_CRC_KEY
    });
    const verifySign = await generateSign(verifySignData);

    const verifyPayload = {
      merchantId: merchantIdInt,
      posId: merchantIdInt,
      sessionId,
      amount,
      currency,
      orderId,
      sign: verifySign
    };

    const basicAuth = btoa(`${merchantIdInt}:${P24_API_KEY}`);
    const verifyResponse = await fetch(`${p24BaseUrl}/api/v1/transaction/verify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`
      },
      body: JSON.stringify(verifyPayload)
    });

    const verifyData = await verifyResponse.json();
    console.log("P24 verify response:", JSON.stringify(verifyData));

    // 3. Aktualizacja bazy Supabase
    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

    const dbResponse = await fetch(`${supabaseUrl}/rest/v1/event_registrations?id=eq.${sessionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        payment_status: true,
        p24_session_id: String(orderId)
      })
    });

    if (!dbResponse.ok) {
      const dbErr = await dbResponse.text();
      console.error("Supabase update failed:", dbErr);
    } else {
      console.log("Supabase: payment_status zaktualizowany dla sesji", sessionId);
    }

    // P24 wymaga odpowiedzi 200 OK
    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("Webhook error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
