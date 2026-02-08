import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Notification from '@/models/Notification';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const notif = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notif) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, notification: notif });
  } catch (e) {
    console.error("Mark read error:", e);
    return NextResponse.json({ error: 'Failed to mark notification as read' }, { status: 500 });
  }
}
