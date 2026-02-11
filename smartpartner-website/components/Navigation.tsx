'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'portfolio' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center text-white font-bold text-sm">SP</div>
            <span className="text-lg font-bold text-white">SmartPartner<span className="text-primary-light">.AI</span></span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="relative px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors group">
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary to-violet group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button onClick={() => scrollTo('contact')} className="relative px-5 py-2.5 text-sm font-medium text-white rounded-lg overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-violet group-hover:opacity-90 transition-opacity" />
              <span className="relative">Book a Call</span>
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-4 pb-4 space-y-1 overflow-hidden">
              {links.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="block w-full text-left py-3 px-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm">{link.label}</button>
              ))}
              <button onClick={() => scrollTo('contact')} className="w-full mt-2 px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-violet rounded-lg">Book a Call</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
