"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "Quantum Labs",
      review: "A&A consultancy redesigned our cloud cluster and migrated our legacy APIs. The resulting architecture handles three times the throughput with half the latency. Absolutely recommend their elite engineering division.",
      rating: 5,
      initials: "MV",
      avatarColor: "from-blue-600 to-neon-blue",
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "VP of Product",
      company: "Aether Systems",
      review: "We engaged A&A to build our neural analytics dashboard. Not only was the frontend visually stunning and extremely fast, but the underlying integrations with our LLM instances were robust and perfectly documented.",
      rating: 5,
      initials: "ER",
      avatarColor: "from-purple-600 to-neon-purple",
    },
    {
      id: 3,
      name: "James Chen",
      role: "Founder & CEO",
      company: "Vertex Academy",
      review: "The design aesthetics and engineering prowess displayed by the A&A team are unmatched. Our students love the interactive immersive modules. It has directly driven client engagement up by 150%.",
      rating: 5,
      initials: "JC",
      avatarColor: "from-cyan-500 to-neon-cyan",
    },
    {
      id: 4,
      name: "Sophia Martinez",
      role: "Head of Infrastructure",
      company: "Quantum Ledger",
      review: "A phenomenal group of engineers. They executed our ledger tracking terminal with extreme care for server security and database structural integrity. Delivery was fast and seamless.",
      rating: 5,
      initials: "SM",
      avatarColor: "from-emerald-500 to-emerald-400",
    },
  ];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // 6 seconds

    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-purple mb-3">
            Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Client Success Stories
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[380px]">
          {/* Main testimonial card */}
          <div className="w-full relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5 bg-gradient-to-br from-white/3 to-transparent relative shadow-2xl shadow-black/30 flex flex-col md:flex-row gap-8 items-start"
              >
                {/* Large Quote graphic mark */}
                <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 stroke-[1.5]" />

                {/* Left side: client Avatar info */}
                <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left">
                  <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].avatarColor} p-[2px] shadow-lg shadow-neon-blue/10 mb-4`}>
                    <div className="h-full w-full rounded-[22px] bg-bg-dark flex items-center justify-center">
                      <span className="text-2xl font-black text-white tracking-wider">
                        {testimonials[activeIndex].initials}
                      </span>
                    </div>
                  </div>
                  <span className="block text-lg font-bold text-white leading-tight">
                    {testimonials[activeIndex].name}
                  </span>
                  <span className="block text-xs text-neon-cyan font-semibold mt-1">
                    {testimonials[activeIndex].role}
                  </span>
                  <span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
                    {testimonials[activeIndex].company}
                  </span>
                </div>

                {/* Right side: Review text & rating */}
                <div className="flex-1 flex flex-col justify-between h-full pt-2">
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-6 justify-center md:justify-start">
                      {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-neon-cyan text-neon-cyan" />
                      ))}
                    </div>
                    {/* Review text */}
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6">
                      &ldquo;{testimonials[activeIndex].review}&rdquo;
                    </p>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex gap-2 justify-center md:justify-start mt-4">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === idx ? "w-6 bg-neon-cyan" : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow button */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-[-70px] z-20 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow button */}
          <button
            onClick={handleNext}
            className="absolute right-[-20px] md:right-[-70px] z-20 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
