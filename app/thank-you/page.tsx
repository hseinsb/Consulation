'use client'

import { useState, useEffect, useRef } from 'react'
import Cal, { getCalApi } from "@calcom/embed-react"
import CloudBackground from '@/components/CloudBackground'

export default function ThankYou() {
  const [showVideo, setShowVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Fade in video after component mounts
    const timer = setTimeout(() => setShowVideo(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handlePlayClick = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error playing video:', error)
      }
    }
  }

  // Auto-trigger play after video loads
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current
      const tryAutoPlay = async () => {
        try {
          await video.play()
          setIsPlaying(true)
        } catch (error) {
          // Autoplay blocked, user will need to click play button
          console.log('Autoplay blocked, waiting for user interaction')
        }
      }
      
      // Wait for video to be ready
      if (video.readyState >= 2) {
        tryAutoPlay()
      } else {
        video.addEventListener('loadeddata', tryAutoPlay, { once: true })
      }
    }
  }, [showVideo])

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
    // Open your Google Drive PDF directly
    window.open('https://drive.google.com/file/d/145QE7-SWB5hGyDEOQTCkuKPHWx-M5ww6/view?usp=sharing', '_blank')
  }

  return (
    <main className="relative min-h-screen px-4 py-12 overflow-hidden">
      <CloudBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Section A - Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-gray-900 leading-tight mb-6 text-shadow-soft">
            You Weren't Sent Here by Accident.
          </h1>
          <p className="text-xl md:text-2xl font-normal text-gray-700 mb-3">
            Your Divine Consultation Guide is ready below.
          </p>
          <p className="text-lg md:text-xl font-normal text-gold-dark">
            But first… I need to show you what this really means.
          </p>
        </div>

        {/* Section B - Golden Video Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-white/95 to-gold-light/30 rounded-3xl shadow-2xl glow-gold-soft p-8 md:p-12 border border-gold-light/30">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 text-center mb-8">
              A Personal Message for You
            </h2>
            
            {/* Video Player - Vertical 9:16 Format */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-[350px] rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ aspectRatio: '9/16' }}>
                {showVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="auto"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source src="/IMG_9523.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Custom Play Button Overlay */}
                    {!isPlaying && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group"
                        onClick={handlePlayClick}
                      >
                        <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 glow-gold-soft">
                          <svg 
                            className="w-10 h-10 text-white ml-1" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse text-gold">Loading...</div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-gray-700 font-normal text-lg leading-relaxed">
              In this video, I explain why the free guide is just the beginning of your healing,
              and how a personal consultation can transform your spiritual and emotional life.
            </p>
          </div>
        </div>

        {/* Section C - CTA Buttons */}
        <div className="max-w-2xl mx-auto mb-20 space-y-6 text-center">
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
        <div id="booking-section" className="scroll-mt-20 max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
              What It Felt Like to Talk to Me One-on-One
            </h2>
            <p className="text-center text-gray-500 text-lg">
              This isn't just a call. It's a turning point in your life.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/95 to-gold-light/30 rounded-3xl shadow-2xl glow-gold-soft p-6 md:p-10 border border-gold-light/30">
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
              
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
                
                  <p className="text-gray-500 text-sm font-normal text-right pt-2">
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

                  <p className="text-gray-600 font-normal italic text-sm">
                    Every session is private. Every word is confidential. And every second is just for you.
                  </p>
                </div>
              </div>

              {/* Right side - Calendar */}
              <div className="bg-white/80 rounded-2xl p-4 md:p-6 shadow-lg border border-gold-light/20 w-full">
                <h3 className="text-2xl font-medium text-gray-900 mb-6 text-center">
                  Select Your Time
                </h3>
                
                      {/* Cal.com embed container - mobile friendly with no height restriction */}
                      <div className="rounded-xl border border-gold-light/30 mb-6 w-full" style={{ minHeight: '500px' }}>
                        <Cal
                          key={Date.now()} // Force refresh with cache-busting
                          namespace="1-on-1-call-with-hussein"
                          calLink="husseinsbeiti/1-on-1-call-with-hussein"
                          style={{width:"100%",height:"100%",minHeight:"500px"}}
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
          <p className="text-sm text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
            © 2025 Divine Consultation. All rights reserved.<br />
            This is a spiritual guidance resource and does not replace professional therapy or medical advice.
          </p>
        </footer>
      </div>
    </main>
  )
}

