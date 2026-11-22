import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, SlidersHorizontal, ChevronDown, 
  X, RotateCcw, Sparkles, Home as HomeIcon, 
  ShieldCheck, Truck, Wrench 
} from 'lucide-react';
import { products, categories } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';
import type { SortOption } from '../../types';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mobile drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters State
  const initialMaxPrice = Number(searchParams.get('price_max')) || 100000;
  const initialMinDiscount = Number(searchParams.get('discount_min')) || 0;
  const initialSort = (searchParams.get('sort') as SortOption) || 'popularity';

  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [minDiscount, setMinDiscount] = useState<number>(initialMinDiscount);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Find matching subcategory and parent category
  const currentSubcategory = useMemo(() => {
    if (!slug || slug === 'all') return null;
    return categories.flatMap(c => c.subcategories || []).find(s => s.slug === slug);
  }, [slug]);

  const currentCategory = useMemo(() => {
    if (!slug || slug === 'all') return null;
    if (currentSubcategory) {
      return categories.find(c => c.id === currentSubcategory.parent_id) || null;
    }
    return categories.find(c => c.slug === slug) || null;
  }, [slug, currentSubcategory]);

  const categoryTitle = useMemo(() => {
    if (!slug || slug === 'all') return 'All Solid Wood Collections';
    if (currentSubcategory) return currentSubcategory.name;
    if (currentCategory) return currentCategory.name;
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }, [slug, currentSubcategory, currentCategory]);

  const categoryDescription = useMemo(() => {
    if (currentSubcategory?.description) return currentSubcategory.description;
    if (currentCategory?.description) return currentCategory.description;
    return '100% Solid Sheesham & Teak Wood. Kiln-dried for lifetime durability with 10-year warranty.';
  }, [currentSubcategory, currentCategory]);

  const bannerImage = useMemo(() => {
    if (currentSubcategory?.banner_url) return currentSubcategory.banner_url;
    if (currentSubcategory?.image_url) return currentSubcategory.image_url;
    if (currentCategory?.banner_url) return currentCategory.banner_url;
    if (currentCategory?.image_url) return currentCategory.image_url;
    return '/images/hero-living-room.jpg';
  }, [currentSubcategory, currentCategory]);

  // Subcategory keyword map for robust matching
  const subcategoryKeywords: Record<string, string[]> = {
    'sofas': ['sofa', 'couch', 'sectional'],
    'coffee-tables': ['coffee', 'nesting'],
    'tv-units': ['tv', 'media', 'console'],
    'recliners': ['recliner', 'lounge'],
    'beds': ['bed'],
    'wardrobes': ['wardrobe', 'almirah'],
    'dressers': ['dresser'],
    'bedside-tables': ['nightstand', 'bedside'],
    'dining-tables': ['dining table', 'dining set'],
    'dining-chairs': ['dining chair', 'chair'],
    'bar-furniture': ['bar', 'wine'],
    'study-tables': ['study', 'desk', 'workstation'],
    'office-chairs': ['office chair', 'swivel chair'],
    'bookshelves': ['bookshelf', 'bookcase'],
    'shoe-racks': ['shoe'],
    'cabinets': ['cabinet', 'sideboard', 'buffet', 'crockery'],
    'balcony-sets': ['balcony', 'bistro'],
    'garden-chairs': ['garden', 'armchair'],
    'outdoor-dining': ['outdoor dining', 'patio table'],
    'teak-loungers': ['lounger', 'sunbed'],
    'wall-mirrors': ['mirror'],
    'lamps-lighting': ['lamp', 'light'],
    'wooden-clocks': ['clock'],
    'vases-artifacts': ['vase', 'artifact', 'urli'],
  };

  // Available filter options dynamically from catalog
  const availableMaterials = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.material.split('+').forEach(m => set.add(m.trim()));
    });
    return Array.from(set);
  }, []);

  const availableColors = ['Walnut Brown', 'Teak Natural', 'Honey Oak', 'Dark Walnut', 'Ivory Linen', 'Charcoal'];

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleColor = (col: string) => {
    setSelectedColors(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const clearAllFilters = () => {
    setMaxPrice(100000);
    setMinDiscount(0);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedRating(null);
    setInStockOnly(false);
    setSortBy('popularity');
    setSearchParams({});
  };

  const activeFilterCount = (maxPrice < 100000 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    selectedMaterials.length +
    selectedColors.length +
    (selectedRating ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Slug matching
      if (slug && slug !== 'all') {
        if (currentSubcategory) {
          const keywords = subcategoryKeywords[currentSubcategory.slug] || [currentSubcategory.slug];
          const matchesKeyword = keywords.some(k => 
            product.name.toLowerCase().includes(k) || 
            product.slug.includes(k) || 
            product.description.toLowerCase().includes(k)
          );
          if (!matchesKeyword) return false;
        } else if (currentCategory) {
          const matchesCatId = product.category_id === currentCategory.id;
          const matchesCatName = product.category_name.toLowerCase() === currentCategory.name.toLowerCase();
          if (!matchesCatId && !matchesCatName) return false;
        }
      }

      // 2. Price filter
      if (product.price > maxPrice) return false;

      // 3. Discount filter
      if (minDiscount > 0 && product.discount_percentage < minDiscount) return false;

      // 4. Material filter
      if (selectedMaterials.length > 0) {
        const hasMat = selectedMaterials.some(m => product.material.toLowerCase().includes(m.toLowerCase()));
        if (!hasMat) return false;
      }

      // 5. Color filter
      if (selectedColors.length > 0) {
        const hasCol = selectedColors.some(c => product.color.toLowerCase().includes(c.toLowerCase()));
        if (!hasCol) return false;
      }

      // 6. Rating filter
      if (selectedRating !== null && product.rating < selectedRating) return false;

      // 7. In stock
      if (inStockOnly && product.stock_quantity <= 0) return false;

      return true;
    });
  }, [slug, maxPrice, minDiscount, selectedMaterials, selectedColors, selectedRating, inStockOnly, currentCategory, currentSubcategory]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return list.sort((a, b) => b.price - a.price);
      case 'newest':
        return list.sort((a, b) => (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0));
      case 'discount_desc':
        return list.sort((a, b) => b.discount_percentage - a.discount_percentage);
      case 'rating_desc':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popularity':
      default:
        return list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  // Sister subcategories for quick pill navigation
  const sisterSubcategories = useMemo(() => {
    if (currentCategory && currentCategory.subcategories) {
      return currentCategory.subcategories;
    }
    return [];
  }, [currentCategory]);

  return (
    <div className="bg-white min-h-screen">
      
      {/* ─── DYNAMIC CATEGORY LIFESTYLE HERO BANNER ─────────────────── */}
      <div className="relative overflow-hidden bg-brand-dark text-white min-h-[220px] sm:min-h-[280px] flex items-center border-b border-brand-border">
        {/* Background Image with Dark Aesthetic Gradient */}
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt={categoryTitle}
            className="w-full h-full object-cover object-center brightness-[0.72]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-gray-300 mb-3.5 flex-wrap">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <HomeIcon className="w-3.5 h-3.5" />
              Home
            </Link>
            <span>/</span>
            <Link to="/category/all" className="hover:text-white">Furniture</Link>
            {currentCategory && (
              <>
                <span>/</span>
                <Link to={`/category/${currentCategory.slug}`} className="hover:text-white">
                  {currentCategory.name}
                </Link>
              </>
            )}
            {currentSubcategory && (
              <>
                <span>/</span>
                <span className="text-brand-yellow font-semibold">{currentSubcategory.name}</span>
              </>
            )}
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-brand-yellow text-brand-dark text-[10px] font-bold uppercase tracking-wider mb-2.5 shadow-sm">
              <Sparkles className="w-3 h-3" />
              100% Solid Kiln-Dried Hardwood
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed max-w-xl">
              {categoryDescription}
            </p>
          </div>
        </div>
      </div>

      {/* ─── SISTER SUBCATEGORY PILL BAR ────────────────────────────── */}
      {sisterSubcategories.length > 0 && (
        <div className="bg-[#FAF9F6] border-b border-[#EAE7E1] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
              <span className="text-xs font-bold text-brand-dark uppercase tracking-wider shrink-0 mr-1">
                Explore in {currentCategory?.name}:
              </span>
              <Link
                to={`/category/${currentCategory?.slug}`}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all shrink-0 ${
                  slug === currentCategory?.slug
                    ? 'bg-brand-dark text-white border-brand-dark'
                    : 'bg-white text-brand-dark border-brand-border hover:border-brand-dark'
                }`}
              >
                All {currentCategory?.name}
              </Link>
              {sisterSubcategories.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/category/${sub.slug}`}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all shrink-0 ${
                    slug === sub.slug
                      ? 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-xs'
                      : 'bg-white text-brand-dark border-brand-border hover:border-brand-dark'
                  }`}
                >
                  <img
                    src={sub.image_url}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover shrink-0"
                    loading="lazy"
                  />
                  <span>{sub.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN LISTING LAYOUT ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#EAE7E1] gap-4">
          
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-[#F8F7F4] border border-[#EAE7E1] text-[#252525] text-xs font-bold rounded-sm"
          >
            <Filter className="w-4 h-4 text-[#F4C542]" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          {/* Active Filter Chips */}
          <div className="hidden lg:flex items-center flex-wrap gap-2 flex-1">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1 mr-2"
              >
                <RotateCcw className="w-3 h-3" /> Clear All ({activeFilterCount})
              </button>
            )}
            {maxPrice < 100000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8F7F4] border border-[#EAE7E1] text-[11px] font-medium rounded-full text-[#252525]">
                Under ₹{maxPrice.toLocaleString('en-IN')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(100000)} />
              </span>
            )}
            {minDiscount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFD84D]/30 border border-[#F4C542]/50 text-[11px] font-bold rounded-full text-[#252525]">
                {minDiscount}%+ OFF
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinDiscount(0)} />
              </span>
            )}
            {selectedMaterials.map(m => (
              <span key={m} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8F7F4] border border-[#EAE7E1] text-[11px] font-medium rounded-full text-[#252525]">
                {m}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleMaterial(m)} />
              </span>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#777777] hidden sm:inline font-medium">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products by"
                className="appearance-none bg-white border border-[#EAE7E1] text-xs font-semibold text-[#252525] py-2 pl-3 pr-8 rounded-sm focus:outline-none focus:border-[#F4C542] cursor-pointer"
              >
                <option value="popularity">Popularity / Bestsellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
                <option value="discount_desc">Highest Discount</option>
                <option value="rating_desc">Top Customer Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#777777] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Content Body: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white border border-[#EAE7E1] p-5 rounded-sm h-fit sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E1]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#252525]">
                <SlidersHorizontal className="w-4 h-4 text-[#F4C542]" />
                Refine Selection
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#777777] hover:text-red-600 font-medium"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="border-b border-[#EAE7E1] pb-5">
              <label htmlFor="price-range-slider" className="text-xs font-bold uppercase tracking-wider text-[#252525] block mb-3">
                Max Price: ₹{maxPrice.toLocaleString('en-IN')}
              </label>
              <input
                id="price-range-slider"
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F4C542] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#777777] mt-1 font-medium">
                <span>₹5,000</span>
                <span>₹1,00,000+</span>
              </div>
            </div>

            {/* Discount Filter */}
            <div className="border-b border-[#EAE7E1] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-3">
                Discount Percentage
              </h3>
              <div className="space-y-2">
                {[10, 20, 30, 40, 50].map((d) => (
                  <label key={d} className="flex items-center gap-2.5 text-xs text-[#252525] cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="discount"
                      checked={minDiscount === d}
                      onChange={() => setMinDiscount(minDiscount === d ? 0 : d)}
                      className="accent-[#F4C542] cursor-pointer"
                    />
                    <span>{d}% and above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="border-b border-[#EAE7E1] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-3">
                Solid Hardwood & Materials
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {availableMaterials.slice(0, 8).map((mat) => (
                  <label key={mat} className="flex items-center gap-2.5 text-xs text-[#252525] cursor-pointer hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                      className="rounded border-[#EAE7E1] accent-[#F4C542] cursor-pointer"
                    />
                    <span className="truncate">{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Finish & Color Filter */}
            <div className="border-b border-[#EAE7E1] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-3">
                Wood Polish & Finish
              </h3>
              <div className="space-y-2">
                {availableColors.map((col) => (
                  <label key={col} className="flex items-center gap-2.5 text-xs text-[#252525] cursor-pointer hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(col)}
                      onChange={() => toggleColor(col)}
                      className="rounded border-[#EAE7E1] accent-[#F4C542] cursor-pointer"
                    />
                    <span>{col}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Star Rating */}
            <div className="border-b border-[#EAE7E1] pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-3">
                Customer Rating
              </h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5].map((rate) => (
                  <label key={rate} className="flex items-center gap-2.5 text-xs text-[#252525] cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rate}
                      onChange={() => setSelectedRating(selectedRating === rate ? null : rate)}
                      className="accent-[#F4C542] cursor-pointer"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      ★ {rate} & above
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-[#252525] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#EAE7E1] accent-[#F4C542] cursor-pointer"
                />
                <span>Ready to Ship / In Stock Only</span>
              </label>
            </div>

          </aside>

          {/* PRODUCT GRID */}
          <div className="lg:col-span-3">
            
            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                  {displayedProducts.map((product, idx) => (
                    <React.Fragment key={product.id}>
                      <ProductCard product={product} />

                      {/* IN-GRID EDITORIAL LIFESTYLE BANNER AFTER 3RD PRODUCT */}
                      {idx === 2 && (
                        <div className="col-span-2 md:col-span-3 rounded-sm overflow-hidden bg-brand-dark text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-brand-border my-2">
                          <div className="space-y-1.5 max-w-md">
                            <span className="text-[10px] font-bold tracking-widest text-brand-yellow uppercase">
                              The WoodCraft Standard
                            </span>
                            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                              Generational Hardwood Joinery
                            </h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                              Each piece is crafted from handpicked logs seasoned in automated kilns to keep moisture below 8%. No warping, no wobbles, lifetime value.
                            </p>
                          </div>
                          <div className="flex items-center gap-6 shrink-0 text-center text-xs">
                            <div>
                              <ShieldCheck className="w-6 h-6 text-brand-yellow mx-auto mb-1" />
                              <span className="font-bold block text-white">10-Year Warranty</span>
                            </div>
                            <div>
                              <Truck className="w-6 h-6 text-brand-yellow mx-auto mb-1" />
                              <span className="font-bold block text-white">Free Delivery</span>
                            </div>
                            <div>
                              <Wrench className="w-6 h-6 text-brand-yellow mx-auto mb-1" />
                              <span className="font-bold block text-white">Free Assembly</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < sortedProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 9)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-[#252525] hover:bg-[#252525] hover:text-white text-[#252525] text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-sm shadow-sm"
                    >
                      Load More Designs ({sortedProducts.length - visibleCount} Remaining)
                    </button>
                    <p className="text-[11px] text-[#777777] mt-2">
                      Showing {displayedProducts.length} of {sortedProducts.length} handcrafted products
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="py-20 text-center bg-[#F8F7F4] rounded-sm border border-[#EAE7E1] p-8">
                <div className="text-5xl mb-4">🛋️</div>
                <h3 className="text-lg font-serif font-bold text-[#252525]">No Matching Furniture Found</h3>
                <p className="text-xs sm:text-sm text-[#777777] max-w-md mx-auto mt-2">
                  We couldn't find any products matching your specific combination of filters. Try widening your price range or clearing material filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-[#252525] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileFilterOpen(false)} 
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E1] mb-6">
              <h3 className="font-bold text-base text-[#252525]">Filter Products</h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-[#252525]" />
              </button>
            </div>

            {/* Mobile Filter Controls */}
            <div className="space-y-6 flex-1">
              
              <div>
                <label htmlFor="mobile-price-range-slider" className="text-xs font-bold uppercase tracking-wider text-[#252525] block mb-2">
                  Max Price: ₹{maxPrice.toLocaleString('en-IN')}
                </label>
                <input
                  id="mobile-price-range-slider"
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#F4C542]"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-2">
                  Discount
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[20, 30, 40, 50].map((d) => (
                    <button
                      key={d}
                      onClick={() => setMinDiscount(minDiscount === d ? 0 : d)}
                      className={`text-xs py-2 px-3 border rounded-sm font-semibold ${
                        minDiscount === d 
                          ? 'bg-[#FFD84D] border-[#F4C542] text-[#252525]' 
                          : 'bg-white border-[#EAE7E1] text-[#777777]'
                      }`}
                    >
                      {d}%+ Off
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-2">
                  Hardwood
                </h4>
                <div className="space-y-2">
                  {availableMaterials.slice(0, 6).map((mat) => (
                    <label key={mat} className="flex items-center gap-2 text-xs text-[#252525]">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="rounded accent-[#F4C542]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Actions */}
            <div className="pt-6 border-t border-[#EAE7E1] flex gap-3 mt-6">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 text-xs font-bold border border-[#EAE7E1] text-[#777777] rounded-sm"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold bg-[#252525] text-white rounded-sm"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryPage;
