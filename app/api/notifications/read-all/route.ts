import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Notification from '@/models/Notification';

export async function POST() {
  try {
    await connectToDatabase();
    await Notification.updateMany({}, { read: true });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Mark all read error:", e);
    return NextResponse.json({ error: 'Failed to mark all as read' }, { status: 500 });
  }
}
