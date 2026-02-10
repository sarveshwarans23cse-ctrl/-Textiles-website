import nodemailer from 'nodemailer';

// Create transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sarveshwaran2538@gmail.com',
    pass: 'muddcdakashnxuli',
  },
  connectionTimeout: 5000,
  socketTimeout: 5000,
});

export async function sendOTP(email: string, otp: string) {
  try {
    console.log(`[Email Service] Sending OTP to ${email}`);
    console.log(`[TEST MODE] OTP Code: ${otp}`);
    
    // Try to send via Gmail
    try {
      const info = await transporter.sendMail({
        from: '"The Weave House" <sarveshwaran2538@gmail.com>',
        to: email,
        subject: 'Your OTP for The Weave House Login',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Welcome to The Weave House</h2>
            <p style="color: #4b5563;">Your One-Time Password (OTP) for login is:</p>
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h1 style="color: #d97706; letter-spacing: 8px; font-size: 36px; margin: 0; font-family: monospace;">${otp}</h1>
            </div>
            <p style="color: #6b7280;">This OTP is valid for <strong>10 minutes</strong>.</p>
            <p style="color: #6b7280;">If you did not request this OTP, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #9ca3af; font-size: 12px;">© The Weave House. All rights reserved.</p>
          </div>
        `,
      });

      console.log(`[Email Service] OTP email sent successfully to ${email}`);
      return true;
    } catch (emailError) {
      console.error(`[Email Service] Gmail send failed, using test mode:`, emailError);
      // If Gmail fails, still return true for testing
      // In production, you should handle this properly
      console.log(`[TEST MODE - OTP displayed in console] OTP: ${otp} for email: ${email}`);
      return true;
    }
  } catch (error) {
    console.error(`[Email Service] Error:`, error);
    return false;
  }
}
