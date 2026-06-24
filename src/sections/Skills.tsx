import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileCode,
  Terminal,
  Globe,
  Video,
  Brain,
  MessageSquare,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: FileCode,
    title: 'Java Development',
    description:
      'Building scalable backend services and applications with Java. Strong in OOP principles, data structures, algorithms, and enterprise application patterns.',
    tags: ['Java', 'OOP', 'Backend'],
  },
  {
    icon: Terminal,
    title: 'Python Programming',
    description:
      'Automation, data scripting, and AI integration. Experienced with NumPy, Pandas, and building Python-based automation pipelines.',
    tags: ['Python', 'Automation', 'Data'],
  },
  {
    icon: Globe,
    title: 'Web Coding & Development',
    description:
      'Creating responsive, interactive websites using HTML, CSS, JavaScript, and modern frameworks. Full-stack capable with strong frontend fundamentals.',
    tags: ['HTML/CSS', 'JavaScript', 'React'],
  },
  {
    icon: Video,
    title: 'AI Video Generation',
    description:
      'Leveraging cutting-edge AI tools to generate, edit, and enhance video content. Experienced with modern generative AI video platforms and workflows.',
    tags: ['Gen AI', 'Video AI', 'Creative'],
  },
  {
    icon: Brain,
    title: 'AI & LLM Training',
    description:
      'Training and fine-tuning Large Language Models for specific tasks. Understanding of transformer architectures, fine-tuning techniques, and model evaluation.',
    tags: ['LLMs', 'Fine-tuning', 'Transformers'],
  },
  {
    icon: MessageSquare,
    title: 'Prompt Engineering',
    description:
      'Crafting precise, effective prompts to maximize AI model performance. Skilled in chain-of-thought, few-shot, and system prompt design patterns.',
    tags: ['Prompts', 'CoT', 'Optimization'],
  },
];

export default function Skills() {
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

    const cards = section.querySelectorAll('.skill-card');
    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-[120px] px-4"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="section-label font-mono text-xs uppercase tracking-[0.08em] text-neon-green mb-2">
            // SKILLS
          </p>
          <h2 className="section-heading font-display text-3xl sm:text-4xl md:text-[56px] font-bold text-text-primary tracking-[-0.02em] mb-4">
            Technical Expertise
          </h2>
          <p className="section-subheading text-text-muted text-base max-w-xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="skill-card group bg-dark-surface border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-neon-green hover:shadow-glow-green-sm"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <Icon size={28} className="text-neon-green" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="font-mono text-[11px] px-2.5 py-1 rounded bg-neon-green/10 text-neon-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
