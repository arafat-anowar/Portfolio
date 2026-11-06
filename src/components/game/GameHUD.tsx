"use client";

import React from "react";
import { BuildingInfo, PlayerPosition } from "@/game/types";
import { BUILDINGS } from "@/game/utils/MapData";
import {
  Briefcase,
  Download,
  Gamepad2,
  GraduationCap,
  Sparkles,
  Trophy,
  User,
  Compass,
} from "lucide-react";

interface GameHUDProps {
  currentBuilding: BuildingInfo | null;
  onBuildingSelect: (building: BuildingInfo) => void;
  isRecruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  visitedBuildings: Set<string>;
  playerPosition?: PlayerPosition;
}

export default function GameHUD({
  currentBuilding,
  onBuildingSelect,
  isRecruiterMode,
  onToggleRecruiterMode,
  visitedBuildings,
}: GameHUDProps) {
  const visitedCount = visitedBuildings.size;
  const totalCount = BUILDINGS.length;
  const progressPercent = Math.round((visitedCount / totalCount) * 100);

  return (
    <>
      {/* TOP HUD BAR */}
      <header className="fixed top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Player Profile & Location */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#0a1128]/90 backdrop-blur-md border border-amber-500/30 rounded-xl px-4 py-2.5 shadow-xl">
          {/* Avatar Icon */}
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 p-0.5 border border-amber-400/50 flex items-center justify-center shadow-inner">
            <span className="font-pixel text-xs text-white">MD</span>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0a1128] rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel text-[11px] text-amber-300 font-bold tracking-wider">
                ARAFAT ANOWAR
              </h1>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-pixel">
                LVL 10 DEV
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5 font-mono">
              <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-slate-400">Loc:</span>
              <span className="text-cyan-300 font-medium">
                {currentBuilding ? currentBuilding.name : "EWU Inner Plaza"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Travel / Building Shortcut Pills */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-1.5 bg-[#0a1128]/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-1.5 shadow-lg">
          {BUILDINGS.map((b) => {
            const isVisited = visitedBuildings.has(b.id);
            const isNear = currentBuilding?.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => onBuildingSelect(b)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  isNear
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : isVisited
                    ? "bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-slate-700"
                    : "bg-slate-900/60 text-slate-400 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {b.id === "building-a" && <GraduationCap className="w-3.5 h-3.5" />}
                {b.id === "building-b" && <Briefcase className="w-3.5 h-3.5" />}
                {b.id === "building-c" && <Trophy className="w-3.5 h-3.5" />}
                {b.id === "main-entrance" && <User className="w-3.5 h-3.5" />}
                <span>{b.code}</span>
                {isVisited && <span className="text-emerald-400 text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Action Controls & Mode Switch */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Recruiter Mode Toggle */}
          <button
            onClick={onToggleRecruiterMode}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 border shadow-lg ${
              isRecruiterMode
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-amber-500/25"
                : "bg-[#0b132b]/90 text-amber-400 border-amber-500/40 hover:bg-amber-500/10"
            }`}
          >
            {isRecruiterMode ? (
              <>
                <Gamepad2 className="w-4 h-4" />
                <span>PLAY RPG MODE</span>
              </>
            ) : (
              <>
                <Briefcase className="w-4 h-4" />
                <span>RECRUITER MODE</span>
              </>
            )}
          </button>

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Arafat_Anowar_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono transition-colors shadow-lg"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">CV</span>
          </a>
        </div>
      </header>

      {/* TOP-LEFT QUEST / EXPLORATION PROGRESS */}
      <div className="fixed top-20 left-3 z-30 pointer-events-none hidden sm:block">
        <div className="bg-[#0b132b]/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 w-64 shadow-xl">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-pixel text-[8px] text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              CAMPUS QUEST
            </span>
            <span className="font-mono text-[10px] text-slate-300 font-bold">
              {visitedCount}/{totalCount} ({progressPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-tight">
            Approach buildings & press <span className="text-amber-300 font-bold font-mono">[E]</span> or click to unlock portfolio sectors.
          </p>
        </div>
      </div>

      {/* BOTTOM CONTROLS HINT BAR */}
      <footer className="fixed bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none text-slate-400 text-xs font-mono">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0a1128]/90 backdrop-blur-md border border-slate-800 rounded-xl px-3.5 py-2 shadow-lg text-[11px]">
          <span className="text-slate-400">Controls:</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
            WASD / Arrows
          </span>
          <span className="text-slate-500">•</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
            [E]
          </span>
          <span className="text-slate-400">Enter</span>
          <span className="text-slate-500">•</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
            [M]
          </span>
          <span className="text-slate-400">Map</span>
          <span className="text-slate-500">•</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
            [ESC]
          </span>
          <span className="text-slate-400">Close</span>
        </div>

        {/* Floating Quick Action indicator when standing near a building */}
        {currentBuilding && (
          <div className="pointer-events-auto animate-bounce bg-amber-500 text-slate-950 font-pixel text-[9px] px-3.5 py-2 rounded-xl font-bold shadow-xl flex items-center gap-2">
            <span>PRESS [E] TO ENTER {currentBuilding.code}</span>
          </div>
        )}
      </footer>
    </>
  );
}
