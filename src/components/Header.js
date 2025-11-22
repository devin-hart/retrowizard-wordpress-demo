'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderNav from './HeaderNav';

export default function Header({ platforms }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or near top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-md transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between min-h-[80px] md:min-h-[96px]">

        {/* Logo - Now an Image - FIXED SIZE */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/rw-logo.webp"
            alt="Retro Wizard Logo with Hat"
            width={65}
            height={65}
            priority={true}
            className="w-[65px] h-[65px] object-contain group-hover:opacity-80 transition-opacity duration-300"
          />
        </Link>

        {/* Navigation */}
        <HeaderNav platforms={platforms} />

      </div>
    </header>
  );
}
