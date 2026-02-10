'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle, Clock, ChevronRight, ArrowLeft, Sparkles, MapPin, Calendar, Phone, User } from 'lucide-react';

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
    _id?: string;
    items: OrderItem[];
    total: number;
    status: string;
    date: string;
    customerDetails?: CustomerDetails;
    paymentStatus?: string;
    paymentMethod?: string;
}

// Timeline step component
const TimelineStep = ({
    icon: Icon,
    title,
    subtitle,
    date,
    isCompleted,
    isActive,
    isLast
}: {
    icon: any;
    title: string;
    subtitle: string;
    date?: string;
    isCompleted: boolean;
    isActive: boolean;
    isLast: boolean;
}) => (
    <div className="flex gap-4">
        {/* Timeline Line */}
        <div className="flex flex-col items-center">
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                ${isCompleted || isActive
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-200'
                    : 'bg-gray-100 border-2 border-gray-200'
                }
            `}>
                <Icon className={`w-5 h-5 ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`} />
            </div>
            {!isLast && (
                <div className={`
                    w-0.5 h-20 transition-all duration-500
                    ${isCompleted ? 'bg-gradient-to-b from-green-500 to-emerald-600' : 'bg-gray-200'}
                `} />
            )}
        </div>

        {/* Content */}
        <div className={`flex-1 pb-8 ${isLast ? '' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {title}
                </h3>
                {date && (isCompleted || isActive) && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {date}
                    </span>
                )}
            </div>
            <p className={`text-sm ${isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                {subtitle}
            </p>
            {isActive && !isCompleted && (
                <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600 font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    In Progress
                </div>
            )}
        </div>
    </div>
);

export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusIndex = (status: string) => {
        const statusMap: { [key: string]: number } = {
            'pending': 0,
            'confirmed': 0,
            'processing': 1,
            'shipped': 1,
            'completed': 2,
            'delivered': 2
        };
        return statusMap[status.toLowerCase()] ?? 0;
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'confirmed': 'bg-blue-100 text-blue-700 border-blue-200',
            'processing': 'bg-purple-100 text-purple-700 border-purple-200',
            'shipped': 'bg-indigo-100 text-indigo-700 border-indigo-200',
            'completed': 'bg-green-100 text-green-700 border-green-200',
            'delivered': 'bg-green-100 text-green-700 border-green-200'
        };
        return colors[status.toLowerCase()] ?? 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: '2-digit'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-stone-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    // Order Detail View
    if (selectedOrder) {
        const statusIndex = getStatusIndex(selectedOrder.status);
        const steps = [
            {
                icon: CheckCircle,
                title: 'Order Confirmed',
                subtitle: 'Your order has been placed and confirmed.',
                date: formatDate(selectedOrder.date) + ' - ' + formatTime(selectedOrder.date)
            },
            {
                icon: Truck,
                title: 'Shipped',
                subtitle: 'Your item has been shipped and is on the way.',
                date: statusIndex >= 1 ? 'Processing...' : ''
            },
            {
                icon: Package,
                title: 'Delivered',
                subtitle: 'Your item has been delivered successfully.',
                date: statusIndex >= 2 ? 'Completed' : ''
            }
        ];

        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-10">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Orders</span>
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Order Header Card */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="text-white/80 text-sm mb-1">Order ID</p>
                                    <p className="text-2xl font-bold font-mono">
                                        #{(selectedOrder.id || selectedOrder._id || '').toString().slice(-8).toUpperCase()}
                                    </p>
                                </div>
                                <div className={`px-4 py-2 rounded-full backdrop-blur-sm bg-white/20 border border-white/30 font-medium capitalize`}>
                                    {selectedOrder.status}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500">Order Date</p>
                                    <p className="font-medium text-stone-900">{formatDate(selectedOrder.date)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500">Total Amount</p>
                                    <p className="font-bold text-stone-900">₹{selectedOrder.total.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-500">Items</p>
                                    <p className="font-medium text-stone-900">{selectedOrder.items.length} item(s)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Timeline */}
                        <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 p-6">
                            <h2 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-amber-500" />
                                Order Timeline
                            </h2>
                            <div className="pl-2">
                                {steps.map((step, index) => (
                                    <TimelineStep
                                        key={index}
                                        icon={step.icon}
                                        title={step.title}
                                        subtitle={step.subtitle}
                                        date={step.date}
                                        isCompleted={index < statusIndex}
                                        isActive={index === statusIndex}
                                        isLast={index === steps.length - 1}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="space-y-6">
                            {/* Delivery Address */}
                            {selectedOrder.customerDetails && (
                                <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 p-6">
                                    <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-rose-500" />
                                        Delivery Address
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <User className="w-4 h-4 text-stone-400" />
                                            <span className="font-medium text-stone-800">
                                                {selectedOrder.customerDetails.name || 'Guest'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-stone-400" />
                                            <span className="text-stone-600">
                                                {selectedOrder.customerDetails.phone || 'Not provided'}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                                            <span className="text-stone-600">
                                                {selectedOrder.customerDetails.address}
                                                {selectedOrder.customerDetails.city && `, ${selectedOrder.customerDetails.city}`}
                                                {selectedOrder.customerDetails.zipCode && ` - ${selectedOrder.customerDetails.zipCode}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Order Items */}
                            <div className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 p-6">
                                <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-indigo-500" />
                                    Order Items
                                </h2>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl">
                                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">👗</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-stone-900">{item.name}</h3>
                                                <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-stone-900">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between items-center">
                                    <span className="font-semibold text-stone-700">Total</span>
                                    <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                                        ₹{selectedOrder.total.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Orders List View
    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-stone-900">My Orders</h1>
                            <p className="text-sm text-stone-500">Track and manage your orders</p>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Shop
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-stone-400" />
                        </div>
                        <h2 className="text-xl font-bold text-stone-800 mb-2">No orders yet</h2>
                        <p className="text-stone-500 mb-6">Start shopping to see your orders here</p>
                        <Link
                            href="/collections"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                        >
                            Explore Collections
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id || order._id}
                                onClick={() => setSelectedOrder(order)}
                                className="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 p-6 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-rose-100 rounded-xl flex items-center justify-center">
                                            <Package className="w-7 h-7 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-stone-900 font-mono">
                                                #{(order.id || order._id || '').toString().slice(-8).toUpperCase()}
                                            </p>
                                            <p className="text-sm text-stone-500">{formatDate(order.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                                    <div className="text-sm text-stone-600">
                                        {order.items.length} item(s) • {order.items.map(i => i.name).slice(0, 2).join(', ')}
                                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                                    </div>
                                    <div className="font-bold text-stone-900">₹{order.total.toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
