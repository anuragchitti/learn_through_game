import { LevelDefinition } from "../types";
import { javascriptLevels } from "./javascript";
import { pythonLevels } from "./python";

export const allLevels: Record<string, LevelDefinition[]> = {
  javascript: javascriptLevels,
  python: pythonLevels,
};

export function getLevelsForCourse(courseSlug: string): LevelDefinition[] {
  return allLevels[courseSlug] ?? [];
}

export function getLevel(courseSlug: string, levelNumber: number): LevelDefinition | undefined {
  return allLevels[courseSlug]?.find((l) => l.number === levelNumber);
}

export function getNextLevel(courseSlug: string, currentNumber: number): LevelDefinition | undefined {
  return allLevels[courseSlug]?.find((l) => l.number === currentNumber + 1);
}
