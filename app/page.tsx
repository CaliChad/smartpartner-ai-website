import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PaymentProvider from '@/components/payment/PaymentProvider';

// Lazy-load below-the-fold sections — only loaded when the browser is idle
const Services = dynamic(() => import('@/components/Services'));
const AutomationSolutions = dynamic(() => import('@/components/AutomationSolutions'));
const FeaturedBuild = dynamic(() => import('@/components/FeaturedBuild'));
const AIAudit = dynamic(() => import('@/components/AIAudit'));
const About = dynamic(() => import('@/components/About'));
const Portfolio = dynamic(() => import('@/components/Portfolio'));
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Pricing = dynamic(() => import('@/components/Pricing'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const FinalCTA = dynamic(() => import('@/components/FinalCTA'));
const Contact = dynamic(() => import('@/components/Contact'));
const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'));

export default function Home() {
  return (
    <PaymentProvider>
    <div className="min-h-screen bg-dark">
      <Navigation />
      <Hero />
      <Services />
      <AutomationSolutions />
      <FeaturedBuild />
      <AIAudit />
      <About />
      <Portfolio />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />

      {/* Footer */}
      <footer className="relative bg-dark border-t border-white/[0.06] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <span className="text-white font-semibold">Smart Partner AI</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <a href="mailto:getsmartpartnerai@gmail.com" className="hover:text-slate-300 transition-colors">getsmartpartnerai@gmail.com</a>
              <a href="tel:+254725607750" className="hover:text-slate-300 transition-colors">+254 725 607 750</a>
            </div>

            {/* Copyright */}
            <p className="text-slate-600 text-sm">
              &copy; 2026 Smart Partner AI
            </p>
          </div>
        </div>
      </footer>
      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
    </PaymentProvider>
  );
}
