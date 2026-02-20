'use client';

import AnimatedSection, { Counter } from './AnimatedSection';

const stats = [
  { value: 2, suffix: '+', label: 'Years Building' },
  { value: 90, suffix: '+', label: 'Automations' },
  { value: 15, suffix: 'K+', label: 'Hours Saved' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-dark overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <AnimatedSection>
          <div className="space-y-6 text-center">
            {/* Badge */}
            <div className="inline-block">
              <span className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-primary-light">
                About
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
              Hi, I&apos;m{' '}
              <span className="gradient-text">Kevin Rono</span>
            </h2>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-slate-400 text-lg leading-relaxed">
                I&apos;m the founder of Smart Partner AI. I help businesses eliminate
                repetitive tasks through custom automation solutions that actually
                deliver measurable results.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                With over 2 years of hands-on experience in AI automation, I&apos;ve
                built systems that have saved thousands of hours for businesses across
                various industries. My focus is on creating practical, results-driven
                automation that works from day one.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-5 text-center"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    <Counter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
