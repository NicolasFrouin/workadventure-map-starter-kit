export enum PlayerMode {
  NEUTRAL = 0,
  PLAYER = 1,
  MOB = 2,
}

interface Coords {
  x: number;
  y: number;
}

export const KILL_RADIUS = 25;

export const DEAD_ZONE = {
  x: 30 * 32,
  y: 54 * 32,
  width: 13 * 32,
  height: 9 * 32,
};

export const SafeZone: Coords = {
  x: 51 * 32,
  y: 26 * 32,
};

export const mobSpawns: Coords[] = [
  { x: 60 * 32, y: 54 * 32 },
  { x: 67 * 32, y: 71 * 32 },
  { x: 97 * 32, y: 77 * 32 },
  { x: 121 * 32, y: 64 * 32 },
  { x: 84 * 32, y: 48 * 32 },
  { x: 123 * 32, y: 35 * 32 },
  { x: 102 * 32, y: 23 * 32 },
  { x: 93 * 32, y: 33 * 32 },
];
