import Image from 'next/image';

const SilkCollectionBanner = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Saree Boutique"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark atmospheric overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                </div>

                {/* Centered Content Container */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto space-y-4">

                    {/* Brand Name / Tagline */}
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h3 className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-medium">
                            The Weave House
                        </h3>
                        <div className="h-px w-12 bg-white/30 mx-auto" />
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl md:text-6xl font-serif text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Elevate Your <span className="italic">Style</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-white/70 text-xs md:text-base max-w-2xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        Discover the finest collection of premium silk sarees,
                        meticulously crafted for the modern individual who values tradition and elegance.
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
                        <a
                            href="#products"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('products')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }}
                            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                        >
                            Shop Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SilkCollectionBanner;
