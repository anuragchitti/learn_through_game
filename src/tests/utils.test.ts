import { describe, it, expect } from "vitest";
import {
  cn,
  knowledgeToLevel,
  levelOrder,
  nextLevel,
  levelLabel,
  levelColor,
  formatXP,
  generateCertificateId,
} from "@/lib/utils";

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deduplicates tailwind classes", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("knowledgeToLevel()", () => {
  it("maps complete-beginner to beginner", () => {
    expect(knowledgeToLevel("complete-beginner")).toBe("beginner");
  });

  it("maps know-a-little to beginner", () => {
    expect(knowledgeToLevel("know-a-little")).toBe("beginner");
  });

  it("maps intermediate to intermediate", () => {
    expect(knowledgeToLevel("intermediate")).toBe("intermediate");
  });

  it("maps just-refreshing to advanced", () => {
    expect(knowledgeToLevel("just-refreshing")).toBe("advanced");
  });
});

describe("levelOrder()", () => {
  it("returns correct numeric order", () => {
    expect(levelOrder("beginner")).toBe(0);
    expect(levelOrder("intermediate")).toBe(1);
    expect(levelOrder("advanced")).toBe(2);
    expect(levelOrder("pro")).toBe(3);
  });
});

describe("nextLevel()", () => {
  it("returns next level in sequence", () => {
    expect(nextLevel("beginner")).toBe("intermediate");
    expect(nextLevel("intermediate")).toBe("advanced");
    expect(nextLevel("advanced")).toBe("pro");
  });

  it("returns null after pro", () => {
    expect(nextLevel("pro")).toBeNull();
  });
});

describe("levelLabel()", () => {
  it("returns human-readable label", () => {
    expect(levelLabel("beginner")).toBe("Beginner");
    expect(levelLabel("intermediate")).toBe("Intermediate");
    expect(levelLabel("advanced")).toBe("Advanced");
    expect(levelLabel("pro")).toBe("Pro");
  });
});

describe("levelColor()", () => {
  it("returns a non-empty string for every level", () => {
    const levels = ["beginner", "intermediate", "advanced", "pro"] as const;
    levels.forEach((l) => {
      expect(levelColor(l)).toBeTruthy();
    });
  });
});

describe("formatXP()", () => {
  it("formats small XP as plain number", () => {
    expect(formatXP(500)).toBe("500");
    expect(formatXP(0)).toBe("0");
  });

  it("formats large XP with k suffix", () => {
    expect(formatXP(1000)).toBe("1.0k");
    expect(formatXP(2500)).toBe("2.5k");
    expect(formatXP(10000)).toBe("10.0k");
  });
});

describe("generateCertificateId()", () => {
  it("generates a string starting with LTG-", () => {
    const id = generateCertificateId();
    expect(id).toMatch(/^LTG-/);
  });

  it("generates unique IDs", () => {
    const ids = new Set(Array.from({ length: 20 }, generateCertificateId));
    expect(ids.size).toBe(20);
  });
});
