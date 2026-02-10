import { NextRequest, NextResponse } from 'next/server';
import { sendOTP } from '@/lib/email';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

// In-memory OTP storage (email -> {otp, expiry})
const otpStore: Record<string, { otp: string; expiry: number }> = {};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { action, email, otp } = await req.json();
    console.log('OTP Request:', { action, email });

    // --- CHECK USER STATUS ---
    if (action === 'check-user-status') {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return NextResponse.json(
          { exists: false, isVerified: null, success: true },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { exists: true, isVerified: user.isVerified, success: true },
        { status: 200 }
      );
    }

    // --- SEND OTP ---
    if (action === 'send-otp') {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return NextResponse.json(
          { message: 'User not found. Please sign up first.', success: false },
          { status: 400 }
        );
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP for:', email);

      // Store OTP with 10 minute expiry
      const expiryTime = Date.now() + 10 * 60 * 1000;
      otpStore[email.toLowerCase()] = { otp: otpCode, expiry: expiryTime };

      // Send OTP via email
      const emailSent = await sendOTP(email, otpCode);

      if (emailSent) {
        return NextResponse.json(
          {
            message: 'OTP has been sent to your email address. Please check your inbox.',
            success: true,
          },
          { status: 200 }
        );
      } else {
        // Email failed - still store OTP but inform user
        return NextResponse.json(
          {
            message: 'Unable to send OTP email. Please check your email address and try again.',
            success: false
          },
          { status: 500 }
        );
      }
    }

    // --- VERIFY OTP ---
    if (action === 'verify-otp') {
      const storedData = otpStore[email.toLowerCase()];

      if (!storedData) {
        return NextResponse.json(
          { message: 'OTP not found or expired. Please request a new OTP.', success: false },
          { status: 400 }
        );
      }

      const { otp: storedOTP, expiry } = storedData;

      // Check if OTP expired
      if (Date.now() > expiry) {
        delete otpStore[email.toLowerCase()];
        return NextResponse.json(
          { message: 'OTP has expired. Please request a new OTP.', success: false },
          { status: 400 }
        );
      }

      // Check if OTP matches
      const isMatch = String(otp).trim() === String(storedOTP).trim();

      if (!isMatch) {
        return NextResponse.json(
          { message: 'Invalid OTP! The code you entered does not match. Please try again.', success: false },
          { status: 400 }
        );
      }

      // OTP verified — mark user as verified in database
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { isVerified: true },
        { new: true }
      );

      // Clean up used OTP
      delete otpStore[email.toLowerCase()];

      return NextResponse.json(
        { message: 'OTP verified successfully! Redirecting...', success: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid action', success: false },
      { status: 400 }
    );
  } catch (error) {
    console.error('OTP API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { message: `Server error: ${errorMessage}`, success: false, error: true },
      { status: 500 }
    );
  }
}
