'use client'

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background - soft lavender to peachy white */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8e4f0] via-[#f5f0eb] to-[#ede8e0]"></div>
      
      {/* Radial glow - center light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-[#fefdf8]/80 via-[#f8f4ed]/40 to-transparent rounded-full blur-2xl"></div>
      
      {/* Top left glow */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-[#f0eef5]/60 to-transparent rounded-full blur-2xl"></div>
      
      {/* Bottom right peachy glow */}
      <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-[#f5ebe0]/50 to-transparent rounded-full blur-2xl"></div>
      
      {/* Cloud layer using CSS */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse 600px 250px at 20% 80%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 235, 225, 0.5) 35%, transparent 65%),
          radial-gradient(ellipse 500px 200px at 85% 75%, rgba(255, 255, 255, 0.7) 0%, rgba(245, 240, 235, 0.45) 35%, transparent 65%),
          radial-gradient(ellipse 700px 300px at 50% 90%, rgba(255, 255, 255, 0.85) 0%, rgba(245, 238, 230, 0.55) 35%, transparent 65%),
          radial-gradient(ellipse 450px 180px at 10% 20%, rgba(250, 248, 245, 0.75) 0%, rgba(240, 235, 228, 0.4) 35%, transparent 65%),
          radial-gradient(ellipse 550px 220px at 75% 25%, rgba(255, 252, 248, 0.75) 0%, rgba(242, 237, 230, 0.45) 35%, transparent 65%),
          radial-gradient(ellipse 400px 160px at 40% 15%, rgba(248, 245, 240, 0.65) 0%, rgba(238, 233, 226, 0.35) 35%, transparent 65%),
          radial-gradient(ellipse 650px 280px at 60% 70%, rgba(255, 253, 250, 0.8) 0%, rgba(243, 238, 232, 0.5) 35%, transparent 65%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      
      {/* Soft overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#e5e0d8]/10"></div>
      
      {/* Sparkle/light orbs */}
      <div className="absolute top-[15%] left-[25%] w-4 h-4 bg-white/80 rounded-full blur-[2px] animate-pulse"></div>
      <div className="absolute top-[25%] right-[30%] w-3 h-3 bg-white/70 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[30%] left-[15%] w-5 h-5 bg-white/65 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[45%] right-[20%] w-3.5 h-3.5 bg-white/75 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-[60%] left-[70%] w-4 h-4 bg-white/65 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-[20%] right-[45%] w-6 h-6 bg-[#f8f0e8]/70 rounded-full blur-[3px] animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute top-[40%] left-[50%] w-3 h-3 bg-white/60 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '3s' }}></div>
    </div>
  )
}

