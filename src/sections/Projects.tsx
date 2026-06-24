import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Library Management System',
    description:
      'A full-stack Java application for managing library operations including book cataloging, member management, borrowing/return tracking, and fine calculation. Implemented with a clean MVC architecture and MySQL database integration. Features include search with filtering, overdue alerts, and an admin dashboard with analytics.',
    tags: ['Java', 'MySQL', 'JDBC', 'Swing'],
    github: '#',
    featured: false,
  },
  {
    title: 'Python Automation Toolkit',
    description:
      'A collection of Python scripts designed to automate repetitive tasks including file organization, bulk data processing, web scraping, and report generation. Reduced manual task time by 80% for data entry workflows. Features a modular design allowing easy extension with new automation scripts.',
    tags: ['Python', 'Selenium', 'Pandas', 'OpenPyXL'],
    github: '#',
    featured: false,
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'This portfolio site — designed and built from scratch with a focus on performance, accessibility, and visual impact. Features smooth scroll animations, a dynamic canvas background, and semantic HTML5 structure optimized for ATS parsing.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
    github: '#',
    featured: true,
  },
  {
    title: 'AI Content Assistant',
    description:
      'A Python-based tool that leverages OpenAI\'s API to assist with content creation tasks including summarization, translation, code generation, and prompt optimization. Includes a command-line interface with customizable prompt templates and output formatting options.',
    tags: ['Python', 'OpenAI API', 'CLI', 'NLP'],
    github: '#',
    featured: false,
  },
];

export default function Projects() {
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

    const cards = section.querySelectorAll('.project-card');
    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-[120px] px-4"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="section-label font-mono text-xs uppercase tracking-[0.08em] text-neon-green mb-2">
            // PROJECTS
          </p>
          <h2 className="section-heading font-display text-3xl sm:text-4xl md:text-[56px] font-bold text-text-primary tracking-[-0.02em] mb-4">
            Featured Projects
          </h2>
          <p className="section-subheading text-text-muted text-base max-w-xl">
            Real-world applications built to solve problems and demonstrate technical depth.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-dark-surface border border-border-subtle rounded-lg p-6 md:p-8 transition-all duration-300 hover:border-neon-green hover:shadow-glow-green-sm relative"
            >
              {/* "You are here" badge for portfolio project */}
              {project.featured && (
                <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-neon-green/10 text-neon-green border border-neon-green/30">
                  You are here
                </span>
              )}

              {/* Title + GitHub Link */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-neon-green transition-colors">
                  {project.title}
                </h3>
                <a
                  href={project.github}
                  className="text-text-muted hover:text-neon-green transition-colors flex-shrink-0"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={18} />
                </a>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags + Link */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="font-mono text-[11px] px-2.5 py-1 rounded bg-neon-green/10 text-neon-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-1.5 text-sm text-neon-green hover:underline transition-all"
                >
                  <ExternalLink size={14} />
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
