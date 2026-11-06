/**
 * BootScene.ts
 * Generates all 16-bit procedural textures, registers animations, and launches the CampusScene.
 */

import * as Phaser from "phaser";
import { TextureGenerator } from "../utils/TextureGenerator";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  public preload(): void {
    // Generate all procedural pixel textures using HTML5 Canvas
    TextureGenerator.generateAll(this);
  }

  public create(): void {
    // Create Player Animation Sets
    // player_arafat frames: 4 cols x 4 rows
    // Row 0: Down (frames 0, 1, 2, 3)
    // Row 1: Left (frames 4, 5, 6, 7)
    // Row 2: Right (frames 8, 9, 10, 11)
    // Row 3: Up (frames 12, 13, 14, 15)

    const anims = this.anims;

    // Walking Animations
    anims.create({
      key: "player-walk-down",
      frames: anims.generateFrameNumbers("player_arafat", { frames: [1, 0, 3, 0] }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-walk-left",
      frames: anims.generateFrameNumbers("player_arafat", { frames: [5, 4, 7, 4] }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-walk-right",
      frames: anims.generateFrameNumbers("player_arafat", { frames: [9, 8, 11, 8] }),
      frameRate: 8,
      repeat: -1,
    });

    anims.create({
      key: "player-walk-up",
      frames: anims.generateFrameNumbers("player_arafat", { frames: [13, 12, 15, 12] }),
      frameRate: 8,
      repeat: -1,
    });

    // Idle Animations
    anims.create({
      key: "player-idle-down",
      frames: [{ key: "player_arafat", frame: 0 }],
      frameRate: 1,
    });

    anims.create({
      key: "player-idle-left",
      frames: [{ key: "player_arafat", frame: 4 }],
      frameRate: 1,
    });

    anims.create({
      key: "player-idle-right",
      frames: [{ key: "player_arafat", frame: 8 }],
      frameRate: 1,
    });

    anims.create({
      key: "player-idle-up",
      frames: [{ key: "player_arafat", frame: 12 }],
      frameRate: 1,
    });

    // Transition directly to the Campus World
    this.scene.start("CampusScene");
  }
}
