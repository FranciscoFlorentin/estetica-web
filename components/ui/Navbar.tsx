
import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/constants';

interface NavbarProps {
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-gray-100' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif tracking-tighter hover:opacity-70 transition-opacity">
          {siteConfig.shortName.toUpperCase()}<span className="text-[#B89A67]">.</span>
        </a>

        <div className="hidden md:flex gap-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          {siteConfig.nav.map((item) => (
            <a key={item.name} href={item.href} className="hover:text-black transition-colors">{item.name}</a>
          ))}
        </div>

        <button
          onClick={onBookClick}
          className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#B89A67] hover:border-[#B89A67] transition-all"
        >
          Reservar Cita
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
