import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Github, ArrowRight, FileDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Phone,
    title: 'WhatsApp',
    description: '+91 82704 95250',
    link: 'https://wa.me/918270495250',
    linkText: 'Chat Now',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'mugilarasu041@gmail.com',
    link: 'mailto:mugilarasu041@gmail.com',
    linkText: 'Send Email',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'View my repositories',
    link: '#',
    linkText: 'Visit Profile',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      section.querySelector('.section-label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
    tl.fromTo(
      section.querySelector('.section-heading'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
    tl.fromTo(
      section.querySelector('.section-subheading'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    const cards = section.querySelectorAll('.contact-card');
    tl.fromTo(
      cards,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
      '-=0.3'
    );

    tl.fromTo(
      section.querySelector('.resume-banner'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-[120px] px-4 pb-16 md:pb-20"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="section-label font-mono text-xs uppercase tracking-[0.08em] text-neon-green mb-2">
            // CONTACT
          </p>
          <h2 className="section-heading font-display text-3xl sm:text-4xl md:text-[56px] font-bold text-text-primary tracking-[-0.02em] mb-4">
            Let's Build Something
            <br />
            Together
          </h2>
          <p className="section-subheading text-text-muted text-base max-w-xl mx-auto">
            Open to internships, freelance projects, and collaboration opportunities.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 md:mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-card group bg-dark-surface border border-border-subtle rounded-lg p-6 md:p-8 text-center transition-all duration-300 hover:border-neon-green hover:shadow-glow-green-sm"
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto flex items-center justify-center mb-4">
                  <Icon size={32} className="text-neon-green" />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
                  {method.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-muted mb-4">{method.description}</p>

                {/* Link */}
                <span className="inline-flex items-center gap-1 text-sm text-neon-green group-hover:underline transition-all">
                  {method.linkText}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            );
          })}
        </div>

        {/* Resume CTA Banner */}
        <div
          className="resume-banner flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-xl border border-neon-green/30"
          style={{
            background:
              'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
          }}
        >
          <div className="text-center sm:text-left">
            <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary mb-1">
              Want a copy of my resume?
            </h3>
            <p className="text-sm text-text-muted">
              Download my latest resume with all project details and certifications.
            </p>
          </div>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
              color: '#050505',
            }}
          >
            <FileDown size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
