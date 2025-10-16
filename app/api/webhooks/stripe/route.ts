import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { google } from 'googleapis'

// Initialize Stripe only when needed (not at build time)
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

// Initialize Google Calendar API
const getCalendarClient = () => {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  return google.calendar({ version: 'v3', auth })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Get appointment details from metadata
      const { startTime, endTime } = session.metadata!
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name || customerEmail

      if (!startTime || !endTime) {
        throw new Error('Missing appointment times in session metadata')
      }

      // Create Google Calendar event
      const calendar = getCalendarClient()
      
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

      const event = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
          summary: `Consultation with ${customerName}`,
          description: `
Divine Consultation - 1-on-1 Session

Client: ${customerName}
Email: ${customerEmail}
Payment Status: Paid
Stripe Session: ${session.id}
Amount: $${(session.amount_total! / 100).toFixed(2)}

---
This is a sacred space for spiritual guidance and emotional healing.
          `.trim(),
          start: {
            dateTime: startTime,
            timeZone: process.env.CONSULTATION_TIMEZONE || 'America/New_York',
          },
          end: {
            dateTime: endTime,
            timeZone: process.env.CONSULTATION_TIMEZONE || 'America/New_York',
          },
          attendees: customerEmail ? [{ email: customerEmail }] : [],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 }, // 1 day before
              { method: 'email', minutes: 60 }, // 1 hour before
            ],
          },
          conferenceData: {
            createRequest: {
              requestId: session.id,
              conferenceSolutionKey: { type: 'hangoutsMeet' }, // Creates Google Meet link
            },
          },
        },
        conferenceDataVersion: 1,
      })

      console.log('✅ Calendar event created:', event.data.id)
      console.log('📧 Confirmation sent to:', customerEmail)
      console.log('📅 Appointment:', displayTime)

      return NextResponse.json({ 
        received: true, 
        eventId: event.data.id 
      })

    } catch (error: any) {
      console.error('❌ Error creating calendar event:', error)
      return NextResponse.json({ 
        error: 'Failed to create calendar event',
        details: error.message 
      }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

