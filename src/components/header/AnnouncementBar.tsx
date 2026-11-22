// ============================================================
// WoodCraft India – AnnouncementBar
// Slim rotating announcements bar with yellow background
// ============================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const ANNOUNCEMENTS = [
  '🚚 Free Delivery on orders above ₹10,000 | Code: FREESHIP',
  '📞 Support: 1800-123-4567 | Mon–Sat 9AM–8PM',
  '🎁 Up to 50% OFF on Seasoned Sheesham Wood',
];

const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFade(true);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-yellow text-brand-dark text-xs font-medium w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-8 sm:h-9 flex items-center justify-between">
        {/* Spacer on left (desktop) */}
        <div className="hidden md:block w-28" />

        {/* Rotating announcement – centered */}
        <p
          className="flex-1 text-center truncate text-[11px] sm:text-xs font-semibold px-2 transition-opacity duration-300"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {ANNOUNCEMENTS[currentIndex]}
        </p>

        {/* Track Order – hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 w-28 justify-end text-xs">
          <Package size={13} />
          <Link
            to="/account"
            className="hover:underline underline-offset-2 font-semibold whitespace-nowrap"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
