// ============================================================
// WoodCraft India — StarRating
// Reusable star rating display with filled/half/empty states
// ============================================================
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

const StarRating: React.FC<StarRatingProps> = React.memo(({ rating, count, size = 'sm' }) => {
  const starSize = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  const textSize = size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className="flex items-center gap-1">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const filled  = i + 1 <= Math.floor(rating);
          const half    = !filled && i < rating && rating - i >= 0.4;

          return (
            <span key={i} className="relative inline-block">
              {/* Base empty star */}
              <Star className={`${starSize} star-empty`} />

              {/* Filled overlay */}
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star className={`${starSize} star-filled`} />
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Numeric rating */}
      <span className={`${textSize} font-semibold text-brand-dark leading-none`}>
        {rating.toFixed(1)}
      </span>

      {/* Review count */}
      {count !== undefined && (
        <span className={`${textSize} text-brand-muted leading-none`}>
          ({count.toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
});

StarRating.displayName = 'StarRating';

export { StarRating };
export default StarRating;
