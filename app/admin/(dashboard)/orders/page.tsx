'use client';

import { Filter, Download, Eye, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

interface CustomerDetails {
    name: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: string;
    date: string;
    customerDetails?: CustomerDetails;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                    <p className="text-gray-500 text-sm">View and manage customer orders</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Order ID</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Items</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-primary-600">
                                        #{typeof order.id === 'string' ? order.id.slice(-6).toUpperCase() : order.id}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(order.date).toLocaleDateString()}
                                        <div className="text-xs text-gray-400">{new Date(order.date).toLocaleTimeString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold text-xs uppercase">
                                                {order.customerDetails?.name?.charAt(0) || 'G'}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-700">{order.customerDetails?.name || 'Guest'}</div>
                                                <div className="text-xs text-gray-500">{order.customerDetails?.phone || 'No phone'}</div>
                                                <div className="text-xs text-gray-400 truncate max-w-[150px]">{order.customerDetails?.city}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="max-w-[200px] truncate" title={order.items.map(i => i.name).join(', ')}>
                                            {order.items.map(i => i.name).join(', ')}
                                        </div>
                                        {order.items.length > 1 && <span className="text-xs text-gray-400">+{order.items.length - 1} more</span>}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            } capitalize
                    `}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-primary-600 transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order Details Slide-over */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedOrder(null)}
                    />

                    {/* Content */}
                    <div className="relative w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto animate-in slide-in-from-right duration-300">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                                    <p className="text-sm text-gray-500">
                                        #{typeof selectedOrder.id === 'string' ? selectedOrder.id.slice(-6).toUpperCase() : selectedOrder.id}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors hover:bg-gray-200"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Status Section */}
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-500">Status</span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    selectedOrder.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }
                                        `}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">Order Date</span>
                                        <span className="text-sm text-gray-900">
                                            {new Date(selectedOrder.date).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Customer Information</h3>
                                    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold shrink-0">
                                                {selectedOrder.customerDetails?.name?.charAt(0) || 'G'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-lg">{selectedOrder.customerDetails?.name || 'Guest User'}</p>
                                                <p className="text-gray-500 text-sm mt-0.5">{selectedOrder.customerDetails?.phone || 'No phone provided'}</p>
                                            </div>
                                        </div>
                                        <hr className="border-gray-100" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Shipping Address</p>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {selectedOrder.customerDetails?.address || 'No address provided'}
                                                <br />
                                                {selectedOrder.customerDetails?.city}
                                                {selectedOrder.customerDetails?.zipCode ? `, ${selectedOrder.customerDetails.zipCode}` : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Ordered Items</h3>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <ul className="divide-y divide-gray-100">
                                            {selectedOrder.items.map((item, index) => (
                                                <li key={index} className="p-3 flex items-center gap-4 bg-white">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 flex items-center justify-center text-gray-400">
                                                        🛍️
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        ₹{item.price.toLocaleString()}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-200">
                                            <span className="font-semibold text-gray-900">Total Amount</span>
                                            <span className="text-xl font-bold text-primary-600">₹{selectedOrder.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
