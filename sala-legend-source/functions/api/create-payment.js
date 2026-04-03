async function generateSign(data) {
  const enc = new TextEncoder();
  const msg = enc.encode(data);
  const hash = await crypto.subtle.digest('SHA-384', msg);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function onRequestPost({ request, env }) {
  // CORS headers - potrzebne przy requestach z przeglądarki
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const { registrationId, eventId, price, email, successUrl } = body;

    if (!registrationId || !eventId || !price || !email) {
      return new Response(JSON.stringify({ error: "Brak wymaganych parametrów" }), { status: 400, headers: corsHeaders });
    }

    const P24_MERCHANT_ID = env.VITE_P24_MERCHANT_ID;
    const P24_API_KEY = env.P24_API_KEY;
    const P24_CRC_KEY = env.P24_CRC_KEY;
    
    if (!P24_MERCHANT_ID || !P24_API_KEY || !P24_CRC_KEY) {
        return new Response(JSON.stringify({ 
          error: "Brak konfiguracji serwera - sprawdź zmienne środowiskowe w Cloudflare",
          missing: {
            VITE_P24_MERCHANT_ID: !P24_MERCHANT_ID,
            P24_API_KEY: !P24_API_KEY,
            P24_CRC_KEY: !P24_CRC_KEY
          }
        }), { status: 500, headers: corsHeaders });
    }

    // Sandbox = testy, Produkcja = prawdziwe płatności
    // Ustaw P24_SANDBOX=true w Cloudflare żeby używać środowiska testowego
    const isSandbox = env.P24_SANDBOX === 'true';
    const p24BaseUrl = isSandbox
      ? 'https://sandbox.przelewy24.pl'
      : 'https://secure.przelewy24.pl';


    const merchantId = parseInt(P24_MERCHANT_ID, 10);
    const sessionId = registrationId;
    const amountInGrosze = Math.round(parseFloat(price) * 100);
    const currency = "PLN";

    // Generowanie Sign wg dokumentacji P24 v1
    // SHA384 of JSON string: {"sessionId":"...","merchantId":N,"amount":N,"currency":"PLN","crc":"..."}
    const signInput = JSON.stringify({
      sessionId,
      merchantId,
      amount: amountInGrosze,
      currency,
      crc: P24_CRC_KEY
    });
    const sign = await generateSign(signInput);

    const payload = {
      merchantId,
      posId: merchantId,
      sessionId,
      amount: amountInGrosze,
      currency,
      description: "Rezerwacja - Sala Legend",
      email,
      country: "PL",
      language: "pl",
      urlReturn: successUrl || `https://${new URL(request.url).hostname}/`,
      urlStatus: `https://${new URL(request.url).hostname}/api/p24-webhook`,
      sign
    };

    // Basic Auth: merchantId:apiKey (zgodnie z dokumentacją P24)
    const basicAuth = btoa(`${merchantId}:${P24_API_KEY}`);
    
    const p24Response = await fetch(`${p24BaseUrl}/api/v1/transaction/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${basicAuth}`
      },
      body: JSON.stringify(payload)
    });

    const rawText = await p24Response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return new Response(JSON.stringify({ 
        error: "P24 zwróciło niepoprawny JSON", 
        rawResponse: rawText,
        httpStatus: p24Response.status
      }), { status: 500, headers: corsHeaders });
    }
    
    if (data?.data?.token) {
       const redirectUrl = `${p24BaseUrl}/trnRequest/${data.data.token}`;
       return new Response(JSON.stringify({ url: redirectUrl }), { headers: corsHeaders });
    } else {
       // Zwracamy PEŁNY błąd z P24 żeby było wiadomo co nie gra
       return new Response(JSON.stringify({ 
         error: "Nie udało się zarejestrować transakcji P24",
         p24Error: data,
         sentPayload: { ...payload, sign: '***' }, // maskujemy sign dla bezpieczeństwa
         httpStatus: p24Response.status
       }), { status: 500, headers: corsHeaders });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Błąd serwera' }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
