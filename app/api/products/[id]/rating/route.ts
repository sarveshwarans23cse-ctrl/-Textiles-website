import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { rating } = body as { rating?: number };

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5' },
        { status: 400 }
      );
    }

    const data = readData();
    const product = data.products.find(p => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const currentCount = product.ratingCount ?? 0;
    const currentAvg = product.rating ?? 0;
    const newCount = currentCount + 1;
    const newAvg = (currentAvg * currentCount + rating) / newCount;

    product.rating = Number(newAvg.toFixed(2));
    product.ratingCount = newCount;

    writeData(data);

    return NextResponse.json({
      id: product.id,
      rating: product.rating,
      ratingCount: product.ratingCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    );
  }
}
