// ============================================================
// WoodCraft India — ShopByRoom
// 6-card "Shop By Room" section with tall aspect-ratio cards
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { roomTypes } from '../../data/products';

const ShopByRoom: React.FC = () => {
  return (
    <section className="bg-brand-bg py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="section-heading">Shop By Room</h2>
          <p className="section-subheading">Find the perfect furniture for every space in your home</p>
        </div>

        {/* Grid — 2 / 3 / 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {roomTypes.map((room) => (
            <Link
              key={room.slug}
              to={`/category/${room.slug}`}
              className="group relative overflow-hidden rounded-sm border border-brand-border
                         hover:border-brand-yellow hover:shadow-md
                         transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background image */}
              <img
                src={room.image}
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Room info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <h3 className="font-semibold text-white text-sm md:text-base leading-tight mb-0.5">
                  {room.name}
                </h3>
                <p className="text-white/70 text-xs">
                  {room.productCount} products
                </p>
              </div>

              {/* Yellow bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByRoom;
