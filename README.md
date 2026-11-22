# 🛋️ WoodCraft India — Premium Furniture E-Commerce Platform

A production-ready Indian furniture shopping web platform inspired by the visual merchandising, solid-wood aesthetic, and shopping experiences of **WoodenStreet** and **Woodensure**.

---

## 🎨 Visual Identity & Design System
- **Primary Background**: `#FFFFFF`
- **Secondary Background**: `#F8F7F4` (Warm Indian solid-wood heritage tone)
- **Primary Accent Yellow**: `#F4C542`
- **Discount Badge Yellow**: `#FFD84D`
- **Primary Text**: `#252525`
- **Muted Text**: `#777777`
- **Border**: `#EAE7E1`
- **Craft Accent**: `#B87333` (Warm copper wood tone)

---

## 🚀 Key Features Implemented

### 1. Header & Navigation
- **Rotating Announcement Bar**: 3 auto-cycling promotional & free delivery notices with Track Order link.
- **Brand Wordmark Logo**: Modern Indian furniture typography with solid wood motif.
- **Live Search Autocomplete**: Instant search dropdown with thumbnails, prices, and popular tags.
- **Interactive Header Badges**: Real-time Wishlist and Cart item count counters.
- **Desktop Mega Menu**: Deep multi-column dropdowns featuring subcategories, category photography, and featured products.
- **Mobile Responsive Drawer**: Accordion category navigation and quick account access.

### 2. Homepage (Strict Layout Order)
1. **Promotional Hero Carousel**: 4 full-width lifestyle furniture slides with auto-play, pause-on-hover, dark overlays, discount badges, and responsive action buttons.
2. **Shop By Categories**: 12 responsive category tiles (Sofas, Beds, Wardrobes, Dining, Coffee Tables, TV Units, Chairs, Study Tables, Shoe Racks, Decor, Storage, Outdoor).
3. **Best Sellers Carousel**: Horizontal draggable product carousel with 4.5+ star ratings, MRP strike, and quick add-to-cart.
4. **Promotional Image Banners**: Two-column visual merchandising banners.
5. **New Arrivals**: Carousel featuring latest season designs with `NEW` badges.
6. **Shop By Room**: Visual cards for Living Room, Bedroom, Dining Room, Home Office, Kids Room, and Balcony.
7. **Exclusive Deals**: Tiered discount cards (Up to 30%, 40%, 50% OFF, and Combo Offers).
8. **Trending Collections**: Independent carousels for Sofa, Bed, Dining, Wardrobe, Coffee Table, and Office Furniture.
9. **Budget Shopping**: Clickable price brackets (Under ₹5K, ₹10K, ₹20K, ₹30K, ₹50K, Above ₹50K).
10. **Solid Wood Editorial Banner**: Full-width brand craft showcase.
11. **3D Room Planner Promotion**: "Design Your Dream Room" spatial preview module.
12. **Customer Testimonials**: Customer reviews, star ratings, and product references.
13. **Brand Story**: Heritage storytelling detailing kiln-dried sheesham & teak woodworking, artisan clusters, and metrics.
14. **Newsletter & WhatsApp Bar**: Instant voucher newsletter subscription + direct WhatsApp furniture specialist concierge.
15. **Full Comprehensive Footer**: Category directory, policies, trust guarantees, and 100% secure payment badges.

### 3. Product Listing Page (PLP)
- **Multi-Faceted Sidebar Filters**:
  - Dynamic price range slider (up to ₹1,00,000)
  - Discount percentage radio (10%+, 20%+, 30%+, 40%+, 50%+)
  - Hardwood selection (Sheesham, Teak, Mango Wood, Marble)
  - Polish / Finish (Walnut Brown, Teak Natural, Honey Oak, etc.)
  - Customer rating threshold (3.5★, 4.0★, 4.5★)
  - In-stock availability toggle
- **Sorting Options**: Popularity/Bestsellers, Price (Low to High), Price (High to Low), Newest Arrivals, Highest Discount, Top Customer Rated.
- **Active Filter Chips** with 1-click removal.
- **Responsive Grid**: 4 columns desktop, 3 tablet, 2 mobile.
- **Load More Pagination** with remaining design counters.

### 4. Product Detail Page (PDP)
- **Gallery**: Large primary showcase + thumbnail navigation.
- **Pricing & Discounts**: Current price, strike-through MRP, savings badge, and GST clarity.
- **Promotional Coupons Box**: One-click coupon hints (`WOOD10`, `WELCOME2000`).
- **Wood Polish Selector**: Live swatch selector.
- **Quantity Selector** with stock indicators.
- **Delivery Pincode Checker**: 6-digit postal code validator.
- **CTAs**: "Add to Cart", "Buy Now", "Wishlist", and "Chat on WhatsApp".
- **Tabbed Specifications**: Product Overview, Detailed Technical Dimensions table, Wood Longevity Care, and Customer Reviews.
- **Customer Also Explored**: Related furniture recommendations.

### 5. Cart & Checkout Flow
- **Persistent State**: Powered by Zustand with `localStorage` persistence.
- **Cart Calculations**: Subtotal, Coupon discount, Free shipping threshold (>₹10,000), 18% GST calculation, and Grand Total.
- **Valid Demo Coupons**: `WOOD10` (10%), `FURNITURE10` (10%), `WELCOME2000` (15%), `FESTIVE25` (25%).
- **Multi-Step Checkout**: Full name, 10-digit mobile validation, delivery address, Indian states dropdown, standard/express logistics, and payment preferences (COD, Razorpay architecture, UPI).
- **Order Success Screen**: Generates verified order reference (`WC-XXXXXX`) and delivery timeline.

### 6. Customer Account Portal
- Order history with live milestone status badges (*Delivered & Assembled*, *In Transit*, *Processing*).
- Saved delivery addresses management.
- Saved 3D room blueprints.
- Profile details management.

### 7. Protected Admin Portal (`/admin`)
- **Access Passkey**: `woodcraft2026` or `admin`.
- **Executive Analytics**: Gross sales revenue (MTD), delivered orders count, average order value, and carpentry assembly SLA.
- **Product Manager**: Add new solid hardwood product, set SKU, prices, discount calculation, stock quantity, and delete items.
- **Order Milestone Logistics**: View orders and transition statuses (*Pending* → *Processing* → *In Transit* → *Delivered*).
- **Hero Banners & Coupons Manager**: Review active marketing banners and promotional codes.

### 8. Interactive 3D Room Planner (`/room-planner`)
- Floor area calculator (Length × Width sliders in feet).
- Interactive visual floorplan blueprint with dynamic furniture placement.
- Instant complete room quotation estimate.
- Early-access waitlist form for the future WebXR & Three.js 3D spatial engine.

---

## 💻 Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 + Custom Design Tokens
- **Icons**: Lucide React
- **Carousels**: Embla Carousel React + Autoplay
- **State Management**: Zustand (Cart, Wishlist, UI)
- **Routing**: React Router DOM v6

---

## 🏃‍♂️ How to Run Locally

```bash
cd "C:\Users\HP\.gemini\antigravity\scratch\woodcraft-india"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
Production preview runs on `http://localhost:4173`.
Admin credentials: Password `woodcraft2026`.
