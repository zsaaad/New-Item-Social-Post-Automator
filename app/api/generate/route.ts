import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Use a single, large try-catch block for simplicity and robustness
  try {
    // 1. Get API Key and check for its existence
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not configured in environment variables.");
    }

    // 2. Parse the request body
    const body = await request.json();
    const { newItemName, itemDescription, price, strategicInput } = body;
    if (!newItemName || !itemDescription || !price || !strategicInput) {
        throw new Error("Missing one or more required fields in the request body.");
    }

    // 3. Initialize the AI model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // 4. Construct the final, advanced prompt from our PRD
    const prompt = `
      You are an expert F&B Social Media Strategist. Your task is to generate a complete "Instant Content Pack" for a new product launch.
      You MUST return a single, valid JSON object and nothing else.
      You MUST use the 'strategicInput' (the bestselling item) to inform the "Strategic Upsell Post" and the "Actionable Launch Promotion".

      Product Data:
      - New Item Name: "${newItemName}"
      - Description: "${itemDescription}"
      - Price: "${price}"
      - Strategic Input (Bestselling Item): "${strategicInput}"

      Generate the JSON object with this exact structure:
      {
        "launchPromotion": { "title": "Actionable Launch Promotion", "content": "..." },
        "instagramPost": { "title": "Instagram Announcement Post", "caption": "...", "hashtags": "...", "imagePrompt": "..." },
        "facebookPost": { "title": "Facebook Engagement Post", "caption": "...", "hashtags": "...", "imagePrompt": "..." },
        "upsellPost": { "title": "Strategic Upsell Post", "caption": "...", "hashtags": "...", "imagePrompt": "..." }
      }
    `;

    // 5. Call the AI and get the response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 6. The AI might wrap the JSON in markdown, so we need to clean it.
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // 7. Parse the cleaned text into a JSON object
    const parsedJson = JSON.parse(cleanedText);

    // 8. Success! Return the final JSON content pack.
    return NextResponse.json(parsedJson, { status: 200 });

  } catch (error) {
    // This is the single, safe catch block for all errors.
    console.error("--- A CRITICAL ERROR OCCURRED ---", error);
    
    let errorMessage = "An unknown server error occurred.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    
    return NextResponse.json({ error: "Failed to generate AI content.", details: errorMessage }, { status: 500 });
  }
} 