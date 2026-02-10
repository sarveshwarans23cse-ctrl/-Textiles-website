'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState<{ exists: boolean; isVerified: boolean } | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [testOTP, setTestOTP] = useState<string | null>(null);
  const router = useRouter();

  // Check user status when email changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setUserStatus(null);
    setIsFirstTime(false);
  };

  const checkUserStatus = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check-user-status', email }),
      });

      const data = await response.json();

      if (data.success) {
        if (!data.exists) {
          setError('User not found. Please sign up first.');
          setUserStatus(null);
        } else {
          setUserStatus({ exists: true, isVerified: data.isVerified });
          setIsFirstTime(!data.isVerified);
        }
      } else {
        setError('Failed to check user status');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-otp', email }),
      });

      const data = await response.json();
      console.log('OTP Response:', data);

      if (data.success) {
        setShowOTP(true);
        // Store test OTP if provided (for development mode)
        if (data.testOTP) {
          setTestOTP(data.testOTP);
        }
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-otp', email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/customer-home');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // For now, just redirect to customer home (in production, validate password against DB)
      router.push('/customer-home');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Customer Login
        </h1>

        {/* Email Input - Always Visible */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Check User Status Button */}
          {!userStatus && !showOTP && (
            <button
              type="button"
              onClick={checkUserStatus}
              disabled={loading || !email}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Continue'}
            </button>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* First-Time User - Show OTP Option Only */}
          {userStatus && isFirstTime && !showOTP && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Welcome! Since this is your first time, please verify with OTP.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP to Email'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserStatus(null);
                  setEmail('');
                  setError('');
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-800 py-2"
              >
                Change Email
              </button>
            </>
          )}

          {/* Returning User - Show Login Form Only */}
          {userStatus && !isFirstTime && !showOTP && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <form onSubmit={handleLogin} className="space-y-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <button
                type="button"
                onClick={() => {
                  setUserStatus(null);
                  setPassword('');
                  setError('');
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-800 py-2"
              >
                Change Email
              </button>
            </>
          )}

          {/* OTP Verification Form */}
          {showOTP && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  OTP sent to <strong>{email}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">Valid for 10 minutes</p>
              </div>

              {/* Test OTP Display (Development Mode) */}
              {testOTP && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-xs text-amber-700 font-semibold mb-2">📋 TEST MODE - OTP:</p>
                  <p className="text-2xl font-bold text-amber-600 text-center font-mono">{testOTP}</p>
                  <p className="text-xs text-amber-600 mt-2">👆 Copy this code above or enter it manually</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <button
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading || !otp}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOTP(false);
                  setOtp('');
                  setTestOTP(null);
                  setError('');
                }}
                className="w-full text-sm text-gray-600 hover:text-gray-800 py-2"
              >
                Back
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/customer-auth/signup-page" className="text-primary-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link href="/customer-auth/login" className="text-sm text-gray-600 hover:underline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
