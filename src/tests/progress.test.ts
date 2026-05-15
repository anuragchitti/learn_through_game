import { describe, it, expect, beforeEach, vi } from "vitest";
import { initProgress, completeModule, loseLife, isLevelComplete, advanceLevel } from "@/lib/progress";

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
};

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });
Object.defineProperty(globalThis, "window", { value: { localStorage: localStorageMock } });

beforeEach(() => {
  localStorageMock.clear();
});

describe("initProgress()", () => {
  it("creates progress with correct defaults", () => {
    const p = initProgress("user-1", {
      courseSlug: "javascript",
      goal: "get-a-job",
      knowledge: "complete-beginner",
    });
    expect(p.courseId).toBe("javascript");
    expect(p.currentLevel).toBe("beginner");
    expect(p.xp).toBe(0);
    expect(p.lives).toBe(3);
    expect(p.streak).toBe(1);
    expect(p.completedModules).toHaveLength(0);
  });

  it("sets starting level based on knowledge", () => {
    const p = initProgress("user-2", {
      courseSlug: "python",
      goal: "upskill",
      knowledge: "intermediate",
    });
    expect(p.currentLevel).toBe("intermediate");
  });
});

describe("completeModule()", () => {
  it("adds XP and increments module index", () => {
    initProgress("user-1", {
      courseSlug: "javascript",
      goal: "learn-for-fun",
      knowledge: "complete-beginner",
    });

    const updated = completeModule("javascript", "js-b-1", 50);
    expect(updated?.xp).toBe(50);
    expect(updated?.currentModule).toBe(1);
    expect(updated?.completedModules).toContain("js-b-1");
  });

  it("does not double-count a completed module", () => {
    initProgress("user-1", {
      courseSlug: "javascript",
      goal: "learn-for-fun",
      knowledge: "complete-beginner",
    });

    completeModule("javascript", "js-b-1", 50);
    const second = completeModule("javascript", "js-b-1", 50);
    expect(second?.xp).toBe(50); // not 100
  });

  it("returns null for unknown course", () => {
    expect(completeModule("nonexistent", "mod-1", 50)).toBeNull();
  });
});

describe("loseLife()", () => {
  it("decrements lives by 1", () => {
    initProgress("user-1", {
      courseSlug: "python",
      goal: "build-project",
      knowledge: "know-a-little",
    });
    const updated = loseLife("python");
    expect(updated?.lives).toBe(2);
  });

  it("does not go below 0 lives", () => {
    initProgress("user-1", {
      courseSlug: "python",
      goal: "build-project",
      knowledge: "know-a-little",
    });
    loseLife("python");
    loseLife("python");
    loseLife("python");
    const updated = loseLife("python");
    expect(updated?.lives).toBe(0);
  });
});

describe("isLevelComplete()", () => {
  it("returns true when all modules are done", () => {
    const progress = {
      userId: "u1",
      courseId: "js",
      currentLevel: "beginner" as const,
      currentModule: 5,
      completedModules: [],
      xp: 0,
      lives: 3,
      streak: 1,
      lastActiveDate: "2026-01-01",
    };
    expect(isLevelComplete(progress, 5)).toBe(true);
  });

  it("returns false when modules remain", () => {
    const progress = {
      userId: "u1",
      courseId: "js",
      currentLevel: "beginner" as const,
      currentModule: 3,
      completedModules: [],
      xp: 0,
      lives: 3,
      streak: 1,
      lastActiveDate: "2026-01-01",
    };
    expect(isLevelComplete(progress, 5)).toBe(false);
  });
});

describe("advanceLevel()", () => {
  it("resets module index and restores lives when advancing", () => {
    initProgress("user-1", {
      courseSlug: "react",
      goal: "get-a-job",
      knowledge: "know-a-little",
    });
    loseLife("react");

    const updated = advanceLevel("react", "intermediate");
    expect(updated?.currentLevel).toBe("intermediate");
    expect(updated?.currentModule).toBe(0);
    expect(updated?.lives).toBe(3);
  });
});
