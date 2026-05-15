import { describe, it, expect } from "vitest";
import { courses, getCourseBySlug, getCoursesByCategory } from "@/data/courses";

describe("courses data", () => {
  it("has 25 courses", () => {
    expect(courses).toHaveLength(25);
  });

  it("every course has required fields", () => {
    courses.forEach((course) => {
      expect(course.id).toBeTruthy();
      expect(course.slug).toBeTruthy();
      expect(course.title).toBeTruthy();
      expect(course.description).toBeTruthy();
      expect(course.icon).toBeTruthy();
      expect(course.category).toBeTruthy();
      expect(course.color).toBeTruthy();
      expect(course.totalModules).toBeGreaterThan(0);
      expect(course.estimatedHours).toBeGreaterThan(0);
      expect(course.tags).toBeInstanceOf(Array);
      expect(course.tags.length).toBeGreaterThan(0);
    });
  });

  it("all slugs are unique", () => {
    const slugs = courses.map((c) => c.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(courses.length);
  });

  it("all IDs are unique", () => {
    const ids = courses.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(courses.length);
  });
});

describe("getCourseBySlug()", () => {
  it("returns the correct course", () => {
    const course = getCourseBySlug("javascript");
    expect(course).toBeDefined();
    expect(course?.title).toBe("JavaScript (Vanilla)");
  });

  it("returns undefined for unknown slug", () => {
    expect(getCourseBySlug("nonexistent-slug")).toBeUndefined();
  });

  it("works for every course slug", () => {
    courses.forEach((c) => {
      expect(getCourseBySlug(c.slug)).toBeDefined();
    });
  });
});

describe("getCoursesByCategory()", () => {
  it("returns only courses in that category", () => {
    const frontend = getCoursesByCategory("Web & Frontend");
    frontend.forEach((c) => {
      expect(c.category).toBe("Web & Frontend");
    });
  });

  it("returns empty array for unknown category", () => {
    expect(getCoursesByCategory("Unknown")).toHaveLength(0);
  });

  it("web & frontend has 5 courses", () => {
    expect(getCoursesByCategory("Web & Frontend")).toHaveLength(5);
  });

  it("backend has 5 courses", () => {
    expect(getCoursesByCategory("Backend")).toHaveLength(5);
  });
});
