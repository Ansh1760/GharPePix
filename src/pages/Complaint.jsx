import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, User, Phone, Tag, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { sendComplaintToWhatsApp } from '../utils/whatsapp';

const COMPLAINT_CATEGORIES = [
  'Service Quality Issue',
  'Technician Delay/No Show',
  'Pricing Dispute / Overcharging',
  'Technician Behavior',
  'Appliance Damaged During Service',
  'Other Issues',
];

export default function Complaint() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    bookingId: '',
    category: COMPLAINT_CATEGORIES[0],
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill details from local storage
  useEffect(() => {
    const stored = localStorage.getItem('gpf_user_profile');
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          name: profile.name || '',
          mobile: profile.mobile || '',
        }));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      newErrors.mobile = 'A valid 10-digit mobile number is required';
    }
    
    if (!formData.category) newErrors.category = 'Please select a complaint category';
    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your complaint or issue in detail';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    sendComplaintToWhatsApp({
      name: formData.name.trim(),
      mobile: formData.mobile.replace(/\D/g, ''),
      bookingId: formData.bookingId.trim(),
      category: formData.category,
      description: formData.description.trim(),
    });

    setSubmitted(true);
    saveProfileToStorage();
    
    setFormData((prev) => ({ ...prev, description: '' }));
    setTimeout(() => setSubmitted(false), 5000);
  };

  const saveProfileToStorage = () => {
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
        mobile: formData.mobile.replace(/\D/g, ''),
      })
    );
  };

  return (
    <div className="flex flex-col w-full pb-24 select-none overflow-x-hidden">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-bgSecondary via-brand-bg to-brand-bgSecondary/60 px-4 sm:px-6 py-10 sm:py-12 text-center border-b border-brand-accent/5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center"
        >
          <div className="p-2.5 bg-brand-accent/10 rounded-full text-brand-accent mb-3 animate-pulse">
            <Megaphone size={22} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text">Submit a Complaint</h1>
          <p className="text-[10px] sm:text-xs text-brand-text/65 font-medium mt-2 leading-relaxed max-w-xs">
            Faced an issue with your service? Let us know. Your complaints are sent directly to the support desk via WhatsApp.
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section className="w-full px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-brand-bgSecondary p-4 sm:p-6 rounded-2xl border border-brand-accent/10 shadow-soft w-full"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-8 flex flex-col items-center gap-3"
              >
                <div className="p-3 sm:p-4 bg-green-500/10 text-green-500 rounded-full">
                  <CheckCircle size={36} className="animate-bounce" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-brand-text">Redirecting to WhatsApp...</h3>
                <p className="text-[10px] sm:text-xs text-brand-text/60 max-w-xs leading-relaxed font-medium">
                  We are opening WhatsApp to submit your complaint. If the chat window did not open, please verify browser popups.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 bg-brand-accent hover:bg-brand-accent/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  File another complaint
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aman Gupta"
                      className={`w-full bg-brand-bg border ${errors.name ? 'border-red-400' : 'border-brand-accent/10'} focus:border-brand-accent rounded-2xl py-3 pl-10 pr-4 text-sm font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 text-brand-text`}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[9px] sm:text-[10px] text-red-500 font-semibold mt-0.5">{errors.name}</span>
                  )}
                </div>

                {/* Mobile */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-brand-bg border ${errors.mobile ? 'border-red-400' : 'border-brand-accent/10'} focus:border-brand-accent rounded-2xl py-3 pl-10 pr-4 text-sm font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 text-brand-text`}
                    />
                  </div>
                  {errors.mobile && (
                    <span className="text-[9px] sm:text-[10px] text-red-500 font-semibold mt-0.5">{errors.mobile}</span>
                  )}
                </div>

                {/* Booking ID */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                    Booking ID <span className="text-brand-text/40 lowercase italic font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text/40">
                      <Tag size={16} />
                    </span>
                    <input
                      type="text"
                      value={formData.bookingId}
                      onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                      placeholder="e.g. GPF-10349"
                      className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-2xl py-3 pl-10 pr-4 text-sm font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 text-brand-text"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                    Complaint Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-accent/10 focus:border-brand-accent rounded-2xl py-3 px-3 text-sm font-semibold focus:outline-none transition-all text-brand-text appearance-none"
                  >
                    {COMPLAINT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] sm:text-xs font-bold text-brand-text/75 uppercase tracking-wide">
                    Complaint Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detail your complaint. What happened? Include tech details if available..."
                    className={`w-full bg-brand-bg border ${errors.description ? 'border-red-400' : 'border-brand-accent/10'} focus:border-brand-accent rounded-2xl py-3 px-4 text-sm font-semibold focus:outline-none transition-all placeholder:text-brand-text/30 resize-none text-brand-text`}
                  />
                  {errors.description && (
                    <span className="text-[9px] sm:text-[10px] text-red-500 font-semibold mt-0.5">{errors.description}</span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-accent/95 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition-all duration-200 shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 mt-1 active:scale-[0.98]"
                >
                  <Send size={14} className="fill-white stroke-none" />
                  <span>Submit Complaint via WhatsApp</span>
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
