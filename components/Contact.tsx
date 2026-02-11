'use client';

import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

export default function Contact() {
  const handleChatClick = () => {
    window.open('https://wa.me/254725607750', '_blank');
  };

  const handleScheduleCall = () => {
    window.open('https://wa.me/254725607750', '_blank');
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-gradient-to-b from-dark to-dark-card overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 space-y-5">
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Let&apos;s Build Something Amazing</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Ready to automate? Reach out and let&apos;s discuss your business needs.
          </p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT - WhatsApp / Chat */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card rounded-2xl p-8 border border-white/[0.06] h-full">
              <h3 className="text-2xl font-bold text-white mb-4">Quick Questions?</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Get instant answers about our automation services, pricing, and how we can help your business.
                Chat with us directly on WhatsApp — available 24/7.
              </p>

              <button
                onClick={handleChatClick}
                className="group relative w-full px-8 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden mb-8"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] group-hover:opacity-90 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Chat on WhatsApp
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.605-1.468A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.24 0-4.31-.726-5.993-1.957l-.43-.312-2.732.871.914-2.654-.344-.465A9.706 9.706 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
                  </svg>
                </span>
              </button>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                {['Instant responses', 'Available 24/7', 'Free consultation'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT - Direct Contact */}
          <AnimatedSection delay={0.3}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">Get in touch directly</h3>

              <StaggerContainer className="space-y-4">
                {/* Email */}
                <StaggerItem>
                  <a href="mailto:getsmartpartnerai@gmail.com" className="block glass-card rounded-xl p-5 border border-white/[0.04] hover:border-primary/20 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">Email</div>
                        <div className="text-primary text-sm">getsmartpartnerai@gmail.com</div>
                      </div>
                    </div>
                  </a>
                </StaggerItem>

                {/* Phone */}
                <StaggerItem>
                  <a href="tel:+254725607750" className="block glass-card rounded-xl p-5 border border-white/[0.04] hover:border-primary/20 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">Phone</div>
                        <div className="text-primary text-sm">+254 725 607 750</div>
                      </div>
                    </div>
                  </a>
                </StaggerItem>

                {/* Status */}
                <StaggerItem>
                  <div className="glass-card rounded-xl p-5 border border-green-500/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">Status</div>
                        <div className="text-green-400 text-sm">Currently accepting new projects</div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              {/* Schedule Call CTA */}
              <div className="glass-card rounded-xl p-6 border border-white/[0.06] mt-4">
                <h4 className="text-lg font-bold text-white mb-2">Ready for a deeper conversation?</h4>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Schedule a personalized consultation to discuss your specific automation needs.
                </p>
                <button
                  onClick={handleScheduleCall}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] transition-all"
                >
                  Schedule a Call
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
