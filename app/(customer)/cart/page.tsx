'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import BillModal from '@/components/BillModal';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } =
    useCart();
  const [showBill, setShowBill] = useState(false);

  const handlePayNow = () => {
    if (cart.length === 0) return;
    setShowBill(true);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Store
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-primary-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Store
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-primary-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="relative w-32 h-32 flex-shrink-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                  {item.color && <p className="text-sm text-gray-500 mb-1">Color: {item.color}</p>}
                  <p className="text-primary-600 font-semibold text-lg mb-3">
                    ₹{item.price.toLocaleString()} each
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-md bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 shadow-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-md bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 shadow-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right sm:text-left sm:min-w-[120px]">
                  <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                  <p className="font-bold text-xl text-primary-600">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
              <span className="text-lg font-semibold text-gray-800">
                ₹{getTotal().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Shipping:</span>
              <span className="text-sm font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-2xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-primary-600">
                ₹{getTotal().toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePayNow}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Pay Now
            </button>
            <button
              onClick={clearCart}
              className="bg-gray-200 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      {showBill && (
        <BillModal
          cart={cart}
          total={getTotal()}
          onClose={() => setShowBill(false)}
        />
      )}
    </div>
  );
}

