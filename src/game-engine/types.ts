export type TileType =
  | "empty"
  | "wall"
  | "gem"
  | "exit"
  | "hero"
  | "enemy"
  | "key"
  | "barrier"
  | "chest"
  | "spike"
  | "bush";

export type Direction = "up" | "down" | "left" | "right";

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  type: TileType;
  sprite: string;
}

export interface GameCommand {
  type:
    | "MOVE"
    | "ATTACK"
    | "COLLECT"
    | "WAIT"
    | "SAY"
    | "TURN"
    | "SHOOT"
    | "BLINK"
    | "FIREBALL"
    | "DASH"
    | "CHARGE"
    | "SHIELD";
  direction?: Direction;
  message?: string;
}

export interface GameObjective {
  type: "reach-exit" | "collect-all-gems" | "collect-gems" | "defeat-enemies" | "collect-and-exit";
  count?: number;
  description: string;
}

export interface LevelDefinition {
  id: string;
  courseId: string;
  number: number;
  title: string;
  description: string;
  concept: string;
  conceptExplanation: string;
  codeExample: string;
  starterCode: string;
  solutionCode: string;
  grid: TileType[][];
  heroStart: Position;
  objectives: GameObjective[];
  maxCommands?: number;
  hint: string;
  tip?: string;
  requiredClass?: import("./characters").CharacterClass;
}

export interface WorldState {
  grid: Tile[][];
  heroPos: Position;
  heroDirection: Direction;
  gemsCollected: number;
  totalGems: number;
  enemiesDefeated: number;
  totalEnemies: number;
  reachedExit: boolean;
  isAlive: boolean;
  message?: string;
  commandsUsed: number;
}

export interface GameResult {
  success: boolean;
  reason: string;
  gemsCollected: number;
  commandsUsed: number;
  xpEarned: number;
}
