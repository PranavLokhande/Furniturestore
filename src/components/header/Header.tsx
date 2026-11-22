// ============================================================
// WoodCraft India – Header (Main)
// Sticky header: AnnouncementBar + Logo+Search+Icons + MegaMenu
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HeaderIcons from './HeaderIcons';
import MegaMenu from '../navigation/MegaMenu';
import MobileNav from '../navigation/MobileNav';
import { useUIStore } from '../../store/index';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setMobileMenuOpen } = useUIStore();

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMobileNav = useCallback(() => setMobileMenuOpen(true), [setMobileMenuOpen]);

  return (
    <>
      {/* 1. Announcement Bar (scrolls naturally with page) */}
      <AnnouncementBar />

      {/* Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        {/* 2. Main bar: Logo + Search + Icons */}
        <div className="border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center gap-2 sm:gap-4">
            {/* Hamburger – mobile only */}
            <button
              onClick={openMobileNav}
              className="lg:hidden p-1.5 -ml-1 rounded-sm hover:bg-brand-bg transition-colors flex-shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu size={22} className="text-brand-dark" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>

            {/* Search bar – grows to fill space (Desktop) */}
            <div className="flex-1 hidden sm:flex max-w-xl mx-auto">
              <div className="w-full">
                <SearchBar />
              </div>
            </div>

            {/* Icons */}
            <div className="flex-shrink-0 ml-auto lg:ml-0">
              <HeaderIcons />
            </div>
          </div>

          {/* Search bar on mobile – full width below main bar */}
          <div className="sm:hidden px-3 pb-2.5 pt-0.5 bg-white">
            <SearchBar />
          </div>
        </div>

        {/* 3. MegaMenu – desktop only (hidden on mobile via CSS) */}
        <MegaMenu />
      </header>

      {/* Mobile Nav drawer */}
      <MobileNav />
    </>
  );
};

export default Header;
