import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Image as ImageIcon, ShoppingCart, 
  Tag, Users, Plus, Trash2, Edit, Check, X, 
  TrendingUp, DollarSign, Clock, ShieldCheck, ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as initialProducts, heroBanners as initialBanners } from '../../data/products';
import { formatPrice } from '../../lib/utils';
import type { Product, Banner } from '../../types';

export const AdminPage: React.FC = () => {
  // Simple admin auth gate
  const [isAdminAuth, setIsAdminAuth] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Active Tab
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'banners' | 'orders' | 'coupons'>('dashboard');

  // Local state for products & banners
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [bannersList, setBannersList] = useState<Banner[]>(initialBanners);

  // Modal for Add Product
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category_name: 'Living Room',
    price: 24999,
    original_price: 34999,
    material: 'Sheesham Wood',
    color: 'Walnut Brown',
    stock_quantity: 20,
    is_bestseller: false,
    is_new_arrival: true,
    sku: `WC-${Math.floor(1000 + Math.random() * 9000)}`,
  });

  // Sample orders in admin
  const [ordersList, setOrdersList] = useState([
    { id: 'WC-842914', customer: 'Aarav Deshmukh', city: 'Mumbai', amount: 42300, status: 'Delivered', date: '18 Nov 2026' },
    { id: 'WC-731902', customer: 'Priya Sharma', city: 'Delhi', amount: 43400, status: 'In Transit', date: '12 Nov 2026' },
    { id: 'WC-629103', customer: 'Vikram Singh', city: 'Jaipur', amount: 50400, status: 'Processing', date: '21 Nov 2026' },
    { id: 'WC-518294', customer: 'Ananya Iyer', city: 'Bengaluru', amount: 31500, status: 'Pending', date: '22 Nov 2026' },
  ]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'woodcraft2026' || passwordInput === 'admin') {
      setIsAdminAuth(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Use: woodcraft2026');
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.round(((newProduct.original_price - newProduct.price) / newProduct.original_price) * 100);
    const created: Product = {
      id: `p-${Date.now()}`,
      sku: newProduct.sku,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      category_id: 'cat-1',
      category_name: newProduct.category_name,
      description: 'Handcrafted solid hardwood furniture created with premium kiln-dried timber and master joinery.',
      price: newProduct.price,
      original_price: newProduct.original_price,
      discount_percentage: discount,
      rating: 4.8,
      review_count: 1,
      material: newProduct.material,
      color: newProduct.color,
      dimensions: { length: 180, width: 80, height: 85, unit: 'cm' },
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: `p-${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
          alt: newProduct.name,
          type: 'main',
          sort_order: 1,
        }
      ],
      variants: [],
      tags: [],
      is_bestseller: newProduct.is_bestseller,
      is_new_arrival: newProduct.is_new_arrival,
      is_published: true,
      stock_quantity: newProduct.stock_quantity,
      warranty_months: 12,
      created_at: new Date().toISOString(),
    };

    setProductsList([created, ...productsList]);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      category_name: 'Living Room',
      price: 24999,
      original_price: 34999,
      material: 'Sheesham Wood',
      color: 'Walnut Brown',
      stock_quantity: 20,
      is_bestseller: false,
      is_new_arrival: true,
      sku: `WC-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList(productsList.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(ordersList.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-[#1F1F1F] flex items-center justify-center p-4">
        <div className="bg-[#2A2A2A] border border-[#3E3E3E] text-white p-8 rounded-sm max-w-sm w-full shadow-2xl">
          <div className="w-12 h-12 rounded bg-[#FFD84D] text-[#252525] flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            W
          </div>
          <h2 className="text-xl font-bold text-center mb-1">WoodCraft Admin Portal</h2>
          <p className="text-xs text-gray-400 text-center mb-6">Enter master administrative passkey</p>
          
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password (woodcraft2026)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#444] text-xs p-3 rounded text-white focus:outline-none focus:border-[#F4C542]"
            />
            {authError && <p className="text-xs text-red-400">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Sign In as Administrator
            </button>
          </form>

          <Link to="/" className="block text-center text-xs text-gray-500 mt-6 hover:text-white">
            ← Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-[#252525] text-white px-6 py-4 flex items-center justify-between border-b border-[#3E3E3E]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#F4C542] text-[#252525] font-bold flex items-center justify-center">
              W
            </div>
            <span className="font-serif font-bold text-lg text-white">WoodCraft <span className="text-[#F4C542]">Manager</span></span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
            PRODUCTION READY
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> View Public Store
          </Link>
          <button
            onClick={() => setIsAdminAuth(false)}
            className="text-xs text-red-400 font-semibold hover:underline"
          >
            Lock Dashboard
          </button>
        </div>
      </header>

      {/* Main Admin Wrapper */}
      <div className="flex-1 flex">
        
        {/* Left Admin Nav (w-64) */}
        <nav className="w-64 bg-white border-r border-[#EAE7E1] p-4 space-y-1.5 shrink-0 hidden md:block">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-sm transition-colors ${
              adminTab === 'dashboard' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#F4C542]" />
            Executive Overview
          </button>

          <button
            onClick={() => setAdminTab('products')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-sm transition-colors ${
              adminTab === 'products' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
            }`}
          >
            <span className="flex items-center gap-3">
              <Package className="w-4 h-4 text-[#F4C542]" />
              Product Catalog
            </span>
            <span className="text-[10px] bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full font-bold">
              {productsList.length}
            </span>
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold rounded-sm transition-colors ${
              adminTab === 'orders' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
            }`}
          >
            <span className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4 text-[#F4C542]" />
              Customer Orders
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              {ordersList.length}
            </span>
          </button>

          <button
            onClick={() => setAdminTab('banners')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-sm transition-colors ${
              adminTab === 'banners' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#F4C542]" />
            Hero Banner Campaigns
          </button>

          <button
            onClick={() => setAdminTab('coupons')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-sm transition-colors ${
              adminTab === 'coupons' ? 'bg-[#252525] text-white' : 'text-[#777777] hover:bg-[#F8F7F4] hover:text-black'
            }`}
          >
            <Tag className="w-4 h-4 text-[#F4C542]" />
            Coupons & Markdowns
          </button>
        </nav>

        {/* Right Content Space */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {adminTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#252525]">Business Metrics</h1>
                <p className="text-xs text-[#777777] mt-0.5">Real-time performance across Indian fulfillment centers</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-sm border border-[#EAE7E1] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium">
                    <span>Gross Sales (MTD)</span>
                    <DollarSign className="w-4 h-4 text-[#F4C542]" />
                  </div>
                  <div className="text-2xl font-bold text-[#252525]">₹48,92,400</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">↑ +18.4% vs last month</div>
                </div>

                <div className="bg-white p-5 rounded-sm border border-[#EAE7E1] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium">
                    <span>Delivered Orders</span>
                    <ShoppingCart className="w-4 h-4 text-[#F4C542]" />
                  </div>
                  <div className="text-2xl font-bold text-[#252525]">184</div>
                  <div className="text-[11px] text-[#777777] mt-1">Average cart: ₹26,580</div>
                </div>

                <div className="bg-white p-5 rounded-sm border border-[#EAE7E1] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium">
                    <span>Catalog SKU Count</span>
                    <Package className="w-4 h-4 text-[#F4C542]" />
                  </div>
                  <div className="text-2xl font-bold text-[#252525]">{productsList.length}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">100% Solid hardwood</div>
                </div>

                <div className="bg-white p-5 rounded-sm border border-[#EAE7E1] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium">
                    <span>Carpentry Assembly Rate</span>
                    <Clock className="w-4 h-4 text-[#F4C542]" />
                  </div>
                  <div className="text-2xl font-bold text-[#252525]">98.6%</div>
                  <div className="text-[11px] text-[#777777] mt-1">Within 48 hours SLA</div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white border border-[#EAE7E1] rounded-sm p-6">
                <h3 className="font-serif font-bold text-base text-[#252525] mb-4">
                  Recent High-Value Purchases
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F7F4] text-[#777777] uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Fulfillment Status</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE7E1]">
                      {ordersList.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50">
                          <td className="p-3 font-mono font-bold text-[#252525]">{o.id}</td>
                          <td className="p-3 font-medium text-[#252525]">{o.customer}</td>
                          <td className="p-3 text-[#777777]">{o.city}</td>
                          <td className="p-3 font-bold text-[#252525]">{formatPrice(o.amount)}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 text-[#777777]">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {adminTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#252525]">Product Management</h1>
                  <p className="text-xs text-[#777777] mt-0.5">Manage catalogue, pricing, discount tags, and timber specifications</p>
                </div>

                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2.5 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase rounded-sm flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-[#F4C542]" />
                  Add New Product
                </button>
              </div>

              {/* Product Table */}
              <div className="bg-white border border-[#EAE7E1] rounded-sm overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F8F7F4] text-[#777777] uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price / MRP</th>
                      <th className="p-3">Discount</th>
                      <th className="p-3">Hardwood</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE7E1]">
                    {productsList.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80'}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded border shrink-0"
                          />
                          <span className="font-bold text-[#252525] truncate max-w-[200px]">{p.name}</span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[#777777]">{p.sku}</td>
                        <td className="p-3 text-[#252525]">{p.category_name}</td>
                        <td className="p-3">
                          <span className="font-bold text-[#252525]">{formatPrice(p.price)}</span>
                          <span className="text-[10px] text-[#777777] block line-through">{formatPrice(p.original_price)}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-[#FFD84D] text-[#252525] font-bold text-[10px] rounded">
                            {p.discount_percentage}% OFF
                          </span>
                        </td>
                        <td className="p-3 text-[#777777]">{p.material}</td>
                        <td className="p-3 font-semibold text-emerald-700">{p.stock_quantity} units</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {adminTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#252525]">Customer Orders & Logistics</h1>
                <p className="text-xs text-[#777777] mt-0.5">Update shipping milestones and dispatch statuses</p>
              </div>

              <div className="bg-white border border-[#EAE7E1] rounded-sm overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F8F7F4] text-[#777777] uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Order Value</th>
                      <th className="p-3">Current Status</th>
                      <th className="p-3">Update Milestone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE7E1]">
                    {ordersList.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50">
                        <td className="p-3 font-mono font-bold text-[#252525]">{ord.id}</td>
                        <td className="p-3 font-bold text-[#252525]">{ord.customer}</td>
                        <td className="p-3 text-[#777777]">{ord.city}</td>
                        <td className="p-3 font-bold text-[#252525]">{formatPrice(ord.amount)}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="bg-white border border-[#EAE7E1] text-xs font-semibold py-1 px-2 rounded cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing Carpentry</option>
                            <option value="In Transit">In Transit Truck</option>
                            <option value="Delivered">Delivered & Assembled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BANNERS */}
          {adminTab === 'banners' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#252525]">Hero Promotional Banners</h1>
                <p className="text-xs text-[#777777] mt-0.5">Control live carousel campaigns displayed on customer homepage</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bannersList.map((b) => (
                  <div key={b.id} className="bg-white border border-[#EAE7E1] rounded-sm overflow-hidden p-4 space-y-3">
                    <img src={b.desktop_image_url} alt={b.title} className="w-full h-36 object-cover rounded" />
                    <div>
                      <span className="text-[10px] font-bold bg-[#FFD84D] px-2 py-0.5 rounded text-[#252525]">
                        {b.badge || 'PROMO'}
                      </span>
                      <h4 className="font-bold text-sm text-[#252525] mt-1">{b.title}</h4>
                      <p className="text-xs text-[#777777]">{b.subtitle} • {b.discount_text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COUPONS */}
          {adminTab === 'coupons' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#252525]">Coupon Codes & Discounts</h1>
                <p className="text-xs text-[#777777] mt-0.5">Active marketing discount vouchers for checkout</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { code: 'WOOD10', disc: '10% Discount', min: '₹15,000' },
                  { code: 'FESTIVE25', disc: '25% Clearance', min: '₹35,000' },
                  { code: 'WELCOME2000', disc: '15% Welcome', min: '₹20,000' },
                ].map((c) => (
                  <div key={c.code} className="bg-white p-5 border border-[#EAE7E1] rounded-sm space-y-2">
                    <span className="font-mono font-bold text-lg text-[#252525]">{c.code}</span>
                    <div className="text-xs font-bold text-emerald-600">{c.disc}</div>
                    <div className="text-[11px] text-[#777777]">Min Cart Order: {c.min}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-sm border border-[#EAE7E1] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE7E1]">
              <h3 className="font-serif font-bold text-base text-[#252525]">Add Solid Wood Furniture Piece</h3>
              <button onClick={() => setIsAddProductOpen(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-black" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#252525] block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Amber Teak 6-Seater Dining Table"
                  className="w-full p-2.5 border rounded-sm focus:outline-none focus:border-[#F4C542]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#252525] block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-sm"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#252525] block mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.original_price}
                    onChange={(e) => setNewProduct({ ...newProduct, original_price: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#252525] block mb-1">Primary Timber</label>
                  <input
                    type="text"
                    value={newProduct.material}
                    onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                    className="w-full p-2.5 border rounded-sm"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#252525] block mb-1">Category</label>
                  <select
                    value={newProduct.category_name}
                    onChange={(e) => setNewProduct({ ...newProduct, category_name: e.target.value })}
                    className="w-full p-2.5 border rounded-sm bg-white"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Dining Room">Dining Room</option>
                    <option value="Office Furniture">Office Furniture</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2.5 border border-[#EAE7E1] font-bold rounded-sm text-[#777777]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#252525] text-white font-bold rounded-sm"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
