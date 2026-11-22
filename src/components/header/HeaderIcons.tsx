// ============================================================
// WoodCraft India – HeaderIcons
// Account, Wishlist, Cart icons with badges
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, ShoppingCart } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../../store/index';

interface IconButtonProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const IconButton: React.FC<IconButtonProps> = React.memo(({ to, label, icon, count }) => (
  <Link
    to={to}
    className="relative group flex flex-col items-center"
    aria-label={label}
  >
    <span className="p-2 rounded-sm hover:bg-brand-bg transition-colors duration-150 relative">
      {icon}
      {/* Badge */}
      {count !== undefined && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-brand-yellow text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </span>
    {/* Tooltip – desktop only */}
    <span className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-brand-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
      {label}
    </span>
  </Link>
));

IconButton.displayName = 'IconButton';

const HeaderIcons: React.FC = () => {
  const cartCount = useCartStore((state) => state.itemCount());
  const wishlistCount = useWishlistStore((state) => state.count());

  return (
    <div className="flex items-center gap-1">
      <IconButton
        to="/account"
        label="Login"
        icon={<User size={22} className="text-brand-dark" />}
      />
      <IconButton
        to="/wishlist"
        label="Wishlist"
        icon={<Heart size={22} className="text-brand-dark" />}
        count={wishlistCount}
      />
      <IconButton
        to="/cart"
        label="Cart"
        icon={<ShoppingCart size={22} className="text-brand-dark" />}
        count={cartCount}
      />
    </div>
  );
};

export default HeaderIcons;
