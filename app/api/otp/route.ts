import { NextRequest, NextResponse } from 'next/server';
import { sendOTP } from '@/lib/email';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

// In-memory OTP storage (email -> {otp, expiry})
const otpStore: Record<string, { otp: string; expiry: number }> = {};

export async function POST(req: NextRequest) {
  try {
    console.log('OTP API called');
    
    await connectToDatabase();
    console.log('Database connected successfully');
    
    const { action, email, otp } = await req.json();
    console.log('OTP Request:', { action, email });

    if (action === 'check-user-status') {
      console.log('Checking user status for:', email);
      // Check if user exists and if it's first-time
      const user = await User.findOne({ email: email.toLowerCase() });
      console.log('User found:', !!user, user ? `(verified: ${user.isVerified})` : '');

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

    if (action === 'send-otp') {
      console.log('Send OTP action for:', email);
      // Only send OTP for first-time users (who exist but aren't verified)
      const user = await User.findOne({ email: email.toLowerCase() });
      console.log('User found for OTP:', !!user);

      if (!user) {
        console.log('User not found');
        return NextResponse.json(
          { message: 'User not found. Please sign up first.', success: false },
          { status: 400 }
        );
      }

      if (user.isVerified) {
        console.log('User already verified');
        return NextResponse.json(
          { message: 'User already verified. Please login normally.', success: false },
          { status: 400 }
        );
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP:', otpCode);

      // Store OTP with 10 minute expiry
      const expiryTime = Date.now() + 10 * 60 * 1000;
      otpStore[email.toLowerCase()] = { otp: otpCode, expiry: expiryTime };
      console.log('OTP stored in memory');

      // Send OTP via email
      console.log('Sending OTP email to:', email);
      const emailSent = await sendOTP(email, otpCode);
      console.log('Email sent result:', emailSent);

      if (emailSent) {
        // In development/test mode, return the OTP for easy testing
        const isDev = process.env.NODE_ENV === 'development';
        return NextResponse.json(
          { 
            message: 'OTP sent to your email', 
            success: true,
            // Only in dev mode, return OTP for testing
            ...(isDev && { testOTP: otpCode })
          },
          { status: 200 }
        );
      } else {
        console.log('Email send failed');
        return NextResponse.json(
          { message: 'Failed to send OTP. Check console for test OTP.', success: false },
          { status: 500 }
        );
      }
    }

    if (action === 'verify-otp') {
      console.log('Verify OTP action for:', email);
      console.log('OTP value provided:', otp);
      console.log('All stored OTPs:', Object.keys(otpStore));
      
      const storedData = otpStore[email.toLowerCase()];
      console.log('OTP data found:', !!storedData);
      console.log('Stored OTP:', storedData?.otp);
      console.log('Provided OTP:', otp);

      if (!storedData) {
        console.log('No OTP data found for this email');
        return NextResponse.json(
          { message: 'OTP not found or expired', success: false },
          { status: 400 }
        );
      }

      const { otp: storedOTP, expiry } = storedData;

      // Check if OTP expired
      if (Date.now() > expiry) {
        delete otpStore[email.toLowerCase()];
        return NextResponse.json(
          { message: 'OTP expired', success: false },
          { status: 400 }
        );
      }

      // Check if OTP matches (convert both to string for comparison)
      const isMatch = String(otp) === String(storedOTP);
      console.log('OTP Match Result:', isMatch, `(${otp} vs ${storedOTP})`);
      
      if (!isMatch) {
        return NextResponse.json(
          { message: 'Invalid OTP', success: false },
          { status: 400 }
        );
      }

      // OTP verified, mark user as verified in database
      console.log('Updating user verification status');
      const updatedUser = await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { isVerified: true },
        { new: true }
      );
      console.log('User updated:', !!updatedUser);

      delete otpStore[email.toLowerCase()];

      return NextResponse.json(
        { message: 'OTP verified successfully', success: true },
        { status: 200 }
      );
    }

    console.log('Invalid action:', action);
    return NextResponse.json(
      { message: 'Invalid action', success: false },
      { status: 400 }
    );
  } catch (error) {
    console.error('OTP API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    return NextResponse.json(
      { message: `Error: ${errorMessage}`, success: false, error: true },
      { status: 500 }
    );
  }
}
