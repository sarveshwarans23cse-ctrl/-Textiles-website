'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MoreHorizontal, Eye, Trash2, Mail, Phone } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    orders: number;
    totalSpent: number;
}

interface CustomerCardProps {
    customer: Customer;
    onViewDetails: (customer: Customer) => void;
    onDelete: (customerId: string) => Promise<void>;
}

export default function CustomerCard({ customer, onViewDetails, onDelete }: CustomerCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(customer._id);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting customer:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                {/* Header with Avatar and Menu */}
                <div className="flex items-start justify-between mb-4">
                    {/* Avatar */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-50">
                        {customer.avatar ? (
                            <Image
                                src={customer.avatar}
                                alt={customer.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 text-xl font-semibold">
                                {customer.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Three Dots Menu */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px] z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                                <button
                                    onClick={() => {
                                        onViewDetails(customer);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Eye className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-medium">View Details</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-sm font-medium">Delete</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Customer Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {customer.name}
                </h3>

                {/* Contact Info */}
                <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{customer.phone}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4">
                    {/* Stats */}
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                Orders
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                                {customer.orders}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                Total Spent
                            </p>
                            <p className="text-xl font-bold text-red-500">
                                {formatCurrency(customer.totalSpent)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Customer"
                message={`Are you sure you want to delete ${customer.name}? This action cannot be undone and all associated data will be lost.`}
                isDeleting={isDeleting}
            />
        </>
    );
}
