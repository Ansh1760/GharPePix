import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, AlertCircle, Wrench } from 'lucide-react';
import { SERVICES } from '../constants/config';

const CATEGORIES = ['All', 'Electrical', 'Appliances', 'Plumbing', 'Water Systems'];

export default function Services({ onBookService }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services by category and search query
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
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 26 } }
  };

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-6 select-none max-w-lg mx-auto sm:max-w-2xl">
      {/* Search Header */}
      <div className="flex flex-col gap-2 mb-6 text-left">
        <h1 className="text-xl font-extrabold tracking-tight text-brand-text">
          Our Services
        </h1>
        <p className="text-xs text-brand-text/50 font-medium">
          Professional home maintenance at flat rates.
        </p>

        {/* Search Input */}
        <div className="relative w-full mt-2 shadow-soft bg-brand-bgSecondary rounded-2xl border border-brand-accent/5 flex items-center px-3.5 py-1 focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/5 transition-all">
          <Search className="text-brand-text/30 shrink-0" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electrician, plumbing, RO..."
            className="w-full bg-transparent border-none py-2 px-2.5 text-xs font-semibold focus:outline-none placeholder:text-brand-text/30 text-brand-text"
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

      {/* Category Horizontal Bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-4 scrollbar-none select-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              selectedCategory === cat
                ? 'bg-brand-accent text-white border-brand-accent shadow-sm shadow-brand-accent/10'
                : 'bg-brand-bgSecondary border-brand-accent/5 hover:border-brand-accent/15 text-brand-text/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid (2-column mobile layout) */}
      {filteredServices.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3.5 mt-2"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => onBookService(service.id)}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer bg-brand-bgSecondary border border-brand-accent/5 hover:border-brand-accent/15 rounded-[22px] overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-md transition-all group relative"
            >
              {/* Service Card Image */}
              <div className="relative w-full h-28 sm:h-36 overflow-hidden bg-brand-bg/50">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Rating Badge Overlay */}
                <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-brand-bg/90 backdrop-blur-sm px-1.5 py-0.5 rounded-lg text-[9px] font-bold text-brand-text border border-brand-accent/5 shadow-sm">
                  <Star size={10} className="fill-brand-accent stroke-brand-accent" />
                  <span>{service.rating}</span>
                </div>
              </div>

              {/* Service Body */}
              <div className="p-3 flex flex-col gap-1 text-left flex-grow">
                <h3 className="font-extrabold text-[12px] leading-tight text-brand-text group-hover:text-brand-accent transition-colors line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-[10px] text-brand-text/50 font-medium leading-normal line-clamp-2 h-7">
                  {service.description}
                </p>
              </div>

              {/* Card Footer: pricing & button */}
              <div className="px-3 pb-3 pt-2 border-t border-brand-accent/5 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-wider text-brand-text/45 font-bold">Starts from</span>
                  <span className="text-[12px] font-extrabold text-brand-text">{service.basePrice}</span>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid double trigger from card wrapper onClick
                    onBookService(service.id);
                  }}
                  className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-xl transition-all shadow-sm shadow-brand-accent/10"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="w-full text-center py-12 bg-brand-bgSecondary/40 rounded-3xl border border-dashed border-brand-accent/10 mt-4 flex flex-col items-center justify-center">
          <AlertCircle size={32} className="text-brand-text/30 mb-2" />
          <p className="text-xs font-bold text-brand-text/60">No matching services found.</p>
          <p className="text-[10px] text-brand-text/45 mt-1 font-medium">Please verify spelling or search filter.</p>
        </div>
      )}
    </div>
  );
}
