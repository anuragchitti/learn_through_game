import {
  TileType,
  Tile,
  Position,
  Direction,
  GameCommand,
  WorldState,
  LevelDefinition,
  GameResult,
} from "./types";

const TILE_SPRITES: Record<TileType, string> = {
  empty: "",
  wall: "🧱",
  barrier: "🪨",
  gem: "💎",
  exit: "🚪",
  hero: "🦸",
  enemy: "👹",
  key: "🗝️",
  chest: "📦",
  spike: "🔺",
  bush: "🌿",
};

const DIR_DELTA: Record<Direction, Position> = {
  up:    { row: -1, col: 0 },
  down:  { row:  1, col: 0 },
  left:  { row:  0, col: -1 },
  right: { row:  0, col:  1 },
};

export function buildInitialState(level: LevelDefinition): WorldState {
  const grid: Tile[][] = level.grid.map((row) =>
    row.map((type) => ({ type, sprite: TILE_SPRITES[type] }))
  );

  let totalGems = 0;
  let totalEnemies = 0;
  level.grid.forEach((row) =>
    row.forEach((t) => {
      if (t === "gem") totalGems++;
      if (t === "enemy") totalEnemies++;
    })
  );

  return {
    grid,
    heroPos: { ...level.heroStart },
    heroDirection: "right",
    gemsCollected: 0,
    totalGems,
    enemiesDefeated: 0,
    totalEnemies,
    reachedExit: false,
    isAlive: true,
    commandsUsed: 0,
  };
}

export function applyCommand(
  state: WorldState,
  command: GameCommand,
  level: LevelDefinition
): WorldState {
  const s: WorldState = {
    ...state,
    grid: state.grid.map((row) => row.map((t) => ({ ...t }))),
    heroPos: { ...state.heroPos },
    commandsUsed: state.commandsUsed + 1,
    message: undefined,
  };

  if (!s.isAlive) return s;

  switch (command.type) {
    case "MOVE": {
      const dir = command.direction!;
      const delta = DIR_DELTA[dir];
      const next: Position = {
        row: s.heroPos.row + delta.row,
        col: s.heroPos.col + delta.col,
      };

      // bounds check
      if (
        next.row < 0 ||
        next.row >= s.grid.length ||
        next.col < 0 ||
        next.col >= s.grid[0].length
      ) {
        s.message = "Oops! Can't move outside the world.";
        return s;
      }

      const targetTile = s.grid[next.row][next.col];

      if (targetTile.type === "wall") {
        s.message = "Blocked by a wall!";
        return s;
      }

      if (targetTile.type === "spike") {
        s.isAlive = false;
        s.message = "💀 Ouch! Hit a spike!";
        return s;
      }

      if (targetTile.type === "enemy") {
        s.isAlive = false;
        s.message = "💀 An enemy blocked the path! Use hero.attack() first.";
        return s;
      }

      // collect gem automatically on move
      if (targetTile.type === "gem") {
        s.gemsCollected++;
        s.grid[next.row][next.col] = { type: "empty", sprite: "" };
      }

      if (targetTile.type === "chest") {
        s.grid[next.row][next.col] = { type: "empty", sprite: "" };
        s.message = "📦 Chest opened!";
      }

      if (targetTile.type === "exit") {
        s.reachedExit = true;
      }

      s.heroPos = next;
      s.heroDirection = dir;
      break;
    }

    case "ATTACK": {
      const dir = command.direction ?? s.heroDirection;
      const delta = DIR_DELTA[dir];
      const target: Position = {
        row: s.heroPos.row + delta.row,
        col: s.heroPos.col + delta.col,
      };

      if (
        target.row >= 0 &&
        target.row < s.grid.length &&
        target.col >= 0 &&
        target.col < s.grid[0].length &&
        s.grid[target.row][target.col].type === "enemy"
      ) {
        s.grid[target.row][target.col] = { type: "empty", sprite: "" };
        s.enemiesDefeated++;
        s.message = "⚔️ Enemy defeated!";
      } else {
        s.message = "Swing missed — no enemy there.";
      }
      break;
    }

    case "SAY": {
      s.message = `💬 "${command.message}"`;
      break;
    }

    case "WAIT": {
      s.message = "⏳ Waiting...";
      break;
    }

    // ── WARRIOR ──────────────────────────────────────────────────────────────
    case "CHARGE": {
      // Move 2 tiles and attack anything in the landing cell
      const dir = command.direction ?? s.heroDirection;
      const delta = DIR_DELTA[dir];
      for (let step = 1; step <= 2; step++) {
        const next: Position = {
          row: s.heroPos.row + delta.row * step,
          col: s.heroPos.col + delta.col * step,
        };
        if (
          next.row < 0 || next.row >= s.grid.length ||
          next.col < 0 || next.col >= s.grid[0].length ||
          s.grid[next.row][next.col].type === "wall"
        ) break;

        const t = s.grid[next.row][next.col];
        if (t.type === "enemy") {
          s.grid[next.row][next.col] = { type: "empty", sprite: "" };
          s.enemiesDefeated++;
          s.heroPos = next;
          s.heroDirection = dir;
          s.message = "💥 Charged through enemy!";
          break;
        }
        if (t.type === "gem") {
          s.gemsCollected++;
          s.grid[next.row][next.col] = { type: "empty", sprite: "" };
        }
        if (t.type === "exit") s.reachedExit = true;
        s.heroPos = next;
        s.heroDirection = dir;
      }
      break;
    }

    case "SHIELD": {
      s.message = "🛡️ Shield raised — next hit blocked!";
      break;
    }

    // ── MAGE ─────────────────────────────────────────────────────────────────
    case "BLINK": {
      // Teleport exactly 2 tiles — can pass through one wall
      const dir = command.direction ?? s.heroDirection;
      const delta = DIR_DELTA[dir];
      const landing: Position = {
        row: s.heroPos.row + delta.row * 2,
        col: s.heroPos.col + delta.col * 2,
      };
      if (
        landing.row < 0 || landing.row >= s.grid.length ||
        landing.col < 0 || landing.col >= s.grid[0].length
      ) {
        s.message = "✨ Blink fizzled — destination out of bounds!";
        break;
      }
      const dest = s.grid[landing.row][landing.col];
      if (dest.type === "wall") {
        s.message = "✨ Blink blocked — landing spot is a wall!";
        break;
      }
      if (dest.type === "gem") {
        s.gemsCollected++;
        s.grid[landing.row][landing.col] = { type: "empty", sprite: "" };
      }
      if (dest.type === "exit") s.reachedExit = true;
      s.heroPos = landing;
      s.heroDirection = dir;
      s.message = "✨ Blinked!";
      break;
    }

    case "FIREBALL": {
      // Ranged destroy up to 3 tiles in direction (hits first enemy or barrier)
      const dir = command.direction ?? s.heroDirection;
      const delta = DIR_DELTA[dir];
      let hit = false;
      for (let dist = 1; dist <= 3; dist++) {
        const target: Position = {
          row: s.heroPos.row + delta.row * dist,
          col: s.heroPos.col + delta.col * dist,
        };
        if (
          target.row < 0 || target.row >= s.grid.length ||
          target.col < 0 || target.col >= s.grid[0].length ||
          s.grid[target.row][target.col].type === "wall"
        ) break;

        const t = s.grid[target.row][target.col];
        if (t.type === "enemy") {
          s.grid[target.row][target.col] = { type: "empty", sprite: "" };
          s.enemiesDefeated++;
          s.message = "🔥 Fireball hit enemy!";
          hit = true;
          break;
        }
        if (t.type === "barrier") {
          s.grid[target.row][target.col] = { type: "empty", sprite: "" };
          s.message = "🔥 Barrier destroyed!";
          hit = true;
          break;
        }
      }
      if (!hit) s.message = "🔥 Fireball missed — no target in range.";
      break;
    }

    // ── ARCHER ───────────────────────────────────────────────────────────────
    case "SHOOT": {
      // Ranged attack up to 3 tiles — hits first enemy
      const dir = command.direction ?? s.heroDirection;
      const delta = DIR_DELTA[dir];
      let hit = false;
      for (let dist = 1; dist <= 3; dist++) {
        const target: Position = {
          row: s.heroPos.row + delta.row * dist,
          col: s.heroPos.col + delta.col * dist,
        };
        if (
          target.row < 0 || target.row >= s.grid.length ||
          target.col < 0 || target.col >= s.grid[0].length ||
          s.grid[target.row][target.col].type === "wall"
        ) break;

        if (s.grid[target.row][target.col].type === "enemy") {
          s.grid[target.row][target.col] = { type: "empty", sprite: "" };
          s.enemiesDefeated++;
          s.message = "🎯 Arrow hit!";
          hit = true;
          break;
        }
      }
      if (!hit) s.message = "🏹 Arrow missed — no enemy in range.";
      break;
    }

    case "DASH": {
      // Move 2 tiles instantly, collecting gems along the way
      const dir = command.direction ?? s.heroDirection;
      const delta = DIR_DELTA[dir];
      for (let step = 1; step <= 2; step++) {
        const next: Position = {
          row: s.heroPos.row + delta.row * step,
          col: s.heroPos.col + delta.col * step,
        };
        if (
          next.row < 0 || next.row >= s.grid.length ||
          next.col < 0 || next.col >= s.grid[0].length
        ) break;
        const t = s.grid[next.row][next.col];
        if (t.type === "wall" || t.type === "enemy") break;
        if (t.type === "gem") {
          s.gemsCollected++;
          s.grid[next.row][next.col] = { type: "empty", sprite: "" };
        }
        if (t.type === "spike") {
          s.isAlive = false;
          s.message = "💀 Dashed into a spike!";
          return s;
        }
        if (t.type === "exit") s.reachedExit = true;
        s.heroPos = next;
        s.heroDirection = dir;
      }
      s.message = "💨 Dashed!";
      break;
    }

    default:
      break;
  }

  return s;
}

export function checkObjectives(
  state: WorldState,
  level: LevelDefinition
): GameResult | null {
  for (const obj of level.objectives) {
    switch (obj.type) {
      case "reach-exit":
        if (!state.reachedExit) return null;
        break;
      case "collect-all-gems":
        if (state.gemsCollected < state.totalGems) return null;
        break;
      case "collect-gems":
        if (state.gemsCollected < (obj.count ?? 1)) return null;
        break;
      case "defeat-enemies":
        if (state.enemiesDefeated < state.totalEnemies) return null;
        break;
      case "collect-and-exit":
        if (state.gemsCollected < state.totalGems || !state.reachedExit) return null;
        break;
    }
  }

  return {
    success: true,
    reason: "All objectives complete! 🎉",
    gemsCollected: state.gemsCollected,
    commandsUsed: state.commandsUsed,
    xpEarned: 100 + state.gemsCollected * 25,
  };
}

export function runCommands(
  level: LevelDefinition,
  commands: GameCommand[]
): WorldState[] {
  const snapshots: WorldState[] = [];
  let state = buildInitialState(level);
  snapshots.push({ ...state });

  for (const cmd of commands) {
    state = applyCommand(state, cmd, level);
    snapshots.push({ ...state });
    if (!state.isAlive) break;
    if (state.reachedExit && level.objectives.some((o) => o.type === "reach-exit" || o.type === "collect-and-exit")) {
      break;
    }
  }

  return snapshots;
}
