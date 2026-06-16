"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  isCustomSvg?: boolean;
  svgMarkup?: React.ReactNode;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "SaaS Platforms", "Ecommerce", "Healthcare", "Education", "Finance"];

  const projects: Project[] = [
    {
      id: 1,
      title: "SaaS Talent Scaling",
      category: "SaaS Platforms",
      desc: "Successfully recruited 50+ Senior Frontend & Backend engineers in 30 days for a hyper-growth US Fintech startup.",
      image: "/images/saas_dashboard.png",
    },
    {
      id: 2,
      title: "CTO & Design Sourcing",
      category: "Ecommerce",
      desc: "Vetted and placed the executive CTO and Lead UX/UI Designers to architect a unified digital commerce ecosystem.",
      image: "",
      isCustomSvg: true,
      svgMarkup: (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1736] to-[#150a25] flex flex-col items-center justify-center p-6 text-center select-none">
          <svg className="w-16 h-16 text-neon-blue mb-4 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="25" y="35" width="50" height="45" rx="5" />
            <path d="M35 35c0-10 7-15 15-15s15 5 15 15" strokeLinecap="round" />
            <circle cx="50" cy="55" r="8" strokeDasharray="3,3" />
          </svg>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neon-cyan font-bold">Executive_Hire</span>
        </div>
      ),
    },
    {
      id: 3,
      title: "AI & ML Scientists Sourcing",
      category: "Healthcare",
      desc: "Identified and hired 20+ specialized Computer Vision and Machine Learning scientists for a medical telemetry platform.",
      image: "",
      isCustomSvg: true,
      svgMarkup: (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#051c20] to-[#0d0922] flex flex-col items-center justify-center p-6 text-center select-none">
          <svg className="w-16 h-16 text-emerald-400 mb-4 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 50h15l10-25 10 50 10-35 10 10h15" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" />
          </svg>
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-bold">AI_Diagnostics_Scale</span>
        </div>
      ),
    },
    {
      id: 4,
      title: "Immersive VR Developers",
      category: "Education",
      desc: "Acquired creative game engine designers and graphics C++ engineers to build immersive classrooms.",
      image: "",
      isCustomSvg: true,
      svgMarkup: (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#140b25] to-[#070b20] flex flex-col items-center justify-center p-6 text-center select-none">
          <svg className="w-16 h-16 text-neon-purple mb-4 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50 20L15 40l35 20 35-20-35-20zM15 40v25c0 10 15 15 35 15s35-5 35-15V40" />
            <line x1="50" y1="60" x2="50" y2="80" />
          </svg>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neon-purple font-bold">VR_Specialists</span>
        </div>
      ),
    },
    {
      id: 5,
      title: "DeFi Security Auditors",
      category: "Finance",
      desc: "Placed Principal Cryptography Auditors and smart contract specialists to secure globally distributed ledgers.",
      image: "",
      isCustomSvg: true,
      svgMarkup: (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0c21] to-[#121c25] flex flex-col items-center justify-center p-6 text-center select-none">
          <svg className="w-16 h-16 text-neon-cyan mb-4 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 80V50M40 80V25M60 80V40M80 80V15" strokeLinecap="round" />
            <path d="M15 80h70" strokeLinecap="round" />
            <circle cx="80" cy="15" r="3" fill="currentColor" />
          </svg>
          <span className="text-[10px] tracking-[0.3em] uppercase text-neon-cyan font-bold">Smart_Contract_Security</span>
        </div>
      ),
    },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="relative py-24 bg-background overflow-hidden">
      {/* Glow ambient orbs */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-neon-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-blue mb-3">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Fulfillment Success Stories
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto p-1 bg-glass-bg border border-glass-border rounded-2xl md:rounded-full backdrop-blur-md">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-md shadow-neon-blue/20"
                  : "text-muted hover:text-foreground hover:bg-glass-bg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group glass-panel rounded-2xl overflow-hidden border border-glass-border bg-gradient-to-b from-glass-bg to-transparent flex flex-col justify-between h-[420px] relative shadow-lg shadow-black/20"
              >
                {/* Media Container */}
                <div className="h-[230px] w-full relative overflow-hidden bg-zinc-950 border-b border-glass-border flex items-center justify-center">
                  {project.isCustomSvg ? (
                    project.svgMarkup
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-w-770px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}

                  {/* Dark Glass Overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10 backdrop-blur-[2px]">
                    <button
                      onClick={() => handleScroll("#contact")}
                      className="p-3 rounded-full bg-neon-blue text-foreground shadow-lg shadow-neon-blue/30 hover:scale-110 transition-transform duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll("#contact");
                      }}
                      className="p-3 rounded-full bg-glass-hover text-foreground border border-glass-border hover:bg-glass-hover hover:scale-110 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex flex-col flex-1 justify-between relative z-20 bg-background/30 backdrop-blur-sm">
                  <div>
                    {/* Category tag */}
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neon-cyan font-bold mb-2 block">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted font-light leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>
                  </div>

                  {/* bottom bar */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-neon-purple font-semibold uppercase tracking-wider group-hover:text-neon-cyan transition-colors">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-neon-blue/20 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
