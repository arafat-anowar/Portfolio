"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  GraduationCap,
  X,
  Code,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b132b] border-2 border-cyan-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-[#0d1b3e] to-[#071026]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-sm text-cyan-300">BUILDING A</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  WEST WING (10F)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                About Me, Philosophy & Academic Foundation
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
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {portfolioData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-3"
              >
                <div className="text-[11px] text-slate-400 font-mono uppercase">
                  {stat.label}
                </div>
                <div className="text-xs font-semibold text-cyan-300 mt-1 font-mono">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* About Bio Section */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="font-pixel text-xs text-amber-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              DEVELOPER BIO & BACKGROUND
            </h3>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
              {portfolioData.about.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Education Journey at EWU */}
          <section>
            <h3 className="font-pixel text-xs text-cyan-300 mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              EDUCATION & ACADEMICS
            </h3>
            <div className="space-y-4">
              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors rounded-xl p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base text-slate-100">
                        {edu.degree}
                      </h4>
                      <p className="text-cyan-400 text-sm font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex flex-col items-end text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300 font-sans list-disc list-inside">
                    {edu.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Pillars */}
          <section className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-cyan-300 font-pixel text-[10px] mb-2">
                <Code className="w-4 h-4 text-cyan-400" />
                CLEAN ARCHITECTURE
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Emphasizing modular design, strict TypeScript typing, reusable components, and testable system pipelines.
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-300 font-pixel text-[10px] mb-2">
                <Award className="w-4 h-4 text-amber-400" />
                INTERACTIVE PERFORMANCE
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Achieving smooth 60 FPS WebGL/Canvas rendering, sub-100ms API responses, and lightweight client bundles.
              </p>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Press [ESC] to return to campus</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
          >
            Back to Courtyard
          </button>
        </div>
      </div>
    </div>
  );
}
