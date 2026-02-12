import { NextResponse } from 'next/server';
import { sendOTP } from '@/lib/email';
import * as nodemailer from 'nodemailer';

export async function GET() {
    const EMAIL_USER = process.env.EMAIL_USER || 'sarveshwaran2538@gmail.com';
    const EMAIL_PASS = process.env.EMAIL_PASS || 'vgic zyrb zbuu lktj';

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        // Try to verify connection configuration
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        });

        // Try to send a test email
        const info = await transporter.sendMail({
            from: `"Debug Test" <${EMAIL_USER}>`,
            to: EMAIL_USER, // Send to self
            subject: 'Debug Email Test',
            text: 'If you receive this, email sending is working!',
        });

        return NextResponse.json({
            success: true,
            message: 'Email verified and sent successfully!',
            config: {
                user: EMAIL_USER,
                passLength: EMAIL_PASS?.length,
                host: 'smtp.gmail.com',
                port: 465
            },
            messageId: info.messageId
        });

    } catch (error: any) {
        console.error('Debug Email Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Email sending failed',
            error: error.message,
            code: error.code,
            command: error.command,
            config: {
                user: EMAIL_USER,
                passLength: EMAIL_PASS?.length,
                host: 'smtp.gmail.com',
                port: 465
            }
        }, { status: 500 });
    }
}
