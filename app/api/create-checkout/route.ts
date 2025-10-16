import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe only when needed (not at build time)
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

export async function POST(request: NextRequest) {
  try {
    const { startTime, endTime } = await request.json()

    if (!startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Format the appointment time for display
    const appointmentDate = new Date(startTime)
    const displayTime = appointmentDate.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    const price = parseInt(process.env.CONSULTATION_PRICE || '4900')

    // Get the base URL - use env var if set, otherwise use request origin
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
    
    // Log for debugging
    console.log('Stripe Checkout URLs:', {
      baseUrl,
      successUrl: `${baseUrl}/booking-confirmation`,
      cancelUrl: `${baseUrl}/thank-you`,
      envVarSet: !!process.env.NEXT_PUBLIC_SITE_URL
    })

    // Create Stripe Checkout Session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Divine Consultation - 1-on-1 Session',
              description: `Appointment: ${displayTime}`,
              images: ['https://your-site.com/consultation-image.jpg'], // Optional: add your image
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/booking-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/thank-you?canceled=true`,
      metadata: {
        startTime,
        endTime,
        appointmentType: 'consultation',
      },
      customer_email: undefined, // User will enter email in Stripe Checkout
    })

    return NextResponse.json({ 
      sessionId: session.id,
      checkoutUrl: session.url 
    })

  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    }, { status: 500 })
  }
}

