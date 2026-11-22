import React, { useState } from 'react';
import { Mail, CheckCircle2, MessageCircle, Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-[#252525] text-white py-14 border-b border-[#383838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Newsletter Box */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F4C542] text-[#252525] text-xs font-bold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              Special Perks
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Get ₹2,000 Off Your First Order
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-md">
              Subscribe to unlock secret preview sales, bespoke wood maintenance tips, and exclusive coupon codes.
            </p>

            {subscribed ? (
              <div className="mt-5 p-4 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! Your voucher code <strong>WELCOME2000</strong> has been activated for your cart.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-[#1A1A1A] border border-[#444] rounded-sm pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C542] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold px-6 py-3 rounded-sm text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-md"
                >
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-xs text-gray-500 mt-2">No spam. Unsubscribe anytime in 1 click.</p>
          </div>

          {/* WhatsApp Support Box */}
          <div className="lg:border-l lg:border-[#383838] lg:pl-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#1f1f1f] lg:bg-transparent p-6 lg:p-0 rounded-sm">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <MessageCircle className="w-4 h-4" />
                Personal Furniture Consultant
              </div>
              <h4 className="text-xl font-bold">Need Help Deciding or Customizing?</h4>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-sm">
                Speak directly with our wooden furniture experts on WhatsApp. Mon–Sat (9 AM – 9 PM IST).
              </p>
            </div>

            <a
              href="https://wa.me/919876543210?text=Hello%20WoodCraft%20India%2C%20I%20would%20like%20to%20know%20more%20about%20your%20furniture."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-sm text-sm font-bold tracking-wide transition-transform active:scale-95 shrink-0 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
