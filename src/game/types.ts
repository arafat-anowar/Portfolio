export type BuildingId = "building-a" | "building-b" | "building-c" | "main-entrance";

export interface BuildingInfo {
  id: BuildingId;
  name: string;
  code: string;
  subtitle: string;
  description: string;
  icon: string;
  doorX: number;
  doorY: number;
  triggerRadius: number;
  color: string;
}

export interface PlayerPosition {
  x: number;
  y: number;
  direction: "down" | "up" | "left" | "right";
}

export interface GameEventCallbacks {
  onBuildingEnter?: (building: BuildingInfo) => void;
  onBuildingLeave?: () => void;
  onPlayerMove?: (pos: PlayerPosition) => void;
  onNPCInteract?: (npc: { name: string; role: string; dialogue: string[] }) => void;
  onGameReady?: () => void;
}
