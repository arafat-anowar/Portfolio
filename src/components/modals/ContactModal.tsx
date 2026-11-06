"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b132b] border-2 border-emerald-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-[#0c291c] to-[#071328]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-sm text-emerald-300">
                  MAIN ENTRANCE
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  CAMPUS GATEWAY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Contact Inquiries, Social Networks & Connections
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Availability Status Badge */}
          <div className="bg-emerald-950/30 border border-emerald-900/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  AVAILABILITY STATUS
                </span>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  {portfolioData.contact.availability}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{portfolioData.contact.location}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Social Links & Direct Contacts */}
            <div className="space-y-4">
              <h3 className="font-pixel text-xs text-amber-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                CONNECT WITH ME
              </h3>

              {/* Email Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">EMAIL</div>
                    <div className="text-xs text-slate-200 font-mono font-medium">
                      {portfolioData.contact.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* GitHub Link */}
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">GITHUB</div>
                    <div className="text-xs text-slate-200 font-mono">
                      {portfolioData.contact.github.replace("https://", "")}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                  ↗
                </span>
              </a>

              {/* LinkedIn Link */}
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">LINKEDIN</div>
                    <div className="text-xs text-slate-200 font-mono">
                      Connect on LinkedIn
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                  ↗
                </span>
              </a>

              {/* Download CV Banner */}
              <a
                href="/resume.pdf"
                download="Arafat_Anowar_Resume.pdf"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold rounded-xl p-3.5 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD COMPLETE CURRICULUM VITAE</span>
              </a>
            </div>

            {/* Direct Message Form */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-pixel text-xs text-emerald-300 mb-3">
                  LEAVE A MESSAGE
                </h3>
                {formSent ? (
                  <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-6 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                      <Check className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-100">
                      Message Dispatched!
                    </h4>
                    <p className="text-xs text-slate-300 font-sans">
                      Thank you for reaching out! I will reply to your email promptly.
                    </p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="mt-4 text-xs font-mono text-emerald-400 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono text-[11px]">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe / Tech Recruiter"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono text-[11px]">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono text-[11px]">
                        MESSAGE
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Let's build something exceptional together..."
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH MESSAGE</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Press [ESC] to return to campus</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
          >
            Back to Courtyard
          </button>
        </div>
      </div>
    </div>
  );
}
