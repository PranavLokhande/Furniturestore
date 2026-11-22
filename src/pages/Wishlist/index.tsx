import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../../store';
import ProductCard from '../../components/product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addItem(item.product, 1);
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F8F7F4] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#EAE7E1] text-center max-w-md w-full shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FFF9E6] border border-[#F4C542]/40 flex items-center justify-center mx-auto mb-6 text-[#252525]">
            <Heart className="w-10 h-10 text-[#F4C542]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#252525]">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-2 mb-8 leading-relaxed">
            Save designs you admire to your wishlist so you can revisit, compare wood finishes, or purchase when you're ready.
          </p>
          <Link
            to="/category/all"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md"
          >
            Browse Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#EAE7E1] mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252525]">
              My Wishlist
            </h1>
            <p className="text-xs text-[#777777] mt-1">
              You have {items.length} saved furniture pieces in your wishlist
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              Add All to Cart
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div key={item.product_id} className="relative group">
              <ProductCard product={item.product} />
              
              <button
                onClick={() => removeItem(item.product_id)}
                className="mt-2 w-full py-1.5 bg-[#F8F7F4] hover:bg-red-50 text-gray-500 hover:text-red-600 border border-[#EAE7E1] text-[11px] font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove from Saved
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WishlistPage;
