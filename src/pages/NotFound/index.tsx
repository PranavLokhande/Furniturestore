import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, ShoppingBag, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] bg-[#F8F7F4] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center bg-white border border-[#EAE7E1] p-8 sm:p-12 rounded-sm shadow-sm">
        
        <div className="text-8xl sm:text-9xl font-serif font-black text-[#F4C542] leading-none mb-4 select-none">
          404
        </div>

        <h1 className="text-2xl font-serif font-bold text-[#252525] mb-2">
          Furniture Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-8">
          The page or product you're looking for might have been moved, renamed, or is currently undergoing timber polishing.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 py-3 px-4 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <HomeIcon className="w-4 h-4" /> Go to Home
          </Link>

          <Link
            to="/category/all"
            className="flex-1 py-3 px-4 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Browse Catalog
          </Link>
        </div>

        {/* Suggested Categories */}
        <div className="mt-8 pt-6 border-t border-[#EAE7E1]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] block mb-3">
            Popular Collections
          </span>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Link to="/category/sofas" className="px-3 py-1 bg-[#F8F7F4] rounded border border-[#EAE7E1] hover:border-[#F4C542]">
              Sofas
            </Link>
            <Link to="/category/beds" className="px-3 py-1 bg-[#F8F7F4] rounded border border-[#EAE7E1] hover:border-[#F4C542]">
              King Beds
            </Link>
            <Link to="/category/dining-room" className="px-3 py-1 bg-[#F8F7F4] rounded border border-[#EAE7E1] hover:border-[#F4C542]">
              Dining Sets
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
