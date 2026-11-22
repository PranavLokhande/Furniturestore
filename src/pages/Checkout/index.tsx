import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, Truck, CreditCard, 
  ArrowRight, Lock, MapPin, Check, Home as HomeIcon 
} from 'lucide-react';
import { useCartStore } from '../../store';
import { formatPrice } from '../../lib/utils';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, subtotal, discount, shipping, tax, clearCart } = useCartStore();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay' | 'upi'>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 
    'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address1 || !formData.pincode) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }

    if (formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (formData.pincode.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit postal pincode.');
      return;
    }

    // Generate random order ID
    const generatedId = `WC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
  };

  // SUCCESS STATE
  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] bg-[#F8F7F4] py-16 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border border-[#EAE7E1] rounded-sm p-8 sm:p-12 text-center shadow-lg">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded">
            Order Confirmed & Scheduled
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252525] mt-3">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-[#777777] mt-2">
            Your booking reference is <strong className="text-[#252525]">{orderId}</strong>. We've sent full confirmation details and delivery timeline to <strong>{formData.email}</strong>.
          </p>

          <div className="my-6 p-4 rounded-sm bg-[#F8F7F4] border border-[#EAE7E1] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#777777]">Recipient:</span>
              <span className="font-bold text-[#252525]">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Destination:</span>
              <span className="font-medium text-[#252525]">{formData.city}, {formData.state} - {formData.pincode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Payment Option:</span>
              <span className="font-bold text-[#252525] uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Carpentry Assembly:</span>
              <span className="font-bold text-emerald-600">Free On-Site Service</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/account"
              className="flex-1 py-3.5 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm text-center"
            >
              Track in Account
            </Link>
            <Link
              to="/"
              className="flex-1 py-3.5 bg-white border border-[#252525] text-[#252525] text-xs font-bold uppercase tracking-wider rounded-sm text-center hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART REDIRECT
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Your cart is empty.</h2>
        <Link to="/" className="text-sm text-amber-600 underline mt-2 block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-[#EAE7E1] mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252525]">
              Secure Checkout
            </h1>
            <p className="text-xs text-[#777777] mt-1">
              Complete your delivery address and choose payment preference.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT: SHIPPING DETAILS & PAYMENT FORM (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Customer Info */}
              <div className="border border-[#EAE7E1] p-6 rounded-sm bg-white">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#252525] flex items-center gap-2 mb-4 pb-3 border-b border-[#EAE7E1]">
                  <MapPin className="w-4 h-4 text-[#F4C542]" />
                  1. Delivery Address & Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-[#252525] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      required
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#252525] block mb-1">Phone Number (10 digits) *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      required
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-[#252525] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ramesh@example.com"
                      required
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-[#252525] block mb-1">Flat / House No. / Building / Street *</label>
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      placeholder="House / Flat / Floor / Landmark"
                      required
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#252525] block mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Bengaluru"
                      required
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#252525] block mb-1">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none bg-white"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#252525] block mb-1">Pincode (6 digits) *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 560001"
                      maxLength={6}
                      required
                      className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:border-[#F4C542] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Speed */}
              <div className="border border-[#EAE7E1] p-6 rounded-sm bg-white">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#252525] flex items-center gap-2 mb-4 pb-3 border-b border-[#EAE7E1]">
                  <Truck className="w-4 h-4 text-[#F4C542]" />
                  2. Delivery & Assembly Speed
                </h3>

                <div className="space-y-3 text-xs">
                  <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                    deliveryMethod === 'standard' ? 'border-[#252525] bg-[#F8F7F4]' : 'border-[#EAE7E1]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="accent-[#F4C542]"
                      />
                      <div>
                        <div className="font-bold text-[#252525]">Standard Furniture Logistics (4-7 Days)</div>
                        <div className="text-[11px] text-[#777777]">Free transit insurance + free installation</div>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600 uppercase">Free</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                    deliveryMethod === 'express' ? 'border-[#252525] bg-[#F8F7F4]' : 'border-[#EAE7E1]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="accent-[#F4C542]"
                      />
                      <div>
                        <div className="font-bold text-[#252525]">Express Priority Dispatch (2-3 Days)</div>
                        <div className="text-[11px] text-[#777777]">Dedicated cargo truck with priority assembly</div>
                      </div>
                    </div>
                    <span className="font-bold text-[#252525]">₹499</span>
                  </label>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="border border-[#EAE7E1] p-6 rounded-sm bg-white">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#252525] flex items-center gap-2 mb-4 pb-3 border-b border-[#EAE7E1]">
                  <CreditCard className="w-4 h-4 text-[#F4C542]" />
                  3. Select Payment Preference
                </h3>

                <div className="space-y-3 text-xs">
                  <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#252525] bg-[#F8F7F4]' : 'border-[#EAE7E1]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#F4C542]"
                      />
                      <div>
                        <div className="font-bold text-[#252525]">Cash on Delivery (Pay after Unboxing)</div>
                        <div className="text-[11px] text-[#777777]">Inspect your wooden furniture upon arrival, then pay cash or UPI</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Available
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                    paymentMethod === 'razorpay' ? 'border-[#252525] bg-[#F8F7F4]' : 'border-[#EAE7E1]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="accent-[#F4C542]"
                      />
                      <div>
                        <div className="font-bold text-[#252525]">Credit / Debit Card / NetBanking (Razorpay)</div>
                        <div className="text-[11px] text-[#777777]">Supports all Indian cards and No-Cost EMI options</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Fast & Secure
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'border-[#252525] bg-[#F8F7F4]' : 'border-[#EAE7E1]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#F4C542]"
                      />
                      <div>
                        <div className="font-bold text-[#252525]">Instant UPI (GPay / PhonePe / Paytm)</div>
                        <div className="text-[11px] text-[#777777]">Direct UPI payment via QR code or VPA</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Instant
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT: ORDER SUMMARY (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F8F7F4] border border-[#EAE7E1] rounded-sm p-6 sticky top-28 space-y-6">
                
                <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
                  Items In Your Order ({items.length})
                </h3>

                {/* Items small list */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((i) => (
                    <div key={i.product_id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={i.product.images?.[0]?.url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80'}
                          alt={i.product.name}
                          className="w-12 h-12 object-cover rounded-sm border border-[#EAE7E1]"
                        />
                        <div>
                          <div className="font-bold text-[#252525] truncate max-w-[180px]">{i.product.name}</div>
                          <div className="text-[#777777]">Qty: {i.quantity}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[#252525]">{formatPrice(i.unit_price * i.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Calculation */}
                <div className="border-t border-[#EAE7E1] pt-4 space-y-2.5 text-xs text-[#252525]">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Items Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal())}</span>
                  </div>

                  {discount() > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount</span>
                      <span>-{formatPrice(discount())}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-[#777777]">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryMethod === 'express' ? '₹499' : (shipping() === 0 ? 'FREE' : formatPrice(shipping()))}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#777777]">Applicable GST (18%)</span>
                    <span className="font-semibold">{formatPrice(tax())}</span>
                  </div>

                  <div className="border-t border-[#EAE7E1] pt-3 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#252525]">Final Payable</span>
                    <span className="text-xl font-bold text-[#252525]">
                      {formatPrice(total() + (deliveryMethod === 'express' ? 499 : 0))}
                    </span>
                  </div>
                </div>

                {/* Submit Order */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Confirm & Place Order
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-[#777777]">
                  By placing this order you agree to our 10-year solid wood warranty & 7-day transit policy.
                </p>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutPage;
