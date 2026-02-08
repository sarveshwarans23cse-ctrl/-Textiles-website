'use client';

export default function QRCode() {
  // Static QR code - you can replace this with your actual UPI/Bank QR code image
  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 border-4 border-primary-200 rounded-xl shadow-xl">
        <div className="w-64 h-64 bg-white flex items-center justify-center rounded-lg overflow-hidden">
          <img
            src="/payment-qr.jpg"
            alt="Payment QR Code"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center mt-3">
          <p className="text-sm font-semibold text-gray-800">Scan to Pay</p>
          <p className="text-xs text-gray-500">Google Pay / UPI</p>
        </div>
      </div>
    </div>
  );
}

