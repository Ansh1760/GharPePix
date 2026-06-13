import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Cable, Sliders, BatteryCharging, Wind, Snowflake, CupSoda, 
  Wrench, Pipette, Droplet, ShieldAlert, Cog, Settings, Database, Filter,
  Star, Search, ArrowRight, Shield, Clock, Sparkles, Smile, PhoneCall
} from 'lucide-react';
import { SERVICES, CONFIG } from '../constants/config';

// Icon mapping to render Lucide React icons dynamically
const IconMap = {
  Zap, Cable, Sliders, BatteryCharging, Wind, Snowflake, CupSoda, 
  Wrench, Pipette, Droplet, ShieldAlert, Cog, Settings, Database, Filter
};

const CATEGORIES = ['All', 'Electrical', 'Appliances', 'Plumbing', 'Water Systems'];

const SLIDES = [
  {
    tagline: "⚡ Shocked by electrical issues? Get certified electricians at your doorstep!",
    image: "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    tagline: "🚰 Leaky pipes or tap troubles? Hire expert plumbers starting at ₹89!",
    image: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    tagline: "❄️ Fridge not cooling? Refrigerator repairs and gas filling done at home!",
    image: "https://images.pexels.com/photos/5824519/pexels-photo-5824519.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    tagline: "🌀 Summer heat beating down? Fan & Desert Cooler installations instantly!",
    image: "https://images.pexels.com/photos/1076583/pexels-photo-1076583.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function Home({ onBookService }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const servicesRef = useRef(null);
  const location = useLocation();

  // Autoplay Slider Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Filter services by category and search query
  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (location.pathname === '/services') {
      scrollToServices();
    }
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col w-full pb-20 select-none">
      {/* Top Carousel Banner Section */}
      <section className="px-4 pt-4 w-full max-w-lg mx-auto sm:max-w-2xl select-none">
        <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden shadow-soft border border-brand-accent/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 w-full h-full flex items-center p-5 relative overflow-hidden"
            >
              {/* Background Image with Dark overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-102"
                style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
              />
              <div className="absolute inset-0 bg-brand-text/70 backdrop-blur-[1px]" />

              {/* Tagline Content */}
              <div className="z-10 flex flex-col gap-2 text-left max-w-[85%]">
                <span className="text-[9px] uppercase font-extrabold tracking-wider text-brand-accent flex items-center gap-1.5 bg-brand-accent/10 w-fit px-2 py-0.5 rounded-md">
                  <Sparkles size={10} className="text-brand-accent animate-pulse" />
                  <span>Featured Service</span>
                </span>
                <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug pr-4 drop-shadow-md">
                  {SLIDES[currentSlide].tagline}
                </h2>
              </div>

              {/* Dots indicators */}
              <div className="absolute bottom-3 right-4 flex gap-1.5 z-20">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'bg-brand-accent w-3.5' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-bgSecondary via-brand-bg to-brand-bgSecondary/60 px-6 py-10 md:py-16 flex flex-col items-center justify-center text-center overflow-hidden border-b border-brand-accent/5">
        {/* Subtle background decoration */}
        <div className="absolute w-72 h-72 rounded-full bg-brand-accent/5 -top-24 -left-24 blur-3xl" />
        <div className="absolute w-72 h-72 rounded-full bg-brand-accent/5 -bottom-24 -right-24 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl flex flex-col items-center z-10"
        >
          {/* Trust Banner */}
          <div className="inline-flex items-center gap-1.5 bg-brand-accent/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-accent mb-4">
            <Sparkles size={14} className="animate-pulse" />
            <span>Premium Local Service Partners</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-text leading-tight tracking-tight max-w-2xl">
            Professional Home Services <span className="text-brand-accent">At Your Doorstep</span>
          </h1>
          <p className="text-sm md:text-lg text-brand-text/70 mt-3.5 font-medium max-w-xl">
            Electrician, Plumbing, Appliance Repair & More in Tier-2 and Tier-3 Indian Cities.
          </p>

          {/* Quick Search */}
          <div className="relative w-full max-w-lg mt-8 shadow-soft bg-white rounded-2xl border border-brand-accent/10 flex items-center px-4 py-2 hover:border-brand-accent/30 focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <Search className="text-brand-text/40 shrink-0" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. fan repair, water motor, plumber..."
              className="w-full bg-transparent border-none py-2 px-3 text-sm font-medium focus:outline-none placeholder:text-brand-text/30"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-brand-text/40 hover:text-brand-text px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex gap-4 mt-8 w-full justify-center">
            <a
              href="tel:+919838841695"
              className="bg-green-500 hover:bg-green-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <PhoneCall size={18} className="animate-pulse" />
              <span>Call Now</span>
            </a>
            <button
              onClick={scrollToServices}
              className="bg-brand-bgSecondary border border-brand-accent/20 hover:border-brand-accent/40 text-brand-text font-bold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-105 active:scale-95"
            >
              View Services
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. Trust Elements */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Shield, title: 'Verified Pros', desc: 'Background checked & certified technicians' },
            { icon: Clock, title: '45-Min Arrival', desc: 'Fast turnaround in your neighborhood' },
            { icon: Sparkles, title: 'Flat Pricing', desc: 'No hidden fees or unexpected costs' },
            { icon: Smile, title: 'Satisfaction Guaranteed', desc: 'We fix it right, or make it right' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-brand-bgSecondary/60 p-4 rounded-2xl border border-brand-accent/5 flex gap-3.5 items-start">
                <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-brand-text">{item.title}</h4>
                  <p className="text-[10px] text-brand-text/55 font-medium mt-0.5 leading-normal">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Services Grid section */}
      <section ref={servicesRef} className="max-w-6xl mx-auto px-6 py-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-text">Our Services</h2>
            <p className="text-xs text-brand-text/50 font-medium">Choose from our verified local technicians</p>
          </div>

          {/* Search indicator */}
          {searchQuery && (
            <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-xs font-bold">
              Showing results for "{searchQuery}"
            </span>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none select-none -mx-6 px-6 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 shadow-soft border ${
                selectedCategory === cat
                  ? 'bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/10'
                  : 'bg-brand-bgSecondary border-brand-accent/5 hover:border-brand-accent/20 text-brand-text/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        {filteredServices.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4"
          >
            {filteredServices.map((service) => {
              const ServiceIcon = IconMap[service.iconName] || Wrench;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-brand-bgSecondary border border-brand-accent/5 hover:border-brand-accent/20 rounded-3xl p-5 flex flex-col justify-between shadow-soft hover:shadow-soft-lg group transition-all"
                >
                  <div>
                    {/* Header: Icon & rating */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                        <ServiceIcon size={24} />
                      </div>
                      <div className="flex items-center gap-1 bg-brand-bg px-2.5 py-1 rounded-xl text-[10px] font-bold text-brand-text shadow-sm border border-brand-accent/5">
                        <Star size={12} className="fill-brand-accent stroke-brand-accent" />
                        <span>{service.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-sm text-brand-text mb-1.5 group-hover:text-brand-accent transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-brand-text/60 font-medium leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-accent/5 pt-3.5 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-brand-text/40 font-bold">Starts from</span>
                      <span className="text-sm font-extrabold text-brand-text">{service.basePrice}</span>
                    </div>
                    <button
                      onClick={() => onBookService(service.id)}
                      className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-brand-accent/10 group-hover:scale-105 active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="w-full text-center py-12 bg-brand-bgSecondary/40 rounded-3xl border border-dashed border-brand-accent/10 mt-4 flex flex-col items-center justify-center">
            <AlertCircle size={36} className="text-brand-text/30 mb-2" />
            <p className="text-sm font-bold text-brand-text/60">No services found.</p>
            <p className="text-xs text-brand-text/40 mt-1 font-medium">Try clearing filters or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 bg-brand-accent/10 hover:bg-brand-accent/15 text-brand-accent text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Mini Banner: Easy Booking Steps */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full mt-6">
        <div className="bg-gradient-to-br from-brand-bgSecondary to-brand-bgSecondary/70 p-6 md:p-8 rounded-3xl border border-brand-accent/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <h3 className="font-extrabold text-lg text-brand-text">Booking takes less than 60 seconds!</h3>
            <p className="text-xs text-brand-text/60 font-medium max-w-md">
              Choose your service, fill in your address & slot, select cash/online payment and book instantly. No OTPs, no logins.
            </p>
          </div>
          <button
            onClick={() => onBookService()}
            className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-accent/20 shrink-0 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Book A Service Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
