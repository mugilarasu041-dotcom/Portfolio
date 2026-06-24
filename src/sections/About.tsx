import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const codeSnippet = `class Developer {
  name = "Mugilarasu";
  role = "CS Student";
  skills = ["Java", "Python", 
            "Web Dev", "AI/ML"];
  
  buildFuture() {
    while (learning) {
      code.improve();
      skills.expand();
    }
  }
}`;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

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
      section.querySelector('.section-body'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );
    tl.fromTo(
      section.querySelector('.code-block'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    );

    // Typing effect for code
    if (codeRef.current) {
      const codeEl = codeRef.current;
      const fullText = codeSnippet;
      codeEl.textContent = '';

      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        onEnter: () => {
          let i = 0;
          const typeInterval = setInterval(() => {
            if (i < fullText.length) {
              codeEl.textContent += fullText[i];
              i++;
            } else {
              clearInterval(typeInterval);
            }
          }, 15);
        },
        once: true,
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-[120px] px-4"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column — Text */}
          <div>
            <p className="section-label font-mono text-xs uppercase tracking-[0.08em] text-neon-green mb-2">
              // ABOUT
            </p>
            <h2 className="section-heading font-display text-3xl sm:text-4xl md:text-[56px] font-bold text-text-primary leading-[1.1] tracking-[-0.02em]">
              Driven by Code.
              <br />
              Focused on Impact.
            </h2>
            <div className="section-body mt-6 text-text-secondary leading-[1.7] max-w-[540px]">
              <p className="mb-4">
                I'm Mugilarasu, a third-year BSc Computer Science student with a deep
                passion for software engineering and emerging technologies. My journey in
                tech started with a curiosity about how things work — and evolved into a
                drive to build things that matter.
              </p>
              <p className="mb-4">
                I specialize in Java for robust backend systems and Python for automation,
                data processing, and AI integration. I'm currently expanding my expertise
                into AI video generation, LLM training, and prompt engineering — areas where
                I believe the future of software is heading.
              </p>
              <p>
                When I'm not coding, I'm exploring new frameworks, contributing to
                open-source projects, or experimenting with AI tools. I'm actively seeking
                internship and entry-level opportunities where I can contribute, learn, and
                grow alongside experienced engineering teams.
              </p>
            </div>
          </div>

          {/* Right Column — Code Block */}
          <div className="code-block">
            <div className="bg-dark-surface border border-border-subtle rounded-lg p-6 overflow-hidden">
              {/* Window Controls */}
              <div className="flex gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              {/* Code */}
              <pre
                ref={codeRef}
                className="font-mono text-[13px] leading-relaxed overflow-x-auto"
                style={{ minHeight: 240 }}
              >
                <code className="text-text-secondary">
                  {/* Text will be typed here */}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
