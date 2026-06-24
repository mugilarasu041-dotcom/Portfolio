import { ChevronUp } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative bg-dark-surface border-t border-border-subtle py-8 md:py-10 px-4"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="text-sm text-text-muted text-center md:text-left">
          &copy; {new Date().getFullYear()} Mugilarasu. Built with passion and code.
        </p>

        {/* Quick Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-text-muted hover:bg-neon-green hover:text-deep-black hover:border-neon-green transition-all duration-300"
          aria-label="Back to top"
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </footer>
  );
}
