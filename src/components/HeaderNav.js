// src/components/HeaderNav.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SearchBar from './SearchBar';

// Platform logo mapping
const platformLogos = {
  'sega-genesis': '/sega-genesis_logo.webp',
  'snes': '/snes_logo.webp',
  'turbografx-16': '/turbografx-16_logo.webp'
};

// Helper component for the hamburger icon
const MenuIcon = ({ isOpen, onClick }) => (
  <button onClick={onClick} className="md:hidden text-white hover:text-rw-orange transition-colors z-[999] p-2">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
      )}
    </svg>
  </button>
);

export default function HeaderNav({ platforms }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center gap-6 font-medium text-sm">
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {platforms.map((platform) => {
          // Use GraphQL logo if available, otherwise fallback to local
          const logoUrl = platform.platformDetails?.platformLogo?.node?.sourceUrl || platformLogos[platform.slug];
          const logoAlt = platform.platformDetails?.platformLogo?.node?.altText || `${platform.name} logo`;

          return (
            <Link
              key={platform.slug}
              href={`/platform/${platform.slug}`}
              className="flex items-center gap-2 transition-colors group"
              aria-label={`Browse ${platform.name} games`}
              title={platform.name}
            >
              {logoUrl && (
                <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 xl:w-40 xl:h-20 logo-glow">
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </Link>
          );
        })}
        <Link
          href="/about"
          className="text-slate-300 hover:text-rw-orange transition-colors"
        >
          About
        </Link>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:block">
        <SearchBar />
      </div>
      
      {/* Mobile Hamburger Icon */}
      <MenuIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Mobile Menu Container */}
      <div
        className={`fixed inset-0 z-50 h-screen transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
        style={{
          background: 'radial-gradient(circle at center top, #1e1b4b, #020617)'
        }}
      >
        {/* Internal Content Wrapper - Left Aligned */}
        <div className="p-6 pt-24 h-full overflow-y-auto flex flex-col">

          {/* 1. Mobile Search Bar - Full Width */}
          <div className="mb-6 w-full">
            <SearchBar onSearch={() => setIsOpen(false)} />
          </div>

          {/* 2. Mobile Navigation Links with Logos */}
          <div className="flex flex-col w-full">
            {platforms.map((platform) => {
              // Use GraphQL logo if available, otherwise fallback to local
              const logoUrl = platform.platformDetails?.platformLogo?.node?.sourceUrl || platformLogos[platform.slug];
              const logoAlt = platform.platformDetails?.platformLogo?.node?.altText || `${platform.name} logo`;

              return (
                <div key={platform.slug} className="w-full border-b border-white/5">
                  <Link
                    href={`/platform/${platform.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-start logo-glow"
                    aria-label={`Browse ${platform.name} games`}
                    title={platform.name}
                  >
                    {logoUrl && (
                      <div className="relative w-48 h-24">
                        <Image
                          src={logoUrl}
                          alt={logoAlt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
            <div className="w-full border-b border-white/5">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-slate-200 hover:text-rw-orange transition-colors py-2 block text-left text-xl font-bold"
              >
                About
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
}