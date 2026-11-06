"use client";

import React, { useState } from "react";
import { MessageSquare, ChevronRight, X } from "lucide-react";
import { SoundFX } from "@/game/utils/SoundFX";

interface DialogueModalProps {
  npc: {
    name: string;
    role: string;
    dialogue: string[];
  };
  onClose: () => void;
}

export default function DialogueModal({ npc, onClose }: DialogueModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    SoundFX.playBlip();
    if (currentPage < npc.dialogue.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-20 px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl bg-[#0b132b]/95 backdrop-blur-md border-2 border-amber-500/60 rounded-2xl shadow-2xl p-5 text-slate-100 animate-slideUp">
        {/* Speaker Info Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-amber-300 font-bold">
                  {npc.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {npc.role}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dialogue Speech Bubble */}
        <div className="min-h-[64px] flex items-center">
          <p className="text-sm font-sans text-slate-200 leading-relaxed">
            &ldquo;{npc.dialogue[currentPage]}&rdquo;
          </p>
        </div>

        {/* Dialogue Navigation Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-3 text-xs font-mono">
          <span className="text-slate-400 text-[11px]">
            Line {currentPage + 1} of {npc.dialogue.length} • Press [E] or Click
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors text-xs shadow-md shadow-amber-500/20"
          >
            <span>{currentPage < npc.dialogue.length - 1 ? "CONTINUE" : "DONE"}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
