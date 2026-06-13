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
    <div className="flex flex-col w-full pb-24 select-none">
      {/* 1. Header Hero */}
      <section className="bg-gradient-to-br from-brand-bgSecondary via-brand-bg to-brand-bgSecondary/60 px-6 py-12 text-center border-b border-brand-accent/5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <div className="p-2.5 bg-brand-accent/10 rounded-full text-brand-accent mb-3.5">
            <Users size={24} />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-brand-text">About Us</h1>
          <p className="text-xs md:text-sm text-brand-text/65 font-medium mt-2 leading-relaxed">
            Welcome to <span className="font-bold text-brand-accent">GharPeFix</span>. We are dedicated to redefining how home repairs are experienced in Indian Tier-2 & Tier-3 cities.
          </p>
        </motion.div>
      </section>

      {/* 2. Introduction & Mission/Vision */}
      <section className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8 w-full">
        {/* Intro */}
        <div className="bg-brand-bgSecondary p-6 rounded-3xl border border-brand-accent/5 shadow-soft">
          <h2 className="text-lg font-bold text-brand-text mb-3">Who We Are</h2>
          <p className="text-xs text-brand-text/75 leading-relaxed font-medium">
            At GharPeFix, we recognized the everyday struggle of homeowners in smaller cities who cannot easily find trusted electricians, plumbers, or appliance mechanics. By creating a direct, simple connection without cumbersome logins, dashboards, or signup procedures, we bridge the gap between quality technicians and customers instantly.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="bg-brand-bgSecondary p-6 rounded-3xl border border-brand-accent/5 shadow-soft flex flex-col gap-3">
            <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit">
              <Target size={24} />
            </div>
            <h3 className="text-base font-bold text-brand-text">Our Mission</h3>
            <p className="text-xs text-brand-text/70 leading-relaxed font-medium">
              To empower local service professionals with regular bookings and respect, while providing homeowners in Tier-2 and Tier-3 cities with professional, dependable, and swift home services.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-brand-bgSecondary p-6 rounded-3xl border border-brand-accent/5 shadow-soft flex flex-col gap-3">
            <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit">
              <Eye size={24} />
            </div>
            <h3 className="text-base font-bold text-brand-text">Our Vision</h3>
            <p className="text-xs text-brand-text/70 leading-relaxed font-medium">
              To become the most trusted and household name for home services in Bharat, ensuring customer peace of mind and technician empowerment through simple technology.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="max-w-4xl mx-auto px-6 py-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-lg font-extrabold text-brand-text uppercase tracking-wider">Why Choose GharPeFix?</h2>
          <div className="w-12 h-1 bg-brand-accent rounded-full mx-auto mt-2" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
                className="bg-brand-bgSecondary border border-brand-accent/5 p-5 rounded-3xl shadow-soft hover:shadow-soft-lg hover:border-brand-accent/15 transition-all flex flex-col gap-3"
              >
                <div className="p-2.5 bg-brand-accent/10 rounded-xl text-brand-accent w-fit">
                  <Icon size={20} />
                </div>
                <h4 className="font-extrabold text-sm text-brand-text">{item.title}</h4>
                <p className="text-xs text-brand-text/60 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
