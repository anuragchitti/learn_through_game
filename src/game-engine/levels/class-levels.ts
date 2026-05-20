import { LevelDefinition } from "../types";

// ── WARRIOR LEVELS ────────────────────────────────────────────────────────────
export const warriorLevels: LevelDefinition[] = [
  {
    id: "warrior-1",
    courseId: "javascript",
    number: 101,
    title: "Warrior: The Charge",
    description: "Warriors can charge 2 tiles and smash through enemies in one move.",
    concept: "Warrior — charge()",
    conceptExplanation:
      "hero.charge('right') moves the warrior 2 tiles forward and defeats any enemy in the landing cell. It's faster than move + attack for close-range combat.",
    codeExample: `// Charge right: moves 2 tiles and defeats enemy on landing
hero.charge("right");

// vs the slow way:
hero.attack();
hero.moveRight();
hero.moveRight();`,
    starterCode: `// Defeat the enemy and reach the exit using charge()
// charge moves you 2 tiles and destroys any enemy you land on

hero.charge("right");
hero.moveRight();
hero.moveRight();`,
    solutionCode: `hero.charge("right");
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","enemy","empty","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "defeat-enemies", description: "Defeat the enemy 👹" },
      { type: "collect-all-gems", description: "Collect all 2 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    requiredClass: "warrior",
    hint: "charge('right') jumps 2 tiles and defeats the enemy — then move right twice.",
    tip: "charge() is 1 command instead of 3. Warriors solve problems faster with fewer lines.",
  },
  {
    id: "warrior-2",
    courseId: "javascript",
    number: 102,
    title: "Warrior: Multi-Charge",
    description: "Use charge in a loop to clear a dungeon full of enemies.",
    concept: "Loops + Class Abilities",
    conceptExplanation:
      "Combining loops with warrior abilities makes your code powerful and concise. A single for loop with charge() can clear an entire corridor faster than individual moves and attacks.",
    codeExample: `// Clear 3 enemies with a loop
for (let i = 0; i < 3; i++) {
  hero.charge("right");
}`,
    starterCode: `// Three enemies block the path — charge through them all!
// One charge() clears 2 tiles. Use a loop.

for (let i = 0; i < 3; i++) {
  hero.charge("right");
}`,
    solutionCode: `for (let i = 0; i < 3; i++) {
  hero.charge("right");
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","enemy","empty","enemy","empty","enemy","exit"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "defeat-enemies", description: "Defeat all 3 enemies 👹" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    requiredClass: "warrior",
    hint: "Each charge moves 2 tiles. 3 charges = 6 tiles — just enough to clear all 3 enemies.",
    tip: "Loops + class abilities = elegant solutions. Real game AI works the same way.",
  },
];

// ── MAGE LEVELS ───────────────────────────────────────────────────────────────
export const mageLevels: LevelDefinition[] = [
  {
    id: "mage-1",
    courseId: "javascript",
    number: 111,
    title: "Mage: Blink Past the Wall",
    description: "Blink teleports the mage 2 tiles — passing through a single wall.",
    concept: "Mage — blink()",
    conceptExplanation:
      "hero.blink('right') teleports the mage exactly 2 tiles in a direction, phasing through one wall in between. The landing cell must be empty, a gem, or the exit.",
    codeExample: `// Blink right: teleports 2 tiles, passing through 1 wall
hero.blink("right");

// A warrior would be stuck — the mage just walks through!`,
    starterCode: `// The wall blocks the path — but mages can blink through it!
// Use blink() to teleport past the wall, then collect the gems

hero.blink("right");
hero.moveRight();
hero.moveRight();`,
    solutionCode: `hero.blink("right");
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","wall","empty","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect the 💎 gem" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    requiredClass: "mage",
    hint: "blink('right') jumps from col 1, through the wall at col 2, landing at col 3.",
    tip: "Mages solve geometry problems that other classes can't. Think about what's 2 tiles away.",
  },
  {
    id: "mage-2",
    courseId: "javascript",
    number: 112,
    title: "Mage: Fireball Clear",
    description: "Destroy enemies from a distance with fireball — up to 3 tiles away.",
    concept: "Mage — fireball()",
    conceptExplanation:
      "hero.fireball('right') launches a fireball that destroys the first enemy or barrier it hits, up to 3 tiles away. Fireballs don't pass through walls.",
    codeExample: `// Destroy an enemy 3 tiles away without getting close
hero.fireball("right");
hero.moveRight();
hero.moveRight();
hero.moveRight();`,
    starterCode: `// Enemies block both rows — fireball them from safety, then navigate!

hero.fireball("right");   // destroy first enemy
hero.moveRight();
hero.moveDown();
hero.fireball("right");   // destroy second enemy
hero.moveRight();
hero.moveRight();`,
    solutionCode: `hero.fireball("right");
hero.moveRight();
hero.moveDown();
hero.fireball("right");
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","enemy","gem","wall"],
      ["wall","empty","empty","enemy","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "defeat-enemies", description: "Defeat both enemies 👹" },
      { type: "collect-all-gems", description: "Collect both 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    requiredClass: "mage",
    hint: "Fireball the first enemy, then move down, fireball the second, then navigate to the exit.",
    tip: "Mages clear paths without entering danger zones. Think before moving.",
  },
];

// ── ARCHER LEVELS ─────────────────────────────────────────────────────────────
export const archerLevels: LevelDefinition[] = [
  {
    id: "archer-1",
    courseId: "javascript",
    number: 121,
    title: "Archer: The Quick Dash",
    description: "Dash moves the archer 2 tiles instantly — perfect for covering ground fast.",
    concept: "Archer — dash()",
    conceptExplanation:
      "hero.dash('right') moves the archer 2 tiles in one command, collecting any gems along the way. It's twice as fast as moveRight() called twice.",
    codeExample: `// Dash right: 2 tiles in 1 command
hero.dash("right");

// Equivalent to:
hero.moveRight();
hero.moveRight();`,
    starterCode: `// Use dash to speed through the level!
// dash() moves 2 tiles — perfect for this wide-open corridor

hero.dash("right");
hero.dash("right");
hero.moveRight();`,
    solutionCode: `hero.dash("right");
hero.dash("right");
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","empty","exit"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    requiredClass: "archer",
    hint: "Two dashes cover 4 tiles — then one more moveRight() to reach the exit.",
    tip: "Archers solve levels with fewer commands than other classes. Think in 2-tile steps.",
  },
  {
    id: "archer-2",
    courseId: "javascript",
    number: 122,
    title: "Archer: Shoot & Move",
    description: "Shoot enemies from a distance, then dash to the exit.",
    concept: "Archer — shoot()",
    conceptExplanation:
      "hero.shoot('right') fires an arrow that hits the first enemy up to 3 tiles away. Combined with dash(), archers can clear and navigate a dungeon faster than any other class.",
    codeExample: `// Shoot the enemy 2 tiles away, then dash past
hero.shoot("right");   // enemy defeated at range
hero.dash("right");    // move 2 tiles
hero.dash("right");    // move 2 more`,
    starterCode: `// Shoot the enemies first, then dash to the exit!

hero.shoot("right");  // hits enemy in row 1
hero.moveDown();
hero.shoot("right");  // hits enemy in row 2
hero.moveUp();
hero.dash("right");
hero.dash("right");`,
    solutionCode: `hero.shoot("right");
hero.moveDown();
hero.shoot("right");
hero.moveUp();
hero.dash("right");
hero.dash("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","enemy","gem","gem","exit"],
      ["wall","empty","empty","enemy","wall","wall","wall"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "defeat-enemies", description: "Defeat both enemies 👹" },
      { type: "collect-all-gems", description: "Collect both 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    requiredClass: "archer",
    hint: "Shoot right to hit the row 1 enemy, move down, shoot right for row 2 enemy, then dash to the exit.",
    tip: "Archers think in lanes. Shoot down one lane, then speed through another.",
  },
];

export const allClassLevels = [...warriorLevels, ...mageLevels, ...archerLevels];
