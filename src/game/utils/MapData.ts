/**
 * MapData.ts
 * East West University (EWU) Campus Map Layout
 * Mapped to the architectural blueprint of EWU Aftabnagar campus.
 */

import { BuildingInfo } from "../types";

export interface MapConfig {
  cols: number;
  rows: number;
  tileSize: number;
  groundLayer: number[][];
  walkwayLayer: number[][];
  wallsLayer: number[][];
  roofLayer: number[][];
  collisionGrid: boolean[][];
}

export interface MapDecoration {
  x: number;
  y: number;
  texture: string;
  type: "tree" | "lamp" | "bench" | "sign";
}

export const MAP_COLS = 54;
export const MAP_ROWS = 44;
export const TILE_SIZE = 32;

// Tile indices corresponding to TextureGenerator.ts:
export const TILES = {
  EMPTY: 0,
  GRASS: 1,
  ROAD: 2,
  SIDEWALK: 3,
  COURTYARD: 4,
  COURTYARD_ACCENT: 5,
  WALKWAY_CANOPY: 6,
  WALKWAY_COLONNADE: 7,
  WALL_BRICK: 8,
  WALL_BRICK_DARK: 9,
  WALL_WINDOW_DARK: 10,
  WALL_WINDOW_LIT: 11,
  WALL_COLONNADE_OPEN: 12,
  ROOF_COPING: 13,
  ROOF_SURFACE: 14,
  ROOF_HVAC: 15,
  COLUMN_BASE: 16,
  CANOPY_FRAME: 17,
  PLANTER_CURB: 18,
  PLANTER_GREEN: 19,
  DOOR_A: 20,
  DOOR_B: 21,
  DOOR_C: 22,
  DOOR_MAIN: 23,
};

export const BUILDINGS: BuildingInfo[] = [
  {
    id: "building-a",
    name: "Building A",
    code: "BLDG-A",
    subtitle: "West Wing (10 Floors)",
    description: "About Me, Academic Foundation & Software Philosophy",
    icon: "GraduationCap",
    doorX: 13 * TILE_SIZE + 16,
    doorY: 25 * TILE_SIZE + 16,
    triggerRadius: 48,
    color: "#06b6d4",
  },
  {
    id: "building-b",
    name: "Building B",
    code: "BLDG-B",
    subtitle: "Main Central Complex (10 Floors)",
    description: "Featured Projects, Technical Skills & Engineering Stack",
    icon: "Code2",
    doorX: 27 * TILE_SIZE,
    doorY: 15 * TILE_SIZE + 16,
    triggerRadius: 48,
    color: "#f59e0b",
  },
  {
    id: "building-c",
    name: "Building C",
    code: "BLDG-C",
    subtitle: "East Wing (8 Floors)",
    description: "Achievements, Competitions & Learning Milestones",
    icon: "Trophy",
    doorX: 41 * TILE_SIZE - 16,
    doorY: 25 * TILE_SIZE + 16,
    triggerRadius: 48,
    color: "#a855f7",
  },
  {
    id: "main-entrance",
    name: "Main Entrance",
    code: "GATE-EWU",
    subtitle: "Aftabnagar Campus Gateway",
    description: "Get in Touch, Social Connections & Resume Download",
    icon: "Send",
    doorX: 27 * TILE_SIZE,
    doorY: 39 * TILE_SIZE + 16,
    triggerRadius: 52,
    color: "#10b981",
  },
];

export const INITIAL_PLAYER_SPAWN = {
  x: 27 * TILE_SIZE,
  y: 36 * TILE_SIZE,
};

/**
 * Builds the complete multi-layer map structure with accurate architectural features
 */
export function generateCampusMap(): {
  config: MapConfig;
  decorations: MapDecoration[];
} {
  const ground: number[][] = Array.from({ length: MAP_ROWS }, () =>
    Array(MAP_COLS).fill(TILES.EMPTY)
  );
  const walkways: number[][] = Array.from({ length: MAP_ROWS }, () =>
    Array(MAP_COLS).fill(-1)
  );
  const walls: number[][] = Array.from({ length: MAP_ROWS }, () =>
    Array(MAP_COLS).fill(-1)
  );
  const roofs: number[][] = Array.from({ length: MAP_ROWS }, () =>
    Array(MAP_COLS).fill(-1)
  );
  const collision: boolean[][] = Array.from({ length: MAP_ROWS }, () =>
    Array(MAP_COLS).fill(false)
  );
  const decorations: MapDecoration[] = [];

  // 1. BASE TERRAIN (Grass, Road, Sidewalk)
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      if (r >= 41) {
        ground[r][c] = r >= 42 ? TILES.ROAD : TILES.SIDEWALK;
      } else {
        ground[r][c] = TILES.GRASS;
      }
    }
  }

  // 2. COURTYARD PLAZA (Inner Plaza from blueprint)
  // Rows 14 to 38, Cols 13 to 40
  for (let r = 14; r <= 38; r++) {
    for (let c = 13; c <= 40; c++) {
      // 4x4 courtyard tile grid pattern as in EWU reference
      const isGridLine = r % 4 === 0 || c % 4 === 0;
      ground[r][c] = isGridLine ? TILES.COURTYARD_ACCENT : TILES.COURTYARD;
    }
  }

  // 3. WALKWAYS (Glass Canopy on Left, Covered Colonnade on Right)
  // Glass Canopy Walkway (Cols 13 to 14, Rows 15 to 37)
  for (let r = 15; r <= 37; r++) {
    for (let c = 13; c <= 14; c++) {
      walkways[r][c] = TILES.WALKWAY_CANOPY;
      // Canopy steel frames at intervals
      if (r % 2 === 0) {
        roofs[r][c] = TILES.CANOPY_FRAME;
      }
    }
  }

  // Covered Colonnade Walkway (Cols 39 to 40, Rows 15 to 37)
  for (let r = 15; r <= 37; r++) {
    for (let c = 39; c <= 40; c++) {
      walkways[r][c] = TILES.WALKWAY_COLONNADE;
      // Colonnade columns at intervals
      if (r % 3 === 0 && c === 39) {
        walls[r][c] = TILES.COLUMN_BASE;
        collision[r][c] = true;
      }
    }
  }

  // 4. BUILDING B (North / Back - 10 Floors)
  // Cols 4 to 49, Rows 4 to 14
  for (let c = 4; c <= 49; c++) {
    // Roof Parapet Coping
    roofs[4][c] = TILES.ROOF_COPING;
    collision[4][c] = true;

    // Roof Surface
    for (let r = 2; r < 4; r++) {
      roofs[r][c] = TILES.ROOF_SURFACE;
      collision[r][c] = true;
    }
    // HVAC units on roof of Building B
    if (c % 8 === 0) {
      roofs[3][c] = TILES.ROOF_HVAC;
    }

    // Building B Facade (Rows 5 to 13)
    for (let r = 5; r <= 13; r++) {
      collision[r][c] = true;
      if (r === 13) {
        // Ground floor open colonnade
        walls[r][c] = TILES.WALL_COLONNADE_OPEN;
      } else if (r % 2 === 1 && c % 3 !== 0) {
        // Lit vs Dark windows
        const isLit = (c * 7 + r * 13) % 5 === 0;
        walls[r][c] = isLit ? TILES.WALL_WINDOW_LIT : TILES.WALL_WINDOW_DARK;
      } else {
        walls[r][c] = TILES.WALL_BRICK;
      }
    }
  }
  // Building B Main Door
  walls[13][26] = TILES.DOOR_B;
  walls[13][27] = TILES.DOOR_B;
  collision[13][26] = false;
  collision[13][27] = false;

  // 5. BUILDING A (West / Left Wing - 10 Floors)
  // Cols 4 to 12, Rows 14 to 38
  for (let r = 14; r <= 38; r++) {
    for (let c = 4; c <= 12; c++) {
      collision[r][c] = true;
      // Windows facing courtyard
      if (c === 12 && r % 2 === 0) {
        const isLit = (r * 17) % 4 === 0;
        walls[r][c] = isLit ? TILES.WALL_WINDOW_LIT : TILES.WALL_WINDOW_DARK;
      } else {
        walls[r][c] = TILES.WALL_BRICK;
      }
    }
    // Roof coping on outer edge
    roofs[r][4] = TILES.ROOF_COPING;
  }
  // Building A Entrance Door
  walls[24][12] = TILES.DOOR_A;
  walls[25][12] = TILES.DOOR_A;
  collision[24][12] = false;
  collision[25][12] = false;

  // 6. BUILDING C (East / Right Wing - 8 Floors)
  // Cols 41 to 49, Rows 14 to 38
  for (let r = 14; r <= 38; r++) {
    for (let c = 41; c <= 49; c++) {
      collision[r][c] = true;
      // Windows facing courtyard
      if (c === 41 && r % 2 === 0) {
        const isLit = (r * 11) % 3 === 0;
        walls[r][c] = isLit ? TILES.WALL_WINDOW_LIT : TILES.WALL_WINDOW_DARK;
      } else {
        walls[r][c] = TILES.WALL_BRICK;
      }
    }
    // Roof coping on outer edge
    roofs[r][49] = TILES.ROOF_COPING;
  }
  // Building C Entrance Door
  walls[24][41] = TILES.DOOR_C;
  walls[25][41] = TILES.DOOR_C;
  collision[24][41] = false;
  collision[25][41] = false;

  // 7. PLANTER BOXES & TREES (4 Courtyard Planters from Blueprint Top View!)
  const planterCoords = [
    { startC: 18, startR: 19 }, // Top-Left
    { startC: 33, startR: 19 }, // Top-Right
    { startC: 18, startR: 30 }, // Bottom-Left
    { startC: 33, startR: 30 }, // Bottom-Right
  ];

  planterCoords.forEach(({ startC, startR }) => {
    for (let pr = 0; pr < 3; pr++) {
      for (let pc = 0; pc < 3; pc++) {
        const r = startR + pr;
        const c = startC + pc;
        walkways[r][c] = TILES.PLANTER_CURB;
        if (pr === 1 && pc === 1) {
          walls[r][c] = TILES.PLANTER_GREEN;
        }
        collision[r][c] = true;
      }
    }
    // Place Tree in center of each planter
    decorations.push({
      x: (startC + 1.5) * TILE_SIZE,
      y: (startR + 1.5) * TILE_SIZE,
      texture: "tree_campus",
      type: "tree",
    });
  });

  // 8. CAMPUS BENCHES & STREET LIGHTS
  // Street Lamps along courtyard borders
  const lampPositions = [
    { c: 15, r: 16 },
    { c: 38, r: 16 },
    { c: 15, r: 26 },
    { c: 38, r: 26 },
    { c: 15, r: 36 },
    { c: 38, r: 36 },
    { c: 22, r: 16 },
    { c: 31, r: 16 },
  ];

  lampPositions.forEach((pos) => {
    decorations.push({
      x: pos.c * TILE_SIZE + 16,
      y: pos.r * TILE_SIZE + 16,
      texture: "lamp_post",
      type: "lamp",
    });
    collision[pos.r][pos.c] = true;
  });

  // Wooden Benches in Courtyard
  const benchPositions = [
    { c: 26, r: 19 },
    { c: 27, r: 19 },
    { c: 26, r: 30 },
    { c: 27, r: 30 },
  ];

  benchPositions.forEach((pos) => {
    decorations.push({
      x: pos.c * TILE_SIZE + 16,
      y: pos.r * TILE_SIZE + 16,
      texture: "campus_bench",
      type: "bench",
    });
    collision[pos.r][pos.c] = true;
  });

  // 9. MAIN ENTRANCE GATE & BOUNDARY WALLS
  // South boundary walls on left and right of entrance
  for (let c = 13; c <= 22; c++) {
    walls[39][c] = TILES.WALL_BRICK_DARK;
    collision[39][c] = true;
  }
  for (let c = 31; c <= 40; c++) {
    walls[39][c] = TILES.WALL_BRICK_DARK;
    collision[39][c] = true;
  }
  // Main Entrance Opening (Cols 23 to 30)
  for (let c = 23; c <= 30; c++) {
    ground[39][c] = TILES.SIDEWALK;
    ground[40][c] = TILES.SIDEWALK;
  }
  // Main Gate Crest
  walls[39][26] = TILES.DOOR_MAIN;
  walls[39][27] = TILES.DOOR_MAIN;

  // Perimeter map collision borders
  for (let c = 0; c < MAP_COLS; c++) {
    collision[0][c] = true;
    collision[MAP_ROWS - 1][c] = true;
  }
  for (let r = 0; r < MAP_ROWS; r++) {
    collision[r][0] = true;
    collision[r][MAP_COLS - 1] = true;
  }

  return {
    config: {
      cols: MAP_COLS,
      rows: MAP_ROWS,
      tileSize: TILE_SIZE,
      groundLayer: ground,
      walkwayLayer: walkways,
      wallsLayer: walls,
      roofLayer: roofs,
      collisionGrid: collision,
    },
    decorations,
  };
}
