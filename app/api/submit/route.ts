import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, email } = body

    console.log('📧 Submitting to Google Sheets:', { firstName, email })

    // Google Apps Script URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycby604EV5d9WmzAZ1UTB9umO6DZzuaRVLLuB8WCi0Eba6A1ZAjZj9_1Wgais5nFs77Skcw/exec'
    
    // Send data to Google Apps Script with URL parameters
    const params = new URLSearchParams({
      firstName: firstName,
      email: email
    })

    const fullUrl = `${scriptUrl}?${params.toString()}`
    console.log('🌐 Request URL:', fullUrl)

    // Make the request from server-side (no CORS issues)
    const response = await fetch(fullUrl, {
      method: 'GET',
      redirect: 'follow'
    })

    console.log('📊 Response status:', response.status)
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()))

    // Get response text
    const responseText = await response.text()
    console.log('📄 Response text:', responseText)
    
    // Try to parse as JSON
    let parsedResponse
    try {
      parsedResponse = JSON.parse(responseText)
      console.log('✅ Parsed response:', parsedResponse)
    } catch (e) {
      console.log('⚠️ Response is not JSON')
      parsedResponse = { raw: responseText }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data submitted successfully',
      scriptResponse: parsedResponse,
      rawResponse: responseText
    })

  } catch (error) {
    console.error('❌ Error submitting to Google Sheets:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit data',
      error: String(error)
    }, { status: 500 })
  }
}

