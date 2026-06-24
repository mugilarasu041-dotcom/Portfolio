import { useEffect, useState } from 'react';
import { Menu, X, FileDown } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-deep-black/85 backdrop-blur-xl border-b border-border-subtle'
            : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-sm font-bold uppercase tracking-[0.1em] text-text-primary hover:text-neon-green transition-colors"
          >
            MUGILARASU
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-text-secondary hover:text-neon-green transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon-green transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <a
            href="#resume"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-neon-green/50 bg-transparent text-text-primary font-mono text-xs uppercase tracking-wider hover:bg-gradient-to-r hover:from-neon-green hover:to-soft-teal hover:text-deep-black transition-all duration-300"
          >
            <FileDown size={14} />
            Resume
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-deep-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-display font-semibold text-text-primary hover:text-neon-green transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#resume"
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border border-neon-green text-neon-green font-mono text-sm uppercase tracking-wider hover:bg-neon-green hover:text-deep-black transition-all duration-300"
          >
            <FileDown size={16} />
            Download Resume
          </a>
        </div>
      )}
    </>
  );
}
