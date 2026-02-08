'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CartItem, useCart } from '@/contexts/CartContext';
import QRCode from './QRCode';

interface BillModalProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
}

export default function BillModal({ cart, total, onClose }: BillModalProps) {
  const billRef = useRef<HTMLDivElement>(null);
  const { clearCart } = useCart();
  const orderId = `ORD-${Date.now()}`;
  const orderDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: `Bill-${orderId}`,
  });

  const handlePayNow = async () => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        handlePrint();
        clearCart();
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-8 overflow-y-auto flex-1" ref={billRef}>
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full mb-4">
              <h2 className="text-3xl font-bold">Store</h2>
            </div>
            <p className="text-gray-600 font-medium text-lg">Sarees & Textiles</p>
            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Order ID:</span> {orderId}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Date:</span> {orderDate}
              </p>
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-2 font-bold text-gray-700">Item</th>
                  <th className="text-center py-3 px-2 font-bold text-gray-700">Qty</th>
                  <th className="text-right py-3 px-2 font-bold text-gray-700">Price</th>
                  <th className="text-right py-3 px-2 font-bold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index === cart.length - 1 ? 'border-b-2' : ''} border-gray-200`}>
                    <td className="py-3 px-2 font-medium text-gray-800">{item.name}</td>
                    <td className="text-center py-3 px-2 text-gray-700">{item.quantity}</td>
                    <td className="text-right py-3 px-2 text-gray-700">
                      ₹{item.price.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-2 font-semibold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-6">
            <div className="text-right bg-gray-50 rounded-lg p-4 min-w-[200px]">
              <p className="text-sm text-gray-600 mb-1">Subtotal</p>
              <p className="text-2xl font-bold text-primary-600">
                ₹{total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-6 mb-6">
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800 mb-4">Scan to Pay</p>
              <div className="flex justify-center">
                <QRCode />
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
            <p className="text-gray-700 font-medium">Thank you for your purchase!</p>
            <p className="text-gray-600 text-sm mt-1">Visit us again for more beautiful sarees</p>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 p-6 bg-gray-50 flex gap-4">
          <button
            onClick={handlePayNow}
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-bold shadow-lg hover:shadow-xl"
          >
            Print Bill
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

