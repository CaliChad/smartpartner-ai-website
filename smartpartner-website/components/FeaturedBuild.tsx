'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function FeaturedBuild() {
  return (
    <section className="relative py-20 px-6 bg-dark overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="inline-block mb-6">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-accent">
              Featured Build
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-violet/20 rounded-2xl" />
            <div className="relative m-[1px] bg-dark-card rounded-2xl p-8 lg:p-12">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider">Live System</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  The Self-Auditing Inventory System
                </h3>

                <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-3xl">
                  Telegram-based ERP using OCR to read handwritten receipts, updating stock in real-time with
                  weekly fraud detection audits that caught <span className="text-white font-semibold">$3,200 in shrinkage</span> for one client.
                </p>

                <div className="flex flex-wrap gap-3">
                  {['Telegram Bot', 'OCR Processing', 'Real-time Sync', 'Fraud Detection'].map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-white/[0.08] bg-white/[0.03]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
