import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, AlertCircle, Wrench } from 'lucide-react';
import { SERVICES } from '../constants/config';

const CATEGORIES = ['All', 'Electrical', 'Appliances', 'Plumbing', 'Water Systems'];

export default function Services({ onBookService }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services
  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 26 } }
  };

  return (
    <div className="flex flex-col w-full pb-24 px-3 sm:px-4 pt-4 sm:pt-6 select-none overflow-x-hidden">
      {/* Search Header */}
      <div className="flex flex-col gap-2 mb-5 text-left">
        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-text">
          Our Services
        </h1>
        <p className="text-[10px] sm:text-xs text-brand-text/50 font-medium">
          Professional home maintenance at flat rates.
        </p>

        {/* Search Input */}
        <div className="relative w-full mt-1 shadow-soft bg-brand-bgSecondary rounded-2xl border border-brand-accent/5 flex items-center px-3 py-1 focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/5 transition-all">
          <Search className="text-brand-text/30 shrink-0" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electrician, plumbing, RO..."
            className="w-full bg-transparent border-none py-2 px-2 text-sm font-semibold focus:outline-none placeholder:text-brand-text/30 text-brand-text"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[10px] font-bold text-brand-text/40 hover:text-brand-text px-1 shrink-0"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-none -mx-3 px-3 sm:-mx-4 sm:px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 border ${
              selectedCategory === cat
                ? 'bg-brand-accent text-white border-brand-accent shadow-sm shadow-brand-accent/10'
                : 'bg-brand-bgSecondary border-brand-accent/5 hover:border-brand-accent/15 text-brand-text/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => onBookService(service.id)}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer bg-brand-bgSecondary border border-brand-accent/5 hover:border-brand-accent/15 rounded-2xl overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-md transition-all group relative"
            >
              {/* Service Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-bg/50">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-brand-bg/90 backdrop-blur-sm px-1.5 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-bold text-brand-text border border-brand-accent/5 shadow-sm">
                  <Star size={9} className="fill-brand-accent stroke-brand-accent" />
                  <span>{service.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-2.5 sm:p-3 flex flex-col gap-0.5 text-left flex-grow">
                <h3 className="font-extrabold text-[11px] sm:text-[12px] leading-tight text-brand-text group-hover:text-brand-accent transition-colors line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-brand-text/50 font-medium leading-snug line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Footer */}
              <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 pt-2 border-t border-brand-accent/5 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-brand-text/45 font-bold">From</span>
                  <span className="text-[11px] sm:text-[12px] font-extrabold text-brand-text">{service.basePrice}</span>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookService(service.id);
                  }}
                  className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-brand-accent/10 active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="w-full text-center py-10 bg-brand-bgSecondary/40 rounded-2xl border border-dashed border-brand-accent/10 mt-3 flex flex-col items-center justify-center">
          <AlertCircle size={28} className="text-brand-text/30 mb-2" />
          <p className="text-xs font-bold text-brand-text/60">No matching services found.</p>
          <p className="text-[10px] text-brand-text/45 mt-1 font-medium">Please verify spelling or search filter.</p>
        </div>
      )}
    </div>
  );
}
