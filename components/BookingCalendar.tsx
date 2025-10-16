'use client'

import { useState, useEffect } from 'react'

interface TimeSlot {
  start: string
  end: string
  display: string
}

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get next 14 days for date selection
  const getNext14Days = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      })
    }
    return days
  }

  const dates = getNext14Days()

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailableSlots = async (date: string) => {
    setLoadingSlots(true)
    setError(null)
    try {
      const response = await fetch(`/api/availability?date=${date}`)
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
        setAvailableSlots([])
      } else {
        setAvailableSlots(data.slots)
      }
    } catch (err) {
      setError('Failed to load available times. Please try again.')
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleBooking = async () => {
    if (!selectedSlot) return

    setLoading(true)
    setError(null)

    try {
      // Create Stripe Checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
        }),
      })

      const data = await response.json()

      console.log('API Response:', data)

      if (data.error) {
        setError(data.error)
        return
      }

      if (!data.checkoutUrl) {
        setError('No checkout URL received from server')
        console.error('No checkoutUrl in response:', data)
        return
      }

      // Redirect to Stripe Checkout
      console.log('Redirecting to Stripe checkout:', data.checkoutUrl)
      window.location.href = data.checkoutUrl
    } catch (err) {
      console.error('Booking error:', err)
      setError('Failed to process booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white/95 to-gold-light/30 rounded-3xl shadow-2xl glow-gold-soft p-8 md:p-12 border border-gold-light/30">
        
        {/* Step 1: Select Date */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 1: Select a Date</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dates.map((day) => (
              <button
                key={day.date}
                onClick={() => {
                  setSelectedDate(day.date)
                  setSelectedSlot(null)
                }}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedDate === day.date
                    ? 'bg-gradient-to-r from-gold to-gold-light text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gold-light/20 border border-gold-light/30'
                }`}
              >
                {day.display}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Time */}
        {selectedDate && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 2: Select a Time</h3>
            
            {loadingSlots ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                <p className="mt-4 text-gray-600">Loading available times...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <p>{error}</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p>No available times for this date. Please select another date.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selectedSlot?.start === slot.start
                        ? 'bg-gradient-to-r from-gold to-gold-light text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gold-light/20 border border-gold-light/30'
                    }`}
                  >
                    {slot.display}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Confirm & Pay */}
        {selectedSlot && (
          <div className="border-t border-gold-light/30 pt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 3: Confirm & Pay</h3>
            
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gold-light/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Selected Time:</span>
                <span className="text-gray-900 font-semibold">{selectedSlot.display}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Duration:</span>
                <span className="text-gray-900 font-semibold">60 minutes</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-gray-900 font-bold text-lg">Total:</span>
                <span className="text-gold font-bold text-2xl">$49</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-white font-semibold text-xl px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed glow-gold-soft"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                '💳 Proceed to Payment'
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment powered by Stripe. Your slot will be confirmed after payment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

