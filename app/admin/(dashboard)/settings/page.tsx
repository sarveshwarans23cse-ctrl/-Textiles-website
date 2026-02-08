'use client';

import { Save } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-500 text-sm">Manage your account and preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">General Settings</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Store Name</label>
                            <input
                                type="text"
                                defaultValue="Prasanna Tex"
                                className="w-full rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Contact Email</label>
                            <input
                                type="email"
                                defaultValue="admin@prasannatex.com"
                                className="w-full rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                defaultValue="+91 98765 43210"
                                className="w-full rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Currency</label>
                            <select className="w-full rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500 shadow-sm">
                                <option>INR (₹)</option>
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Store Description</label>
                        <textarea
                            rows={4}
                            defaultValue="Premium Saree Store specializing in Silk and Kanchipuram sarees."
                            className="w-full rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-all shadow-md">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive emails about new orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">Low Stock Alerts</p>
                            <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
