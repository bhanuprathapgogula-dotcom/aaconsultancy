"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Technologies", href: "#technologies" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "Software Dev",
    "AI Automation",
    "Cloud Architectures",
  ];

  const technologies = [
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "AWS",
  ];

  return (
    <footer className="relative bg-transparent overflow-hidden pt-16 pb-12 border-t border-glass-border">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 flex flex-col items-start gap-4">
            <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-3 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-lg font-black text-transparent">
                    A
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-[0.15em] text-foreground leading-none uppercase">
                  A&A
                </span>
                <span className="text-[8px] tracking-[0.3em] text-gray-500 font-semibold uppercase mt-0.5">
                  consultancy
                </span>
              </div>
            </a>
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-sm">
              We design and construct premium scalable digital assets. Combining rigorous high-end engineering with modern SaaS visual aesthetics.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Map Directory
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-xs text-muted hover:text-neon-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services list */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="text-xs text-muted hover:text-neon-cyan transition-colors"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech list */}
          <div className="col-span-2 md:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Core Tech
            </h4>
            <ul className="space-y-2.5">
              {technologies.map((tech) => (
                <li key={tech}>
                  <a
                    href="#technologies"
                    onClick={(e) => handleScrollTo(e, "#technologies")}
                    className="text-xs text-muted hover:text-neon-cyan transition-colors"
                  >
                    {tech}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[10px] text-gray-500 font-mono tracking-wide">
            &copy; {new Date().getFullYear()} A&A CONSULTANCY. ALL RIGHTS RESERVED. SECURE CODES LOGGED.
          </span>

          <button
            onClick={handleScrollTop}
            className="p-3 rounded-xl bg-glass-bg border border-glass-border text-muted hover:text-foreground hover:border-glass-border transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider group"
          >
            Scroll Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
