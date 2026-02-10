'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Filter, Search, ChevronDown, Star, Heart, Phone, Mail, MapPin, ArrowRight, SlidersHorizontal, Grid3X3, LayoutGrid, Award, TrendingUp, Clock } from 'lucide-react';

export default function CollectionsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const { getItemCount } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('Invalid products data:', data);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories
    const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'name': return a.name.localeCompare(b.name);
                case 'rating': return (b.rating || 0) - (a.rating || 0);
                default: return 0; // newest
            }
        });

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
            {/* Premium Navigation */}
            <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-all">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-serif text-stone-900 tracking-wide">
                                The Weave <span className="font-light italic text-primary-600">House</span>
                            </h1>
                        </Link>
                        <div className="flex items-center gap-8">
                            {['Home', 'Collections', 'About'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Home' ? '/' : item === 'Collections' ? '/collections' : '/about'}
                                    className={`hidden md:block text-sm font-medium tracking-wider transition-all hover:text-primary-600 ${item === 'Collections'
                                        ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                                        : 'text-stone-600'
                                        }`}
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                href="/cart"
                                className="relative group p-3 rounded-xl bg-stone-100 hover:bg-primary-50 transition-all"
                            >
                                <ShoppingBag className="w-5 h-5 text-stone-700 group-hover:text-primary-600 transition-colors" />
                                {getItemCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                                        {getItemCount()}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/admin/login"
                                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-stone-800 to-stone-900 text-white text-sm font-medium tracking-wider rounded-full hover:shadow-xl hover:shadow-stone-900/20 transition-all hover:-translate-y-0.5"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Banner */}
            <section className="relative py-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-primary-200/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-stone-700 tracking-wider">PREMIUM COLLECTION</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-6 tracking-tight">
                        Exquisite <span className="text-primary-600">Silk Sarees</span>
                    </h1>
                    <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover our handpicked collection of traditional Kanchipuram silk sarees, woven with love by master artisans.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search our collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-stone-800 placeholder:text-stone-400 transition-all"
                            />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-center gap-12 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-serif text-primary-600 font-bold">{products.length}+</div>
                            <div className="text-sm text-stone-500 tracking-wide">Products</div>
                        </div>
                        <div className="w-px bg-stone-300"></div>
                        <div className="text-center">
                            <div className="text-3xl font-serif text-primary-600 font-bold">100%</div>
                            <div className="text-sm text-stone-500 tracking-wide">Authentic</div>
                        </div>
                        <div className="w-px bg-stone-300"></div>
                        <div className="text-center">
                            <div className="text-3xl font-serif text-primary-600 font-bold">5★</div>
                            <div className="text-sm text-stone-500 tracking-wide">Rated</div>
                        </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="flex flex-wrap justify-center gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {[
                            { icon: Award, text: 'Premium Quality' },
                            { icon: TrendingUp, text: 'Trending Designs' },
                            { icon: Clock, text: 'Fast Delivery' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
                                <item.icon className="w-4 h-4 text-primary-600" />
                                <span className="text-sm font-medium text-stone-700">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
                {/* Section Header with Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
                    <div>
                        <h2 className="text-3xl font-serif text-stone-900">
                            {searchQuery ? `Search Results` : selectedCategory !== 'all' ? selectedCategory : 'All Collections'}
                        </h2>
                        <p className="text-stone-500 mt-1">
                            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                        </p>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.slice(0, 5).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                                            : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                                        }`}
                                >
                                    {cat === 'all' ? 'All' : cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="name">Alphabetical</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="text-center py-32">
                        <div className="relative inline-block">
                            <div className="w-20 h-20 border-4 border-primary-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-6 text-stone-600 font-medium text-lg">Loading beautiful sarees...</p>
                        <p className="text-stone-400 text-sm mt-2">Please wait while we fetch the collection</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-xl border border-stone-100">
                        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-stone-400" />
                        </div>
                        <h3 className="text-2xl font-serif text-stone-800 mb-2">No Products Found</h3>
                        <p className="text-stone-500 mb-8 max-w-md mx-auto">
                            {searchQuery
                                ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
                                : 'Check back soon for new arrivals!'}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Sparkles, title: 'Premium Quality', desc: 'Handpicked finest silks' },
                            { icon: Heart, title: 'Made with Love', desc: 'By master artisans' },
                            { icon: Star, title: '100% Authentic', desc: 'Genuine Kanchipuram silk' },
                            { icon: ShoppingBag, title: 'Free Shipping', desc: 'On orders above ₹5000' },
                        ].map((feature, i) => (
                            <div key={i} className="text-center group p-6 rounded-2xl hover:bg-stone-50 transition-colors">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="font-serif text-lg text-stone-900 mb-1">{feature.title}</h3>
                                <p className="text-sm text-stone-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <Sparkles className="w-8 h-8 text-primary-400 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-stone-300 text-lg mb-10 font-light max-w-2xl mx-auto">
                        Contact us for custom orders or to inquire about specific designs. We're here to help you find your perfect saree.
                    </p>
                    <Link
                        href="/about"
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-stone-900 font-semibold rounded-full hover:bg-primary-50 transition-all hover:-translate-y-1 shadow-2xl"
                    >
                        Contact Us
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="bg-stone-950 border-t border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-serif text-2xl text-white tracking-wide">The Weave House</h4>
                            </div>
                            <p className="text-stone-400 leading-relaxed max-w-sm">
                                Your trusted destination for authentic Kanchipuram silk sarees. Premium quality, traditional craftsmanship, and timeless elegance.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Quick Links</h5>
                            <ul className="space-y-3 text-stone-400">
                                <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                                <li><Link href="/collections" className="hover:text-primary-400 transition-colors">Collections</Link></li>
                                <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                                <li><Link href="/cart" className="hover:text-primary-400 transition-colors">Cart</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h5 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Contact</h5>
                            <div className="space-y-3 text-stone-400">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>+91 98765 43210</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>hello@theweavehouse.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Kanchipuram, Tamil Nadu</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-stone-800 mt-12 pt-8 text-center">
                        <p className="text-stone-600 text-sm">&copy; {new Date().getFullYear()} The Weave House. All rights reserved. Crafted with ❤️ in India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
