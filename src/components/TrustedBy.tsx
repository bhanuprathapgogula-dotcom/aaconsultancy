"use client";

import React from "react";

export default function TrustedBy() {
  // SVG-based fictional premium brand logos
  const brandLogos = [
    {
      name: "Quantum",
      logo: (
        <svg className="h-6 w-auto text-gray-400 group-hover:text-neon-cyan transition-colors" viewBox="0 0 120 30" fill="currentColor">
          <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="15" r="3" />
          <path d="M22 22l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <text x="35" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.1em">QUANTUM</text>
        </svg>
      ),
    },
    {
      name: "Nexus",
      logo: (
        <svg className="h-6 w-auto text-gray-400 group-hover:text-neon-blue transition-colors" viewBox="0 0 100 30" fill="currentColor">
          <path d="M10 5l10 10L10 25M25 5l-10 10 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="33" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.1em">NEXUS</text>
        </svg>
      ),
    },
    {
      name: "Aether",
      logo: (
        <svg className="h-6 w-auto text-gray-400 group-hover:text-neon-purple transition-colors" viewBox="0 0 110 30" fill="currentColor">
          <path d="M15 5L5 23h20L15 5z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="15" cy="14" r="3" />
          <text x="33" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.15em">AETHER</text>
        </svg>
      ),
    },
    {
      name: "Synthesis",
      logo: (
        <svg className="h-6 w-auto text-gray-400 group-hover:text-neon-cyan transition-colors" viewBox="0 0 125 30" fill="currentColor">
          <path d="M5 15h20M15 5v20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="15" cy="15" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="33" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.1em">SYNTHESIS</text>
        </svg>
      ),
    },
    {
      name: "Vertex",
      logo: (
        <svg className="h-6 w-auto text-gray-400 group-hover:text-neon-blue transition-colors" viewBox="0 0 105 30" fill="currentColor">
          <path d="M5 25L15 5l10 20H5z" fill="currentColor" opacity="0.15" />
          <path d="M5 25L15 5l10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="32" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.15em">VERTEX</text>
        </svg>
      ),
    },
    {
      name: "Apex Labs",
      logo: (
        <svg className="h-6 w-auto text-gray-400 group-hover:text-neon-purple transition-colors" viewBox="0 0 120 30" fill="currentColor">
          <path d="M10 25h10M15 5v20M5 10l20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <text x="35" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.1em">APEX_LABS</text>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-12 bg-transparent overflow-hidden border-y border-white/5">
      {/* Background neon soft blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent blur-md" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <h2 className="text-[10px] tracking-[0.3em] font-semibold text-gray-500 uppercase mb-8 text-center">
          Trusted by elite teams at next-generation enterprises
        </h2>

        {/* Marquee Strip Container */}
        <div className="w-full glass-panel rounded-2xl py-6 overflow-hidden relative shadow-lg shadow-black/30">
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

          {/* Marquee Body */}
          <div className="animate-marquee gap-16 md:gap-24 items-center">
            {/* First Set */}
            {brandLogos.map((brand, index) => (
              <div key={`brand-1-${index}`} className="flex items-center justify-center group cursor-pointer">
                {brand.logo}
              </div>
            ))}
            {/* Second Set (Duplicate for infinite seamless loop) */}
            {brandLogos.map((brand, index) => (
              <div key={`brand-2-${index}`} className="flex items-center justify-center group cursor-pointer">
                {brand.logo}
              </div>
            ))}
            {/* Third Set (Extra padding for very wide displays) */}
            {brandLogos.map((brand, index) => (
              <div key={`brand-3-${index}`} className="flex items-center justify-center group cursor-pointer">
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
