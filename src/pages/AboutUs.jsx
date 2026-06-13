import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, Eye, ShieldCheck, Zap, 
  IndianRupee, HeartHandshake, Smile, CheckCircle, Shield
} from 'lucide-react';
import { CONFIG } from '../constants/config';

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col w-full pb-24 select-none overflow-x-hidden">
      {/* Header Hero */}
      <section className="bg-gradient-to-br from-brand-bgSecondary via-brand-bg to-brand-bgSecondary/60 px-4 sm:px-6 py-10 sm:py-12 text-center border-b border-brand-accent/5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center"
        >
          <div className="p-2.5 bg-brand-accent/10 rounded-full text-brand-accent mb-3">
            <Users size={22} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text">About Us</h1>
          <p className="text-[11px] sm:text-xs text-brand-text/65 font-medium mt-2 leading-relaxed max-w-sm">
            Welcome to <span className="font-bold text-brand-accent">GharPeFix</span>. We are dedicated to redefining how home repairs are experienced in Indian Tier-2 & Tier-3 cities.
          </p>
        </motion.div>
      </section>

      {/* Introduction & Mission/Vision */}
      <section className="w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Intro */}
        <div className="bg-brand-bgSecondary p-4 sm:p-6 rounded-2xl border border-brand-accent/5 shadow-soft">
          <h2 className="text-base sm:text-lg font-bold text-brand-text mb-2.5">Who We Are</h2>
          <p className="text-[11px] sm:text-xs text-brand-text/75 leading-relaxed font-medium">
            At GharPeFix, we recognized the everyday struggle of homeowners in smaller cities who cannot easily find trusted electricians, plumbers, or appliance mechanics. By creating a direct, simple connection without cumbersome logins, dashboards, or signup procedures, we bridge the gap between quality technicians and customers instantly.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mission */}
          <div className="bg-brand-bgSecondary p-4 sm:p-6 rounded-2xl border border-brand-accent/5 shadow-soft flex flex-col gap-2.5">
            <div className="p-2.5 bg-brand-accent/10 rounded-xl text-brand-accent w-fit">
              <Target size={20} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-brand-text">Our Mission</h3>
            <p className="text-[10px] sm:text-xs text-brand-text/70 leading-relaxed font-medium">
              To empower local service professionals with regular bookings and respect, while providing homeowners in Tier-2 and Tier-3 cities with professional, dependable, and swift home services.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-brand-bgSecondary p-4 sm:p-6 rounded-2xl border border-brand-accent/5 shadow-soft flex flex-col gap-2.5">
            <div className="p-2.5 bg-brand-accent/10 rounded-xl text-brand-accent w-fit">
              <Eye size={20} />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-brand-text">Our Vision</h3>
            <p className="text-[10px] sm:text-xs text-brand-text/70 leading-relaxed font-medium">
              To become the most trusted and household name for home services in Bharat, ensuring customer peace of mind and technician empowerment through simple technology.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full px-4 sm:px-6 py-4">
        <div className="text-center mb-6">
          <h2 className="text-base sm:text-lg font-extrabold text-brand-text uppercase tracking-wider">Why Choose GharPeFix?</h2>
          <div className="w-10 h-1 bg-brand-accent rounded-full mx-auto mt-2" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            {
              icon: ShieldCheck,
              title: 'Trusted Professionals',
              desc: 'Every service partner goes through background verification and skills validation so you only get the best.'
            },
            {
              icon: Zap,
              title: 'Fast Service',
              desc: 'No more waiting for days. Our booking model matches you with nearby technicians for rapid arrival.'
            },
            {
              icon: IndianRupee,
              title: 'Affordable Pricing',
              desc: 'Transparent pricing schedules. Pay only for what is fixed. No hidden convenience fees or markups.'
            },
            {
              icon: HeartHandshake,
              title: 'Local Support',
              desc: 'Since we operate locally, our helpline and complaint staff are always available to help solve disputes.'
            },
            {
              icon: Smile,
              title: 'Customer Satisfaction',
              desc: 'We guarantee our work. If you are not fully satisfied, we will send an expert to rectify the issue.'
            },
            {
              icon: Shield,
              title: 'Secure & Direct',
              desc: 'No account creation needed. Confirm detail inputs, pay direct to provider, and manage via simple WhatsApp.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-brand-bgSecondary border border-brand-accent/5 p-4 sm:p-5 rounded-2xl shadow-soft hover:shadow-soft-lg hover:border-brand-accent/15 transition-all flex flex-col gap-2.5"
              >
                <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent w-fit">
                  <Icon size={18} />
                </div>
                <h4 className="font-extrabold text-[13px] sm:text-sm text-brand-text">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-brand-text/60 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
