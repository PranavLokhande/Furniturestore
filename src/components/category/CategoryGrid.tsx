// ============================================================
// WoodCraft India — CategoryGrid
// Premium WoodenStreet-inspired "Shop By Category" section
// Featuring quick-swipe mobile category bar and luxury visual cards
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { quickCategories } from '../../data/products';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="bg-brand-bg py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Explore Solid Wood Craft</span>
            </div>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">Shop By Category</h2>
            <p className="section-subheading text-xs sm:text-sm md:text-base">
              Kiln-dried Sheesham & Teak collections crafted for modern Indian homes
            </p>
          </div>

          <Link
            to="/category/all"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-dark hover:text-amber-700 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Mobile-Only Quick Swipe Category Bubbles ── */}
        <div className="sm:hidden mb-6 -mx-4 px-4 overflow-x-auto hide-scrollbar flex items-center gap-3.5">
          {quickCategories.map((cat) => (
            <Link
              key={`quick-${cat.slug}`}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center shrink-0 group"
            >
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-brand-yellow/70 group-hover:border-brand-dark transition-colors overflow-hidden bg-white shadow-xs">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] font-semibold text-brand-dark mt-1.5 text-center truncate max-w-[70px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* ── Main Category Cards Grid (2 cols mobile, 3 tablet, 4 md, 6 xl) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {quickCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group bg-white rounded-lg border border-brand-border/80 overflow-hidden shadow-xs hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Offer Tag */}
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#F2EFE9]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Yellow Offer Pill */}
                {cat.offer && (
                  <span className="absolute top-2 left-2 bg-brand-yellow text-brand-dark text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs tracking-tight">
                    {cat.offer}
                  </span>
                )}

                {/* Subtle bottom gradient for contrast */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Text Info Below Image */}
              <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-brand-dark group-hover:text-amber-800 transition-colors leading-tight line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-brand-muted mt-0.5 font-medium">
                    100% Solid Hardwood
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-semibold text-brand-dark group-hover:text-brand-yellow">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
