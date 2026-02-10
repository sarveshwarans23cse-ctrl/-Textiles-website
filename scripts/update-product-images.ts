/**
 * Script to update all products with beautiful saree images from Unsplash
 * Run with: npx tsx scripts/update-product-images.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// High-quality saree images from Unsplash (free to use)
const sareeImages: { [key: string]: string } = {
    // Kanchipuram Silk Sarees
    'kanchipuram': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',

    // Banarasi Silk Sarees
    'banarasi': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',

    // Cotton Sarees
    'cotton': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',

    // Silk Sarees (General)
    'silk': 'https://images.unsplash.com/photo-1602481132167-82e4f1cb35a8?w=800&q=80',

    // Organza Sarees
    'organza': 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80',

    // Linen Sarees
    'linen': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',

    // Kotta Sarees
    'kotta': 'https://images.unsplash.com/photo-1583391733803-9f9e1e9e2a1c?w=800&q=80',

    // Party Wear
    'party': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',

    // Default fallback
    'default': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80'
};

// Array of different saree image URLs for variety
const sareeImagePool = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', // Red silk saree
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80', // Traditional saree
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80', // Elegant drape
    'https://images.unsplash.com/photo-1602481132167-82e4f1cb35a8?w=800&q=80', // Bridal saree
    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80', // Party wear
    'https://images.unsplash.com/photo-1583391733803-9f9e1e9e2a1c?w=800&q=80', // Designer saree
    'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80', // Traditional wear
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', // Festive saree
];

// MongoDB connection string from environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prasanna_tex';

async function updateProductImages() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get the products collection directly
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not established');
        }

        const productsCollection = db.collection('products');

        // Fetch all products
        const products = await productsCollection.find({}).toArray();
        console.log(`📦 Found ${products.length} products to update`);

        let updatedCount = 0;

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productName = (product.name || '').toLowerCase();
            const category = (product.category || '').toLowerCase();

            // Determine the best image based on product name/category
            let imageUrl = sareeImagePool[i % sareeImagePool.length]; // Cycle through images for variety

            // Try to match specific keywords for better image assignment
            for (const [keyword, url] of Object.entries(sareeImages)) {
                if (productName.includes(keyword) || category.includes(keyword)) {
                    imageUrl = url;
                    break;
                }
            }

            // Update the product
            await productsCollection.updateOne(
                { _id: product._id },
                {
                    $set: {
                        image: imageUrl,
                        updatedAt: new Date()
                    }
                }
            );

            updatedCount++;
            console.log(`✅ Updated [${i + 1}/${products.length}]: ${product.name}`);
        }

        console.log(`\n🎉 Successfully updated ${updatedCount} products with new images!`);

    } catch (error) {
        console.error('❌ Error updating products:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the script
updateProductImages();
