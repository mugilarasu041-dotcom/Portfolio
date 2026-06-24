import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, Github, ChevronDown, FileDown, Code } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Glass container entrance
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    // Portrait entrance
    tl.fromTo(
      portraitRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // Name character animation
    if (nameRef.current) {
      const text = nameRef.current.textContent || '';
      nameRef.current.innerHTML = '';
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        nameRef.current!.appendChild(span);
        return span;
      });

      tl.to(
        chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.03,
        },
        '-=0.3'
      );
    }

    // Title entrance
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );

    // Tagline + CTAs + socials
    tl.fromTo(
      [taglineRef.current, ctaRef.current, socialsRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ zIndex: 1 }}
    >
      <div
        ref={containerRef}
        className="relative max-w-[800px] w-full text-center rounded-2xl p-8 md:p-12"
        style={{
          background: 'rgba(5, 5, 5, 0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(26, 26, 26, 0.5)',
        }}
      >
        {/* Portrait */}
        <div className="flex justify-center mb-8">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 200,
              height: 200,
              border: '3px solid transparent',
              background: 'linear-gradient(#050505, #050505) padding-box, linear-gradient(135deg, #34d399, #2dd4bf) border-box',
              boxShadow: '0 0 30px rgba(52, 211, 153, 0.2)',
            }}
          >
            <img
              ref={portraitRef}
              src="/hero-portrait.jpg"
              alt="Mugilarasu - Computer Science Student"
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.05) saturate(0.95)' }}
            />
          </div>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary tracking-[-0.02em] leading-[1.05]"
        >
          Mugilarasu
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="font-display text-lg sm:text-xl md:text-[32px] font-semibold text-text-secondary mt-2"
        >
          Computer Science Student | Java & Python Developer
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-base text-text-muted mt-4 max-w-[600px] mx-auto leading-relaxed"
        >
          3rd-year BSc CS student passionate about building scalable software solutions.
          Specializing in Java backend development, Python automation, and AI technologies.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#resume"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
              color: '#050505',
            }}
          >
            <FileDown size={16} />
            Download Resume
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md text-sm font-medium border border-neon-green text-neon-green bg-transparent hover:bg-neon-green/10 transition-all duration-300"
          >
            <Code size={16} />
            View Projects
          </a>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex items-center justify-center gap-6 mt-6">
          <a
            href="mailto:mugilarasu041@gmail.com"
            className="text-text-muted hover:text-neon-green transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://wa.me/918270495250"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-neon-green transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <Phone size={20} />
          </a>
          <a
            href="#"
            className="text-text-muted hover:text-neon-green transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-text-muted hover:text-neon-green transition-colors"
          aria-label="Scroll to About section"
        >
          <ChevronDown size={24} />
        </a>
      </div>
    </section>
  );
}
