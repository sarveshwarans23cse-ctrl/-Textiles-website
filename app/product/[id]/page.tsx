'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { X, Loader2, Sparkles, Star, Shield, Truck, RotateCcw, Heart, Share2, ChevronLeft, Package, Award, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [applyOffer, setApplyOffer] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  // Buy Now Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        setProduct(data);
        if (data?.variants && data.variants.length > 0) {
          setSelectedColor(data.variants[0].color);
          setActiveImg(data.variants[0].images[0]);
        } else {
          setActiveImg(data?.image || null);
        }
      } catch (e: any) {
        setError(e?.message || 'Error loading product');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleBuyNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);

    const discounted = product.offerPercent && product.offerPercent > 0
      ? Math.max(0, Math.round(product.price * (1 - product.offerPercent / 100)))
      : null;
    const finalPrice = applyOffer && discounted !== null ? discounted : product.price;

    const orderData = {
      items: [{
        productId: product.id,
        name: product.name,
        price: finalPrice,
        quantity: 1,
      }],
      total: finalPrice,
      customerDetails
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Failed to place order');

      router.push('/order-success');
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-primary-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-6 text-stone-600 font-serif text-lg animate-pulse">Loading exquisite details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md mx-4 border border-stone-100">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-stone-400" />
          </div>
          <h2 className="text-2xl font-serif text-stone-800 mb-3">{error || 'Product not found'}</h2>
          <p className="text-stone-500 mb-8">We couldn't find the product you're looking for.</p>
          <Link href="/collections" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-full hover:shadow-xl transition-all hover:-translate-y-0.5">
            <ChevronLeft className="w-4 h-4" />
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  const discounted = product.offerPercent && product.offerPercent > 0
    ? Math.max(0, Math.round(product.price * (1 - product.offerPercent / 100)))
    : null;
  const finalPrice = applyOffer && discounted !== null ? discounted : product.price;
  const sizes = ['28', '30', '32', '34', '36'];
  const savings = discounted !== null ? product.price - discounted : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20">
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/collections" className="group flex items-center gap-2 text-stone-600 hover:text-primary-600 transition-colors">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Collections</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-serif text-stone-900">The Weave <span className="text-primary-600 italic">House</span></span>
            </Link>
            <Link href="/cart" className="relative group p-2.5 rounded-xl bg-stone-100 hover:bg-primary-50 transition-all">
              <Package className="w-5 h-5 text-stone-700 group-hover:text-primary-600 transition-colors" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group">
              <div className="relative aspect-[4/5]">
                {activeImg ? (
                  <>
                    <Image
                      src={activeImg}
                      alt={product.name}
                      fill
                      className={`object-cover transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      priority
                    />
                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-rose-100 to-primary-100">
                    <span className="text-6xl font-serif text-stone-400/40 tracking-wider">Saree</span>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent mt-3" />
                  </div>
                )}

                {/* Offer Badge */}
                {product.offerPercent && product.offerPercent > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-red-600 rounded-full blur-sm opacity-80" />
                      <div className="relative bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-sparkle" />
                        {product.offerPercent}% OFF
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isLiked ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-sm text-stone-600 hover:bg-rose-500 hover:text-white'
                      }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-lg">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Premium Tag */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-stone-700">Handcrafted Excellence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {(() => {
                let imagesToShow = [product.image];
                if (selectedColor && product.variants) {
                  const variant = product.variants.find(v => v.color === selectedColor);
                  if (variant && variant.images && variant.images.length > 0) {
                    imagesToShow = variant.images;
                  }
                }

                return imagesToShow.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImg(src || null); setImageLoaded(false); }}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImg === src
                        ? 'border-primary-500 ring-2 ring-primary-200 shadow-lg'
                        : 'border-stone-200 hover:border-primary-300'
                      }`}
                  >
                    {src ? (
                      <Image src={src} alt={`View ${i + 1}`} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200" />
                    )}
                  </button>
                ))
              })()}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-stone-100">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-primary-50 to-amber-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-200">
                  {product.category}
                </span>
                {product.stock < 10 && (
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-200 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Only {product.stock} left
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-serif text-stone-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-stone-100">
                <span className="text-4xl font-serif font-bold bg-gradient-to-r from-primary-600 to-amber-600 bg-clip-text text-transparent">
                  ₹{finalPrice.toLocaleString()}
                </span>
                {discounted !== null && (
                  <>
                    <span className="text-lg line-through text-stone-400">₹{product.price.toLocaleString()}</span>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-semibold rounded-full">
                      Save ₹{savings.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-stone-700 mb-3">
                    Color: <span className="font-bold text-stone-900">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(variant.color);
                          if (variant.images && variant.images.length > 0) {
                            setActiveImg(variant.images[0]);
                            setImageLoaded(false);
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedColor === variant.color
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                      >
                        {variant.color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-stone-700 mb-3">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedSize === s
                          ? 'bg-stone-900 text-white shadow-lg'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Offer Banner */}
              {discounted !== null && (
                <div className="mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-primary-500 rounded-2xl p-4 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium opacity-90">Special Offer Applied</p>
                      <p className="text-lg font-bold">Save ₹{savings.toLocaleString()} on this purchase!</p>
                    </div>
                    <button
                      onClick={() => setApplyOffer(v => !v)}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
                    >
                      {applyOffer ? 'Remove' : 'Apply'}
                    </button>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: finalPrice,
                    image: activeImg || product.image,
                    color: selectedColor
                  })}
                  className="group flex items-center justify-center gap-2 py-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100">
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs font-medium text-stone-700">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-stone-700">Free Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <RotateCcw className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-stone-700">10-Day Return</p>
                </div>
              </div>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-gradient-to-br from-stone-50 to-amber-50/50 rounded-3xl p-6 border border-stone-200">
              <h3 className="font-serif text-lg text-stone-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary-600" />
                Delivery Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Free delivery on orders above ₹5,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Cash on Delivery available</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Estimated delivery: 5-7 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-stone-900">Complete Purchase</h2>
                  <p className="text-xs text-stone-500">Secure checkout</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Product Summary */}
              <div className="flex gap-4 mb-6 bg-gradient-to-r from-stone-50 to-amber-50/50 p-4 rounded-2xl border border-stone-100">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-stone-200 flex-shrink-0">
                  {(activeImg || product.image) ? (
                    <Image src={activeImg || product.image || ''} alt="Product" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-serif font-semibold text-stone-900 line-clamp-2">{product.name}</h3>
                  {selectedColor && <p className="text-xs text-stone-500 mt-1">Color: {selectedColor}</p>}
                  <p className="text-lg font-bold bg-gradient-to-r from-primary-600 to-amber-600 bg-clip-text text-transparent mt-1">
                    ₹{finalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Customer Form */}
              <form onSubmit={handleBuyNow} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all bg-stone-50 focus:bg-white"
                    placeholder="Enter your name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all bg-stone-50 focus:bg-white"
                    placeholder="10-digit mobile number"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Delivery Address</label>
                  <textarea
                    required
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all resize-none bg-stone-50 focus:bg-white"
                    placeholder="House/Flat, Street, Area"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all bg-stone-50 focus:bg-white"
                      placeholder="City"
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Pincode</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 outline-none transition-all bg-stone-50 focus:bg-white"
                      placeholder="Pincode"
                      value={customerDetails.zipCode}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, zipCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Place Order - ₹{finalPrice.toLocaleString()}
                      </>
                    )}
                  </button>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>
                    <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Free Delivery</span>
                    <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Easy Returns</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
