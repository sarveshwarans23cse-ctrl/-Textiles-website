
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prasanna_tex';

async function updateProductRatings() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        if (!db) throw new Error('Database connection established but db object is missing');

        const products = await db.collection('products').find({}).toArray();
        console.log(`📦 Found ${products.length} products to check`);

        let updatedCount = 0;

        for (const product of products) {
            // Check if rating is missing or 0
            if (!product.rating || product.rating === 0 || !product.ratingCount) {
                // Generate random rating between 3.8 and 4.9
                const randomRating = (Math.random() * (4.9 - 3.8) + 3.8).toFixed(1);
                // Generate random count between 12 and 150
                const randomCount = Math.floor(Math.random() * (150 - 12) + 12);

                await db.collection('products').updateOne(
                    { _id: product._id },
                    {
                        $set: {
                            rating: Number(randomRating),
                            ratingCount: randomCount,
                            updatedAt: new Date()
                        }
                    }
                );

                console.log(`✅ Updated ${product.name}: ${randomRating} ⭐ (${randomCount} reviews)`);
                updatedCount++;
            }
        }

        console.log(`\n🎉 Successfully updated ratings for ${updatedCount} products!`);

    } catch (error) {
        console.error('❌ Error updating ratings:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

updateProductRatings();
