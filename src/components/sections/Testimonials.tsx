// ============================================================
// WoodCraft India — Testimonials Section
// Embla carousel, 1/2/3 cards per viewport, prev/next dots
// ============================================================
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/products';
import { StarRating } from '../product/StarRating';
import type { Review } from '../../types';

// Map product_id → product name (derived from data)
const productNames: Record<string, string> = {
  p1:  'Regal 3-Seater Sofa',
  p2:  'Luxe L-Shape Corner Sofa',
  p5:  'Royal King Bed with Storage',
  p8:  'Grand 3-Door Wardrobe with Mirror',
  p10: 'Heritage 6-Seater Dining Set',
  p12: 'Arc Marble Top Coffee Table',
};

const TestimonialCard = React.memo(({ review }: { review: Review }) => (
  <article
    className="bg-white rounded-sm border border-brand-border shadow-sm hover:shadow-md
               transition-shadow duration-300 p-6 flex flex-col h-full mx-2"
  >
    {/* Opening quote */}
    <span
      className="font-display text-6xl leading-none text-brand-yellow select-none mb-2"
      aria-hidden="true"
    >
      &ldquo;
    </span>

    {/* Star rating */}
    <StarRating rating={review.rating} size="sm" />

    {/* Title */}
    <h3 className="font-semibold text-brand-dark text-base mt-3 mb-2 leading-snug">
      {review.title}
    </h3>

    {/* Body */}
    <p className="text-brand-muted text-sm leading-relaxed line-clamp-4 flex-1">
      {review.body}
    </p>

    {/* Reviewer */}
    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-brand-border">
      {review.user_avatar ? (
        <img
          src={review.user_avatar}
          alt={review.user_name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-brand-yellow">
            {review.user_name.charAt(0)}
          </span>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-brand-dark leading-tight">
          {review.user_name}
        </p>
        <p className="text-xs text-brand-muted leading-tight mt-0.5">
          Bought: {productNames[review.product_id] ?? 'WoodCraft Product'}
        </p>
      </div>
    </div>
  </article>
));

TestimonialCard.displayName = 'TestimonialCard';

export const Testimonials: React.FC = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 },
      },
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className="bg-brand-bg py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-heading">What Our Customers Say</h2>
            <p className="section-subheading">Real stories from happy homeowners</p>
          </div>
          {/* Prev / Next buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="carousel-btn"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="carousel-btn"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-2">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <TestimonialCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === selectedIndex
                  ? 'w-6 h-2.5 bg-brand-yellow'
                  : 'w-2.5 h-2.5 bg-brand-border hover:bg-brand-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
