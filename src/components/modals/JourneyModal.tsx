"use client";

import React from "react";
import { portfolioData, AchievementItem } from "@/data/portfolioData";
import {
  Trophy,
  X,
  Award,
  Milestone,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

interface JourneyModalProps {
  onClose: () => void;
}

export default function JourneyModal({ onClose }: JourneyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b132b] border-2 border-purple-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-gradient-to-r from-[#210c2f] to-[#0a1128]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-sm text-purple-300">BUILDING C</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                  EAST WING (8F)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Achievements, Competitions & Learning Journey
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
          {/* Header Banner */}
          <div className="bg-purple-950/30 border border-purple-900/50 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="font-pixel text-xs text-purple-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                ACCOLADES & MILESTONES
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                Proven track record in university hackathons, algorithmic contests, and collaborative projects.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 font-pixel text-xl text-purple-400">
              <span>🏆</span>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-4">
            {portfolioData.achievements.map((item: AchievementItem, idx: number) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 transition-all rounded-xl p-5 relative overflow-hidden group"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-100 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-mono border border-purple-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{item.year}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-purple-400 font-mono mb-2">
                  {item.organization}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Growth Journey Milestones */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h4 className="font-pixel text-xs text-amber-300 mb-4 flex items-center gap-2">
              <Milestone className="w-4 h-4 text-amber-400" />
              LEARNING ROADMAP & CURRENT QUEST
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Advanced Computer Science Curriculum at East West University</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deep dive into WebGL, Game Engine Architecture & Canvas pipelines</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Full-stack distributed web applications with Next.js & TypeScript</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0 mt-0.5" />
                <span className="text-amber-300 font-medium">Currently building scalable interactive software products</span>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Press [ESC] to return to campus</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
          >
            Back to Courtyard
          </button>
        </div>
      </div>
    </div>
  );
}
