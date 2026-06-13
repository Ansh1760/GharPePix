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
    { label: 'About', path: '/about', icon: Info },
    { label: 'Complaint', path: '/complaint', icon: AlertCircle },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-brand-bgSecondary/95 backdrop-blur-lg border-t border-brand-accent/10 shadow-soft-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="w-full px-1 py-1.5 flex justify-around items-end">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          
          if (item.isAction) {
            return (
              <a
                key={idx}
                href="tel:+919838841695"
                className="relative -top-4 flex flex-col items-center justify-center group"
                aria-label="Call Now"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 border-[3px] border-brand-bgSecondary group-hover:bg-green-600 transition-colors duration-200"
                >
                  <Icon size={20} className="stroke-[2.5]" />
                </motion.div>
                <span className="text-[9px] sm:text-[10px] font-bold text-green-500 mt-0.5 tracking-wide">
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
              className="flex flex-col items-center justify-center py-1 px-1 sm:px-2 relative group min-w-[48px] min-h-[44px]"
            >
              <div className={`relative p-1 rounded-xl transition-all duration-200 ${isActive ? 'text-brand-accent' : 'text-brand-text/60 group-hover:text-brand-text'}`}>
                <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-[2]'} />
              </div>
              
              <span className={`text-[9px] sm:text-[10px] font-medium tracking-tight transition-colors duration-200 leading-tight ${isActive ? 'text-brand-accent font-bold' : 'text-brand-text/60 group-hover:text-brand-text'}`}>
                {item.label}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -bottom-0.5 w-5 h-0.5 bg-brand-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
