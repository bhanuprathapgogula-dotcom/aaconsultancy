"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Users } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0 });

  // Simple count-up animation on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      setCounters({
        projects: Math.min(Math.floor((5000 / steps) * step), 5000),
        clients: Math.min(Math.floor((150 / steps) * step), 150),
        years: Math.min(Math.floor((5 / steps) * step), 5),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const tabContents = {
    mission: {
      title: "Architecting Teams for Scale",
      text: "Our mission is to empower ambitious corporations by sourcing and structuring elite talent pipelines. We combine extensive technical screening with premium HR craftsmanship to place progressive leaders and engineers.",
      bullets: [
        "Deliver vetted, top-tier professional profiles.",
        "Align talent skillsets with company cultural requirements.",
        "Commit to high retention rates and structural scaling.",
      ],
    },
    vision: {
      title: "Bridging the Global Talent Gap",
      text: "We envision a world where corporations scale seamlessly by acquiring the best domestic and global minds. A&A consultancy aims to set world-class hiring benchmarks across industrial sectors.",
      bullets: [
        "Speeding up talent acquisition turnaround times.",
        "Providing rigorous technical screening frameworks.",
        "Fostering long-term strategic placement partnerships.",
      ],
    },
    trust: {
      title: "Our Competitive Advantage",
      text: "We don't just pass resumes; we partner in growth. Our vetting protocol involves technical evaluation and cultural compatibility checks, ensuring elite retention rates.",
      bullets: [
        "100% placement fulfillment across IT & Non-IT sectors.",
        "Expert hiring managers specialized in niche industrial sectors.",
        "End-to-end recruitment process outsourcing support.",
      ],
    },
  };

  const statItems = [
    { value: `${counters.projects}+`, label: "Elite Placements", desc: "IT & Non-IT Talents", icon: <Zap className="w-5 h-5 text-neon-blue" /> },
    { value: `${counters.clients}+`, label: "Corporate Clients", desc: "Startups & Fortune 500", icon: <Users className="w-5 h-5 text-neon-purple" /> },
    { value: `${counters.years}+`, label: "Years Experience", desc: "Hiring Excellence", icon: <ShieldCheck className="w-5 h-5 text-neon-cyan" /> },
    { value: "24/7", label: "Hiring Support", desc: "Continuous Consultation", icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <section id="about" className="relative py-24 bg-transparent overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-purple mb-3">
            About Our Company
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Elite Sourcing. Strategic Leadership.
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
        </div>

        {/* Top Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Text tab panel */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Tab buttons */}
            <div className="flex gap-2 p-1.5 rounded-full bg-glass-bg border border-glass-border mb-8 self-start backdrop-blur-sm">
              {Object.keys(tabContents).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-md shadow-neon-blue/20"
                      : "text-muted hover:text-foreground hover:bg-glass-bg"
                  }`}
                >
                  {tab === "trust" ? "Why Trust Us" : tab}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="glass-panel rounded-2xl p-8 md:p-10 border border-glass-border relative min-h-[340px] flex flex-col justify-between shadow-xl shadow-black/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {tabContents[activeTab as keyof typeof tabContents].title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {tabContents[activeTab as keyof typeof tabContents].text}
                  </p>
                  
                  {/* Bullets */}
                  <ul className="space-y-3.5 mt-auto">
                    {tabContents[activeTab as keyof typeof tabContents].bullets.map((bullet, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0" />
                        <span className="text-xs md:text-sm text-muted font-light">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right side graphics/mission info card */}
          <div className="lg:col-span-6 relative flex flex-col h-full justify-center">
            <div className="relative glass-panel rounded-2xl p-8 border border-glass-border flex flex-col justify-center overflow-hidden bg-gradient-to-br from-glass-bg to-white/0 shadow-xl shadow-black/25">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-2xl pointer-events-none" />

              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-neon-cyan mb-4">
                Our Core Philosophy
              </h4>
              <blockquote className="text-base md:text-lg text-muted italic font-light leading-relaxed mb-6">
                &ldquo;Talent is the modern concrete, and sourcing is the engineering. A corporation is only as strong as its structural leadership. We deliver the leaders who build the future.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-xs font-bold text-foreground">
                    AA
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground leading-none">Engineering Directorate</span>
                  <span className="text-[10px] text-neon-purple uppercase tracking-wider font-semibold mt-1 block">A&A consultancy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-glass-border flex flex-col items-start shadow-lg shadow-black/15 group relative"
            >
              {/* Top Row: Icon */}
              <div className="mb-4 p-2.5 rounded-xl bg-glass-bg border border-glass-border group-hover:bg-glass-hover transition-colors">
                {stat.icon}
              </div>

              {/* Stat Value */}
              <span className="text-3xl font-extrabold tracking-tight text-foreground mb-1 bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent group-hover:from-neon-blue group-hover:to-neon-cyan group-hover:text-glow-blue transition-all duration-500 font-mono">
                {stat.value}
              </span>

              {/* Label */}
              <span className="text-xs font-bold text-foreground uppercase tracking-wider mb-0.5">
                {stat.label}
              </span>

              {/* Description */}
              <span className="text-[11px] text-gray-500 font-medium">
                {stat.desc}
              </span>

              {/* Glow border hover effect */}
              <div className="absolute inset-0 rounded-2xl border border-neon-blue/0 group-hover:border-neon-blue/30 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
