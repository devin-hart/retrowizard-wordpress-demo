// src/components/ImageModal.js
'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ImageModal({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  const Modal = () => (
    <div 
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
    >
      {/* Container for the full-size image in the MODAL */}
      <div className="relative w-full h-full max-w-6xl max-h-[95vh] overflow-hidden rounded-xl bg-gray-900 shadow-2xl"> 
        {src ? (
          <Image 
            src={src}
            alt={alt || "Full size game art"}
            fill 
            className="object-contain" // object-contain inside 'fill' will shrink it
            sizes="(max-width: 768px) 100vw, 80vw" 
            priority 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-600 font-mono bg-slate-800 rounded-xl">NO IMAGE</div>
        )}
        
        {/* Close Button - z-index is important to keep it above the image */}
        <button 
          className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition z-10"
          aria-label="Close image"
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Clickable Image (The original Box Art view on the page) */}
      {/* Reverted classes here. It should only define its layout within the parent flex. */}
      <div 
        onClick={() => setIsOpen(true)}
        className="md:w-5/12 relative min-h-[500px] border-r border-white/5 bg-black/20 hover:opacity-80 cursor-pointer transition-opacity"
      >
        {/* The Image inside the container... */}
        {src ? (
          <Image 
            src={src}
            alt={alt || "Box Art"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-600 font-mono">NO SIGNAL</div>
        )}
      </div>
      
      {/* Render Modal if state is open */}
      {isOpen && <Modal />}
    </>
  );
}