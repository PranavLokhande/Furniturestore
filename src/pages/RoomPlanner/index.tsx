import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Sparkles, Layers, Sliders, 
  Check, ArrowRight, Eye, ShieldCheck, Mail, CheckCircle2 
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';

export const RoomPlannerPage: React.FC = () => {
  const [roomType, setRoomType] = useState<'living' | 'bedroom' | 'dining'>('living');
  const [lengthFt, setLengthFt] = useState<number>(14);
  const [widthFt, setWidthFt] = useState<number>(12);
  const [emailWaitlist, setEmailWaitlist] = useState<string>('');
  const [submittedWaitlist, setSubmittedWaitlist] = useState<boolean>(false);

  const areaSqFt = lengthFt * widthFt;

  const furnitureSuggestions = {
    living: [
      { name: 'Regal 3-Seater Solid Sheesham Sofa', size: '7 ft × 3 ft', price: 31500 },
      { name: 'Arc Marble Top Coffee Table', size: '3.5 ft × 2 ft', price: 10800 },
      { name: 'Vista Wall TV Console', size: '6 ft × 1.3 ft', price: 22400 },
    ],
    bedroom: [
      { name: 'Royal King Bed with Storage', size: '6.5 ft × 6 ft', price: 43400 },
      { name: 'Grand 3-Door Solid Wood Wardrobe', size: '5 ft × 1.8 ft', price: 50400 },
      { name: 'Bedside Nightstand (Pair)', size: '1.5 ft × 1.5 ft', price: 9500 },
    ],
    dining: [
      { name: 'Heritage 6-Seater Dining Table + Chairs', size: '6 ft × 3 ft', price: 66500 },
      { name: 'Solid Wood Crockery Sideboard', size: '4.5 ft × 1.5 ft', price: 28000 },
    ],
  };

  const totalEstimate = furnitureSuggestions[roomType].reduce((sum, item) => sum + item.price, 0);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailWaitlist && emailWaitlist.includes('@')) {
      setSubmittedWaitlist(true);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-[#F8F7F4] border border-[#EAE7E1] p-8 sm:p-14 rounded-sm mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD84D] text-[#252525] text-xs font-bold uppercase tracking-wider mb-4">
              <Box className="w-3.5 h-3.5" />
              Interactive 3D Visualizer & Estimator
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#252525] leading-tight">
              Design Your <span className="text-[#B87333]">Dream Room</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] mt-3 leading-relaxed">
              Visualize how authentic solid wood furniture fits within your floorplan. Enter your room dimensions below to calculate space utilization and furniture estimates.
            </p>
          </div>
        </div>

        {/* Interactive Layout Dimension Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Controls Box (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#EAE7E1] p-6 rounded-sm shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-[#252525] border-b border-[#EAE7E1] pb-3">
              1. Room Specifications
            </h3>

            {/* Room Type Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#252525] block mb-2">
                Room Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['living', 'bedroom', 'dining'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoomType(r)}
                    className={`py-2 px-3 text-xs font-bold capitalize rounded-sm border transition-all ${
                      roomType === r
                        ? 'border-[#252525] bg-[#252525] text-white shadow-sm'
                        : 'border-[#EAE7E1] bg-white text-[#777777] hover:text-black'
                    }`}
                  >
                    {r} Room
                  </button>
                ))}
              </div>
            </div>

            {/* Length Dimension Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#252525] mb-2">
                <span>Room Length:</span>
                <span className="font-mono text-base text-[#B87333]">{lengthFt} Feet</span>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                value={lengthFt}
                onChange={(e) => setLengthFt(Number(e.target.value))}
                className="w-full accent-[#F4C542] cursor-pointer"
              />
            </div>

            {/* Width Dimension Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#252525] mb-2">
                <span>Room Width:</span>
                <span className="font-mono text-base text-[#B87333]">{widthFt} Feet</span>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                value={widthFt}
                onChange={(e) => setWidthFt(Number(e.target.value))}
                className="w-full accent-[#F4C542] cursor-pointer"
              />
            </div>

            {/* Area Stats Banner */}
            <div className="p-4 bg-[#F8F7F4] rounded-sm border border-[#EAE7E1] flex justify-between items-center text-xs">
              <div>
                <span className="text-[#777777] block text-[11px]">Total Usable Floor Area</span>
                <span className="text-xl font-bold text-[#252525]">{areaSqFt} Sq. Ft.</span>
              </div>
              <div className="text-right">
                <span className="text-[#777777] block text-[11px]">Walking Clearance</span>
                <span className="text-xs font-bold text-emerald-600">Optimal (~65% Free)</span>
              </div>
            </div>

          </div>

          {/* Virtual Visualizer Canvas Simulation (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F7F4] border border-[#EAE7E1] rounded-sm p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE7E1] mb-6">
              <h3 className="font-serif font-bold text-lg text-[#252525] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F4C542]" />
                Interactive Layout Blueprint ({roomType.toUpperCase()} ROOM)
              </h3>
              <span className="text-[11px] font-mono font-bold bg-white px-2.5 py-1 border border-[#EAE7E1] rounded">
                Scale: 1:{Math.round(areaSqFt / 10)}
              </span>
            </div>

            {/* Floorplan Box */}
            <div className="relative w-full aspect-[16/10] bg-white border-2 border-dashed border-[#B87333]/50 rounded-sm p-4 flex flex-col justify-between overflow-hidden shadow-inner">
              
              <div className="text-[11px] font-mono text-[#777777] flex justify-between">
                <span>← {lengthFt} FT WALL →</span>
                <span className="text-emerald-700 font-bold">BALCONY / WINDOW ACCESS</span>
              </div>

              {/* Recommended Pieces Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
                {furnitureSuggestions[roomType].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FFFDF5] border border-[#F4C542] rounded-sm text-center shadow-xs"
                  >
                    <div className="text-xs font-bold text-[#252525] truncate">{item.name}</div>
                    <div className="text-[11px] text-[#777777] font-mono mt-0.5">{item.size}</div>
                    <div className="text-xs font-bold text-[#B87333] mt-1">{formatPrice(item.price)}</div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] font-mono text-[#777777] flex justify-between">
                <span>DOOR ENTRY</span>
                <span>← {widthFt} FT WALL →</span>
              </div>
            </div>

            {/* Furniture Estimate Quotation */}
            <div className="mt-6 pt-6 border-t border-[#EAE7E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#777777]">Estimated Complete Set Cost</span>
                <div className="text-2xl font-bold text-[#252525]">{formatPrice(totalEstimate)}</div>
                <span className="text-[11px] text-emerald-600 font-medium">Free Woodcraft delivery + assembly included</span>
              </div>

              <Link
                to={`/category/${roomType === 'living' ? 'living-room' : roomType === 'bedroom' ? 'bedroom' : 'dining-room'}`}
                className="py-3 px-6 bg-[#252525] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2"
              >
                Browse {roomType} Furniture <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

        {/* Future Three.js 3D Engine Architecture & Waitlist */}
        <div className="bg-[#252525] text-white p-8 sm:p-12 rounded-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F4C542] text-[#252525] text-xs font-bold uppercase tracking-wider mb-4">
                WebGL & Three.js Powered
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Full 3D Real-Time Spatial Room Planner
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                We are actively integrating React Three Fiber and photorealistic GLB 3D furniture models. You will be able to pan, rotate, swap timber polishes, and view furniture in your actual room via WebXR.
              </p>
            </div>

            {/* Waitlist Subscription */}
            <div className="bg-[#1C1C1C] p-6 rounded-sm border border-[#333]">
              <h4 className="font-bold text-sm text-white mb-2">Be First To Experience The 3D Engine</h4>
              <p className="text-xs text-gray-400 mb-4">Get invited to our private beta and receive a ₹3,000 architectural room discount.</p>
              
              {submittedWaitlist ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                  You're on the early-access list! We'll email your invite soon.
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={emailWaitlist}
                    onChange={(e) => setEmailWaitlist(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="bg-[#2A2A2A] border border-[#444] text-xs text-white px-3 py-2.5 rounded-sm w-full focus:outline-none focus:border-[#F4C542]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#F4C542] hover:bg-[#e0b234] text-[#252525] font-bold text-xs uppercase rounded-sm shrink-0"
                  >
                    Join Waitlist
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomPlannerPage;
