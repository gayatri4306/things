import React from "react";
import { ShoppingBag, Search, PhoneCall, Filter, Sparkles, UserCheck } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGender: "unisex" | "boys" | "girls" | "all" | "bundles";
  setSelectedGender: (gender: "unisex" | "boys" | "girls" | "all" | "bundles") => void;
  cartCount: number;
  openCart: () => void;
  openHelpline: () => void;
  isWeekend: boolean;
  startVoiceListening: () => void;
  isListening: boolean;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedGender,
  setSelectedGender,
  cartCount,
  openCart,
  openHelpline,
  isWeekend,
  startVoiceListening,
  isListening
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm" id="dormaura-nav-header">
      {/* Top Banner with Helpline Indicator & Weekend Trigger */}
      <div 
        className="bg-indigo-950/40 text-white text-xs py-2.5 px-4 flex flex-wrap justify-between items-center border-b border-white/5 transition-all"
        id="top-trust-announcement-strip"
      >
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-block px-2 py-0.5 bg-rose-600/90 text-[9px] uppercase tracking-wider font-bold rounded">
            Trust Pledge
          </span>
          <span className="text-white/80 text-[11px] tracking-wide">
            Received a damaged item? Rapid free swap/refund via <b>+1-800-DORM-AURA</b>
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1.5 sm:mt-0">
          {isWeekend && (
            <span className="text-indigo-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-widest">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              Weekend Specials: Extra 15% off applied
            </span>
          )}
          <button 
            onClick={openHelpline}
            className="text-white/90 hover:text-white flex items-center gap-1.5 hover:underline transition-all cursor-pointer font-mono text-[10px] uppercase tracking-widest"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Helpline Support
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Logo and Brand Title in Editorial Serif */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setSearchQuery(""); setSelectedGender("all"); }}>
            <div className="bg-indigo-600 text-white p-2.5 rounded border border-indigo-500/30 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-serif italic tracking-tighter text-[#0e0e0e] select-none">
                DormAura
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/50 font-semibold font-mono mt-0.5">Trustworthy Hostel Essentials</p>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={openCart} 
              className="relative p-2 text-black bg-neutral-100 border border-black/10 hover:bg-neutral-200 rounded transition-all"
              aria-label="Wishlist and Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Input search and AI voice module matching style theme */}
        <div className="flex-1 max-w-xl mx-auto w-full flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bedding, study lamps, safes, towels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-neutral-100 border border-black/10 focus:border-indigo-600 focus:bg-white focus:outline-none rounded text-sm transition-all text-neutral-900 placeholder:text-neutral-400 font-sans shadow-inner"
              id="product-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-semibold cursor-pointer font-mono uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={startVoiceListening}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              isListening
                ? "bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse font-bold"
                : "bg-neutral-100 border-black/10 text-neutral-800 hover:bg-neutral-200 hover:border-black/20"
            }`}
            title="Search with your interactive Voice assistant"
            id="voice-navigation-btn"
          >
            <div className="flex items-center gap-1">
              {isListening ? (
                <div className="flex gap-0.5" id="voice-waves">
                  <div className="w-0.5 h-2 bg-rose-400 animate-bounce"></div>
                  <div className="w-0.5 h-3.5 bg-rose-300"></div>
                  <div className="w-0.5 h-1.5 bg-rose-500 animate-bounce"></div>
                </div>
              ) : (
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-indigo-500/60"></div>
                  <div className="w-0.5 h-1.5 bg-indigo-400/60"></div>
                  <div className="w-0.5 h-2.5 bg-indigo-600/60"></div>
                </div>
              )}
            </div>
            <span>{isListening ? "Voice Active" : "Voice Search"}</span>
          </button>
        </div>

        {/* Action icons / Desk panel */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={openHelpline}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0e0e0e]/70 hover:text-black border border-black/10 hover:border-black/25 py-2.5 px-4 rounded transition-all cursor-pointer bg-neutral-100"
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Exchange Center</span>
          </button>

          <button 
            onClick={openCart} 
            className="relative p-2.5 text-neutral-800 bg-neutral-100 hover:bg-[#eae6df] hover:text-black border border-black/10 rounded transition-all cursor-pointer"
            id="desktop-cart-toggle-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white min-w-[20px] min-h-[20px]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-Header Section: Curated Gender Filters */}
      <div className="bg-neutral-100 border-t border-b border-black/10 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs text-black/65 overflow-x-auto gap-4 scrollbar-none">
          <div className="flex items-center gap-2 text-black/40 font-mono uppercase tracking-wider text-[11px] whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" />
            <span>Room Curator:</span>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 border border-black/10 rounded">
            <button
              onClick={() => setSelectedGender("all")}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                selectedGender === "all"
                  ? "bg-[#0e0e0e] text-white font-bold"
                  : "hover:bg-black/5 text-black/60 hover:text-black"
              }`}
            >
              All Essentials
            </button>
            <button
              onClick={() => setSelectedGender("boys")}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedGender === "boys"
                  ? "bg-[#0e0e0e] text-white font-bold"
                  : "hover:bg-black/5 text-black/60 hover:text-black"
              }`}
            >
              ♂ Boys Room
            </button>
            <button
              onClick={() => setSelectedGender("girls")}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedGender === "girls"
                  ? "bg-[#0e0e0e] text-white font-bold"
                  : "hover:bg-black/5 text-black/60 hover:text-black"
              }`}
            >
              ♀ Girls Room
            </button>
            <button
              onClick={() => setSelectedGender("unisex")}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                selectedGender === "unisex"
                  ? "bg-[#0e0e0e] text-white font-bold"
                  : "hover:bg-black/5 text-black/60 hover:text-black"
              }`}
            >
              Unisex / Shared
            </button>
            <button
              onClick={() => setSelectedGender("bundles")}
              className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedGender === "bundles"
                  ? "bg-indigo-600 text-white font-bold"
                  : "hover:bg-black/5 text-black/60 hover:text-black border border-indigo-600/10"
              }`}
            >
              🎁 Curated Bundles
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] text-black/50 font-mono uppercase tracking-wider whitespace-nowrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              98% Trust Rating
            </span>
            <span>Always Genuine Stuff</span>
          </div>
        </div>
      </div>
    </header>
  );
}
