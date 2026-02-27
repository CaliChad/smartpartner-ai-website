'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

/* ── Fade-in on scroll wrapper ────────────────────────────────── */
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Email Modal ──────────────────────────────────────────────── */
function EmailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/paystack/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: 350000 }),
      });
      const data = await res.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border-2 border-[#C9A84C]/40 bg-[#0D1B2A] p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">Get Instant Access</h3>
        <p className="text-white/60 text-sm mb-6">Enter your email to receive the PDF after payment.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            placeholder="your@email.com"
            className="w-full rounded-xl px-4 py-3.5 text-white placeholder-white/40 bg-white/5 border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 focus:outline-none transition-all"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-lg text-[#0D1B2A] bg-[#C9A84C] hover:bg-[#d4b55a] disabled:opacity-60 transition-all"
          >
            {loading ? 'Redirecting to payment...' : 'Continue to Payment — $27'}
          </button>
          <p className="text-center text-white/40 text-xs">KSh 3,500 for Kenyan buyers. Secure payment via Paystack.</p>
        </form>
      </div>
    </div>
  );
}

/* ── Gold CTA Button ──────────────────────────────────────────── */
function CTAButton({ onClick, label = 'Download The Blueprint Now →' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-block px-10 py-5 rounded-xl font-bold text-lg text-[#0D1B2A] bg-[#C9A84C] hover:bg-[#d4b55a] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#C9A84C]/20"
    >
      {label}
    </button>
  );
}

/* ── Main Sales Page ──────────────────────────────────────────── */
export default function AbundanceIntelligencePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen font-sans antialiased">
      <EmailModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ═══ SECTION 1 — HERO ═══ */}
      <section className="relative bg-[#0D1B2A] overflow-hidden">
        {/* Nav */}
        <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center">
              <span className="text-[#0D1B2A] font-bold text-sm">SP</span>
            </div>
            <span className="text-[#C9A84C] font-semibold">SmartPartner AI</span>
          </div>
          <span className="text-[#C9A84C]/70 text-sm hidden sm:block">smartpartnerai.store</span>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Business Is Leaking $300K–$1M a Year.{' '}
              <span className="text-[#C9A84C]">Here&apos;s the Blueprint to Stop It.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg md:text-xl text-[#C9A84C]/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              The exact AI architecture 90+ businesses used to escape the Scarcity Trap — and build an Abundance Engine that runs without them
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {['90+ Deployments', '6 Industries', '6 Countries'].map(badge => (
                <span key={badge} className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#C9A84C]/40 text-[#C9A84C] bg-[#C9A84C]/5">
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* 3D Book Mockup */}
          <FadeIn delay={0.35}>
            <div className="flex justify-center mb-12">
              <div className="relative" style={{ perspective: '1200px' }}>
                <div
                  className="relative w-56 md:w-64 rounded-lg overflow-hidden shadow-2xl shadow-[#C9A84C]/15"
                  style={{ transform: 'rotateY(-8deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}
                >
                  {/* Book cover */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#0D1B2A] via-[#142638] to-[#0D1B2A] border-2 border-[#C9A84C]/30 rounded-lg p-6 flex flex-col justify-between relative">
                    {/* Spine shadow */}
                    <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
                    {/* Gold accent line */}
                    <div className="h-1 w-16 bg-[#C9A84C] rounded-full mb-4" />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">The Founder&apos;s Blueprint</p>
                      <h3 className="text-white text-xl md:text-2xl font-extrabold leading-tight mb-2">
                        Abundance Intelligence (AI)
                        <span className="text-[#C9A84C]"> &amp; Businesses</span>
                      </h3>
                      <p className="text-white/50 text-xs mt-2">Building an Abundance Engine</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[#C9A84C]/20">
                      <p className="text-[#C9A84C]/70 text-xs font-medium">Kevin Rono</p>
                      <p className="text-white/30 text-[10px]">SmartPartner AI</p>
                    </div>
                  </div>
                </div>
                {/* Book shadow on surface */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 bg-[#C9A84C]/10 rounded-full blur-xl" />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="mb-3">
              <p className="text-white text-2xl font-bold mb-1">Get Instant Access — <span className="text-[#C9A84C]">$27</span></p>
              <p className="text-white/50 text-sm">KSh 3,500 for Kenyan buyers</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-6">
              <CTAButton onClick={openModal} />
              <p className="text-white/40 text-xs mt-4">Instant PDF download. Read on any device.</p>
            </div>
          </FadeIn>
        </div>

        {/* Decorative glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#C9A84C]/3 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* ═══ SECTION 2 — THE PROBLEM ═══ */}
      <section className="bg-[#0D1B2A] border-t border-[#C9A84C]/10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-4">Why Most Founders Are Stuck</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              You built a successful business.<br />
              <span className="text-white/70">So why does it feel like a prison?</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Revenue Bleeding',
                text: 'Qualified leads arriving after hours, on weekends, while your team sleeps. Gone to a competitor who answered first.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
                title: 'Support Drowning',
                text: "Your inbox has 147 unread messages asking the same five questions. You're answering 'How do I reset my password?' instead of closing $50K deals.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Operations Chaos',
                text: 'Copy-pasting data between systems. Reconciling spreadsheets. Spending 15+ hours a week on admin work that creates zero strategic value.',
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12} className="h-full">
                <div className="h-full rounded-2xl border border-[#C9A84C]/15 bg-white/[0.02] p-8 hover:border-[#C9A84C]/30 transition-colors">
                  <div className="text-[#C9A84C] mb-5">{card.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-white/60 leading-relaxed">{card.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <p className="text-xl md:text-2xl text-white italic font-light max-w-3xl mx-auto">
              &ldquo;This isn&apos;t a people problem. It&apos;s an <span className="text-[#C9A84C] font-semibold not-italic">architecture</span> problem.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 3 — SOCIAL PROOF NUMBERS ═══ */}
      <section className="bg-[#F8F8F8] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-4">Real Results From Real Businesses</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { number: '$126,000', label: 'Recovered by a MedSpa in weekend revenue they were silently losing' },
              { number: '$80K→$110K', label: 'Monthly revenue scaled by an agency without hiring a single employee' },
              { number: '200 txns', label: 'Managed by a 3-person real estate team that should have needed 50' },
              { number: '3-4 hours', label: "Saved per deal for a law firm's $500/hour partners" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#C9A84C] mb-3">{stat.number}</div>
                <p className="text-[#0D1B2A]/70 text-sm leading-relaxed">{stat.label}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <p className="text-[#0D1B2A] font-semibold text-lg">Not projections. Deployed systems. Measurable results.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 4 — WHAT'S INSIDE ═══ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-4">What You&apos;ll Build</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] leading-tight">
              A complete architecture for turning your business<br className="hidden md:block" /> into a 24/7 Abundance Engine
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Chapters */}
            <FadeIn>
              <div className="space-y-4">
                {[
                  { ch: 'Intro', title: 'The Great Divide' },
                  { ch: 'Ch 1', title: 'The AI Disruption You Can\'t Ignore' },
                  { ch: 'Ch 2', title: 'The Abundance Intelligence Framework' },
                  { ch: 'Ch 3', title: 'Finding Your Million-Dollar Bottleneck' },
                  { ch: 'Ch 4', title: 'Sales & Revenue Generation AI — The Gatekeeper, The Nurturer, The Closer' },
                  { ch: 'Ch 5', title: 'Customer Experience & Support AI — The Sentinel, The Guide, The Guardian' },
                  { ch: 'Ch 6', title: 'Operations & Workflow AI — The Bridge, The Processor, The Sync, The Oracle' },
                  { ch: 'End', title: 'The Choice' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-14 text-right text-xs font-bold text-[#C9A84C] uppercase pt-1">{item.ch}</span>
                    <p className="text-[#0D1B2A]/80 leading-relaxed">{item.title}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right — Transformation cards */}
            <FadeIn delay={0.15}>
              <div className="space-y-6">
                {[
                  { label: 'Before', text: 'Drowning in manual operations, 60-hour weeks, shrinking margins' },
                  { label: 'After', text: '3-5 person team commanding enterprise-level output, 60-80% margins' },
                  { label: 'The Gap', text: 'A professional AI build — now documented in this blueprint' },
                ].map((card, i) => (
                  <div key={i} className="border-l-4 border-[#C9A84C] pl-6 py-4">
                    <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider mb-1">{card.label}</p>
                    <p className="text-[#0D1B2A]/80 text-lg leading-relaxed">{card.text}</p>
                  </div>
                ))}

                <div className="pt-6">
                  <CTAButton onClick={openModal} label="Get Instant Access — $27 →" />
                  <p className="text-[#0D1B2A]/40 text-xs mt-3">KSh 3,500 for Kenyan buyers</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — WHO THIS IS FOR ═══ */}
      <section className="bg-[#0D1B2A] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">This book is for you if...</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-5 mb-12">
              {[
                'You\'re generating $100K–$5M annually but drowning under your own success',
                'Your team is growing but your margins are shrinking',
                'You\'ve tried AI tools and seen zero results',
                'You can\'t take a vacation without your business stalling',
                'You want to scale to $3M–$10M without doubling your headcount',
                'You want to build a business worth 3–5x more when you sell',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-[#C9A84C] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-white/90 text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="text-center">
            <p className="text-[#C9A84C] italic text-sm">
              This is NOT for pre-revenue founders or people looking for a chatbot tutorial.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 6 — ABOUT THE AUTHOR ═══ */}
      <section className="bg-[#F8F8F8] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-8">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-4">Your Guide</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-6">
              Built by someone who&apos;s done it 90+ times
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[#0D1B2A]/70 text-lg leading-relaxed text-center mb-10">
              Kevin Rono is the founder of SmartPartner AI and has designed and deployed 70+ AI agents and 20+ complete automation systems across six industries in Kenya, the US, South Africa, Nigeria, Ghana, and the UK. This book isn&apos;t theory. It&apos;s the exact architecture he uses with every client — documented for the first time in one complete blueprint.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {['70+ AI Agents Deployed', '20+ Automation Systems', '6 Countries'].map(badge => (
                <span key={badge} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-[#C9A84C]/40 text-[#C9A84C] bg-[#C9A84C]/5">
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SECTION 7 — FINAL CTA ═══ */}
      <section className="bg-[#0D1B2A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Stop Leaking Revenue.<br />
              <span className="text-[#C9A84C]">Start Building Your Abundance Engine.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-[#C9A84C]/80 text-lg mb-10">One blueprint. Three systems. Complete transformation.</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <CTAButton onClick={openModal} label="Get Instant Access — $27 →" />
            <p className="text-white/40 text-sm mt-3">KSh 3,500 for Kenyan buyers</p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/50 text-sm">
              <span>✓ Instant PDF Download</span>
              <span>✓ Read on Any Device</span>
              <span>✓ Implementation playbooks for 6 industries</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] border-t border-[#C9A84C]/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <span>&copy; 2026 SmartPartner AI</span>
          <span>smartpartnerai.store</span>
        </div>
      </footer>
    </div>
  );
}
