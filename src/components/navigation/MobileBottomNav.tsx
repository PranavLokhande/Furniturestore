// ============================================================
// WoodCraft India – MobileBottomNav
// WoodenStreet-inspired sticky bottom bar for mobile devices
// Provides instant one-thumb navigation (Home, Categories, Wishlist, Cart, Account)
// ============================================================
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '../../store/index';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const cartCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.count());
  const { setMobileMenuOpen } = useUIStore();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-brand-border/80 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] h-14 px-2"
    >
      <div className="grid grid-cols-5 h-full items-center">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isCurrent('/') ? 'text-brand-dark font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <Home className={`w-5 h-5 ${isCurrent('/') ? 'text-brand-yellow stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </Link>

        {/* 2. Categories Drawer Trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-brand-muted hover:text-brand-dark transition-colors"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Categories</span>
        </button>

        {/* 3. Wishlist */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            isCurrent('/wishlist') ? 'text-brand-dark font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isCurrent('/wishlist') ? 'text-red-500 fill-red-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-yellow text-brand-dark text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Wishlist</span>
        </Link>

        {/* 4. Cart */}
        <Link
          to="/cart"
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            isCurrent('/cart') ? 'text-brand-dark font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <div className="relative">
            <ShoppingBag className={`w-5 h-5 ${isCurrent('/cart') ? 'text-brand-yellow stroke-[2.5]' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-yellow text-brand-dark text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Cart</span>
        </Link>

        {/* 5. Account */}
        <Link
          to="/account"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isCurrent('/account') ? 'text-brand-dark font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <User className={`w-5 h-5 ${isCurrent('/account') ? 'text-brand-yellow stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
