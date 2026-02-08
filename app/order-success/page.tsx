'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 max-w-sm w-full mb-8">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500 text-sm">Order ID</span>
                    <span className="font-mono font-medium text-gray-900">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Estimated Delivery</span>
                    <span className="font-medium text-gray-900">3-5 Days</span>
                </div>
            </div>

            <Link
                href="/"
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-200"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
