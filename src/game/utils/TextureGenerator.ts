/**
 * TextureGenerator.ts
 * Procedural 16-bit Pixel Art Generator for East West University (EWU) Campus.
 * Creates bespoke, authentic textures directly using HTML5 Canvas API in Phaser 3.
 */

export class TextureGenerator {
  public static readonly TILE_SIZE = 32;

  /**
   * Generates all required textures and registers them with Phaser's TextureManager
   */
  public static generateAll(scene: Phaser.Scene): void {
    this.createTileset(scene);
    this.createPlayerSpritesheet(scene);
    this.createNPCSprites(scene);
    this.createDecorations(scene);
    this.createUIElements(scene);
  }

  /**
   * Creates the primary EWU campus tileset (32x32 tiles)
   */
  private static createTileset(scene: Phaser.Scene): void {
    const tileSize = this.TILE_SIZE;
    const cols = 8;
    const rows = 4;
    const canvas = document.createElement("canvas");
    canvas.width = cols * tileSize;
    canvas.height = rows * tileSize;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    // Helper to get tile rect
    const getRect = (index: number) => ({
      x: (index % cols) * tileSize,
      y: Math.floor(index / cols) * tileSize,
      w: tileSize,
      h: tileSize,
    });

    // 0: Dark Void / Night Perimeter
    let r = getRect(0);
    ctx.fillStyle = "#070c1a";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // Subtle star specs
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x + 4, r.y + 7, 2, 2);
    ctx.fillRect(r.x + 22, r.y + 19, 2, 2);

    // 1: Exterior Grass / Lawn
    r = getRect(1);
    ctx.fillStyle = "#112a1d";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#1b4330";
    ctx.fillRect(r.x + 6, r.y + 8, 3, 4);
    ctx.fillRect(r.x + 18, r.y + 20, 3, 4);
    ctx.fillStyle = "#2d6a4f";
    ctx.fillRect(r.x + 7, r.y + 6, 2, 3);
    ctx.fillRect(r.x + 19, r.y + 18, 2, 3);

    // 2: Road / Dark Pavement
    r = getRect(2);
    ctx.fillStyle = "#1e2433";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#161b26";
    ctx.fillRect(r.x, r.y, r.w, 2);
    ctx.fillRect(r.x, r.y + r.h - 2, r.w, 2);

    // 3: Sidewalk / Concrete
    r = getRect(3);
    ctx.fillStyle = "#3b4758";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#4a596e";
    ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    ctx.fillStyle = "#2c3644";
    ctx.fillRect(r.x, r.y, r.w, 1);
    ctx.fillRect(r.x, r.y, 1, r.h);

    // 4: Courtyard Brick Tile (EWU signature reddish-terracotta pavers)
    r = getRect(4);
    ctx.fillStyle = "#4a1811"; // Mortar base
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // 2x2 paver stones within the 32x32 tile
    const half = 15;
    const drawPaver = (px: number, py: number, baseColor: string, hiColor: string) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(px, py, half, half);
      ctx.fillStyle = hiColor;
      ctx.fillRect(px, py, half, 1);
      ctx.fillRect(px, py, 1, half);
      ctx.fillStyle = "#3d130d"; // shadow edge
      ctx.fillRect(px, py + half - 1, half, 1);
      ctx.fillRect(px + half - 1, py, 1, half);
    };
    drawPaver(r.x + 1, r.y + 1, "#993729", "#b54434");
    drawPaver(r.x + 16, r.y + 1, "#8e3225", "#ab3e2f");
    drawPaver(r.x + 1, r.y + 16, "#933527", "#b04232");
    drawPaver(r.x + 16, r.y + 16, "#9e3a2b", "#ba4737");

    // 5: Courtyard Accent Tile (Grid intersection pattern from EWU blueprint)
    r = getRect(5);
    ctx.fillStyle = "#3d130d"; // Darker border mortar
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#7c2a1e";
    ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    // Inlaid decorative diamond / square motif
    ctx.fillStyle = "#b54637";
    ctx.fillRect(r.x + 8, r.y + 8, 16, 16);
    ctx.fillStyle = "#d15848";
    ctx.fillRect(r.x + 12, r.y + 12, 8, 8);
    ctx.fillStyle = "#5c1e15";
    ctx.fillRect(r.x + 14, r.y + 14, 4, 4);

    // 6: Glass Canopy Walkway Floor (Left side - Building A)
    r = getRect(6);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#334155";
    ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    // Subtle cyan floor light strip reflecting canopy
    ctx.fillStyle = "rgba(45, 212, 191, 0.4)";
    ctx.fillRect(r.x + 14, r.y + 2, 4, r.h - 4);
    ctx.fillStyle = "#5eead4";
    ctx.fillRect(r.x + 15, r.y + 14, 2, 4);

    // 7: Covered Colonnade Walkway Floor (Right side - Building C)
    r = getRect(7);
    ctx.fillStyle = "#292524";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#44403c";
    ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    // Warm downlight pool
    ctx.fillStyle = "rgba(255, 190, 83, 0.25)";
    ctx.beginPath();
    ctx.arc(r.x + 16, r.y + 16, 12, 0, Math.PI * 2);
    ctx.fill();

    // 8: Red Brick Building Wall (Solid Facade)
    r = getRect(8);
    ctx.fillStyle = "#3f130d"; // Mortar
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // 4 courses of bricks
    for (let row = 0; row < 4; row++) {
      const by = r.y + row * 8;
      const offset = (row % 2) * 8;
      for (let col = -1; col < 3; col++) {
        const bx = r.x + col * 16 + offset;
        ctx.fillStyle = (row + col) % 2 === 0 ? "#9c382b" : "#893023";
        ctx.fillRect(Math.max(r.x, bx + 1), by + 1, 14, 6);
        // Brick highlight
        ctx.fillStyle = "#b84737";
        ctx.fillRect(Math.max(r.x, bx + 1), by + 1, 14, 1);
      }
    }

    // 9: Shadowed / Lower Foundation Brick Wall
    r = getRect(9);
    ctx.fillStyle = "#2b0d09";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    for (let row = 0; row < 4; row++) {
      const by = r.y + row * 8;
      const offset = (row % 2) * 8;
      for (let col = -1; col < 3; col++) {
        const bx = r.x + col * 16 + offset;
        ctx.fillStyle = (row + col) % 2 === 0 ? "#6b261d" : "#591e16";
        ctx.fillRect(Math.max(r.x, bx + 1), by + 1, 14, 6);
      }
    }

    // 10: Brick Wall with Dark Window
    r = getRect(10);
    // Draw brick background
    ctx.fillStyle = "#3f130d";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#893023";
    ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    // Window Sill & Frame
    ctx.fillStyle = "#27272a";
    ctx.fillRect(r.x + 6, r.y + 6, 20, 20);
    // Window Glass (Night tint with reflection)
    ctx.fillStyle = "#091224";
    ctx.fillRect(r.x + 8, r.y + 8, 16, 16);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x + 15, r.y + 8, 2, 16);
    ctx.fillRect(r.x + 8, r.y + 15, 16, 2);
    // Diagonal glass reflection
    ctx.fillStyle = "rgba(148, 163, 184, 0.2)";
    ctx.beginPath();
    ctx.moveTo(r.x + 8, r.y + 8);
    ctx.lineTo(r.x + 14, r.y + 8);
    ctx.lineTo(r.x + 8, r.y + 14);
    ctx.fill();

    // 11: Brick Wall with Warm Lit Window (Signature EWU Nighttime Feature)
    r = getRect(11);
    ctx.fillStyle = "#3f130d";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#893023";
    ctx.fillRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    // Window Frame
    ctx.fillStyle = "#3f2008";
    ctx.fillRect(r.x + 6, r.y + 6, 20, 20);
    // Lit Golden Glass
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(r.x + 8, r.y + 8, 16, 16);
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(r.x + 10, r.y + 10, 12, 12);
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(r.x + 13, r.y + 12, 6, 6);
    // Window mullions
    ctx.fillStyle = "#92400e";
    ctx.fillRect(r.x + 15, r.y + 8, 2, 16);
    ctx.fillRect(r.x + 8, r.y + 15, 16, 2);

    // 12: Ground Floor Open Colonnade / Hallway Opening
    r = getRect(12);
    ctx.fillStyle = "#1c1917"; // Recessed dark hallway
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // Warm interior illumination
    ctx.fillStyle = "#b45309";
    ctx.fillRect(r.x + 4, r.y + 2, 24, 8);
    ctx.fillStyle = "#fde047";
    ctx.fillRect(r.x + 12, r.y + 4, 8, 3);
    // Colonnade arch lintel top
    ctx.fillStyle = "#78350f";
    ctx.fillRect(r.x, r.y, r.w, 3);

    // 13: Roof Coping Edge (Parapet border)
    r = getRect(13);
    ctx.fillStyle = "#e2e8f0"; // Bright concrete edge
    ctx.fillRect(r.x, r.y, r.w, 8);
    ctx.fillStyle = "#94a3b8"; // Bevel shadow
    ctx.fillRect(r.x, r.y + 8, r.w, 4);
    ctx.fillStyle = "#475569"; // Drop shadow on wall below
    ctx.fillRect(r.x, r.y + 12, r.w, 4);
    // Brick wall peek below
    ctx.fillStyle = "#893023";
    ctx.fillRect(r.x, r.y + 16, r.w, 16);

    // 14: Roof Surface / Concrete Gravel
    r = getRect(14);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#334155";
    ctx.fillRect(r.x + 4, r.y + 5, 4, 4);
    ctx.fillRect(r.x + 20, r.y + 18, 4, 4);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(r.x + 12, r.y + 12, 3, 3);

    // 15: Rooftop HVAC / Machinery
    r = getRect(15);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#475569";
    ctx.fillRect(r.x + 4, r.y + 4, 24, 24);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(r.x + 6, r.y + 6, 20, 20);
    // Fan louvers
    ctx.fillStyle = "#0f172a";
    for (let l = 0; l < 4; l++) {
      ctx.fillRect(r.x + 8, r.y + 9 + l * 4, 16, 2);
    }

    // 16: Colonnade Column (Building C Walkway)
    r = getRect(16);
    ctx.fillStyle = "transparent";
    ctx.clearRect(r.x, r.y, r.w, r.h);
    // Capital top
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(r.x + 8, r.y + 2, 16, 4);
    // Column shaft
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(r.x + 10, r.y + 6, 12, 20);
    ctx.fillStyle = "#f1f5f9"; // highlight edge
    ctx.fillRect(r.x + 10, r.y + 6, 3, 20);
    ctx.fillStyle = "#64748b"; // shadow side
    ctx.fillRect(r.x + 19, r.y + 6, 3, 20);
    // Base plinth
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(r.x + 8, r.y + 26, 16, 5);

    // 17: Glass Canopy Beam / Steel Frame (Building A Walkway)
    r = getRect(17);
    ctx.fillStyle = "transparent";
    ctx.clearRect(r.x, r.y, r.w, r.h);
    // Translucent glass panel
    ctx.fillStyle = "rgba(45, 212, 191, 0.45)";
    ctx.fillRect(r.x + 2, r.y + 2, 28, 28);
    // Glass glint line
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillRect(r.x + 4, r.y + 4, 24, 2);
    // Steel cross beams
    ctx.fillStyle = "#334155";
    ctx.fillRect(r.x, r.y + 14, 32, 4);
    ctx.fillRect(r.x + 14, r.y, 4, 32);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(r.x, r.y + 14, 32, 1);
    ctx.fillRect(r.x + 14, r.y, 1, 32);

    // 18: Planter Border & Rich Soil (EWU 4-Courtyard Planters)
    r = getRect(18);
    ctx.fillStyle = "#475569"; // Stone retaining wall
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x + 3, r.y + 3, 26, 26);
    // Dark mulch / fertile garden earth
    ctx.fillStyle = "#271c19";
    ctx.fillRect(r.x + 4, r.y + 4, 24, 24);

    // 19: Planter Shrubbery / Hedge
    r = getRect(19);
    ctx.fillStyle = "#271c19";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // Dense foliage
    ctx.fillStyle = "#166534";
    ctx.beginPath();
    ctx.arc(r.x + 16, r.y + 16, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(r.x + 14, r.y + 13, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(r.x + 12, r.y + 11, 4, 4);

    // 20: Door A (Building A - About & Education)
    r = getRect(20);
    this.drawDoorTile(ctx, r, "#06b6d4", "A");

    // 21: Door B (Building B - Projects & Skills)
    r = getRect(21);
    this.drawDoorTile(ctx, r, "#f59e0b", "B");

    // 22: Door C (Building C - Achievements & Journey)
    r = getRect(22);
    this.drawDoorTile(ctx, r, "#a855f7", "C");

    // 23: Main Entrance Gate (Contact & Social)
    r = getRect(23);
    this.drawDoorTile(ctx, r, "#10b981", "EWU");

    // Register with Phaser texture manager
    if (scene.textures.exists("ewu_tiles")) {
      scene.textures.remove("ewu_tiles");
    }
    scene.textures.addSpriteSheet("ewu_tiles", canvas as unknown as HTMLImageElement, {
      frameWidth: tileSize,
      frameHeight: tileSize,
    });
  }

  private static drawDoorTile(
    ctx: CanvasRenderingContext2D,
    r: { x: number; y: number; w: number; h: number },
    accentColor: string,
    label: string
  ): void {
    // Archway frame
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // Glowing door portal
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(r.x + 4, r.y + 4, 24, 28);
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.35;
    ctx.fillRect(r.x + 6, r.y + 6, 20, 26);
    ctx.globalAlpha = 1.0;
    // Door border glow
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(r.x + 5, r.y + 5, 22, 27);
    // Label
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, r.x + 16, r.y + 18);
  }

  /**
   * Creates 16-bit Player Spritesheet for Arafat
   * 4 directions (Down, Left, Right, Up), 4 frames each
   */
  private static createPlayerSpritesheet(scene: Phaser.Scene): void {
    const frameW = 32;
    const frameH = 32;
    const cols = 4; // Idle, Step 1, Idle 2, Step 2
    const rows = 4; // 0: Down, 1: Left, 2: Right, 3: Up

    const canvas = document.createElement("canvas");
    canvas.width = cols * frameW;
    canvas.height = rows * frameH;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    for (let dir = 0; dir < rows; dir++) {
      for (let step = 0; step < cols; step++) {
        const ox = step * frameW;
        const oy = dir * frameH;
        this.drawPlayerFrame(ctx, ox, oy, dir, step);
      }
    }

    if (scene.textures.exists("player_arafat")) {
      scene.textures.remove("player_arafat");
    }
    scene.textures.addSpriteSheet("player_arafat", canvas as unknown as HTMLImageElement, {
      frameWidth: frameW,
      frameHeight: frameH,
    });
  }

  private static drawPlayerFrame(
    ctx: CanvasRenderingContext2D,
    ox: number,
    oy: number,
    dir: number, // 0: Down, 1: Left, 2: Right, 3: Up
    step: number // 0, 1, 2, 3
  ): void {
    const isStep1 = step === 1;
    const isStep2 = step === 3;
    const legOffset = isStep1 ? -2 : isStep2 ? 2 : 0;
    const bob = isStep1 || isStep2 ? -1 : 0;

    // Shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.ellipse(ox + 16, oy + 29, 7, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shoes / Feet
    ctx.fillStyle = "#f8fafc"; // White stylish sneakers
    if (dir === 0) {
      // Down
      ctx.fillRect(ox + 11, oy + 26 + (isStep1 ? -1 : 0), 4, 3);
      ctx.fillRect(ox + 17, oy + 26 + (isStep2 ? -1 : 0), 4, 3);
    } else if (dir === 1) {
      // Left
      ctx.fillRect(ox + 12 + legOffset, oy + 26, 6, 3);
    } else if (dir === 2) {
      // Right
      ctx.fillRect(ox + 14 - legOffset, oy + 26, 6, 3);
    } else {
      // Up
      ctx.fillRect(ox + 11, oy + 26 + (isStep1 ? -1 : 0), 4, 3);
      ctx.fillRect(ox + 17, oy + 26 + (isStep2 ? -1 : 0), 4, 3);
    }

    // Legs / Pants (Dark Navy Jeans)
    ctx.fillStyle = "#1e293b";
    if (dir === 0 || dir === 3) {
      ctx.fillRect(ox + 11, oy + 20 + bob, 4, 6);
      ctx.fillRect(ox + 17, oy + 20 + bob, 4, 6);
    } else {
      ctx.fillRect(ox + 13, oy + 20 + bob, 6, 6);
    }

    // Torso / Jacket (Cool Charcoal Dev Jacket with Red Brick Accent)
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(ox + 10, oy + 12 + bob, 12, 9);
    // Brick red inner tee
    ctx.fillStyle = "#a33a2a";
    if (dir === 0) {
      ctx.fillRect(ox + 15, oy + 12 + bob, 2, 7);
    }

    // Arms
    ctx.fillStyle = "#1e293b";
    if (dir === 0) {
      ctx.fillRect(ox + 8, oy + 13 + bob - legOffset, 2, 7);
      ctx.fillRect(ox + 22, oy + 13 + bob + legOffset, 2, 7);
      // Hands (skin tone)
      ctx.fillStyle = "#fbcfe8";
      ctx.fillRect(ox + 8, oy + 20 + bob - legOffset, 2, 2);
      ctx.fillRect(ox + 22, oy + 20 + bob + legOffset, 2, 2);
    } else if (dir === 1) {
      // Left
      ctx.fillRect(ox + 13 + legOffset, oy + 14 + bob, 4, 7);
    } else if (dir === 2) {
      // Right
      ctx.fillRect(ox + 15 - legOffset, oy + 14 + bob, 4, 7);
    } else {
      // Up
      ctx.fillRect(ox + 8, oy + 13 + bob, 2, 7);
      ctx.fillRect(ox + 22, oy + 13 + bob, 2, 7);
      // Backpack on back
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(ox + 12, oy + 13 + bob, 8, 7);
    }

    // Head / Face
    ctx.fillStyle = "#fbcfe8"; // Skin tone
    ctx.fillRect(ox + 11, oy + 5 + bob, 10, 8);

    // Hair (Stylized modern dark hair)
    ctx.fillStyle = "#1c1917";
    ctx.fillRect(ox + 10, oy + 3 + bob, 12, 5);
    ctx.fillRect(ox + 9, oy + 5 + bob, 3, 4);
    ctx.fillRect(ox + 20, oy + 5 + bob, 3, 4);

    // Eyes / Glasses (Front/Side)
    if (dir === 0) {
      // Front
      ctx.fillStyle = "#38bdf8"; // Developer smart glasses / eyes
      ctx.fillRect(ox + 12, oy + 8 + bob, 3, 2);
      ctx.fillRect(ox + 17, oy + 8 + bob, 3, 2);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(ox + 13, oy + 8 + bob, 1, 1);
      ctx.fillRect(ox + 18, oy + 8 + bob, 1, 1);
    } else if (dir === 1) {
      // Left
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(ox + 11, oy + 8 + bob, 3, 2);
    } else if (dir === 2) {
      // Right
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(ox + 18, oy + 8 + bob, 3, 2);
    }
  }

  /**
   * Creates Decorative Objects (Trees, street lamps, benches, signs)
   */
  private static createDecorations(scene: Phaser.Scene): void {
    // 1. Campus Tree (64x64)
    const treeCanvas = document.createElement("canvas");
    treeCanvas.width = 64;
    treeCanvas.height = 64;
    const tCtx = treeCanvas.getContext("2d")!;
    tCtx.imageSmoothingEnabled = false;

    // Shadow
    tCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
    tCtx.beginPath();
    tCtx.ellipse(32, 58, 22, 6, 0, 0, Math.PI * 2);
    tCtx.fill();

    // Trunk
    tCtx.fillStyle = "#451a03";
    tCtx.fillRect(28, 40, 8, 18);
    tCtx.fillStyle = "#78350f";
    tCtx.fillRect(30, 40, 4, 18);

    // Foliage layers (Nighttime lush green)
    const drawFoliage = (x: number, y: number, r: number, c1: string, c2: string) => {
      tCtx.fillStyle = c1;
      tCtx.beginPath();
      tCtx.arc(x, y, r, 0, Math.PI * 2);
      tCtx.fill();
      tCtx.fillStyle = c2;
      tCtx.beginPath();
      tCtx.arc(x - 2, y - 3, r * 0.7, 0, Math.PI * 2);
      tCtx.fill();
    };

    drawFoliage(32, 28, 22, "#14532d", "#166534");
    drawFoliage(24, 22, 16, "#15803d", "#22c55e");
    drawFoliage(40, 22, 16, "#15803d", "#22c55e");
    drawFoliage(32, 14, 14, "#22c55e", "#4ade80");

    if (scene.textures.exists("tree_campus")) {
      scene.textures.remove("tree_campus");
    }
    scene.textures.addCanvas("tree_campus", treeCanvas);

    // 2. Street Lamp (32x64) with warm amber glow
    const lampCanvas = document.createElement("canvas");
    lampCanvas.width = 32;
    lampCanvas.height = 64;
    const lCtx = lampCanvas.getContext("2d")!;
    lCtx.imageSmoothingEnabled = false;

    // Lamp post
    lCtx.fillStyle = "#1e293b";
    lCtx.fillRect(14, 20, 4, 42);
    lCtx.fillStyle = "#334155";
    lCtx.fillRect(15, 20, 2, 42);
    // Base plinth
    lCtx.fillStyle = "#0f172a";
    lCtx.fillRect(11, 58, 10, 6);

    // Lantern fixture
    lCtx.fillStyle = "#0f172a";
    lCtx.fillRect(10, 12, 12, 3);
    lCtx.fillRect(9, 6, 14, 4);

    // Glowing lantern glass
    lCtx.fillStyle = "#ffbe53";
    lCtx.fillRect(11, 10, 10, 9);
    lCtx.fillStyle = "#fffbeb";
    lCtx.fillRect(13, 12, 6, 5);

    if (scene.textures.exists("lamp_post")) {
      scene.textures.remove("lamp_post");
    }
    scene.textures.addCanvas("lamp_post", lampCanvas);

    // 3. Wooden Campus Bench (32x32)
    const benchCanvas = document.createElement("canvas");
    benchCanvas.width = 32;
    benchCanvas.height = 32;
    const bCtx = benchCanvas.getContext("2d")!;
    bCtx.imageSmoothingEnabled = false;

    // Iron frame
    bCtx.fillStyle = "#1e293b";
    bCtx.fillRect(4, 12, 3, 16);
    bCtx.fillRect(25, 12, 3, 16);
    // Slats
    bCtx.fillStyle = "#9a3412";
    bCtx.fillRect(2, 12, 28, 4);
    bCtx.fillRect(2, 18, 28, 4);
    bCtx.fillStyle = "#ea580c";
    bCtx.fillRect(2, 12, 28, 1);
    bCtx.fillRect(2, 18, 28, 1);

    if (scene.textures.exists("campus_bench")) {
      scene.textures.remove("campus_bench");
    }
    scene.textures.addCanvas("campus_bench", benchCanvas);
  }

  /**
   * Creates Interactive UI Elements (Interaction markers, pulsing prompts)
   */
  private static createUIElements(scene: Phaser.Scene): void {
    // 1. Interaction Marker / Key Badge (32x32)
    const markerCanvas = document.createElement("canvas");
    markerCanvas.width = 32;
    markerCanvas.height = 32;
    const mCtx = markerCanvas.getContext("2d")!;
    mCtx.imageSmoothingEnabled = false;

    // Retro rounded key cap
    mCtx.fillStyle = "rgba(15, 23, 42, 0.9)";
    mCtx.fillRect(4, 4, 24, 24);
    mCtx.strokeStyle = "#ffbe53";
    mCtx.lineWidth = 2;
    mCtx.strokeRect(4, 4, 24, 24);

    // Golden "E" key
    mCtx.fillStyle = "#ffbe53";
    mCtx.font = "bold 14px monospace";
    mCtx.textAlign = "center";
    mCtx.textBaseline = "middle";
    mCtx.fillText("E", 16, 16);

    if (scene.textures.exists("key_prompt_e")) {
      scene.textures.remove("key_prompt_e");
    }
    scene.textures.addCanvas("key_prompt_e", markerCanvas);
  }

  /**
   * Generates NPC Character Textures
   */
  private static createNPCSprites(scene: Phaser.Scene): void {
    const drawSimpleNPC = (
      key: string,
      hairColor: string,
      coatColor: string,
      innerColor: string,
      pantColor: string
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;

      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.beginPath();
      ctx.ellipse(16, 29, 6, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shoes
      ctx.fillStyle = "#334155";
      ctx.fillRect(11, 26, 4, 3);
      ctx.fillRect(17, 26, 4, 3);

      // Pants
      ctx.fillStyle = pantColor;
      ctx.fillRect(11, 20, 4, 6);
      ctx.fillRect(17, 20, 4, 6);

      // Coat / Body
      ctx.fillStyle = coatColor;
      ctx.fillRect(10, 12, 12, 9);
      ctx.fillStyle = innerColor;
      ctx.fillRect(15, 12, 2, 7);

      // Hands
      ctx.fillStyle = "#fbcfe8";
      ctx.fillRect(8, 14, 2, 6);
      ctx.fillRect(22, 14, 2, 6);

      // Face
      ctx.fillStyle = "#fbcfe8";
      ctx.fillRect(11, 5, 10, 8);

      // Hair
      ctx.fillStyle = hairColor;
      ctx.fillRect(10, 3, 12, 5);
      ctx.fillRect(9, 5, 2, 4);
      ctx.fillRect(21, 5, 2, 4);

      // Glasses / Eyes
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(13, 8, 2, 2);
      ctx.fillRect(18, 8, 2, 2);

      if (scene.textures.exists(key)) {
        scene.textures.remove(key);
      }
      scene.textures.addCanvas(key, canvas);
    };

    // Professor (Grey hair, brown tweed coat, beige pants)
    drawSimpleNPC("npc_professor", "#94a3b8", "#78350f", "#fef3c7", "#475569");
    // Fellow Student (Casual green hoodie, black jeans)
    drawSimpleNPC("npc_student", "#1c1917", "#15803d", "#ffffff", "#0f172a");
    // Campus Security (Dark navy blazer, white shirt, grey trousers)
    drawSimpleNPC("npc_guard", "#292524", "#1e3a8a", "#f8fafc", "#334155");
  }
}
