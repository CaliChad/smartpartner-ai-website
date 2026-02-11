'use client';

import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

const caseStudies = [
  {
    category: 'E-commerce & Retail',
    title: 'The Self-Auditing Inventory System',
    description:
      'A Telegram-based ERP that uses OCR to read handwritten receipts, updates stock in real-time, and runs weekly fraud detection audits. Caught $3,200 in shrinkage in the first month.',
    techStack: ['Make.com', 'OCR API', 'Telegram Bot API', 'Google Sheets'],
    results: ['100% inventory accuracy', '15 hours saved weekly'],
  },
  {
    category: 'Online Stores',
    title: 'E-Commerce Revenue Engine',
    description:
      'Full automation suite with Welcome Series, Abandoned Cart Recovery (22% boost), Post-Purchase flows, and AI Sales Assistant handling 200+ queries daily.',
    techStack: ['Klaviyo', 'OpenAI', 'Shopify', 'SMS Gateway'],
    results: ['30% revenue increase', '24/7 customer support'],
  },
  {
    category: 'Recruiting & HR',
    title: 'The HR Autopilot',
    description:
      'System that parses 300+ CVs, ranks candidates using AI scoring, auto-communicates with applicants, and books interviews based on calendar availability.',
    techStack: ['n8n', 'OpenAI', 'Google Calendar', 'WhatsApp API'],
    results: ['65% faster hiring', '80% screening time saved'],
  },
  {
    category: 'Real Estate',
    title: 'Real Estate Lead Nexus',
    description:
      'Instant lead qualification and routing from Facebook/IG ads directly to agents via WhatsApp with property matching and follow-up sequences.',
    techStack: ['Make.com', 'Facebook API', 'WhatsApp Business API', 'Airtable'],
    results: ['85% faster response', '40% more qualified appointments'],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 px-6 bg-dark-card">
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-block">
            <span className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider gradient-text-warm">
              Featured Work
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Real Systems. Real Results.
          </h2>

          {/* Subtext */}
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            See how we&apos;ve transformed businesses with custom automation solutions
          </p>
        </AnimatedSection>

        {/* Case Studies Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.12}>
          {caseStudies.map((study, index) => (
            <StaggerItem key={index}>
              <div className="glass-card rounded-2xl p-8 hover:bg-white/[0.06] transition-all duration-300 h-full flex flex-col">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-wider font-medium text-primary-light">
                    {study.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {study.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-white/[0.06] border border-white/[0.08] px-3 py-1 text-xs text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mt-auto space-y-2 pt-5 border-t border-white/[0.06]">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-slate-300 text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
