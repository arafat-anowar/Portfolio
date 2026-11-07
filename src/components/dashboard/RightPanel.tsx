"use client";

import React, { useState } from "react";
import {
  CheckSquare,
  Compass,
  Keyboard,
  Square,
  Trophy,
  Award,
  Sparkles,
  MapPin,
} from "lucide-react";
import { BUILDINGS, MAP_COLS, MAP_ROWS, TILE_SIZE } from "@/game/utils/MapData";
import { BuildingInfo, PlayerPosition } from "@/game/types";

interface RightPanelProps {
  playerPosition?: PlayerPosition;
  onBuildingSelect: (building: BuildingInfo) => void;
  onTeleport?: (x: number, y: number) => void;
  visitedBuildings: Set<string>;
  onOpenAchievements: () => void;
}

export default function RightPanel({
  playerPosition,
  onBuildingSelect,
  onTeleport,
  visitedBuildings,
  onOpenAchievements,
}: RightPanelProps) {
  const worldWidth = MAP_COLS * TILE_SIZE;
  const worldHeight = MAP_ROWS * TILE_SIZE;

  const playerPercentX = playerPosition
    ? (playerPosition.x / worldWidth) * 100
    : 50;
  const playerPercentY = playerPosition
    ? (playerPosition.y / worldHeight) * 100
    : 80;

  const handleMiniMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onTeleport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const targetWorldX = (clickX / rect.width) * worldWidth;
    const targetWorldY = (clickY / rect.height) * worldHeight;
    onTeleport(targetWorldX, targetWorldY);
  };

  const quests = [
    {
      id: "building-b",
      title: "Inspect Building B (Projects)",
      xp: "+250 XP",
      isDone: visitedBuildings.has("building-b"),
      building: BUILDINGS[1],
    },
    {
      id: "building-a",
      title: "Explore Building A (Education)",
      xp: "+200 XP",
      isDone: visitedBuildings.has("building-a"),
      building: BUILDINGS[0],
    },
    {
      id: "building-c",
      title: "Visit Building C (Achievements)",
      xp: "+150 XP",
      isDone: visitedBuildings.has("building-c"),
      building: BUILDINGS[2],
    },
    {
      id: "main-entrance",
      title: "Connect at Main Entrance",
      xp: "+100 XP",
      isDone: visitedBuildings.has("main-entrance"),
      building: BUILDINGS[3],
    },
  ];

  return (
    <aside className="w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-4 shrink-0 overflow-y-auto pl-1 select-none">
      {/* 1. EWU Campus Mini-Map Radar */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2.5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "14s" }} />
            <h3 className="font-pixel text-[10px] text-cyan-300">
              CAMPUS RADAR
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Live Map</span>
        </div>

        {/* Radar Graphic */}
        <div
          onClick={handleMiniMapClick}
          className="relative w-full h-36 bg-[#060b19] border border-slate-800/90 rounded-xl overflow-hidden cursor-crosshair group shadow-inner"
          title="Click to fast-travel inside the campus"
        >
          {/* Grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:10px_10px]" />

          {/* Building B (Top) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onBuildingSelect(BUILDINGS[1]);
            }}
            className="absolute top-[8%] left-[8%] right-[8%] h-[24%] bg-amber-950/70 border border-amber-500/60 rounded flex items-center justify-center hover:bg-amber-900/80 transition-colors"
          >
            <span className="font-pixel text-[7px] text-amber-300 font-bold">
              BLDG B (Projects)
            </span>
          </div>

          {/* Building A (Left) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onBuildingSelect(BUILDINGS[0]);
            }}
            className="absolute top-[34%] left-[8%] w-[20%] bottom-[16%] bg-cyan-950/70 border border-cyan-500/60 rounded flex items-center justify-center hover:bg-cyan-900/80 transition-colors"
          >
            <span className="font-pixel text-[6px] text-cyan-300 font-bold rotate-[-90deg] whitespace-nowrap">
              BLDG A
            </span>
          </div>

          {/* Building C (Right) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onBuildingSelect(BUILDINGS[2]);
            }}
            className="absolute top-[34%] right-[8%] w-[20%] bottom-[16%] bg-purple-950/70 border border-purple-500/60 rounded flex items-center justify-center hover:bg-purple-900/80 transition-colors"
          >
            <span className="font-pixel text-[6px] text-purple-300 font-bold rotate-[90deg] whitespace-nowrap">
              BLDG C
            </span>
          </div>

          {/* Courtyard Center & Planters */}
          <div className="absolute top-[34%] left-[30%] right-[30%] bottom-[16%] bg-[#872e22]/20 border border-[#b84838]/30 rounded-sm flex items-center justify-center pointer-events-none">
            <div className="absolute top-[18%] left-[18%] w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
            <div className="absolute top-[18%] right-[18%] w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
            <div className="absolute bottom-[18%] left-[18%] w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
            <div className="absolute bottom-[18%] right-[18%] w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
            <span className="text-[6px] font-pixel text-slate-500 opacity-60">
              PLAZA
            </span>
          </div>

          {/* Main Entrance (Bottom) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onBuildingSelect(BUILDINGS[3]);
            }}
            className="absolute bottom-[2%] left-[34%] right-[34%] h-[12%] bg-emerald-950/80 border border-emerald-500/60 rounded flex items-center justify-center hover:bg-emerald-900/90 transition-colors"
          >
            <span className="font-pixel text-[6px] text-emerald-300 font-bold">
              GATE
            </span>
          </div>

          {/* Live Player Marker */}
          <div
            className="absolute w-2.5 h-2.5 -ml-1 -mt-1 pointer-events-none transition-all duration-75"
            style={{
              left: `${playerPercentX}%`,
              top: `${playerPercentY}%`,
            }}
          >
            <div className="w-full h-full bg-amber-400 rounded-full border border-white shadow-lg animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>East West University</span>
          <span className="text-amber-400">Click to Fast Travel</span>
        </div>
      </div>

      {/* 2. Quest Checklist Card */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-pixel text-[10px] text-amber-300">
              QUEST CHECKLIST
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {visitedBuildings.size}/{BUILDINGS.length} Done
          </span>
        </div>

        <div className="space-y-2 text-xs font-mono">
          {quests.map((q) => (
            <div
              key={q.id}
              onClick={() => onBuildingSelect(q.building)}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                q.isDone
                  ? "bg-emerald-950/20 border-emerald-500/30 text-slate-200"
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {q.isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={q.isDone ? "line-through text-slate-400" : ""}>
                  {q.title}
                </span>
              </div>
              <span className="text-[10px] text-amber-400 font-bold shrink-0">
                {q.xp}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Achievements Card */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <h3 className="font-pixel text-[10px] text-purple-300">
              ACHIEVEMENTS
            </h3>
          </div>
          <button
            onClick={onOpenAchievements}
            className="text-[10px] font-mono text-purple-400 hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div
            onClick={onOpenAchievements}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-colors"
          >
            <div className="text-base mb-1">🏆</div>
            <div className="font-bold text-[11px] text-slate-200">1st Place</div>
            <div className="text-[10px] text-slate-400 font-sans">EWU Hackathon</div>
          </div>

          <div
            onClick={onOpenAchievements}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-colors"
          >
            <div className="text-base mb-1">⭐</div>
            <div className="font-bold text-[11px] text-slate-200">Dean's List</div>
            <div className="text-[10px] text-slate-400 font-sans">Academic Honor</div>
          </div>
        </div>
      </div>

      {/* 4. Keyboard Controls Reference Card */}
      <div className="bg-[#0b142e]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg text-xs font-mono">
        <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-slate-800/80">
          <Keyboard className="w-4 h-4 text-amber-400" />
          <h3 className="font-pixel text-[10px] text-amber-300">
            KEYBOARD CONTROLS
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
              WASD
            </span>
            <span className="text-slate-400">Move Player</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
              [E]
            </span>
            <span className="text-slate-400">Interact</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
              [M]
            </span>
            <span className="text-slate-400">Radar Map</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
              [ESC]
            </span>
            <span className="text-slate-400">Close</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
