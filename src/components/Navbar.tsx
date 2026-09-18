import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
      <nav className="glass-nav rounded-full px-5 py-2.5 md:px-8 md:py-3.5 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo / Text */}
        <a href="#hero" className="flex items-center group">
          <span className="font-serif text-base md:text-lg font-bold tracking-wide text-white group-hover:text-[#ff5fac] transition-colors">
            puteryna<span className="text-[#d8ac6a]">_</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
          <a
            href="#hero"
            className={`transition-colors hover:text-[#ff5fac] ${
              activeSection === 'hero' ? 'text-[#ff5fac] font-semibold' : ''
            }`}
          >
            Home
          </a>
          <a
            href="#about"
            className={`transition-colors hover:text-[#ff5fac] ${
              activeSection === 'about' ? 'text-[#ff5fac] font-semibold' : ''
            }`}
          >
            About Me
          </a>
          <a
            href="#portfolio"
            className={`transition-colors hover:text-[#ff5fac] ${
              activeSection === 'portfolio' ? 'text-[#ff5fac] font-semibold' : ''
            }`}
          >
            Portfolio & Skills
          </a>
          <a
            href="#contact"
            className={`transition-colors hover:text-[#ff5fac] ${
              activeSection === 'contact' ? 'text-[#ff5fac] font-semibold' : ''
            }`}
          >
            Contact
          </a>
        </div>

        {/* Quick CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff5fac] to-[#d8ac6a] text-black hover:opacity-90 transition-all shadow-[0_0_18px_rgba(255,95,172,0.6)] flex items-center gap-1.5"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-200 hover:text-[#ff5fac] focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 rounded-2xl glass-panel border border-[#ff5fac]/35 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-3.5 text-center text-sm font-medium text-gray-200">
            <a
              href="#hero"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#ff5fac] transition-colors border-b border-white/5"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#ff5fac] transition-colors border-b border-white/5"
            >
              About Me
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#ff5fac] transition-colors border-b border-white/5"
            >
              Portfolio & Skills
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-[#ff5fac] transition-colors"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff5fac] to-[#d8ac6a] text-black flex items-center justify-center gap-1 mt-1"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
