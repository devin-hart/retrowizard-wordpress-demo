'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-red-500/30 rounded-xl overflow-hidden shadow-2xl p-12 text-center">
          {/* Glitchy error icon */}
          <div className="mb-8 relative">
            <div className="text-8xl mb-4 animate-pulse">⚠️</div>
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 tracking-tight">
              System Error
            </h1>
          </div>

          {/* Error message */}
          <div className="mb-8 p-6 bg-slate-950/50 border border-red-500/20 rounded-lg">
            <p className="text-slate-300 font-mono text-sm mb-2">
              ERROR CODE: 0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0')}
            </p>
            <p className="text-red-400 font-medium">
              {error.message || 'An unexpected error occurred while loading this page.'}
            </p>
          </div>

          {/* Retro gaming themed message */}
          <p className="text-slate-400 mb-8 leading-relaxed">
            Looks like we hit a glitch in the matrix. The cartridge might need a good blow, or perhaps the connection isn't quite right.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              Reset Console
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-slate-800/60 border border-white/10 text-slate-200 font-bold rounded-lg hover:bg-slate-700/60 hover:border-cyan-500/50 transition-all"
            >
              Return Home
            </Link>
          </div>

          {/* Retro detail */}
          <div className="mt-12 text-xs text-slate-600 font-mono">
            TIP: Try clearing your browser cache or reloading the page
          </div>
        </div>
      </div>
    </div>
  );
}
