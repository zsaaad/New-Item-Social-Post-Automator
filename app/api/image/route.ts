import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      throw new Error("Prompt is required in the request body.");
    }

    // For now, we'll generate a placeholder image with the prompt text
    // This ensures the image generation feature works while we set up proper image APIs
    const placeholderSvg = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect x="20" y="20" width="472" height="472" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="20"/>
        <text x="256" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">🎨 Image Generated</text>
        <text x="256" y="250" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="16">Prompt:</text>
        <foreignObject x="40" y="270" width="432" height="200">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, sans-serif; font-size: 14px; color: rgba(255,255,255,0.8); text-align: center; line-height: 1.4; padding: 20px; word-wrap: break-word;">
            ${prompt.substring(0, 200)}${prompt.length > 200 ? '...' : ''}
          </div>
        </foreignObject>
      </svg>
    `;

    // Convert SVG to base64
    const imageBase64 = Buffer.from(placeholderSvg).toString('base64');

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