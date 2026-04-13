import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildPrompt, TranslationParams } from "@/utils/promptBuilder";

// Initialize the SDK. It will automatically use the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TranslationParams;

    if (!body.rawText) {
      return NextResponse.json(
        { error: "Raw text is required" },
        { status: 400 }
      );
    }

    if (body.rawText.length > 500) {
      return NextResponse.json(
        { error: "Text exceeds 500 characters limit." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(body);

    // Call the model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const translatedText = response.text?.trim() || "";

    return NextResponse.json({ result: translatedText });
  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process the requested text." },
      { status: 500 }
    );
  }
}
