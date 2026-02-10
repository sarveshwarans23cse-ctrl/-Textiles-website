'use client';

import Link from 'next/link';
import { LogIn, Crown } from 'lucide-react';

export default function AuthLanding() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to The Weave House</h1>
        <p className="text-gray-600 mb-12 text-lg">Select your account type to continue</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Login Card */}
          <Link href="/customer-auth/login">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col items-center justify-center border-t-4 border-primary-500 hover:scale-105">
              <LogIn className="w-12 h-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer</h2>
              <p className="text-gray-600 text-sm">Login or create an account</p>
            </div>
          </Link>

          {/* Admin Login Card */}
          <Link href="/admin/login">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col items-center justify-center border-t-4 border-amber-600 hover:scale-105">
              <Crown className="w-12 h-12 text-amber-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin</h2>
              <p className="text-gray-600 text-sm">Admin access only</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
