import React from 'react';
import HeroCarousel from '../../components/banners/HeroCarousel';
import CategoryGrid from '../../components/category/CategoryGrid';
import ProductCarousel from '../../components/carousels/ProductCarousel';
import { PromoBannersDouble, PromoBannerFull } from '../../components/banners/PromoBanners';
import ShopByRoom from '../../components/category/ShopByRoom';
import ExclusiveDeals from '../../components/sections/ExclusiveDeals';
import BudgetShopping from '../../components/sections/BudgetShopping';
import RoomPlannerPromo from '../../components/sections/RoomPlannerPromo';
import Testimonials from '../../components/sections/Testimonials';
import BrandStory from '../../components/sections/BrandStory';
import { products, getBestsellers, getNewArrivals } from '../../data/products';

export const Home: React.FC = () => {
  // Collection subsets
  const bestsellers = getBestsellers();
  const newArrivals = getNewArrivals();

  const sofaCollection = products.filter(
    (p) => p.category_id === 'cat-1' || p.name.toLowerCase().includes('sofa') || p.slug.includes('sofa')
  );

  const bedCollection = products.filter(
    (p) => p.category_id === 'cat-2' || p.name.toLowerCase().includes('bed') || p.slug.includes('bed')
  );

  const diningCollection = products.filter(
    (p) => p.category_id === 'cat-3' || p.name.toLowerCase().includes('dining') || p.slug.includes('dining')
  );

  const wardrobeCollection = products.filter(
    (p) => p.name.toLowerCase().includes('wardrobe') || p.slug.includes('wardrobe')
  );

  const coffeeTableCollection = products.filter(
    (p) => p.name.toLowerCase().includes('coffee') || p.slug.includes('coffee')
  );

  const officeCollection = products.filter(
    (p) => p.category_id === 'cat-4' || p.name.toLowerCase().includes('desk') || p.name.toLowerCase().includes('study')
  );

  return (
    <div className="w-full bg-white">
      {/* 1. Promotional Hero Carousel */}
      <HeroCarousel />

      {/* 2. Shop By Categories */}
      <CategoryGrid />

      {/* 3. Best Sellers Carousel */}
      <ProductCarousel
        title="Best Sellers"
        subtitle="Our most coveted solid wood pieces, rated 4.5+ stars by Indian homes."
        products={bestsellers}
        viewAllLink="/category/all?sort=bestseller"
        badgeType="bestseller"
      />

      {/* 4. Promotional Image Banners (Two-Column) */}
      <PromoBannersDouble />

      {/* 5. New Arrivals */}
      <ProductCarousel
        title="New Arrivals"
        subtitle="Handcrafted this season: Fresh silhouettes, sculpted grain, modern ergonomics."
        products={newArrivals}
        viewAllLink="/category/all?sort=newest"
        badgeType="new"
      />

      {/* 6. Shop By Room */}
      <ShopByRoom />

      {/* 7. Exclusive Deals */}
      <ExclusiveDeals />

      {/* 8. Trending Collections */}
      <div className="bg-[#FAF9F6] py-4 space-y-6">
        <ProductCarousel
          title="Sofa Collection"
          subtitle="Plush velvet, top-grain leatherette, and seasoned sheesham structures."
          products={sofaCollection}
          viewAllLink="/category/sofas"
        />

        <ProductCarousel
          title="Bed Collection"
          subtitle="Hydraulic storage, acoustic upholstered headboards, and solid wood frames."
          products={bedCollection}
          viewAllLink="/category/beds"
        />

        <ProductCarousel
          title="Dining Collection"
          subtitle="6-seater & 4-seater statement dining sets for warm family conversations."
          products={diningCollection}
          viewAllLink="/category/dining-room"
        />

        {wardrobeCollection.length > 0 && (
          <ProductCarousel
            title="Wardrobe Collection"
            subtitle="Deep hanging storage, soft-close hinges, and beveled mirror panels."
            products={wardrobeCollection}
            viewAllLink="/category/wardrobes"
          />
        )}

        {coffeeTableCollection.length > 0 && (
          <ProductCarousel
            title="Coffee Table Collection"
            subtitle="Italian marble tops, nesting designs, and solid wood centrepieces."
            products={coffeeTableCollection}
            viewAllLink="/category/coffee-tables"
          />
        )}

        {officeCollection.length > 0 && (
          <ProductCarousel
            title="Office & Study Collection"
            subtitle="Ergonomic workstations and hardwood desks designed for productive focus."
            products={officeCollection}
            viewAllLink="/category/office-furniture"
          />
        )}
      </div>

      {/* 9. Budget Shopping */}
      <BudgetShopping />

      {/* 10. Solid Wood Brand Banner (Full Width) */}
      <PromoBannerFull />

      {/* 11. Room Planner Promotion */}
      <RoomPlannerPromo />

      {/* 12. Customer Testimonials */}
      <Testimonials />

      {/* 13. Brand Story Editorial */}
      <BrandStory />
    </div>
  );
};

export default Home;
