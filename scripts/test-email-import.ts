
import { sendOTP } from '../lib/email';

async function test() {
    console.log('Testing email import...');
    try {
        const result = await sendOTP('test@example.com', '123456');
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
