/**
 * Player.ts
 * Playable Character: Arafat
 * Handles smooth movement, direction, 16-bit animations, and collision.
 */

import * as Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  public speed = 160;
  private currentDirection: "down" | "up" | "left" | "right" = "down";
  private isMoving = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player_arafat", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Precise physics hitbox for top-down collision (feet only for depth realism)
    this.setSize(18, 12);
    this.setOffset(7, 20);
    this.setCollideWorldBounds(true);
    this.setDepth(10); // Above floor, behind roofs/tall objects
  }

  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, wasdKeys: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  }): void {
    if (!this.body) return;

    let vx = 0;
    let vy = 0;

    const left = cursors.left.isDown || wasdKeys.a.isDown;
    const right = cursors.right.isDown || wasdKeys.d.isDown;
    const up = cursors.up.isDown || wasdKeys.w.isDown;
    const down = cursors.down.isDown || wasdKeys.s.isDown;

    if (left) {
      vx = -this.speed;
      this.currentDirection = "left";
    } else if (right) {
      vx = this.speed;
      this.currentDirection = "right";
    }

    if (up) {
      vy = -this.speed;
      this.currentDirection = "up";
    } else if (down) {
      vy = this.speed;
      this.currentDirection = "down";
    }

    // Normalize diagonal speed
    if (vx !== 0 && vy !== 0) {
      const normalizer = Math.SQRT1_2;
      vx *= normalizer;
      vy *= normalizer;
    }

    this.setVelocity(vx, vy);

    this.isMoving = vx !== 0 || vy !== 0;

    if (this.isMoving) {
      this.anims.play(`player-walk-${this.currentDirection}`, true);
    } else {
      this.anims.play(`player-idle-${this.currentDirection}`, true);
    }

    // Dynamic depth sorting based on Y coordinate
    this.setDepth(this.y);
  }

  public getDirection(): "down" | "up" | "left" | "right" {
    return this.currentDirection;
  }
}
