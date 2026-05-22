import { GameCommand } from "./types";
import { CharacterClass } from "./characters";
import { createHeroAPI } from "./api/HeroAPI";

export interface RunResult {
  commands: GameCommand[];
  error: string | null;
}

const BLOCKED_GLOBALS = [
  "window", "document", "fetch", "XMLHttpRequest",
  "eval", "Function", "import", "require",
  "process", "global", "globalThis", "__proto__",
  "localStorage", "sessionStorage", "indexedDB",
];

export function runUserCode(
  code: string,
  characterClass: CharacterClass = "warrior"
): RunResult {
  const commands: GameCommand[] = [];
  const hero = createHeroAPI(commands, characterClass);

  try {
    for (const word of BLOCKED_GLOBALS) {
      if (new RegExp(`\\b${word}\\b`).test(code)) {
        return {
          commands: [],
          error: `"${word}" is not available in the game sandbox.`,
        };
      }
    }

    // Strip Python-style # comments so the JS sandbox doesn't choke on them
    const sanitized = code.replace(/#[^\n]*/g, "");
    const fn = new Function("hero", `"use strict";\n${sanitized}`);
    fn(hero);

    return { commands, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error in your code.";
    return { commands: [], error: message };
  }
}
