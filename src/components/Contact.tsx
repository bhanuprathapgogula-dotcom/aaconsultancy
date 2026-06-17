"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import ResumeModal from "./ResumeModal";

export default function Contact() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-neon-blue" />,
      title: "Call Us",
      value: "+91 94946 38975",
      desc: "Mon-Sat: 9:30 AM to 6:30 PM",
      href: "tel:+919494638975",
    },
    {
      icon: <Mail className="w-5 h-5 text-neon-purple" />,
      title: "Email Us",
      value: "a&aconsultancy@gmail.com",
      desc: "Our recruiters reply in 24 hours.",
      href: "mailto:a&aconsultancy@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-neon-cyan" />,
      title: "Office Location",
      value: "Building No: 49-4-32B/3, Revenue Ward 1, Apace Hill View, Villa No. 06, Gunadala, Vijayawada, NTR District, Andhra Pradesh - 520004",
      desc: "Schedule a virtual or physical visit.",
      href: "https://maps.google.com/?q=Building+No:49-4-32B/3,+Revenue+Ward+1,+Apace+Hill+View,+Villa+No.+06,+Gunadala,+Vijayawada,+NTR+District,+Andhra+Pradesh+-+520004",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: "https://facebook.com",
      label: "Facebook",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-transparent overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-cyan mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full" />
        </div>

        {/* Split layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Cards column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  target={info.title === "Office Location" ? "_blank" : undefined}
                  rel={info.title === "Office Location" ? "noopener noreferrer" : undefined}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 border border-glass-border bg-gradient-to-tr from-glass-bg to-transparent flex gap-5 items-start block"
                >
                  <div className="p-3.5 rounded-xl bg-glass-bg border border-glass-border shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">
                      {info.title}
                    </h3>
                    <span className="block text-base font-semibold text-muted group-hover:text-foreground transition-colors">
                      {info.value}
                    </span>
                    <span className="block text-[11px] text-gray-500 font-medium mt-0.5">
                      {info.desc}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social profiles card */}
            <div className="glass-panel rounded-2xl p-6 border border-glass-border flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-widest">
                Follow System
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-glass-bg border border-glass-border text-muted hover:text-foreground hover:border-glass-border transition-all hover:scale-105"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Recruitment Solutions column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Section Header */}
            <div className="glass-panel rounded-2xl p-6 border border-glass-border bg-gradient-to-tr from-glass-bg to-transparent">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                Recruitment Solutions
              </h3>
              <p className="text-xs text-muted font-light leading-relaxed">
                Connect with our expert team for customized corporate hiring support or career placement services.
              </p>
            </div>

            {/* Employer Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-8 border border-glass-border bg-gradient-to-tr from-glass-bg to-transparent flex flex-col md:flex-row items-start md:items-center gap-6 justify-between group">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neon-blue">
                  For Organizations
                </span>
                <h4 className="text-lg font-extrabold text-foreground">
                  Looking to Hire Employees?
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed max-w-md">
                  Get recruitment and staffing support for your company hiring needs. We deliver pre-vetted candidate matches across technical and non-technical domains.
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfj5UQZ55I4WlmyN-8l7aFK5YAhlFwt0GVj3yyeTmdxBaq2Ww/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn-blue relative shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
              >
                Request Hiring Support
              </a>
            </div>

            {/* Candidate Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-8 border border-glass-border bg-gradient-to-tr from-glass-bg to-transparent flex flex-col md:flex-row items-start md:items-center gap-6 justify-between group">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neon-purple">
                  For Job Seekers
                </span>
                <h4 className="text-lg font-extrabold text-foreground">
                  Looking for a Job Opportunity?
                </h4>
                <p className="text-xs text-muted font-light leading-relaxed max-w-md">
                  Submit your resume and connect with our talent acquisition team for active openings matching your skill set.
                </p>
              </div>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="glow-btn-blue relative shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider cursor-pointer"
              >
                Submit Resume
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
}
