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
    
    // Extract the required fields
    const { newItemName, newItemDescription } = body
    
    // Validate required fields
    if (!newItemName || !newItemDescription) {
      return NextResponse.json(
        { error: 'Missing required fields: newItemName and newItemDescription' },
        { status: 400 }
      )
    }
    
    // Create the prompt
    const prompt = `You are a social media assistant. Write a short, exciting tweet for a new product called "${newItemName}". The description is: "${newItemDescription}".`
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
    
    // Call Gemini model
    const result = await model.generateContent(prompt)
    const response = await result.response
    
    // Extract the text from the response
    const aiResponse = response.text() || 'No response generated'
    
    // Return the AI's text response
    return NextResponse.json({ 
      message: aiResponse 
    })
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