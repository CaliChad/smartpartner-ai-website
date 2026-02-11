'use client';

import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

const services = [
  {
    title: 'Email Automation',
    description:
      'Automate email campaigns, responses, and follow-ups with intelligent AI-powered sequences.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    title: 'Data Processing',
    description:
      'Transform raw data into actionable insights with automated processing and analysis.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
        />
      </svg>
    ),
  },
  {
    title: 'Workflow Integration',
    description:
      'Connect your tools seamlessly to create efficient, automated workflows.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.25 8.81"
        />
      </svg>
    ),
  },
  {
    title: 'AI Integration',
    description:
      'Implement custom AI solutions that handle customer interactions and automate decisions.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
        />
      </svg>
    ),
  },
  {
    title: 'Process Optimization',
    description:
      'Streamline your operations by automating repetitive tasks and eliminating bottlenecks.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: 'Custom Development',
    description:
      'Tailored automation solutions designed specifically for your unique business needs.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-dark overflow-hidden">
      {/* Dot grid background overlay */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-5">
          {/* Badge */}
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              What We Build
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">
              Automation Solutions That Drive Results
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Powerful automation solutions to transform your business operations
            and accelerate growth.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <div className="group glass-card rounded-2xl p-7 border border-white/[0.04] hover:border-primary/30 transition-all duration-500 h-full">
                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-violet/0 to-primary/0 group-hover:from-primary/[0.08] group-hover:via-violet/[0.04] group-hover:to-primary/[0.08] transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-slate-400 leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
