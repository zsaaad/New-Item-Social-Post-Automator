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

      For all 'imagePrompt' fields, you must generate a highly detailed, photorealistic, cinematic-style prompt suitable for an AI like Midjourney. Describe the lighting (e.g., 'dramatic studio lighting', 'soft natural morning light'), the camera angle (e.g., 'low angle shot', 'macro shot'), the composition, and the background to create a visually stunning and professional-quality image concept.

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

    // 6. Clean and extract JSON from the AI response
    let cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Remove any leading/trailing text that isn't part of the JSON
    const jsonStart = cleanedText.indexOf('{');
    const jsonEnd = cleanedText.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
    }
    
    // 7. Parse the cleaned text into a JSON object with error handling
    let parsedJson;
    try {
      parsedJson = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parsing failed. Raw response:", text);
      console.error("Cleaned text:", cleanedText);
      console.error("Parse error:", parseError);
      
      // Fallback content pack if JSON parsing fails
      parsedJson = {
        "launchPromotion": {
          "title": "Actionable Launch Promotion",
          "content": `Launch ${newItemName} with a strategic promotion connecting to your bestselling ${strategicInput} for maximum impact.`
        },
        "instagramPost": {
          "title": "Instagram Announcement Post",
          "caption": `🚀 Introducing ${newItemName}! ${itemDescription.substring(0, 100)}... Now available for ${price}! #NewLaunch #FoodLover`,
          "hashtags": "#foodie #newmenu #delicious #instafood",
          "imagePrompt": `Professional food photography of ${newItemName} with dramatic studio lighting, appetizing composition, high-end restaurant presentation`
        },
        "facebookPost": {
          "title": "Facebook Engagement Post",
          "caption": `Exciting news! We're thrilled to introduce ${newItemName} to our menu. ${itemDescription} Available now for ${price}. What's your favorite flavor combination?`,
          "hashtags": "#newmenu #foodexperience #community",
          "imagePrompt": `Lifestyle photo of ${newItemName} being enjoyed in a social setting with soft natural lighting`
        },
        "upsellPost": {
          "title": "Strategic Upsell Post",
          "caption": `Perfect combo alert! Try our new ${newItemName} alongside our popular ${strategicInput} for the ultimate experience. Limited time offer!`,
          "hashtags": "#combo #bestseller #limitedtime",
          "imagePrompt": `Split composition showing ${newItemName} and ${strategicInput} side by side with professional food styling`
        }
      };
    }

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