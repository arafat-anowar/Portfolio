/**
 * config.ts
 * Phaser 3 Game Engine Configuration for EWU RPG World
 */

import * as Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { CampusScene } from "./scenes/CampusScene";

export function createGameConfig(
  parent: HTMLElement,
  callbacks?: any
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent: parent,
    width: parent.clientWidth || window.innerWidth,
    height: parent.clientHeight || window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scene: [BootScene, CampusScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    callbacks: {
      postBoot: (game) => {
        const campusScene = game.scene.getScene("CampusScene") as CampusScene;
        if (campusScene && callbacks) {
          campusScene.setCallbacks(callbacks);
        }
      },
    },
  };
}
