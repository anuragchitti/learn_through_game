import { LevelDefinition } from "../types";

export const pythonLevels: LevelDefinition[] = [
  {
    id: "py-1",
    courseId: "python",
    number: 1,
    title: "Your First Python Command",
    description: "Python uses the same hero API. Call moveRight() to start!",
    concept: "Calling Functions in Python",
    conceptExplanation:
      "In Python, you call a function the same way — name followed by parentheses. There's no semicolon at the end. Python uses indentation (spaces) to group code instead of curly braces.",
    codeExample: `hero.moveRight()  # no semicolon needed in Python`,
    starterCode: `# Move the hero to the exit door
# Call hero.moveRight() to move one step right

`,
    solutionCode: `hero.moveRight()
hero.moveRight()
hero.moveRight()`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","empty","empty","exit","wall"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [{ type: "reach-exit", description: "Reach the exit 🚪" }],
    hint: "Call hero.moveRight() three times — one per empty tile.",
    tip: "Python doesn't need semicolons. Each line is one statement.",
  },
  {
    id: "py-2",
    courseId: "python",
    number: 2,
    title: "Python For Loops",
    description: "Python's for loop uses `range()`. Loop to collect all gems.",
    concept: "For Loops with range()",
    conceptExplanation:
      "Python's `for` loop with `range(n)` runs a block of code n times. The `in` keyword iterates over the range. Indentation (4 spaces) defines what's inside the loop.",
    codeExample: `for i in range(5):
    hero.moveRight()  # runs 5 times`,
    starterCode: `# Use a for loop to move right and collect all gems

for i in range(4):
    # your code here

`,
    solutionCode: `for i in range(4):
    hero.moveRight()`,
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
    hint: "range(4) gives numbers 0,1,2,3 — so the loop runs 4 times.",
    tip: "In Python, indentation IS the code structure. Always indent inside loops.",
  },
];
