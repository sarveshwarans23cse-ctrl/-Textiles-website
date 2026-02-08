'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { X, Loader2 } from 'lucide-react';
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
        // Set initial images from default product or first variant
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
        // Add variant info if needed in future
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-700 font-medium mb-4">{error || 'Product not found'}</p>
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">Go back</Link>
        </div>
      </div>
    );
  }

  const discounted = product.offerPercent && product.offerPercent > 0
    ? Math.max(0, Math.round(product.price * (1 - product.offerPercent / 100)))
    : null;
  const finalPrice = applyOffer && discounted !== null ? discounted : product.price;
  const sizes = ['28', '30', '32'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative">
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-700">Store</Link>
          <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-primary-600">Cart</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl shadow overflow-hidden relative min-h-[360px]">
              {activeImg ? (
                <Image src={activeImg} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {product.offerPercent && product.offerPercent > 0 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.offerLabel || 'Offer'} - {product.offerPercent}% OFF
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {(() => {
                let imagesToShow = [product.image];
                if (selectedColor && product.variants) {
                  const variant = product.variants.find(v => v.color === selectedColor);
                  if (variant && variant.images && variant.images.length > 0) {
                    imagesToShow = variant.images;
                  }
                }

                return imagesToShow.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(src || null)} className={`relative h-20 rounded-lg overflow-hidden border ${activeImg === src ? 'border-primary-500' : 'border-gray-200'}`}>
                    {src ? (
                      <Image src={src} alt={`thumb-${i}`} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </button>
                ))
              })()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>

            <div className="flex items-center gap-3 mb-4">
              {discounted !== null ? (
                <>
                  <span className="text-2xl font-bold text-primary-600">₹{discounted.toLocaleString()}</span>
                  <span className="text-sm line-through text-gray-500">₹{product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary-600">₹{product.price.toLocaleString()}</span>
              )}
              {product.stock < 10 && (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">{product.stock} left</span>
              )}
            </div>

            <div className="mb-6 space-y-4">
              {/* Color Selection */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Color: <span className="font-bold text-gray-900">{selectedColor}</span></p>
                  <div className="flex gap-2">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(variant.color);
                          if (variant.images && variant.images.length > 0) {
                            setActiveImg(variant.images[0]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${selectedColor === variant.color ? 'border-primary-600 ring-2 ring-primary-100 bg-primary-50 text-primary-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                      >
                        {variant.color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Select Size</p>
                <div className="flex gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg border text-sm ${selectedSize === s ? 'border-primary-600 text-primary-700 bg-primary-50' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <details className="mb-4 rounded-lg overflow-hidden">
                <summary className="list-none">
                  <div className="bg-indigo-600 text-white px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer">
                    <span className="font-semibold">Apply offers for maximum savings</span>
                    <span className="text-sm">{applyOffer && discounted !== null ? `Buy at ₹${finalPrice.toLocaleString()}` : 'View offers'}</span>
                  </div>
                </summary>
                <div className="bg-white border border-indigo-200 rounded-b-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Best value for you</p>
                      <p className="text-xs text-gray-500">Automatic discount applied</p>
                    </div>
                    <button onClick={() => setApplyOffer(v => !v)} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm">
                      {applyOffer ? 'Remove' : 'Apply'}
                    </button>
                  </div>
                  {discounted !== null && (
                    <p className="text-sm text-gray-700">Price after offer: <span className="font-semibold">₹{finalPrice.toLocaleString()}</span></p>
                  )}
                </div>
              </details>

              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: finalPrice,
                    image: activeImg || product.image,
                    color: selectedColor
                  })}
                  className="w-full bg-[#B12704] text-white px-4 py-3 rounded-lg hover:bg-[#9c2303] font-medium shadow-sm transition-colors"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-center bg-[#FA8900] text-white px-4 py-3 rounded-lg hover:bg-[#e37e00] font-medium shadow-sm transition-colors"
                >
                  Buy now at ₹{finalPrice.toLocaleString()}
                </button>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-2">Delivery details</h3>
                <p className="text-sm text-gray-600">Location not set <span className="text-primary-600 font-medium cursor-pointer">Select delivery location</span></p>
                <p className="text-sm text-gray-600 mt-2">10-Day Return · Cash on Delivery · Assured Quality</p>
              </div>

              <div className="mt-6">
                <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">Back to home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-gray-900">Complete Purchase</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                  {/* Fallback image logic same as main page */}
                  {(activeImg || product.image) ? (
                    <Image src={activeImg || product.image || ''} alt="Product" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-primary-600 font-bold mt-1">₹{finalPrice.toLocaleString()}</p>
                </div>
              </div>

              <form onSubmit={handleBuyNow} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    placeholder="Enter your name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    placeholder="10-digit mobile number"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    required
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                    placeholder="Area and Street"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City/Town</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      value={customerDetails.zipCode}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, zipCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FA8900] text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Place Order - ₹${finalPrice.toLocaleString()}`
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    By placing this order, you agree to our Terms of Service
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
