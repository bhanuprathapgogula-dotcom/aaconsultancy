"use client";

import React, { useState } from "react";
import { Send, PhoneCall, Calendar, CheckCircle2, FileText } from "lucide-react";

// CUSTOMIZABLE GOOGLE FORM URL
// Replace with your actual Google Form embed link (must end with /viewform?embedded=true or viewform)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd97h6Z5TeejUuV0D_W7w8lD1C3NenwzZ3r7o0048X0eX1s_A/viewform?embedded=true";

export default function LeadGen() {
  const [activeTab, setActiveTab] = useState<"quick" | "google">("quick");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.details.trim()) newErrors.details = "Hiring details are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", details: "" });
    }, 1500);
  };

  return (
    <section id="lead-generation" className="relative py-24 bg-transparent overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-neon-blue/10 to-neon-purple/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/5 bg-gradient-to-br from-white/3 via-transparent to-transparent shadow-2xl shadow-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text instructions column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-cyan mb-4">
                Partner With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Scale Your Teams With Elite Talent
              </h2>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                Partner with us to source your next strategic hires. Our recruitment specialists will audit your job specs and deliver custom pre-vetted profiles.
              </p>

              {/* Extra communication CTAs */}
              <div className="flex flex-col gap-3.5 w-full">
                <a
                  href="https://wa.me/919494638975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3.5 w-full py-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  WhatsApp Us Direct
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to contact (which can have maps/calendars)
                    const target = document.querySelector("#contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-3.5 w-full py-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Calendar className="w-4 h-4 text-neon-purple" />
                  Schedule Live Meeting
                </a>
              </div>
            </div>

            {/* Right form submission column */}
            <div className="lg:col-span-7 relative">
              {/* Tab Selector */}
              <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("quick")}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === "quick"
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-md shadow-neon-blue/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  
                  <Send className="w-3.5 h-3.5" />
                  Quick Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("google");
                    setIsIframeLoading(true);
                  }}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === "google"
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-md shadow-neon-blue/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Detailed Form
                </button>
              </div>

              {activeTab === "quick" ? (
                isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
                    <div className="h-16 w-16 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center text-neon-cyan mb-6 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Inquiry Received</h3>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                      Thank you. Your hiring specs have been successfully logged in our recruiter pipeline. An account director will reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-xs uppercase tracking-widest text-neon-purple font-bold hover:text-white transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white glow-input"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-rose-500 font-semibold mt-1 block pl-2 uppercase tracking-wide">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white glow-input"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-rose-500 font-semibold mt-1 block pl-2 uppercase tracking-wide">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white glow-input"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-rose-500 font-semibold mt-1 block pl-2 uppercase tracking-wide">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Details Input */}
                    <div>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Tell us about your hiring requirements, positions, and skillsets..."
                        rows={4}
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white glow-input resize-none"
                      />
                      {errors.details && (
                        <span className="text-[10px] text-rose-500 font-semibold mt-1 block pl-2 uppercase tracking-wide">
                          {errors.details}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full glow-btn-blue py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Inquiry
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )
              ) : (
                <div className="relative min-h-[450px] w-full flex flex-col">
                  {isIframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050816]/95 rounded-2xl border border-white/5 z-20">
                      <div className="relative w-10 h-10 mb-3">
                        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                        <div className="absolute inset-0 rounded-full border-2 border-t-neon-blue border-r-neon-purple animate-spin" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        Initializing Form System...
                      </span>
                    </div>
                  )}
                  
                  <iframe
                    src={GOOGLE_FORM_URL}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    onLoad={() => setIsIframeLoading(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 shadow-inner z-10"
                    title="Google Form Detailed System"
                  >
                    Loading…
                  </iframe>
                  
                  <div className="mt-3 flex justify-between items-center px-1">
                    <span className="text-[9px] font-mono text-gray-500 uppercase">
                      SECURED RESPONSES DIRECT TO SHEETS
                    </span>
                    <a
                      href={GOOGLE_FORM_URL.replace("?embedded=true", "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold text-neon-cyan hover:underline flex items-center gap-1 uppercase tracking-wider"
                    >
                      Open full page <Send className="w-2 h-2" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
