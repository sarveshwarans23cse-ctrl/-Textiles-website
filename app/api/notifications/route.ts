import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Notification from '@/models/Notification';

export async function GET() {
  try {
    await connectToDatabase();
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    return NextResponse.json(notifications);
  } catch (e) {
    console.error("Fetch notifications error:", e);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}
