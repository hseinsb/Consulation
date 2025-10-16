import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Mark this route as dynamic (cannot be prerendered)
export const dynamic = 'force-dynamic'

// Initialize Google Calendar API
const getCalendarClient = () => {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  return google.calendar({ version: 'v3', auth })
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    // Validate environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      return NextResponse.json({ error: 'Calendar not configured' }, { status: 500 })
    }

    const calendar = getCalendarClient()
    
    const slotDuration = parseInt(process.env.CONSULTATION_DURATION_MINUTES || '60')

    // Parse the selected date and handle timezone properly
    // The date comes in as YYYY-MM-DD format
    const timezone = process.env.CONSULTATION_TIMEZONE || 'America/Detroit'
    
    // Parse date string and create date at midnight in the target timezone
    // Format: YYYY-MM-DDTHH:MM:SS in local time, then we'll indicate timezone
    const dateStr = `${date}T00:00:00`
    const selectedDate = new Date(dateStr)
    
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    // Check if the selected date is in the past
    if (date < todayStr) {
      return NextResponse.json({ slots: [] }) // No slots for past dates
    }
    
    const dayOfWeek = selectedDate.getDay() // 0 = Sunday, 1 = Monday, etc.

    // Define custom availability schedule
    let workStartHour: number
    let workEndHour: number
    let workStartMinute = 0
    let workEndMinute = 59

    switch (dayOfWeek) {
      case 1: // Monday
      case 3: // Wednesday
      case 5: // Friday
        workStartHour = 19 // 7 PM
        workEndHour = 23 // 11:59 PM
        break
      case 2: // Tuesday
        workStartHour = 19 // 7 PM
        workEndHour = 22 // 10 PM
        break
      case 4: // Thursday
        workStartHour = 19 // 7 PM
        workEndHour = 20 // 8 PM
        break
      case 0: // Sunday
      case 6: // Saturday
        workStartHour = 14 // 2 PM
        workEndHour = 23 // 11:59 PM
        break
      default:
        return NextResponse.json({ slots: [] }) // No availability
    }
    
    // Create times in Eastern timezone (UTC-4 during EDT, UTC-5 during EST)
    // We'll assume EDT (UTC-4) for now - adjust if needed
    const easternOffset = -4 * 60 // -4 hours in minutes
    
    // Create date at the start/end hours in Eastern time
    const [year, month, day] = date.split('-').map(Number)
    const startOfDay = new Date(Date.UTC(year, month - 1, day, workStartHour - easternOffset / 60, workStartMinute, 0))
    const endOfDay = new Date(Date.UTC(year, month - 1, day, workEndHour - easternOffset / 60, workEndMinute, 0))

    // Fetch existing events from Google Calendar
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const bookedSlots = response.data.items || []

    // Generate all possible time slots
    const allSlots = []
    let currentTime = new Date(startOfDay)

    while (currentTime < endOfDay) {
      const slotStart = new Date(currentTime)
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000)

      // Check if this slot is in the past
      const now = new Date()
      if (slotStart > now) {
        // Check if this slot overlaps with any booked slots
        const isBooked = bookedSlots.some((event: any) => {
          const eventStart = new Date(event.start.dateTime || event.start.date)
          const eventEnd = new Date(event.end.dateTime || event.end.date)
          
          return (
            (slotStart >= eventStart && slotStart < eventEnd) ||
            (slotEnd > eventStart && slotEnd <= eventEnd) ||
            (slotStart <= eventStart && slotEnd >= eventEnd)
          )
        })

        if (!isBooked) {
          allSlots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            display: slotStart.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })
          })
        }
      }

      currentTime = slotEnd
    }

    return NextResponse.json({ slots: allSlots })

  } catch (error: any) {
    console.error('Error fetching availability:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch availability',
      details: error.message 
    }, { status: 500 })
  }
}

