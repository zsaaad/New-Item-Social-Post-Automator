import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
    
    // Call GPT-4o model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })
    
    // Extract the AI response
    const aiResponse = completion.choices[0]?.message?.content || 'No response generated'
    
    // Return the AI's text response
    return NextResponse.json({ 
      message: aiResponse 
    })
  } catch (error) {
    console.error('Error processing request:', error)
    
    // Handle OpenAI API errors specifically
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 