'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, ShieldCheck, Heart, Award, Sparkles, ArrowRight, Phone, Mail, MapPin, Play, Users, Gem, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsLoaded(true);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 min-h-screen font-sans overflow-hidden">
            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6); }
                }
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(60px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-60px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(60px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-gold {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
                @keyframes borderGlow {
                    0%, 100% { border-color: rgba(212, 175, 55, 0.2); }
                    50% { border-color: rgba(212, 175, 55, 0.5); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-shimmer { 
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                }
                .animate-glow { animation: glow 3s ease-in-out infinite; }
                .animate-slide-up { animation: slideInUp 0.8s ease-out forwards; }
                .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; }
                .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; }
                .animate-fade { animation: fadeIn 1s ease-out forwards; }
                .animate-rotate { animation: rotate 20s linear infinite; }
                .animate-pulse-gold { animation: pulse-gold 4s ease-in-out infinite; }
                .animate-border-glow { animation: borderGlow 3s ease-in-out infinite; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }
                .glass-premium {
                    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .glass-gold {
                    background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(255,215,0,0.05) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212,175,55,0.2);
                }
                .text-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .bg-gradient-gold {
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%);
                }
            `}</style>

            {/* Premium Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'glass-premium py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Crown className="w-5 h-5 text-stone-900" />
                        </div>
                        <span className="text-gradient-gold font-serif tracking-widest uppercase font-bold text-lg">The Weave House</span>
                    </Link>
                    <div className="flex gap-8 text-sm tracking-wider">
                        <Link href="/" className="text-stone-300 hover:text-amber-400 transition-all duration-300 relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/collections" className="text-stone-300 hover:text-amber-400 transition-all duration-300 relative group">
                            Collections
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/cart" className="text-stone-300 hover:text-amber-400 transition-all duration-300 relative group">
                            Cart
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Premium Dark Design */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    {/* Main gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950"></div>

                    {/* Animated orbs */}
                    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-rose-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/15 to-amber-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/5 to-transparent rounded-full"></div>

                    {/* Decorative rotating ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/10 rounded-full animate-rotate"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-amber-400/5 rounded-full animate-rotate" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>

                    {/* Floating particles */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/50 rounded-full animate-pulse-gold"></div>
                    <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-amber-300/40 rounded-full animate-pulse-gold" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-amber-500/50 rounded-full animate-pulse-gold" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                    {/* Premium Badge */}
                    <div className={`inline-flex items-center gap-3 px-6 py-3 glass-gold rounded-full mb-10 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-medium text-amber-200 tracking-[0.2em] uppercase">Since 2024 • Kanchipuram Heritage</span>
                        <Gem className="w-5 h-5 text-amber-400" />
                    </div>

                    <h1 className={`text-6xl md:text-8xl font-serif mb-8 tracking-tight leading-tight ${isLoaded ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
                        <span className="block text-gradient-gold drop-shadow-lg">Weaving</span>
                        <span className="block text-white mt-2">Timeless Traditions</span>
                    </h1>

                    <p className={`text-xl md:text-2xl text-stone-400 font-light max-w-3xl mx-auto leading-relaxed ${isLoaded ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
                        Where heritage meets contemporary elegance. Every thread tells a story, every weave carries a legacy.
                    </p>

                    {/* Decorative Line */}
                    <div className={`flex items-center justify-center gap-6 mt-12 ${isLoaded ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                        <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                    </div>

                    {/* CTA Button */}
                    <div className={`mt-12 ${isLoaded ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
                        <Link
                            href="/collections"
                            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-gold text-stone-900 font-semibold rounded-full shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="tracking-wider uppercase text-sm">Explore Collections</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-7 h-12 border-2 border-amber-500/40 rounded-full flex justify-center p-2">
                        <div className="w-1.5 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '500+', label: 'Unique Designs', icon: Gem },
                            { value: '50+', label: 'Master Artisans', icon: Users },
                            { value: '10K+', label: 'Happy Customers', icon: Heart },
                            { value: '15+', label: 'Years Experience', icon: Award },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group glass-premium rounded-2xl p-6 text-center hover:glass-gold transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-gold flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                                    <stat.icon className="w-6 h-6 text-stone-900" />
                                </div>
                                <div className="text-4xl font-serif text-gradient-gold font-bold mb-2">{stat.value}</div>
                                <div className="text-sm text-stone-400 tracking-wide uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section with Featured Image */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-3 text-amber-400 text-sm tracking-[0.3em] uppercase font-semibold">
                            <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
                            Our Story
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                            A Legacy of Excellence in <span className="text-gradient-gold">Silk Craftsmanship</span>
                        </h2>

                        <p className="text-lg text-stone-400 leading-8">
                            At <span className="font-serif font-semibold text-amber-300">The Weave House</span>, we believe that a saree is not just a garment; it is a story woven with threads of tradition, culture, and love. Our journey began with a passion to preserve the timeless art of handloom weaving while bringing modern aesthetics to the forefront.
                        </p>

                        <p className="text-lg text-stone-400 leading-8">
                            We carefully curate each piece, working directly with master artisans to ensure that every fold tells a tale of craftsmanship. From the rich silks of Kanchipuram to the breezy cottons of Coimbatore, our collection is a tribute to India's textile heritage.
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                                'Handpicked Collections',
                                'Authentic Craftsmanship',
                                'Premium Quality Silk',
                                'Traditional Weaving'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 text-stone-300">
                                    <div className="w-6 h-6 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10">
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-amber-500/50 via-amber-300/20 to-amber-500/50 animate-shimmer z-0">
                                <div className="absolute inset-[2px] bg-stone-900 rounded-3xl"></div>
                            </div>

                            {/* Main Image */}
                            <div className="absolute inset-[3px] rounded-3xl overflow-hidden">
                                <Image
                                    src="/image.png"
                                    alt="The Weave House - Premium Silk Sarees Showroom"
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    priority
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent z-10"></div>

                                {/* Caption */}
                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <div className="glass-gold rounded-xl p-5 backdrop-blur-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                                                <Play className="w-5 h-5 text-stone-900 ml-0.5" />
                                            </div>
                                            <div>
                                                <p className="text-amber-200 font-medium tracking-wide">Our Showroom</p>
                                                <p className="text-stone-400 text-sm">Kanchipuram, Tamil Nadu</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500/30 to-transparent rounded-full blur-2xl animate-pulse-gold"></div>
                        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-amber-600/20 to-rose-500/10 rounded-full blur-2xl animate-pulse-gold" style={{ animationDelay: '1s' }}></div>
                    </div>
                </div>
            </section>

            {/* Values Section with Premium Cards */}
            <section className="py-24 relative overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-flex items-center gap-3 text-amber-400 text-sm tracking-[0.3em] uppercase mb-6 font-semibold">
                            <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
                            Why Choose Us
                            <div className="w-8 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">The Weave House <span className="text-gradient-gold">Promise</span></h2>
                        <p className="text-stone-400 text-lg max-w-2xl mx-auto">Experience the difference of authentic craftsmanship and uncompromising quality</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group relative p-8 rounded-3xl glass-premium hover:glass-gold transition-all duration-500 hover:-translate-y-3 animate-border-glow">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Star className="w-8 h-8 text-stone-900" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-4">Premium Quality</h3>
                                <p className="text-stone-400 leading-relaxed">
                                    We obsess over quality. Each saree is handpicked and inspected to ensure it meets our exceptionally high standards of excellence.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative p-8 rounded-3xl glass-premium hover:glass-gold transition-all duration-500 hover:-translate-y-3 animate-border-glow" style={{ animationDelay: '1s' }}>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <ShieldCheck className="w-8 h-8 text-stone-900" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-4">Authentic Heritage</h3>
                                <p className="text-stone-400 leading-relaxed">
                                    Sourced directly from weavers, guaranteeing authenticity and supporting the livelihood of traditional artisans across India.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative p-8 rounded-3xl glass-premium hover:glass-gold transition-all duration-500 hover:-translate-y-3 animate-border-glow" style={{ animationDelay: '2s' }}>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Heart className="w-8 h-8 text-stone-900" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-4">Customer Love</h3>
                                <p className="text-stone-400 leading-relaxed">
                                    Trusted by thousands of happy customers who have found their perfect drape for weddings, festivals, and every special occasion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-3 text-amber-400 text-sm tracking-[0.3em] uppercase mb-6 font-semibold">
                            <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
                            The Journey
                            <div className="w-8 h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">From Loom <span className="text-gradient-gold">to You</span></h2>
                        <p className="text-stone-400 text-lg max-w-2xl mx-auto">Every saree undergoes a meticulous journey before reaching your doorstep</p>
                    </div>

                    <div className="relative">
                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { num: '01', title: 'Artisan Selection', desc: 'We partner with master weavers who have perfected their craft over generations' },
                                { num: '02', title: 'Material Sourcing', desc: 'Only the finest silk threads and natural dyes are selected for each piece' },
                                { num: '03', title: 'Quality Check', desc: 'Each saree is meticulously inspected for weave quality and design accuracy' },
                                { num: '04', title: 'Delivered With Love', desc: 'Carefully packaged and delivered to make your moment truly special' },
                            ].map((step, index) => (
                                <div key={index} className="text-center relative group">
                                    <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6 text-stone-900 font-bold text-lg shadow-lg shadow-amber-500/30 relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                                        {step.num}
                                    </div>
                                    <h3 className="text-lg font-serif text-white mb-3">{step.title}</h3>
                                    <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-flex items-center gap-3 text-amber-400 text-sm tracking-[0.3em] uppercase mb-6 font-semibold">
                                <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">We'd Love to <span className="text-gradient-gold">Hear From You</span></h2>
                            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
                                Whether you have questions about our collection, need styling advice, or want to explore custom orders – we're here to help you find your perfect drape.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: Phone, label: 'Call Us', value: '+91 98765 43210' },
                                    { icon: Mail, label: 'Email Us', value: 'hello@theweavehouse.com' },
                                    { icon: MapPin, label: 'Visit Our Showroom', value: 'Kanchipuram, Tamil Nadu, India' },
                                ].map((contact, index) => (
                                    <div key={index} className="group flex items-center gap-5 p-4 rounded-2xl glass-premium hover:glass-gold transition-all duration-300 cursor-pointer">
                                        <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <contact.icon className="w-6 h-6 text-stone-900" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-stone-500 mb-1">{contact.label}</div>
                                            <div className="text-white font-medium">{contact.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="relative">
                            <div className="relative h-[500px] rounded-3xl overflow-hidden glass-gold">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-6">
                                        <div className="w-28 h-28 bg-gradient-gold rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 animate-glow">
                                            <Heart className="w-12 h-12 text-stone-900" />
                                        </div>
                                        <p className="text-white font-serif text-2xl">Made with Love</p>
                                        <p className="text-stone-400 text-sm tracking-widest uppercase">Kanchipuram, India</p>
                                    </div>
                                </div>

                                {/* Decorative circles */}
                                <div className="absolute top-10 left-10 w-20 h-20 border border-amber-500/20 rounded-full animate-pulse-gold"></div>
                                <div className="absolute bottom-10 right-10 w-32 h-32 border border-amber-500/20 rounded-full animate-pulse-gold" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute top-1/2 right-20 w-16 h-16 border border-amber-500/10 rounded-full animate-pulse-gold" style={{ animationDelay: '2s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <div className="glass-gold p-16 rounded-[3rem]">
                        <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-8 animate-pulse" />
                        <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">
                            Ready to Elevate<br />Your <span className="text-gradient-gold">Style</span>?
                        </h2>
                        <p className="text-stone-300 text-xl mb-12 font-light max-w-2xl mx-auto">
                            Explore our latest collection of exquisite sarees and find the one that speaks to your soul.
                        </p>
                        <Link
                            href="/collections"
                            className="group inline-flex items-center gap-4 px-12 py-5 bg-gradient-gold text-stone-900 transition-all duration-500 uppercase tracking-widest font-semibold text-sm rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 hover:-translate-y-2"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Explore Collections
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="bg-stone-950 border-t border-stone-800/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                                    <Crown className="w-5 h-5 text-stone-900" />
                                </div>
                                <h4 className="font-serif text-2xl text-gradient-gold tracking-wide">The Weave House</h4>
                            </div>
                            <p className="text-stone-500 leading-relaxed">Premium silk sarees and traditional textiles, handcrafted with love in Kanchipuram.</p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Quick Links</h5>
                            <ul className="space-y-4 text-stone-500">
                                <li><Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />Home</Link></li>
                                <li><Link href="/collections" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />Collections</Link></li>
                                <li><Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />About Us</Link></li>
                                <li><Link href="/cart" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" />Cart</Link></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h5 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Connect With Us</h5>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 glass-premium hover:glass-gold rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <svg className="w-5 h-5 text-stone-300 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="#" className="w-12 h-12 glass-premium hover:glass-gold rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <svg className="w-5 h-5 text-stone-300 group-hover:text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-stone-800/50 mt-12 pt-8 text-center">
                        <p className="text-stone-600 text-sm">&copy; {new Date().getFullYear()} The Weave House. All rights reserved. Crafted with ❤️ in India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
