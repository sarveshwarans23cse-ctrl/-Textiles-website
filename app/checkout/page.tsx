'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Loader2 } from 'lucide-react';

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { cart, getTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    // If "buyNow" param is present, we might want to fetch that specific product, 
    // but for simplicity we rely on the user having added to cart or we handle the cart. 
    // For now, we assume the cart contains the items to be purchased.

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
    });

    const totalAmount = getTotal();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Order in Database first (Pending)
            const orderRes = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    total: totalAmount,
                    customerDetails: formData
                }),
            });

            if (!orderRes.ok) throw new Error('Order creation failed');
            const orderData = await orderRes.json();
            const orderId = orderData.id || orderData._id;

            // 2. Create Razorpay Order
            const paymentRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: 'INR',
                    receipt_id: orderId,
                }),
            });

            if (!paymentRes.ok) throw new Error('Payment initialization failed');
            const paymentData = await paymentRes.json();

            // 3. Load Razorpay SDK
            const loadRazorpay = () => {
                return new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                });
            };

            const isLoaded = await loadRazorpay();
            if (!isLoaded) throw new Error('Razorpay SDK failed to load');

            // 4. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Make sure to add this to .env.local
                amount: paymentData.amount,
                currency: paymentData.currency,
                name: "The Weave House",
                description: "Order Payment",
                order_id: paymentData.id,
                handler: async function (response: any) {
                    // 5. Verify Payment
                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: orderId,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        clearCart();
                        router.push('/order-success');
                    } else {
                        alert('Payment Verification Failed!');
                    }
                },
                prefill: {
                    name: formData.name,
                    contact: formData.phone,
                },
                theme: {
                    color: "#dc2626", // primary-600
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Payment Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <button
                    onClick={() => router.push('/')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Details */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Details</h2>
                            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Street address, flat no, etc."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.zip}
                                            onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                            className="w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Summary & Payment */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover bg-gray-100" />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                                            {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                                <h3 className="font-semibold text-gray-800 mb-2">Payment Mode</h3>
                                <div className="flex items-center gap-3 p-3 bg-white border border-primary-200 rounded-lg shadow-sm">
                                    <div className="w-4 h-4 rounded-full border-[5px] border-primary-600" />
                                    <span className="font-medium text-gray-700">Online Payment (Razorpay)</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Pay Now'}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                100% Safe & Secure Payment · Easy Returns
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
