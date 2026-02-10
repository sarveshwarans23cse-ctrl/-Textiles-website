
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prasanna_tex';

async function verifyImages() {
    try {
        await mongoose.connect(MONGODB_URI);
        const db = mongoose.connection.db;
        if (!db) throw new Error('Database connection failed');

        const products = await db.collection('products').find({}).toArray();

        console.log('--- Product Image Verification ---');
        products.forEach(p => {
            console.log(`ID: ${p._id}`);
            console.log(`Product: ${p.name}`);
            console.log(`Image: ${p.image}`);
            console.log('---');
        });

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await mongoose.disconnect();
    }
}

verifyImages();
