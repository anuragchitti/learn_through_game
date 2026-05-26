import { LevelDefinition } from "../types";

export const typescriptLevels: LevelDefinition[] = [
  {
    id: "ts-1",
    courseId: "typescript",
    number: 1,
    title: "Your First Type Annotation",
    description: "TypeScript adds types to JavaScript. Annotate a variable to get started.",
    concept: "Type Annotations",
    conceptExplanation:
      "TypeScript lets you annotate variables with `: type`. Common primitives: `string`, `number`, `boolean`. Type annotations are removed at compile time — they exist only to catch bugs early and improve autocomplete.",
    codeExample: `let name: string = "Alice";
let age: number = 30;
let active: boolean = true;`,
    starterCode: `// Move the hero right using a typed steps variable
const steps: number = 3;

for (let i = 0; i < steps; i++) {
  hero.moveRight();
}`,
    solutionCode: `const steps: number = 3;

for (let i = 0; i < steps; i++) {
  hero.moveRight();
}`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","exit"],
      ["wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "steps is typed as number — the loop runs exactly 3 times.",
    tip: "TypeScript infers types when you initialise: `const steps = 3` also knows it's a number.",
  },

  {
    id: "ts-2",
    courseId: "typescript",
    number: 2,
    title: "Function Types",
    description: "Add parameter and return type annotations to a movement function.",
    concept: "Typed Functions",
    conceptExplanation:
      "TypeScript functions can annotate each parameter and the return type. `function name(param: Type): ReturnType {}`. Use `void` when a function returns nothing. This prevents calling functions with wrong argument types.",
    codeExample: `function greet(name: string): string {
  return "Hello, " + name;
}

function logMove(dir: string): void {
  console.log("Moving: " + dir);
}`,
    starterCode: `function moveSteps(direction: string, count: number): void {
  for (let i = 0; i < count; i++) {
    hero.move(direction);
  }
}

moveSteps("right", 3);
moveSteps("down", 1);
moveSteps("right", 2);`,
    solutionCode: `function moveSteps(direction: string, count: number): void {
  for (let i = 0; i < count; i++) {
    hero.move(direction);
  }
}

moveSteps("right", 3);
moveSteps("down", 1);
moveSteps("right", 2);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "moveSteps takes a direction string and a count number — TypeScript enforces both.",
    tip: "Return type `void` explicitly documents that a function has no useful return value.",
  },

  {
    id: "ts-3",
    courseId: "typescript",
    number: 3,
    title: "Interfaces",
    description: "Define an interface to describe the shape of a move config object.",
    concept: "Interfaces",
    conceptExplanation:
      "Interfaces define the shape (structure) of an object — what properties it has and their types. They're TypeScript-only (erased at runtime). Any object with the right properties satisfies the interface — this is called structural typing.",
    codeExample: `interface Point {
  x: number;
  y: number;
}

function distance(p: Point): number {
  return Math.sqrt(p.x ** 2 + p.y ** 2);
}`,
    starterCode: `interface MoveConfig {
  direction: string;
  steps: number;
}

function execute(config: MoveConfig): void {
  for (let i = 0; i < config.steps; i++) {
    hero.move(config.direction);
  }
}

const configs: MoveConfig[] = [
  { direction: "right", steps: 3 },
  { direction: "down", steps: 1 },
  { direction: "right", steps: 2 },
];

for (const cfg of configs) {
  execute(cfg);
}`,
    solutionCode: `interface MoveConfig {
  direction: string;
  steps: number;
}

function execute(config: MoveConfig): void {
  for (let i = 0; i < config.steps; i++) {
    hero.move(config.direction);
  }
}

const configs: MoveConfig[] = [
  { direction: "right", steps: 3 },
  { direction: "down", steps: 1 },
  { direction: "right", steps: 2 },
];

for (const cfg of configs) {
  execute(cfg);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "MoveConfig[] is an array of MoveConfig objects — TypeScript checks every element.",
    tip: "Interfaces document intent. Future you (and teammates) know exactly what shape is expected.",
  },

  {
    id: "ts-4",
    courseId: "typescript",
    number: 4,
    title: "Union Types",
    description: "Use a union type to allow only valid directions.",
    concept: "Union Types",
    conceptExplanation:
      "A union type `A | B` means a value can be either A or B. Use them to express 'one of these specific values'. Combined with string literals, they create type-safe enumerations without an enum declaration.",
    codeExample: `type Direction = "up" | "down" | "left" | "right";

function move(dir: Direction): void {
  // TypeScript error if you pass "diagonal"
  hero.move(dir);
}`,
    starterCode: `type Direction = "up" | "down" | "left" | "right";

function step(dir: Direction): void {
  hero.move(dir);
}

const path: Direction[] = ["right", "right", "down", "right", "right"];

for (const d of path) {
  step(d);
}`,
    solutionCode: `type Direction = "up" | "down" | "left" | "right";

function step(dir: Direction): void {
  hero.move(dir);
}

const path: Direction[] = ["right", "right", "down", "right", "right"];

for (const d of path) {
  step(d);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Direction[] means every element must be one of the four allowed strings.",
    tip: "Union types with string literals are safer than plain `string` — TypeScript catches typos like 'riight'.",
  },

  {
    id: "ts-5",
    courseId: "typescript",
    number: 5,
    title: "Type Aliases",
    description: "Create a type alias for a move tuple and use it throughout your code.",
    concept: "Type Aliases with type",
    conceptExplanation:
      "`type` creates an alias for any type expression — primitives, objects, tuples, unions. Unlike interfaces, type aliases can alias union types and primitives. Interfaces are for object shapes; type aliases are for everything else.",
    codeExample: `type UserID = number;
type Move = [string, number];  // tuple: [direction, steps]

const m: Move = ["right", 3];
const [dir, steps] = m;`,
    starterCode: `type Direction = "up" | "down" | "left" | "right";
type Move = [Direction, number];  // [direction, steps]

const route: Move[] = [
  ["right", 3],
  ["down", 1],
  ["right", 3],
];

for (const [dir, steps] of route) {
  for (let i = 0; i < steps; i++) {
    hero.move(dir);
  }
}`,
    solutionCode: `type Direction = "up" | "down" | "left" | "right";
type Move = [Direction, number];

const route: Move[] = [
  ["right", 3],
  ["down", 1],
  ["right", 3],
];

for (const [dir, steps] of route) {
  for (let i = 0; i < steps; i++) {
    hero.move(dir);
  }
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Destructuring `[dir, steps]` in the for loop unpacks each Move tuple.",
    tip: "Use `interface` for object shapes you'll extend. Use `type` for unions, tuples, and aliases.",
  },

  {
    id: "ts-6",
    courseId: "typescript",
    number: 6,
    title: "Optional Properties",
    description: "Use optional properties in an interface to allow flexible configs.",
    concept: "Optional & Readonly",
    conceptExplanation:
      "Interface properties can be marked optional with `?:` — they may or may not be present. `readonly` prevents reassignment after creation. These are compile-time only — the JavaScript output has no trace of them.",
    codeExample: `interface Config {
  speed: number;
  direction?: string;  // optional
  readonly id: string; // can't reassign
}

const cfg: Config = { speed: 3, id: "x" };
cfg.speed = 5;      // OK
// cfg.id = "y";    // Error: readonly`,
    starterCode: `interface MoveOptions {
  direction: string;
  steps: number;
  repeat?: number;  // optional — defaults to 1
}

function doMove(opts: MoveOptions): void {
  const times = opts.repeat ?? 1;
  for (let r = 0; r < times; r++) {
    for (let i = 0; i < opts.steps; i++) {
      hero.move(opts.direction);
    }
  }
}

doMove({ direction: "right", steps: 3 });
doMove({ direction: "down", steps: 1 });
doMove({ direction: "right", steps: 2 });`,
    solutionCode: `interface MoveOptions {
  direction: string;
  steps: number;
  repeat?: number;
}

function doMove(opts: MoveOptions): void {
  const times = opts.repeat ?? 1;
  for (let r = 0; r < times; r++) {
    for (let i = 0; i < opts.steps; i++) {
      hero.move(opts.direction);
    }
  }
}

doMove({ direction: "right", steps: 3 });
doMove({ direction: "down", steps: 1 });
doMove({ direction: "right", steps: 2 });`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "`opts.repeat ?? 1` uses nullish coalescing — falls back to 1 when repeat is undefined.",
    tip: "Optional properties beat having many overloaded functions — one function handles all cases.",
  },

  {
    id: "ts-7",
    courseId: "typescript",
    number: 7,
    title: "Generics",
    description: "Write a generic function that works with any type of sequence.",
    concept: "Generics",
    conceptExplanation:
      "Generics let you write reusable code that works with any type. `function identity<T>(x: T): T` accepts any type and returns the same type. The `<T>` is a type parameter — a placeholder filled in when the function is called.",
    codeExample: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first([1, 2, 3]);        // returns number
first(["a", "b"]);       // returns string
first<boolean>([true]);  // explicit`,
    starterCode: `function repeat<T>(item: T, times: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(item);
  }
  return result;
}

const moves = repeat("right", 5);

for (const m of moves) {
  hero.move(m);
}`,
    solutionCode: `function repeat<T>(item: T, times: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < times; i++) {
    result.push(item);
  }
  return result;
}

const moves = repeat("right", 5);

for (const m of moves) {
  hero.move(m);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "repeat<string>('right', 5) — TypeScript infers T=string from the first argument.",
    tip: "Generics eliminate duplication: one generic function beats writing the same logic for string[], number[], etc.",
  },

  {
    id: "ts-8",
    courseId: "typescript",
    number: 8,
    title: "Enums",
    description: "Replace magic strings with a TypeScript enum for directions.",
    concept: "Enums",
    conceptExplanation:
      "Enums define named constants. `enum Direction { Up = 'up', Down = 'down' }`. String enums are most common — they produce readable values at runtime. Unlike union types, enums exist at runtime as objects.",
    codeExample: `enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

const s: Status = Status.Active;
console.log(s); // "active"`,
    starterCode: `enum Dir {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

const path = [Dir.Right, Dir.Right, Dir.Down, Dir.Right, Dir.Right];

for (const d of path) {
  hero.move(d);
}`,
    solutionCode: `enum Dir {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

const path = [Dir.Right, Dir.Right, Dir.Down, Dir.Right, Dir.Right];

for (const d of path) {
  hero.move(d);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Dir.Right evaluates to the string 'right' at runtime — hero.move() receives it correctly.",
    tip: "Prefer union types over enums for simple cases. Use enums when you need the runtime object or iteration.",
  },

  {
    id: "ts-9",
    courseId: "typescript",
    number: 9,
    title: "Classes with Types",
    description: "Build a typed Navigator class with typed properties and methods.",
    concept: "Typed Classes",
    conceptExplanation:
      "TypeScript classes have typed properties declared at the top of the class. Access modifiers `public`, `private`, and `protected` control visibility. `private` members are accessible only within the class.",
    codeExample: `class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  getCount(): number {
    return this.count;
  }
}`,
    starterCode: `class Navigator {
  private moves: string[] = [];

  go(direction: string, steps: number = 1): void {
    for (let i = 0; i < steps; i++) {
      hero.move(direction);
      this.moves.push(direction);
    }
  }

  getMoveCount(): number {
    return this.moves.length;
  }
}

const nav = new Navigator();
nav.go("right", 3);
nav.go("down", 1);
nav.go("right", 3);`,
    solutionCode: `class Navigator {
  private moves: string[] = [];

  go(direction: string, steps: number = 1): void {
    for (let i = 0; i < steps; i++) {
      hero.move(direction);
      this.moves.push(direction);
    }
  }

  getMoveCount(): number {
    return this.moves.length;
  }
}

const nav = new Navigator();
nav.go("right", 3);
nav.go("down", 1);
nav.go("right", 3);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "nav.go('right', 3) calls go with direction='right' and steps=3.",
    tip: "`private` prevents bugs from outside code accidentally mutating internal state.",
  },

  {
    id: "ts-10",
    courseId: "typescript",
    number: 10,
    title: "Intersection Types",
    description: "Combine two interfaces with an intersection type to create a richer config.",
    concept: "Intersection Types",
    conceptExplanation:
      "An intersection type `A & B` means a value must satisfy both A and B — it has all properties of both. Use intersections to compose types without inheritance. The result type has every property from every member.",
    codeExample: `interface Nameable { name: string }
interface Scoreable { score: number }

type Player = Nameable & Scoreable;

const p: Player = { name: "Ali", score: 100 };`,
    starterCode: `interface Positioned {
  startRow: number;
  startCol: number;
}

interface Routed {
  path: string[];
}

type Mission = Positioned & Routed;

function runMission(m: Mission): void {
  for (const step of m.path) {
    hero.move(step);
  }
}

const mission: Mission = {
  startRow: 1,
  startCol: 1,
  path: ["right", "right", "down", "right", "right"],
};

runMission(mission);`,
    solutionCode: `interface Positioned {
  startRow: number;
  startCol: number;
}

interface Routed {
  path: string[];
}

type Mission = Positioned & Routed;

function runMission(m: Mission): void {
  for (const step of m.path) {
    hero.move(step);
  }
}

const mission: Mission = {
  startRow: 1,
  startCol: 1,
  path: ["right", "right", "down", "right", "right"],
};

runMission(mission);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Mission requires ALL properties from Positioned AND Routed — TypeScript enforces both.",
    tip: "Use intersection types to mix in concerns (logging, auth, routing) without deep inheritance.",
  },

  {
    id: "ts-11",
    courseId: "typescript",
    number: 11,
    title: "Type Guards",
    description: "Use a type guard to narrow a union type before acting on it.",
    concept: "Type Guards & Narrowing",
    conceptExplanation:
      "TypeScript narrows types inside conditionals. `typeof x === 'string'` narrows x to string in that branch. You can also write custom type guard functions that return `x is Type` — a special return type that tells TypeScript what the value is.",
    codeExample: `type Command = string | { direction: string; steps: number };

function isObject(cmd: Command): cmd is { direction: string; steps: number } {
  return typeof cmd === "object";
}

function execute(cmd: Command) {
  if (isObject(cmd)) {
    // TypeScript knows cmd.direction exists here
  }
}`,
    starterCode: `type Cmd = string | { direction: string; steps: number };

function runCmd(cmd: Cmd): void {
  if (typeof cmd === "string") {
    hero.move(cmd);
  } else {
    for (let i = 0; i < cmd.steps; i++) {
      hero.move(cmd.direction);
    }
  }
}

const commands: Cmd[] = [
  "right",
  { direction: "right", steps: 2 },
  "down",
  { direction: "right", steps: 2 },
];

for (const cmd of commands) {
  runCmd(cmd);
}`,
    solutionCode: `type Cmd = string | { direction: string; steps: number };

function runCmd(cmd: Cmd): void {
  if (typeof cmd === "string") {
    hero.move(cmd);
  } else {
    for (let i = 0; i < cmd.steps; i++) {
      hero.move(cmd.direction);
    }
  }
}

const commands: Cmd[] = [
  "right",
  { direction: "right", steps: 2 },
  "down",
  { direction: "right", steps: 2 },
];

for (const cmd of commands) {
  runCmd(cmd);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "typeof cmd === 'string' narrows the type — in the else branch TypeScript knows it's the object.",
    tip: "Type guards are how TypeScript handles runtime uncertainty — narrow first, then act.",
  },

  {
    id: "ts-12",
    courseId: "typescript",
    number: 12,
    title: "Utility Types",
    description: "Use Partial<T> and Readonly<T> to transform an existing interface.",
    concept: "Utility Types",
    conceptExplanation:
      "TypeScript ships built-in utility types: `Partial<T>` makes all properties optional, `Required<T>` makes all required, `Readonly<T>` prevents mutation, `Pick<T, K>` selects properties, `Omit<T, K>` excludes them. They're built from mapped types.",
    codeExample: `interface User { name: string; age: number }

type PartialUser = Partial<User>;
// { name?: string; age?: number }

type ReadonlyUser = Readonly<User>;
// can't reassign any property`,
    starterCode: `interface HeroConfig {
  direction: string;
  steps: number;
  repeat: number;
}

// Partial lets us provide only some fields; rest get defaults
function buildConfig(overrides: Partial<HeroConfig>): HeroConfig {
  return {
    direction: "right",
    steps: 2,
    repeat: 1,
    ...overrides,
  };
}

function runConfig(cfg: Readonly<HeroConfig>): void {
  for (let r = 0; r < cfg.repeat; r++) {
    for (let i = 0; i < cfg.steps; i++) {
      hero.move(cfg.direction);
    }
  }
}

runConfig(buildConfig({ steps: 3 }));
runConfig(buildConfig({ direction: "down", steps: 1 }));
runConfig(buildConfig({ steps: 3 }));`,
    solutionCode: `interface HeroConfig {
  direction: string;
  steps: number;
  repeat: number;
}

function buildConfig(overrides: Partial<HeroConfig>): HeroConfig {
  return {
    direction: "right",
    steps: 2,
    repeat: 1,
    ...overrides,
  };
}

function runConfig(cfg: Readonly<HeroConfig>): void {
  for (let r = 0; r < cfg.repeat; r++) {
    for (let i = 0; i < cfg.steps; i++) {
      hero.move(cfg.direction);
    }
  }
}

runConfig(buildConfig({ steps: 3 }));
runConfig(buildConfig({ direction: "down", steps: 1 }));
runConfig(buildConfig({ steps: 3 }));`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Spread `...overrides` after the defaults so provided values override them.",
    tip: "Partial<T> is everywhere in React — it's how component prop updates and setState work.",
  },

  {
    id: "ts-13",
    courseId: "typescript",
    number: 13,
    title: "Mapped Types",
    description: "Create a mapped type that transforms a direction map into move counts.",
    concept: "Mapped Types",
    conceptExplanation:
      "Mapped types iterate over union types to build new object types: `{ [K in Keys]: Value }`. They're how utility types like `Partial` and `Readonly` are implemented internally. Powerful for systematic type transformations.",
    codeExample: `type Flags<T> = {
  [K in keyof T]: boolean;
};

interface Config { speed: number; muted: boolean }
type ConfigFlags = Flags<Config>;
// { speed: boolean; muted: boolean }`,
    starterCode: `type Direction = "up" | "down" | "left" | "right";
type MoveCounts = { [K in Direction]: number };

const counts: MoveCounts = {
  up: 0,
  down: 1,
  left: 0,
  right: 5,
};

for (const [dir, steps] of Object.entries(counts) as [Direction, number][]) {
  for (let i = 0; i < steps; i++) {
    hero.move(dir);
  }
}`,
    solutionCode: `type Direction = "up" | "down" | "left" | "right";
type MoveCounts = { [K in Direction]: number };

const counts: MoveCounts = {
  up: 0,
  down: 1,
  left: 0,
  right: 5,
};

for (const [dir, steps] of Object.entries(counts) as [Direction, number][]) {
  for (let i = 0; i < steps; i++) {
    hero.move(dir);
  }
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Object.entries gives [key, value] pairs — cast to [Direction, number][] to keep types.",
    tip: "Mapped types ensure every key in a union is covered — TypeScript errors if you miss one.",
  },

  {
    id: "ts-14",
    courseId: "typescript",
    number: 14,
    title: "Async / Await Types",
    description: "Type a Promise-returning function and await it to get the path.",
    concept: "Async Functions & Promise<T>",
    conceptExplanation:
      "`async` functions return `Promise<T>`. TypeScript infers the resolved type. Type annotations: `async function fetch(): Promise<string[]>`. `await` unwraps the Promise — TypeScript knows the awaited type automatically.",
    codeExample: `async function getUser(): Promise<{ name: string }> {
  return { name: "Alice" };
}

const user = await getUser(); // type: { name: string }`,
    starterCode: `async function getPath(): Promise<string[]> {
  return ["right", "right", "down", "right", "right", "right"];
}

async function main(): Promise<void> {
  const path = await getPath();
  for (const step of path) {
    hero.move(step);
  }
}

main();`,
    solutionCode: `async function getPath(): Promise<string[]> {
  return ["right", "right", "down", "right", "right", "right"];
}

async function main(): Promise<void> {
  const path = await getPath();
  for (const step of path) {
    hero.move(step);
  }
}

main();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "main() is async so you can await getPath() inside it — TypeScript knows path is string[].",
    tip: "Always annotate async function return types explicitly — it makes Promise chains easier to follow.",
  },

  {
    id: "ts-15",
    courseId: "typescript",
    number: 15,
    title: "TypeScript Grand Finale",
    description: "The ultimate TypeScript dungeon — generics, types, classes, and more.",
    concept: "TypeScript Mastery",
    conceptExplanation:
      "You've learned TypeScript's full type system: primitives, interfaces, unions, generics, enums, utility types, mapped types, type guards, and async types. TypeScript makes large codebases maintainable and catches entire classes of bugs before they ship.",
    codeExample: `// Everything comes together
interface Step<T> {
  data: T;
  execute(data: T): void;
}`,
    starterCode: `type Direction = "up" | "down" | "left" | "right";

interface Phase {
  direction: Direction;
  steps: number;
}

class DungeonPlan {
  private phases: Phase[] = [];

  add(direction: Direction, steps: number): this {
    this.phases.push({ direction, steps });
    return this;  // fluent API
  }

  execute(): void {
    for (const { direction, steps } of this.phases) {
      for (let i = 0; i < steps; i++) {
        hero.move(direction);
      }
    }
  }
}

new DungeonPlan()
  .add("right", 4)
  .add("down", 1)
  .add("right", 3)
  .add("down", 1)
  .add("right", 2)
  .execute();`,
    solutionCode: `type Direction = "up" | "down" | "left" | "right";

interface Phase {
  direction: Direction;
  steps: number;
}

class DungeonPlan {
  private phases: Phase[] = [];

  add(direction: Direction, steps: number): this {
    this.phases.push({ direction, steps });
    return this;
  }

  execute(): void {
    for (const { direction, steps } of this.phases) {
      for (let i = 0; i < steps; i++) {
        hero.move(direction);
      }
    }
  }
}

new DungeonPlan()
  .add("right", 4)
  .add("down", 1)
  .add("right", 3)
  .add("down", 1)
  .add("right", 2)
  .execute();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","wall","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 7 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The fluent API chains — each .add() returns `this` so the next call works immediately.",
    tip: "Congratulations! TypeScript is a superpower. You're now equipped to build large-scale apps with confidence.",
  },
];
