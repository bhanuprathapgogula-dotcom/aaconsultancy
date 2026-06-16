"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Phone, Upload, FileText, CheckCircle2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setErrorMessage("File exceeds the 5MB limit. Please upload a smaller file.");
      return;
    }

    // Validate type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Invalid file type. Only PDF and Word documents are allowed.");
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select a resume file to upload.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("file", file);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: data,
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
        });
        setFile(null);
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
            className="bg-background border border-glass-border relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl z-10"
          >
            {/* Header */}
            <div className="relative border-b border-glass-border px-8 py-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1 text-glow-blue">
                    Submit Your Resume
                  </h2>
                  <p className="text-sm text-muted">
                    Join our network of elite professionals.
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
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-glow-cyan">Resume Submitted!</h3>
                  <p className="text-muted max-w-md mx-auto">
                    Thank you for submitting your profile. Our team will review your details and reach out soon.
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
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="glow-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted focus:ring-2 focus:ring-neon-purple/50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-neon-cyan" />
                      Upload Resume *
                    </label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        file ? 'border-neon-cyan bg-neon-cyan/5' : 'border-glass-border hover:border-neon-blue bg-glass-bg'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                      />
                      {file ? (
                        <>
                          <FileText className="w-8 h-8 text-neon-cyan mb-2" />
                          <p className="text-sm font-medium text-foreground text-center truncate w-full max-w-[250px]">{file.name}</p>
                          <p className="text-xs text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted mb-2" />
                          <p className="text-sm font-medium text-foreground">Click to browse</p>
                          <p className="text-xs text-muted mt-1">PDF or Word (Max. 5MB)</p>
                        </>
                      )}
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
                      className="glow-btn-blue relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Upload
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
