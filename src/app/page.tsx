"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { BuildingInfo, PlayerPosition } from "@/game/types";
import GameHUD from "@/components/game/GameHUD";
import MiniMap from "@/components/game/MiniMap";
import AboutModal from "@/components/modals/AboutModal";
import ProjectsModal from "@/components/modals/ProjectsModal";
import JourneyModal from "@/components/modals/JourneyModal";
import ContactModal from "@/components/modals/ContactModal";
import DialogueModal from "@/components/game/DialogueModal";
import MobileControls from "@/components/game/MobileControls";
import RecruiterView from "@/components/game/RecruiterView";

// Dynamically import Phaser GameContainer with SSR disabled
const GameContainer = dynamic(
  () => import("@/components/game/GameContainer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#060b19] text-amber-400 font-pixel text-xs">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-400 rounded-full animate-spin mb-4" />
        INITIALIZING EWU CAMPUS...
      </div>
    ),
  }
);

export default function Home() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingInfo | null>(null);
  const [activeNPC, setActiveNPC] = useState<{
    name: string;
    role: string;
    dialogue: string[];
  } | null>(null);
  const [isRecruiterMode, setIsRecruiterMode] = useState<boolean>(false);
  const [visitedBuildings, setVisitedBuildings] = useState<Set<string>>(new Set());
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition | undefined>();
  const [targetTeleport, setTargetTeleport] = useState<{ x: number; y: number } | null>(null);
  const [showMiniMap, setShowMiniMap] = useState<boolean>(true);

  // Mobile movement state
  const [mobileVelocity, setMobileVelocity] = useState<{ vx: number; vy: number }>({
    vx: 0,
    vy: 0,
  });
  const [interactSignal, setInteractSignal] = useState<number>(0);

  // Handle building selection (when entering door or clicking on HUD/map)
  const handleBuildingSelect = useCallback((building: BuildingInfo) => {
    setSelectedBuilding(building);
    setActiveNPC(null);
    setVisitedBuildings((prev) => {
      const next = new Set(prev);
      next.add(building.id);
      return next;
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBuilding(null);
    setActiveNPC(null);
  }, []);

  // Keyboard shortcut listener (ESC to close dialogs, M to toggle map)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        if (selectedBuilding || activeNPC) {
          handleCloseModal();
        } else if (isRecruiterMode) {
          setIsRecruiterMode(false);
        }
      } else if (
        (e.key === "m" || e.key === "M") &&
        !selectedBuilding &&
        !activeNPC &&
        !isRecruiterMode
      ) {
        setShowMiniMap((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBuilding, activeNPC, isRecruiterMode, handleCloseModal]);

  const handleTeleport = (x: number, y: number) => {
    setTargetTeleport({ x, y });
    setTimeout(() => setTargetTeleport(null), 100);
  };

  const handleMobileMove = (vx: number, vy: number) => {
    setMobileVelocity({ vx, vy });
  };

  const handleMobileInteract = () => {
    setInteractSignal((prev) => prev + 1);
  };

  const isAnyModalOpen = !!selectedBuilding || !!activeNPC;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#060b19]">
      {/* 2D RPG Campus Game Engine View */}
      <GameContainer
        onBuildingSelect={handleBuildingSelect}
        onNPCInteract={setActiveNPC}
        onPlayerPositionChange={setPlayerPosition}
        isModalOpen={isAnyModalOpen}
        targetTeleport={targetTeleport}
        mobileVelocity={mobileVelocity}
        interactSignal={interactSignal}
      />

      {/* Retro CRT Scanline & Ambient Filter */}
      <div className="absolute inset-0 crt-overlay pointer-events-none z-10 opacity-70" />

      {/* Top and Bottom RPG HUD */}
      {!isRecruiterMode && (
        <GameHUD
          currentBuilding={selectedBuilding}
          onBuildingSelect={handleBuildingSelect}
          isRecruiterMode={isRecruiterMode}
          onToggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
          visitedBuildings={visitedBuildings}
          playerPosition={playerPosition}
        />
      )}

      {/* Interactive Campus MiniMap */}
      {!isRecruiterMode && showMiniMap && (
        <MiniMap
          playerPosition={playerPosition}
          onBuildingSelect={handleBuildingSelect}
          onTeleport={handleTeleport}
        />
      )}

      {/* Virtual Mobile Controls (Bottom-Left D-Pad & Bottom-Right Action Button) */}
      {!isRecruiterMode && !isAnyModalOpen && (
        <MobileControls
          onMove={handleMobileMove}
          onInteract={handleMobileInteract}
        />
      )}

      {/* NPC Dialogue Box */}
      {activeNPC && (
        <DialogueModal npc={activeNPC} onClose={handleCloseModal} />
      )}

      {/* Building Portals & Modals */}
      {selectedBuilding?.id === "building-a" && (
        <AboutModal onClose={handleCloseModal} />
      )}
      {selectedBuilding?.id === "building-b" && (
        <ProjectsModal onClose={handleCloseModal} />
      )}
      {selectedBuilding?.id === "building-c" && (
        <JourneyModal onClose={handleCloseModal} />
      )}
      {selectedBuilding?.id === "main-entrance" && (
        <ContactModal onClose={handleCloseModal} />
      )}

      {/* Recruiter Mode View */}
      {isRecruiterMode && (
        <RecruiterView onReturnToGame={() => setIsRecruiterMode(false)} />
      )}
    </main>
  );
}
