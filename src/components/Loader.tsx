"use client";

import React, { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Accelerate loading as it goes, simulating realistic startup checks
      const increment = Math.floor(Math.random() * 8) + 2;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 800); // match transition duration
        }, 500); // pause at 100% briefly
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] transition-all duration-800 cubic-bezier(0.77, 0, 0.175, 1) ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-neon-blue/10 blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-neon-purple/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Futuristic Agency Logo / Icon */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple p-[2px] shadow-lg shadow-neon-blue/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050816]">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-extrabold text-transparent tracking-widest">
                A
              </span>
            </div>
            {/* Spinning orbit ring */}
            <div className="absolute inset-0 rounded-xl border border-dashed border-neon-cyan animate-[spin_8s_linear_infinite]" />
          </div>
        </div>

        {/* Agency Name */}
        <h1 className="mb-2 text-2xl font-bold tracking-[0.2em] text-white text-center">
          A&A
        </h1>
        <p className="mb-12 text-xs tracking-[0.4em] text-gray-500 uppercase text-center">
          consultancy
        </p>

        {/* Progress Bar Container */}
        <div className="w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] tracking-[0.2em] text-neon-blue uppercase">
              Initializing Core
            </span>
            <span className="text-xl font-bold font-mono text-neon-cyan">
              {progress}%
            </span>
          </div>

          {/* Actual progress track */}
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Messages */}
        <div className="mt-4 h-6 text-center">
          {progress < 25 && (
            <span className="text-[10px] tracking-wider text-gray-500 animate-pulse">
              Establishing secure handshake...
            </span>
          )}
          {progress >= 25 && progress < 60 && (
            <span className="text-[10px] tracking-wider text-gray-400 animate-pulse">
              Loading 3D graphics pipeline...
            </span>
          )}
          {progress >= 60 && progress < 90 && (
            <span className="text-[10px] tracking-wider text-gray-300 animate-pulse">
              Structuring neon glass UI system...
            </span>
          )}
          {progress >= 90 && (
            <span className="text-[10px] tracking-wider text-neon-cyan animate-pulse">
              Deployment ready. Welcome.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
