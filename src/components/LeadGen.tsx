"use client";

import React, { useState } from "react";
import { Send, PhoneCall, Calendar, CheckCircle2, FileText } from "lucide-react";
import MeetingModal from "./MeetingModal";

export default function LeadGen() {
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: "Quick Hiring Inquiry",
          message: formData.details,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to send inquiry");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", details: "" });
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-generation" className="relative py-24 bg-transparent overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-neon-blue/10 to-neon-purple/10 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-glass-border bg-gradient-to-br from-glass-bg via-transparent to-transparent shadow-2xl shadow-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text instructions column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-cyan mb-4">
                Partner With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Scale Your Teams With Elite Talent
              </h2>
              <p className="text-sm text-muted font-light leading-relaxed mb-8">
                Partner with us to source your next strategic hires. Our recruitment specialists will audit your job specs and deliver custom pre-vetted profiles.
              </p>

              {/* Extra communication CTAs */}
              <div className="flex flex-col gap-3.5 w-full">
                <a
                  href="https://wa.me/919494638975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3.5 w-full py-3.5 rounded-full bg-glass-bg border border-glass-border text-xs font-bold uppercase tracking-wider text-foreground hover:bg-glass-hover hover:border-glass-border transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  WhatsApp Us Direct
                </a>
                <button
                  type="button"
                  onClick={() => setIsMeetingModalOpen(true)}
                  className="flex items-center justify-center gap-3.5 w-full py-3.5 rounded-full bg-glass-bg border border-glass-border text-xs font-bold uppercase tracking-wider text-foreground hover:bg-glass-hover hover:border-glass-border transition-all"
                >
                  <Calendar className="w-4 h-4 text-neon-purple" />
                  Schedule Live Meeting
                </button>
              </div>
            </div>

            {/* Right form submission column */}
            <div className="lg:col-span-7 relative">
              <div className="mb-6 flex items-center gap-2 border-b border-glass-border pb-4">
                <div className="p-2 bg-glass-bg rounded-lg border border-glass-border">
                  <Send className="w-4 h-4 text-neon-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Quick Inquiry</h3>
              </div>

              {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center p-8 min-h-[350px]">
                    <div className="h-16 w-16 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center text-neon-cyan mb-6 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Inquiry Received</h3>
                    <p className="text-xs text-muted max-w-sm leading-relaxed">
                      Thank you. Your hiring specs have been successfully logged in our recruiter pipeline. An account director will reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-xs uppercase tracking-widest text-neon-purple font-bold hover:text-foreground transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}
                    {/* Name Input */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-foreground glow-input"
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
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-foreground glow-input"
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
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-foreground glow-input"
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
                        className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-foreground glow-input resize-none"
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
              )}
            </div>
          </div>
        </div>
      </div>
      <MeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} />
    </section>
  );
}
