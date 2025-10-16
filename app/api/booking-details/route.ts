import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Mark this route as dynamic (cannot be prerendered)
export const dynamic = 'force-dynamic'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || !session.metadata) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const { startTime, endTime } = session.metadata

    if (!startTime || !endTime) {
      return NextResponse.json({ error: 'Booking details not found' }, { status: 404 })
    }

    // Format the dates
    const appointmentStart = new Date(startTime)
    const appointmentEnd = new Date(endTime)

    const formattedDate = appointmentStart.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    const formattedTime = `${appointmentStart.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })} - ${appointmentEnd.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`

    return NextResponse.json({
      success: true,
      booking: {
        id: sessionId.substring(0, 16) + '...',
        date: formattedDate,
        time: formattedTime,
        confirmed: true,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
      },
    })
  } catch (error: any) {
    console.error('Error fetching booking details:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch booking details',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

