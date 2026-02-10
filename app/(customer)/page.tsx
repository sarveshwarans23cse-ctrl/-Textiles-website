'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Star, Award, Crown, Gem, ChevronDown, Play, ShoppingBag, Heart, Package } from 'lucide-react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Crown, title: 'Royal Heritage', desc: 'Centuries-old weaving traditions' },
    { icon: Gem, title: 'Pure Silk', desc: '100% authentic Kanchipuram silk' },
    { icon: Award, title: 'Artisan Crafted', desc: 'Handwoven by master artisans' },
  ];

  return (
    <div className="relative w-full overflow-hidden font-serif bg-stone-950">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Animated Background Image with Parallax */}
        <div
          className="absolute inset-0 w-full h-full z-0 transition-transform duration-100"
          style={{
            backgroundImage: "url('/image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-stone-950 z-10" />

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-500/5 to-transparent rounded-full" />
        </div>

        {/* Decorative Border Frame */}
        <div className="absolute inset-8 border border-white/10 rounded-3xl z-20 pointer-events-none" />
        <div className="absolute inset-12 border border-white/5 rounded-2xl z-20 pointer-events-none" />

        {/* Premium Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-30 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Brand */}
            <div className={`flex items-center gap-3 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-white text-lg font-medium tracking-wide">The Weave House</div>
                <div className="text-amber-400/80 text-[10px] tracking-[0.3em] uppercase">Est. 2024</div>
              </div>
            </div>

            {/* Nav Links */}
            <div className={`flex items-center gap-4 lg:gap-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              {['About', 'Collections', 'My Orders', 'Cart'].map((item, i) => (
                <Link
                  key={item}
                  href={item === 'About' ? '/about' : item === 'Collections' ? '/collections' : item === 'My Orders' ? '/orders' : '/cart'}
                  className={`relative text-sm tracking-wider hover:text-white transition-colors group ${item === 'My Orders' ? 'text-amber-400 flex items-center gap-1.5' : 'text-white/70'
                    }`}
                >
                  {item === 'My Orders' && <Package className="w-4 h-4" />}
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-primary-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="hidden md:flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm tracking-wide rounded-full hover:bg-white/20 transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 pt-20">
          {/* Floating Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white/90 text-sm tracking-wider">Premium Silk Collection</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>

          {/* Brand Name */}
          <h2 className={`text-amber-400/90 text-sm md:text-base tracking-[0.4em] uppercase mb-6 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The Weave House
          </h2>

          {/* Main Headline with Gradient */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide mb-6 drop-shadow-2xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white">Elevate Your </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-primary-400 bg-clip-text text-transparent">Style</span>
          </h1>

          {/* Decorative Line */}
          <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
            <Gem className="w-5 h-5 text-amber-400/60" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          {/* Subtitle */}
          <p className={`text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mb-12 leading-relaxed transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Discover exquisite handwoven silk sarees, where centuries-old traditions meet contemporary elegance.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              href="/collections"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 overflow-hidden transition-all duration-500 rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Shop Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white overflow-hidden transition-all duration-300 rounded-full hover:bg-white/10"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider">Our Story</span>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll to Explore</span>
            <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full mb-6">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400/90 text-xs tracking-widest uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              The Art of <span className="text-amber-400">Excellence</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Each saree tells a story of heritage, crafted with passion by skilled artisans
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-stone-950 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Unique Designs' },
              { value: '50+', label: 'Years Legacy' },
              { value: '10K+', label: 'Happy Customers' },
              { value: '100%', label: 'Authentic Silk' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-amber-400 to-primary-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-primary-600 to-amber-600 animate-gradient-shift" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />

        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-6 animate-sparkle" />
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Explore our exclusive collection of handwoven silk sarees and find your perfect piece of elegance.
          </p>
          <Link
            href="/collections"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-stone-900 font-bold text-sm tracking-widest uppercase rounded-full hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <Heart className="w-5 h-5" />
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-lg font-serif">The Weave House</span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <Link href="/collections" className="text-white/50 hover:text-amber-400 transition-colors text-sm">Collections</Link>
            <Link href="/about" className="text-white/50 hover:text-amber-400 transition-colors text-sm">About</Link>
            <Link href="/orders" className="text-amber-400 hover:text-amber-300 transition-colors text-sm flex items-center gap-1.5 font-medium">
              <Package className="w-4 h-4" />
              Track Orders
            </Link>
            <Link href="/cart" className="text-white/50 hover:text-amber-400 transition-colors text-sm">Cart</Link>
          </div>

          <p className="text-white/40 text-sm text-center">© {new Date().getFullYear()} The Weave House. Crafted with ❤️ in Kanchipuram, India</p>
        </div>
      </footer>
    </div>
  );
}
