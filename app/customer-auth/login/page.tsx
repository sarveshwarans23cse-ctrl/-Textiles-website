'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CustomerAuthPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 20%, #4c1d95 40%, #581c87 60%, #6b21a8 80%, #7e22ce 100%)',
      }}
    >
      {/* Animated aurora effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(217, 70, 239, 0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
            animation: 'aurora 8s ease-in-out infinite',
          }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes aurora {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
        }
      `}</style>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-lg px-6 animate-fade-in-up">
        <div className="rounded-[2rem] p-12 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
          }}
        >
          {/* Glowing top edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 50%, transparent)',
            }} />

          {/* Brand Logo with glow */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.25rem] mb-6 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(168, 85, 247, 0.3) 100%)',
                border: '2px solid rgba(168, 85, 247, 0.4)',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
              }}
            >
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
              The Weave House
            </h1>
            <p className="text-purple-200 text-[15px] font-light opacity-90">
              Premium Silk Sarees & Textiles
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-8 mb-8 max-w-md mx-auto">
            {/* Login Card */}
            <Link href="/customer-auth/login-page">
              <div
                className="group rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard('login')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === 'login'
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.25) 100%)'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: hoveredCard === 'login'
                    ? '1px solid rgba(139, 92, 246, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: hoveredCard === 'login'
                    ? '0 20px 40px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255,255,255,0.15)'
                    : '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: hoveredCard === 'login'
                        ? 'rgba(139, 92, 246, 0.4)'
                        : 'rgba(139, 92, 246, 0.25)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      boxShadow: hoveredCard === 'login' ? '0 8px 20px rgba(139, 92, 246, 0.4)' : 'none',
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">Log in</h3>
                    <p className="text-purple-200 text-sm opacity-80">Access your orders & wishlist</p>
                  </div>
                  <svg className={`w-6 h-6 text-purple-200 transition-all duration-300 ${hoveredCard === 'login' ? 'translate-x-2 opacity-100' : 'opacity-50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Sign Up Card */}
            <Link href="/customer-auth/signup-page">
              <div
                className="group rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
                onMouseEnter={() => setHoveredCard('signup')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === 'signup'
                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.25) 100%)'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: hoveredCard === 'signup'
                    ? '1px solid rgba(168, 85, 247, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: hoveredCard === 'signup'
                    ? '0 20px 40px rgba(168, 85, 247, 0.3), inset 0 1px 1px rgba(255,255,255,0.15)'
                    : '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: hoveredCard === 'signup'
                        ? 'rgba(168, 85, 247, 0.4)'
                        : 'rgba(168, 85, 247, 0.25)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      boxShadow: hoveredCard === 'signup' ? '0 8px 20px rgba(168, 85, 247, 0.4)' : 'none',
                    }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">Create account</h3>
                    <p className="text-purple-200 text-sm opacity-80">Join us in under a minute</p>
                  </div>
                  <svg className={`w-6 h-6 text-purple-200 transition-all duration-300 ${hoveredCard === 'signup' ? 'translate-x-2 opacity-100' : 'opacity-50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 50%, transparent)' }} />

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-purple-200 hover:text-white transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        {/* Bottom branding */}
        <p className="text-center mt-8 text-purple-300 text-xs tracking-widest uppercase font-light opacity-70">
          Crafted with ♥ in India
        </p>
      </div>
    </div>
  );
}
