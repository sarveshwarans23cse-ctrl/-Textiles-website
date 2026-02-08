'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [localRating, setLocalRating] = useState<number | undefined>(product.rating);
  const [ratingCount, setRatingCount] = useState<number>(product.ratingCount ?? 0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const uniqueId = `half-${product.id}`;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={uniqueId}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path fill={`url(#${uniqueId})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {rating > 0 && (
          <span className="ml-1 text-xs text-gray-600 font-medium">{rating.toFixed(1)}</span>
        )}
      </div>
    );
  };

  const submitRating = async (value: number) => {
    if (submitting) return;
    try {
      setSubmitting(true);
      const res = await fetch(`/api/products/${product.id}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });
      if (!res.ok) throw new Error('Failed to rate');
      const data = await res.json();
      setLocalRating(data.rating);
      setRatingCount(data.ratingCount ?? 0);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
      setHoverRating(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-48 w-full bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-xs font-semibold text-primary-600">New</span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="mb-3">
          {/* Display average rating */}
          {localRating && localRating > 0 ? (
            <div className="flex items-center gap-2">
              {renderStars(localRating)}
              <span className="text-xs text-gray-500">({ratingCount})</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500">No ratings yet</span>
          )}
          {/* Interactive rate control */}
          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                disabled={submitting}
                onMouseEnter={() => setHoverRating(v)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => submitRating(v)}
                className="p-0.5"
                aria-label={`Rate ${v} star${v > 1 ? 's' : ''}`}
                title={`Rate ${v}`}
              >
                <svg
                  className={`w-5 h-5 ${((hoverRating ?? 0) >= v) ? 'text-yellow-400' : 'text-gray-300'} ${submitting ? 'opacity-50' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary-600">
            ₹{product.price.toLocaleString()}
          </span>
          {product.stock < 10 && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
              {product.stock} left
            </span>
          )}
        </div>
        {/* Add to Cart button removed as per user request */}
      </div>
    </div>
  );
}

export default memo(ProductCard);

