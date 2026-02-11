'use client';

import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

export default function AIAudit() {
  const handleBookAudit = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const whatYouGet = [
    '60-minute process deep-dive session',
    'Comprehensive workflow analysis report',
    'ROI projections for top 5 automation opportunities',
    'Custom implementation roadmap with priorities',
    'Tool recommendations and integration plan',
    '30-day post-implementation support',
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-dark to-dark-card overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-5">
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              AI Audit & Consultation
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Discover Your Automation Potential</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed">
            We analyze your business processes end-to-end to uncover hidden inefficiencies and bottlenecks.
            Our AI Audit identifies where automation and AI can deliver the biggest impact.
          </p>
        </AnimatedSection>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - What You Get */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card rounded-2xl p-8 border border-white/[0.06] h-full">
              <h3 className="text-2xl font-bold text-white mb-6">What You Get</h3>
              <StaggerContainer className="space-y-4">
                {whatYouGet.map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedSection>

          {/* Right Column - Ideal For */}
          <AnimatedSection delay={0.3}>
            <div className="glass-card rounded-2xl p-8 border border-white/[0.06] h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Ideal For</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Businesses spending 20+ hours weekly on repetitive tasks, companies scaling rapidly, teams
                struggling with manual data entry, or organizations looking to improve customer response times
                and operational efficiency.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { value: '20+', label: 'Hours saved weekly' },
                  { value: '5x', label: 'Avg ROI increase' },
                  { value: '48hr', label: 'Report delivery' },
                  { value: '100%', label: 'Custom solutions' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-white/[0.03]">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Pricing Box */}
        <AnimatedSection delay={0.4} className="max-w-2xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-violet/20 to-accent/30 rounded-2xl" />
            <div className="relative m-[1px] bg-dark-card rounded-2xl p-8 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 mb-4">
                50% OFF — Limited Time
              </span>
              <div className="mb-6">
                <span className="text-2xl text-slate-500 line-through">$300</span>
                <div className="text-6xl font-bold gradient-text mt-2">$150</div>
              </div>
              <button
                onClick={handleBookAudit}
                className="group relative w-full px-8 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-[#EF4444] group-hover:opacity-90 transition-opacity" />
                <span className="relative">Book Your AI Audit Now</span>
              </button>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
