'use client';

import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Package } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
    useEffect(() => {
        // Fire confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-stone-50 via-white to-amber-50 p-4 text-center">
            {/* Success Animation */}
            <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-200 animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-14 h-14 text-white" />
                </div>
            </div>

            <h1 className="text-4xl font-bold text-stone-900 mb-3">Order Placed Successfully!</h1>
            <p className="text-stone-500 mb-8 max-w-md text-lg">
                Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
            </p>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-stone-200 shadow-xl max-w-sm w-full mb-8">
                <div className="flex justify-between mb-4 pb-4 border-b border-stone-100">
                    <span className="text-stone-500">Order ID</span>
                    <span className="font-mono font-bold text-stone-900">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between mb-4 pb-4 border-b border-stone-100">
                    <span className="text-stone-500">Estimated Delivery</span>
                    <span className="font-semibold text-stone-900">3-5 Days</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-stone-500">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Confirmed</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/orders"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all shadow-lg"
                >
                    <Package className="w-5 h-5" />
                    Track Order
                </Link>
                <Link
                    href="/collections"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-full font-semibold hover:bg-stone-50 hover:border-stone-300 transition-all"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

