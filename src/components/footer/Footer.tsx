import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, 
  ShieldCheck, Truck, RotateCcw, Wrench 
} from 'lucide-react';
import { Logo } from '../header/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1C1C] text-gray-300 text-sm">
      
      {/* Value Proposition Highlights Bar */}
      <div className="border-b border-[#2D2D2D] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
              <div className="w-12 h-12 rounded bg-[#2A2A2A] flex items-center justify-center shrink-0 text-[#F4C542]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Free Safe Delivery</h5>
                <p className="text-xs text-gray-400 mt-0.5">Across 350+ Indian cities above ₹10,000</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
              <div className="w-12 h-12 rounded bg-[#2A2A2A] flex items-center justify-center shrink-0 text-[#F4C542]">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Free Carpentry Assembly</h5>
                <p className="text-xs text-gray-400 mt-0.5">Professional unboxing & installation</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
              <div className="w-12 h-12 rounded bg-[#2A2A2A] flex items-center justify-center shrink-0 text-[#F4C542]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Up to 10 Years Warranty</h5>
                <p className="text-xs text-gray-400 mt-0.5">100% genuine seasoned solid wood</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
              <div className="w-12 h-12 rounded bg-[#2A2A2A] flex items-center justify-center shrink-0 text-[#F4C542]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Hassle-Free Returns</h5>
                <p className="text-xs text-gray-400 mt-0.5">7-day transit damage replacement</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="inline-block bg-white p-2 rounded-sm mb-4">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              WoodCraft India is an authentic Indian furniture brand committed to reviving generational solid wood craftsmanship. Every single piece is handmade from seasoned sheesham, mango, and teak wood.
            </p>

            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#F4C542] shrink-0" />
                <span>WoodCraft Tower, Furniture Craft Zone, Andheri East, Mumbai 400069</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F4C542] shrink-0" />
                <span>Toll Free: 1800-123-4567 | +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F4C542] shrink-0" />
                <span>care@woodcraftindia.com | sales@woodcraftindia.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#F4C542] shrink-0" />
                <span>Customer Care: 9:00 AM – 8:00 PM (Monday – Saturday)</span>
              </div>
            </div>

            {/* Social Icons with SVGs */}
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-[#2D2D2D] hover:bg-[#F4C542] hover:text-[#252525] flex items-center justify-center transition-colors font-bold text-xs">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-[#2D2D2D] hover:bg-[#F4C542] hover:text-[#252525] flex items-center justify-center transition-colors font-bold text-xs">
                FB
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-[#2D2D2D] hover:bg-[#F4C542] hover:text-[#252525] flex items-center justify-center transition-colors font-bold text-xs">
                YT
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded bg-[#2D2D2D] hover:bg-[#F4C542] hover:text-[#252525] flex items-center justify-center transition-colors font-bold text-xs">
                X
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-[#333] pb-2">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/category/sofas" className="hover:text-[#F4C542] transition-colors">Wooden Sofas</Link></li>
              <li><Link to="/category/beds" className="hover:text-[#F4C542] transition-colors">Solid Wood King Beds</Link></li>
              <li><Link to="/category/dining-room" className="hover:text-[#F4C542] transition-colors">6-Seater Dining Sets</Link></li>
              <li><Link to="/category/coffee-tables" className="hover:text-[#F4C542] transition-colors">Marble & Wood Coffee Tables</Link></li>
              <li><Link to="/category/wardrobes" className="hover:text-[#F4C542] transition-colors">Sheesham Wardrobes</Link></li>
              <li><Link to="/category/tv-units" className="hover:text-[#F4C542] transition-colors">Designer TV Units</Link></li>
              <li><Link to="/category/study-tables" className="hover:text-[#F4C542] transition-colors">Ergonomic Study Desks</Link></li>
              <li><Link to="/category/shoe-racks" className="hover:text-[#F4C542] transition-colors">Solid Wood Shoe Racks</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-[#333] pb-2">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/account" className="hover:text-[#F4C542] transition-colors">Track Your Order</Link></li>
              <li><Link to="/account" className="hover:text-[#F4C542] transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/room-planner" className="hover:text-[#F4C542] transition-colors">3D Room Planner Tool</Link></li>
              <li><Link to="/offers" className="hover:text-[#F4C542] transition-colors">Exclusive Coupons & Deals</Link></li>
              <li><Link to="/account" className="hover:text-[#F4C542] transition-colors">Wood Maintenance Guide</Link></li>
              <li><Link to="/admin" className="hover:text-[#F4C542] transition-colors text-amber-400 font-semibold">Merchant Admin Portal</Link></li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-[#333] pb-2">
              Corporate & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#F4C542] transition-colors">About WoodCraft India</Link></li>
              <li><Link to="/" className="hover:text-[#F4C542] transition-colors">Artisan Collaboration Policy</Link></li>
              <li><Link to="/" className="hover:text-[#F4C542] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-[#F4C542] transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-[#F4C542] transition-colors">GST Compliance & Invoicing</Link></li>
              <li><Link to="/" className="hover:text-[#F4C542] transition-colors">Wholesale & Bulk Inquiries</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Security & Copyright */}
      <div className="bg-[#141414] border-t border-[#2A2A2A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} WoodCraft India Pvt. Ltd. Inspired by Indian Craftsmanship. All Rights Reserved.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400 uppercase font-semibold">100% Secure Payments:</span>
            <div className="flex items-center gap-1.5 font-bold text-[10px] tracking-wide text-gray-300">
              <span className="px-1.5 py-0.5 bg-[#252525] border border-[#3E3E3E] rounded">UPI</span>
              <span className="px-1.5 py-0.5 bg-[#252525] border border-[#3E3E3E] rounded">RAZORPAY</span>
              <span className="px-1.5 py-0.5 bg-[#252525] border border-[#3E3E3E] rounded">VISA</span>
              <span className="px-1.5 py-0.5 bg-[#252525] border border-[#3E3E3E] rounded">MASTERCARD</span>
              <span className="px-1.5 py-0.5 bg-[#252525] border border-[#3E3E3E] rounded">NETBANKING</span>
              <span className="px-1.5 py-0.5 bg-[#252525] border border-[#3E3E3E] rounded text-emerald-400">COD</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
