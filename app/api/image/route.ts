import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get and validate the prompt from request body
    const { prompt, style, color, background } = await request.json();
    
    if (!prompt) {
      throw new Error("Prompt is required in the request body.");
    }

    // Create enhanced prompt that includes style parameters
    const enhancedPrompt = `${prompt}. Style: ${style || 'Photorealistic'}. Dominant Color Palette: ${color || 'Vibrant'}. Background: ${background || 'Studio Backdrop'}.`;

    // Call DALL-E 3 API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
    });

    // Extract the image URL from the response
    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error("No image URL received from OpenAI API.");
    }

    // Return JSON response with the real image URL
    return NextResponse.json({ imageUrl: imageUrl }, { status: 200 });

  } catch (error) {
    console.error("--- DALL-E 3 IMAGE GENERATION ERROR ---", error);
    
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // Handle specific OpenAI API errors
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as any).status;
      if (status === 401) {
        errorMessage = "Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable.";
      } else if (status === 429) {
        errorMessage = "OpenAI API rate limit exceeded. Please try again later.";
      } else if (status === 400) {
        errorMessage = "Invalid prompt or parameters sent to OpenAI API.";
      }
    }
    
    return NextResponse.json({ 
      error: "Failed to generate image with DALL-E 3.", 
      details: errorMessage 
    }, { status: 500 });
  }
} 