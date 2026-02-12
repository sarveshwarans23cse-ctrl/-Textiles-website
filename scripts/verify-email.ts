import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function verifyEmail() {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    console.log('Testing Email Configuration:');
    console.log('User:', EMAIL_USER);
    console.log('Pass Length:', EMAIL_PASS ? EMAIL_PASS.length : 0);

    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error('❌ Missing EMAIL_USER or EMAIL_PASS in .env file');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Attempting to send test email...');
        const info = await transporter.sendMail({
            from: `"Test Script" <${EMAIL_USER}>`,
            to: EMAIL_USER, // Send to self
            subject: 'Test Email from Verification Script',
            text: 'If you receive this, the email configuration is correct.',
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('❌ Failed to send email:', error);
    }
}

verifyEmail();
