// ============================================================
// WoodCraft India — ProductCarousel
// Horizontal Embla carousel with arrow nav + View All
// ============================================================
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import ProductCard from '../product/ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  badgeType?: 'discount' | 'new' | 'bestseller';
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  badgeType: _badgeType,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      dragFree: true,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products.length) return null;

  return (
    <section className="bg-white py-8 sm:py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        {/* Header row */}
        <div className="flex items-end justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h2 className="section-heading text-xl sm:text-2xl md:text-3xl">{title}</h2>
            {subtitle && <p className="section-subheading text-xs sm:text-sm md:text-base line-clamp-1 sm:line-clamp-none">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Nav buttons */}
            <button
              onClick={scrollPrev}
              disabled={!prevEnabled}
              aria-label="Scroll left"
              className="carousel-btn disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextEnabled}
              aria-label="Scroll right"
              className="carousel-btn disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* View all */}
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="btn-outline text-xs px-3 py-1.5 sm:px-4 sm:py-2 ml-1 hidden sm:inline-flex"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2.5 sm:gap-3 md:gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  flex-[0_0_calc(58%-6px)]
                  xs:flex-[0_0_calc(48%-6px)]
                  sm:flex-[0_0_calc(33.333%-11px)]
                  lg:flex-[0_0_calc(25%-12px)]
                  xl:flex-[0_0_calc(20%-13px)]
                  min-w-0
                "
              >
                <ProductCard product={product} showQuickAdd />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile "View All" */}
        {viewAllLink && (
          <div className="mt-4 text-center sm:hidden">
            <Link to={viewAllLink} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark py-2 px-4 border border-brand-border rounded-full hover:bg-brand-bg transition-colors">
              <span>View All {title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCarousel;
