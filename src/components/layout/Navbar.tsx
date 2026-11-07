"use client";

import React from "react";
import { Download, Gamepad2, Sparkles, Terminal } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
  onPlayInCampus: () => void;
  isGameMode: boolean;
}

export default function Navbar({
  activeTab,
  onTabSelect,
  onPlayInCampus,
  isGameMode,
}: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "campus", label: "Campus" },
    { id: "blog", label: "Blog" },
  ];

  return (
    <header className="w-full bg-[#070d1f]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 shrink-0 z-40 select-none">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => onTabSelect("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Pixel Developer Icon */}
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-purple-600/30 border-2 border-amber-500/60 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-all">
            <span className="font-pixel text-amber-300 text-xs font-bold">&lt;/&gt;</span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#070d1f] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel text-sm text-slate-100 tracking-wide group-hover:text-amber-300 transition-colors">
                ARAFAT ANOWAR
              </h1>
              <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                LVL 10
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span className="text-cyan-400 font-medium">Software Engineer</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">CSE @ East West University</span>
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/70 border border-slate-800 rounded-xl p-1 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabSelect(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === item.id
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Resume Download */}
          <a
            href="/resume.pdf"
            download="Arafat_Anowar_Resume.pdf"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-mono transition-colors shadow"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Resume</span>
          </a>

          {/* Primary CTA: Play in Campus Button */}
          <button
            onClick={onPlayInCampus}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 shadow-xl ${
              isGameMode
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/80 shadow-cyan-500/30 animate-pulse"
                : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 border border-amber-300 shadow-amber-500/25 active:scale-95"
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{isGameMode ? "RETURN TO PORTFOLIO" : "PLAY IN CAMPUS"}</span>
            {!isGameMode && <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />}
          </button>
        </div>
      </div>
    </header>
  );
}
