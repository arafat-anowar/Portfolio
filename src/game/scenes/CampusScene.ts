/**
 * CampusScene.ts
 * Main interactive 2D RPG Campus Map Scene for East West University (EWU).
 */

import * as Phaser from "phaser";
import { Player } from "../objects/Player";
import { BuildingZone } from "../objects/BuildingZone";
import { NPC, NPCData } from "../objects/NPC";
import { SoundFX } from "../utils/SoundFX";
import {
  generateCampusMap,
  BUILDINGS,
  INITIAL_PLAYER_SPAWN,
  MAP_COLS,
  MAP_ROWS,
  TILE_SIZE,
} from "../utils/MapData";
import { GameEventCallbacks, BuildingInfo } from "../types";

export class CampusScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  private interactKey!: Phaser.Input.Keyboard.Key;
  private mapKey!: Phaser.Input.Keyboard.Key;
  private escKey!: Phaser.Input.Keyboard.Key;

  private buildingZones: BuildingZone[] = [];
  private npcs: NPC[] = [];
  private activeNearbyBuilding: BuildingInfo | null = null;
  private activeNearbyNPC: NPC | null = null;
  private callbacks?: GameEventCallbacks;
  private obstaclesGroup!: Phaser.Physics.Arcade.StaticGroup;
  private isInputLocked = false;

  // Mobile / Virtual Controller Support
  private mobileVx = 0;
  private mobileVy = 0;

  constructor() {
    super("CampusScene");
  }

  public init(data: { callbacks?: GameEventCallbacks }): void {
    if (data && data.callbacks) {
      this.callbacks = data.callbacks;
    }
  }

  public setCallbacks(callbacks: GameEventCallbacks): void {
    this.callbacks = callbacks;
  }

  public lockControls(locked: boolean): void {
    this.isInputLocked = locked;
    if (this.player && this.player.body) {
      this.player.setVelocity(0, 0);
    }
  }

  public setMobileVelocity(vx: number, vy: number): void {
    this.mobileVx = vx;
    this.mobileVy = vy;
  }

  public create(): void {
    const { config, decorations } = generateCampusMap();
    const mapWidth = MAP_COLS * TILE_SIZE;
    const mapHeight = MAP_ROWS * TILE_SIZE;

    // Set World and Physics Boundaries
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // Create Tilemap and Layers
    const map = this.make.tilemap({
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
      width: MAP_COLS,
      height: MAP_ROWS,
    });
    const tileset = map.addTilesetImage("ewu_tiles", "ewu_tiles", TILE_SIZE, TILE_SIZE)!;

    // Layer 1: Ground Layer (Grass, Courtyard pavers, Road, Sidewalk)
    const groundLayer = map.createBlankLayer("ground", tileset)!;
    groundLayer.setDepth(0);
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (config.groundLayer[r][c] !== -1) {
          groundLayer.putTileAt(config.groundLayer[r][c], c, r);
        }
      }
    }

    // Layer 2: Walkways (Canopy floor, Colonnade stone floor, Planter curbs)
    const walkwayLayer = map.createBlankLayer("walkways", tileset)!;
    walkwayLayer.setDepth(1);
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (config.walkwayLayer[r][c] !== -1) {
          walkwayLayer.putTileAt(config.walkwayLayer[r][c], c, r);
        }
      }
    }

    // Layer 3: Building Walls & Facades
    const wallsLayer = map.createBlankLayer("walls", tileset)!;
    wallsLayer.setDepth(5);
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (config.wallsLayer[r][c] !== -1) {
          wallsLayer.putTileAt(config.wallsLayer[r][c], c, r);
        }
      }
    }

    // Layer 4: Roofs, Canopies, HVAC
    const roofLayer = map.createBlankLayer("roofs", tileset)!;
    roofLayer.setDepth(2000); // Always above player
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (config.roofLayer[r][c] !== -1) {
          roofLayer.putTileAt(config.roofLayer[r][c], c, r);
        }
      }
    }

    // Obstacles & Collision Bodies Group
    this.obstaclesGroup = this.physics.add.staticGroup();
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (config.collisionGrid[r][c]) {
          const colX = c * TILE_SIZE + TILE_SIZE / 2;
          const colY = r * TILE_SIZE + TILE_SIZE / 2;
          const obs = this.obstaclesGroup.create(colX, colY, undefined);
          obs.setSize(TILE_SIZE, TILE_SIZE);
          obs.setVisible(false);
          obs.refreshBody();
        }
      }
    }

    // Decorations (Trees, Street Lamps, Benches)
    decorations.forEach((dec) => {
      const sprite = this.add.sprite(dec.x, dec.y, dec.texture);
      sprite.setDepth(dec.y);
      if (dec.type === "lamp") {
        const lampGlow = this.add.circle(dec.x, dec.y + 16, 36, 0xffbe53, 0.14);
        lampGlow.setDepth(2);
      }
    });

    // Campus Architectural Title Signage (Above Main Gateway)
    const campusTitle = this.add.text(
      27 * TILE_SIZE,
      38 * TILE_SIZE - 12,
      "EAST WEST UNIVERSITY — AFTABNAGAR",
      {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "10px",
        color: "#f8fafc",
        backgroundColor: "#0f172a",
        padding: { x: 10, y: 6 },
      }
    ).setOrigin(0.5).setDepth(2500);
    campusTitle.setStroke("#0284c7", 2);

    // Interactive Building Trigger Zones
    this.buildingZones = BUILDINGS.map((b) => new BuildingZone(this, b));

    // Spawn Interactive Campus NPCs
    this.createNPCs();

    // Spawn Playable Character: Arafat
    this.player = new Player(this, INITIAL_PLAYER_SPAWN.x, INITIAL_PLAYER_SPAWN.y);

    // Physics Collider between Player and Obstacles
    this.physics.add.collider(this.player, this.obstaclesGroup);

    // Camera Setup & Follow
    const camera = this.cameras.main;
    camera.setBounds(0, 0, mapWidth, mapHeight);
    camera.startFollow(this.player, true, 0.08, 0.08);
    camera.setZoom(1.35);
    camera.setBackgroundColor("#060b19");

    // Atmospheric Nighttime Lighting Overlay
    this.createAtmosphere(mapWidth, mapHeight);

    // Keyboard Inputs Setup
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasdKeys = {
        w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
      this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.mapKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
      this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

      // Listen for E key press
      this.interactKey.on("down", () => {
        this.triggerInteraction();
      });
    }

    if (this.callbacks?.onGameReady) {
      this.callbacks.onGameReady();
    }
  }

  private createNPCs(): void {
    const npcConfigs: NPCData[] = [
      {
        id: "npc-prof",
        name: "Dr. Ahmed",
        role: "CSE Department Mentor",
        texture: "npc_professor",
        x: 16 * TILE_SIZE,
        y: 25 * TILE_SIZE,
        dialogue: [
          "Welcome to East West University, Aftabnagar campus!",
          "I've had the pleasure of observing Arafat's work in our Department of Computer Science & Engineering.",
          "His dedication to data structures, clean software design, and real-time interactive systems stands out.",
          "Step into Building A to view his academic profile, or explore Building B for his engineering repositories!",
        ],
      },
      {
        id: "npc-student",
        name: "Tahmid",
        role: "Student Developer",
        texture: "npc_student",
        x: 27 * TILE_SIZE,
        y: 25 * TILE_SIZE,
        dialogue: [
          "Hey there, explorer! Welcome to the EWU Central Plaza.",
          "Arafat and our university team built real-time platforms that took 1st prize at the EWU Tech Carnival hackathon!",
          "Make sure to visit Building C to check out his hackathon trophies and competitive programming milestones.",
        ],
      },
      {
        id: "npc-guard",
        name: "Officer Farhan",
        role: "Campus Guide",
        texture: "npc_guard",
        x: 24 * TILE_SIZE,
        y: 38 * TILE_SIZE,
        dialogue: [
          "Greetings! Welcome to Arafat's Dev World.",
          "You can navigate around the campus using WASD, Arrow keys, or the on-screen controls on mobile.",
          "Whenever you approach a building, press [E] to step inside and view that section of Arafat's portfolio!",
          "Need direct recruiter access without playing? Click 'RECRUITER MODE' on the top bar anytime.",
        ],
      },
    ];

    this.npcs = npcConfigs.map((data) => new NPC(this, data));
  }

  public triggerInteraction(): void {
    if (this.isInputLocked) return;

    if (this.activeNearbyNPC && this.callbacks?.onNPCInteract) {
      this.activeNearbyNPC.triggerDialogue();
      this.callbacks.onNPCInteract({
        name: this.activeNearbyNPC.dataInfo.name,
        role: this.activeNearbyNPC.dataInfo.role,
        dialogue: this.activeNearbyNPC.dataInfo.dialogue,
      });
      return;
    }

    if (this.activeNearbyBuilding && this.callbacks?.onBuildingEnter) {
      SoundFX.playDoorOpen();
      this.callbacks.onBuildingEnter(this.activeNearbyBuilding);
    }
  }

  private createAtmosphere(width: number, height: number): void {
    const ambient = this.add.rectangle(
      width / 2,
      height / 2,
      width,
      height,
      0x050a18,
      0.22
    );
    ambient.setDepth(1500);
    ambient.setScrollFactor(1);
  }

  public update(): void {
    if (!this.player) return;

    if (!this.isInputLocked) {
      if (this.mobileVx !== 0 || this.mobileVy !== 0) {
        // Mobile / Touch virtual input
        this.player.setVelocity(this.mobileVx, this.mobileVy);
        const dir =
          Math.abs(this.mobileVx) > Math.abs(this.mobileVy)
            ? this.mobileVx > 0
              ? "right"
              : "left"
            : this.mobileVy > 0
            ? "down"
            : "up";
        this.player.anims.play(`player-walk-${dir}`, true);
        this.player.setDepth(this.player.y);
      } else if (this.cursors && this.wasdKeys) {
        this.player.update(this.cursors, this.wasdKeys);
      } else {
        this.player.setVelocity(0, 0);
      }
    } else {
      this.player.setVelocity(0, 0);
    }

    // Check Proximity to NPCs
    let foundNPC: NPC | null = null;
    for (const npc of this.npcs) {
      if (npc.checkProximity(this.player.x, this.player.y)) {
        foundNPC = npc;
        break;
      }
    }
    this.activeNearbyNPC = foundNPC;

    // Check Proximity to Buildings
    let foundBuilding: BuildingInfo | null = null;
    for (const zone of this.buildingZones) {
      if (zone.checkProximity(this.player.x, this.player.y)) {
        foundBuilding = zone.building;
        break;
      }
    }

    if (foundBuilding !== this.activeNearbyBuilding) {
      this.activeNearbyBuilding = foundBuilding;
      if (!foundBuilding && this.callbacks?.onBuildingLeave) {
        this.callbacks.onBuildingLeave();
      }
    }

    // Notify React of Player Position for MiniMap & HUD
    if (this.callbacks?.onPlayerMove) {
      this.callbacks.onPlayerMove({
        x: Math.round(this.player.x),
        y: Math.round(this.player.y),
        direction: this.player.getDirection(),
      });
    }
  }

  public getPlayer(): Player {
    return this.player;
  }

  public teleportPlayer(x: number, y: number): void {
    if (this.player) {
      SoundFX.playTeleport();
      this.player.setPosition(x, y);
    }
  }
}
