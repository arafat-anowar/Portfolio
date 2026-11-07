"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles, Volume2, ChevronRight, X } from "lucide-react";
import { SoundFX } from "@/game/utils/SoundFX";

interface AvatarDialogueProps {
  onStartGame?: () => void;
}

export default function AvatarDialogue({ onStartGame }: AvatarDialogueProps) {
  const dialogueLines = [
    "Hi there! I'm Arafat Anowar, a Software Engineer and CSE student at East West University. Welcome to my interactive dev world!",
    "In this campus portfolio, you can explore Building B for my featured projects, Building A for my academic roots, and Building C for hackathon trophies.",
    "Click 'PLAY IN CAMPUS' on the top bar or use the center map to walk around the courtyard in real-time. Feel free to download my CV anytime!",
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (isMinimized) return;
    const fullText = dialogueLines[currentLineIndex];
    let currentIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [currentLineIndex, isMinimized]);

  const handleNext = () => {
    SoundFX.playBlip();
    if (currentLineIndex < dialogueLines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      setCurrentLineIndex(0);
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0b142e]/95 border border-amber-500/50 shadow-2xl hover:bg-amber-500/10 transition-all text-xs font-mono text-amber-300 select-none"
      >
        <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center font-pixel text-[9px] text-amber-400">
          MD
        </div>
        <span>Talk to Arafat</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-md w-[calc(100vw-2rem)] sm:w-[420px] select-none animate-slideUp">
      <div className="bg-[#070d1f]/95 backdrop-blur-md border-2 border-amber-500/50 rounded-2xl p-4 shadow-2xl shadow-black/80 flex flex-col gap-3 relative overflow-hidden">
        {/* Glow corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {/* Pixel Art Avatar Box */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 p-0.5 border-2 border-amber-400 shadow-md flex items-center justify-center">
              <span className="font-pixel text-xs text-white">MD</span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#070d1f]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-pixel text-[11px] text-amber-300 font-bold">
                  ARAFAT
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  DEVELOPER
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                East West University, CSE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Minimize Dialogue"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Speech Bubble Content */}
        <div className="min-h-[58px] flex items-center">
          <p className="text-xs font-sans text-slate-200 leading-relaxed">
            &ldquo;{displayedText}&rdquo;
            {isTyping && (
              <span className="inline-block w-1.5 h-3 bg-amber-400 ml-1 animate-pulse" />
            )}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono">
          <span className="text-slate-500">
            Message {currentLineIndex + 1}/{dialogueLines.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors font-bold"
            >
              <span>{currentLineIndex < dialogueLines.length - 1 ? "Next" : "Restart"}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
