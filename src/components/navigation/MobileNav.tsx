// ============================================================
// WoodCraft India – MobileNav
// Slide-in mobile navigation with accordion categories
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, User, Heart, Phone, Home, ChevronRight } from 'lucide-react';
import { categories } from '../../data/products';
import { useUIStore } from '../../store/index';

const MobileNav: React.FC = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const location = useLocation();

  // Close nav on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const toggleCategory = useCallback((id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const close = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen]);

  const SIMPLE_LINKS = [
    { label: 'New Arrivals', href: '/category/all?sort=newest' },
    { label: 'Best Sellers', href: '/category/all?sort=bestseller' },
    { label: 'Offers',       href: '/offers',       accent: true },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-brand-border bg-brand-bg">
          <span className="text-base font-bold text-brand-dark" style={{ fontFamily: "'Playfair Display', serif" }}>
            Browse Categories
          </span>
          <button
            onClick={close}
            className="p-1.5 rounded-sm hover:bg-brand-border transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-brand-dark" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <nav>
            <ul>
              {/* Dynamic categories with accordion */}
              {categories.map((cat) => {
                const hasSubs = (cat.subcategories?.length ?? 0) > 0;
                const isExpanded = expandedCats.has(cat.id);

                return (
                  <li key={cat.id} className="border-b border-brand-border/50">
                    <div className="flex items-center">
                      <Link
                        to={`/category/${cat.slug}`}
                        className="flex-1 flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-brand-dark hover:bg-brand-bg transition-colors"
                        onClick={close}
                      >
                        <img
                          src={cat.image_url}
                          alt=""
                          aria-hidden="true"
                          className="w-8 h-8 rounded-sm object-cover flex-shrink-0"
                        />
                        {cat.name}
                      </Link>
                      {hasSubs && (
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className="px-3 py-3.5 text-brand-muted hover:text-brand-dark hover:bg-brand-bg transition-colors"
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${cat.name}`}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Subcategories */}
                    {hasSubs && isExpanded && (
                      <ul className="bg-brand-bg border-t border-brand-border/50">
                        {cat.subcategories!.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              to={`/category/${sub.slug}`}
                              className="flex items-center gap-2 pl-16 pr-4 py-2.5 text-sm text-brand-muted hover:text-brand-dark hover:bg-white transition-colors"
                              onClick={close}
                            >
                              <ChevronRight size={12} className="text-brand-yellow flex-shrink-0" />
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            to={`/category/${cat.slug}`}
                            className="flex items-center gap-2 pl-16 pr-4 py-2.5 text-sm font-semibold text-brand-dark hover:bg-white transition-colors border-t border-brand-border/30"
                            onClick={close}
                          >
                            <ChevronRight size={12} className="text-brand-yellow flex-shrink-0" />
                            Shop All {cat.name}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}

              {/* Simple links */}
              {SIMPLE_LINKS.map((link) => (
                <li key={link.href} className="border-b border-brand-border/50">
                  <Link
                    to={link.href}
                    className={`flex items-center px-4 py-3.5 text-sm font-medium transition-colors hover:bg-brand-bg ${
                      link.accent ? 'text-red-600 font-semibold' : 'text-brand-dark'
                    }`}
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="border-t border-brand-border bg-brand-bg">
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-dark hover:bg-white transition-colors"
                onClick={close}
              >
                <Home size={18} className="text-brand-muted" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-dark hover:bg-white transition-colors"
                onClick={close}
              >
                <User size={18} className="text-brand-muted" />
                My Account
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-dark hover:bg-white transition-colors"
                onClick={close}
              >
                <Heart size={18} className="text-brand-muted" />
                Wishlist
              </Link>
            </li>
            <li>
              <a
                href="tel:18001234567"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-brand-dark hover:bg-white transition-colors"
              >
                <Phone size={18} className="text-brand-muted" />
                1800-123-4567
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MobileNav;
