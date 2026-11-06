"use client";

import React, { useRef } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface MobileControlsProps {
  onMove: (vx: number, vy: number) => void;
  onInteract: () => void;
}

export default function MobileControls({ onMove, onInteract }: MobileControlsProps) {
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMoving = (vx: number, vy: number) => {
    onMove(vx, vy);
    if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
    activeIntervalRef.current = setInterval(() => {
      onMove(vx, vy);
    }, 50);
  };

  const stopMoving = () => {
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    onMove(0, 0);
  };

  const speed = 150;

  return (
    <div className="fixed inset-x-0 bottom-6 z-30 flex items-end justify-between px-6 pointer-events-none sm:hidden">
      {/* Virtual D-Pad (Bottom-Left) */}
      <div className="pointer-events-auto relative w-36 h-36 bg-[#0a1128]/80 backdrop-blur-md rounded-full border-2 border-slate-700/80 p-2 shadow-2xl flex items-center justify-center">
        {/* Up Button */}
        <button
          onTouchStart={() => startMoving(0, -speed)}
          onTouchEnd={stopMoving}
          onMouseDown={() => startMoving(0, -speed)}
          onMouseUp={stopMoving}
          className="absolute top-2 w-10 h-10 bg-slate-800 active:bg-amber-500 rounded-lg flex items-center justify-center text-slate-300 active:text-slate-950 border border-slate-600 shadow"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Down Button */}
        <button
          onTouchStart={() => startMoving(0, speed)}
          onTouchEnd={stopMoving}
          onMouseDown={() => startMoving(0, speed)}
          onMouseUp={stopMoving}
          className="absolute bottom-2 w-10 h-10 bg-slate-800 active:bg-amber-500 rounded-lg flex items-center justify-center text-slate-300 active:text-slate-950 border border-slate-600 shadow"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        {/* Left Button */}
        <button
          onTouchStart={() => startMoving(-speed, 0)}
          onTouchEnd={stopMoving}
          onMouseDown={() => startMoving(-speed, 0)}
          onMouseUp={stopMoving}
          className="absolute left-2 w-10 h-10 bg-slate-800 active:bg-amber-500 rounded-lg flex items-center justify-center text-slate-300 active:text-slate-950 border border-slate-600 shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Button */}
        <button
          onTouchStart={() => startMoving(speed, 0)}
          onTouchEnd={stopMoving}
          onMouseDown={() => startMoving(speed, 0)}
          onMouseUp={stopMoving}
          className="absolute right-2 w-10 h-10 bg-slate-800 active:bg-amber-500 rounded-lg flex items-center justify-center text-slate-300 active:text-slate-950 border border-slate-600 shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Center Pivot */}
        <div className="w-6 h-6 rounded-full bg-slate-700/60 border border-slate-600" />
      </div>

      {/* Action [E] Button (Bottom-Right) */}
      <div className="pointer-events-auto">
        <button
          onClick={onInteract}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 active:scale-95 text-slate-950 font-pixel text-sm font-bold border-2 border-amber-300 shadow-xl shadow-amber-500/30 flex flex-col items-center justify-center transition-transform"
        >
          <span>E</span>
          <span className="text-[7px] font-mono mt-0.5">ACTION</span>
        </button>
      </div>
    </div>
  );
}
