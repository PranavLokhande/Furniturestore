import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Newsletter from './components/footer/Newsletter';
import ScrollToTop from './components/common/ScrollToTop';
import MobileBottomNav from './components/navigation/MobileBottomNav';

// Lazy load pages for better performance
const HomePage        = lazy(() => import('./pages/Home'));
const CategoryPage    = lazy(() => import('./pages/Category'));
const ProductPage     = lazy(() => import('./pages/ProductDetail'));
const CartPage        = lazy(() => import('./pages/Cart'));
const CheckoutPage    = lazy(() => import('./pages/Checkout'));
const AccountPage     = lazy(() => import('./pages/Account'));
const WishlistPage    = lazy(() => import('./pages/Wishlist'));
const SearchPage      = lazy(() => import('./pages/Search'));
const OffersPage      = lazy(() => import('./pages/Offers'));
const RoomPlannerPage = lazy(() => import('./pages/RoomPlanner'));
const AdminPage       = lazy(() => import('./pages/Admin'));
const NotFoundPage    = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
        <p className="text-brand-muted text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Newsletter />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin — no main layout */}
          <Route path="/admin/*" element={<AdminPage />} />

          {/* Main storefront */}
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
          <Route path="/category/:slug" element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          } />
          <Route path="/new-arrivals" element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          } />
          <Route path="/best-sellers" element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          } />
          <Route path="/collections" element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          } />
          <Route path="/product/:slug" element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          } />
          <Route path="/cart" element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          } />
          <Route path="/checkout" element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          } />
          <Route path="/account" element={
            <MainLayout>
              <AccountPage />
            </MainLayout>
          } />
          <Route path="/wishlist" element={
            <MainLayout>
              <WishlistPage />
            </MainLayout>
          } />
          <Route path="/search" element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          } />
          <Route path="/offers" element={
            <MainLayout>
              <OffersPage />
            </MainLayout>
          } />
          <Route path="/room-planner" element={
            <MainLayout>
              <RoomPlannerPage />
            </MainLayout>
          } />
          <Route path="*" element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
