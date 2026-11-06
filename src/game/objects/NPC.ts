/**
 * NPC.ts
 * Interactive Campus NPC Character with proximity trigger, floating prompt, and dialogue.
 */

import * as Phaser from "phaser";
import { SoundFX } from "../utils/SoundFX";

export interface NPCData {
  id: string;
  name: string;
  role: string;
  texture: string;
  x: number;
  y: number;
  dialogue: string[];
}

export class NPC extends Phaser.Physics.Arcade.Sprite {
  public dataInfo: NPCData;
  private promptContainer: Phaser.GameObjects.Container;
  private isPlayerNearby = false;
  private bounceTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, data: NPCData) {
    super(scene, data.x, data.y, data.texture);
    this.dataInfo = data;

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // Static body

    this.setDepth(data.y);

    // Floating Interaction Prompt [E] TALK
    this.promptContainer = scene.add.container(data.x, data.y - 30);
    this.promptContainer.setDepth(9999);
    this.promptContainer.setVisible(false);

    const bgPill = scene.add.rectangle(0, 0, 78, 22, 0x090f1f, 0.92);
    bgPill.setStrokeStyle(1.5, 0x38bdf8);

    const keyBox = scene.add.rectangle(-26, 0, 16, 16, 0x1e293b);
    keyBox.setStrokeStyle(1, 0xffbe53);
    const keyText = scene.add.text(-26, 0, "E", {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#ffbe53",
      fontStyle: "bold",
    }).setOrigin(0.5);

    const labelText = scene.add.text(-14, 0, "TALK", {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: "7px",
      color: "#ffffff",
    }).setOrigin(0, 0.5);

    this.promptContainer.add([bgPill, keyBox, keyText, labelText]);

    this.bounceTween = scene.tweens.add({
      targets: this.promptContainer,
      y: data.y - 36,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  public checkProximity(playerX: number, playerY: number): boolean {
    const dist = Phaser.Math.Distance.Between(playerX, playerY, this.x, this.y);
    const inside = dist <= 42;

    if (inside && !this.isPlayerNearby) {
      this.isPlayerNearby = true;
      this.promptContainer.setVisible(true);
    } else if (!inside && this.isPlayerNearby) {
      this.isPlayerNearby = false;
      this.promptContainer.setVisible(false);
    }

    return inside;
  }

  public isNearby(): boolean {
    return this.isPlayerNearby;
  }

  public triggerDialogue(): void {
    SoundFX.playBlip();
  }

  public destroy(fromScene?: boolean): void {
    if (this.bounceTween) this.bounceTween.stop();
    this.promptContainer.destroy();
    super.destroy(fromScene);
  }
}
