import React from 'react';
import { ShieldCheck, Mail, Clock, PhoneCall } from 'lucide-react';
import { CONFIG } from '../constants/config';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-brand-bgSecondary border-t border-brand-accent/10 px-4 sm:px-6 pt-8 pb-28 text-brand-text/80">
      <div className="w-full flex flex-col gap-6">
        {/* Brand */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-brand-accent">
              GharPe<span className="text-brand-text">Fix</span>
            </span>
            <div className="flex items-center gap-0.5 bg-brand-accent/10 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] text-brand-accent font-semibold">
              <ShieldCheck size={10} />
              <span>Verified Professionals</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-brand-text/70 leading-relaxed">
            {CONFIG.TAGLINE}. Your reliable partner for electrical, plumbing, appliance repair and water systems.
          </p>
          <div className="flex flex-col gap-1.5 mt-1 text-[11px] sm:text-xs font-medium text-brand-text/70">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-brand-accent shrink-0" />
              <span>{CONFIG.OPERATING_HOURS}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-brand-accent shrink-0" />
              <span className="break-all">{CONFIG.SUPPORT_EMAIL}</span>
            </div>
          </div>
        </div>

        {/* Services Quick Links */}
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-brand-text uppercase tracking-wider mb-3">
            Services Offered
          </h3>
          <ul className="grid grid-cols-2 gap-1.5 text-[10px] sm:text-xs font-medium text-brand-text/60">
            <li>• General Electrician</li>
            <li>• House Wiring</li>
            <li>• Fan Repair</li>
            <li>• Cooler Repair</li>
            <li>• Fridge Repair</li>
            <li>• General Plumbing</li>
            <li>• Water Leakage</li>
            <li>• RO Repair & Service</li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-brand-text uppercase tracking-wider mb-2.5">
              Company
            </h3>
            <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs font-semibold text-brand-accent">
              <button onClick={() => navigate('/')} className="hover:underline">Home</button>
              <button onClick={() => navigate('/services')} className="hover:underline">Services</button>
              <button onClick={() => navigate('/about')} className="hover:underline">About Us</button>
              <button onClick={() => navigate('/complaint')} className="hover:underline">Complaint</button>
            </div>
          </div>

          {/* Support Card */}
          <div className="bg-brand-bg/60 p-3.5 sm:p-4 rounded-2xl border border-brand-accent/5 flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent shrink-0">
              <PhoneCall size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-brand-text">Need urgent assistance?</p>
              <p className="text-[9px] sm:text-[10px] text-brand-text/60 font-medium">Get in touch directly via WhatsApp</p>
              <a 
                href={`https://wa.me/${CONFIG.ADMIN_WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[11px] sm:text-xs font-extrabold text-brand-accent hover:underline block mt-0.5"
              >
                Chat with Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full border-t border-brand-text/5 mt-6 pt-4 flex flex-col items-center gap-1 text-[10px] sm:text-xs text-brand-text/40 font-medium text-center">
        <p>© {new Date().getFullYear()} GharPeFix. All rights reserved.</p>
        <p>Built for Tier-2 & Tier-3 Indian Cities</p>
      </div>
    </footer>
  );
}
