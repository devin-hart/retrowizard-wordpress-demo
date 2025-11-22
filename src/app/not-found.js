import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl p-12 text-center">
          {/* Retro 404 display */}
          <div className="mb-8">
            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-rw-orange mb-4 tracking-tighter animate-pulse">
              404
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Game Not Found
            </h1>
            <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
              <p className="text-red-400 font-bold text-sm uppercase tracking-widest">
                Cartridge Missing
              </p>
            </div>
          </div>

          {/* Pixel art styled divider */}
          <div className="my-8 flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
            <div className="w-3 h-3 bg-cyan-500 rotate-45"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>

          {/* Retro gaming message */}
          <div className="mb-8 space-y-4 text-slate-300">
            <p className="text-lg leading-relaxed">
              Looks like this cartridge has been removed from the archive, or perhaps it never existed in this timeline.
            </p>
            <p className="text-slate-400">
              The pixels you're looking for have scattered to the digital void. Time to head back to the main collection and browse our legendary 16-bit titles.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Library
              </span>
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-slate-800/60 border border-white/10 text-slate-200 font-bold rounded-lg hover:bg-slate-700/60 hover:border-cyan-500/50 transition-all"
            >
              Learn About Retro Wizard
            </Link>
          </div>

          {/* Retro stats/info */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-xs text-slate-600 font-mono">
              ERROR_CODE: PAGE_NOT_FOUND | STATUS: 404 | YEAR: {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Fun retro element */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-mono">
            💾 Remember: Always save your progress! 💾
          </p>
        </div>
      </div>
    </div>
  );
}
