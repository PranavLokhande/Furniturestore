// ============================================================
// WoodCraft India — Core TypeScript Types
// ============================================================

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category_id: string;
  category_name: string;
  description: string;
  price: number;           // current selling price in INR
  original_price: number;  // MRP
  discount_percentage: number;
  rating: number;
  review_count: number;
  material: string;
  color: string;
  dimensions: ProductDimensions;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  is_bestseller: boolean;
  is_new_arrival: boolean;
  is_published: boolean;
  stock_quantity: number;
  warranty_months: number;
  created_at: string;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inch';
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  type: 'main' | 'secondary' | 'lifestyle' | 'detail' | 'variant';
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;           // e.g. "Walnut Brown"
  type: 'color' | 'material' | 'size';
  value: string;
  price_modifier: number; // +/- from base price
  stock_quantity: number;
  image_url?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url: string;
  banner_url?: string;
  badge?: string;
  parent_id?: string;
  sort_order: number;
  is_active: boolean;
  subcategories?: Category[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  discount_text?: string;
  description: string;
  cta_text: string;
  cta_link: string;
  desktop_image_url: string;
  mobile_image_url: string;
  badge?: string;
  sort_order: number;
  is_active: boolean;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  variant_id?: string;
  variant?: ProductVariant;
  quantity: number;
  unit_price: number;
}

export interface WishlistItem {
  id: string;
  product_id: string;
  product: Product;
  added_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping_charge: number;
  tax: number;
  total: number;
  coupon_code?: string;
  shipping_address: Address;
  payment_method: string;
  tracking_id?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  variant_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Address {
  id: string;
  user_id?: string;
  full_name: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;           // percentage or flat INR
  min_order_value: number;
  max_discount?: number;
  expiry_date: string;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  title: string;
  body: string;
  is_approved: boolean;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface FilterState {
  price_min: number;
  price_max: number;
  discount_min?: number;
  categories: string[];
  materials: string[];
  colors: string[];
  rating_min?: number;
  in_stock_only: boolean;
}

export type SortOption =
  | 'popularity'
  | 'price_asc'
  | 'price_desc'
  | 'newest'
  | 'discount_desc'
  | 'rating_desc';
