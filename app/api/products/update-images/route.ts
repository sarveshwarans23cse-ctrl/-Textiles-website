import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

// High-quality saree images from Unsplash (free to use)
const sareeImagePool = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', // Red silk saree
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80', // Traditional saree
    'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80', // Elegant drape
    'https://images.unsplash.com/photo-1602481132167-82e4f1cb35a8?w=800&q=80', // Bridal saree
    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80', // Party wear
    'https://images.unsplash.com/photo-1583391733803-9f9e1e9e2a1c?w=800&q=80', // Designer saree
    'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80', // Traditional wear
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', // Festive saree
    'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&q=80', // Wedding saree
    'https://images.unsplash.com/photo-1614886137520-3b5176c15bc9?w=800&q=80', // Colorful saree
];

// Keyword-based image mapping for better matching
const sareeImages: { [key: string]: string } = {
    'kanchipuram': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    'banarasi': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    'cotton': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    'silk': 'https://images.unsplash.com/photo-1602481132167-82e4f1cb35a8?w=800&q=80',
    'organza': 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80',
    'linen': 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80',
    'kotta': 'https://images.unsplash.com/photo-1583391733803-9f9e1e9e2a1c?w=800&q=80',
    'kora': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    'party': 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&q=80',
    'crepe': 'https://images.unsplash.com/photo-1614886137520-3b5176c15bc9?w=800&q=80',
    'raw': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    'handloom': 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80',
};

export async function POST() {
    try {
        await connectToDatabase();

        // Fetch all products
        const products = await Product.find({});
        console.log(`Found ${products.length} products to update`);

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
            await Product.findByIdAndUpdate(product._id, {
                image: imageUrl,
                updatedAt: new Date()
            });

            updatedCount++;
            console.log(`Updated [${i + 1}/${products.length}]: ${product.name}`);
        }

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${updatedCount} products with new images!`,
            updatedCount
        });

    } catch (error) {
        console.error('Error updating products:', error);
        return NextResponse.json(
            { error: 'Failed to update product images' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Use POST to update all product images',
        endpoint: '/api/products/update-images'
    });
}
