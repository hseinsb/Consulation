'use client'

import { useState, useEffect } from 'react'
import Cal, { getCalApi } from "@calcom/embed-react"
import CloudBackground from '@/components/CloudBackground'

export default function ThankYou() {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    // Fade in video after component mounts
    const timer = setTimeout(() => setShowVideo(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"1-on-1-call-with-hussein"});
      cal("ui", {"theme":"light","hideEventTypeDetails":true,"layout":"month_view"});
    })();
  }, [])


  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadGuide = () => {
    // Replace with your actual PDF URL
    // For now, this opens a placeholder
    window.open('/guide.pdf', '_blank')
  }

  return (
    <main className="relative min-h-screen px-4 py-12 overflow-hidden">
      <CloudBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Section A - Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 leading-tight mb-6 text-shadow-soft">
            You Weren't Sent Here by Accident.
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 mb-3">
            Your Divine Consultation Guide is ready below.
          </p>
          <p className="text-lg md:text-xl font-light text-gold-dark">
            But first… I need to show you what this really means.
          </p>
        </div>

        {/* Section B - Golden Video Card */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-br from-white/90 to-gold-light/20 backdrop-blur-sm rounded-3xl shadow-2xl glow-gold-soft p-8 md:p-12 border border-gold-light/30">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 text-center mb-8">
              A Personal Message for You
            </h2>
            
            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-8 bg-black/10">
              {showVideo ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                  title="Divine Consultation Message"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-gold">Loading...</div>
                </div>
              )}
            </div>

            <p className="text-center text-gray-700 font-light text-lg leading-relaxed">
              In this video, I explain why the free guide is just the beginning of your healing,
              and how a personal consultation can transform your spiritual and emotional life.
            </p>
          </div>
        </div>

        {/* Section C - CTA Buttons */}
        <div className="max-w-2xl mx-auto mb-20 space-y-6 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={scrollToBooking}
            className="w-full md:w-auto bg-gradient-to-r from-gold to-gold-light text-white font-medium text-xl px-12 py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 glow-gold-soft"
          >
            ✨ Speak with Me
          </button>
          
          <div>
            <button
              onClick={handleDownloadGuide}
              className="text-gray-600 hover:text-gold font-light text-base underline hover:no-underline transition-all duration-300"
            >
              No thanks, just download my free guide
            </button>
          </div>
        </div>

        {/* Section D - Booking Section */}
        <div id="booking-section" className="scroll-mt-20 max-w-6xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
              What It Felt Like to Talk to Me One-on-One
            </h2>
            <p className="text-center text-gray-500 text-lg">
              This isn't just a call. It's a turning point in your life.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-gold-light/20 backdrop-blur-sm rounded-3xl shadow-2xl glow-gold-soft p-8 md:p-12 border border-gold-light/30">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left side - Testimonial */}
              <div className="space-y-5">
                <blockquote className="relative">
                  <div className="absolute -top-2 -left-2 text-5xl text-gold-light/40 font-serif leading-none">"</div>
                  <div className="relative pl-4">
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      Your videos. Your content. Your attempt at helping people understand some difficult or controversial subjects in a positive way. Felt like I can approach you with a difficult subject matter and you can somehow take it apart and simplify it. You are also convincing — so whatever I felt I needed help with, I felt you could convince me of the right way.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4 italic">
                      What's more is that most people came really hard on me when I sought their advice. You were straightforward, but also so careful as to not break me or hurt me. I felt for the whole day and day after like I could lean on you — rest my head on your shoulder safely.
                    </p>
                    <p className="text-gray-700 leading-relaxed italic">
                      Thank you for it all.
                    </p>
                  </div>
                  <div className="absolute -bottom-2 right-0 text-5xl text-gold-light/40 font-serif leading-none">"</div>
                </blockquote>
                
                <p className="text-gray-500 text-sm font-light text-right pt-2">
                  — A past client
                </p>

                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    This is a private one-on-one call with me — just you and me.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    If you're feeling lost, overwhelmed, heartbroken, or disconnected from God — you're not alone.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    This isn't therapy. And it's not a lecture. It's a real conversation where we talk openly about what's been weighing on your heart.
                  </p>

                  <p className="text-gray-600 font-light italic text-sm">
                    Every session is private. Every word is confidential. And every second is just for you.
                  </p>
                </div>
              </div>

              {/* Right side - Calendar */}
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg border border-gold-light/20">
                <h3 className="text-2xl font-medium text-gray-900 mb-6 text-center">
                  Select Your Time
                </h3>
                
                {/* Cal.com embed container */}
                <div className="rounded-xl overflow-hidden border border-gold-light/30 mb-6" style={{ width: '100%', height: '600px', overflow: 'scroll' }}>
                  <Cal 
                    key={Date.now()} // Force refresh with cache-busting
                    namespace="1-on-1-call-with-hussein"
                    calLink="husseinsbeiti/1-on-1-call-with-hussein"
                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                    config={{"layout":"month_view","theme":"light"}}
                  />
                </div>

                <p className="text-sm text-gray-500 text-center mt-4 italic">
                  This is a sacred space. No group calls, no quick fixes — just you, me, and the truth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section E - Footer */}
        <footer className="text-center py-12 border-t border-gold-light/20">
          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            © 2025 Divine Consultation. All rights reserved.<br />
            This is a spiritual guidance resource and does not replace professional therapy or medical advice.
          </p>
        </footer>
      </div>
    </main>
  )
}

