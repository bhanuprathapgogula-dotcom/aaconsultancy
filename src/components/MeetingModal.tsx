"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, Calendar, Clock, CheckCircle2 } from "lucide-react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MeetingModal({ isOpen, onClose }: MeetingModalProps) {
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
    date: "",
    time: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send meeting request");
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
          date: "",
          time: "",
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  // Get today's date formatted for min attribute
  const today = new Date().toISOString().split("T")[0];

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
            className="bg-background border border-glass-border relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl z-10"
          >
            {/* Header */}
            <div className="relative border-b border-glass-border px-8 py-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-blue" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1 text-glow-purple">
                    Schedule Live Meeting
                  </h2>
                  <p className="text-sm text-muted">
                    Pick a time that works best for you.
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
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Request Sent!</h3>
                  <p className="text-muted max-w-md mx-auto">
                    A calendar invitation has been generated. We will confirm the meeting shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neon-purple" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-purple/50"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neon-cyan" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-cyan/50"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neon-blue" />
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-blue/50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neon-purple" />
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-neon-purple/50 [color-scheme:dark]"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neon-cyan" />
                        Time *
                      </label>
                      <input
                        type="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-neon-cyan/50 [color-scheme:dark]"
                      />
                    </div>
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
                      className="glow-btn-purple relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan px-8 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Schedule
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
