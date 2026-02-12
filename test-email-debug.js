const nodemailer = require('nodemailer');

// Google SMTP credentials from lib/email.ts
const EMAIL_USER = process.env.EMAIL_USER || 'sarveshwaran2538@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'muddcdakashnxuli';

console.log('Testing email with:', EMAIL_USER);

async function verifyConnection() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
        connectionTimeout: 10000,
    });

    try {
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('Server is ready to take our messages');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: `"Test" <${EMAIL_USER}>`,
            to: EMAIL_USER, // Send to self
            subject: "Test Email",
            text: "This is a test email to verify credentials.",
        });
        console.log('Message sent: %s', info.messageId);

    } catch (error) {
        console.error('Error occurred:', error);
    }
}

verifyConnection();
