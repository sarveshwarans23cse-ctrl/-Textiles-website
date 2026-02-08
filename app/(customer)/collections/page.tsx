'use client';

import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';



export default function CollectionsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { getItemCount } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Remove 'cache: no-store' to allow browser caching
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            // Ensure data is an array before setting
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

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="group">
                            <h1 className="text-2xl font-serif text-gray-900 tracking-widest uppercase hover:opacity-80 transition-all">
                                The Weave <span className="font-light italic text-primary-600">House</span>
                            </h1>
                        </Link>
                        <div className="flex items-center gap-8">
                            {['Home', 'Collections', 'About'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Home' ? '/' : item === 'Collections' ? '/collections' : '/'}
                                    className="hidden md:block text-gray-600 hover:text-primary-600 text-sm font-medium tracking-wider transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                href="/cart"
                                className="relative text-gray-700 hover:text-primary-600 transition-all p-2"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>
                                {getItemCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                        {getItemCount()}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/admin/login"
                                className="text-gray-600 hover:text-primary-600 text-sm font-medium tracking-wider transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>



            <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
                {/* Product Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading beautiful sarees...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                        <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-600 text-xl font-semibold">No products found</p>
                        <p className="text-gray-500 mt-2">Check back soon for new arrivals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                                Store
                            </h3>
                            <p className="text-gray-300">
                                Your trusted destination for beautiful sarees and textiles. Quality fabrics, elegant designs, and exceptional service.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                                <li><Link href="/cart" className="hover:text-primary-400 transition-colors">Shopping Cart</Link></li>
                                <li><Link href="/admin/login" className="hover:text-primary-400 transition-colors">Admin</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact</h4>
                            <p className="text-gray-300">Email: info@example.com</p>
                            <p className="text-gray-300">Phone: +91 1234567890</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
