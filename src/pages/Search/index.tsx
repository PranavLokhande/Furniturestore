import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, Sparkles } from 'lucide-react';
import { searchProducts, products } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const popularTags = ['Sofa', 'Bed', 'Dining', 'Wardrobe', 'Coffee Table', 'Sheesham', 'Teak', 'Recliner'];

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Input Hero Bar */}
        <div className="bg-[#F8F7F4] border border-[#EAE7E1] p-6 sm:p-10 rounded-sm mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252525] mb-2">
            Search Solid Wood Furniture
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] mb-6">
            Find the perfect handcrafted piece for your living room, bedroom, dining or office.
          </p>

          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by furniture name, hardwood or room..."
                className="w-full bg-white border border-[#EAE7E1] pl-10 pr-4 py-3 rounded-sm text-xs sm:text-sm focus:outline-none focus:border-[#F4C542]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold text-xs uppercase tracking-wider rounded-sm shrink-0"
            >
              Search
            </button>
          </form>

          {/* Popular Search Suggestions */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-xs">
            <span className="text-[#777777] font-medium">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchTerm(tag);
                  setSearchParams({ q: tag });
                }}
                className="px-2.5 py-1 bg-white border border-[#EAE7E1] rounded-full text-[11px] text-[#252525] hover:border-[#F4C542] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        {query && (
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E1] mb-8">
            <div className="text-sm text-[#252525]">
              Showing results for "<strong className="font-bold">{query}</strong>"
            </div>
            <div className="text-xs font-semibold text-[#777777]">
              {results.length} Designs Found
            </div>
          </div>
        )}

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          /* Empty Results State */
          <div className="py-16 text-center bg-[#F8F7F4] border border-[#EAE7E1] rounded-sm p-8">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-serif font-bold text-[#252525]">No Exact Matches Found</h3>
            <p className="text-xs sm:text-sm text-[#777777] max-w-md mx-auto mt-2">
              We couldn't find any furniture pieces matching "{query}". Try checking for spelling mistakes or explore our bestsellers below.
            </p>

            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#252525] mb-4">
                Recommended For You
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {products.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default SearchPage;
