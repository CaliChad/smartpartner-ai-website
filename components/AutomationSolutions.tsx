'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const tabs = [
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'hr', label: 'HR & Recruiting' },
  { id: 'sales', label: 'Sales & Leads' },
  { id: 'support', label: 'Customer Support' },
  { id: 'operations', label: 'Operations' },
  { id: 'content', label: 'Content & Marketing' },
  { id: 'funnels', label: 'Funnels & Ads' },
  { id: 'industry', label: 'Industry Solutions' },
];

const ecommerceAutomations = [
  {
    title: 'Abandoned Cart Recovery',
    description:
      'Recover 22% more sales with AI-powered cart recovery sequences that send personalized reminders via email and SMS at optimal times',
  },
  {
    title: 'AI Sales Assistant',
    description:
      '24/7 intelligent chatbot that answers product questions, recommends items, handles objections, and processes orders without human intervention',
  },
  {
    title: 'Dynamic Price Comparison',
    description:
      'Automated competitor price monitoring that alerts you when prices change and suggests optimal pricing strategies',
  },
  {
    title: 'Welcome Email Series',
    description:
      'Nurture new subscribers with personalized 5-7 email sequences introducing your brand, bestsellers, and exclusive first-purchase offers',
  },
  {
    title: 'Post-Purchase Automation',
    description:
      'Send thank-you emails, request reviews, recommend complementary products, and create loyal repeat customers automatically',
  },
  {
    title: 'Win-Back Campaigns',
    description:
      'Re-engage dormant customers (60-90 days inactive) with targeted offers and personalized product recommendations',
  },
  {
    title: 'Consumables Reminder System',
    description:
      "Track purchase cycles and remind customers when it's time to reorder supplements, pet food, beauty products, etc.",
  },
  {
    title: 'Smart Inventory Tracker',
    description:
      'Real-time Telegram alerts for low stock, reorder points, and sales velocity tracking to prevent stockouts',
  },
  {
    title: 'Automated Fraud Detection & Audit Logs',
    description:
      'AI monitors transactions for suspicious patterns, tracks inventory discrepancies, and generates weekly audit reports',
  },
];

export default function AutomationSolutions() {
  const [activeTab, setActiveTab] = useState('ecommerce');

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-dark-card to-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14 space-y-5">
          {/* Badge */}
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              Full Service Catalog
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">
              Solutions for Every Business Function
            </span>
          </h2>
        </AnimatedSection>

        {/* Tab Navigation */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-violet text-white shadow-lg shadow-primary/20'
                    : 'glass-card text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Tab Content */}
        <div className="mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'ecommerce' ? (
              <motion.div
                key="ecommerce"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <h3 className="text-3xl font-bold text-center text-white mb-10">
                  Turn Browsers Into Buyers, Automatically
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {ecommerceAutomations.map((automation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.06,
                        ease: 'easeOut',
                      }}
                      className="glass-card rounded-xl p-6 border border-white/[0.04] hover:bg-white/[0.06] transition-all duration-300"
                    >
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {automation.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {automation.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="flex items-center justify-center py-24"
              >
                <p className="text-2xl text-slate-500">Coming soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
