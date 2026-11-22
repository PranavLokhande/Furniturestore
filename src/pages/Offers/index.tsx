import React, { useState, useMemo } from 'react';
import { Tag, Sparkles, Copy, Check, Percent } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';

export const OffersPage: React.FC = () => {
  const [selectedDiscountTier, setSelectedDiscountTier] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeDeals = [
    { code: 'WOOD10', disc: '10% OFF', desc: 'Extra 10% on all Solid Sheesham & Teak Wood pieces', min: '₹15,000' },
    { code: 'FURNITURE10', disc: '10% OFF', desc: 'Flat 10% off on Living Room Sofas & Coffee Tables', min: '₹10,000' },
    { code: 'WELCOME2000', disc: '15% OFF', desc: 'New Customer Welcome Voucher for first order', min: '₹20,000' },
    { code: 'FESTIVE25', disc: '25% OFF', desc: 'Mega Seasonal Festival Clearance on select beds', min: '₹35,000' },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredOffers = useMemo(() => {
    if (selectedDiscountTier === 0) {
      return products.filter((p) => p.discount_percentage >= 25);
    }
    return products.filter((p) => p.discount_percentage >= selectedDiscountTier);
  }, [selectedDiscountTier]);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Promotional Banner */}
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-r from-[#252525] via-[#333333] to-[#1A1A1A] text-white p-8 sm:p-14 mb-12 border border-[#EAE7E1] shadow-md">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD84D] text-[#252525] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Limited Period Mega Sale
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Grand Festive Deals & <span className="text-[#F4C542]">Instant Coupons</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
              Explore season-exclusive pricing across our solid wood master collections. Enjoy complimentary delivery, free assembly, and up to 50% discount.
            </p>
          </div>
        </div>

        {/* Coupon Cards Grid */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#252525] mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#F4C542]" />
            Active Discount Coupons for You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeDeals.map((deal) => (
              <div
                key={deal.code}
                className="p-5 rounded-sm border-2 border-dashed border-[#F4C542] bg-[#FFFDF5] relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-[#FFD84D] text-[#252525] text-[11px] font-bold rounded">
                      {deal.disc}
                    </span>
                    <span className="text-[10px] text-[#777777]">Min {deal.min}</span>
                  </div>
                  <div className="font-mono font-bold text-base text-[#252525] tracking-wider mb-1">
                    {deal.code}
                  </div>
                  <p className="text-xs text-[#777777] leading-normal mb-4">
                    {deal.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyCode(deal.code)}
                  className="w-full py-2 bg-white border border-[#252525] hover:bg-[#252525] hover:text-white text-[#252525] text-xs font-bold rounded-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedCode === deal.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Filters */}
        <div className="flex items-center justify-between border-b border-[#EAE7E1] pb-4 mb-8">
          <h2 className="text-xl font-serif font-bold text-[#252525]">
            Shop By Discount Bracket
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { label: 'All Offers', tier: 0 },
              { label: '30% & Above', tier: 30 },
              { label: '40% & Above', tier: 40 },
              { label: '50% Flat Off', tier: 50 },
            ].map((t) => (
              <button
                key={t.tier}
                onClick={() => setSelectedDiscountTier(t.tier)}
                className={`px-4 py-2 text-xs font-bold rounded-sm transition-all whitespace-nowrap ${
                  selectedDiscountTier === t.tier
                    ? 'bg-[#252525] text-white'
                    : 'bg-[#F8F7F4] text-[#777777] hover:text-black border border-[#EAE7E1]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default OffersPage;
