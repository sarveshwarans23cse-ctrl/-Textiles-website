'use client';

import { useState, useEffect, useRef } from 'react';
import { MoreHorizontal, Eye, Truck, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Order {
    id: string;
    customerDetails?: {
        name: string;
        city: string;
    };
    items: {
        name: string;
    }[];
    total: number;
    status: string;
    date: string;
}

export default function RecentOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const res = await fetch('/api/orders?limit=5');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data.slice(0, 5)); // Ensure only 5 items
                }
            } catch (error) {
                console.error("Failed to fetch recent orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentOrders();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (orderId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === orderId ? null : orderId);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                setActiveMenu(null);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading recent orders...</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between rounded-t-xl">
                <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                <Link href="/admin/orders" className="text-primary-600 text-sm font-medium hover:text-primary-700 hover:underline">
                    View All
                </Link>
            </div>
            <div className="overflow-visible min-h-[300px]">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 font-semibold first:rounded-tl-none last:rounded-tr-none">Order ID</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Product</th>
                            <th className="px-6 py-4 font-semibold">Amount</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    #{typeof order.id === 'string' ? order.id.slice(-6).toUpperCase() : order.id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold text-xs uppercase">
                                            {order.customerDetails?.name?.charAt(0) || 'G'}
                                        </div>
                                        <span className="font-medium text-gray-700">{order.customerDetails?.name || 'Guest'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                                    {order.items?.[0]?.name}
                                    {order.items?.length > 1 && <span className="text-xs text-gray-400 ml-1">+{order.items.length - 1} more</span>}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">₹{order.total.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={(e) => toggleMenu(order.id, e)}
                                        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all focus:outline-none"
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>

                                    {/* Action Dropdown */}
                                    {activeMenu === order.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-8 top-8 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200"
                                            style={{ minWidth: '150px' }}
                                        >
                                            <div className="py-1">
                                                <div className="px-4 py-2 border-b border-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Actions
                                                </div>
                                                <Link
                                                    href={`/admin/orders?id=${order.id}`}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" /> View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'shipped')}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                                                >
                                                    <Truck className="w-4 h-4" /> Mark Shipped
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(order.id, 'delivered')}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 flex items-center gap-2 transition-colors"
                                                >
                                                    <CheckCircle className="w-4 h-4" /> Mark Delivered
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && !loading && (
                    <div className="p-8 text-center text-gray-500">No orders found.</div>
                )}
            </div>
        </div>
    );
}
