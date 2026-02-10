import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const rating = Number(body.rating);

    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const product = await Product.findById(id);

    if (!product) {
      console.error(`Product not found with ID: ${id}`);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Calculate new average rating
    const currentCount = product.ratingCount || 0;
    const currentAvg = product.rating || 0;

    // New weighted average
    const newCount = currentCount + 1;
    const newAvg = ((currentAvg * currentCount) + rating) / newCount;

    product.rating = Number(newAvg.toFixed(2));
    product.ratingCount = newCount;

    await product.save();

    return NextResponse.json({
      id: product._id,
      rating: product.rating,
      ratingCount: product.ratingCount,
      message: 'Rating updated successfully'
    });

  } catch (error) {
    console.error('Error updating rating:', error);
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    );
  }
}
