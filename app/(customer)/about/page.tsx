'use client';

import Link from 'next/link';
import { ShoppingBag, Star, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-stone-50 min-h-screen font-sans">
            {/* Navigation Overlay (Ensure consistency if global nav exists, otherwise standalone) */}
            <nav className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-between items-center">
                <Link href="/" className="text-stone-800 hover:text-primary-700 transition-colors font-serif tracking-widest uppercase font-bold">
                    The Weave House
                </Link>
                <Link
                    href="/"
                    className="text-sm font-medium tracking-wide text-stone-600 hover:text-primary-700 transition-colors uppercase"
                >
                    Back to Home
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Abstract/Texture background suggestion - replaced with simple premium gradient for now */}
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200 opacity-80"></div>
                    {/* Decorative circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
                    <span className="block text-primary-700 text-sm md:text-base tracking-[0.4em] uppercase mb-4 font-semibold">
                        Since 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-6 tracking-tight">
                        Weaving Traditions
                    </h1>
                    <p className="text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
                        Where heritage meets contemporary elegance. Discover the artistry behind every drape.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 space-y-6 animate-fade-in-up delay-100">
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Our Story</h2>
                        <div className="w-20 h-1 bg-primary-600"></div>
                        <p className="text-stone-600 leading-8 text-lg">
                            At <span className="font-serif text-stone-900">The Weave House</span>, we believe that a saree is not just a garment; it is a story woven with threads of tradition, culture, and love. Our journey began with a passion to preserve the timeless art of handloom weaving while bringing modern aesthetics to the forefront.
                        </p>
                        <p className="text-stone-600 leading-8 text-lg">
                            We carefully curate each piece, working directly with master artisans to ensure that every fold tells a tale of craftsmanship. From the rich silks of Kanchipuram to the breezy cottons of Coimbatore, our collection is a tribute to India's textile heritage.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 relative h-[500px] bg-stone-200 rounded-lg overflow-hidden shadow-2xl animate-fade-in-up">
                        {/* Placeholder for About Image - In a real app, use next/image here */}
                        <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-500">
                            <span className="italic">image: artisan weaving or showroom interior</span>
                        </div>
                        {/* Decorative border */}
                        <div className="absolute inset-4 border border-white/30 rounded"></div>
                    </div>
                </div>
            </section>

            {/* Features / Trust Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Why Choose Us</h2>
                        <div className="w-1 mx-auto h-16 bg-primary-200"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="text-center space-y-4 p-6 group hover:bg-stone-50 transition-colors rounded-xl duration-300">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                                <Star className="w-8 h-8 text-primary-700" />
                            </div>
                            <h3 className="text-xl font-serif text-stone-900">Premium Quality</h3>
                            <p className="text-stone-600 leading-relaxed">
                                We obsess over quality. Each saree is handpicked and inspected to ensure it meets our high standards of excellence.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center space-y-4 p-6 group hover:bg-stone-50 transition-colors rounded-xl duration-300">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                                <ShieldCheck className="w-8 h-8 text-primary-700" />
                            </div>
                            <h3 className="text-xl font-serif text-stone-900">Authentic Heritage</h3>
                            <p className="text-stone-600 leading-relaxed">
                                Sourced directly from weavers, guaranteeing authenticity and supporting the livelihood of traditional artisans.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center space-y-4 p-6 group hover:bg-stone-50 transition-colors rounded-xl duration-300">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                                <Heart className="w-8 h-8 text-primary-700" />
                            </div>
                            <h3 className="text-xl font-serif text-stone-900">Customer Love</h3>
                            <p className="text-stone-600 leading-relaxed">
                                Trusted by thousands of happy customers who have found their perfect drape for weddings, festivals, and every day.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-stone-900 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Ready to Elevate Your Style?</h2>
                    <p className="text-stone-300 text-lg mb-10 font-light">Explore our latest collection of exquisite sarees and find the one that speaks to you.</p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center px-10 py-4 bg-white text-stone-900 hover:bg-primary-50 transition-all duration-300 uppercase tracking-widest font-semibold text-sm rounded-sm"
                    >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Footer Simple */}
            <footer className="py-8 bg-stone-950 text-stone-500 text-center text-sm border-t border-stone-800">
                <p>&copy; {new Date().getFullYear()} The Weave House. All rights reserved.</p>
            </footer>
        </div>
    );
}
