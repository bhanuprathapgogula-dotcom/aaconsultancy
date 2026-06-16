"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, Building, Briefcase, MessageSquare } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close after success and reset
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="bg-background border border-glass-border relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl z-10"
          >
            {/* Header */}
            <div className="relative border-b border-glass-border px-8 py-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1 text-glow-blue">
                    Book a Consultation
                  </h2>
                  <p className="text-sm text-muted">
                    Take the first step towards transforming your business.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-muted hover:bg-glass-hover hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Request Sent Successfully!</h3>
                  <p className="text-muted max-w-md mx-auto">
                    Thank you for reaching out. One of our experts will contact you within 24 hours to schedule your consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-neon-blue" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-blue/50"
                        placeholder="John Doe"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neon-blue" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-blue/50"
                        placeholder="john@company.com"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neon-purple" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-purple/50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    </div>

                  {/* Service Interest */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-neon-cyan" />
                      Service of Interest *
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="glow-input w-full appearance-none rounded-lg px-4 py-3 text-sm text-foreground bg-background/50 focus:ring-2 focus:ring-neon-cyan/50"
                      >
                        <option value="" disabled className="text-gray-500 bg-background">Select a service...</option>
                        <option value="IT Consulting" className="bg-background">IT Consulting</option>
                        <option value="Cloud Migration" className="bg-background">Cloud Solutions & Migration</option>
                        <option value="Cybersecurity" className="bg-background">Cybersecurity Services</option>
                        <option value="Custom Software" className="bg-background">Custom Software Development</option>
                        <option value="Data Analytics" className="bg-background">Data Analytics & AI</option>
                        <option value="Other" className="bg-background">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-neon-cyan" />
                      Description *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-cyan/50 resize-none"
                      placeholder="Tell us about your project or challenges..."
                    />
                  </div>

                  {/* Submit Footer */}
                  <div className="pt-4 border-t border-glass-border flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-glass-hover transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="glow-btn-blue relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
