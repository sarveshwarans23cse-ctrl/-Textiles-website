
'use client';

import { Mail, Phone, MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const customers = [
    { id: 1, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 98765 43210", orders: 12, spent: "₹1,24,000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: 2, name: "Rahul Verma", email: "rahul.v@example.com", phone: "+91 98765 43211", orders: 5, spent: "₹45,000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { id: 3, name: "Anita Desai", email: "anita.d@example.com", phone: "+91 98765 43212", orders: 2, spent: "₹8,500", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita" },
    { id: 4, name: "Suresh Kumar", email: "suresh.k@example.com", phone: "+91 98765 43213", orders: 8, spent: "₹67,000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh" },
    { id: 5, name: "Deepa Reddy", email: "deepa.r@example.com", phone: "+91 98765 43214", orders: 15, spent: "₹1,56,000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepa" },
    { id: 6, name: "Arjun Singh", email: "arjun.s@example.com", phone: "+91 98765 43215", orders: 3, spent: "₹12,000", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
];

export default function CustomersPage() {
    const [customersList, setCustomersList] = useState(customers);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const toggleMenu = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === id ? null : id);
    };

    const handleDelete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent menu from toggling if inside
        if (window.confirm("Are you sure you want to delete this customer?")) {
            setCustomersList(customersList.filter(c => c.id !== id));
            setActiveMenu(null);
        }
    };

    const handleViewDetails = (id: number) => {
        // Placeholder for navigation
        console.log(`View details for customer ${id}`);
        // router.push(`/admin/customers/${id}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                    <p className="text-gray-500 text-sm">View your customer base</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customersList.map((customer) => (
                    <div key={customer.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                        <div className="flex items-start justify-between mb-4">
                            <img src={customer.avatar} alt={customer.name} className="w-16 h-16 rounded-full bg-gray-50 p-1" />
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleMenu(customer.id, e)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>

                                {activeMenu === customer.id && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200"
                                    >
                                        <div className="py-1">
                                            <button
                                                onClick={() => handleViewDetails(customer.id)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" /> View Details
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(customer.id, e)}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{customer.name}</h3>
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Mail className="w-4 h-4" />
                                {customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Phone className="w-4 h-4" />
                                {customer.phone}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Orders</p>
                                <p className="text-lg font-bold text-gray-800">{customer.orders}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Total Spent</p>
                                <p className="text-lg font-bold text-red-600">{customer.spent}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
