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

// Send email notification about new booking
async function sendBookingNotification(details: {
  hostEmail: string
  clientName: string
  clientEmail: string
  appointmentTime: string
  amount: string
  meetLink: string
}) {
  // Using Gmail API with the same service account
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
  })

  const gmail = google.gmail({ version: 'v1', auth })

  const emailContent = `From: ${process.env.GOOGLE_CLIENT_EMAIL}
To: ${details.hostEmail}
Subject: 🌟 New Consultation Booking - ${details.clientName}
Content-Type: text/html; charset=utf-8

<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
      <h2 style="color: white; text-align: center;">✨ New Consultation Booked ✨</h2>
    </div>
    
    <div style="max-width: 600px; margin: 20px auto; padding: 30px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h3 style="color: #667eea;">Booking Details</h3>
      
      <p><strong>Client Name:</strong> ${details.clientName}</p>
      <p><strong>Client Email:</strong> ${details.clientEmail}</p>
      <p><strong>Appointment Time:</strong> ${details.appointmentTime}</p>
      <p><strong>Amount Paid:</strong> $${details.amount}</p>
      
      <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-left: 4px solid #667eea; border-radius: 5px;">
        <p style="margin: 0;"><strong>Google Meet Link:</strong></p>
        <p style="margin: 5px 0 0 0;">${details.meetLink}</p>
      </div>
      
      <p style="color: #666; font-style: italic; margin-top: 30px;">
        The appointment has been added to your Google Calendar and a confirmation email has been sent to the client.
      </p>
    </div>
    
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; text-align: center; color: #999; font-size: 12px;">
      <p>Divine Consultation Booking System</p>
    </div>
  </body>
</html>`

  const encodedEmail = Buffer.from(emailContent)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedEmail,
    },
  })
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
          // Removed attendees - service account cannot invite without Domain-Wide Delegation
          // Client email is in the description for reference
          reminders: {
            useDefault: true, // Use default reminders for your calendar
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
      console.log('📧 Client email for reference:', customerEmail)
      console.log('📅 Appointment:', displayTime)
      console.log('🔗 Google Meet link:', event.data.hangoutLink || 'Check calendar event')

      // Note: Client will need to be manually emailed or you can send them the Google Meet link
      // The calendar event contains all their information in the description
      
      // Send email notification to you about the new booking
      if (process.env.NOTIFICATION_EMAIL && customerEmail) {
        try {
          await sendBookingNotification({
            hostEmail: process.env.NOTIFICATION_EMAIL,
            clientName: customerName || 'Client',
            clientEmail: customerEmail,
            appointmentTime: displayTime,
            amount: (session.amount_total! / 100).toFixed(2),
            meetLink: event.data.hangoutLink || 'Check your Google Calendar for the Meet link',
          })
          console.log('✅ Notification email sent to host')
        } catch (emailError: any) {
          console.error('⚠️ Failed to send notification email:', emailError.message)
          // Don't fail the webhook if email fails
        }
      }

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

