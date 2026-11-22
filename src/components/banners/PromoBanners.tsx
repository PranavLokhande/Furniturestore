// ============================================================
// WoodCraft India — PromoBanners
// Two layouts: PromoBannersDouble (2-col) & PromoBannerFull
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── Layout A: Two-column banners ────────────────────────────
export const PromoBannersDouble: React.FC = () => {
  const banners = [
    {
      id: 'promo-1',
      heading: 'Upgrade Your\nLiving Room',
      subtext: 'Premium sofas, coffee tables & TV units crafted in solid sheesham wood.',
      cta: 'Shop Living Room',
      link: '/category/living-room',
      image: '/images/hero-living-room.jpg',
      overlayClass: 'bg-gradient-to-r from-teal-950/85 via-teal-900/50 to-transparent',
    },
    {
      id: 'promo-2',
      heading: 'The Perfect\nBedroom',
      subtext: 'Handcrafted beds, wardrobes & nightstands for restful nights.',
      cta: 'Shop Bedroom',
      link: '/category/bedroom',
      image: '/images/hero-bedroom.jpg',
      overlayClass: 'bg-gradient-to-r from-amber-950/85 via-amber-900/50 to-transparent',
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-brand-bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {banners.map((b) => (
            <Link
              key={b.id}
              to={b.link}
              className="group relative overflow-hidden rounded-lg h-56 sm:h-64 md:h-80 block shadow-xs hover:shadow-md transition-shadow"
            >
              {/* BG image */}
              <img
                src={b.image}
                alt={b.heading}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 ${b.overlayClass}`} />

              {/* Content */}
              <div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-8">
                <div>
                  <h3 className="font-display font-bold text-white text-xl sm:text-2xl md:text-3xl leading-tight whitespace-pre-line mb-1.5 sm:mb-2">
                    {b.heading}
                  </h3>
                  <p className="text-white/85 text-xs sm:text-sm mb-3 sm:mb-4 max-w-xs line-clamp-2">{b.subtext}</p>
                  <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-dark text-xs font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm
                                   group-hover:bg-white transition-colors duration-200">
                    {b.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Layout B: Full-width editorial banner ────────────────────
export const PromoBannerFull: React.FC = () => {
  return (
    <section className="bg-brand-bg py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-sm border border-brand-border overflow-hidden">

          {/* Left — editorial text */}
          <div className="relative bg-brand-bg bg-grain p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            {/* Decorative wood accent */}
            <div className="w-12 h-1 bg-brand-yellow mb-6 rounded-full" />

            <p className="text-xs uppercase tracking-widest text-brand-muted font-semibold mb-3">
              Our Story
            </p>

            <h2 className="font-display font-bold text-brand-dark text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
              Solid Wood.<br />
              <em className="not-italic text-brand-accent">Forever.</em>
            </h2>

            <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-4 max-w-md">
              Every piece at WoodCraft India is built to outlast trends and time.
              Our artisans have honed their craft across three generations,
              hand-selecting sheesham, teak, and mango wood for each creation.
            </p>

            <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-8 max-w-md">
              From the sawmill to your living room, we control every step —
              so you receive furniture that's not just beautiful, but truly built to last.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/category/all" className="btn-primary">
                Explore Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/room-planner" className="btn-outline">
                3D Room Planner
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-brand-border">
              {[
                { label: 'Years of Craft', value: '25+' },
                { label: 'Happy Homes', value: '50K+' },
                { label: 'Artisans', value: '200+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-2xl text-brand-dark">{stat.value}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — lifestyle image */}
          <div className="relative h-72 lg:h-auto lg:min-h-[480px] overflow-hidden">
            <img
              src="/images/hero-dining.jpg"
              alt="WoodCraft India furniture lifestyle"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </div>
    </section>
  );
};
