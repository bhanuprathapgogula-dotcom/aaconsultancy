"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareCode, ClipboardList, Laptop, Rocket } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  shadow: string;
}

export default function Process() {
  const steps: StepItem[] = [
    {
      number: "01",
      title: "Consultation",
      desc: "We align on your exact hiring requirements, budget parameters, and corporate culture constraints to map key roles.",
      icon: <MessageSquareCode className="w-5 h-5" />,
      color: "from-neon-blue to-blue-500",
      shadow: "shadow-neon-blue/20",
    },
    {
      number: "02",
      title: "Sourcing & Screening",
      desc: "Our recruitment experts scour digital portfolios, ATS registers, and stack forums to source pre-vetted matching prospects.",
      icon: <ClipboardList className="w-5 h-5" />,
      color: "from-neon-purple to-purple-500",
      shadow: "shadow-neon-purple/20",
    },
    {
      number: "03",
      title: "Technical Vetting",
      desc: "We conduct extensive technical screenings, verify background credentials, and run custom programming assessments.",
      icon: <Laptop className="w-5 h-5" />,
      color: "from-neon-cyan to-cyan-500",
      shadow: "shadow-neon-cyan/20",
    },
    {
      number: "04",
      title: "Final Placement",
      desc: "We coordinate interviews, align compensation benchmarks, structure offers, and onboard your new elite talent.",
      icon: <Rocket className="w-5 h-5" />,
      color: "from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-500/20",
    },
  ];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Background neon blur orbs */}
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 h-[400px] w-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-cyan mb-3">
            Workflow Process
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Our Recruitment Pipeline
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full" />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Timeline Line */}
          <div className="absolute left-[29px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan -translate-x-1/2 opacity-30" />

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col md:flex-row items-start relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* central point marker */}
                  <div className="absolute left-[29px] md:left-1/2 top-2 h-14 w-14 rounded-full bg-[#050816] border-2 border-white/10 flex items-center justify-center -translate-x-1/2 z-20 shadow-lg shadow-black group">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Empty Spacer panel for desktop layout matching grid */}
                  <div className="hidden md:block w-1/2 px-12" />

                  {/* Timeline Text Card Container */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 border border-white/5 bg-gradient-to-br from-white/3 to-transparent hover:shadow-2xl flex flex-col items-start relative group"
                    >
                      {/* Step Number label */}
                      <span className={`text-4xl md:text-5xl font-black font-mono bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20 absolute top-4 right-6 group-hover:opacity-40 transition-opacity`}>
                        {step.number}
                      </span>

                      {/* Header */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Interactive edge indicator */}
                      <div className={`absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b ${step.color} rounded-l-2xl`} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
