import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔐 Initialize Gemini safely (avoid build crash if key missing)
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ Missing GEMINI_API_KEY environment variable.");
}
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// 🧠 Detect language
async function detectLanguage(text: string): Promise<"en" | "hi" | "gu"> {
  if (!genAI) return "en";
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Detect the main language of this text (respond with only 'en', 'hi', or 'gu'): ${text}`;
  const result = await model.generateContent(prompt);
  const output = result.response.text().toLowerCase().trim();

  if (output.includes("hi")) return "hi";
  if (output.includes("gu")) return "gu";
  return "en";
}

// 🌐 Translate
async function translateText(text: string, targetLang: "en" | "hi" | "gu") {
  if (!genAI || targetLang === "en") return text;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Translate the following text into ${
    targetLang === "hi" ? "Hindi" : "Gujarati"
  } clearly and naturally:\n\n${text}`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim() || text;
}

// 🚀 POST handler
export async function POST(req: Request) {
  try {
    if (!genAI) {
      return NextResponse.json(
        { error: "Server missing Gemini API key (GEMINI_API_KEY)." },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();
    if (!message)
      return NextResponse.json({ error: "Message is required" }, { status: 400 });

    // 1️⃣ Detect language
    const detectedLang = await detectLanguage(message);
    console.log("Detected Language:", detectedLang);

    // 2️⃣ Create context + generate response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const context = (history || [])
      .map((m: any) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are a helpful AI assistant focused on misinformation and fact-checking.
Conversation history:
${context}

User message:
${message}
`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text().trim() || "Sorry, I couldn’t find an answer.";

    // 3️⃣ Translate back to original language
    const translatedResponse = await translateText(aiResponse, detectedLang);

    return NextResponse.json({
      response: translatedResponse,
      language: detectedLang,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to get a response.", details: error.message },
      { status: 500 }
    );
  }
}
