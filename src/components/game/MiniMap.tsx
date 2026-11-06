"use client";

import React, { useState } from "react";
import { BUILDINGS, MAP_COLS, MAP_ROWS, TILE_SIZE } from "@/game/utils/MapData";
import { BuildingInfo, PlayerPosition } from "@/game/types";
import { MapPin, Maximize2, Minimize2, Navigation } from "lucide-react";

interface MiniMapProps {
  playerPosition?: PlayerPosition;
  onBuildingSelect: (building: BuildingInfo) => void;
  onTeleport?: (x: number, y: number) => void;
}

export default function MiniMap({
  playerPosition,
  onBuildingSelect,
  onTeleport,
}: MiniMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const worldWidth = MAP_COLS * TILE_SIZE;
  const worldHeight = MAP_ROWS * TILE_SIZE;

  const playerPercentX = playerPosition
    ? (playerPosition.x / worldWidth) * 100
    : 50;
  const playerPercentY = playerPosition
    ? (playerPosition.y / worldHeight) * 100
    : 80;

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onTeleport) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const targetWorldX = (clickX / rect.width) * worldWidth;
    const targetWorldY = (clickY / rect.height) * worldHeight;
    onTeleport(targetWorldX, targetWorldY);
  };

  return (
    <div
      className={`fixed z-30 transition-all duration-300 ${
        isExpanded
          ? "bottom-6 right-6 w-96 h-80"
          : "bottom-6 right-6 w-52 h-44 md:w-60 md:h-52"
      } bg-[#0b132b]/95 backdrop-blur-md border-2 border-amber-500/40 rounded-xl shadow-2xl p-3 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 text-xs">
        <div className="flex items-center gap-1.5 font-pixel text-[9px] text-amber-400">
          <Navigation className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>CAMPUS RADAR</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-400 hover:text-white transition-colors p-1"
          title={isExpanded ? "Collapse Map" : "Expand Map"}
        >
          {isExpanded ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Mini-map Canvas / Layout Preview */}
      <div
        onClick={handleMapClick}
        className="relative flex-1 mt-2 bg-[#060b19] border border-slate-800 rounded-lg overflow-hidden cursor-crosshair group"
        title="Click anywhere to fast-travel"
      >
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* Building B (Top) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onBuildingSelect(BUILDINGS[1]);
          }}
          className="absolute top-[8%] left-[8%] right-[8%] h-[24%] bg-amber-950/70 border border-amber-500/60 rounded flex items-center justify-center cursor-pointer hover:bg-amber-900/80 transition-colors"
        >
          <span className="font-pixel text-[8px] text-amber-300 font-bold">
            BLDG B (Projects)
          </span>
        </div>

        {/* Building A (Left) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onBuildingSelect(BUILDINGS[0]);
          }}
          className="absolute top-[34%] left-[8%] w-[18%] bottom-[16%] bg-cyan-950/70 border border-cyan-500/60 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-cyan-900/80 transition-colors"
        >
          <span className="font-pixel text-[7px] text-cyan-300 font-bold rotate-[-90deg] whitespace-nowrap">
            BLDG A (About)
          </span>
        </div>

        {/* Building C (Right) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onBuildingSelect(BUILDINGS[2]);
          }}
          className="absolute top-[34%] right-[8%] w-[18%] bottom-[16%] bg-purple-950/70 border border-purple-500/60 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-purple-900/80 transition-colors"
        >
          <span className="font-pixel text-[7px] text-purple-300 font-bold rotate-[90deg] whitespace-nowrap">
            BLDG C (Awards)
          </span>
        </div>

        {/* Central Courtyard */}
        <div className="absolute top-[34%] left-[28%] right-[28%] bottom-[16%] bg-[#872e22]/20 border border-[#b84838]/30 rounded-sm flex items-center justify-center pointer-events-none">
          {/* 4 Green Planters */}
          <div className="absolute top-[18%] left-[18%] w-2 h-2 bg-emerald-500 rounded-sm shadow-sm shadow-emerald-400" />
          <div className="absolute top-[18%] right-[18%] w-2 h-2 bg-emerald-500 rounded-sm shadow-sm shadow-emerald-400" />
          <div className="absolute bottom-[18%] left-[18%] w-2 h-2 bg-emerald-500 rounded-sm shadow-sm shadow-emerald-400" />
          <div className="absolute bottom-[18%] right-[18%] w-2 h-2 bg-emerald-500 rounded-sm shadow-sm shadow-emerald-400" />
          <span className="text-[7px] font-pixel text-slate-500 uppercase tracking-widest opacity-60">
            PLAZA
          </span>
        </div>

        {/* Main Entrance (Bottom) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onBuildingSelect(BUILDINGS[3]);
          }}
          className="absolute bottom-[2%] left-[34%] right-[34%] h-[12%] bg-emerald-950/80 border border-emerald-500/60 rounded flex items-center justify-center cursor-pointer hover:bg-emerald-900/90 transition-colors"
        >
          <span className="font-pixel text-[7px] text-emerald-300 font-bold">
            GATE (Contact)
          </span>
        </div>

        {/* Live Player Marker */}
        <div
          className="absolute w-3 h-3 -ml-1.5 -mt-1.5 pointer-events-none transition-all duration-75"
          style={{
            left: `${playerPercentX}%`,
            top: `${playerPercentY}%`,
          }}
        >
          <div className="w-full h-full bg-amber-400 rounded-full border border-white shadow-lg animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
        <span className="text-[8px] font-mono">Press [M] to toggle</span>
        <span className="text-amber-400 font-mono">Click to Travel</span>
      </div>
    </div>
  );
}
