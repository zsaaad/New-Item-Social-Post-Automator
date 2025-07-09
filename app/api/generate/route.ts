import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON body
    const body = await request.json()
    
    // Log the incoming data to console
    console.log('Received form data:', body)
    
    // Extract all four required fields
    const { newItemName, newItemDescription, newItemPrice, strategicInput } = body
    
    // Validate required fields
    if (!newItemName || !newItemDescription || !newItemPrice || !strategicInput) {
      return NextResponse.json(
        { error: 'Missing required fields: newItemName, newItemDescription, newItemPrice, and strategicInput' },
        { status: 400 }
      )
    }
    
    // Create the advanced Strategic Content Partner prompt
    const prompt = `You are an expert F&B Social Media Strategist and Strategic Content Partner. Your task is to generate a complete "Instant Content Pack" for a new product launch.

PRODUCT DETAILS:
- New Item Name: "${newItemName}"
- Description: "${newItemDescription}"
- Price: "${newItemPrice}"
- Strategic Bestselling Item: "${strategicInput}"

INSTRUCTIONS:
1. Use the Strategic Bestselling Item ("${strategicInput}") to inform your Strategic Upsell Post and Actionable Launch Promotion
2. Create content that leverages the success of the bestselling item to promote the new product
3. Generate platform-specific content optimized for each social media platform
4. Focus on F&B industry best practices and consumer psychology

You MUST respond with ONLY a valid JSON object (no other text) with this exact structure:

{
  "launchPromotion": {
    "title": "Actionable Launch Promotion",
    "content": "A single, clear sentence suggesting a launch promotion that connects the new item with the bestselling item strategy."
  },
  "instagramPost": {
    "title": "Instagram Announcement Post",
    "caption": "A punchy, visually-oriented caption for Instagram that highlights the new product's key benefits.",
    "hashtags": "#relevant #hashtags #for #instagram",
    "imagePrompt": "A descriptive prompt for an AI image generator to create the perfect Instagram post visual."
  },
  "facebookPost": {
    "title": "Facebook Engagement Post",
    "caption": "A longer, more detailed caption for Facebook that tells a story and ends with an engaging question to drive comments.",
    "hashtags": "#facebook #optimized #hashtags",
    "imagePrompt": "A unique, descriptive image AI prompt specifically designed for Facebook's format and audience."
  },
  "upsellPost": {
    "title": "Strategic Upsell Post",
    "caption": "A caption that creates a compelling combo deal or cross-promotion between the new item (${newItemName}) and the strategic bestseller (${strategicInput}).",
    "hashtags": "#upsell #combo #deal #hashtags",
    "imagePrompt": "An image prompt showing both the new item and bestselling item together in an appealing way."
  }
}

Generate the complete content pack now:`
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
    
    // Call Gemini model
    const result = await model.generateContent(prompt)
    const response = await result.response
    
    // Extract the text from the response
    const aiResponse = response.text() || 'No response generated'
    
    // Parse the JSON response from Gemini
    try {
      const contentPack = JSON.parse(aiResponse)
      
      // Return the structured content pack
      return NextResponse.json(contentPack)
    } catch (parseError) {
      // If JSON parsing fails, return the raw response for debugging
      return NextResponse.json({ 
        error: 'Failed to parse AI response as JSON',
        rawResponse: aiResponse 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    
    // Handle Google AI API errors specifically
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 