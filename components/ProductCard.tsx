'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/utils';
import { Sparkles, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [localRating, setLocalRating] = useState<number | undefined>(product.rating);
  const [ratingCount, setRatingCount] = useState<number>(product.ratingCount ?? 0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);

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
          <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-3.5 h-3.5 text-amber-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
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
          <svg key={i} className="w-3.5 h-3.5 text-stone-200 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {rating > 0 && (
          <span className="ml-1.5 text-xs text-stone-500 font-semibold">{rating.toFixed(1)}</span>
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
    <div className="premium-card premium-border group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-stone-100">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      <Link href={`/product/${product.id}`} className="block">
        <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-rose-50">
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-rose-100 to-primary-100">
              <span className="text-3xl font-serif text-stone-400/60 tracking-wider">Saree</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent mt-1" />
            </div>
          )}

          {/* Premium Badge with Animation */}
          <div className="absolute top-2 right-2 z-20">
            <div className="relative group/badge">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-primary-500 rounded-full blur-sm opacity-60 group-hover/badge:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-amber-500 to-primary-600 text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 animate-sparkle" />
                <span className="tracking-wider">New</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons on Hover */}
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
            <button
              onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 backdrop-blur-sm text-stone-600 hover:bg-rose-500 hover:text-white'
                }`}
            >
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-md"
            >
              <Eye className="w-3 h-3" />
            </button>
          </div>

          {/* Bottom Shimmer Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
        </div>
      </Link>

      <div className="p-3 relative">
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-serif font-semibold text-stone-800 mb-1 line-clamp-1 group-hover:text-primary-700 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Rating Section */}
        <div className="mb-2">
          {localRating && localRating > 0 ? (
            <div className="flex items-center gap-1.5">
              {renderStars(localRating)}
              <span className="text-[10px] text-stone-400 font-medium bg-stone-100 px-1.5 py-0.5 rounded-full">({ratingCount})</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              {renderStars(0)}
              <span className="text-[10px] text-stone-400 italic">No ratings</span>
            </div>
          )}

          {/* Interactive Rate Control with Premium Styling */}
          <div className="mt-2 flex items-center gap-0.5 p-1.5 bg-gradient-to-r from-stone-50 to-amber-50/50 rounded-lg">
            <span className="text-[8px] text-stone-400 tracking-wider uppercase mr-1 font-medium">Rate:</span>
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                disabled={submitting}
                onMouseEnter={() => setHoverRating(v)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => submitRating(v)}
                className="p-0.5 transform transition-transform hover:scale-125"
                aria-label={`Rate ${v} star${v > 1 ? 's' : ''}`}
                title={`Rate ${v}`}
              >
                <svg
                  className={`w-3 h-3 transition-all duration-200 ${(hoverRating ?? 0) >= v
                    ? 'text-amber-400 drop-shadow-md scale-110'
                    : 'text-stone-200 hover:text-amber-300'
                    } ${submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-stone-500 mb-2 line-clamp-2 leading-relaxed min-h-[2rem]">
          {product.description}
        </p>

        {/* Price Section with Premium Styling */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div className="flex flex-col">
            <span className="text-[8px] text-stone-400 uppercase tracking-wider font-medium">Price</span>
            <span className="text-lg font-serif font-bold bg-gradient-to-r from-primary-600 to-amber-600 bg-clip-text text-transparent">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          {product.stock < 10 && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-semibold">{product.stock} left</span>
            </div>
          )}
        </div>

        {/* View Details Button - Appears on Hover */}
        <div className="mt-2 overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
          <Link
            href={`/product/${product.id}`}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-gradient-to-r from-stone-800 to-stone-900 hover:from-primary-600 hover:to-primary-700 text-white text-xs font-medium tracking-wider rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Eye className="w-3 h-3" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);

