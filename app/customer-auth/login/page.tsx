'use client';

import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';

export default function CustomerAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Customer Access</h1>
        <p className="text-gray-600 mb-12 text-lg">Login or create a new account</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login Card */}
          <Link href="/customer-auth/login-page">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col items-center justify-center border-t-4 border-primary-500 hover:scale-105">
              <LogIn className="w-12 h-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
              <p className="text-gray-600 text-sm">Sign in to your account</p>
            </div>
          </Link>

          {/* Signup Card */}
          <Link href="/customer-auth/signup-page">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col items-center justify-center border-t-4 border-primary-500 hover:scale-105">
              <UserPlus className="w-12 h-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h2>
              <p className="text-gray-600 text-sm">Create a new account</p>
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-primary-600 hover:underline font-medium">
            Back to Login Options
          </Link>
        </div>
      </div>
    </div>
  );
}
