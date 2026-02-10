'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, ArrowRight, Loader2, Shield, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials');
            } else {
                router.push('/admin');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-4" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 25%, #0f172a 50%, #0c1929 75%, #071222 100%)' }}>
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large Glow */}
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

                {/* Floating Dots/Stars */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}

                {/* Larger Particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`large-${i}`}
                        className="absolute w-2 h-2 bg-cyan-400/40 rounded-full blur-sm animate-float-slow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}

                {/* Corner Circles */}
                <div className="absolute bottom-10 right-10 flex gap-3">
                    <div className="w-4 h-4 bg-slate-600/30 rounded-full" />
                    <div className="w-6 h-6 bg-slate-600/20 rounded-full" />
                </div>
            </div>

            {/* Login Card */}
            <div className={`relative transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent rounded-2xl blur-xl" />

                <div
                    className="relative w-[360px] rounded-2xl p-6 border border-white/10"
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 25, 45, 0.9) 0%, rgba(20, 35, 60, 0.85) 50%, rgba(15, 25, 45, 0.9) 100%)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                    }}
                >
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-slate-400 text-xs">Welcome to <span className="text-cyan-400">Admin</span></p>
                            <Link href="/" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
                                ← Back to Store
                            </Link>
                        </div>
                        <h1 className="text-3xl font-semibold text-white tracking-tight">
                            Sign in
                        </h1>
                    </div>

                    {/* Brand Badge */}
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">The Weave House</p>
                            <p className="text-slate-500 text-xs">Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-400 mb-2 block">Enter your username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all outline-none text-white text-sm placeholder:text-slate-600"
                                    placeholder="Username or email address"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 mb-2 block">Enter your Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all outline-none text-white text-sm placeholder:text-slate-600"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button type="button" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">
                                Forgot Password
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-900 font-semibold py-3 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-800/50 text-center">
                        <p className="text-slate-600 text-[10px] flex items-center justify-center gap-2">
                            <Lock className="w-3 h-3" />
                            Secured with 256-bit encryption
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Lock Icon on Right (CSS Only) */}
            <div className="hidden lg:block absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl w-64 h-64 -translate-x-1/4" />

                    {/* Lock Icon */}
                    <div className="relative w-32 h-40 border-4 border-cyan-400/60 rounded-t-full flex items-end justify-center" style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)' }}>
                        <div className="w-full h-24 bg-gradient-to-b from-cyan-500/20 to-cyan-500/5 border-t-4 border-cyan-400/60 rounded-b-lg flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}>
                            <div className="w-4 h-6 bg-cyan-400/80 rounded-full" />
                        </div>
                    </div>

                    {/* Particles around lock */}
                    <div className="absolute -top-4 -right-4 w-2 h-2 bg-cyan-400/80 rounded-full animate-pulse" />
                    <div className="absolute top-1/4 -left-6 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1/4 -right-8 w-1 h-1 bg-cyan-400/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </div>
        </div>
    );
}
