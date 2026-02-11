'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do I need technical knowledge to use these automations?',
      answer: 'Not at all. We build everything for you and provide simple, clear documentation. Our automations are designed to work seamlessly in the background — you just use your existing tools like WhatsApp, email, or Google Sheets, and the automations handle the rest.',
    },
    {
      question: 'What tools do you use?',
      answer: 'We work with Make.com, n8n, Zapier, OpenAI, Claude AI, WhatsApp Business API, Google Workspace, Airtable, Notion, and many more. We choose the best tools for your specific needs and budget.',
    },
    {
      question: 'How long does implementation take?',
      answer: 'Simple automations can be live within 2-3 days. More complex systems typically take 1-2 weeks. Enterprise solutions may take 3-4 weeks depending on scope. We always provide a clear timeline before starting.',
    },
    {
      question: 'What if something breaks?',
      answer: 'All packages include 30 days of support. We build robust error handling into every automation and set up monitoring alerts. If anything goes wrong, we fix it quickly — usually within hours, not days.',
    },
    {
      question: 'Can you integrate with my specific tool?',
      answer: 'Most likely, yes. We have experience with hundreds of tools and APIs. If your tool has an API or webhook support, we can integrate it. Book a free call and we will confirm compatibility.',
    },
    {
      question: "What's included in the AI Audit?",
      answer: 'A 60-minute deep-dive into your business processes, a comprehensive workflow analysis report, ROI projections for your top 5 automation opportunities, a custom implementation roadmap, and tool recommendations.',
    },
    {
      question: 'Do you offer ongoing support?',
      answer: 'Yes. Beyond the included 30-day support period, we offer monthly retainer plans ($200-500/mo) for ongoing management, optimization, and new automation development as your business grows.',
    },
    {
      question: 'How much can I actually save?',
      answer: 'Most clients save 20+ hours per week on repetitive tasks. In dollar terms, that translates to thousands saved monthly. Our AI Audit includes specific ROI projections tailored to your business.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-6 bg-dark overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 space-y-5">
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to know about our automation services
          </p>
        </AnimatedSection>

        {/* FAQ Items */}
        <AnimatedSection delay={0.2}>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-xl border border-white/[0.04] hover:border-primary/20 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-white pr-8">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-primary flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
