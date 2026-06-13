import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, Phone, Navigation, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export default function LocationPopup({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [locError, setLocError] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Handle detecting location
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingLoc(true);
    setLocError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt reverse geocoding using Nominatim (free, open source)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: {
                'Accept-Language': 'en',
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            const formattedAddress = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setAddress(formattedAddress);
          } else {
            setAddress(`Detected Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          }
        } catch (error) {
          setAddress(`Detected Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } finally {
          setLoadingLoc(false);
        }
      },
      (error) => {
        setLoadingLoc(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocError('Location permission denied. Please enter manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocError('Location request timed out.');
            break;
          default:
            setLocError('An unknown error occurred.');
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!name.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }
    
    // Validate Indian mobile numbers
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!address.trim()) {
      setSubmitError('Please enter or detect your current location.');
      return;
    }

    const profile = {
      name: name.trim(),
      mobile: cleanMobile,
      address: address.trim(),
    };

    localStorage.setItem('gpf_user_profile', JSON.stringify(profile));
    onClose(profile);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm"
        />

        {/* Popup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-brand-bgSecondary rounded-3xl overflow-hidden shadow-soft-lg z-10 border border-brand-accent/10"
        >
          {/* Header illustration and details */}
          <div className="bg-gradient-to-br from-brand-accent to-amber-500 p-6 text-white text-center relative">
            <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3">
              <MapPin size={32} className="text-white animate-bounce" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Set Service Location</h2>
            <p className="text-xs text-white/80 mt-1 font-medium max-w-xs mx-auto">
              Please share your details to book top-rated local service professionals.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {submitError && (
              <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl flex items-start gap-2 text-xs font-semibold">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Full Name Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text/40">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-2xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none transition-all placeholder:text-brand-text/30"
                  required
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text/40">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-2xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none transition-all placeholder:text-brand-text/30"
                  required
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                  Service Address / Location
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={loadingLoc}
                  className="text-xs font-bold text-brand-accent hover:text-brand-accent/80 flex items-center gap-1 transition-colors"
                >
                  {loadingLoc ? (
                    <>
                      <Loader2 size={12} className="animate-spin text-brand-accent" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <Navigation size={12} className="fill-brand-accent stroke-none" />
                      <span>Detect Current</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house number, street details, and city..."
                  className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-2xl py-2.5 px-4 text-sm font-medium focus:outline-none transition-all placeholder:text-brand-text/30 resize-none"
                  required
                />
              </div>

              {locError && (
                <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle size={10} />
                  <span>{locError}</span>
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand-accent hover:bg-brand-accent/95 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition-all duration-200 shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck size={18} />
              <span>Confirm & Proceed</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
