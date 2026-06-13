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
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col w-full pb-24 select-none overflow-x-hidden">
      {/* Top Carousel Banner */}
      <section className="px-3 sm:px-4 pt-3 sm:pt-4 w-full">
        <div className="relative w-full aspect-[2.2/1] sm:aspect-[2.5/1] rounded-2xl overflow-hidden shadow-soft border border-brand-accent/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 w-full h-full flex items-center p-4 sm:p-5 overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
              />
              <div className="absolute inset-0 bg-brand-text/70" />

              {/* Tagline */}
              <div className="z-10 flex flex-col gap-1.5 text-left max-w-[90%] sm:max-w-[85%]">
                <span className="text-[8px] sm:text-[9px] uppercase font-extrabold tracking-wider text-brand-accent flex items-center gap-1 bg-brand-accent/10 w-fit px-1.5 sm:px-2 py-0.5 rounded-md">
                  <Sparkles size={9} className="text-brand-accent animate-pulse" />
                  <span>Featured Service</span>
                </span>
                <h2 className="text-xs sm:text-sm font-extrabold text-white leading-snug pr-2 drop-shadow-md">
                  {SLIDES[currentSlide].tagline}
                </h2>
              </div>

              {/* Dots */}
              <div className="absolute bottom-2.5 right-3 flex gap-1.5 z-20">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'bg-brand-accent w-3' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-bgSecondary via-brand-bg to-brand-bgSecondary/60 px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center justify-center text-center overflow-hidden border-b border-brand-accent/5">
        {/* Background blobs */}
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-brand-accent/5 -top-16 -left-16 blur-3xl" />
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-brand-accent/5 -bottom-16 -right-16 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center z-10"
        >
          {/* Trust Banner */}
          <div className="inline-flex items-center gap-1.5 bg-brand-accent/10 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-brand-accent mb-3">
            <Sparkles size={12} className="animate-pulse" />
            <span>Premium Local Service Partners</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text leading-tight tracking-tight w-full">
            Professional Home Services <span className="text-brand-accent">At Your Doorstep</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-text/70 mt-2.5 font-medium w-full max-w-sm">
            Electrician, Plumbing, Appliance Repair & More in Tier-2 and Tier-3 Indian Cities.
          </p>

          {/* Quick Search */}
          <div className="relative w-full max-w-md mt-6 shadow-soft bg-white rounded-2xl border border-brand-accent/10 flex items-center px-3 py-1.5 hover:border-brand-accent/30 focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <Search className="text-brand-text/40 shrink-0" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. fan repair, plumber..."
              className="w-full bg-transparent border-none py-2 px-2.5 text-sm font-medium focus:outline-none placeholder:text-brand-text/30"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-brand-text/40 hover:text-brand-text px-2 shrink-0"
              >
                Clear
              </button>
            )}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-6 w-full justify-center flex-wrap">
            <a
              href="tel:+919838841695"
              className="bg-green-500 hover:bg-green-600 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <PhoneCall size={16} className="animate-pulse" />
              <span>Call Now</span>
            </a>
            <button
              onClick={scrollToServices}
              className="bg-brand-bgSecondary border border-brand-accent/20 hover:border-brand-accent/40 text-brand-text font-bold text-sm px-5 py-3 rounded-2xl transition-all active:scale-95"
            >
              View Services
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trust Elements */}
      <section className="w-full px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { icon: Shield, title: 'Verified Pros', desc: 'Background checked & certified' },
            { icon: Clock, title: '45-Min Arrival', desc: 'Fast turnaround nearby' },
            { icon: Sparkles, title: 'Flat Pricing', desc: 'No hidden fees at all' },
            { icon: Smile, title: 'Guaranteed', desc: 'We fix it right always' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-brand-bgSecondary/60 p-3 sm:p-4 rounded-2xl border border-brand-accent/5 flex gap-2.5 items-start">
                <div className="p-1.5 sm:p-2 bg-brand-accent/10 rounded-xl text-brand-accent shrink-0">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-[11px] sm:text-xs text-brand-text leading-tight">{item.title}</h4>
                  <p className="text-[9px] sm:text-[10px] text-brand-text/55 font-medium mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="w-full px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-text">Our Services</h2>
            <p className="text-[10px] sm:text-xs text-brand-text/50 font-medium">Choose from our verified local technicians</p>
          </div>

          {searchQuery && (
            <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold self-start">
              Results for "{searchQuery}"
            </span>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 border ${
                selectedCategory === cat
                  ? 'bg-brand-accent text-white border-brand-accent shadow-sm shadow-brand-accent/10'
                  : 'bg-brand-bgSecondary border-brand-accent/5 hover:border-brand-accent/20 text-brand-text/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredServices.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3"
          >
            {filteredServices.map((service) => {
              const ServiceIcon = IconMap[service.iconName] || Wrench;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="bg-brand-bgSecondary border border-brand-accent/5 hover:border-brand-accent/20 rounded-2xl p-4 flex flex-col justify-between shadow-soft group transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="p-2.5 bg-brand-accent/10 rounded-xl text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                        <ServiceIcon size={20} />
                      </div>
                      <div className="flex items-center gap-1 bg-brand-bg px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold text-brand-text shadow-sm border border-brand-accent/5">
                        <Star size={10} className="fill-brand-accent stroke-brand-accent" />
                        <span>{service.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-[13px] sm:text-sm text-brand-text mb-1 group-hover:text-brand-accent transition-colors leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-brand-text/60 font-medium leading-relaxed mb-3 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-accent/5 pt-3 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-brand-text/40 font-bold">Starts from</span>
                      <span className="text-[13px] sm:text-sm font-extrabold text-brand-text">{service.basePrice}</span>
                    </div>
                    <button
                      onClick={() => onBookService(service.id)}
                      className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-accent/10 active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="w-full text-center py-10 bg-brand-bgSecondary/40 rounded-2xl border border-dashed border-brand-accent/10 mt-3 flex flex-col items-center justify-center">
            <p className="text-sm font-bold text-brand-text/60">No services found.</p>
            <p className="text-xs text-brand-text/40 mt-1 font-medium">Try clearing filters or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 bg-brand-accent/10 hover:bg-brand-accent/15 text-brand-accent text-xs font-bold px-4 py-2 rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Mini Banner */}
      <section className="w-full px-4 sm:px-6 py-6 mt-4">
        <div className="bg-gradient-to-br from-brand-bgSecondary to-brand-bgSecondary/70 p-5 sm:p-6 rounded-2xl border border-brand-accent/10 flex flex-col items-center text-center gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-extrabold text-base sm:text-lg text-brand-text">Booking takes less than 60 seconds!</h3>
            <p className="text-[10px] sm:text-xs text-brand-text/60 font-medium max-w-sm">
              Choose your service, fill in your address & slot, and book instantly. No OTPs, no logins.
            </p>
          </div>
          <button
            onClick={() => onBookService()}
            className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-brand-accent/20 shrink-0 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Book A Service Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}
