// ============================================================
// WoodCraft India — Global Zustand Store
// Cart + Wishlist + UI state
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, WishlistItem, Product } from '../types';

// ─── CART STORE ───────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  tax: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      couponDiscount: 0,

      addItem: (product, quantity = 1) => {
        set(state => {
          const existing = state.items.find(i => i.product_id === product.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product_id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          const newItem: CartItem = {
            id: `cart-${Date.now()}`,
            product_id: product.id,
            product,
            quantity,
            unit_price: product.price,
          };
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId) =>
        set(state => ({ items: state.items.filter(i => i.product_id !== productId) })),

      updateQuantity: (productId, quantity) =>
        set(state => ({
          items: quantity <= 0
            ? state.items.filter(i => i.product_id !== productId)
            : state.items.map(i => i.product_id === productId ? { ...i, quantity } : i),
        })),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () =>
        set({ couponCode: '', couponDiscount: 0 }),

      clearCart: () =>
        set({ items: [], couponCode: '', couponDiscount: 0 }),

      subtotal: () => get().items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0),
      discount: () => {
        const { couponDiscount, couponCode } = get();
        if (!couponCode) return 0;
        const sub = get().subtotal();
        return Math.round(sub * (couponDiscount / 100));
      },
      shipping: () => {
        const sub = get().subtotal();
        return sub >= 10000 ? 0 : 499;
      },
      tax: () => {
        const sub = get().subtotal();
        const disc = get().discount();
        return Math.round((sub - disc) * 0.18);
      },
      total: () => {
        const sub = get().subtotal();
        const disc = get().discount();
        const ship = get().shipping();
        const tax = get().tax();
        return sub - disc + ship + tax;
      },
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'woodcraft-cart' }
  )
);

// ─── WISHLIST STORE ───────────────────────────────────────────
interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggle: (product: Product) => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          const item: WishlistItem = {
            id: `wish-${Date.now()}`,
            product_id: product.id,
            product,
            added_at: new Date().toISOString(),
          };
          set(state => ({ items: [...state.items, item] }));
        }
      },

      removeItem: (productId) =>
        set(state => ({ items: state.items.filter(i => i.product_id !== productId) })),

      isWishlisted: (productId) =>
        get().items.some(i => i.product_id === productId),

      toggle: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      count: () => get().items.length,
    }),
    { name: 'woodcraft-wishlist' }
  )
);

// ─── UI STORE ─────────────────────────────────────────────────
interface UIState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  setMobileMenuOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setSearchQuery: (q: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  searchQuery: '',
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
