/**
 * BuildingZone.ts
 * Interactive Building Trigger Zones with visual floating prompts & pulsing indicators
 */

import * as Phaser from "phaser";
import { BuildingInfo } from "../types";

export class BuildingZone {
  public building: BuildingInfo;
  private scene: Phaser.Scene;
  private promptContainer: Phaser.GameObjects.Container;
  private isPlayerInside = false;
  private glowCircle: Phaser.GameObjects.Arc;
  private tweenAnim?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, building: BuildingInfo) {
    this.scene = scene;
    this.building = building;

    // Glowing ground circle indicator
    this.glowCircle = scene.add.circle(
      building.doorX,
      building.doorY,
      28,
      Phaser.Display.Color.HexStringToColor(building.color).color,
      0.22
    );
    this.glowCircle.setStrokeStyle(
      2,
      Phaser.Display.Color.HexStringToColor(building.color).color,
      0.8
    );
    this.glowCircle.setDepth(2);

    // Floating Interaction Prompt Container
    this.promptContainer = scene.add.container(building.doorX, building.doorY - 36);
    this.promptContainer.setDepth(9999);
    this.promptContainer.setVisible(false);

    // Background pill badge
    const bgPill = scene.add.rectangle(0, 0, 110, 26, 0x090f1f, 0.92);
    bgPill.setStrokeStyle(1.5, Phaser.Display.Color.HexStringToColor(building.color).color);

    // Key badge icon [E]
    const keyBox = scene.add.rectangle(-40, 0, 18, 18, 0x1e293b);
    keyBox.setStrokeStyle(1, 0xffbe53);
    const keyText = scene.add.text(-40, 0, "E", {
      fontFamily: "monospace",
      fontSize: "11px",
      color: "#ffbe53",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Prompt Action text
    const labelText = scene.add.text(-26, 0, "ENTER", {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: "8px",
      color: "#ffffff",
    }).setOrigin(0, 0.5);

    this.promptContainer.add([bgPill, keyBox, keyText, labelText]);

    // Floating bob animation
    this.tweenAnim = scene.tweens.add({
      targets: this.promptContainer,
      y: building.doorY - 42,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // Pulsing glow circle animation
    scene.tweens.add({
      targets: this.glowCircle,
      scaleX: 1.15,
      scaleY: 1.15,
      alpha: 0.12,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  public checkProximity(playerX: number, playerY: number): boolean {
    const dist = Phaser.Math.Distance.Between(
      playerX,
      playerY,
      this.building.doorX,
      this.building.doorY
    );
    const inside = dist <= this.building.triggerRadius;

    if (inside && !this.isPlayerInside) {
      this.isPlayerInside = true;
      this.promptContainer.setVisible(true);
    } else if (!inside && this.isPlayerInside) {
      this.isPlayerInside = false;
      this.promptContainer.setVisible(false);
    }

    return inside;
  }

  public isPromptActive(): boolean {
    return this.isPlayerInside;
  }

  public destroy(): void {
    if (this.tweenAnim) this.tweenAnim.stop();
    this.glowCircle.destroy();
    this.promptContainer.destroy();
  }
}
