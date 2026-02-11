'use client';

import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    subtitle: 'You book a free 15-minute strategy call',
    description:
      'We learn about your business, bottlenecks, and tasks that waste your time.',
  },
  {
    number: '02',
    title: 'Automation Plan',
    subtitle: 'We map out what can be automated',
    description:
      "You get a clear plan showing what to automate, what tools we'll use, and expected outcomes.",
  },
  {
    number: '03',
    title: 'Build & Test',
    subtitle: 'We build your custom AI workflows',
    description:
      'Using tools like Make.com, n8n, and Flowise, we set up and test everything for you.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    subtitle: 'You go live — and we stay on call',
    description:
      'Your automations are deployed with support included to ensure everything runs smoothly.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6 bg-dark overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-block">
            <span className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-light">
              Process
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">From Discovery to Deployment</span>
          </h2>
        </AnimatedSection>

        {/* Steps Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          staggerDelay={0.12}
        >
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="glass-card rounded-2xl p-8 h-full">
                {/* Step Number */}
                <div className="text-6xl font-bold gradient-text opacity-50 mb-4">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p className="text-primary-light text-sm font-medium mb-3">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
