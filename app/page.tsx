'use client';

import Link from 'next/link';
import { LogIn, Crown, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function AuthLanding() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a0a2e 25%, #302b63 50%, #24243e 75%, #0f0c29 100%)',
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Golden floating orbs */}
        <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-amber-400 rounded-full animate-float opacity-40" style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-amber-300 rounded-full animate-float opacity-30" style={{ animationDelay: '1s', animationDuration: '5s' }} />
        <div className="absolute bottom-[30%] left-[10%] w-1.5 h-1.5 bg-amber-500 rounded-full animate-float opacity-50" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-amber-400 rounded-full animate-float opacity-35" style={{ animationDelay: '2s', animationDuration: '4.5s' }} />
        <div className="absolute top-[40%] left-[40%] w-1 h-1 bg-amber-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1.5s', animationDuration: '6s' }} />
        <div className="absolute bottom-[20%] right-[35%] w-2.5 h-2.5 bg-amber-400 rounded-full animate-float opacity-25" style={{ animationDelay: '3s', animationDuration: '5.5s' }} />
        <div className="absolute top-[75%] left-[60%] w-1 h-1 bg-amber-200 rounded-full animate-float opacity-45" style={{ animationDelay: '0.8s', animationDuration: '4.2s' }} />
        <div className="absolute top-[15%] left-[70%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-float opacity-30" style={{ animationDelay: '2.5s', animationDuration: '5s' }} />

        {/* Large blurred gradient circles */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-600/10 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-purple-600/10 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl w-full px-6">
        {/* Logo / Brand Icon */}
        <div className="animate-fade-in-down mb-6" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-amber-700/10 backdrop-blur-sm animate-glow-pulse">
            <Sparkles className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="animate-fade-in-down text-5xl md:text-6xl font-bold mb-3 tracking-tight" style={{ animationDelay: '0.2s' }}>
          <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
            The Weave House
          </span>
        </h1>

        {/* Decorative Line */}
        <div className="animate-fade-in-up flex items-center justify-center gap-3 mb-4" style={{ animationDelay: '0.3s' }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
          <div className="w-2 h-2 rotate-45 bg-amber-400/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up text-gray-300/80 text-lg md:text-xl mb-12 font-light tracking-wide" style={{ animationDelay: '0.4s' }}>
          Premium Silk Sarees & Textiles
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
          {/* Customer Card */}
          <Link href="/customer-auth/login" className="animate-fade-in-left" style={{ animationDelay: '0.5s' }}>
            <div
              className="premium-card premium-border group relative rounded-3xl p-8 cursor-pointer transition-all duration-500"
              onMouseEnter={() => setHoveredCard('customer')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === 'customer'
                  ? 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(180,83,9,0.08) 100%)'
                  : 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Icon */}
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(180,83,9,0.1) 100%)',
                  border: '1px solid rgba(245,158,11,0.3)',
                }}
              >
                <LogIn className="w-7 h-7 text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>

              {/* Text */}
              <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">Customer</h2>
              <p className="text-gray-400 text-sm font-light">Login or create an account</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>
          </Link>

          {/* Admin Card */}
          <Link href="/admin/login" className="animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
            <div
              className="premium-card premium-border group relative rounded-3xl p-8 cursor-pointer transition-all duration-500"
              onMouseEnter={() => setHoveredCard('admin')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === 'admin'
                  ? 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.08) 100%)'
                  : 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Icon */}
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(139,92,246,0.1) 100%)',
                  border: '1px solid rgba(168,85,247,0.3)',
                }}
              >
                <Crown className="w-7 h-7 text-purple-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>

              {/* Text */}
              <h2 className="text-xl font-semibold text-white mb-2 tracking-wide">Admin</h2>
              <p className="text-gray-400 text-sm font-light">Admin access only</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="animate-fade-in-up mt-12" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-500 text-xs font-light tracking-widest uppercase">
            Crafted with ♥ in India
          </p>
        </div>
      </div>
    </div>
  );
}
