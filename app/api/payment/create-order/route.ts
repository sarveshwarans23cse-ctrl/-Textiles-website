import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder', // User needs to set this
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder', // User needs to set this
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, currency = 'INR', receipt_id } = body;

        // Create Razorpay Order
        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency,
            receipt: receipt_id,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
