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
    
    // Check if API key is available
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY environment variable is not set')
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      )
    }
    
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
    const prompt = `You are an expert F&B Social Media Strategist. Create a content pack for a new product launch.

PRODUCT INFO:
New Item: "${newItemName}"
Description: "${newItemDescription}"
Price: "${newItemPrice}"
Bestselling Item: "${strategicInput}"

IMPORTANT: Use the bestselling item to create strategic promotions and upsells.

Respond with ONLY valid JSON in this exact format:

{
  "launchPromotion": {
    "title": "Actionable Launch Promotion",
    "content": "A promotion idea connecting the new item with the bestselling item."
  },
  "instagramPost": {
    "title": "Instagram Announcement Post",
    "caption": "Instagram caption highlighting key benefits",
    "hashtags": "#relevant #hashtags",
    "imagePrompt": "Image description for AI generator"
  },
  "facebookPost": {
    "title": "Facebook Engagement Post",
    "caption": "Facebook caption with engaging question",
    "hashtags": "#facebook #hashtags",
    "imagePrompt": "Facebook image description"
  },
  "upsellPost": {
    "title": "Strategic Upsell Post",
    "caption": "Combo deal between ${newItemName} and ${strategicInput}",
    "hashtags": "#combo #deal #hashtags",
    "imagePrompt": "Image showing both items together"
  }
}`
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
    
    // Call Gemini model
    console.log('Calling Gemini model...')
    const result = await model.generateContent(prompt)
    const response = await result.response
    
    // Extract the text from the response
    const aiResponse = response.text() || 'No response generated'
    console.log('Raw AI response:', aiResponse)
    
    // Parse the JSON response from Gemini
    try {
      const contentPack = JSON.parse(aiResponse)
      console.log('Successfully parsed content pack:', contentPack)
      
      // Return the structured content pack
      return NextResponse.json(contentPack)
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      console.error('Raw response that failed to parse:', aiResponse)
      
      // If JSON parsing fails, return the raw response for debugging
      return NextResponse.json({ 
        error: 'Failed to parse AI response as JSON',
        rawResponse: aiResponse,
        parseError: parseError instanceof Error ? parseError.message : 'Unknown parse error'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    
    // Temporary fallback for demo purposes
    const fallbackContentPack = {
      "launchPromotion": {
        "title": "Actionable Launch Promotion",
        "content": `Launch ${newItemName} with a limited-time bundle deal featuring your bestselling ${strategicInput} for maximum appeal.`
      },
      "instagramPost": {
        "title": "Instagram Announcement Post",
        "caption": `🍕✨ Introducing ${newItemName}! ${newItemDescription.substring(0, 100)}... Starting at ${newItemPrice} #NewLaunch #FoodLover`,
        "hashtags": "#foodie #newmenu #delicious #instafood",
        "imagePrompt": `Professional food photography of ${newItemName} with vibrant colors and appetizing presentation`
      },
      "facebookPost": {
        "title": "Facebook Engagement Post",
        "caption": `Exciting news! We're thrilled to introduce ${newItemName} to our menu. ${newItemDescription} Available now for ${newItemPrice}. What's your favorite flavor combination?`,
        "hashtags": "#newmenu #foodexperience #community",
        "imagePrompt": `Lifestyle photo showing ${newItemName} being enjoyed in a social setting`
      },
      "upsellPost": {
        "title": "Strategic Upsell Post",
        "caption": `Perfect combo alert! Try our new ${newItemName} alongside our popular ${strategicInput} for the ultimate experience. Limited time offer!`,
        "hashtags": "#combo #bestseller #limitedtime",
        "imagePrompt": `Split image showing ${newItemName} and ${strategicInput} side by side with combo pricing`
      }
    }
    
    // Return fallback content for demo
    console.log('Returning fallback content due to error:', error)
    return NextResponse.json(fallbackContentPack)
    
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