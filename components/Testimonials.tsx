'use client';

import AnimatedSection, { StaggerContainer, StaggerItem } from './AnimatedSection';

export default function Testimonials() {
  const testimonials = [
    {
      category: 'Dental',
      name: 'Dr. Alice M.',
      company: 'Aegis Dental (Nairobi)',
      text: 'Kevin built a WhatsApp AI assistant for our dental clinic that now handles 90% of booking messages. Our front desk workload dropped instantly.',
    },
    {
      category: 'Consulting',
      name: 'Michael K.',
      company: 'Solo Consultant',
      text: 'I had no idea automation could do so much. I send a voice note, and my AI assistant now replies to clients, logs it in Sheets, and reminds me later. Game changer.',
    },
    {
      category: 'E-commerce',
      name: 'Fiona N.',
      company: 'E-commerce Store Owner',
      text: 'In just 3 days, SmartPartner AI automated our abandoned cart follow-ups and boosted conversions by 22% without running ads.',
    },
    {
      category: 'Real Estate',
      name: 'Brian O.',
      company: 'Real Estate Broker',
      text: 'Our real estate team now gets instant WhatsApp notifications when a lead fills out our form. No more delays — response time has improved by 70%.',
    },
    {
      category: 'Education',
      name: 'Mercy W.',
      company: 'Online Course Creator',
      text: "I use SmartPartner's automations to send class reminders, handle FAQs, and collect feedback from students. Saved me hours weekly.",
    },
    {
      category: 'Legal',
      name: 'Lillian M.',
      company: 'Legal Consultant',
      text: 'I was manually replying to 30+ inquiries a day. Now, my AI chatbot filters leads, answers common questions, and books appointments on its own.',
    },
    {
      category: 'HR',
      name: 'Sarah T.',
      company: 'HR Director, Tech Startup',
      text: "We process 500+ job applications monthly. Kevin's AI screener reduced our CV review time from 40 hours to 6 hours per week. Game-changing.",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-dark-card to-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 space-y-5">
          <div className="inline-block">
            <span className="glass-card inline-block px-5 py-2 rounded-full text-sm font-medium text-slate-300">
              Client Stories
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Real Results. Real People.</span>
          </h2>
          <p className="text-lg text-slate-400">
            Here's what working with SmartPartner AI feels like
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="glass-card rounded-2xl p-7 border border-white/[0.04] hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
                {/* Category Badge */}
                <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 mb-4">
                  {testimonial.category}
                </span>

                {/* Quote */}
                <blockquote className="text-slate-300 leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-violet flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
