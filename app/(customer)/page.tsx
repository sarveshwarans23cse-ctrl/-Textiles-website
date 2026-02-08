'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-serif">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">

        {/* Brand Name */}
        <h2 className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
          The Weave House
        </h2>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-wide mb-8 drop-shadow-2xl animate-fade-in-up delay-100">
          Elevate Your Style
        </h1>

        {/* Subtitle */}
        <p className="text-gray-200 text-lg md:text-xl font-light tracking-wide max-w-2xl mb-12 animate-fade-in-up delay-200 leading-relaxed">
          Premium silk sarees, traditional craftsmanship, and elegant fashion for the modern woman.
        </p>

        {/* CTA Button */}
        <Link
          href="/collections"
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 overflow-hidden transition-all duration-300 ease-out hover:bg-gray-100 animate-fade-in-up delay-300"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary-600 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative text-sm font-semibold tracking-widest uppercase">Shop Now</span>
        </Link>
      </div>

      {/* Optional: Simple Navigation/Header Overlay if needed, or keep it clean */}
      <nav className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-between items-center text-white/80">
        <div className="hidden md:block text-xs tracking-widest uppercase">Est. 2024</div>
        <div className="flex gap-6 text-sm tracking-wider">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
          <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">Login</Link>
        </div>
      </nav>
    </div>
  );
}
