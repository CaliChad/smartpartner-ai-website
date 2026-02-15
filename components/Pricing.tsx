'use client';

import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';
import { usePayment } from '@/components/payment/PaymentProvider';
import type { PackageId } from '@/types/payment';

export default function Pricing() {
  const { openPaymentModal } = usePayment();

  const pricingPlans: Array<{
    id: PackageId;
    name: string;
    oldPrice: string;
    newPrice: string;
    description: string;
    features: string[];
    popular: boolean;
  }> = [
    {
      id: 'starter',
      name: 'Starter Automation',
      oldPrice: '$500-1,000',
      newPrice: '$250-500',
      description: 'Single workflow automation',
      features: [
        'Contact form to CRM integration',
        'Appointment reminder system',
        'Email auto-responder setup',
        '30 days support included',
        'Full documentation & training',
      ],
      popular: false,
    },
    {
      id: 'growth',
      name: 'Growth Package',
      oldPrice: '$1,250-2,500',
      newPrice: '$625-1,250',
      description: '3-5 interconnected automations',
      features: [
        'Full lead generation system',
        'Multi-channel communication automation',
        'CRM integration & updates',
        'Custom workflow design',
        '30 days support included',
        'Priority implementation',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Suite',
      oldPrice: '$5,000+',
      newPrice: '$2,500+',
      description: 'Complete business automation overhaul',
      features: [
        'End-to-end process automation',
        'Custom AI integration',
        'Multiple department workflows',
        'Ongoing optimization',
        'Dedicated support',
        'Monthly retainer options available',
      ],
      popular: false,
    },
    {
      id: 'ai-audit',
      name: 'AI Audit Only',
      oldPrice: '$300',
      newPrice: '$150',
      description: '60-minute consultation',
      features: [
        'Process deep-dive session',
        'Comprehensive workflow analysis',
        'ROI projections for top 5 opportunities',
        'Custom implementation roadmap',
        'Tool recommendations',
        'Integration planning',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 px-6 bg-dark overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 space-y-5">
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Simple, Honest Pricing</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Choose the package that fits your automation needs. All packages include 30 days support.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl overflow-hidden h-full ${
                  plan.popular ? '' : ''
                }`}
              >
                {/* Gradient border for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet to-accent rounded-2xl" />
                )}

                <div className={`relative h-full ${plan.popular ? 'm-[1px]' : ''} bg-dark-card rounded-2xl p-7 border ${plan.popular ? 'border-transparent' : 'border-white/[0.06]'} flex flex-col`}>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                      50% OFF
                    </span>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

                  {/* Pricing */}
                  <div className="mb-4">
                    <span className="text-sm text-slate-500 line-through">{plan.oldPrice}</span>
                    <div className="text-3xl font-bold gradient-text mt-1">{plan.newPrice}</div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => openPaymentModal(plan.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-accent to-[#EF4444] text-white hover:opacity-90'
                        : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Note */}
        <AnimatedSection delay={0.4} className="text-center space-y-3">
          <p className="text-slate-400">
            <span className="text-white font-medium">Monthly retainers available</span> for ongoing management and optimization ($200-500/mo)
          </p>
          <p className="text-slate-500 text-sm">
            All packages include 30 days of support. Custom solutions available for enterprise needs.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
