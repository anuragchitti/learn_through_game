import { LevelDefinition } from "../types";
import { javascriptLevels } from "./javascript";
import { pythonLevels } from "./python";
import { typescriptLevels } from "./typescript";
import { reactLevels } from "./react";
import { sqlLevels } from "./sql";
import { htmlCssLevels } from "./html-css";
import { gitLevels } from "./git";
import { allClassLevels, warriorLevels, mageLevels, archerLevels } from "./class-levels";
import { CharacterClass } from "../characters";

export { warriorLevels, mageLevels, archerLevels };

export const allLevels: Record<string, LevelDefinition[]> = {
  javascript: javascriptLevels,
  python: pythonLevels,
  typescript: typescriptLevels,
  react: reactLevels,
  sql: sqlLevels,
  "html-css": htmlCssLevels,
  "git-github": gitLevels,
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

export function getClassLevels(characterClass: CharacterClass): LevelDefinition[] {
  return allClassLevels.filter((l) => l.requiredClass === characterClass);
}

export function getClassLevel(characterClass: CharacterClass, levelNumber: number): LevelDefinition | undefined {
  return allClassLevels.find((l) => l.requiredClass === characterClass && l.number === levelNumber);
}
