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
    tip: "Great foundation! Now let's explore more Python features.",
  },

  // ── Level 7 ──────────────────────────────────────────────────────────────
  {
    id: "py-7",
    courseId: "python",
    number: 7,
    title: "While Loops",
    description: "Use a while loop to keep moving until you reach the exit.",
    concept: "while Loops",
    conceptExplanation:
      "`while condition:` keeps running as long as the condition is True. You control when it stops by updating a variable inside the loop. Great for 'keep going until something happens' situations.",
    codeExample: `steps = 0
while steps < 4:
    hero.moveRight()
    steps += 1   # steps = steps + 1`,
    starterCode: `# Use a while loop — move right until you've taken 5 steps
steps = 0
while steps < 5:
    hero.moveRight()
    steps += 1`,
    solutionCode: `steps = 0
while steps < 5:
    hero.moveRight()
    steps += 1`,
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
    hint: "steps < 5 means the loop runs when steps is 0,1,2,3,4 — five times total.",
    tip: "Always make sure your while loop will eventually stop — infinite loops crash programs.",
  },

  // ── Level 8 ──────────────────────────────────────────────────────────────
  {
    id: "py-8",
    courseId: "python",
    number: 8,
    title: "If / Elif / Else",
    description: "Use conditionals to choose a direction based on a variable.",
    concept: "Conditionals: if / elif / else",
    conceptExplanation:
      "Python's `if`, `elif` (else-if), and `else` let you branch on conditions. Unlike JavaScript, Python uses `elif` (not `else if`) and colons instead of braces. Indentation defines which code belongs to each branch.",
    codeExample: `mood = "brave"

if mood == "brave":
    hero.moveRight()
elif mood == "cautious":
    hero.moveDown()
else:
    hero.wait()`,
    starterCode: `# Change phase to "b" to go down, or "a" to go right
phase = "a"

if phase == "a":
    for i in range(3):
        hero.moveRight()
elif phase == "b":
    for i in range(3):
        hero.moveDown()

hero.moveRight()
hero.moveRight()`,
    solutionCode: `phase = "a"

if phase == "a":
    for i in range(3):
        hero.moveRight()
elif phase == "b":
    for i in range(3):
        hero.moveDown()

hero.moveRight()
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
    hint: "phase is 'a', so the if branch runs — moves right 3 times, then 2 more to exit.",
    tip: "Python uses `==` to compare (two equals signs). A single `=` is assignment.",
  },

  // ── Level 9 ──────────────────────────────────────────────────────────────
  {
    id: "py-9",
    courseId: "python",
    number: 9,
    title: "String Methods",
    description: "Use Python string methods to build direction commands dynamically.",
    concept: "String Methods",
    conceptExplanation:
      "Python strings have built-in methods: `.upper()`, `.lower()`, `.strip()`, `.split()`, `.replace()`, `.startswith()` and more. They return new strings — strings in Python are immutable.",
    codeExample: `cmd = "  MOVE-RIGHT  "
cmd = cmd.strip().lower()   # "move-right"
parts = cmd.split("-")      # ["move", "right"]
direction = parts[1]        # "right"`,
    starterCode: `# The directions are uppercase — lowercase them before using
raw_directions = ["RIGHT", "RIGHT", "DOWN", "RIGHT", "RIGHT"]

for raw in raw_directions:
    direction = raw.lower()
    hero.move(direction)`,
    solutionCode: `raw_directions = ["RIGHT", "RIGHT", "DOWN", "RIGHT", "RIGHT"]

for raw in raw_directions:
    direction = raw.lower()
    hero.move(direction)`,
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
    hint: ".lower() converts 'RIGHT' to 'right' which hero.move() understands.",
    tip: "String methods chain: 'HELLO'.lower().strip() works left to right.",
  },

  // ── Level 10 ─────────────────────────────────────────────────────────────
  {
    id: "py-10",
    courseId: "python",
    number: 10,
    title: "Tuples & Unpacking",
    description: "Store coordinates as tuples and unpack them to navigate the dungeon.",
    concept: "Tuples & Unpacking",
    conceptExplanation:
      "Tuples are immutable sequences — like lists but they can't be changed after creation. They use parentheses. Python lets you unpack them directly: `x, y = (3, 5)`. Great for coordinates, pairs, and returning multiple values from functions.",
    codeExample: `point = (3, 5)
x, y = point   # unpacking

waypoints = [(1,0), (0,1), (1,0)]
dirs = {0: "right", 1: "down", -1: "left"}`,
    starterCode: `# Each waypoint is (col_steps, row_steps) — unpack and move
waypoints = [
    ("right", 2),
    ("down", 1),
    ("right", 3),
]

for direction, steps in waypoints:
    for i in range(steps):
        hero.move(direction)`,
    solutionCode: `waypoints = [
    ("right", 2),
    ("down", 1),
    ("right", 3),
]

for direction, steps in waypoints:
    for i in range(steps):
        hero.move(direction)`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","empty","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "`for direction, steps in waypoints:` unpacks each tuple automatically.",
    tip: "Tuples are faster than lists and signal 'this data won't change' to other programmers.",
  },

  // ── Level 11 ─────────────────────────────────────────────────────────────
  {
    id: "py-11",
    courseId: "python",
    number: 11,
    title: "List Comprehensions",
    description: "Use a list comprehension to build a move sequence in one line.",
    concept: "List Comprehensions",
    conceptExplanation:
      "List comprehensions are a concise way to build lists: `[expr for item in iterable if condition]`. They replace multi-line for-loops that build a list. Very common in Python — you'll see them everywhere.",
    codeExample: `# Without comprehension
moves = []
for i in range(4):
    moves.append("right")

# With comprehension (same result)
moves = ["right" for i in range(4)]`,
    starterCode: `# Build a list of 5 "right" moves using a comprehension, then execute
moves = ["right" for i in range(5)]

for m in moves:
    hero.move(m)`,
    solutionCode: `moves = ["right" for i in range(5)]

for m in moves:
    hero.move(m)`,
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
    hint: "`['right' for i in range(5)]` creates ['right','right','right','right','right'].",
    tip: "You can filter too: `[x for x in items if x != 'skip']` — the if part is optional.",
  },

  // ── Level 12 ─────────────────────────────────────────────────────────────
  {
    id: "py-12",
    courseId: "python",
    number: 12,
    title: "Functions with Return Values",
    description: "Write a function that returns a list of directions, then use it.",
    concept: "Return Values",
    conceptExplanation:
      "Functions in Python return values with `return`. A function can return any type — a number, string, list, dict, even another function. If no `return` is written, the function returns `None` implicitly.",
    codeExample: `def get_path():
    return ["right", "right", "down"]

path = get_path()
for step in path:
    hero.move(step)`,
    starterCode: `def build_path(right_steps, down_steps):
    path = ["right"] * right_steps + ["down"] * down_steps
    return path

route = build_path(3, 2)
for step in route:
    hero.move(step)

for i in range(2):
    hero.moveRight()`,
    solutionCode: `def build_path(right_steps, down_steps):
    path = ["right"] * right_steps + ["down"] * down_steps
    return path

route = build_path(3, 2)
for step in route:
    hero.move(step)

for i in range(2):
    hero.moveRight()`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "`['right'] * 3` creates ['right','right','right']. The `+` concatenates lists.",
    tip: "Functions that return values are more reusable than functions that do side-effects only.",
  },

  // ── Level 13 ─────────────────────────────────────────────────────────────
  {
    id: "py-13",
    courseId: "python",
    number: 13,
    title: "Default Arguments",
    description: "Write a function with default parameters to simplify movement calls.",
    concept: "Default & Keyword Arguments",
    conceptExplanation:
      "Python functions can have default values for parameters: `def move(direction='right', steps=1):`. Callers can omit those args, or pass them by name (keyword arguments): `move(steps=3)`. This makes APIs much more flexible.",
    codeExample: `def march(direction="right", steps=1):
    for i in range(steps):
        hero.move(direction)

march()           # right 1
march(steps=3)    # right 3
march("down", 2)  # down 2`,
    starterCode: `def march(direction="right", steps=1):
    for i in range(steps):
        hero.move(direction)

march(steps=3)
march("down")
march(steps=3)
march("down")
march(steps=2)`,
    solutionCode: `def march(direction="right", steps=1):
    for i in range(steps):
        hero.move(direction)

march(steps=3)
march("down")
march(steps=3)
march("down")
march(steps=2)`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "march(steps=3) uses the default 'right' direction and moves 3 steps.",
    tip: "Default arguments must come after required arguments in the function signature.",
  },

  // ── Level 14 ─────────────────────────────────────────────────────────────
  {
    id: "py-14",
    courseId: "python",
    number: 14,
    title: "Lambda & Map",
    description: "Use lambda and map() to transform a list of raw commands.",
    concept: "Lambda Functions & map()",
    conceptExplanation:
      "`lambda` creates a small anonymous function inline: `lambda x: x * 2`. `map(func, iterable)` applies a function to every item in a sequence, returning a map object you convert to a list. Great for data transformation.",
    codeExample: `numbers = [1, 2, 3]
doubled = list(map(lambda x: x * 2, numbers))
# [2, 4, 6]

words = ["RIGHT", "LEFT"]
lower = list(map(lambda w: w.lower(), words))
# ["right", "left"]`,
    starterCode: `raw = ["RIGHT", "RIGHT", "DOWN", "RIGHT", "RIGHT"]

# Use map + lambda to lowercase every direction
directions = list(map(lambda d: d.lower(), raw))

for d in directions:
    hero.move(d)`,
    solutionCode: `raw = ["RIGHT", "RIGHT", "DOWN", "RIGHT", "RIGHT"]

directions = list(map(lambda d: d.lower(), raw))

for d in directions:
    hero.move(d)`,
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
    hint: "map() returns a map object — wrap it in list() to get a list you can iterate.",
    tip: "For simple transforms, list comprehensions are often more readable than map+lambda.",
  },

  // ── Level 15 ─────────────────────────────────────────────────────────────
  {
    id: "py-15",
    courseId: "python",
    number: 15,
    title: "Filter & Conditionals",
    description: "Use filter() to remove invalid moves before sending them to the hero.",
    concept: "filter() & Truthiness",
    conceptExplanation:
      "`filter(func, iterable)` keeps only items where the function returns True. Python treats empty strings, 0, None, and empty collections as falsy — everything else is truthy. This is called 'truthiness'.",
    codeExample: `moves = ["right", "", "down", None, "right"]
valid = list(filter(None, moves))
# ["right", "down", "right"]  — falsy items removed

# Or with a lambda:
valid = list(filter(lambda m: m and len(m) > 0, moves))`,
    starterCode: `# Some moves are empty strings — filter them out first
raw_moves = ["right", "", "right", "", "down", "right", "", "right"]

valid_moves = list(filter(lambda m: m != "", raw_moves))

for m in valid_moves:
    hero.move(m)`,
    solutionCode: `raw_moves = ["right", "", "right", "", "down", "right", "", "right"]

valid_moves = list(filter(lambda m: m != "", raw_moves))

for m in valid_moves:
    hero.move(m)`,
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
    hint: "filter(lambda m: m != '', raw_moves) keeps only non-empty strings.",
    tip: "`filter(None, items)` removes all falsy values in one shot — a common Python idiom.",
  },

  // ── Level 16 ─────────────────────────────────────────────────────────────
  {
    id: "py-16",
    courseId: "python",
    number: 16,
    title: "Classes & Objects",
    description: "Create a Navigator class to encapsulate movement logic.",
    concept: "Classes & Objects",
    conceptExplanation:
      "Python classes use `class Name:` and define methods with `def`. The first parameter of every method is `self` — the instance. `__init__` is the constructor, called when you create an object with `Name()`.",
    codeExample: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(self.name + " says woof!")

d = Dog("Rex")
d.bark()  # Rex says woof!`,
    starterCode: `class Navigator:
    def __init__(self, default_dir="right"):
        self.default_dir = default_dir
        self.steps = 0

    def go(self, steps=1, direction=None):
        d = direction or self.default_dir
        for i in range(steps):
            hero.move(d)
            self.steps += 1

nav = Navigator()
nav.go(3)
nav.go(1, "down")
nav.go(3)`,
    solutionCode: `class Navigator:
    def __init__(self, default_dir="right"):
        self.default_dir = default_dir
        self.steps = 0

    def go(self, steps=1, direction=None):
        d = direction or self.default_dir
        for i in range(steps):
            hero.move(d)
            self.steps += 1

nav = Navigator()
nav.go(3)
nav.go(1, "down")
nav.go(3)`,
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
    hint: "`direction or self.default_dir` returns default_dir when direction is None (falsy).",
    tip: "`self` is just a convention — you could call it anything, but always use `self`.",
  },

  // ── Level 17 ─────────────────────────────────────────────────────────────
  {
    id: "py-17",
    courseId: "python",
    number: 17,
    title: "Inheritance",
    description: "Extend a base Walker class with a subclass that adds extra moves.",
    concept: "Inheritance & super()",
    conceptExplanation:
      "A class can inherit from another with `class Child(Parent):`. The child gets all parent methods and can override them. `super()` calls the parent's version of a method. Inheritance models 'is-a' relationships.",
    codeExample: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):           # override
        return "Woof!"

class Puppy(Dog):
    def speak(self):
        return super().speak() + " Yip!"`,
    starterCode: `class Walker:
    def march(self, steps):
        for i in range(steps):
            hero.moveRight()

class Explorer(Walker):
    def sweep(self, right_steps, down_steps):
        self.march(right_steps)
        for i in range(down_steps):
            hero.moveDown()

e = Explorer()
e.march(3)
e.sweep(0, 1)
e.march(3)`,
    solutionCode: `class Walker:
    def march(self, steps):
        for i in range(steps):
            hero.moveRight()

class Explorer(Walker):
    def sweep(self, right_steps, down_steps):
        self.march(right_steps)
        for i in range(down_steps):
            hero.moveDown()

e = Explorer()
e.march(3)
e.sweep(0, 1)
e.march(3)`,
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
    hint: "Explorer inherits march() from Walker — call it with self.march().",
    tip: "Prefer composition over inheritance for complex systems, but inheritance is great for 'is-a' relationships.",
  },

  // ── Level 18 ─────────────────────────────────────────────────────────────
  {
    id: "py-18",
    courseId: "python",
    number: 18,
    title: "Exception Handling",
    description: "Use try/except to safely handle bad moves without crashing.",
    concept: "try / except / finally",
    conceptExplanation:
      "`try:` wraps code that might fail. `except ExceptionType:` catches the error and lets you handle it gracefully. `finally:` always runs, whether an error happened or not. This prevents crashes from unexpected input.",
    codeExample: `try:
    result = 10 / 0
except ZeroDivisionError:
    result = 0
    print("Can't divide by zero!")
finally:
    print("Done")  # always runs`,
    starterCode: `moves = ["right", "right", "invalid", "down", "right", "right"]

for m in moves:
    try:
        if m not in ["right", "left", "up", "down"]:
            raise ValueError("Bad move: " + m)
        hero.move(m)
    except ValueError:
        pass  # skip bad moves and continue`,
    solutionCode: `moves = ["right", "right", "invalid", "down", "right", "right"]

for m in moves:
    try:
        if m not in ["right", "left", "up", "down"]:
            raise ValueError("Bad move: " + m)
        hero.move(m)
    except ValueError:
        pass`,
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
    hint: "`pass` in the except block skips the bad move silently and continues the loop.",
    tip: "Catch specific exceptions (ValueError), not bare `except:` — it hides real bugs.",
  },

  // ── Level 19 ─────────────────────────────────────────────────────────────
  {
    id: "py-19",
    courseId: "python",
    number: 19,
    title: "Generators",
    description: "Use a generator function to lazily produce movement commands.",
    concept: "Generators & yield",
    conceptExplanation:
      "`yield` turns a function into a generator — it produces values one at a time without building the whole list in memory. Each call to `next()` resumes where the function paused. `for` loops work with generators automatically.",
    codeExample: `def count_up(n):
    i = 0
    while i < n:
        yield i    # pause here, return i
        i += 1

for num in count_up(3):
    print(num)  # 0, 1, 2`,
    starterCode: `def path_gen():
    for i in range(4):
        yield "right"
    yield "down"
    for i in range(3):
        yield "right"

for step in path_gen():
    hero.move(step)`,
    solutionCode: `def path_gen():
    for i in range(4):
        yield "right"
    yield "down"
    for i in range(3):
        yield "right"

for step in path_gen():
    hero.move(step)`,
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
    hint: "A for loop over a generator calls it automatically — no list() needed.",
    tip: "Generators are memory-efficient for large sequences — they never build the whole list.",
  },

  // ── Level 20 ─────────────────────────────────────────────────────────────
  {
    id: "py-20",
    courseId: "python",
    number: 20,
    title: "Python Grand Finale",
    description: "The ultimate Python dungeon — use every concept you've learned.",
    concept: "Python Mastery",
    conceptExplanation:
      "This final level combines classes, generators, list comprehensions, exception handling, and lambda. You've learned Python from first principles — loops, functions, data structures, OOP, and functional tools. You're ready for real-world Python.",
    codeExample: `# Everything together
class DungeonRunner:
    def __init__(self):
        self.log = []

    def run(self, steps):
        for step in steps:
            try:
                hero.move(step)
                self.log.append(step)
            except Exception:
                pass`,
    starterCode: `class DungeonRunner:
    def __init__(self):
        self.log = []

    def run(self, steps):
        for step in steps:
            hero.move(step)
            self.log.append(step)

def route_gen():
    phases = [
        ("right", 4),
        ("down", 1),
        ("right", 3),
        ("down", 1),
        ("right", 2),
    ]
    for direction, count in phases:
        for _ in range(count):
            yield direction

runner = DungeonRunner()
runner.run(route_gen())`,
    solutionCode: `class DungeonRunner:
    def __init__(self):
        self.log = []

    def run(self, steps):
        for step in steps:
            hero.move(step)
            self.log.append(step)

def route_gen():
    phases = [
        ("right", 4),
        ("down", 1),
        ("right", 3),
        ("down", 1),
        ("right", 2),
    ]
    for direction, count in phases:
        for _ in range(count):
            yield direction

runner = DungeonRunner()
runner.run(route_gen())`,
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
    hint: "The generator yields one move at a time — runner.run() iterates it automatically.",
    tip: "Congratulations! You've completed the full Python course. You now know enough to build real scripts, automate tasks, and dive into data science or web development.",
  },
];
