import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Computer Science',
    institution: 'Current — 3rd Year',
    link: null,
  },
  {
    icon: Award,
    title: 'Java Programming and Software Engineering Fundamentals',
    institution: 'Coursera — Duke University',
    link: '#',
  },
  {
    icon: Award,
    title: 'Python for Everybody Specialization',
    institution: 'Coursera — University of Michigan',
    link: '#',
  },
];

export default function Certifications() {
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

    const items = section.querySelectorAll('.cert-item');
    tl.fromTo(
      items,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-20 md:py-[120px] px-4"
      style={{
        zIndex: 1,
        background: 'linear-gradient(to bottom, #050505, #0a0a0a, #050505)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="section-label font-mono text-xs uppercase tracking-[0.08em] text-neon-green mb-2">
            // CERTIFICATIONS
          </p>
          <h2 className="section-heading font-display text-3xl sm:text-4xl md:text-[56px] font-bold text-text-primary tracking-[-0.02em] mb-4">
            Academic & Certifications
          </h2>
          <p className="section-subheading text-text-muted text-base max-w-xl">
            Verified credentials and continuous learning.
          </p>
        </div>

        {/* Certification Items */}
        <div className="space-y-0">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="cert-item flex items-center gap-4 md:gap-6 py-6 md:py-8 border-b border-border-subtle"
              >
                {/* Badge */}
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-neon-green/10 flex items-center justify-center">
                  <Icon size={24} className="text-neon-green md:w-7 md:h-7" />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-display text-base md:text-xl font-semibold text-text-primary truncate">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-0.5">{cert.institution}</p>
                </div>

                {/* Link */}
                {cert.link && (
                  <a
                    href={cert.link}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-sm text-neon-green hover:underline transition-all group"
                  >
                    Verify
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
