import React from 'react';
import { MapPin, ChevronDown, ShieldCheck } from 'lucide-react';
import { CONFIG } from '../constants/config';

export default function Navbar({ userLocation, onEditLocation }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-bg/90 backdrop-blur-md border-b border-brand-accent/10 shadow-sm safe-top">
      <div className="w-full px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Brand Logo */}
        <div className="flex flex-col shrink-0 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-accent flex items-center">
              GharPe<span className="text-brand-text">Fix</span>
            </span>
            <div className="flex items-center gap-0.5 bg-brand-accent/10 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] text-brand-accent font-semibold shrink-0">
              <ShieldCheck size={9} />
              <span>Verified</span>
            </div>
          </div>
          <span className="hidden sm:inline text-[10px] text-brand-text/60 font-medium tracking-wide truncate">
            {CONFIG.TAGLINE}
          </span>
        </div>

        {/* Right: Location Selector */}
        <button
          onClick={onEditLocation}
          className="flex items-center gap-1.5 sm:gap-2 bg-brand-bgSecondary hover:bg-brand-accent/10 border border-brand-accent/5 hover:border-brand-accent/20 px-2.5 sm:px-3.5 py-2 rounded-2xl transition-all duration-200 text-left group shadow-soft min-w-0 max-w-[55%] sm:max-w-[200px]"
        >
          <div className="p-1 rounded-lg bg-brand-accent/10 text-brand-accent group-hover:scale-110 transition-transform duration-200 shrink-0">
            <MapPin size={14} />
          </div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-brand-text/50 font-bold">
              Your Location
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-brand-text truncate">
              {userLocation ? userLocation : 'Select Address'}
            </span>
          </div>
          <ChevronDown size={12} className="text-brand-text/40 group-hover:text-brand-accent transition-colors shrink-0" />
        </button>
      </div>
    </header>
  );
}
