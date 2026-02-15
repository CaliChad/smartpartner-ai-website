'use client';

import { motion } from 'framer-motion';
import { Counter } from './AnimatedSection';
import { usePayment } from '@/components/payment/PaymentProvider';

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const { openPaymentModal } = usePayment();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 dot-grid" />

      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet rounded-full blur-[120px]" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass-card text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Currently accepting new projects
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
          <span className="text-white">Let AI Run Your</span><br />
          <span className="gradient-text">Repetitive Tasks</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Custom AI automation solutions that save <span className="text-white font-semibold">20+ hours weekly</span>.
          From WhatsApp bots to CRM integrations—built for businesses that move fast.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button onClick={() => openPaymentModal('ai-audit')} className="group relative px-8 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-[#EF4444] group-hover:opacity-90 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Book AI Audit — $150
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
          <button onClick={() => scrollTo('portfolio')} className="px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all">
            See Our Work
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { target: 90, suffix: '+', label: 'Automations Built' },
            { target: 40, suffix: '+', label: 'Happy Clients' },
            { target: 15000, suffix: '+', label: 'Hours Saved' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-16 flex flex-wrap justify-center gap-3">
          {['Make.com', 'n8n', 'OpenAI', 'Claude AI', 'WhatsApp API', 'Zapier'].map((tech) => (
            <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 border border-white/[0.06] bg-white/[0.02]">{tech}</span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}
