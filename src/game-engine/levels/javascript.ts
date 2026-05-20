import { LevelDefinition } from "../types";

export const javascriptLevels: LevelDefinition[] = [
  // ─── BEGINNER ───────────────────────────────────────────────────────────────
  {
    id: "js-1",
    courseId: "javascript",
    number: 1,
    title: "Your First Command",
    description: "The hero is stuck. Call a function to make them move!",
    concept: "Calling a Function",
    conceptExplanation:
      "A function is a named action. To make something happen in code, you call a function by writing its name followed by parentheses (). Here, `hero.moveRight()` tells the hero to take one step to the right.",
    codeExample: `hero.moveRight(); // moves the hero one step right`,
    starterCode: `// Move the hero to the exit door (🚪)
// Hint: call hero.moveRight() to move one step

`,
    solutionCode: `hero.moveRight();
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "empty","empty","empty","exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [{ type: "reach-exit", description: "Reach the exit door 🚪" }],
    hint: "Call hero.moveRight() three times — once per empty tile.",
    tip: "Every line of code ends with a semicolon ; — it's like a full stop in a sentence.",
  },

  {
    id: "js-2",
    courseId: "javascript",
    number: 2,
    title: "Collect the Gems",
    description: "Gems appear when you walk over them. Collect all gems and reach the exit.",
    concept: "Sequences",
    conceptExplanation:
      "Code runs line by line, top to bottom. This order is called a sequence. Each hero.moveRight() and hero.moveDown() is one instruction. The hero follows them in order.",
    codeExample: `hero.moveRight(); // step 1
hero.moveDown();  // step 2
hero.moveRight(); // step 3`,
    starterCode: `// Collect all 💎 gems and reach the exit 🚪
// The hero moves over a gem to collect it automatically

`,
    solutionCode: `hero.moveRight();
hero.moveDown();
hero.moveRight();
hero.moveRight();
hero.moveUp();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem", "wall","empty","exit","wall"],
      ["wall","empty","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Map out the path on paper first. Find a route that passes every gem.",
    tip: "Order matters! If you go right before down, you'll miss the first gem.",
  },

  {
    id: "js-3",
    courseId: "javascript",
    number: 3,
    title: "Variables Save the Day",
    description: "Use a variable to store the number of steps and move the hero.",
    concept: "Variables",
    conceptExplanation:
      "A variable is a named box that holds a value. You create one with `let`, give it a name, and assign a value with `=`. You can then use that name instead of typing the value repeatedly.",
    codeExample: `let steps = 3;
// Now 'steps' holds the number 3

// You can use it like this:
for (let i = 0; i < steps; i++) {
  hero.moveRight();
}`,
    starterCode: `// Use a variable to store the number of steps
let steps = 4;

// Now use a loop to move hero.moveRight() that many times
for (let i = 0; i < steps; i++) {
  // write your code here

}`,
    solutionCode: `let steps = 4;

for (let i = 0; i < steps; i++) {
  hero.moveRight();
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","exit","wall"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Set `steps = 4` and loop hero.moveRight() that many times.",
    tip: "Changing `steps` changes how far the hero moves — that's the power of variables.",
  },

  {
    id: "js-4",
    courseId: "javascript",
    number: 4,
    title: "Loop the Loop",
    description: "A for loop repeats code. Use it to move efficiently.",
    concept: "For Loops",
    conceptExplanation:
      "A `for` loop repeats a block of code a set number of times. The three parts are: starting point (`let i = 0`), condition to keep looping (`i < 5`), and what to change each time (`i++` means add 1).",
    codeExample: `// Moves right 5 times without copy-pasting
for (let i = 0; i < 5; i++) {
  hero.moveRight();
}`,
    starterCode: `// Move down 4 times, then right 4 times
// Use two for loops — one for each direction

`,
    solutionCode: `for (let i = 0; i < 4; i++) {
  hero.moveDown();
}
for (let i = 0; i < 4; i++) {
  hero.moveRight();
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","wall","wall","wall","wall"],
      ["wall","empty","wall","wall","wall","wall"],
      ["wall","gem", "wall","wall","wall","wall"],
      ["wall","gem", "gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Loop down 4 times first, then loop right 4 times.",
    tip: "i++ is shorthand for i = i + 1. It's how the loop tracks how many times it has run.",
  },

  {
    id: "js-5",
    courseId: "javascript",
    number: 5,
    title: "If the Path is Clear",
    description: "Enemies block the way. Use hero.attack() to clear them.",
    concept: "Conditionals (if/else)",
    conceptExplanation:
      "An `if` statement runs code only when a condition is true. `else` runs code when it's false. This lets your program make decisions — like choosing to attack if an enemy is ahead.",
    codeExample: `let hasEnemy = true;

if (hasEnemy) {
  hero.attack();  // run this if true
} else {
  hero.moveRight(); // run this if false
}`,
    starterCode: `// An enemy 👹 blocks the path — attack it first, then move!
// hero.attack() swings at whatever is directly ahead

let enemyAhead = true;

if (enemyAhead) {
  // attack the enemy

}

// then move to the exit

`,
    solutionCode: `let enemyAhead = true;

if (enemyAhead) {
  hero.attack();
}

hero.moveRight();
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","enemy","empty","empty","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "defeat-enemies", description: "Defeat the enemy 👹" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Attack first (hero.attack()), then move right three times.",
    tip: "hero.attack() hits whatever is directly in front of the hero — the direction the hero is facing.",
  },

  // ─── INTERMEDIATE ────────────────────────────────────────────────────────────
  {
    id: "js-6",
    courseId: "javascript",
    number: 6,
    title: "Functions You Define",
    description: "Create your own function to avoid repeating yourself.",
    concept: "Writing Functions",
    conceptExplanation:
      "You can define your own reusable functions using `function`. Give it a name, put the steps inside `{}`, then call it by name. This is the DRY principle — Don't Repeat Yourself.",
    codeExample: `function moveAndCollect() {
  hero.moveRight();
  hero.moveDown();
}

moveAndCollect(); // call it once
moveAndCollect(); // call it again`,
    starterCode: `// Define a function called 'collectGem' that moves right once
// then call it 3 times to collect all gems

function collectGem() {
  // write movement here
}

// call collectGem() three times below

`,
    solutionCode: `function collectGem() {
  hero.moveRight();
}

collectGem();
collectGem();
collectGem();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Define `function collectGem() { hero.moveRight(); }` then call it 3 times. Add one more moveRight() for the exit.",
    tip: "Once a function is defined, you can call it as many times as you want without rewriting the code.",
  },

  {
    id: "js-7",
    courseId: "javascript",
    number: 7,
    title: "Parameters — Functions with Input",
    description: "Pass a number into a function to control how many steps it takes.",
    concept: "Function Parameters",
    conceptExplanation:
      "Parameters let you pass information into a function. The function can use that value internally. This makes functions flexible — the same function can do different things depending on what you pass in.",
    codeExample: `function moveRight(times) {
  for (let i = 0; i < times; i++) {
    hero.moveRight();
  }
}

moveRight(3); // moves right 3 times
moveRight(1); // moves right 1 time`,
    starterCode: `// Write a function 'walkRight' that takes a 'times' parameter
// and moves right that many times

function walkRight(times) {
  // use a for loop here
}

// Use walkRight to collect gems and reach the exit
`,
    solutionCode: `function walkRight(times) {
  for (let i = 0; i < times; i++) {
    hero.moveRight();
  }
}

walkRight(2);
hero.moveDown();
hero.moveDown();
walkRight(3);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","wall","wall","wall"],
      ["wall","empty","empty","wall","wall","wall"],
      ["wall","empty","gem","gem","exit","wall"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Use walkRight(2) to get the first gem, move down twice, then walkRight(3) to get the rest.",
    tip: "Parameters are like variables that get their value from the caller, not from inside the function.",
  },

  {
    id: "js-8",
    courseId: "javascript",
    number: 8,
    title: "While Loops",
    description: "A while loop runs as long as a condition is true.",
    concept: "While Loops",
    conceptExplanation:
      "Unlike a `for` loop that runs a fixed number of times, a `while` loop keeps going as long as a condition is true. Be careful — if the condition never becomes false, you get an infinite loop!",
    codeExample: `let gemsLeft = 4;

while (gemsLeft > 0) {
  hero.moveRight();
  gemsLeft--;  // reduces by 1 each loop
}`,
    starterCode: `// Use a while loop to move the hero right until they hit the exit
// Collect all gems along the way

let steps = 5;

while (steps > 0) {
  // move right and decrease steps

}`,
    solutionCode: `let steps = 5;

while (steps > 0) {
  hero.moveRight();
  steps--;
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
    hint: "Decrease `steps` inside the loop with `steps--` so the loop eventually ends.",
    tip: "steps-- is the same as steps = steps - 1. It subtracts 1 from the variable.",
  },
];
