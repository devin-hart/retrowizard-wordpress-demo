import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto border-t border-indigo-900/50 relative z-10">
      <div className="max-w-6xl mx-auto p-12 grid md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div>
          <Link href="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 block">
            RETRO WIZARD
          </Link>
          <p className="text-slate-400 leading-relaxed">
            A demo by Devin Hart showcasing React, Next.js, GraphQL, WordPress, and Advanced Custom Fields.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-6 text-slate-100 uppercase tracking-wider">Connect</h4>
          <ul className="space-y-3 text-slate-400 font-medium">
            <li><a href="https://devinh.art" className="hover:text-rw-orange transition flex items-center"><span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>Portfolio</a></li>
            <li><a href="https://github.com/devin-hart" className="hover:text-rw-orange transition flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/devin-hart/" className="hover:text-yellow-400 transition flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>LinkedIn</a></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-end text-slate-500 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Retro Wizard Database.</p>
          <p className="mt-1">Built with Next.js & WordPress GraphQL.</p>
        </div>
      </div>
    </footer>
  );
}