import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    // 1. Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured in environment variables.");
    }

    // 2. Parse the request body
    const body = await request.json();
    const { prompt } = body;
    if (!prompt) {
      throw new Error("Missing required field: prompt");
    }

    // 3. Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // 4. Call DALL-E 3 to generate image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd"
    });

    // 5. Extract the image URL from the response
    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error("No image URL received from DALL-E API");
    }

    // 6. Return the image URL
    return NextResponse.json({ imageUrl }, { status: 200 });

  } catch (error) {
    // 7. Full error handling
    console.error("--- IMAGE GENERATION ERROR ---", error);
    
    let errorMessage = "An unknown error occurred during image generation.";
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for OpenAI specific errors
      if (error.message.includes('400')) {
        statusCode = 400;
        errorMessage = "Bad request - check your prompt and API key. Common issues: prompt too long, content policy violation, or insufficient credits.";
      } else if (error.message.includes('401')) {
        statusCode = 401;
        errorMessage = "Invalid API key. Please check your OpenAI API key configuration.";
      } else if (error.message.includes('429')) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded or insufficient credits. Please check your OpenAI account balance.";
      }
    }
    
    return NextResponse.json(
      { 
        error: "Failed to generate image.", 
        details: errorMessage,
        fullError: error instanceof Error ? error.message : String(error)
      },
      { status: statusCode }
    );
  }
} 