import React from 'react';
import { MapPin, ChevronDown, ShieldCheck } from 'lucide-react';
import { CONFIG } from '../constants/config';

export default function Navbar({ userLocation, onEditLocation }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-bg/85 backdrop-blur-md border-b border-brand-accent/10 px-4 py-3 md:px-8 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo and Tagline */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-brand-accent flex items-center">
              GharPe<span className="text-brand-text">Fix</span>
            </span>
            <div className="flex items-center gap-0.5 bg-brand-accent/10 px-1.5 py-0.5 rounded-full text-[10px] text-brand-accent font-semibold">
              <ShieldCheck size={10} />
              <span>Verified</span>
            </div>
          </div>
          <span className="hidden md:inline text-xs text-brand-text/60 font-medium tracking-wide">
            {CONFIG.TAGLINE}
          </span>
        </div>

        {/* Right Side: Location Selector */}
        <button
          onClick={onEditLocation}
          className="flex items-center gap-2 bg-brand-bgSecondary hover:bg-brand-accent/10 border border-brand-accent/5 hover:border-brand-accent/20 px-3.5 py-2 rounded-2xl transition-all duration-200 text-left group shadow-soft max-w-[200px] md:max-w-xs"
        >
          <div className="p-1 rounded-lg bg-brand-accent/10 text-brand-accent group-hover:scale-110 transition-transform duration-200">
            <MapPin size={16} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] uppercase tracking-wider text-brand-text/50 font-bold font-sans">
              Your Location
            </span>
            <span className="text-xs font-semibold text-brand-text truncate pr-1">
              {userLocation ? userLocation : 'Select Address'}
            </span>
          </div>
          <ChevronDown size={14} className="text-brand-text/40 group-hover:text-brand-accent transition-colors shrink-0 ml-1" />
        </button>
      </div>
    </header>
  );
}

