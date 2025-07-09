import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const googleProjectID = process.env.GOOGLE_PROJECT_ID;

    if (!googleApiKey || !googleProjectID) {
      throw new Error("Google Cloud credentials are not configured in environment variables.");
    }

    const { prompt } = await request.json();
    if (!prompt) {
      throw new Error("Prompt is required in the request body.");
    }

    const apiEndpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${googleProjectID}/locations/us-central1/publishers/google/models/imagegeneration:predict`;

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${googleApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ "prompt": prompt }],
        parameters: { "sampleCount": 1 },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Google API request failed with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const imageBase64 = data.predictions[0].bytesBase64Encoded;

    return NextResponse.json({ imageBase64: imageBase64 }, { status: 200 });

  } catch (error) {
    console.error("--- IMAGE GENERATION ERROR ---", error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: "Failed to generate image.", details: errorMessage }, { status: 500 });
  }
} 