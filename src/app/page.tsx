"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Background3D from "@/components/Background3D";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Technologies from "@/components/Technologies";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import LeadGen from "@/components/LeadGen";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen bg-bg-dark text-white selection:bg-neon-blue selection:text-white"
          >
            {/* Custom interactive cursor */}
            <CustomCursor />

            {/* Ambient parallax background */}
            <Background3D />

            {/* Scroll progress indicator */}
            <div
              className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple z-[70] origin-left"
              style={{
                transform: `scaleX(${scrollPercent / 100})`,
                transition: "transform 80ms linear",
              }}
            />

            {/* Page content */}
            <Navbar />
            <main>
              <Hero />
              <TrustedBy />
              <About />
              <Services />
              <WhyChooseUs />
              <Technologies />
              <Process />
              <Testimonials />
              <LeadGen />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
