// ============================================================
// WoodCraft India — ProductCard
// Premium product card with hover effects, wishlist & quick-add
// ============================================================
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore, useWishlistStore } from '../../store/index';
import { formatPrice } from '../../lib/utils';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, showQuickAdd = true }) => {
  const addToCart     = useCartStore(s => s.addItem);
  const toggleWishlist = useWishlistStore(s => s.toggle);
  const isWishlisted  = useWishlistStore(s => s.isWishlisted(product.id));

  const mainImage      = product.images.find(img => img.type === 'main') ?? product.images[0];
  const secondaryImage = product.images.find(img => img.type === 'secondary' || img.type === 'lifestyle');

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product, 1);
    },
    [addToCart, product]
  );

  const handleWishlistToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(product);
    },
    [toggleWishlist, product]
  );

  return (
    <Link to={`/product/${product.slug}`} className="product-card group block">
      {/* ── Image area ── */}
      <div className="product-card-image-wrap">
        {/* Main image */}
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="product-card-img"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-brand-bg flex items-center justify-center">
            <span className="text-brand-muted text-xs">No image</span>
          </div>
        )}

        {/* Secondary image (hover fade) */}
        {secondaryImage && (
          <img
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            className="product-card-img-secondary"
            loading="lazy"
          />
        )}

        {/* Badges — discount takes priority over new */}
        {product.discount_percentage > 0 && !product.is_new_arrival && (
          <span className="discount-badge">-{product.discount_percentage}%</span>
        )}
        {product.is_new_arrival && (
          <span className="new-badge">New</span>
        )}
        {product.discount_percentage > 0 && product.is_new_arrival && (
          <span className="discount-badge">-{product.discount_percentage}%</span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="wishlist-btn"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-brand-dark'
            }`}
          />
        </button>

        {/* Quick-add button (Desktop hover) */}
        {showQuickAdd && (
          <button
            onClick={handleAddToCart}
            className="quick-add-btn hidden sm:inline-flex"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        )}
      </div>

      {/* ── Info area ── */}
      <div className="p-2.5 sm:p-3">
        {/* Category */}
        <p className="text-[10px] sm:text-xs text-brand-muted uppercase tracking-widest mb-0.5 truncate">
          {product.category_name}
        </p>

        {/* Product name */}
        <h3 className="text-xs sm:text-sm font-medium text-brand-dark leading-snug line-clamp-2 mb-1 min-h-[2rem] sm:min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Star rating */}
        <div className="mb-1.5">
          <StarRating rating={product.rating} count={product.review_count} size="sm" />
        </div>

        {/* Price row + Mobile quick add */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-baseline flex-wrap gap-0.5 min-w-0">
            <span className="price-current text-sm sm:text-base md:text-lg">{formatPrice(product.price)}</span>
            {product.original_price > product.price && (
              <>
                <span className="price-original text-[10px] sm:text-xs">{formatPrice(product.original_price)}</span>
                <span className="price-discount text-[10px] sm:text-xs">{product.discount_percentage}% off</span>
              </>
            )}
          </div>

          {/* Mobile quick add button */}
          {showQuickAdd && (
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="sm:hidden w-7 h-7 rounded-full bg-brand-yellow hover:bg-brand-dark text-brand-dark hover:text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
