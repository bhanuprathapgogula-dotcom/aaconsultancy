"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Cpu,
  BrainCircuit,
  Cloud,
  Palette,
  TrendingUp,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

export default function Services() {
  // Store mouse coordinates for each card separately (index-based) to apply 3D tilt
  const [tiltStyles, setTiltStyles] = useState<{ [key: number]: string }>({});

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "IT Recruitment Agency",
      desc: "Sourcing skilled IT professionals including software developers, web developers, cloud engineers, testers, DevOps engineers, and data analysts.",
      icon: <Code2 className="w-6 h-6 text-neon-blue" />,
      gradient: "from-neon-blue/20 via-blue-600/5 to-transparent",
      borderColor: "group-hover:border-neon-blue/40",
    },
    {
      id: 2,
      title: "Non-IT Recruitment Agency",
      desc: "Specialized placements across manufacturing, pharmaceutical, FMCG, engineering, retail, sales, and back-office operations.",
      icon: <Smartphone className="w-6 h-6 text-neon-purple" />,
      gradient: "from-neon-purple/20 via-purple-600/5 to-transparent",
      borderColor: "group-hover:border-neon-purple/40",
    },
    {
      id: 3,
      title: "Staffing Solutions",
      desc: "Flexible temporary staffing, contract-to-hire options, and scalable outsourcing models tailored to corporate workload spikes.",
      icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
      gradient: "from-neon-cyan/20 via-cyan-600/5 to-transparent",
      borderColor: "group-hover:border-neon-cyan/40",
    },
    {
      id: 4,
      title: "Manpower Consultancy",
      desc: "Comprehensive manpower sourcing and talent database allocations, matching elite domestic and PAN India resource capabilities.",
      icon: <BrainCircuit className="w-6 h-6 text-emerald-400" />,
      gradient: "from-emerald-500/20 via-emerald-600/5 to-transparent",
      borderColor: "group-hover:border-emerald-500/40",
    },
    {
      id: 5,
      title: "HR Consultancy Services",
      desc: "Designing corporate compensation structures, salary benchmarking, labor law compliance audits, and employee onboarding manuals.",
      icon: <Cloud className="w-6 h-6 text-neon-blue" />,
      gradient: "from-neon-blue/20 via-indigo-600/5 to-transparent",
      borderColor: "group-hover:border-neon-blue/40",
    },
    {
      id: 6,
      title: "Placement Consultancy",
      desc: "Matching candidate career aspirations with elite enterprise networks to place top talent in roles that unlock fast growth.",
      icon: <Palette className="w-6 h-6 text-neon-purple" />,
      gradient: "from-neon-purple/20 via-pink-600/5 to-transparent",
      borderColor: "group-hover:border-neon-purple/40",
    },
    {
      id: 7,
      title: "Recruitment Agency",
      desc: "Simplified end-to-end talent search, strategic candidate vetting, interview coordination, and placement onboarding support.",
      icon: <TrendingUp className="w-6 h-6 text-neon-cyan" />,
      gradient: "from-neon-cyan/20 via-teal-600/5 to-transparent",
      borderColor: "group-hover:border-neon-cyan/40",
    },
    {
      id: 8,
      title: "Bulk Hiring Support",
      desc: "Organizing accelerated recruitment drives for rapid corporate expansion, facility launches, and large-scale graduate hiring.",
      icon: <HelpCircle className="w-6 h-6 text-emerald-400" />,
      gradient: "from-emerald-500/20 via-emerald-600/5 to-transparent",
      borderColor: "group-hover:border-emerald-500/40",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Mouse coordinates relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage coordinates from card center (-0.5 to 0.5)
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    // Calculate rotation angles (max 12deg tilt)
    const rotateY = px * 12;
    const rotateX = -py * 12;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    }));
  };

  const handleMouseLeave = (id: number) => {
    setTiltStyles((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    }));
  };

  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-24 bg-transparent overflow-hidden">
      {/* Background glowing overlays */}
      <div className="absolute top-1/3 left-0 h-[500px] w-[500px] rounded-full bg-neon-blue/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-cyan mb-3">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Elite Recruitment & Staffing
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl font-light leading-relaxed">
            We source high-caliber professionals across technical and business divisions. Explore our bespoke staffing models built for rapid, reliable growth.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full mt-6" />
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (service.id % 4) * 0.08 }}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              onMouseLeave={() => handleMouseLeave(service.id)}
              style={{
                transform: tiltStyles[service.id] || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              className="group glass-panel rounded-2xl p-6 md:p-8 border border-white/5 bg-gradient-to-b from-white/3 to-transparent hover:shadow-2xl hover:shadow-neon-blue/10 relative overflow-hidden flex flex-col justify-between min-h-[320px] cursor-pointer"
            >
              {/* Subtle background glow active on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Top bar: Icon and link arrow */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    {service.icon}
                  </div>
                  <button
                    onClick={() => handleScroll("#contact")}
                    className="p-1 rounded-full bg-transparent text-gray-500 group-hover:text-white group-hover:bg-white/10 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Details */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors relative z-10">
                  {service.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                  {service.desc}
                </p>
              </div>

              {/* Gradient border bottom visual cue */}
              <div className="mt-8 relative z-10 flex items-center gap-1.5 text-xs text-neon-blue font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Inquire System</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>

              {/* Glass glowing border highlight */}
              <div className={`absolute inset-0 rounded-2xl border border-transparent ${service.borderColor} transition-colors duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
