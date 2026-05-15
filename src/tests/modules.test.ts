import { describe, it, expect } from "vitest";
import { getModules, javascriptBeginnerModules, pythonBeginnerModules } from "@/data/modules";

describe("getModules()", () => {
  it("returns JS beginner modules", () => {
    const modules = getModules("javascript", "beginner");
    expect(modules.length).toBeGreaterThan(0);
  });

  it("returns empty array for unbuilt content", () => {
    const modules = getModules("javascript", "intermediate");
    expect(modules).toBeInstanceOf(Array);
    expect(modules.length).toBe(0);
  });

  it("returns empty array for unknown course", () => {
    const modules = getModules("nonexistent", "beginner");
    expect(modules).toHaveLength(0);
  });
});

describe("JavaScript beginner modules", () => {
  it("each module has a title, concept cards, and a challenge", () => {
    javascriptBeginnerModules.forEach((m) => {
      expect(m.title).toBeTruthy();
      expect(m.conceptCards.length).toBeGreaterThan(0);
      expect(m.challenge).toBeDefined();
      expect(m.challenge.hints.length).toBeGreaterThan(0);
      expect(m.challenge.explanation).toBeTruthy();
      expect(m.xpReward).toBeGreaterThan(0);
    });
  });

  it("modules are ordered correctly", () => {
    for (let i = 0; i < javascriptBeginnerModules.length; i++) {
      expect(javascriptBeginnerModules[i].order).toBe(i + 1);
    }
  });

  it("all module IDs are unique", () => {
    const ids = javascriptBeginnerModules.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Python beginner modules", () => {
  it("each module has required fields", () => {
    pythonBeginnerModules.forEach((m) => {
      expect(m.courseId).toBe("python");
      expect(m.level).toBe("beginner");
      expect(m.conceptCards.length).toBeGreaterThan(0);
      expect(m.challenge.solution).toBeTruthy();
    });
  });
});
