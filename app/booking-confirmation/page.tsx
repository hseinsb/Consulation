'use client'

import { useState, useEffect } from 'react'
import CloudBackground from '@/components/CloudBackground'

export default function BookingConfirmation() {
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    // Get Stripe session ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    
    if (sessionId) {
      // In production, you could fetch full booking details from your backend
      setBookingDetails({
        id: sessionId.substring(0, 16) + '...', // Truncate for display
        confirmed: true
      })
    }
  }, [])

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <CloudBackground />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center animate-fade-in-up">
        
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold-light rounded-full shadow-lg glow-gold-soft">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 leading-tight text-shadow-soft">
            Thank You for Booking
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-4">
            Your consultation call has been confirmed.
          </p>
          <p className="text-lg md:text-xl font-light text-gold-dark max-w-2xl mx-auto">
            I'm looking forward to our conversation and the opportunity to support you on your journey.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-gradient-to-br from-white/90 to-gold-light/20 backdrop-blur-sm rounded-3xl shadow-2xl glow-gold-soft p-8 md:p-12 border border-gold-light/30 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              What Happens Next?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/60 rounded-2xl p-6">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Email Confirmation</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a confirmation email with all the details and meeting link.
                </p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6">
                <div className="text-3xl mb-4">⏰</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">24-Hour Reminder</h3>
                <p className="text-gray-600 text-sm">
                  We'll send you a gentle reminder 24 hours before our call.
                </p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Call</h3>
                <p className="text-gray-600 text-sm">
                  Join the call at your scheduled time for our sacred conversation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        {bookingDetails && (
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-gold-light/20 mb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Your Booking Details</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
              <p><strong>Date:</strong> {bookingDetails.date}</p>
              <p><strong>Time:</strong> {bookingDetails.time}</p>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-gold-light/20 to-gold/20 rounded-2xl p-6 border border-gold-light/30">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Important Notes</h3>
          <div className="space-y-3 text-gray-700 text-sm text-left max-w-2xl mx-auto">
            <p>• Please check your email (including spam folder) for the meeting link</p>
            <p>• Our call will be private and confidential</p>
            <p>• Come as you are - no preparation needed</p>
            <p>• If you need to reschedule, please let me know at least 24 hours in advance</p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-12 space-y-4">
          <p className="text-gray-600 font-light text-lg">
            Until then, may you find peace in knowing that help is on the way.
          </p>
          <p className="text-sm text-gray-500 italic">
            With love and light,<br />
            Hussein
          </p>
        </div>
      </div>
    </main>
  )
}
