import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON body
    const body = await request.json()
    
    // Log the incoming data to console
    console.log('Received form data:', body)
    
    // Return hardcoded response
    return NextResponse.json({ 
      message: "This is a dummy response from the server!" 
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 