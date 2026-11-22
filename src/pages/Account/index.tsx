import React, { useState } from 'react';
import { 
  User, Package, MapPin, Heart, Settings, 
  LogOut, ShieldCheck, CheckCircle2, Truck, Clock, 
  ExternalLink, ChevronRight, Home as HomeIcon 
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  // Demo login state (persisted in local state)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'designs'>('orders');

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sample order history
  const sampleOrders = [
    {
      id: 'WC-842914',
      date: '18 Nov 2026',
      status: 'Delivered',
      items: [
        { name: 'Regal 3-Seater Solid Sheesham Sofa', qty: 1, price: 31500, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
        { name: 'Arc Marble Top Coffee Table', qty: 1, price: 10800, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&q=80' }
      ],
      total: 42300,
      trackingStatus: 'Delivered & Assembled by Carpenter Rajesh'
    },
    {
      id: 'WC-731902',
      date: '12 Nov 2026',
      status: 'In Transit',
      items: [
        { name: 'Royal King Bed with Storage', qty: 1, price: 43400, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200&q=80' }
      ],
      total: 43400,
      trackingStatus: 'Dispatched from Saharanpur Central Warehouse. Expected 24 Nov.'
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[75vh] bg-[#F8F7F4] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#EAE7E1] max-w-md w-full shadow-md">
          <div className="flex border-b border-[#EAE7E1] mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 ${
                authMode === 'login' ? 'border-[#252525] text-[#252525]' : 'border-transparent text-[#777777]'
              }`}
            >
              Customer Login
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 ${
                authMode === 'register' ? 'border-[#252525] text-[#252525]' : 'border-transparent text-[#777777]'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="font-bold text-[#252525] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:outline-none focus:border-[#F4C542]"
                />
              </div>
            )}

            <div>
              <label className="font-bold text-[#252525] block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:outline-none focus:border-[#F4C542]"
              />
            </div>

            <div>
              <label className="font-bold text-[#252525] block mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 border border-[#EAE7E1] rounded-sm focus:outline-none focus:border-[#F4C542]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
            >
              {authMode === 'login' ? 'Sign In' : 'Register Now'}
            </button>
          </form>

          <p className="text-[11px] text-[#777777] text-center mt-4">
            Protected by Supabase Auth with Row Level Security.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Bar */}
        <div className="bg-[#F8F7F4] border border-[#EAE7E1] p-6 rounded-sm mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FFD84D] text-[#252525] font-bold text-xl flex items-center justify-center">
              AD
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#252525]">
                Welcome Back, Aarav Deshmukh
              </h1>
              <p className="text-xs text-[#777777] mt-0.5">
                aarav.deshmukh@example.com • Gold Woodcraft Member
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#EAE7E1] hover:bg-white text-xs font-bold text-[#252525] rounded-sm w-fit"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR TABS (3 cols) */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3.5 text-xs font-bold rounded-sm transition-colors ${
                activeTab === 'orders' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#F4C542]" />
                Orders & Tracking
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between p-3.5 text-xs font-bold rounded-sm transition-colors ${
                activeTab === 'profile' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#F4C542]" />
                Profile Information
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between p-3.5 text-xs font-bold rounded-sm transition-colors ${
                activeTab === 'addresses' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4C542]" />
                Saved Delivery Addresses
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('designs')}
              className={`w-full flex items-center justify-between p-3.5 text-xs font-bold rounded-sm transition-colors ${
                activeTab === 'designs' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#F4C542]" />
                Saved Room Blueprints
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MAIN TAB CONTENT (9 cols) */}
          <div className="lg:col-span-9 bg-white border border-[#EAE7E1] p-6 sm:p-8 rounded-sm">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
                  Your Furniture Order History
                </h3>

                <div className="space-y-6">
                  {sampleOrders.map((ord) => (
                    <div key={ord.id} className="border border-[#EAE7E1] rounded-sm p-5 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE7E1] pb-3">
                        <div>
                          <span className="text-xs font-bold text-[#252525]">Order #{ord.id}</span>
                          <span className="text-xs text-[#777777] ml-3">Placed on {ord.date}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded w-fit ${
                          ord.status === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded border" />
                              <div>
                                <div className="font-bold text-[#252525]">{item.name}</div>
                                <div className="text-[#777777]">Quantity: {item.qty}</div>
                              </div>
                            </div>
                            <span className="font-bold text-[#252525]">{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Live Tracking Status */}
                      <div className="p-3 bg-[#F8F7F4] rounded border border-[#EAE7E1] text-xs flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#F4C542] shrink-0" />
                        <span className="text-[#252525] font-medium">{ord.trackingStatus}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-[#777777]">Total Paid: <strong className="text-sm font-bold text-[#252525]">{formatPrice(ord.total)}</strong></span>
                        <button className="text-xs text-[#B87333] font-bold hover:underline">
                          Download Tax Invoice
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-lg">
                <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
                  Account Details
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-[#252525] block mb-1">Full Name</label>
                    <input type="text" defaultValue="Aarav Deshmukh" className="w-full p-2.5 border rounded-sm" />
                  </div>
                  <div>
                    <label className="font-bold text-[#252525] block mb-1">Mobile</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full p-2.5 border rounded-sm" />
                  </div>
                  <div>
                    <label className="font-bold text-[#252525] block mb-1">Email</label>
                    <input type="email" defaultValue="aarav.deshmukh@example.com" className="w-full p-2.5 border rounded-sm" />
                  </div>
                  <button className="px-6 py-2.5 bg-[#252525] text-white font-bold rounded-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
                  Saved Delivery Addresses
                </h3>
                <div className="p-4 border border-[#F4C542] bg-[#FFFDF5] rounded-sm text-xs space-y-1 relative">
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#FFD84D] px-2 py-0.5 rounded">
                    DEFAULT ADDRESS
                  </span>
                  <div className="font-bold text-sm text-[#252525]">Home (Aarav Deshmukh)</div>
                  <div className="text-[#777777]">Flat 402, Sunshine Heights, Powai Lake Road</div>
                  <div className="text-[#777777]">Mumbai, Maharashtra - 400076</div>
                  <div className="text-[#777777]">Mobile: +91 98765 43210</div>
                </div>
              </div>
            )}

            {/* DESIGNS TAB */}
            {activeTab === 'designs' && (
              <div className="space-y-4 text-xs">
                <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
                  Saved 3D Room Blueprints
                </h3>
                <div className="p-6 bg-[#F8F7F4] rounded text-center">
                  <p className="text-[#777777] mb-3">You have 1 saved living room layout (14 ft × 12 ft).</p>
                  <Link to="/room-planner" className="px-4 py-2 bg-[#252525] text-white font-bold rounded-sm inline-block">
                    Open in Room Planner
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountPage;
