import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { CursorState } from './CustomCursor';
import { SOCIAL_LINKS } from '../data/projects';

interface NavigationProps {
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

export const Navigation: React.FC<NavigationProps> = ({ setCursorState }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for background styling
      setScrolled(currentScrollY > 20);

      // Require minimum scroll delta to prevent micro-jitter
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) < 6) {
        return;
      }

      // Always show when near the very top of the page
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (delta > 0) {
        // Scrolling DOWN -> smoothly hide the header
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        // Scrolling UP -> smoothly reappear
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'SERVICES', href: '#services' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled
            ? 'bg-[#0C0D14]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-[#0C0D14]/90 via-[#0C0D14]/60 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group transition-all duration-300 hover:opacity-90"
            onMouseEnter={() =>
              setCursorState({ text: '', variant: 'default', visible: true })
            }
          >
            <img
              src="https://res.cloudinary.com/qbs6njjr/image/upload/v1792748062/morrow2_logo.png"
              alt="Morrow Visuals Logo"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain max-w-[280px] sm:max-w-[360px] md:max-w-[400px] drop-shadow-[0_4px_24px_rgba(221,168,56,0.35)] filter contrast-125 brightness-110 transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest font-medium text-[#A1A1AA]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DDA838] hover:after:w-full after:transition-all after:duration-300 font-medium"
                onMouseEnter={() =>
                  setCursorState({ text: '', variant: 'default', visible: true })
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA: Hire on Upwork styled with btn-gold */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-xs tracking-wider px-5 py-2.5 whitespace-nowrap shadow-md"
              onMouseEnter={() =>
                setCursorState({ text: 'UPWORK ↗', variant: 'default', visible: true })
              }
              onMouseLeave={() =>
                setCursorState({ text: '', variant: 'default', visible: true })
              }
            >
              <span>HIRE ON UPWORK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#EDECE8] hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0C0D14]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] tracking-widest text-[#787774] uppercase font-mono">Menu</span>
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight text-[#EDECE8] hover:text-[#DDA838] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
            <a
              href={SOCIAL_LINKS.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold w-full text-center py-3.5 text-xs font-semibold tracking-wider block"
            >
              HIRE ON UPWORK ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
};
