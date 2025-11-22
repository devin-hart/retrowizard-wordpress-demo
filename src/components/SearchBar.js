// src/components/SearchBar.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ onSearch }) { // Added onSearch prop
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery(''); 
      if (onSearch) onSearch(); // Call handler to close menu
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full md:w-48">
      <input
        type="search"
        placeholder="Search titles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // Added w-full for mobile sizing
        className="px-4 py-3 md:py-2 w-full bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all pl-10" 
      />
      {/* Search Icon */}
      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rw-orange transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
    </form>
  );
}