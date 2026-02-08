'use client';

import { useState } from 'react';
import { Package, Plus, Filter, Download, X } from 'lucide-react';
import ProductForm from '@/components/ProductForm';

interface ProductActionsProps {
    onRefresh?: () => void;
    productsForExport?: any[];
}

export default function ProductActions({ onRefresh, productsForExport = [] }: ProductActionsProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const handleExport = () => {
        if (!productsForExport.length) {
            alert('No products to export');
            return;
        }

        const headers = Object.keys(productsForExport[0]).join(',');
        const csvContent = [
            headers,
            ...productsForExport.map(row =>
                Object.values(row).map(value => `"${value}"`).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'products_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="flex gap-3">
                {/* Filter Button */}
                <button
                    onClick={() => setIsFilterActive(!isFilterActive)}
                    className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm font-medium transition-all duration-200 ${isFilterActive
                            ? 'border-primary-500 text-primary-600 bg-primary-50'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>

                {/* Export Button */}
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                </button>

                {/* Add Product Button */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-200 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Add Product Modal Overlay */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                    <Package className="w-5 h-5" />
                                </div>
                                Add New Product
                            </h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto">
                            <ProductForm
                                onSave={() => {
                                    setIsAddModalOpen(false);
                                    if (onRefresh) onRefresh();
                                }}
                                onCancel={() => setIsAddModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
