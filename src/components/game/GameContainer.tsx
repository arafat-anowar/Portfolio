"use client";

import React, { useEffect, useRef, useState } from "react";
import { BuildingInfo, PlayerPosition } from "@/game/types";
import { createGameConfig } from "@/game/config";
import { CampusScene } from "@/game/scenes/CampusScene";

interface GameContainerProps {
  onBuildingSelect: (building: BuildingInfo) => void;
  onPlayerPositionChange?: (pos: PlayerPosition) => void;
  isModalOpen: boolean;
  targetTeleport?: { x: number; y: number } | null;
}

export default function GameContainer({
  onBuildingSelect,
  onPlayerPositionChange,
  isModalOpen,
  targetTeleport,
}: GameContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    let phaserInstance: Phaser.Game | null = null;

    const initPhaser = async () => {
      const PhaserModule = await import("phaser");
      const Phaser = (PhaserModule as any).default || PhaserModule;

      if (!containerRef.current) return;

      const callbacks = {
        onBuildingEnter: (building: BuildingInfo) => {
          onBuildingSelect(building);
        },
        onBuildingLeave: () => {
          // Can handle leave event
        },
        onPlayerMove: (pos: PlayerPosition) => {
          if (onPlayerPositionChange) {
            onPlayerPositionChange(pos);
          }
        },
        onGameReady: () => {
          setIsReady(true);
        },
      };

      const config = createGameConfig(containerRef.current, callbacks);
      phaserInstance = new Phaser.Game(config);
      gameRef.current = phaserInstance;
    };

    initPhaser();

    return () => {
      if (phaserInstance) {
        phaserInstance.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onBuildingSelect, onPlayerPositionChange]);

  // Lock controls when a modal dialog is open
  useEffect(() => {
    if (gameRef.current) {
      const campusScene = gameRef.current.scene.getScene("CampusScene") as CampusScene;
      if (campusScene && campusScene.lockControls) {
        campusScene.lockControls(isModalOpen);
      }
    }
  }, [isModalOpen]);

  // Teleport player when requested (e.g. from MiniMap click)
  useEffect(() => {
    if (targetTeleport && gameRef.current) {
      const campusScene = gameRef.current.scene.getScene("CampusScene") as CampusScene;
      if (campusScene && campusScene.teleportPlayer) {
        campusScene.teleportPlayer(targetTeleport.x, targetTeleport.y);
      }
    }
  }, [targetTeleport]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060b19]">
      <div
        ref={containerRef}
        id="phaser-game-container"
        className="w-full h-full"
      />
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060b19] z-50">
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-400 rounded-full animate-spin mb-4" />
            <h2 className="text-amber-400 font-pixel text-sm tracking-wider animate-pulse">
              LOADING EWU CAMPUS...
            </h2>
            <p className="text-slate-400 text-xs mt-2 font-mono">
              Rendering East West University 16-Bit Pixel World
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
