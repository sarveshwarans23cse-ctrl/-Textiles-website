import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Notification from '@/models/Notification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, total, customerDetails } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create Order
    const newOrder = await Order.create({
      items,
      total: Number(total),
      status: 'completed',
      date: new Date(),
      customerDetails,
    });

    // Create notification for shop owner
    await Notification.create({
      type: 'order',
      message: `New order ${newOrder._id} placed. Total ₹${newOrder.total.toLocaleString()}`,
      read: false,
      meta: { orderId: newOrder._id, items: newOrder.items, total: newOrder.total },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ date: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

