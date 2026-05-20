import { describe, it, expect } from "vitest";
import { buildInitialState, applyCommand, runCommands, checkObjectives } from "@/game-engine/WorldEngine";
import { runUserCode } from "@/game-engine/CodeRunner";
import { getLevelsForCourse, getLevel } from "@/game-engine/levels";
import { LevelDefinition } from "@/game-engine/types";

const level1 = getLevel("javascript", 1)!;
const level2 = getLevel("javascript", 2)!;
const level5 = getLevel("javascript", 5)!;

describe("buildInitialState()", () => {
  it("places hero at correct start position", () => {
    const state = buildInitialState(level1);
    expect(state.heroPos).toEqual(level1.heroStart);
  });

  it("counts gems correctly", () => {
    const state = buildInitialState(level2);
    expect(state.totalGems).toBe(4);
    expect(state.gemsCollected).toBe(0);
  });

  it("hero starts alive with 0 commands used", () => {
    const state = buildInitialState(level1);
    expect(state.isAlive).toBe(true);
    expect(state.commandsUsed).toBe(0);
  });
});

describe("applyCommand() — MOVE", () => {
  it("moves hero right", () => {
    const state = buildInitialState(level1);
    const next = applyCommand(state, { type: "MOVE", direction: "right" }, level1);
    expect(next.heroPos.col).toBe(state.heroPos.col + 1);
  });

  it("blocks movement into a wall", () => {
    const state = buildInitialState(level1);
    // Level 1 row 0 is all walls, hero is row 1. Moving up hits a wall.
    const next = applyCommand(state, { type: "MOVE", direction: "up" }, level1);
    expect(next.heroPos).toEqual(state.heroPos); // didn't move
    expect(next.message).toContain("wall");
  });

  it("collects a gem on move-over", () => {
    const state = buildInitialState(level2);
    // level2 hero at {row:1,col:1}, gem at {row:1,col:2}
    const next = applyCommand(state, { type: "MOVE", direction: "right" }, level2);
    expect(next.gemsCollected).toBe(1);
    expect(next.grid[1][2].type).toBe("empty");
  });

  it("sets reachedExit when hero walks onto exit", () => {
    const state = buildInitialState(level1);
    // Level 1: hero at col 1, exit at col 5 — move right 4 times
    let s = state;
    for (let i = 0; i < 4; i++) {
      s = applyCommand(s, { type: "MOVE", direction: "right" }, level1);
    }
    expect(s.reachedExit).toBe(true);
  });

  it("increments commandsUsed on every command", () => {
    const state = buildInitialState(level1);
    const next = applyCommand(state, { type: "MOVE", direction: "right" }, level1);
    expect(next.commandsUsed).toBe(1);
  });
});

describe("applyCommand() — ATTACK", () => {
  it("defeats an enemy in the attack direction", () => {
    const state = buildInitialState(level5);
    // level5: hero at col 1, enemy at col 2 — attack right (hero faces right)
    const next = applyCommand(state, { type: "ATTACK", direction: "right" }, level5);
    expect(next.enemiesDefeated).toBe(1);
    expect(next.grid[next.heroPos.row][next.heroPos.col + 1].type).toBe("empty");
  });

  it("misses when no enemy in target cell", () => {
    const state = buildInitialState(level1);
    const next = applyCommand(state, { type: "ATTACK", direction: "right" }, level1);
    expect(next.enemiesDefeated).toBe(0);
    expect(next.message).toContain("missed");
  });
});

describe("runCommands()", () => {
  it("returns snapshots for each command", () => {
    const snaps = runCommands(level1, [
      { type: "MOVE", direction: "right" },
      { type: "MOVE", direction: "right" },
    ]);
    expect(snaps).toHaveLength(3); // initial + 2 moves
  });

  it("stops early if hero dies", () => {
    const snaps = runCommands(level5, [
      // Move right into the enemy without attacking first
      { type: "MOVE", direction: "right" },
      { type: "MOVE", direction: "right" }, // should not execute
    ]);
    const lastSnap = snaps[snaps.length - 1];
    expect(lastSnap.isAlive).toBe(false);
    // Should not have advanced past the enemy
    expect(snaps.length).toBeLessThan(4);
  });
});

describe("checkObjectives()", () => {
  it("returns null if objectives not yet met", () => {
    const state = buildInitialState(level1);
    expect(checkObjectives(state, level1)).toBeNull();
  });

  it("returns GameResult when all objectives met", () => {
    const state = buildInitialState(level1);
    // Walk to the exit
    let s = state;
    for (let i = 0; i < 4; i++) {
      s = applyCommand(s, { type: "MOVE", direction: "right" }, level1);
    }
    const result = checkObjectives(s, level1);
    expect(result).not.toBeNull();
    expect(result?.success).toBe(true);
    expect(result?.xpEarned).toBeGreaterThan(0);
  });
});

describe("runUserCode()", () => {
  it("returns commands for valid code", () => {
    const { commands, error } = runUserCode(`hero.moveRight(); hero.moveLeft();`);
    expect(error).toBeNull();
    expect(commands).toHaveLength(2);
    expect(commands[0]).toEqual({ type: "MOVE", direction: "right" });
    expect(commands[1]).toEqual({ type: "MOVE", direction: "left" });
  });

  it("returns error for syntax errors", () => {
    const { commands, error } = runUserCode(`hero.moveRight( <<<`);
    expect(error).not.toBeNull();
    expect(commands).toHaveLength(0);
  });

  it("blocks window access", () => {
    const { error } = runUserCode(`window.alert("hack")`);
    expect(error).not.toBeNull();
    expect(error).toContain("window");
  });

  it("blocks eval", () => {
    const { error } = runUserCode(`eval("1+1")`);
    expect(error).not.toBeNull();
  });

  it("handles loops correctly", () => {
    const { commands, error } = runUserCode(
      `for (let i = 0; i < 3; i++) { hero.moveRight(); }`
    );
    expect(error).toBeNull();
    expect(commands).toHaveLength(3);
  });

  it("supports hero.say()", () => {
    const { commands, error } = runUserCode(`hero.say("hello");`);
    expect(error).toBeNull();
    expect(commands[0].type).toBe("SAY");
    expect(commands[0].message).toBe("hello");
  });
});

describe("getLevelsForCourse()", () => {
  it("returns levels for javascript", () => {
    const levels = getLevelsForCourse("javascript");
    expect(levels.length).toBeGreaterThan(0);
  });

  it("returns empty for unknown course", () => {
    expect(getLevelsForCourse("nonexistent")).toHaveLength(0);
  });

  it("every level has required fields", () => {
    getLevelsForCourse("javascript").forEach((lvl) => {
      expect(lvl.id).toBeTruthy();
      expect(lvl.title).toBeTruthy();
      expect(lvl.concept).toBeTruthy();
      expect(lvl.starterCode).toBeDefined();
      expect(lvl.solutionCode).toBeTruthy();
      expect(lvl.grid.length).toBeGreaterThan(0);
      expect(lvl.objectives.length).toBeGreaterThan(0);
      expect(lvl.hint).toBeTruthy();
    });
  });

  it("level numbers are sequential", () => {
    const levels = getLevelsForCourse("javascript");
    levels.forEach((lvl, i) => {
      expect(lvl.number).toBe(i + 1);
    });
  });
});
