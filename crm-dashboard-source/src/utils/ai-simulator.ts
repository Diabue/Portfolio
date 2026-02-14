/**
 * Simulates AI summarization by extracting the core message content.
 * It removes quoted replies, signatures, and legal disclaimers.
 * If an API Key is provided, it uses Google Gemini to generate a real summary.
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface AIResponse {
    summary: string;
    status: 'Potential' | 'Customer' | 'Cold' | 'Won' | 'Lost';
}

// Pre-defined summaries for demo
const DEMO_SUMMARIES: Record<string, AIResponse> = {
    "Enterprise Plan Inquiry": {
        summary: "Interested in Enterprise plan. Wants a call to discuss pricing.",
        status: "Potential"
    },
    "Free Trial Question": {
        summary: "Asking about free trial availability.",
        status: "Lead"
    },
    "Re: Meeting": {
        summary: "Confirmed meeting for tomorrow at 10 AM.",
        status: "Won" // Or 'Customer', but Won implies deal progress
    }
};

export const analyzeEmailAI = async (text: string): Promise<AIResponse> => {
    // Check for demo content match (simple heuristic by subject or key text if passed, 
    // but here we only have 'text'. Let's match by content substring unique to our mocks)

    if (text.includes("Enterprise plan. Can we hop on a call")) {
        return DEMO_SUMMARIES["Enterprise Plan Inquiry"];
    }
    if (text.includes("offer a free trial")) {
        return DEMO_SUMMARIES["Free Trial Question"];
    }
    if (text.includes("Meeting confirmation")) {
        return DEMO_SUMMARIES["Re: Meeting"];
    }

    // 1. Basic cleaning
    const lines = text.split(/\r?\n/);
    let cleanLines: string[] = [];
    for (const line of lines) {
        const trimmed = line.trim();
        // Aggressive stripping of reply headers and common noise
        if (
            trimmed.match(/^On.*wrote:$/i) ||
            trimmed.match(/^Le.*écrit :$/i) ||
            trimmed.match(/^W dniu.*pisze:$/i) ||
            trimmed.match(/.*wrote:$/i) ||
            trimmed.match(/^From:.*$/i) ||
            trimmed.startsWith('>') ||
            trimmed.startsWith('[image:') // Skip image placeholders
        ) {
            break;
        }
        if (trimmed === '--' || trimmed === '___' || trimmed.includes('Sent from my iPhone')) break;
        if (trimmed.length > 0) cleanLines.push(trimmed);
    }
    let coreText = cleanLines.join(' ');
    // Remove URLs for safety/cleanliness
    coreText = coreText.replace(/https?:\/\/[^\s]+/g, '[URL]');

    if (coreText.length > 2000) coreText = coreText.substring(0, 2000);

    // Default response (fallback)
    const defaultResponse: AIResponse = {
        summary: coreText.substring(0, 80) + (coreText.length > 80 ? '...' : ''),
        status: 'Potential'
    };

    if (!API_KEY) {
        // console.warn("Gemini API Key missing. Using fallback summary.");
        return defaultResponse;
    }

    try {
        console.log("Analyzing email with Gemini...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `
                        You are a CRM assistant. Analyze the email content below.
                        
                        TASKS:
                        1. Generate a VERY short summary (max 10 words). Focus ONLY on the intent (e.g., "Wants meeting Friday", "Asking for price"). IGNORE names, dates, greetings, and signature.
                        2. Predict the lead status. Options: 'Lead', 'Potential', 'Cold', 'Refused'.
                        IMPORTANT: DO NOT USE 'Customer' status. 'Customer' is reserved for manual assignment only.
                        
                        Return ONLY raw JSON: { "summary": "...", "status": "..." }
                        
                        Email Body: "${coreText}"`
                    }]
                }]
            })
        });

        if (!response.ok) {
            console.error(`Gemini API Error: ${response.status}`);
            return defaultResponse;
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
            const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(jsonText);
            return {
                summary: parsed.summary || defaultResponse.summary,
                status: parsed.status || 'Potential'
            };
        }
    } catch (error) {
        console.error("Gemini AI Exception:", error);
    }

    return defaultResponse;
};
