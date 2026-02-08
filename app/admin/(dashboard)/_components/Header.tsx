'use client';

import { Bell, Search, Menu, X, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Notification {
    _id: string;
    type: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function Header() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
                setUnreadCount(data.filter((n: Notification) => !n.read).length);
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            // Optimistic update
            const updatedNotifications = notifications.map(n =>
                n._id === id ? { ...n, read: true } : n
            );
            setNotifications(updatedNotifications);
            setUnreadCount(updatedNotifications.filter(n => !n.read).length);

            // API call (if you have an endpoint for single read)
            // await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
            setNotifications(updatedNotifications);
            setUnreadCount(0);

            // Assuming we have a read-all endpoint or loop through them
            await fetch('/api/notifications/read-all', { method: 'POST' });
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-xl transition-all">
            {/* Mobile Menu Trigger & Search */}
            <div className="flex items-center gap-4">
                <button className="md:hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                    <Menu className="h-6 w-6" />
                </button>

                <div className="hidden md:flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 border border-transparent focus-within:border-primary-200 focus-within:ring-4 focus-within:ring-primary-50 transition-all">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="bg-transparent text-sm outline-none placeholder:text-gray-400 w-64"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
                    >
                        <Bell className="h-6 w-6 text-gray-600" />
                        {unreadCount > 0 && (
                            <span className="absolute right-2 top-1.5 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                                <h3 className="font-semibold text-gray-800">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        No notifications yet
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-50">
                                        {notifications.map((notification) => (
                                            <li
                                                key={notification._id}
                                                className={`p-4 hover:bg-gray-50 transition-colors relative group ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className="flex gap-3">
                                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!notification.read ? 'bg-primary-500' : 'bg-gray-300'}`} />
                                                    <div className="flex-1">
                                                        <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {new Date(notification.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-3 pl-1">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">admin@prasannatex.com</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white cursor-pointer hover:ring-primary-100 transition-all">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
