// ============================================================
// WoodCraft India – MegaMenu
// Full desktop & tablet mega-menu navigation component with visual thumbnails
// ============================================================
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { categories, products } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import type { Category, Product } from '../../types';

// ---- Nav items config ----
interface NavItem {
  label: string;
  href?: string;
  categorySlug?: string;
  simple?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Living Room',       categorySlug: 'living-room'       },
  { label: 'Bedroom',           categorySlug: 'bedroom'           },
  { label: 'Dining Room',       categorySlug: 'dining-room'       },
  { label: 'Office Furniture',  categorySlug: 'office-furniture'  },
  { label: 'Storage',           categorySlug: 'storage'           },
  { label: 'Outdoor Furniture', categorySlug: 'outdoor-furniture' },
  { label: 'Home Decor',        categorySlug: 'home-decor'        },
  { label: 'New Arrivals',      href: '/category/all?sort=newest',      simple: true },
  { label: 'Best Sellers',      href: '/category/all?sort=bestseller',  simple: true },
  { label: 'Offers',            href: '/offers',                        simple: true },
];

// ---- Mega Menu panel ----
interface MegaMenuPanelProps {
  category: Category;
  onClose: () => void;
}

const MegaMenuPanel: React.FC<MegaMenuPanelProps> = React.memo(({ category, onClose }) => {
  // Find product matching this category
  const featuredProduct: Product =
    products.find(
      (p) =>
        (p.category_id === category.id ||
          p.category_name.toLowerCase() === category.name.toLowerCase() ||
          p.slug.includes(category.slug)) &&
        p.is_published
    ) ?? products[0];

  const subcategories = category.subcategories ?? [];

  // Split subcategories evenly across two columns
  const half = Math.ceil(subcategories.length / 2);
  const col1 = subcategories.slice(0, half);
  const col2 = subcategories.slice(half);

  return (
    <div className="w-full bg-white border-t border-brand-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-7 items-start">
          
          {/* Col 1: Category visual card + Shop All (3 cols) */}
          <div className="col-span-3 flex flex-col justify-between h-full border-r border-brand-border/60 pr-5">
            <div>
              <div className="relative overflow-hidden rounded-sm aspect-[16/10] mb-3 group bg-brand-bg border border-brand-border shadow-xs">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="text-white text-xs font-bold tracking-wide block drop-shadow-sm">
                    {category.name}
                  </span>
                  <span className="text-[10px] text-brand-yellow font-medium">
                    100% Solid Kiln-Dried Wood
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-brand-muted mb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                  <span>Free doorstep assembly & unboxing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                  <span>10-Year anti-termite hardwood guarantee</span>
                </div>
              </div>
            </div>

            <Link
              to={`/category/${category.slug}`}
              onClick={onClose}
              className="btn-primary w-full text-xs py-2.5 justify-center mt-auto shadow-sm"
            >
              Shop All {category.name}
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Col 2: Subcategories with Visual Thumbnails (3 cols) */}
          <div className="col-span-3">
            <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-3 pb-2 border-b border-brand-border flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
              Popular Categories
            </h4>
            <ul className="space-y-1.5">
              {col1.map((sub) => (
                <li key={sub.id}>
                  <Link
                    to={`/category/${sub.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 p-1 rounded-sm hover:bg-brand-bg transition-colors group"
                  >
                    <img
                      src={sub.image_url}
                      alt={sub.name}
                      className="w-10 h-10 object-cover rounded-xs border border-brand-border group-hover:border-brand-yellow transition-colors shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-brand-dark block group-hover:text-amber-800 transition-colors truncate">
                        {sub.name}
                      </span>
                      <span className="text-[10px] text-brand-muted block truncate">
                        {sub.description || 'Handcrafted designs'}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              {col1.length === 0 && (
                <li className="text-xs text-brand-muted italic py-1">
                  Viewing full {category.name} collection
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Subcategories Column 2 with Visual Thumbnails (3 cols) */}
          <div className="col-span-3 border-r border-brand-border/60 pr-5">
            <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-3 pb-2 border-b border-brand-border flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
              {col2.length > 0 ? 'More Collections' : 'Hardwood Finishes'}
            </h4>
            <ul className="space-y-1.5">
              {col2.length > 0 ? (
                col2.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      to={`/category/${sub.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 p-1 rounded-sm hover:bg-brand-bg transition-colors group"
                    >
                      <img
                        src={sub.image_url}
                        alt={sub.name}
                        className="w-10 h-10 object-cover rounded-xs border border-brand-border group-hover:border-brand-yellow transition-colors shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-brand-dark block group-hover:text-amber-800 transition-colors truncate">
                          {sub.name}
                        </span>
                        <span className="text-[10px] text-brand-muted block truncate">
                          {sub.description || 'Artisan made'}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      to={`/category/${category.slug}?material=Sheesham`}
                      onClick={onClose}
                      className="flex items-center justify-between text-xs text-brand-dark/80 hover:text-brand-dark hover:font-semibold py-1.5 transition-all group"
                    >
                      <span>Solid Sheesham Wood</span>
                      <span className="text-[10px] text-brand-yellow font-bold">Bestseller</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/category/${category.slug}?material=Teak`}
                      onClick={onClose}
                      className="flex items-center justify-between text-xs text-brand-dark/80 hover:text-brand-dark hover:font-semibold py-1.5 transition-all group"
                    >
                      <span>CP Teak Wood Collection</span>
                      <span className="text-[10px] text-brand-muted">Premium</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Quick collection link */}
              <li className="pt-2 border-t border-brand-border/40 mt-1">
                <Link
                  to={`/category/${category.slug}?sort=bestseller`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 hover:text-amber-900"
                >
                  <Sparkles size={11} className="text-brand-yellow fill-brand-yellow" />
                  Top Rated in {category.name}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured product card (3 cols) */}
          <div className="col-span-3">
            <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-3 pb-2 border-b border-brand-border flex items-center justify-between">
              <span>Featured Design</span>
              <span className="text-[10px] font-bold text-brand-yellow bg-brand-dark px-2 py-0.5 rounded-xs">
                HANDPICKED
              </span>
            </h4>

            {featuredProduct && (
              <Link
                to={`/product/${featuredProduct.slug}`}
                onClick={onClose}
                className="block group border border-brand-border rounded-sm overflow-hidden bg-white hover:border-brand-yellow/80 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-brand-bg">
                  <img
                    src={featuredProduct.images[0]?.url ?? ''}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {featuredProduct.discount_percentage > 0 && (
                    <span className="discount-badge absolute top-2 left-2 text-[10px] shadow-sm">
                      {featuredProduct.discount_percentage}% OFF
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-brand-dark line-clamp-1 group-hover:text-amber-800 transition-colors">
                    {featuredProduct.name}
                  </p>
                  <p className="text-[11px] text-brand-muted mt-0.5 truncate">
                    {featuredProduct.material}
                  </p>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-brand-border/40">
                    <span className="text-xs font-bold text-brand-dark">
                      {formatPrice(featuredProduct.price)}
                    </span>
                    {featuredProduct.original_price > featuredProduct.price && (
                      <span className="text-[10px] text-brand-muted line-through">
                        {formatPrice(featuredProduct.original_price)}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-emerald-700 ml-auto">
                      Save {featuredProduct.discount_percentage}%
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
});

MegaMenuPanel.displayName = 'MegaMenuPanel';

// ---- Main MegaMenu Component ----
export const MegaMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveItem(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 200);
  }, []);

  const handlePanelMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleClose = useCallback(() => {
    setActiveItem(null);
  }, []);

  const handleItemClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      if (item.simple) {
        handleClose();
        return;
      }

      if (activeItem === item.label) {
        handleClose();
      } else {
        e.preventDefault();
        setActiveItem(item.label);
      }
    },
    [activeItem, handleClose]
  );

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveItem(null);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeNavItem = NAV_ITEMS.find((item) => item.label === activeItem);
  const activeCategory = activeNavItem?.categorySlug
    ? categories.find((c) => c.slug === activeNavItem.categorySlug)
    : null;

  return (
    <nav
      ref={navRef}
      className="hidden lg:block relative bg-white border-b border-brand-border z-30"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-between gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const category = categories.find((c) => c.slug === item.categorySlug);
            const hasMenu = !item.simple && !!category;
            const isActive = activeItem === item.label;

            return (
              <li
                key={item.label}
                onMouseEnter={() => !item.simple && handleMouseEnter(item.label)}
                className="static"
              >
                <Link
                  to={item.href ?? `/category/${item.categorySlug}`}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`flex items-center gap-1 px-2 xl:px-3 py-3 text-xs xl:text-[13px] font-medium transition-colors duration-150 whitespace-nowrap border-b-2 ${
                    isActive
                      ? 'text-brand-dark border-brand-yellow font-semibold'
                      : 'text-brand-dark/85 border-transparent hover:text-brand-dark hover:border-brand-yellow'
                  } ${
                    item.label === 'Offers'
                      ? 'text-red-600 font-bold hover:text-red-700'
                      : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {hasMenu && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 text-brand-muted ${
                        isActive ? 'rotate-180 text-brand-dark' : ''
                      }`}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* FULL-WIDTH MEGA MENU DROPDOWN PANEL */}
      {activeCategory && (
        <div
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full left-0 right-0 w-full z-50 animate-fade-in"
          style={{ animation: 'megaMenuFadeIn 0.16s ease-out forwards' }}
        >
          {/* Invisible hover bridge to prevent subpixel cursor gap */}
          <div className="absolute -top-1 left-0 right-0 h-1.5 w-full pointer-events-auto" />
          <MegaMenuPanel category={activeCategory} onClose={handleClose} />
        </div>
      )}

      {/* Animation Keyframe */}
      <style>{`
        @keyframes megaMenuFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default MegaMenu;
