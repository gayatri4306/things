import React, { useState, useEffect } from "react";
import { Sparkles, Hourglass, Gift } from "lucide-react";

interface PromoBannerProps {
  onExploreWeekendOffers: () => void;
  isWeekendActive: boolean;
}

export default function PromoBanner({ onExploreWeekendOffers, isWeekendActive }: PromoBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 6 is Saturday
      
      if (currentDay === 0 || currentDay === 6) {
        target.setHours(23, 59, 59, 999);
        if (currentDay === 6) {
          target.setDate(now.getDate() + 1);
        }
      } else {
        const daysToSaturday = 6 - currentDay;
        target.setDate(now.getDate() + daysToSaturday);
        target.setHours(0, 0, 0, 0);
      }

      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    setTimeLeft(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, []);

  // Format timer strings with leading zeros
  const padZero = (n: number) => String(n).padStart(2, "0");

  return (
    <div id="dormaura-promo-banner" className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 rounded-xl p-8 md:p-12 mb-10 border border-black/5 shadow-2xl text-white">
      {/* Editorial glowing line or details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-indigo-400 rounded-full text-[10px] uppercase tracking-widest font-mono font-bold mb-5">
            <Gift className="w-3.5 h-3.5" />
            <span>The Weekend Edit</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight text-white leading-tight">
            {isWeekendActive ? (
              <>
                Hostel Weekend Specials are <span className="text-indigo-400 font-serif">Now Active.</span>
              </>
            ) : (
              <>
                Affordable luxury, <span className="text-white/60">engineered for shared spaces.</span>
              </>
            )}
          </h2>
          
          <p className="mt-4 text-white/60 text-sm md:text-base font-light leading-relaxed">
            At DormAura, we bring you preeminently curated, hostelry-compliant gear. Designed for both girls and boys, featuring standard fire safety and fingerprint authentication to secure your space.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={onExploreWeekendOffers}
              className="px-6 py-3 bg-white hover:bg-indigo-600 hover:text-white text-black font-bold text-xs uppercase tracking-widest transition-all rounded shadow-md cursor-pointer"
            >
              Browse Weekend Specials
            </button>
            <div className="flex items-center gap-2 text-xs text-white/40 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>100% Free Swap for Damaged Deliveries</span>
            </div>
          </div>
        </div>

        {/* Dynamic Showcase of the Provided WebP Image */}
        <div className="relative shrink-0 w-full lg:w-72 h-44 lg:h-52 rounded-lg overflow-hidden border border-white/10 shadow-lg group">
          <img 
            src="https://files.catbox.moe/nddtyl.webp" 
            alt="DormAura Curated Hostel Essentials Space" 
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">Featured Catalog</span>
            <p className="text-xs text-white/95 font-serif italic font-light">Authentic Premium Student Living</p>
          </div>
        </div>

        {/* Beautiful minimalist layout for the timer matching Vesta */}
        <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-6 flex flex-col justify-between min-w-[280px] self-start lg:self-center">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              {isWeekendActive ? "Offers expire in" : "Specials activate in"}
            </span>
            <span className="text-[9px] bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-bold font-mono px-2 py-0.5 rounded">
              {isWeekendActive ? "Active" : "Pending"}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center" id="weekend-countdown-clock">
            <div className="p-2 bg-black/40 border border-white/5 rounded">
              <span className="block text-2xl font-serif font-bold text-white">{padZero(timeLeft.days)}</span>
              <span className="text-[8px] text-white/40 uppercase font-mono tracking-wider">Days</span>
            </div>
            <div className="p-2 bg-black/40 border border-white/5 rounded">
              <span className="block text-2xl font-serif font-bold text-white">{padZero(timeLeft.hours)}</span>
              <span className="text-[8px] text-white/40 uppercase font-mono tracking-wider">Hrs</span>
            </div>
            <div className="p-2 bg-black/40 border border-white/5 rounded">
              <span className="block text-2xl font-serif font-bold text-white">{padZero(timeLeft.minutes)}</span>
              <span className="text-[8px] text-white/40 uppercase font-mono tracking-wider">Mins</span>
            </div>
            <div className="p-2 bg-black/40 border border-white/5 rounded">
              <span className="block text-2xl font-serif font-bold text-white">{padZero(timeLeft.seconds)}</span>
              <span className="text-[8px] text-white/40 uppercase font-mono tracking-wider">Secs</span>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-white/50 text-center uppercase tracking-widest font-mono py-2 bg-black/30 border border-white/5 rounded-lg">
            {isWeekendActive ? "15% discount auto-applied" : "Saturdays to Sundays Specials"}
          </div>
        </div>
      </div>
    </div>
  );
}
