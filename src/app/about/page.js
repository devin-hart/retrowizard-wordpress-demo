// src/app/about/page.js
import Link from "next/link";
import Image from "next/image"; 

export default function AboutPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-rw-orange to-purple-500 mb-8 tracking-tight pb-2">
        About the Retro Wizard Archive
      </h1>

      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
        <p className="text-xl text-slate-300 mb-6">
          This project is a demonstration of a modern, decoupled (Headless) architecture designed for high performance, dynamic routing, and efficient content management. It transforms a standard WordPress installation into a powerful, data-serving API.
        </p>

        <h2 className="text-3xl font-bold text-white mb-4 mt-8">The Technology Stack</h2>
        <div className="space-y-4 text-slate-400">
          <p>This application is built on three distinct layers:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-slate-200">Frontend (Presentation Layer):</strong> Built with <strong className="text-slate-200">Next.js</strong> (App Router, JavaScript) and styled with <strong className="text-slate-200">Tailwind CSS</strong> (utilizing the Synthwave color palette). This layer handles all user interactions and rendering.
            </li>
            <li>
              <strong className="text-slate-200">API (Transport Layer):</strong> <strong className="text-slate-200">WPGraphQL</strong> serves as the single, strongly-typed endpoint, replacing the need for multiple REST API calls. Data is transported via HTTP POST requests using Apollo Client.
            </li>
            <li>
              <strong className="text-slate-200">Backend (Content Management System):</strong> <strong className="text-slate-200">WordPress</strong> (hosted on Pantheon) is used as a pure CMS. Content is structured using <strong className="text-slate-200">Custom Post Types</strong> (for Games) and <strong className="text-slate-200">Advanced Custom Fields</strong> (for metadata like Release Year).
            </li>
          </ul>
        </div>
        
        {/* NEW SECTION: WordPress Plugins */}
        <h2 className="text-3xl font-bold text-white mb-4 mt-10">Key WordPress Plugins</h2>
        <div className="space-y-2 text-slate-400">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-slate-200">WPGraphQL:</strong> Transforms WordPress into a GraphQL API, providing a single, flexible endpoint for data retrieval.</li>
            <li><strong className="text-slate-200">Advanced Custom Fields (ACF):</strong> Extends WordPress by allowing the creation of custom fields for Posts, Pages, and Custom Post Types, essential for storing game-specific metadata.</li>
            <li><strong className="text-slate-200">Custom Post Type UI (CPT UI):</strong> Provides a user-friendly interface for registering and managing Custom Post Types (like "Games") and Taxonomies (like "Platforms") without writing code.</li>
            <li><strong className="text-slate-200">Ultimate CSV Importer Free:</strong> Used for bulk importing game data from CSV files into WordPress, significantly speeding up content population.</li>
            <li><strong className="text-slate-200">WP Media Folder:</strong> Enhances media management in WordPress by allowing files to be organized into folders, making it easier to manage a large library of box art.</li>
          </ul>
        </div>
        {/* END NEW SECTION */}

        <h2 className="text-3xl font-bold text-white mb-4 mt-10">Implemented Features</h2>
        <div className="space-y-2 text-slate-400">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-slate-200">Dynamic Routing:</strong> Dedicated pages for Games (<code>/game/[slug]</code>) and Platforms (<code>/platform/[slug]</code>).</li>
            <li><strong className="text-slate-200">Client-Side Randomization:</strong> Homepage displays 8 random games, filtered evenly across the four main platforms.</li>
            <li><strong className="text-slate-200">Functional Search:</strong> Frontend filtering logic bypasses the WordPress search index to guarantee reliable title matching.</li>
            <li><strong className="text-slate-200">Image Optimization:</strong> Uses the Next.js <code>&lt;Image /&gt;</code> component for automatic optimization (on game cards and detail pages).</li>
            <li><strong className="text-slate-200">Modal Viewer:</strong> Clickable box art on the detail page opens a responsive, full-screen modal.</li>
            <li><strong className="text-slate-200">Unified Data Model:</strong> Platform data is managed using <strong className="text-slate-200">Taxonomies</strong> for scalable filtering and menu generation.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}