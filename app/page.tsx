'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CloudBackground from '@/components/CloudBackground'

export default function Home() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Store user data in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userFirstName', firstName)
        localStorage.setItem('userEmail', email)
      }

      // Submit to our Next.js API route (which proxies to Google Apps Script)
      // This avoids CORS issues since the API route is on the same domain
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email })
      })

      const result = await response.json()
      
      console.log('📦 Full API Response:', result)
      
      if (result.success) {
        console.log('✅ Successfully submitted to Google Sheets!')
        console.log('📄 Script Response:', result.scriptResponse)
      } else {
        console.warn('⚠️ Submission may have failed, but data is in localStorage')
        console.warn('Error details:', result)
      }

      // Redirect to thank you page
      router.push('/thank-you')
      
    } catch (error) {
      console.error('❌ Error submitting email:', error)
      // Still redirect even if submission fails - data is in localStorage as backup
      router.push('/thank-you')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <CloudBackground />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center animate-fade-in-up">
        {/* Header Section */}
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 leading-tight text-shadow-soft">
            You're Not Lost — You're Being Redirected.
            <br />
            This guide is your next sign.
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-700 max-w-xl mx-auto">
            Download Here For Free
          </p>
        </div>

        {/* Golden Card with Form */}
        <div className="bg-gradient-to-br from-white/90 to-gold-light/20 backdrop-blur-sm rounded-3xl shadow-2xl glow-gold-soft p-8 md:p-12 border border-gold-light/30">
          <div className="mb-8">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-gold to-gold-light rounded-full mb-6">
              <span className="text-white font-medium text-sm tracking-wider uppercase">Free Divine Guide</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">
              Download the Free Divine Consultation Guide
            </h2>
            <p className="text-gray-600 font-light">
              Unlock your path to spiritual clarity and emotional healing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-gold-light/40 focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm placeholder:text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-gold-light/40 focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold to-gold-light text-white font-medium text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed glow-gold-soft"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Get the Guide'
              )}
            </button>

            <p className="text-xs text-gray-500 font-light mt-4">
              You'll be redirected to a special message after submitting.
            </p>
          </form>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-12 opacity-70">
          <p className="text-sm font-light text-gray-600 italic">
            Your journey begins with a single step...
          </p>
        </div>
      </div>
    </main>
  )
}

