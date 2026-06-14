"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users2,
  Coins,
  Cpu,
  Headphones,
} from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accentClass: string;
  glowClass: string;
}

export default function WhyChooseUs() {
  const features: FeatureItem[] = [
    {
      id: 1,
      title: "Expert Recruiter Team",
      desc: "Our recruiters and HR consultants are seasoned veterans. We boast master-level vetting skills across IT, manufacturing, engineering, and operations.",
      icon: <Users2 className="w-5 h-5 text-neon-blue" />,
      accentClass: "border-neon-blue/30 group-hover:border-neon-blue",
      glowClass: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    },
    {
      id: 2,
      title: "Fast Turnaround Time",
      desc: "Accelerated profile sourcing powered by database indexes. We deliver high-caliber pre-vetted candidate options within 48 to 72 hours.",
      icon: <Zap className="w-5 h-5 text-neon-purple" />,
      accentClass: "border-neon-purple/30 group-hover:border-neon-purple",
      glowClass: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    },
    {
      id: 3,
      title: "Compliance & Vetting",
      desc: "Verification-first hiring. We implement rigorous background verification checks, credit history tracking, and strict credential audits.",
      icon: <ShieldCheck className="w-5 h-5 text-neon-cyan" />,
      accentClass: "border-neon-cyan/30 group-hover:border-neon-cyan",
      glowClass: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    },
    {
      id: 4,
      title: "Optimized Hiring Cost",
      desc: "Sourcing models designed to minimize cost-per-hire. Premium candidate mapping with success-based consultancy fees.",
      icon: <Coins className="w-5 h-5 text-emerald-400" />,
      accentClass: "border-emerald-500/30 group-hover:border-emerald-500",
      glowClass: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    },
    {
      id: 5,
      title: "Tech-Driven Sourcing",
      desc: "We stay on the bleeding edge. Utilizing advanced applicant tracking systems (ATS), AI-powered resume filters, and stack databases.",
      icon: <Cpu className="w-5 h-5 text-neon-blue" />,
      accentClass: "border-neon-blue/30 group-hover:border-neon-blue",
      glowClass: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    },
    {
      id: 6,
      title: "Dedicated HR Advisory",
      desc: "24/7 dedicated client coordinator support. We manage end-to-end schedules, salary benchmarking, offer structuring, and candidate onboarding.",
      icon: <Headphones className="w-5 h-5 text-neon-purple" />,
      accentClass: "border-neon-purple/30 group-hover:border-neon-purple",
      glowClass: "group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Glow ambient orbs */}
      <div className="absolute top-1/2 left-0 h-[350px] w-[350px] rounded-full bg-neon-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-neon-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-purple mb-3">
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Engineered for Excellence
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group glass-panel rounded-2xl p-6 md:p-8 border border-white/5 bg-gradient-to-tr from-white/2 to-transparent ${feature.glowClass} transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between`}
            >
              <div>
                {/* Feature Icon Header */}
                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Feature text */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </div>

              {/* Glowing decorative indicator */}
              <div className="mt-8 h-1 w-8 rounded-full bg-white/10 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-cyan transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
