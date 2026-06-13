import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QrCode, Smartphone, Sparkles, ShieldCheck } from 'lucide-react';
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';
import Footer from './components/Footer';
import LocationPopup from './components/LocationPopup';
import BookingForm from './components/BookingForm';

import Home from './pages/Home';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Complaint from './pages/Complaint';
import { CONFIG } from './constants/config';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const routerLocation = useLocation();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [routerLocation.pathname]);

  // Load profile from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('gpf_user_profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      } catch (e) {
        console.error(e);
        setIsLocOpen(true);
      }
    } else {
      // First visit popup
      const timer = setTimeout(() => {
        setIsLocOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLocSubmit = (userProfile) => {
    setProfile(userProfile);
    setIsLocOpen(false);
  };

  const handleOpenBooking = (serviceId = null) => {
    setSelectedServiceId(serviceId);
    setIsBookOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans">
      {/* 1. Desktop & Laptop Restriction Screen */}
      <div className="hidden lg:flex fixed inset-0 z-50 w-full h-full bg-brand-bg items-center justify-center p-8 select-none">
        {/* Soft abstract blurred circles */}
        <div className="absolute w-96 h-96 rounded-full bg-brand-accent/10 top-12 left-12 blur-3xl" />
        <div className="absolute w-96 h-96 rounded-full bg-brand-accent/10 bottom-12 right-12 blur-3xl" />

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
          {/* Left info box */}
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-brand-accent">
                GharPe<span className="text-brand-text">Fix</span>
              </span>
              <div className="flex items-center gap-0.5 bg-brand-accent/10 px-2 py-0.5 rounded-full text-xs text-brand-accent font-semibold">
                <ShieldCheck size={12} />
                <span>Verified</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-brand-text leading-tight">
                📱 Best Experienced <br />on Mobile
              </h1>
              <p className="text-sm font-medium text-brand-text/70 leading-relaxed max-w-sm">
                {CONFIG.COMPANY_NAME} is optimized for a fast, responsive mobile booking experience. Please open this website on your phone for the best experience.
              </p>
            </div>

            {/* QR block */}
            <div className="bg-brand-bgSecondary p-5 rounded-3xl border border-brand-accent/10 flex items-center gap-5 w-fit shadow-soft">
              <div className="p-3 bg-white rounded-2xl border border-brand-accent/10 shadow-sm">
                <QrCode size={100} className="text-brand-text" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-brand-text">Scan QR Code</span>
                <span className="text-[11px] text-brand-text/50 font-medium max-w-[150px]">
                  Scan using your phone's camera to book instant local home services.
                </span>
              </div>
            </div>

            <span className="text-xs text-brand-text/45 font-medium flex items-center gap-1.5 mt-2">
              <Sparkles size={14} className="text-brand-accent" />
              <span>{CONFIG.TAGLINE}</span>
            </span>
          </div>

          {/* Right Phone Mockup displaying live app */}
          <div className="flex justify-center">
            <div className="relative mx-auto border-brand-text/90 bg-brand-text border-[14px] rounded-[3rem] h-[640px] w-[320px] shadow-soft-lg transition-transform duration-300 hover:scale-102">
              {/* Speaker pill */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-brand-text rounded-full z-20" />
              {/* Screen wrap */}
              <div className="rounded-[2.2rem] overflow-hidden w-full h-full bg-brand-bg">
                <iframe 
                  src={window.location.origin + routerLocation.pathname + routerLocation.search} 
                  className="w-full h-full border-none pointer-events-none" 
                  title="GharPeFix Mobile Preview" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mobile & Tablet Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Top Navbar */}
        <Navbar 
          userLocation={profile ? profile.address : ''} 
          onEditLocation={() => setIsLocOpen(true)} 
        />

        {/* Pages Viewport */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBookService={handleOpenBooking} />} />
            <Route path="/services" element={<Services onBookService={handleOpenBooking} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/complaint" element={<Complaint />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Fixed Bottom Navigation */}
        <BottomNavigation />

        {/* Geolocation Setup Modal */}
        <LocationPopup 
          isOpen={isLocOpen} 
          onClose={handleLocSubmit} 
        />

        {/* Booking Form Modal */}
        <BookingForm 
          isOpen={isBookOpen} 
          onClose={() => setIsBookOpen(false)} 
          initialServiceId={selectedServiceId}
        />
      </div>
    </div>
  );
}
