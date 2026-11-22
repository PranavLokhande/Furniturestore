import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, 
  Wrench, RotateCcw, MessageCircle, Star, 
  Share2, Check, ArrowRight, Home as HomeIcon, 
  Tag, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';
import { getProductBySlug, products } from '../../data/products';
import { useCartStore, useWishlistStore } from '../../store';
import { formatPrice } from '../../lib/utils';
import ProductCard from '../../components/product/ProductCard';
import StarRating from '../../components/product/StarRating';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return getProductBySlug(slug || '') || products[0];
  }, [slug]);

  // Gallery state
  const allImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [
      { id: '1', product_id: product.id, url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80', alt: 'Studio Front Angle', type: 'main' as const, sort_order: 1 },
      { id: '2', product_id: product.id, url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80', alt: 'Room Setting Lifestyle', type: 'lifestyle' as const, sort_order: 2 },
      { id: '3', product_id: product.id, url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80', alt: 'Hardwood Grain Detail', type: 'detail' as const, sort_order: 3 },
    ];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const activeImage = allImages[activeImageIndex]?.url || allImages[0]?.url;

  const [selectedFinish, setSelectedFinish] = useState<string>(product.color || 'Walnut Brown');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'reviews'>('desc');
  const [pincode, setPincode] = useState<string>('');
  const [deliveryAvailable, setDeliveryAvailable] = useState<boolean | null>(null);

  // Zoom lens state
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Stores
  const { addItem } = useCartStore();
  const { isWishlisted, toggle: toggleWishlist } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  // Cart actions
  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryAvailable(true);
    }
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category_id === product.category_id && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const lifestyleImage = useMemo(() => {
    const life = allImages.find(img => img.type === 'lifestyle');
    return life?.url || allImages[1]?.url || activeImage;
  }, [allImages, activeImage]);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Breadcrumb Bar */}
      <div className="bg-[#F8F7F4] border-b border-[#EAE7E1] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#777777] overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#252525] flex items-center gap-1">
              <HomeIcon className="w-3.5 h-3.5" />
              Home
            </Link>
            <span>/</span>
            <Link to="/category/all" className="hover:text-[#252525]">Furniture</Link>
            <span>/</span>
            <Link to={`/category/${product.category_name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#252525]">
              {product.category_name}
            </Link>
            <span>/</span>
            <span className="text-[#252525] font-semibold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT: MULTI-ANGLE GALLERY & INTERACTIVE ZOOM (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Multi-Angle Thumbnails Column */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0 sm:max-h-[580px]">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border-2 transition-all shrink-0 group ${
                    activeImageIndex === idx ? 'border-[#F4C542] shadow-sm' : 'border-[#EAE7E1] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] font-bold text-white uppercase text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.type}
                  </span>
                </button>
              ))}
            </div>

            {/* Interactive Zoom Main Stage */}
            <div 
              ref={imageContainerRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsLightboxOpen(true)}
              className="relative flex-1 bg-[#F8F7F4] rounded-sm overflow-hidden border border-[#EAE7E1] aspect-[4/3] sm:aspect-square flex items-center justify-center cursor-zoom-in select-none group"
            >
              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-full object-cover object-center transition-transform duration-150 ${
                  isZooming ? 'scale-[2.2]' : 'scale-100'
                }`}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-[#FFD84D] text-[#252525] font-bold text-xs px-3 py-1.5 rounded-sm shadow-sm tracking-wide z-10 pointer-events-none">
                {product.discount_percentage}% OFF
              </div>

              {/* Zoom & Lightbox Hint */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-brand-dark rounded-full shadow-sm z-10 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 opacity-80">
                <ZoomIn className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Hover to zoom • Click to expand</span>
              </div>

              {/* Floating Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 transition-transform z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-[#252525]'}`} />
              </button>
            </div>

          </div>

          {/* RIGHT: BUY BOX & PRODUCT DETAILS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Category & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#B87333]">
                {product.category_name} • 100% Solid Hardwood
              </span>
              <div className="flex items-center gap-1.5 bg-[#FFF9E6] px-2.5 py-1 rounded border border-[#F4C542]/40 text-xs font-bold text-[#252525]">
                <Star className="w-3.5 h-3.5 fill-[#F4C542] text-[#F4C542]" />
                {product.rating} ({product.review_count} Verified Reviews)
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#252525] leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-[#777777] mt-1 font-mono">
              SKU: {product.sku} | Timber: {product.material}
            </p>

            {/* Price Box */}
            <div className="mt-4 p-4 rounded-sm bg-[#F8F7F4] border border-[#EAE7E1]">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#252525]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-base text-[#777777] line-through">
                  {formatPrice(product.original_price)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Save {formatPrice(product.original_price - product.price)} ({product.discount_percentage}% OFF)
                </span>
              </div>
              <p className="text-[11px] text-[#777777] mt-1">Inclusive of all applicable GST. Zero delivery & installation charge.</p>
            </div>

            {/* Promotional Offers Box */}
            <div className="mt-4 space-y-2 border border-dashed border-[#F4C542] bg-[#FFFCF0] p-3.5 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#252525]">
                <Tag className="w-4 h-4 text-[#F4C542]" />
                Available Offers on this item:
              </div>
              <ul className="text-xs text-[#252525] space-y-1.5 pl-6 list-disc">
                <li>Use code <strong>FURNITURE10</strong> for extra 10% instant discount.</li>
                <li>No Cost EMI available starting from <strong>₹{Math.round(product.price / 6).toLocaleString('en-IN')}/mo</strong>.</li>
                <li>Complimentary assembly by expert carpenter within 48 hrs of delivery.</li>
              </ul>
            </div>

            {/* Wood Polish / Finish Selection */}
            <div className="mt-6">
              <label className="text-xs font-bold uppercase tracking-wider text-[#252525] block mb-2.5">
                Wood Polish: <span className="font-normal text-[#777777]">{selectedFinish}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {['Walnut Brown', 'Teak Natural', 'Honey Oak', 'Dark Mahogany'].map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all ${
                      selectedFinish === finish
                        ? 'border-[#252525] bg-[#252525] text-white shadow-sm'
                        : 'border-[#EAE7E1] bg-white text-[#252525] hover:border-gray-400'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#252525]">Quantity:</span>
              <div className="flex items-center border border-[#EAE7E1] rounded-sm bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-[#777777] hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-[#252525]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-[#777777] hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-4 bg-white border-2 border-[#252525] text-[#252525] font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-gray-50 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#F4C542]" />
                Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
              >
                Buy Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* WhatsApp Enquiry & Share Row */}
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-[#EAE7E1]">
              <a
                href={`https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(SKU%3A%20${product.sku})`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                Ask a Furniture Specialist on WhatsApp
              </a>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: product.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Product link copied to clipboard!');
                  }
                }}
                className="text-xs text-[#777777] hover:text-[#252525] flex items-center gap-1 font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="mt-6 p-4 bg-[#F8F7F4] rounded-sm border border-[#EAE7E1]">
              <div className="text-xs font-bold text-[#252525] mb-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#F4C542]" />
                Check Delivery & Assembly at your Pincode
              </div>
              <form onSubmit={checkDelivery} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="bg-white border border-[#EAE7E1] text-xs px-3 py-2 rounded-sm w-full focus:outline-none focus:border-[#F4C542]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#252525] text-white text-xs font-bold rounded-sm uppercase tracking-wider shrink-0"
                >
                  Check
                </button>
              </form>
              {deliveryAvailable && (
                <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Delivery by Thursday, Free Assembly Included
                </p>
              )}
            </div>

            {/* Trust Micro-Badges */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-[#EAE7E1] text-center">
              <div className="p-2 bg-[#FAFAFA] rounded-sm">
                <ShieldCheck className="w-5 h-5 text-[#F4C542] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-[#252525] block">10-Yr Warranty</span>
                <span className="text-[10px] text-[#777777]">Termite & Borer Proof</span>
              </div>
              <div className="p-2 bg-[#FAFAFA] rounded-sm">
                <Wrench className="w-5 h-5 text-[#F4C542] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-[#252525] block">Free Assembly</span>
                <span className="text-[10px] text-[#777777]">Expert Carpenter</span>
              </div>
              <div className="p-2 bg-[#FAFAFA] rounded-sm">
                <RotateCcw className="w-5 h-5 text-[#F4C542] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-[#252525] block">7-Day Transit</span>
                <span className="text-[10px] text-[#777777]">Damage Guarantee</span>
              </div>
            </div>

          </div>

        </div>

        {/* ─── LIFESTYLE ROOM-CONTEXT SHOWCASE BANNER ──────────────── */}
        <div className="mt-14 rounded-sm overflow-hidden border border-brand-border bg-[#F8F7F4] relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-[300px] sm:h-[400px] relative">
              <img
                src={lifestyleImage}
                alt={`${product.name} room context`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F8F7F4]/90 hidden lg:block" />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-yellow/30 text-[#252525] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-dark" />
                Architectural In-Room Context
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark leading-snug">
                Designed to Anchor Your Living Spaces
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Handcrafted from seasoned solid hardwood, this design merges timeless Indian woodworking joinery with contemporary ergonomics. The natural grain creates organic warmth that deepens with age.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-brand-dark">
                <span>✓ Kiln-Dried Hardwood</span>
                <span>✓ Non-Toxic Coat</span>
                <span>✓ Free Installation</span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS, SPECIFICATIONS & REVIEWS TABS */}
        <div className="mt-14 border-t border-[#EAE7E1] pt-10">
          
          <div className="flex border-b border-[#EAE7E1] gap-6 text-sm overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'border-[#252525] text-[#252525]'
                  : 'border-transparent text-[#777777] hover:text-black'
              }`}
            >
              Product Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-[#252525] text-[#252525]'
                  : 'border-transparent text-[#777777] hover:text-black'
              }`}
            >
              Dimensions & Specs
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'care'
                  ? 'border-[#252525] text-[#252525]'
                  : 'border-transparent text-[#777777] hover:text-black'
              }`}
            >
              Care & Warranty
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-[#252525] text-[#252525]'
                  : 'border-transparent text-[#777777] hover:text-black'
              }`}
            >
              Verified Reviews ({product.review_count})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'desc' && (
              <div className="prose max-w-none text-sm text-[#777777] leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p>
                  Handcrafted from Grade-A seasoned sheesham/teak hardwood, this design embodies timeless Indian joinery. Each piece undergoes high-temperature seasoning in automated vacuum kilns to lock in moisture levels below 8%, permanently preventing warping, wood splitting, and insect vulnerability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-[#F8F7F4] rounded border border-[#EAE7E1]">
                    <h4 className="font-bold text-[#252525] text-xs uppercase mb-1">Mortise & Tenon Joinery</h4>
                    <p className="text-xs text-[#777777]">Generational interlocking woodworking with zero wobbling or squeaking.</p>
                  </div>
                  <div className="p-4 bg-[#F8F7F4] rounded border border-[#EAE7E1]">
                    <h4 className="font-bold text-[#252525] text-xs uppercase mb-1">Non-Toxic Polyurethane Coat</h4>
                    <p className="text-xs text-[#777777]">Child-safe, low-VOC polish that preserves the organic tactile texture of the wood grain.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <table className="w-full text-xs text-left border border-[#EAE7E1]">
                  <tbody>
                    <tr className="border-b border-[#EAE7E1] bg-[#F8F7F4]">
                      <td className="p-3 font-bold text-[#252525] w-1/3">Dimensions (L × W × H)</td>
                      <td className="p-3 text-[#777777]">{product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}</td>
                    </tr>
                    <tr className="border-b border-[#EAE7E1]">
                      <td className="p-3 font-bold text-[#252525]">Primary Hardwood</td>
                      <td className="p-3 text-[#777777]">{product.material}</td>
                    </tr>
                    <tr className="border-b border-[#EAE7E1] bg-[#F8F7F4]">
                      <td className="p-3 font-bold text-[#252525]">Finish / Polish</td>
                      <td className="p-3 text-[#777777]">{selectedFinish} (Water-resistant coat)</td>
                    </tr>
                    <tr className="border-b border-[#EAE7E1]">
                      <td className="p-3 font-bold text-[#252525]">Assembly Required</td>
                      <td className="p-3 text-[#777777]">Yes (Carpenter provided free by WoodCraft India)</td>
                    </tr>
                    <tr className="border-b border-[#EAE7E1] bg-[#F8F7F4]">
                      <td className="p-3 font-bold text-[#252525]">Warranty Period</td>
                      <td className="p-3 text-[#777777]">10 Years On-Site Brand Warranty (Termite & Borer Proof)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-[#252525]">Country of Origin</td>
                      <td className="p-3 text-[#777777]">Handmade in India (Rajasthan & Saharanpur Clusters)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 text-xs text-[#777777] leading-relaxed max-w-2xl">
                <div className="p-4 bg-[#F8F7F4] rounded border border-[#EAE7E1] space-y-2">
                  <h4 className="font-bold text-[#252525]">Wood Longevity & Maintenance:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dust clean weekly using a soft microfiber cloth. Avoid wet rags or alcohol-based detergents.</li>
                    <li>Always use coasters or place-mats underneath hot utensils or cold beverages.</li>
                    <li>Avoid continuous direct exposure to torrential sunlight or air conditioner vents.</li>
                    <li>Apply natural beeswax or teak oil once every 18 months to nourish the natural grain luster.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-6 p-6 bg-[#F8F7F4] rounded-sm border border-[#EAE7E1]">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#252525]">{product.rating}</div>
                    <StarRating rating={product.rating} size="sm" />
                    <div className="text-[11px] text-[#777777] mt-1">{product.review_count} Verified Ratings</div>
                  </div>
                  <div className="border-l border-[#EAE7E1] pl-6 text-xs text-[#777777]">
                    96% of buyers recommended this solid wood furniture piece for durability and finish accuracy.
                  </div>
                </div>

                {/* Sample Review */}
                <div className="border-b border-[#EAE7E1] pb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-[#252525]">Siddharth Singhania</div>
                    <span className="text-[11px] text-[#777777]">Verified Purchase • 2 weeks ago</span>
                  </div>
                  <StarRating rating={5} size="sm" />
                  <p className="text-xs text-[#777777] leading-relaxed">
                    "Exceptional solid wood build. The weight alone speaks for the authentic timber quality. The delivery team arrived on time and assembled it in under 20 minutes without any mess."
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RELATED FURNITURE RECOMMENDATIONS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-[#EAE7E1] pt-12">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#252525] mb-6">
              Customers Also Explored
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─────────────────────────────── */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={activeImage}
              alt={product.name}
              className="max-h-[75vh] w-auto object-contain rounded-sm shadow-2xl"
            />
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-14 rounded-xs overflow-hidden border-2 transition-all ${
                    activeImageIndex === i ? 'border-brand-yellow' : 'border-transparent opacity-50'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;
