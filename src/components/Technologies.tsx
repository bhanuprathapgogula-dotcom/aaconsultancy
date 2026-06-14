"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Factory,
  Wrench,
  Car,
  Store,
  HeartPulse,
  RotateCw,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  accent: string;
  glowColor: string;
  desc: string;
}

export default function Technologies() {
  const [activeTech, setActiveTech] = useState<number | null>(null);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotationY, setStartRotationY] = useState(0);
  const [translateZ, setTranslateZ] = useState(280);
  const autoRotateRef = useRef<boolean>(true);

  const techStack: TechItem[] = [
    {
      name: "Information Technology",
      category: "IT Division",
      icon: <Cpu className="w-8 h-8" />,
      accent: "text-neon-cyan border-neon-cyan/20 group-hover:border-neon-cyan/80",
      glowColor: "rgba(6, 182, 212, 0.4)",
      desc: "Sourcing software developers, web developers, cloud engineers, testers, DevOps engineers, and network administrators.",
    },
    {
      name: "Manufacturing",
      category: "Industrial Division",
      icon: <Factory className="w-8 h-8" />,
      accent: "text-white border-white/20 group-hover:border-white/80",
      glowColor: "rgba(255, 255, 255, 0.4)",
      desc: "Placing production technicians, CNC operators, plant managers, and warehouse supervisors.",
    },
    {
      name: "Engineering",
      category: "Core Technical",
      icon: <Wrench className="w-8 h-8" />,
      accent: "text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/80",
      glowColor: "rgba(16, 185, 129, 0.4)",
      desc: "Sourcing mechanical engineers, electrical systems designers, civil draftsmen, and technical site engineers.",
    },
    {
      name: "Automobile",
      category: "Automotive Division",
      icon: <Car className="w-8 h-8" />,
      accent: "text-neon-purple border-neon-purple/20 group-hover:border-neon-purple/80",
      glowColor: "rgba(139, 92, 246, 0.4)",
      desc: "Recruiting assembly supervisors, design engineers, automotive parts specialists, and operations checkers.",
    },
    {
      name: "Retail",
      category: "Commercial Sales",
      icon: <Store className="w-8 h-8" />,
      accent: "text-neon-blue border-neon-blue/20 group-hover:border-neon-blue/80",
      glowColor: "rgba(59, 130, 246, 0.4)",
      desc: "Placing store managers, sales associates, POS cashiers, retail customer service leads, and supervisors.",
    },
    {
      name: "Healthcare",
      category: "Medical Services",
      icon: <HeartPulse className="w-8 h-8" />,
      accent: "text-neon-cyan border-neon-cyan/20 group-hover:border-neon-cyan/80",
      glowColor: "rgba(6, 182, 212, 0.4)",
      desc: "Sourcing hospital administrators, clinical directors, medical equipment specialists, and operations leads.",
    },
  ];

  // Adjust translateZ based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setTranslateZ(180);
      } else if (window.innerWidth < 768) {
        setTranslateZ(220);
      } else {
        setTranslateZ(280);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatic rotation loop
  useEffect(() => {
    if (isDragging || activeTech !== null) return;
    const interval = setInterval(() => {
      if (autoRotateRef.current) {
        setRotationY((prev) => prev - 0.25);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isDragging, activeTech]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTech !== null) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotationY(rotationY);
    autoRotateRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotationY(startRotationY + deltaX * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-rotation after 3 seconds of inactivity
    setTimeout(() => {
      if (!isDragging) autoRotateRef.current = true;
    }, 3000);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeTech !== null) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartRotationY(rotationY);
    autoRotateRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotationY(startRotationY + deltaX * 0.4);
  };

  const handleCardClick = (index: number) => {
    if (isDragging) return;

    if (activeTech === index) {
      // If clicking already open card, close it
      setActiveTech(null);
      return;
    }

    // Bring selected card to the front (0deg relative facing camera)
    const targetAngle = -index * 60;
    
    // Find closest angle relative to current rotationY to prevent rapid spins
    const currentRotations = Math.round(rotationY / 360);
    const alignedTarget = targetAngle + currentRotations * 360;
    let diff = alignedTarget - rotationY;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setRotationY((prev) => prev + diff);
    setActiveTech(index);
    autoRotateRef.current = false;
  };

  const resetCarousel = () => {
    setActiveTech(null);
    setRotationY(0);
    autoRotateRef.current = true;
  };

  return (
    <section id="technologies" className="relative py-24 bg-transparent overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-blue mb-3">
            Hiring Spheres
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Talent Domains We Source
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl font-light leading-relaxed">
            We recruit across core industrial and tech sectors. Drag to spin the 3D hologram cylinder and click any card to reveal details.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full mt-6" />
        </div>

        {/* 3D Holographic Cylinder Carousel container */}
        <div className="relative h-[480px] w-full flex flex-col items-center justify-center select-none">
          
          {/* Instruction Overlay */}
          <div className="absolute top-0 flex items-center gap-3 text-[10px] font-mono tracking-wider text-gray-500 uppercase z-20">
            <span>Drag horizontally to rotate</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-ping" />
            <span>Click to flip card</span>
          </div>

          {/* Perspective viewport */}
          <div 
            className="relative w-full h-[400px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
            style={{ perspective: "1000px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Hologram Stage Light base */}
            <div className="absolute bottom-0 w-48 h-4 bg-gradient-to-r from-neon-blue/20 via-neon-cyan/30 to-neon-purple/20 rounded-full blur-md transform -rotateX(80deg) translateZ(-50px) pointer-events-none" />

            {/* Rotatable Cylinder */}
            <div
              className="relative w-[240px] md:w-[280px] h-[320px] transition-transform duration-500 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotationY}deg) rotateX(-5deg)`,
              }}
            >
              {techStack.map((tech, index) => {
                const angle = index * 60;
                const isCardActive = activeTech === index;

                return (
                  <div
                    key={tech.name}
                    onClick={() => handleCardClick(index)}
                    className="absolute inset-0 transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Card Inner with flip capacity */}
                    <div
                      className="relative w-full h-full rounded-2xl transition-transform duration-700 ease-out"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isCardActive ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* FRONT FACE */}
                      <div
                        className={`absolute inset-0 glass-panel rounded-2xl p-6 border bg-gradient-to-b from-white/3 to-transparent flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-white/20 ${tech.accent}`}
                        style={{
                          backfaceVisibility: "hidden",
                          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05)`,
                        }}
                      >
                        {/* Stage projector beam line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />

                        {/* Icon container */}
                        <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                          {tech.icon}
                        </div>

                        {/* Name */}
                        <span className="text-base font-bold text-white mb-1">
                          {tech.name}
                        </span>
                        
                        {/* Category */}
                        <span className="text-[10px] tracking-widest font-semibold uppercase text-gray-500 mt-1">
                          {tech.category}
                        </span>

                        <span className="mt-6 text-[9px] font-mono text-neon-cyan uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                          View details
                        </span>
                      </div>

                      {/* BACK FACE (Details) */}
                      <div
                        className="absolute inset-0 glass-panel rounded-2xl p-6 border border-white/10 bg-[#070b20]/95 flex flex-col items-center justify-center text-center"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          boxShadow: `0 0 35px ${tech.glowColor}`,
                        }}
                      >
                        {/* Stage projector beam line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-60" />

                        {/* Domain name */}
                        <span className="text-xs uppercase tracking-widest text-neon-cyan font-bold mb-3">
                          {tech.name}
                        </span>

                        {/* Description */}
                        <p className="text-[11px] md:text-xs text-gray-400 font-light leading-relaxed mb-6">
                          {tech.desc}
                        </p>

                        {/* Close button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTech(null);
                          }}
                          className="text-[10px] uppercase tracking-wider text-neon-purple font-semibold hover:text-white transition-colors cursor-pointer"
                        >
                          Close Details
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Carousel Button */}
          {activeTech !== null && (
            <button
              onClick={resetCarousel}
              className="absolute bottom-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all z-20 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reset view
            </button>
          )}

        </div>
      </div>
    </section>
  );
}
