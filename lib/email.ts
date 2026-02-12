import * as nodemailer from 'nodemailer';

// Gmail SMTP configuration
const EMAIL_USER = process.env.EMAIL_USER || 'sarveshwaran2538@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'vgic zyrb zbuu lktj';

console.log('[Email Config] Using User:', EMAIL_USER);

// Create transporter with Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendOTP(email: string, otp: string): Promise<boolean> {
  try {
    console.log(`[Email Service] Sending OTP to ${email}`);

    const info = await transporter.sendMail({
      from: `"The Weave House" <${EMAIL_USER}>`,
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

    console.log(`[Email Service] OTP email sent successfully to ${email}`, info.messageId);
    return true;
  } catch (error) {
    console.error(`[Email Service] Gmail send failed:`, error);
    return false;
  }
}
