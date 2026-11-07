"use client";

import React from "react";
import {
  Download,
  Flame,
  Gamepad2,
  GraduationCap,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

interface LeftPanelProps {
  onStartJourney: () => void;
  onOpenSection: (section: "about" | "projects" | "skills" | "achievements") => void;
}

export default function LeftPanel({
  onStartJourney,
  onOpenSection,
}: LeftPanelProps) {
  const currentXP = 2450;
  const maxXP = 3000;
  const xpPercent = Math.round((currentXP / maxXP) * 100);

  const chapters = [
    {
      id: "chapter-1",
      number: "CH.01",
      title: "Academic Roots & Foundation",
      subtitle: "B.Sc. in CSE @ East West University",
      status: "completed",
      action: () => onOpenSection("about"),
    },
    {
      id: "chapter-2",
      number: "CH.02",
      title: "Full-Stack Web Architectures",
      subtitle: "Next.js, TypeScript, Cloud & APIs",
      status: "current",
      action: () => onOpenSection("projects"),
    },
    {
      id: "chapter-3",
      number: "CH.03",
      title: "Interactive Game Engines & Canvas",
      subtitle: "Phaser 3, 2D RPGs & WebGL Shaders",
      status: "current",
      action: () => onOpenSection("skills"),
    },
  ];

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] flex flex-col gap-4 shrink-0 overflow-y-auto pr-1 select-none">
      {/* 1. Hero Intro Card with Pixel Art Heading */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Level & Status Pill */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Open to Opportunities</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>LEVEL 10</span>
          </div>
        </div>

        {/* Pixel Art Heading */}
        <h2 className="font-pixel text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 leading-snug tracking-wide mb-3">
          WELCOME TO MY PORTFOLIO
        </h2>

        {/* Bio summary */}
        <p className="text-xs text-slate-300 font-sans leading-relaxed mb-5">
          I am a passionate software engineer and student at{" "}
          <span className="text-amber-400 font-medium">East West University</span>.
          I build high-performance web systems, modern scalable backends, and
          interactive 2D pixel-art game worlds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onStartJourney}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>START JOURNEY</span>
          </button>

          <a
            href="/resume.pdf"
            download="Arafat_Anowar_Resume.pdf"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-colors shadow"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>DOWNLOAD CV</span>
          </a>
        </div>
      </div>

      {/* 2. XP & Level Progression Card */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-pixel text-[10px] text-amber-300">
              DEVELOPER PROGRESSION
            </span>
          </div>
          <span className="text-xs font-mono text-slate-300 font-bold">
            {currentXP} / {maxXP} XP
          </span>
        </div>

        {/* XP Bar */}
        <div className="w-full h-2.5 bg-slate-950/80 rounded-full border border-slate-800 overflow-hidden mb-3.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 shadow-sm shadow-amber-400"
            style={{ width: `${xpPercent}%` }}
          />
        </div>

        {/* Progression Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2">
            <div className="text-[10px] text-slate-400 uppercase">Projects</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5">
              {portfolioData.projects.length}+
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2">
            <div className="text-[10px] text-slate-400 uppercase">Mastery</div>
            <div className="text-sm font-bold text-cyan-300 mt-0.5">95%</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2">
            <div className="text-[10px] text-slate-400 uppercase">Awards</div>
            <div className="text-sm font-bold text-purple-300 mt-0.5">4+</div>
          </div>
        </div>
      </div>

      {/* 3. Your Journey Progression Panel */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex-1">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-pixel text-[10px] text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            YOUR JOURNEY
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Roadmap</span>
        </div>

        <div className="space-y-2.5">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              onClick={ch.action}
              className="p-3 rounded-xl bg-slate-900/50 hover:bg-slate-850 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group flex items-start justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-pixel px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {ch.number}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {ch.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  {ch.subtitle}
                </p>
              </div>

              <div className="pt-0.5 text-slate-500 group-hover:text-cyan-400 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
