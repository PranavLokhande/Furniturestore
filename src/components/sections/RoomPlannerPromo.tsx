// ============================================================
// WoodCraft India — RoomPlannerPromo Section
// "Design Your Dream Room" — coming-soon promo with feature list
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sofa } from 'lucide-react';

const features = [
  'Place furniture virtually in your room',
  'Visualize before you buy — 360° view',
  'Get instant quotation on your design',
  'Save & share your design with family',
];

export const RoomPlannerPromo: React.FC = () => {
  return (
    <section className="bg-brand-bg py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── LEFT: Text (60%) ──────────────────────────────── */}
          <div className="w-full lg:w-[60%] relative">
            {/* Yellow accent line */}
            <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1 bg-brand-yellow rounded-full hidden sm:block" />

            <div className="sm:pl-4 md:pl-6">
              {/* Coming Soon pill */}
              <span className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-dark text-xs font-bold
                               px-3 py-1 rounded-full tracking-widest uppercase mb-5">
                <Sofa className="w-3.5 h-3.5" />
                Coming Soon
              </span>

              {/* Heading */}
              <h2 className="font-display font-bold text-3xl md:text-4xl xl:text-5xl text-brand-dark leading-tight mb-5">
                Design Your <br className="hidden md:block" />
                Dream Room
              </h2>

              {/* Description */}
              <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                Our interactive 3D Room Planner lets you place WoodCraft furniture right inside
                your space — virtually. Experiment with layouts, materials, and colors before
                you spend a single rupee.
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-brand-dark text-sm md:text-base font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/room-planner"
                className="btn-yellow inline-flex"
              >
                Join the Waitlist
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Image (40%) ───────────────────────────── */}
          <div className="w-full lg:w-[40%]">
            <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85"
                alt="Interactive 3D room planner preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/20 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-sm px-4 py-2 shadow">
                <p className="text-brand-dark font-semibold text-sm">3D Room Planner</p>
                <p className="text-brand-muted text-xs">Beta launching Q1 2027</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RoomPlannerPromo;
