import { GameCommand } from "./types";
import { createHeroAPI } from "./api/HeroAPI";

export interface RunResult {
  commands: GameCommand[];
  error: string | null;
}

/**
 * Executes user-submitted code in a sandboxed scope.
 * The only global available is `hero`.
 * Returns the collected commands (no DOM/network access).
 */
export function runUserCode(code: string): RunResult {
  const commands: GameCommand[] = [];
  const hero = createHeroAPI(commands);

  try {
    // Sanitize: block obvious escapes
    const blocked = [
      "window", "document", "fetch", "XMLHttpRequest",
      "eval", "Function", "import", "require",
      "process", "global", "globalThis", "__proto__",
      "localStorage", "sessionStorage", "indexedDB",
    ];

    for (const word of blocked) {
      if (new RegExp(`\\b${word}\\b`).test(code)) {
        return {
          commands: [],
          error: `"${word}" is not available in the game sandbox.`,
        };
      }
    }

    // Wrap in an IIFE to limit scope
    const fn = new Function("hero", `"use strict";\n${code}`);
    fn(hero);

    return { commands, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error in your code.";
    return { commands: [], error: message };
  }
}
