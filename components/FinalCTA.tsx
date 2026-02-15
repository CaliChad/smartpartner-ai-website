'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { usePayment } from '@/components/payment/PaymentProvider';

export default function FinalCTA() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  const { openPaymentModal } = usePayment();

  const features = [
    'No long-term contracts',
    '30-day support included',
    'Custom solutions, not templates',
    'Built by certified automation experts',
  ];

  return (
    <section className="relative py-24 px-6 bg-dark overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <AnimatedSection>
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Ready to Automate</span>
            <br />
            <span className="text-white">Your Business?</span>
          </h2>

          {/* Subheading */}
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let AI handle the repetitive work — so you can focus on growth. Whether it&apos;s responding to leads,
            sending reports, or following up with customers, we build automations that feel like a team member.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 justify-center sm:justify-start">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openPaymentModal('ai-audit')}
              className="group relative px-8 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-[#EF4444] group-hover:opacity-90 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                Book Paid Consultation — $150
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all"
            >
              Schedule a 15-Min Call
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
