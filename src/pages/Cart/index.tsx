import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowRight, ShieldCheck, 
  Truck, Tag, Check, ShoppingBag, ArrowLeft 
} from 'lucide-react';
import { useCartStore } from '../../store';
import { formatPrice } from '../../lib/utils';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const validCoupons: Record<string, number> = {
    WOOD10: 10,
    FURNITURE10: 10,
    WELCOME2000: 15,
    FESTIVE25: 25,
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputCoupon.trim().toUpperCase();
    if (validCoupons[code]) {
      applyCoupon(code, validCoupons[code]);
      setCouponSuccess(`Coupon ${code} applied successfully! ${validCoupons[code]}% Discount added.`);
      setCouponError('');
      setInputCoupon('');
    } else {
      setCouponError('Invalid coupon code. Try WOOD10 or WELCOME2000');
      setCouponSuccess('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F8F7F4] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-sm border border-[#EAE7E1] text-center max-w-md w-full shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FFF9E6] border border-[#F4C542]/40 flex items-center justify-center mx-auto mb-6 text-[#252525]">
            <ShoppingBag className="w-10 h-10 text-[#F4C542]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#252525]">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-2 mb-8 leading-relaxed">
            Looks like you haven't added any handcrafted furniture to your cart yet. Explore our bestselling solid wood designs!
          </p>
          <Link
            to="/category/all"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md"
          >
            Start Shopping Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EAE7E1] mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252525]">
              Shopping Cart
            </h1>
            <p className="text-xs text-[#777777] mt-1">
              You have {items.reduce((s, i) => s + i.quantity, 0)} items in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-red-600 font-bold hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ITEMS LIST (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const mainImg = item.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80';
              return (
                <div
                  key={item.product_id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border border-[#EAE7E1] rounded-sm bg-white hover:border-[#F4C542]/60 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={mainImg}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-sm border border-[#EAE7E1] shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B87333]">
                        {item.product.category_name}
                      </span>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-sm sm:text-base font-bold text-[#252525] hover:text-[#B87333] transition-colors block leading-tight mt-0.5"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#777777] mt-1">
                        Hardwood: {item.product.material}
                      </p>
                      <div className="text-sm font-bold text-[#252525] mt-1 sm:hidden">
                        {formatPrice(item.unit_price * item.quantity)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#EAE7E1] rounded-sm bg-[#F8F7F4]">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#252525]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price Total */}
                    <div className="text-right hidden sm:block">
                      <div className="text-base font-bold text-[#252525]">
                        {formatPrice(item.unit_price * item.quantity)}
                      </div>
                      <div className="text-[11px] text-[#777777]">
                        {formatPrice(item.unit_price)} each
                      </div>
                    </div>

                    {/* Delete Action */}
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Back to Shopping Link */}
            <div className="pt-4">
              <Link
                to="/category/all"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#252525] hover:text-[#B87333] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Continue Exploring Furniture
              </Link>
            </div>
          </div>

          {/* ORDER SUMMARY (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#F8F7F4] border border-[#EAE7E1] rounded-sm p-6 space-y-6 sticky top-28">
              
              <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
                Order Summary
              </h3>

              {/* Promo Coupon Form */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#252525] block mb-2">
                  Apply Coupon Code
                </label>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded-sm text-xs text-emerald-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      {couponCode} Applied!
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. WOOD10"
                      className="bg-white border border-[#EAE7E1] text-xs px-3 py-2 rounded-sm w-full uppercase focus:outline-none focus:border-[#F4C542]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#252525] text-white text-xs font-bold uppercase rounded-sm hover:bg-black transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {couponSuccess}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-medium mt-1.5">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Cost Calculation Rows */}
              <div className="space-y-3 text-xs text-[#252525] border-t border-[#EAE7E1] pt-4">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal())}</span>
                </div>

                {discount() > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount())}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#777777]">Standard Shipping</span>
                  <span className="font-semibold">
                    {shipping() === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatPrice(shipping())
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#777777]">Estimated GST (18%)</span>
                  <span className="font-semibold">{formatPrice(tax())}</span>
                </div>

                <div className="border-t border-[#EAE7E1] pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#252525]">Grand Total</span>
                  <span className="text-xl font-bold text-[#252525]">{formatPrice(total())}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Guarantees */}
              <div className="space-y-2 pt-2 border-t border-[#EAE7E1] text-[11px] text-[#777777]">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#F4C542]" />
                  <span>Free doorstep delivery & assembly on all orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F4C542]" />
                  <span>100% genuine solid sheesham & teak certification</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
