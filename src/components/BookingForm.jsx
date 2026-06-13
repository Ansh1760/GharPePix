import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Send, ShieldCheck, User, MapPin, AlertCircle, Wrench, FileText } from 'lucide-react';
import { sendBookingToWhatsApp } from '../utils/whatsapp';
import { SERVICES } from '../constants/config';

export default function BookingForm({ isOpen, onClose, initialServiceId }) {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    description: '',
    address: '',
    landmark: '',
    date: '',
    time: 'Morning (9 AM - 12 PM)',
  });

  const [errors, setErrors] = useState({});

  // Populate from local storage and initial service on open
  useEffect(() => {
    if (isOpen) {
      // 1. Check local storage
      const stored = localStorage.getItem('gpf_user_profile');
      let profile = {};
      if (stored) {
        try {
          profile = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Resolve initial service selection
      let defaultServiceName = SERVICES[0].name;
      if (initialServiceId) {
        const found = SERVICES.find((s) => s.id === initialServiceId);
        if (found) {
          defaultServiceName = found.name;
        }
      }

      setFormData({
        name: profile.name || '',
        service: defaultServiceName,
        description: '',
        address: profile.address || '',
        landmark: profile.landmark || '',
        date: new Date().toISOString().split('T')[0], // Default to today
        time: 'Morning (9 AM - 12 PM)',
      });
      setErrors({});
    }
  }, [isOpen, initialServiceId]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.service) newErrors.service = 'Service is required';
    if (!formData.description.trim()) newErrors.description = 'Please detail the issue';
    if (!formData.address.trim()) newErrors.address = 'Detailed address is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time slot is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger WhatsApp redirect using the helper
    sendBookingToWhatsApp(formData);

    // Save profile to local storage to make future entries easy
    const stored = localStorage.getItem('gpf_user_profile');
    let existingProfile = {};
    if (stored) {
      try {
        existingProfile = JSON.parse(stored);
      } catch (e) {}
    }
    localStorage.setItem(
      'gpf_user_profile',
      JSON.stringify({
        ...existingProfile,
        name: formData.name.trim(),
        address: formData.address.trim(),
        landmark: formData.landmark.trim(),
      })
    );

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm"
        />

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-brand-bgSecondary rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-soft-lg z-10 border border-brand-accent/10 flex flex-col max-h-[92vh] sm:max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-accent/10 bg-brand-bg">
            <div className="text-left">
              <h2 className="text-base font-extrabold text-brand-text flex items-center gap-1.5">
                <Wrench size={18} className="text-brand-accent animate-spin-slow" />
                <span>Book Service Now</span>
              </h2>
              <p className="text-[10px] text-brand-text/50 font-semibold">Enter details to send booking on WhatsApp</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-brand-accent/15 text-brand-text/60 hover:text-brand-accent transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-5 text-left">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40">
                    <User size={14} />
                  </span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aman Gupta"
                    className={`w-full bg-brand-bg border ${errors.name ? 'border-red-400' : 'border-brand-accent/10'} focus:border-brand-accent rounded-xl py-2.5 pl-9 pr-3.5 text-xs font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 text-brand-text`}
                    required
                  />
                </div>
                {errors.name && (
                  <span className="text-[9px] text-red-500 font-semibold">{errors.name}</span>
                )}
              </div>

              {/* What needs to be fixed */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider">
                  What needs to be fixed?
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none transition-all text-brand-text"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>

              {/* Issue Description */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider">
                  What is the issue?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-brand-text/40">
                    <FileText size={14} />
                  </span>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe problem (e.g. Fan is making loud noise and regulator has stopped working)"
                    className={`w-full bg-brand-bg border ${errors.description ? 'border-red-400' : 'border-brand-accent/10'} focus:border-brand-accent rounded-xl py-2.5 pl-9 pr-3.5 text-xs font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 resize-none text-brand-text`}
                    required
                  />
                </div>
                {errors.description && (
                  <span className="text-[9px] text-red-500 font-semibold">{errors.description}</span>
                )}
              </div>

              {/* Detailed Address */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider">
                  Detailed Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-brand-text/40">
                    <MapPin size={14} />
                  </span>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Flat No, Street, Colony, Landmark, City"
                    className={`w-full bg-brand-bg border ${errors.address ? 'border-red-400' : 'border-brand-accent/10'} focus:border-brand-accent rounded-xl py-2.5 pl-9 pr-3.5 text-xs font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 resize-none text-brand-text`}
                    required
                  />
                </div>
                {errors.address && (
                  <span className="text-[9px] text-red-500 font-semibold">{errors.address}</span>
                )}
              </div>

              {/* Landmark */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider">
                  Landmark (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40">
                    <MapPin size={14} className="text-brand-accent/70" />
                  </span>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="e.g. Near Hanuman Temple / Behind City Plaza"
                    className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-xl py-2.5 pl-9 pr-3.5 text-xs font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 text-brand-text"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} className="text-brand-accent" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none transition-all text-brand-text"
                    required
                  />
                </div>

                {/* Time slot */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-brand-text/70 uppercase tracking-wider flex items-center gap-1">
                    <Clock size={12} className="text-brand-accent" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none transition-all text-brand-text"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9-12)</option>
                    <option value="Afternoon (12 PM - 3 PM)">Afternoon (12-3)</option>
                    <option value="Evening (3 PM - 6 PM)">Evening (3-6)</option>
                    <option value="Late Evening (6 PM - 9 PM)">Evening (6-9)</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Action buttons */}
          <div className="px-5 py-4 border-t border-brand-accent/10 bg-brand-bg flex items-center justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-brand-accent hover:bg-brand-accent/95 text-white font-extrabold text-xs py-3 px-6 rounded-2xl transition-all shadow-md shadow-brand-accent/15 flex items-center gap-1.5"
            >
              <span>Book on WhatsApp</span>
              <Send size={12} className="fill-white stroke-none" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
