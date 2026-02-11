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

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Image Placeholder */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Decorative glow blobs */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-violet/20 rounded-full blur-3xl pointer-events-none" />

              {/* Gradient placeholder box */}
              <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/20 to-violet/20 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">👨‍💼</div>
                  <p className="text-xl font-semibold text-white">Kevin Rono</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Founder &mdash; Smart Partner AI
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT — Content */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-6">
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
              <div className="grid grid-cols-3 gap-4 pt-4">
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
      </div>
    </section>
  );
}
