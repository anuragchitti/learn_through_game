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

/**
 * Strips TypeScript-specific syntax so the JS sandbox can run the code.
 * Handles the exact subset used in the TypeScript course levels.
 */
function stripTypeScriptSyntax(code: string): string {
  let r = code;

  // 1. Remove interface blocks (multiline) — use [\s\S] instead of dotAll flag
  r = r.replace(/\binterface\s+\w+(?:<[^>]*>)?(?:\s+extends[^{]*)?\s*\{[^{}]*\}/g, "");

  // 2. Remove type alias lines
  r = r.replace(/^\s*type\s+\w+[^;]*;?\s*\n?/gm, "");

  // 3. Convert enum to const object
  r = r.replace(/\benum\s+(\w+)\s*\{([^}]*)\}/g, (_m, name, body) => {
    const entries = body
      .split(",")
      .map((e: string) => e.trim())
      .filter((e: string) => e.length > 0)
      .map((e: string) => e.replace(/^(\w+)\s*=\s*(.+)$/, "$1: $2"));
    return `const ${name} = { ${entries.join(", ")} }`;
  });

  // 4. Remove access modifiers
  r = r.replace(/\b(private|public|protected|readonly)\s+/g, "");

  // 5. Remove generic type params from function declarations: function foo<T>(
  r = r.replace(/\bfunction\s+(\w+)\s*<[^>]+>/g, "function $1");

  // 6. Remove "as Type" assertions
  r = r.replace(/\s+as\s+[\w<>[\]|&, ]+/g, "");

  // 7. Remove return type annotations: ): Type { or ): Type;
  r = r.replace(/\)\s*:\s*(?:Promise<[^>]*>|[A-Za-z][\w<>[\]|& ]*)\s*(?=[{;])/g, ") ");

  // 8. Remove variable type annotations: const/let x: Type =
  r = r.replace(/((?:const|let|var)\s+\w+)\s*:\s*[A-Za-z][\w<>[\]|& ]*(?:\[\])*\s*(?==)/g, "$1 ");

  // 9. Remove typed class property declarations: propertyName: Type =
  r = r.replace(/^(\s+)(\w+)\s*:\s*[A-Za-z][\w<>[\]|& ]*(?:\[\])*\s*(?==)/gm, "$1$2 ");

  // 10. Remove parameter type annotations: (name: Type, name?: Type)
  r = r.replace(/(\w+)\s*\??\s*:\s*[A-Za-z][\w<>[\]|& ]*(?:\[\])*\s*(?=[,)])/g, "$1");

  return r.replace(/\n{3,}/g, "\n\n");
}

export function runUserCode(
  code: string,
  characterClass: CharacterClass = "warrior",
  courseSlug?: string
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

    // Strip language-specific syntax that the JS sandbox can't handle
    let sanitized = code;
    if (courseSlug === "python") {
      sanitized = code.replace(/#[^\n]*/g, "");
    } else if (courseSlug === "typescript") {
      sanitized = stripTypeScriptSyntax(code);
    }

    const fn = new Function("hero", `"use strict";\n${sanitized}`);
    fn(hero);

    return { commands, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error in your code.";
    return { commands: [], error: message };
  }
}
