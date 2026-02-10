'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      console.log('Submitting signup with:', { name, email });

      // Save user to database
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Signup response status:', signupResponse.status);

      const signupData = await signupResponse.json();
      console.log('Signup response data:', signupData);

      if (signupData.success) {
        // Redirect to login page
        router.push('/customer-auth/login-page');
      } else {
        setError(signupData.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

          {/* Header with User Plus Icon */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-18 h-18 rounded-[1.25rem] mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(168, 85, 247, 0.3) 100%)',
                border: '2px solid rgba(168, 85, 247, 0.4)',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
              }}
            >
              <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
              Create Account
            </h1>
            <p className="text-purple-200 text-sm font-light opacity-90">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-2 tracking-wider uppercase opacity-80">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                className="w-full px-4 py-3.5 rounded-xl text-white text-[15px] placeholder-purple-300 placeholder-opacity-50 focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-2 tracking-wider uppercase opacity-80">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full px-4 py-3.5 rounded-xl text-white text-[15px] placeholder-purple-300 placeholder-opacity-50 focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-2 tracking-wider uppercase opacity-80">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-3.5 rounded-xl text-white text-[15px] placeholder-purple-300 placeholder-opacity-50 focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                placeholder="At least 6 characters"
                required
              />
              <p className="text-purple-300 text-xs mt-2 opacity-70">Minimum 6 characters required</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl px-4 py-3.5"
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)',
                }}
              >
                <p className="text-sm text-red-300 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-[15px] text-white transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c026d3 100%)',
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)',
              }}
            >
              {loading ? 'Creating your account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-sm text-purple-200 opacity-90">
              Already have an account?{' '}
              <Link href="/customer-auth/login-page" className="text-white font-semibold hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/customer-auth/login" className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back
          </Link>
        </div>

        {/* Bottom branding */}
        <p className="text-center mt-6 text-purple-300 text-xs tracking-widest uppercase font-light opacity-70">
          Crafted with ♥ in India
        </p>
      </div>
    </div>
  );
}
