import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectToDatabase();
    // Use lean() for faster read-only queries (returns plain JS objects)
    const products = await Product.find({}).lean();

    // Transform _id to id since lean() bypasses mongoose toJSON virtuals
    const transformedProducts = products.map((product: any) => ({
      ...product,
      id: product._id.toString(),
      _id: undefined,
      __v: undefined,
    }));

    // Create response with caching headers
    const response = NextResponse.json(transformedProducts);
    // Cache for 60 seconds, allow stale content while revalidating
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, price, description, image, stock, rating, offerPercent, offerLabel, variants } = body;
    // Note: variants are optional in the destructuring but might be passed

    if (!name || !category || !price || !description || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newProduct = await Product.create({
      name,
      category,
      price: Number(price),
      description,
      image,
      stock: stock || 0,
      rating: rating ? Number(rating) : 0,
      offerPercent: offerPercent ? Number(offerPercent) : 0,
      offerLabel: offerLabel || undefined,
      variants: variants || []
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

