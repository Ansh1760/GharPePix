import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Wrench, PhoneCall, Info, AlertCircle } from 'lucide-react';

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Services', path: '/services', icon: Wrench },
    { label: 'Call Now', isAction: true, icon: PhoneCall },
    { label: 'About Us', path: '/about', icon: Info },
    { label: 'Complaint', path: '/complaint', icon: AlertCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-bgSecondary/95 backdrop-blur-lg border-t border-brand-accent/10 px-2 py-2 shadow-soft-lg flex justify-around items-center md:max-w-md md:mx-auto md:bottom-4 md:rounded-3xl md:border md:shadow-2xl">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        
        if (item.isAction) {
          return (
            <a
              key={idx}
              href="tel:+919838841695"
              className="relative -top-5 flex flex-col items-center justify-center group"
              aria-label="Call Now"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 border-4 border-brand-bgSecondary group-hover:bg-green-600 transition-colors duration-200"
              >
                <Icon size={24} className="stroke-[2.5]" />
              </motion.div>
              <span className="text-[10px] font-bold text-green-500 mt-0.5 tracking-wide">
                Call Now
              </span>
            </a>
          );
        }

        const isActive = currentPath === item.path;

        return (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center py-1 px-3 relative w-16 group"
          >
            <div className={`relative p-1 rounded-xl transition-all duration-200 ${isActive ? 'text-brand-accent' : 'text-brand-text/60 group-hover:text-brand-text'}`}>
              <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[2]'} />
            </div>
            
            <span className={`text-[10px] font-medium tracking-tight transition-colors duration-200 ${isActive ? 'text-brand-accent font-bold' : 'text-brand-text/60 group-hover:text-brand-text'}`}>
              {item.label}
            </span>

            {/* Active Indicator Bar */}
            {isActive && (
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute -bottom-1 w-6 h-1 bg-brand-accent rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

