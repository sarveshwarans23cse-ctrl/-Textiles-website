import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Notification from '@/models/Notification';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = body;

        const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

        // Verify Signature
        const generated_signature = crypto
            .createHmac('sha256', key_secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            await connectToDatabase();

            // Update Order Status to Paid
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                {
                    status: 'completed', // Order is confirmed after successful payment
                    paymentStatus: 'paid',
                    paymentId: razorpay_payment_id,
                    paymentMethod: 'online',
                },
                { new: true }
            );

            if (!updatedOrder) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }

            // Notify Admin
            await Notification.create({
                type: 'order',
                message: `Payment received for order ${orderId}. Total ₹${updatedOrder.total}`,
                read: false,
                meta: { orderId: updatedOrder._id, total: updatedOrder.total }
            });

            return NextResponse.json({ success: true, order: updatedOrder });
        } else {
            // Signature mismatch
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Payment Verification Error:', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
