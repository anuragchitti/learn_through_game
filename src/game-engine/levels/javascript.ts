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

  // ─── INTERMEDIATE ────────────────────────────────────────────────────────────
  {
    id: "js-9",
    courseId: "javascript",
    number: 9,
    title: "Arrays — Lists of Things",
    description: "Store a list of moves in an array, then loop through it to guide the hero.",
    concept: "Arrays",
    conceptExplanation:
      "An array is an ordered list of values stored in a single variable. You create one with square brackets [] and access items by index (starting at 0). Arrays are perfect for storing a sequence of moves.",
    codeExample: `let moves = ["right", "right", "down", "right"];

for (let i = 0; i < moves.length; i++) {
  hero.move(moves[i]); // uses each direction in order
}`,
    starterCode: `// Store your moves in an array, then loop through them
// hero.move("right"), hero.move("down"), hero.move("left"), hero.move("up")

let moves = ["right", "right", "down", "down", "right", "right"];

for (let i = 0; i < moves.length; i++) {
  // call hero.move() with each direction

}`,
    solutionCode: `let moves = ["right", "right", "down", "down", "right", "right"];

for (let i = 0; i < moves.length; i++) {
  hero.move(moves[i]);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","empty","wall","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","exit","wall"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The moves array already has the right directions — just call hero.move(moves[i]) inside the loop.",
    tip: "Arrays are zero-indexed: moves[0] is the first item, moves[1] is the second, and so on.",
  },

  {
    id: "js-10",
    courseId: "javascript",
    number: 10,
    title: "Array Methods — forEach",
    description: "Use forEach to loop through an array without writing a for loop manually.",
    concept: "Array.forEach()",
    conceptExplanation:
      "forEach is a built-in array method that calls a function once for each item. It's cleaner than a manual for loop. The callback receives each item as a parameter.",
    codeExample: `let gems = ["north", "east", "south"];

gems.forEach(function(direction) {
  hero.move(direction);
});

// Arrow function version (shorter):
gems.forEach(direction => hero.move(direction));`,
    starterCode: `// Use forEach to move the hero through each direction
let path = ["right", "right", "right", "down", "down", "right", "right"];

path.forEach(function(direction) {
  // move the hero in each direction

});`,
    solutionCode: `let path = ["right", "right", "right", "down", "down", "right", "right"];

path.forEach(function(direction) {
  hero.move(direction);
});`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","empty","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Call hero.move(direction) inside the forEach callback to move for each item in path.",
    tip: "forEach is one of the most used array methods in real JavaScript codebases.",
  },

  {
    id: "js-11",
    courseId: "javascript",
    number: 11,
    title: "Objects — Bundling Data",
    description: "Use an object to store the hero's stats, then read them to decide how far to move.",
    concept: "Objects",
    conceptExplanation:
      "An object groups related values together under named keys. You create one with curly braces {} and access values with dot notation (object.key) or bracket notation (object['key']).",
    codeExample: `let hero_stats = {
  name: "Aria",
  speed: 3,
  power: 2
};

console.log(hero_stats.name);  // "Aria"
console.log(hero_stats.speed); // 3`,
    starterCode: `// Read the hero's speed from the object and use it to move
let stats = {
  name: "Aria",
  speed: 4,
  direction: "right"
};

// Move the hero stats.speed times in stats.direction
for (let i = 0; i < stats.speed; i++) {
  // your code here

}`,
    solutionCode: `let stats = {
  name: "Aria",
  speed: 4,
  direction: "right"
};

for (let i = 0; i < stats.speed; i++) {
  hero.move(stats.direction);
}`,
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
    hint: "stats.speed is 4, stats.direction is 'right' — use them directly in the loop.",
    tip: "Objects let you group related data. Instead of 4 separate variables, one object keeps everything tidy.",
  },

  {
    id: "js-12",
    courseId: "javascript",
    number: 12,
    title: "Nested Loops — The Dungeon",
    description: "Navigate a grid using nested loops — one for rows, one for columns.",
    concept: "Nested Loops",
    conceptExplanation:
      "A nested loop is a loop inside a loop. The inner loop runs completely for each iteration of the outer loop. This is useful for working with grids — the outer loop handles rows, the inner handles columns.",
    codeExample: `// Move right 3 times, then down, repeat
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    hero.moveRight();
  }
  hero.moveDown();
}`,
    starterCode: `// Collect all gems in a zigzag pattern across 2 rows
// Row 1: move right 3 times
// Then move down once
// Row 2: move right 2 times to the exit

for (let col = 0; col < 3; col++) {
  // move right across row 1

}
hero.moveDown();
for (let col = 0; col < 2; col++) {
  // move right to exit

}`,
    solutionCode: `for (let col = 0; col < 3; col++) {
  hero.moveRight();
}
hero.moveDown();
for (let col = 0; col < 2; col++) {
  hero.moveRight();
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Loop right 3 times, move down once, then loop right 2 times to reach the exit.",
    tip: "Real-world grids (game boards, spreadsheets, images) are almost always handled with nested loops.",
  },

  {
    id: "js-13",
    courseId: "javascript",
    number: 13,
    title: "Arrow Functions",
    description: "Rewrite a movement function using the shorter arrow syntax.",
    concept: "Arrow Functions",
    conceptExplanation:
      "Arrow functions are a shorter way to write functions. Instead of `function(x) { return x; }`, you write `x => x`. They're especially handy as callbacks passed to forEach, map, and filter.",
    codeExample: `// Regular function:
function moveRight() { hero.moveRight(); }

// Arrow function — same thing, less code:
const moveRight = () => hero.moveRight();

// With a parameter:
const move = (dir) => hero.move(dir);`,
    starterCode: `// Define move as an arrow function that takes a direction
const move = (dir) => hero.move(dir);

// Now use it to navigate to the exit
let path = ["right", "right", "down", "right", "right", "right"];

path.forEach(dir => move(dir));`,
    solutionCode: `const move = (dir) => hero.move(dir);

let path = ["right", "right", "down", "right", "right", "right"];

path.forEach(dir => move(dir));`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","wall","wall","wall","wall"],
      ["wall","wall","empty","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The starter code is almost complete — just run it and see if the path is correct.",
    tip: "Arrow functions don't have their own `this` binding — that matters a lot in React and class-based code.",
  },

  {
    id: "js-14",
    courseId: "javascript",
    number: 14,
    title: "Array map() — Transform a List",
    description: "Use map() to convert a list of numbers into a list of directions.",
    concept: "Array.map()",
    conceptExplanation:
      "map() creates a new array by transforming every item with a function. The original array is unchanged. It's one of the most powerful functional programming tools in JavaScript.",
    codeExample: `let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2);
// doubled is [2, 4, 6]

// Mapping numbers to directions:
let codes = [1, 2, 1];
let dirs = codes.map(c => c === 1 ? "right" : "down");
// dirs is ["right", "down", "right"]`,
    starterCode: `// Map the number codes to directions, then move the hero
// 1 = "right", 2 = "down"

let codes = [1, 1, 2, 2, 1, 1, 1];

let directions = codes.map(code => {
  if (code === 1) return "right";
  if (code === 2) return "down";
});

directions.forEach(dir => hero.move(dir));`,
    solutionCode: `let codes = [1, 1, 2, 2, 1, 1, 1];

let directions = codes.map(code => {
  if (code === 1) return "right";
  if (code === 2) return "down";
});

directions.forEach(dir => hero.move(dir));`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","empty","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The starter code is complete — just run it to see map() in action.",
    tip: "map() never changes the original array. It always returns a brand-new one.",
  },

  {
    id: "js-15",
    courseId: "javascript",
    number: 15,
    title: "Array filter() — Skip the Bad Tiles",
    description: "Use filter() to remove blocked moves before sending the hero.",
    concept: "Array.filter()",
    conceptExplanation:
      "filter() creates a new array containing only the items where the callback returns true. Items where it returns false are excluded. It's perfect for removing unwanted values from a list.",
    codeExample: `let numbers = [1, -2, 3, -4, 5];
let positives = numbers.filter(n => n > 0);
// positives is [1, 3, 5]

// Filter valid directions only:
let moves = ["right", "stop", "down", "stop", "right"];
let valid = moves.filter(m => m !== "stop");
// valid is ["right", "down", "right"]`,
    starterCode: `// Some moves in the list are "blocked" — filter them out first!
let allMoves = ["right", "blocked", "right", "down", "blocked", "right", "right", "right"];

// Filter to keep only non-"blocked" moves
let validMoves = allMoves.filter(move => move !== "blocked");

// Then execute them
validMoves.forEach(dir => hero.move(dir));`,
    solutionCode: `let allMoves = ["right", "blocked", "right", "down", "blocked", "right", "right", "right"];

let validMoves = allMoves.filter(move => move !== "blocked");

validMoves.forEach(dir => hero.move(dir));`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The code is already written correctly — run it and watch filter() remove the blocked moves.",
    tip: "filter() + map() + forEach() together are called 'array combinators' — the core of modern JavaScript.",
  },

  {
    id: "js-16",
    courseId: "javascript",
    number: 16,
    title: "Switch Statements",
    description: "Use a switch to pick a direction based on an enemy type.",
    concept: "Switch Statements",
    conceptExplanation:
      "A switch statement compares a value against multiple cases and runs the matching block. It's cleaner than a long chain of if/else if when you're checking one variable against many possible values.",
    codeExample: `let enemy = "goblin";

switch (enemy) {
  case "goblin":
    hero.moveRight();
    break;
  case "dragon":
    hero.moveDown();
    break;
  default:
    hero.wait();
}`,
    starterCode: `// Use a switch to choose the right move for each command
let commands = ["go-right", "go-down", "go-right", "go-right", "go-down", "go-right"];

commands.forEach(cmd => {
  switch (cmd) {
    case "go-right":
      // move right
      break;
    case "go-down":
      // move down
      break;
    default:
      hero.wait();
  }
});`,
    solutionCode: `let commands = ["go-right", "go-down", "go-right", "go-right", "go-down", "go-right"];

commands.forEach(cmd => {
  switch (cmd) {
    case "go-right":
      hero.moveRight();
      break;
    case "go-down":
      hero.moveDown();
      break;
    default:
      hero.wait();
  }
});`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","empty","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Add hero.moveRight() under 'go-right' and hero.moveDown() under 'go-down'.",
    tip: "Always include break at the end of each case, or the code will 'fall through' into the next case.",
  },

  {
    id: "js-17",
    courseId: "javascript",
    number: 17,
    title: "Recursion — The Hero Calls Itself",
    description: "Write a recursive function that moves the hero until it reaches the exit.",
    concept: "Recursion",
    conceptExplanation:
      "Recursion is when a function calls itself. Every recursive function needs a base case (when to stop) and a recursive case (what to do and call itself again). Without a base case you get infinite recursion — like an infinite loop.",
    codeExample: `function countdown(n) {
  if (n <= 0) return; // base case — stop!
  hero.moveRight();
  countdown(n - 1);  // recursive call
}

countdown(5); // moves right 5 times`,
    starterCode: `// Write a recursive function that moves right 'steps' times
function march(steps) {
  if (steps <= 0) return; // base case

  hero.moveRight();
  march(steps - 1); // recursive call
}

march(5);`,
    solutionCode: `function march(steps) {
  if (steps <= 0) return;

  hero.moveRight();
  march(steps - 1);
}

march(5);`,
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
    hint: "march(5) moves right 5 times. It calls itself with steps-1 until steps hits 0.",
    tip: "Every recursive problem can also be solved with a loop — but recursion shines on tree structures and divide-and-conquer problems.",
  },

  {
    id: "js-18",
    courseId: "javascript",
    number: 18,
    title: "try / catch — Handle the Unexpected",
    description: "Wrap risky code in try/catch so the hero survives errors.",
    concept: "try / catch",
    conceptExplanation:
      "try/catch lets you run code that might throw an error without crashing the whole program. The try block runs normally; if an error occurs, the catch block runs instead of crashing.",
    codeExample: `try {
  hero.move("diagonal"); // invalid direction!
} catch (error) {
  hero.say("Invalid move: " + error.message);
  hero.moveRight(); // fallback
}`,
    starterCode: `// Some directions in this list are invalid — catch the error and skip them
let moves = ["right", "diagonal", "right", "down", "sideways", "right", "right", "right"];

moves.forEach(dir => {
  try {
    hero.move(dir);
  } catch (err) {
    // say the error message and continue
    hero.say("Skipping: " + err.message);
  }
});`,
    solutionCode: `let moves = ["right", "diagonal", "right", "down", "sideways", "right", "right", "right"];

moves.forEach(dir => {
  try {
    hero.move(dir);
  } catch (err) {
    hero.say("Skipping: " + err.message);
  }
});`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The invalid moves ('diagonal', 'sideways') throw errors — the catch block skips them gracefully.",
    tip: "In production code, always log or handle errors in catch — never silently ignore them.",
  },

  {
    id: "js-19",
    courseId: "javascript",
    number: 19,
    title: "Closures — Remembering State",
    description: "Create a counter using a closure to track how many steps the hero has taken.",
    concept: "Closures",
    conceptExplanation:
      "A closure is a function that remembers the variables from its outer scope even after that scope has finished. This lets you create private state — like a step counter the hero carries around.",
    codeExample: `function makeCounter() {
  let count = 0;         // private variable
  return function() {
    count++;             // remembers 'count'
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2`,
    starterCode: `// Create a step counter using a closure
function makeStepCounter() {
  let steps = 0;
  return function() {
    steps++;
    hero.moveRight();
    if (steps === 5) {
      hero.say("Took " + steps + " steps!");
    }
  };
}

const step = makeStepCounter();

// Call step() 5 times to reach the exit
step();
step();
step();
step();
step();`,
    solutionCode: `function makeStepCounter() {
  let steps = 0;
  return function() {
    steps++;
    hero.moveRight();
    if (steps === 5) {
      hero.say("Took " + steps + " steps!");
    }
  };
}

const step = makeStepCounter();

step();
step();
step();
step();
step();`,
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
    hint: "The code is complete — run it and watch the hero say the step count on step 5.",
    tip: "Closures are how module patterns, React hooks (like useState), and many libraries maintain private state.",
  },

  {
    id: "js-20",
    courseId: "javascript",
    number: 20,
    title: "The Final Dungeon",
    description: "Use everything you've learned — loops, functions, arrays, objects — to conquer the final level.",
    concept: "Putting It All Together",
    conceptExplanation:
      "This final level combines variables, arrays, objects, loops, functions, and conditionals. Real programs aren't just one concept — they weave all of these together. You're ready.",
    codeExample: `// Combine everything:
const config = { rows: 2, cols: 3 };
const moves = [];

for (let r = 0; r < config.rows; r++) {
  for (let c = 0; c < config.cols; c++) {
    moves.push("right");
  }
  if (r < config.rows - 1) moves.push("down");
}

moves.forEach(dir => hero.move(dir));`,
    starterCode: `// Final challenge — navigate the dungeon your way!
// Collect all gems and reach the exit.
// Use any combination of loops, functions, arrays, or objects.

function navigate() {
  // your solution here

}

navigate();`,
    solutionCode: `function navigate() {
  let phase1 = ["right", "right", "right"];
  let phase2 = ["down", "right", "right", "right"];
  let phase3 = ["down", "right", "right"];

  [phase1, phase2, phase3].forEach(phase => {
    phase.forEach(dir => hero.move(dir));
  });
}

navigate();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Break the dungeon into phases: move right 3, then down and right, then down and right to exit.",
    tip: "Congratulations — you've completed the JavaScript track! You know enough to build real projects.",
  },
];
