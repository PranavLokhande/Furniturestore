// ============================================================
// WoodCraft India — HeroCarousel
// Full-width hero banner carousel with autoplay
// ============================================================
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroBanners } from '../../data/products';

const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const activeBanners = heroBanners.filter(b => b.is_active);

  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Embla viewport ── */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {activeBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative flex-[0_0_100%] min-w-0 h-[360px] sm:h-[460px] md:h-[580px] lg:h-[680px]"
            >
              {/* Background image */}
              <picture>
                <source media="(min-width: 768px)" srcSet={banner.desktop_image_url} />
                <img
                  src={banner.mobile_image_url}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center select-none"
                  draggable={false}
                />
              </picture>

              {/* Left gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
                  <div className="max-w-xl text-left">
                    {/* Badge pill */}
                    {banner.badge && (
                      <span className="inline-block bg-brand-yellow text-brand-dark text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full tracking-widest uppercase mb-2 sm:mb-4 animate-fade-in shadow-xs">
                        {banner.badge}
                      </span>
                    )}

                    {/* Subtitle */}
                    <p className="text-white/90 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase mb-1 sm:mb-2">
                      {banner.subtitle}
                    </p>

                    {/* Headline */}
                    <h1 className="font-display font-bold text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 sm:mb-3 text-balance drop-shadow-sm">
                      {banner.title}
                    </h1>

                    {/* Discount text */}
                    {banner.discount_text && (
                      <p className="text-brand-yellow font-extrabold text-base sm:text-xl md:text-2xl mb-2 sm:mb-3">
                        {banner.discount_text}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-white/80 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {banner.description}
                    </p>

                    {/* CTA */}
                    <Link
                      to={banner.cta_link}
                      className="btn-yellow text-xs sm:text-sm md:text-base px-5 py-2.5 sm:px-7 sm:py-3 shadow-lg"
                    >
                      {banner.cta_text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Prev / Next arrows (desktop & tablet only) ── */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 carousel-btn z-20 opacity-80 hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 carousel-btn z-20 opacity-80 hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? 'bg-brand-yellow w-6'
                : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
