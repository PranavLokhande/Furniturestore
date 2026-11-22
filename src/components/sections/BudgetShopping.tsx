// ============================================================
// WoodCraft India — BudgetShopping Section
// "Shop Within Your Budget" — 6 price range cards
// Horizontal scroll on mobile, 6-column grid on desktop
// ============================================================
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PriceRange {
  label: string;
  subLabel: string;
  param: string; // query param string appended to URL
}

const ranges: PriceRange[] = [
  { label: 'Under ₹5,000',  subLabel: 'Budget Picks',   param: 'price_max=5000'   },
  { label: 'Under ₹10,000', subLabel: 'Value Finds',    param: 'price_max=10000'  },
  { label: 'Under ₹20,000', subLabel: 'Smart Choices',  param: 'price_max=20000'  },
  { label: 'Under ₹30,000', subLabel: 'Mid-Range',      param: 'price_max=30000'  },
  { label: 'Under ₹50,000', subLabel: 'Premium Value',  param: 'price_max=50000'  },
  { label: 'Above ₹50,000', subLabel: 'Luxury Range',   param: 'price_min=50000'  },
];

const BudgetCard = React.memo(({ range }: { range: PriceRange }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/all?${range.param}`);
  };

  return (
    <article
      className="flex-shrink-0 w-40 sm:w-auto bg-brand-bg border border-brand-border rounded-sm
                 cursor-pointer group transition-all duration-200 hover:shadow-md hover:border-brand-yellow
                 hover:-translate-y-0.5 p-4 md:p-5 flex flex-col items-center text-center"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Shop ${range.label}`}
    >
      {/* Price label */}
      <span className="text-lg md:text-xl font-display font-bold text-brand-yellow leading-tight">
        {range.label}
      </span>

      {/* Sub label */}
      <span className="text-xs text-brand-muted mt-1 font-medium tracking-wide uppercase">
        {range.subLabel}
      </span>

      {/* Divider */}
      <div className="w-8 h-px bg-brand-border my-3" />

      {/* CTA */}
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-dark
                       group-hover:text-brand-yellow transition-colors duration-200">
        Shop Now
        <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
});

BudgetCard.displayName = 'BudgetCard';

export const BudgetShopping: React.FC = () => {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-7">
          <h2 className="section-heading">Shop Within Your Budget</h2>
          <p className="section-subheading">Quality furniture for every price point</p>
        </div>

        {/* Mobile: horizontal scroll with bleed | Desktop: 6-col grid */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-6 sm:overflow-visible pb-2 sm:pb-0">
          {ranges.map((range) => (
            <BudgetCard key={range.param} range={range} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetShopping;
