// ============================================================
// WoodCraft India — ExclusiveDeals Section
// 2×2 grid of deal cards with background images, navigates
// to /category/:slug with discount filter
// ============================================================
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DealCard {
  label: string;       // e.g. "Up to 30% OFF"
  category: string;    // display name
  slug: string;        // URL slug
  discountParam: number;
  image: string;
  accentColor: string; // tailwind text class for label
}

const deals: DealCard[] = [
  {
    label: 'Up to 30% OFF',
    category: 'Dining Furniture',
    slug: 'dining-room',
    discountParam: 30,
    image: '/images/hero-dining.jpg',
    accentColor: 'text-brand-yellow',
  },
  {
    label: 'Up to 40% OFF',
    category: 'Bedroom Furniture',
    slug: 'bedroom',
    discountParam: 40,
    image:
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    accentColor: 'text-brand-yellow',
  },
  {
    label: 'Up to 50% OFF',
    category: 'Sofas & Recliners',
    slug: 'living-room',
    discountParam: 50,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    accentColor: 'text-brand-yellow',
  },
  {
    label: 'Special Combo Offers',
    category: 'Mix & Match',
    slug: 'all',
    discountParam: 0,
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    accentColor: 'text-brand-yellow',
  },
];

const DealCardItem = React.memo(({ deal }: { deal: DealCard }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams();
    if (deal.discountParam > 0) {
      params.set('discount_min', deal.discountParam.toString());
    }
    const query = params.toString();
    navigate(`/category/${deal.slug}${query ? `?${query}` : ''}`);
  };

  return (
    <article
      className="relative overflow-hidden rounded-lg cursor-pointer group h-44 sm:h-56 md:h-72 shadow-xs hover:shadow-md transition-all"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${deal.label} on ${deal.category}`}
    >
      {/* Background image */}
      <img
        src={deal.image}
        alt={deal.category}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
        <span className={`text-base sm:text-xl md:text-2xl font-display font-bold ${deal.accentColor} drop-shadow`}>
          {deal.label}
        </span>
        <span className="text-white font-semibold text-xs sm:text-base mt-0.5 drop-shadow line-clamp-1">
          {deal.category}
        </span>

        {/* CTA */}
        <button className="mt-2 sm:mt-3 inline-flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-white border border-white/60 rounded px-2.5 py-1 sm:px-4 sm:py-1.5 w-fit transition-all duration-200 group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-brand-yellow">
          Shop Now <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </article>
  );
});

DealCardItem.displayName = 'DealCardItem';

export const ExclusiveDeals: React.FC = () => {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="section-heading">Exclusive Deals</h2>
            <p className="section-subheading">Limited-time offers — grab them before they're gone!</p>
          </div>
        </div>

        {/* 2×2 grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {deals.map((deal) => (
            <DealCardItem key={deal.slug + deal.label} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
