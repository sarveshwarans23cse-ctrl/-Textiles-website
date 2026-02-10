
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prasanna_tex';

async function seedDatabase() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        if (!db) throw new Error('Database connection failed');

        // Read data.json
        const dataPath = path.resolve(__dirname, '../lib/data.json');
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);

        if (!data.products || !Array.isArray(data.products)) {
            throw new Error('Invalid data format: products array missing');
        }

        // Clear existing products
        console.log('🧹 Clearing existing products...');
        await db.collection('products').deleteMany({});

        // Insert products (excluding string IDs if desired, or kept as is)
        console.log(`🌱 Seeding ${data.products.length} products...`);

        // Transform data if needed (e.g. ensure numeric types)
        const productsToInsert = data.products.map((p: any) => {
            // Remove the custom string 'id' field if we want MongoDB _id, 
            // OR keep it if the app relies on it. 
            // Given the app likely uses `id` (string), let's keep it but maybe rename `id` to `_id` 
            // IF we wanted manual ID control, but standard is let Mongo generate _id.
            // However, `update-product-images.ts` uses `product._id`. 
            // If we insert with `id` field, Mongo will generate a separate `_id`.
            // The frontend might use `id` or `_id`. 
            // Let's keep `id` as a field and let Mongo generate `_id` automatically.
            return {
                ...p,
                updatedAt: new Date(),
                createdAt: new Date()
            };
        });

        if (productsToInsert.length > 0) {
            await db.collection('products').insertMany(productsToInsert);
            console.log('✅ Products seeded successfully');
        } else {
            console.log('⚠️ No products found in data.json');
        }

        // Seed Orders if present
        if (data.orders && Array.isArray(data.orders)) {
            console.log('🧹 Clearing existing orders...');
            await db.collection('orders').deleteMany({});
            console.log(`🌱 Seeding ${data.orders.length} orders...`);
            await db.collection('orders').insertMany(data.orders.map((o: any) => ({
                ...o,
                date: new Date(o.date)
            })));
            console.log('✅ Orders seeded successfully');
        }

    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected');
    }
}

seedDatabase();
