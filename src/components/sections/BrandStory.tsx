import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F8F7F4] border-y border-[#EAE7E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFD84D]/30 border border-[#F4C542]/50 text-[#252525] text-xs font-bold uppercase tracking-widest mb-4">
              <Award className="w-3.5 h-3.5 text-[#252525]" />
              Authentic Indian Woodcraft
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#252525] leading-tight mb-6">
              Handcrafted for Generations. <br />
              <span className="text-[#B87333]">Solid Sheesham & Teak Wood.</span>
            </h2>

            <p className="text-[#777777] text-base md:text-lg leading-relaxed mb-6">
              Born from a legacy of master carpenters in Rajasthan and Saharanpur, WoodCraft India bridges centuries-old joinery traditions with modern ergonomic living. Every dining table, bed frame, and sofa is carved from seasoned, ethically harvested hardwood built to endure a lifetime.
            </p>

            <p className="text-[#777777] text-sm md:text-base leading-relaxed mb-8">
              We eliminate intermediaries, bringing museum-grade solid wood furniture directly from artisan workshops to your doorstep with zero compromise on grain integrity, termite-treatment, or natural oil finishes.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#EAE7E1] mb-8">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#252525]">25+</div>
                <div className="text-xs md:text-sm text-[#777777] mt-1 font-medium">Years of Craft</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#252525]">1.5L+</div>
                <div className="text-xs md:text-sm text-[#777777] mt-1 font-medium">Homes Furnished</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#252525]">100%</div>
                <div className="text-xs md:text-sm text-[#777777] mt-1 font-medium">Kiln-Dried Hardwood</div>
              </div>
            </div>

            {/* Badges / Guarantees */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#252525]">
                <ShieldCheck className="w-5 h-5 text-[#F4C542]" />
                10-Year Wood Warranty
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#252525]">
                <Users className="w-5 h-5 text-[#F4C542]" />
                500+ Indian Artisans
              </div>
              <Link 
                to="/category/all" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#252525] hover:text-[#B87333] transition-colors ml-auto"
              >
                Explore Artisan Range <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image Collage Right */}
          <div className="relative">
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1000&q=80"
                alt="Artisan woodcrafting solid wood furniture"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Secondary Floating Image */}
            <div className="absolute -bottom-8 -left-8 w-1/2 aspect-square rounded-sm overflow-hidden shadow-xl border-4 border-white z-20 hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                alt="Finished living room"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Decorative yellow backdrop badge */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F4C542]/20 rounded-full blur-2xl z-0" />
            
            {/* Floating trust card */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-sm shadow-lg border border-[#EAE7E1] z-30">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#252525]">100% Solid Sheesham</span>
              </div>
              <div className="text-[11px] text-[#777777] mt-0.5">Termite treated & hand polished</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;
