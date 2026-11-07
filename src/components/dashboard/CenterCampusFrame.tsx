"use client";

import React, { useState } from "react";
import {
  Compass,
  Expand,
  Eye,
  Gamepad2,
  GraduationCap,
  Layers,
  Sparkles,
  Trophy,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { BuildingInfo, PlayerPosition } from "@/game/types";
import { BUILDINGS } from "@/game/utils/MapData";
import { SoundFX } from "@/game/utils/SoundFX";

interface CenterCampusFrameProps {
  onBuildingSelect: (building: BuildingInfo) => void;
  onPlayInCampus: () => void;
  children: React.ReactNode;
}

export default function CenterCampusFrame({
  onBuildingSelect,
  onPlayInCampus,
  children,
}: CenterCampusFrameProps) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    SoundFX.setMuted(nextMuted);
    if (!nextMuted) SoundFX.playBlip();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#070d1f]/90 backdrop-blur-md border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden relative group">
      {/* Frame Top Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0b142e] border-b border-slate-800 text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400" />
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="font-pixel text-[10px] text-amber-300">
              EWU CAMPUS — CENTRAL COURTYARD WORLD
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-700/80 transition-colors"
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Fullscreen Game Launcher */}
          <button
            onClick={onPlayInCampus}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <Expand className="w-3.5 h-3.5" />
            <span>PLAY FULLSCREEN</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Container */}
      <div className="relative flex-1 w-full h-[480px] lg:h-auto min-h-[460px] overflow-hidden bg-[#060b19]">
        {children}

        {/* Building Overlay Badges (Hover shortcuts) */}
        <div className="absolute top-3 inset-x-3 pointer-events-none flex items-center justify-between gap-2 z-20 text-[10px] font-mono">
          {/* Building A Pill */}
          <button
            onClick={() => onBuildingSelect(BUILDINGS[0])}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070d1f]/90 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/50 backdrop-blur-md shadow-lg transition-all"
          >
            <GraduationCap className="w-3 h-3 text-cyan-400" />
            <span>BLDG A: Education</span>
          </button>

          {/* Building B Pill (Center) */}
          <button
            onClick={() => onBuildingSelect(BUILDINGS[1])}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#070d1f]/90 hover:bg-amber-950 text-amber-300 border border-amber-500/60 backdrop-blur-md shadow-lg transition-all"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>BLDG B: Projects (10F)</span>
          </button>

          {/* Building C Pill */}
          <button
            onClick={() => onBuildingSelect(BUILDINGS[2])}
            className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070d1f]/90 hover:bg-purple-950 text-purple-300 border border-purple-500/50 backdrop-blur-md shadow-lg transition-all"
          >
            <Trophy className="w-3 h-3 text-purple-400" />
            <span>BLDG C: Honors</span>
          </button>
        </div>

        {/* Center Bottom Floating Quick Play Pill */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none z-20">
          <button
            onClick={onPlayInCampus}
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-mono text-xs font-bold border border-amber-200 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>ENTER PLAYABLE CAMPUS (WASD + [E])</span>
          </button>
        </div>
      </div>

      {/* Frame Bottom Status Strip */}
      <div className="px-4 py-2 bg-[#0b142e] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Active World: East West University, Aftabnagar</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-500">
          <span>Courtyard: ~58m × 42m</span>
          <span>•</span>
          <span>Engine: Phaser 3 WebGL</span>
        </div>
      </div>
    </div>
  );
}
