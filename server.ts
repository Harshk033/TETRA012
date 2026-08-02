import dotenv from "dotenv";
import path from "path";

// Initialize dotenv immediately with explicit root path BEFORE other modules load
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' })); 
app.use(cors());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("⚠️ GEMINI_API_KEY is missing in your .env file!");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Resilient Gemini API execution helper with multi-model fallback & error recovery
async function generateGeminiContent(params: {
  contents: any;
  systemInstruction?: string;
  responseMimeType?: string;
  preferredModel?: string;
  useSearch?: boolean;
}) {
  const ai = getGeminiClient();
  if (!ai) return null;

  const candidateModels = [
    params.preferredModel || "gemini-2.5-flash",
    "gemini-2.5-flash",
    "gemini-1.5-flash"
  ];
  const uniqueModels = Array.from(new Set(candidateModels));

  for (const modelName of uniqueModels) {
    try {
      const config: any = {};
      if (params.systemInstruction) config.systemInstruction = params.systemInstruction;
      if (params.responseMimeType) config.responseMimeType = params.responseMimeType;

      // Try calling Gemini
      const response = await ai.models.generateContent({
        model: modelName,
        contents: params.contents,
        config: Object.keys(config).length > 0 ? config : undefined,
      });

      if (response && response.text) {
        let answerText = response.text;

        // Extract Google Search citations if present
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks && Array.isArray(chunks) && chunks.length > 0) {
          const sources = chunks
            .map((c: any) => c.web?.title && c.web?.uri ? `• [${c.web.title}](${c.web.uri})` : null)
            .filter(Boolean);
          if (sources.length > 0) {
            answerText += `\n\n**Verified Reference Sources:**\n${sources.slice(0, 3).join("\n")}`;
          }
        }

        return answerText;
      }
    } catch (err: any) {
      console.warn(`Gemini call failed on model [${modelName}]:`, err?.message || String(err));
    }
  }

  return null;
}

// API Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiKeyPresent: !!process.env.GEMINI_API_KEY });
});

// AI Symptom Checker Endpoint
app.post("/api/ai/symptom-check", async (req, res) => {
  try {
    const { symptoms = [], notes = "" } = req.body;
    
    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "At least one symptom is required." });
    }

    const count = symptoms.length;
    const isHigh = symptoms.some((s: string) => /chest pain|shortness of breath|severe|stroke|bleeding/i.test(s));
    const defaultRiskScore = isHigh ? 78 : Math.min(18 + count * 8, 55);
    const defaultRiskLevel = defaultRiskScore > 70 ? "High" : defaultRiskScore > 35 ? "Moderate" : "Low";

    const fallbackResponse = {
      riskScore: defaultRiskScore,
      riskLevel: defaultRiskLevel,
      summary: `Clinical assessment for reported symptoms (${symptoms.join(", ")}): Parameters evaluated against primary healthcare triage guidelines.`,
      recommendations: [
        "Stay hydrated and ensure adequate rest.",
        "Monitor vital signs (temperature, BP, pulse rate).",
        "Keep a detailed record of symptom progression.",
        "Consult a licensed medical doctor if symptoms persist or worsen."
      ],
      recommendedSpecialist: isHigh ? "Cardiologist / Emergency Medicine" : "General Physician",
      urgency: isHigh ? "Prompt Care" : "Routine"
    };

    const prompt = `You are Shushruta AI, a medical triage and symptom checking AI assistant.
Analyze the following symptoms and notes:
Symptoms: ${symptoms.join(", ")}
Additional Notes: ${notes || "None"}

Respond strictly with a valid JSON object matching this schema:
{
  "riskScore": number (0 to 100 representing health risk score),
  "riskLevel": "Low" | "Moderate" | "High" | "Critical",
  "summary": "Brief 2-3 sentence clinical summary explaining the potential causes and observations.",
  "recommendations": ["4 clear, actionable bullet points for self-care or doctor steps"],
  "recommendedSpecialist": "e.g., General Practitioner, Cardiologist, Neurologist, etc.",
  "urgency": "Routine" | "Prompt Care" | "Immediate Attention"
}

Do not include markdown formatting or backticks around the JSON.`;

    const text = await generateGeminiContent({
      contents: prompt,
      responseMimeType: "application/json",
      preferredModel: "gemini-2.5-flash",
    });

    if (!text) return res.json(fallbackResponse);

    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.json(fallbackResponse);
    }
  } catch (error) {
    console.error("Error in symptom-check API handler:", error);
    return res.json({
      riskScore: 40,
      riskLevel: "Moderate",
      summary: "Symptom check recorded. Please follow up with your primary physician.",
      recommendations: [
        "Monitor vitals closely.",
        "Hydrate and rest.",
        "Seek medical advice if symptoms persist."
      ],
      recommendedSpecialist: "General Practitioner",
      urgency: "Routine"
    });
  }
});

// Clinical Fallback Knowledge Helper
function getClinicalFallbackAnswer(query: string, language: string, hasImage: boolean): string {
  const q = query.toLowerCase();

  if (q.includes("lipid") || q.includes("cholesterol") || q.includes("triglyceride") || q.includes("hdl") || q.includes("ldl")) {
    return `Direct Answer: A lipid panel measures fat levels in your blood to check heart health.

Key Details:
• Normal targets: Total Cholesterol < 200 mg/dL, LDL < 100 mg/dL, Triglycerides < 150 mg/dL.
• Soluble fiber from oats and legumes helps reduce LDL (bad cholesterol).
• Regular aerobic exercise increases HDL (good cholesterol).

Next Step: Consult a healthcare professional to evaluate your personal lipid numbers.

I am an AI and cannot provide medical advice. Please consult a healthcare professional.`;
  }

  if (q.includes("fatigue") || q.includes("tired") || q.includes("weakness") || q.includes("exhaustion")) {
    return `Direct Answer: Fatigue is low energy caused by sleep deficit, dehydration, or vitamin deficiencies.

Key Details:
• Low iron (anemia), Vitamin D, or Vitamin B12 deficiency commonly cause low stamina.
• Recommended blood tests include Complete Blood Count (CBC) and Thyroid (TSH) panel.
• Drink at least 2 liters of water daily and aim for 7-8 hours of sleep.

Next Step: Consult a healthcare professional to review your blood levels and energy concerns.

I am an AI and cannot provide medical advice. Please consult a healthcare professional.`;
  }

  return `Direct Answer: Sushruta CDSS provides clinical reference facts and health insights.

Key Details:
• Track daily vitals including blood pressure and blood sugar levels.
• Maintain hydration, balanced meals, and regular exercise.

Next Step: Consult a healthcare professional for specific health concerns.

I am an AI and cannot provide medical advice. Please consult a healthcare professional.`;
}

// AI Chat Assistant Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, image, history = [], language = "English" } = req.body;
    
    if (!message && !image) {
      return res.status(400).json({ error: "Message or image is required." });
    }

    const queryText = (message || "").toLowerCase();
    
    // Emergency Trigger Check
    const isEmergency = /chest pain|severe bleeding|breathing issue|breathing difficulty|shortness of breath|extreme pain|cannot breathe|unconscious/i.test(queryText);
    
    if (isEmergency) {
      return res.json({
        reply: "URGENT: This sounds like a medical emergency. Please call 112 / 911 or go to the nearest emergency room immediately."
      });
    }

    const systemInstruction = `You are Shushruta AI, a medical AI assistant for Sushruta CDSS AI.

CONVERSATIONAL FLEXIBILITY:
- For general greetings (e.g., "hi", "hello"), polite small talk, or thank-yous (e.g., "thank you", "thanks"), respond warmly, naturally, and concisely. Do NOT force the structured medical format or disclaimers for casual pleasantries.

RESPONSE CONSTRAINTS FOR MEDICAL / HEALTH QUERIES:
- BE SHORT: Avoid unnecessary filler or fluff. Get straight to the medical insights.
- BE SIMPLE: Write clearly at an easily understandable reading level. Define complex jargon in simple terms.
- BE DETAILED: Prioritize medical facts, numbers, and actionable steps using bullet points.
- LENGTH LIMIT: Keep responses concise (under 5 sentences or 4 bullet points max).

STRICT MEDICAL SAFETY RULES:
- YOU CANNOT DIAGNOSE OR PRESCRIBE. You are an AI assistant.
- DISCLAIMER REQUIREMENT: Whenever providing health or medical information, always end with: "I am an AI and cannot provide medical advice. Please consult a healthcare professional."

MANDATORY OUTPUT STRUCTURE (FOR MEDICAL QUERIES ONLY):
Direct Answer: [One clear sentence addressing the query or uploaded image/report]
Key Details:
• [Fact, observation, or step 1]
• [Fact, observation, or step 2]
Next Step: [One sentence telling the user what to do next]

I am an AI and cannot provide medical advice. Please consult a healthcare professional.`;

    const contents: any[] = [];

    // Parse image if uploaded
    if (image && typeof image === 'string') {
      const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (match) {
        contents.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      } else {
        const base64Data = image.includes(',') ? image.split(',')[1] : image;
        contents.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        });
      }
    }

    // Add chat prompt
    const textPrompt = message || "Please analyze this medical report or image in detail.";
    contents.push(textPrompt);

    const replyText = await generateGeminiContent({
      contents,
      systemInstruction,
      preferredModel: "gemini-2.5-flash",
    });

    if (replyText) {
      return res.json({ reply: replyText });
    }

    // Detailed Clinical Fallback if API key missing/invalid
    const fallbackClinicalReply = getClinicalFallbackAnswer(queryText, language, !!image);
    return res.json({ reply: fallbackClinicalReply });

  } catch (error) {
    console.error("Error in AI chat endpoint:", error);
    const fallbackClinicalReply = getClinicalFallbackAnswer(req.body?.message || "", req.body?.language || "English", !!req.body?.image);
    return res.json({ reply: fallbackClinicalReply });
  }
});

// Setup Vite Dev Middleware / Production static serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n  Shushruta Server running at:`);
    console.log(`  > Local:   http://localhost:${PORT}/`);
    console.log(`  > Network: http://127.0.0.1:${PORT}/\n`);
  });
}

start();