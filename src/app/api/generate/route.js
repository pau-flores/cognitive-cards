import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize system prompt for the AI
const systemPrompt = `You are a flashcard creator. Your task is to create clear, concise flashcards that help users learn effectively. Follow these steps:

    Break down the topic into key concepts and facts.
    Use varied question types: definitions, multiple choice, fill-in-the-blank, true/false, and scenario-based.
    Keep it simple: Avoid complex or ambiguous language.
    Incorporate mnemonics or memory aids when useful.
    Focus on balance: Ensure the flashcards comprehensively cover the topic while keeping answers short and relevant.
    
    Return in the following JSON format:
    {
      "flashcards": [{
        "front": str,
        "back": str
      }]
    }`;

export async function POST(req) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "meta-llama/llama-3.1-8b-instruct:free",
  });

  // Extract and sanitize the response
  let content = completion.choices[0].message.content;

  // Find the JSON part of the response
  const jsonStartIndex = content.indexOf("{");
  const jsonEndIndex = content.lastIndexOf("}") + 1;

  // Extract the JSON content
  const jsonString = content.slice(jsonStartIndex, jsonEndIndex);

  try {
    const flashcards = JSON.parse(jsonString);

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json(
      { error: "Invalid JSON response from AI" },
      { status: 500 }
    );
  }

  return NextResponse.json(flashcards.flashcards);
}
