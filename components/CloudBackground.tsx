'use client'

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Simplified static gradient background - optimized for mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8e4f0] via-[#f5f0eb] to-[#ede8e0]"></div>

      {/* Single center glow - reduced blur for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#fefdf8]/60 via-[#f8f4ed]/30 to-transparent rounded-full blur-xl"></div>

      {/* Simplified cloud layer - fewer gradients for better performance */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse 600px 250px at 30% 80%, rgba(255, 255, 255, 0.6) 0%, transparent 70%),
          radial-gradient(ellipse 700px 300px at 70% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 70%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#e5e0d8]/5"></div>
    </div>
  )
}

