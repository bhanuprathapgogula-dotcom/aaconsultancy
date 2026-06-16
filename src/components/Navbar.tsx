"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTop = (e as CustomEvent).detail?.scrollTop ?? window.scrollY;
      if (scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("app-scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("app-scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Technologies", href: "#technologies" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-glass-border shadow-lg shadow-black/20"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-neon-blue to-neon-purple p-[1.5px] shadow-md shadow-neon-blue/10">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-background">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-xl font-black text-transparent">
                A
              </span>
            </div>
            <div className="absolute inset-0 rounded-lg border border-dashed border-neon-cyan/40 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 animate-[spin_10s_linear_infinite]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.15em] text-foreground leading-none uppercase">
              A&A
            </span>
            <span className="text-[9px] tracking-[0.3em] text-muted font-medium uppercase mt-0.5">
              consultancy
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-muted hover:text-neon-cyan transition-colors relative py-2 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-neon-blue to-neon-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="glow-btn-blue relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
          >
            Book Consultation
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground/70 hover:text-foreground p-2 rounded-lg focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-glass-border p-8 shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "64px", height: "calc(100vh - 64px)" }}
      >
        <div className="flex flex-col h-full justify-between">
          <nav className="flex flex-col gap-6 mt-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-lg font-semibold text-muted hover:text-neon-cyan transition-all duration-300 py-2 border-b border-glass-border flex justify-between items-center group"
                style={{
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                {link.name}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          <div className="mb-12">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full glow-btn-blue flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple py-3.5 text-sm font-semibold text-white uppercase tracking-wider cursor-pointer"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      </header>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
