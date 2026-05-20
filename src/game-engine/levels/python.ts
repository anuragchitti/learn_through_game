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

  {
    id: "py-3",
    courseId: "python",
    number: 3,
    title: "Python Lists",
    description: "Store moves in a Python list and iterate with a for-in loop.",
    concept: "Lists & for-in Loops",
    conceptExplanation:
      "Python lists are like JavaScript arrays — ordered collections of values in square brackets. Python's `for item in list:` loop is more readable than index-based loops and works directly on each element.",
    codeExample: `moves = ["right", "right", "down", "right"]

for direction in moves:
    hero.move(direction)  # called once per item`,
    starterCode: `# Build a list of moves and iterate over it
moves = ["right", "right", "down", "down", "right", "right"]

for direction in moves:
    # move the hero
`,
    solutionCode: `moves = ["right", "right", "down", "down", "right", "right"]

for direction in moves:
    hero.move(direction)`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","empty","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","exit","wall"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Call hero.move(direction) inside the for loop.",
    tip: "Python's for-in loop is cleaner than index-based loops — use it whenever you need every item.",
  },

  {
    id: "py-4",
    courseId: "python",
    number: 4,
    title: "Python Functions",
    description: "Define a Python function using def and call it to move the hero.",
    concept: "Defining Functions with def",
    conceptExplanation:
      "In Python, you define functions with the `def` keyword followed by the function name and parentheses. The function body is indented. Python functions can return values with `return`.",
    codeExample: `def move_right_twice():
    hero.moveRight()
    hero.moveRight()

move_right_twice()  # call it`,
    starterCode: `# Define a function that moves right 3 times, then call it twice
def march():
    for i in range(3):
        hero.moveRight()

march()
hero.moveDown()
march()`,
    solutionCode: `def march():
    for i in range(3):
        hero.moveRight()

march()
hero.moveDown()
march()`,
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
    hint: "march() moves right 3 times. Call it, go down, then call it again.",
    tip: "Python function names use snake_case (underscores), not camelCase like JavaScript.",
  },

  {
    id: "py-5",
    courseId: "python",
    number: 5,
    title: "Python Dictionaries",
    description: "Use a Python dictionary to store and read the hero's movement config.",
    concept: "Dictionaries",
    conceptExplanation:
      "Python dictionaries store key-value pairs, like JavaScript objects. You create them with curly braces and access values with square bracket notation or .get(). They're one of Python's most-used data structures.",
    codeExample: `config = {
    "speed": 3,
    "direction": "right"
}

print(config["speed"])      # 3
print(config["direction"])  # "right"`,
    starterCode: `# Read speed and direction from the config dict, then move
config = {
    "speed": 4,
    "direction": "right"
}

for i in range(config["speed"]):
    hero.move(config["direction"])`,
    solutionCode: `config = {
    "speed": 4,
    "direction": "right"
}

for i in range(config["speed"]):
    hero.move(config["direction"])`,
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
    hint: "config['speed'] is 4, config['direction'] is 'right' — the code is already correct, just run it.",
    tip: "Dictionaries use [] for access, not dots. config['speed'] not config.speed.",
  },

  {
    id: "py-6",
    courseId: "python",
    number: 6,
    title: "Python — The Final Test",
    description: "Combine Python lists, functions, loops and dictionaries to beat the dungeon.",
    concept: "Putting It All Together",
    conceptExplanation:
      "This final Python level uses everything: functions, lists, for loops, and dictionaries. Python's clean syntax makes complex logic very readable — this is why it's used in AI, data science, and automation.",
    codeExample: `def navigate(steps):
    for step in steps:
        hero.move(step)

phases = {
    "phase1": ["right", "right"],
    "phase2": ["down", "right", "right"]
}

navigate(phases["phase1"])
navigate(phases["phase2"])`,
    starterCode: `def navigate(steps):
    for step in steps:
        hero.move(step)

phases = {
    "phase1": ["right", "right", "right"],
    "phase2": ["down", "right", "right", "right"],
    "phase3": ["down", "right", "right"]
}

navigate(phases["phase1"])
navigate(phases["phase2"])
navigate(phases["phase3"])`,
    solutionCode: `def navigate(steps):
    for step in steps:
        hero.move(step)

phases = {
    "phase1": ["right", "right", "right"],
    "phase2": ["down", "right", "right", "right"],
    "phase3": ["down", "right", "right"]
}

navigate(phases["phase1"])
navigate(phases["phase2"])
navigate(phases["phase3"])`,
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
    hint: "All three phases are already defined — just run the code and watch it work.",
    tip: "You've completed the Python track! You now know enough Python to write scripts, automate tasks, and start exploring data science.",
  },
];
