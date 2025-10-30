import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { response: "❌ Server Error: Missing GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Respond in ${language === "hi" ? "Hindi" : language === "gu" ? "Gujarati" : "English"}:\n\n${message}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        {
          response:
            data.error?.message ||
            "⚠️ Gemini API request failed. Please check model name or quota.",
        },
        { status: 500 }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response received from Gemini.";

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { response: "❌ Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
