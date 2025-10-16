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

    // Parse the selected date
    const selectedDate = new Date(date)
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
    
    const startOfDay = new Date(selectedDate)
    startOfDay.setHours(workStartHour, workStartMinute, 0, 0)
    
    const endOfDay = new Date(selectedDate)
    endOfDay.setHours(workEndHour, workEndMinute, 0, 0)

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

