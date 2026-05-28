import { LevelDefinition } from "../types";

export const sqlLevels: LevelDefinition[] = [
  {
    id: "sql-1",
    courseId: "sql",
    number: 1,
    title: "SELECT Basics",
    description: "SQL's SELECT retrieves data. Write a query to move the hero.",
    concept: "SELECT Statement",
    conceptExplanation:
      "`SELECT` is the most-used SQL statement — it retrieves rows from a table. `SELECT * FROM table` returns all columns. `SELECT col1, col2 FROM table` returns specific columns. SQL keywords are conventionally uppercase, but case-insensitive.",
    codeExample: `SELECT * FROM users;
SELECT name, age FROM users;
SELECT name FROM users WHERE age > 18;`,
    starterCode: `// SQL concepts drive the hero's path
// Think: SELECT direction, steps FROM route_table

const route = [
  { direction: "right", steps: 3 },
];

// "Execute" the query
for (const row of route) {
  for (let i = 0; i < row.steps; i++) {
    hero.move(row.direction);
  }
}`,
    solutionCode: `const route = [
  { direction: "right", steps: 3 },
];

for (const row of route) {
  for (let i = 0; i < row.steps; i++) {
    hero.move(row.direction);
  }
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
    hint: "The route table has one row: move right 3 steps.",
    tip: "SELECT retrieves — it never modifies data. Read-only queries are safe to run anytime.",
  },

  {
    id: "sql-2",
    courseId: "sql",
    number: 2,
    title: "WHERE Clause",
    description: "Filter rows with WHERE — only move in the allowed direction.",
    concept: "WHERE Filtering",
    conceptExplanation:
      "`WHERE` filters rows based on a condition. Only rows matching the condition are returned. You can combine conditions with `AND`, `OR`, and `NOT`. Comparison operators: `=`, `!=`, `<`, `>`, `<=`, `>=`.",
    codeExample: `SELECT * FROM orders WHERE status = 'paid';
SELECT name FROM users WHERE age >= 18 AND country = 'UK';`,
    starterCode: `// Only execute moves where direction is "right" (WHERE direction = 'right')
const moves = [
  { direction: "right", valid: true },
  { direction: "up",    valid: false },
  { direction: "right", valid: true },
  { direction: "left",  valid: false },
  { direction: "down",  valid: true },
  { direction: "right", valid: true },
  { direction: "right", valid: true },
];

// Filter: WHERE valid = true AND direction != 'up'
const filtered = moves.filter(m => m.valid && m.direction !== "up");

for (const m of filtered) {
  hero.move(m.direction);
}`,
    solutionCode: `const moves = [
  { direction: "right", valid: true },
  { direction: "up",    valid: false },
  { direction: "right", valid: true },
  { direction: "left",  valid: false },
  { direction: "down",  valid: true },
  { direction: "right", valid: true },
  { direction: "right", valid: true },
];

const filtered = moves.filter(m => m.valid && m.direction !== "up");

for (const m of filtered) {
  hero.move(m.direction);
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
    hint: "After filtering: right, right, down, right, right — exactly what the dungeon needs.",
    tip: "WHERE conditions are evaluated per row. Indexes make WHERE on large tables fast — full scans are slow.",
  },

  {
    id: "sql-3",
    courseId: "sql",
    number: 3,
    title: "ORDER BY",
    description: "Sort the move sequence with ORDER BY before executing it.",
    concept: "ORDER BY & Sorting",
    conceptExplanation:
      "`ORDER BY column ASC|DESC` sorts the result set. ASC is ascending (default), DESC is descending. You can sort by multiple columns: `ORDER BY col1 ASC, col2 DESC`. Without ORDER BY, row order is not guaranteed.",
    codeExample: `SELECT name, score FROM players
ORDER BY score DESC;  -- highest first

SELECT * FROM events
ORDER BY created_at ASC;  -- oldest first`,
    starterCode: `// ORDER BY priority ASC — lower number runs first
const commands = [
  { priority: 3, direction: "right", steps: 2 },
  { priority: 1, direction: "right", steps: 2 },
  { priority: 2, direction: "down",  steps: 1 },
];

// Sort ascending by priority (ORDER BY priority ASC)
const ordered = [...commands].sort((a, b) => a.priority - b.priority);

for (const cmd of ordered) {
  for (let i = 0; i < cmd.steps; i++) {
    hero.move(cmd.direction);
  }
}`,
    solutionCode: `const commands = [
  { priority: 3, direction: "right", steps: 2 },
  { priority: 1, direction: "right", steps: 2 },
  { priority: 2, direction: "down",  steps: 1 },
];

const ordered = [...commands].sort((a, b) => a.priority - b.priority);

for (const cmd of ordered) {
  for (let i = 0; i < cmd.steps; i++) {
    hero.move(cmd.direction);
  }
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
    hint: "After sorting by priority: p1(right 2), p2(down 1), p3(right 2).",
    tip: "Databases don't guarantee row order without ORDER BY — always sort explicitly when order matters.",
  },

  {
    id: "sql-4",
    courseId: "sql",
    number: 4,
    title: "LIMIT & OFFSET",
    description: "Use LIMIT to take only the first N moves, OFFSET to skip some.",
    concept: "LIMIT & OFFSET (Pagination)",
    conceptExplanation:
      "`LIMIT n` returns at most n rows. `OFFSET n` skips the first n rows. Combined they implement pagination: `LIMIT 10 OFFSET 20` is page 3 of 10-per-page results. In PostgreSQL you can also use `FETCH FIRST n ROWS ONLY`.",
    codeExample: `-- First 10 results
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;

-- Page 2 (rows 11-20)
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 10;`,
    starterCode: `const allMoves = [
  "right","right","right","right","right",
  "down","right","right","right"
];

// LIMIT 5 OFFSET 0 — first page
const page1 = allMoves.slice(0, 5);   // LIMIT 5
const page2 = allMoves.slice(5, 9);   // LIMIT 4 OFFSET 5

for (const m of page1) hero.move(m);
for (const m of page2) hero.move(m);`,
    solutionCode: `const allMoves = [
  "right","right","right","right","right",
  "down","right","right","right"
];

const page1 = allMoves.slice(0, 5);
const page2 = allMoves.slice(5, 9);

for (const m of page1) hero.move(m);
for (const m of page2) hero.move(m);`,
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
    hint: "slice(0,5) is LIMIT 5. slice(5,9) is LIMIT 4 OFFSET 5. Together they cover all moves.",
    tip: "For large tables, keyset pagination (`WHERE id > last_seen_id LIMIT n`) outperforms OFFSET.",
  },

  {
    id: "sql-5",
    courseId: "sql",
    number: 5,
    title: "Aggregate Functions",
    description: "Use COUNT, SUM, and MAX to compute stats from move data.",
    concept: "Aggregate Functions",
    conceptExplanation:
      "`COUNT(*)` counts rows. `SUM(col)` adds values. `AVG(col)` averages. `MAX(col)` and `MIN(col)` find extremes. Aggregates collapse many rows into one result. Always used with `GROUP BY` when you want per-group aggregates.",
    codeExample: `SELECT COUNT(*) FROM orders;
SELECT SUM(amount) FROM orders WHERE status = 'paid';
SELECT AVG(score) FROM results GROUP BY player_id;`,
    starterCode: `const moveLog = [
  { direction: "right", distance: 2 },
  { direction: "right", distance: 1 },
  { direction: "down",  distance: 1 },
  { direction: "right", distance: 2 },
];

// SUM(distance) WHERE direction = 'right'
const totalRight = moveLog
  .filter(m => m.direction === "right")
  .reduce((sum, m) => sum + m.distance, 0);

// Execute: move right totalRight times, then down 1
for (let i = 0; i < totalRight; i++) hero.moveRight();
hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    solutionCode: `const moveLog = [
  { direction: "right", distance: 2 },
  { direction: "right", distance: 1 },
  { direction: "down",  distance: 1 },
  { direction: "right", distance: 2 },
];

const totalRight = moveLog
  .filter(m => m.direction === "right")
  .reduce((sum, m) => sum + m.distance, 0);

for (let i = 0; i < totalRight; i++) hero.moveRight();
hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "SUM of right distances: 2+1+2=5. Move right 5 times, down 1, right 2 to exit.",
    tip: "Aggregates ignore NULLs by default. COUNT(*) counts rows; COUNT(col) skips NULLs.",
  },

  {
    id: "sql-6",
    courseId: "sql",
    number: 6,
    title: "GROUP BY",
    description: "Group moves by direction and execute the longest group first.",
    concept: "GROUP BY",
    conceptExplanation:
      "`GROUP BY column` groups rows with the same value together so aggregates apply per group. Every column in SELECT must either be in GROUP BY or be an aggregate. `HAVING` filters groups (like WHERE filters rows).",
    codeExample: `SELECT category, COUNT(*) as total
FROM products
GROUP BY category
HAVING COUNT(*) > 5;`,
    starterCode: `const moves = [
  { direction: "right" }, { direction: "right" }, { direction: "right" },
  { direction: "down"  }, { direction: "down"  },
  { direction: "right" }, { direction: "right" },
];

// GROUP BY direction, COUNT(*) — then ORDER BY count DESC
const groups = {};
for (const m of moves) {
  groups[m.direction] = (groups[m.direction] || 0) + 1;
}

// Execute grouped counts
for (let i = 0; i < groups["right"]; i++) hero.moveRight();
for (let i = 0; i < groups["down"]; i++) hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    solutionCode: `const moves = [
  { direction: "right" }, { direction: "right" }, { direction: "right" },
  { direction: "down"  }, { direction: "down"  },
  { direction: "right" }, { direction: "right" },
];

const groups = {};
for (const m of moves) {
  groups[m.direction] = (groups[m.direction] || 0) + 1;
}

for (let i = 0; i < groups["right"]; i++) hero.moveRight();
for (let i = 0; i < groups["down"]; i++) hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "groups['right'] = 5, groups['down'] = 2. Move right 5, down 2, then right 2 to exit.",
    tip: "HAVING filters after grouping; WHERE filters before. Use WHERE to reduce rows before grouping.",
  },

  {
    id: "sql-7",
    courseId: "sql",
    number: 7,
    title: "JOINs",
    description: "JOIN two tables to combine direction and step data into a route.",
    concept: "INNER JOIN",
    conceptExplanation:
      "`INNER JOIN` returns rows where a condition matches in both tables. `LEFT JOIN` returns all rows from the left table plus matches from the right (NULLs where no match). JOINs are the core of relational databases — data is normalised across tables.",
    codeExample: `SELECT orders.id, users.name
FROM orders
INNER JOIN users ON orders.user_id = users.id;`,
    starterCode: `// Two "tables" joined on phase_id
const phases = [
  { phase_id: 1, direction: "right" },
  { phase_id: 2, direction: "down" },
  { phase_id: 3, direction: "right" },
];

const step_counts = [
  { phase_id: 1, steps: 3 },
  { phase_id: 2, steps: 1 },
  { phase_id: 3, steps: 3 },
];

// INNER JOIN on phase_id
const joined = phases.map(p => ({
  ...p,
  ...step_counts.find(s => s.phase_id === p.phase_id),
}));

for (const row of joined) {
  for (let i = 0; i < row.steps; i++) {
    hero.move(row.direction);
  }
}`,
    solutionCode: `const phases = [
  { phase_id: 1, direction: "right" },
  { phase_id: 2, direction: "down" },
  { phase_id: 3, direction: "right" },
];

const step_counts = [
  { phase_id: 1, steps: 3 },
  { phase_id: 2, steps: 1 },
  { phase_id: 3, steps: 3 },
];

const joined = phases.map(p => ({
  ...p,
  ...step_counts.find(s => s.phase_id === p.phase_id),
}));

for (const row of joined) {
  for (let i = 0; i < row.steps; i++) {
    hero.move(row.direction);
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
    hint: "The JOIN merges phase direction with step count — both tables use phase_id as the key.",
    tip: "Normalisation splits data across tables. JOINs reunite it. Index the JOIN columns for speed.",
  },

  {
    id: "sql-8",
    courseId: "sql",
    number: 8,
    title: "Subqueries",
    description: "Use a subquery to compute the max steps before moving the hero.",
    concept: "Subqueries",
    conceptExplanation:
      "A subquery is a SELECT inside another query. Scalar subqueries return one value. `WHERE id IN (SELECT id FROM ...)` is a common pattern. Subqueries can go in SELECT, FROM, or WHERE. CTEs (`WITH`) are more readable alternatives.",
    codeExample: `-- Scalar subquery in WHERE
SELECT * FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);

-- Subquery in FROM (derived table)
SELECT * FROM (SELECT * FROM users WHERE active = true) AS active_users;`,
    starterCode: `const steps_table = [
  { id: 1, steps: 2 },
  { id: 2, steps: 4 },
  { id: 3, steps: 3 },
];

// Subquery: SELECT MAX(steps) FROM steps_table
const maxSteps = Math.max(...steps_table.map(r => r.steps));  // = 4

// Move right maxSteps times, then navigate to exit
for (let i = 0; i < maxSteps; i++) hero.moveRight();
hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    solutionCode: `const steps_table = [
  { id: 1, steps: 2 },
  { id: 2, steps: 4 },
  { id: 3, steps: 3 },
];

const maxSteps = Math.max(...steps_table.map(r => r.steps));

for (let i = 0; i < maxSteps; i++) hero.moveRight();
hero.moveDown();
hero.moveRight();
hero.moveRight();`,
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
    hint: "MAX(steps) = 4. Move right 4, down 1, right 2 to reach the exit.",
    tip: "Correlated subqueries run once per outer row — they're slow on large tables. Use JOINs or CTEs instead.",
  },

  {
    id: "sql-9",
    courseId: "sql",
    number: 9,
    title: "INSERT & UPDATE",
    description: "INSERT new move records and UPDATE existing ones before executing.",
    concept: "INSERT & UPDATE",
    conceptExplanation:
      "`INSERT INTO table (col1, col2) VALUES (v1, v2)` adds a new row. `UPDATE table SET col = value WHERE condition` modifies existing rows. Always use WHERE with UPDATE — omitting it updates every row in the table.",
    codeExample: `INSERT INTO users (name, email) VALUES ('Alice', 'a@b.com');

UPDATE users
SET age = 31
WHERE id = 5;  -- always use WHERE!`,
    starterCode: `// Start with an existing route, then INSERT and UPDATE
const route = [
  { id: 1, direction: "right", steps: 2 },
  { id: 2, direction: "down",  steps: 1 },
];

// INSERT INTO route VALUES (3, 'right', 3)
route.push({ id: 3, direction: "right", steps: 3 });

// UPDATE route SET steps = 3 WHERE id = 1
const row = route.find(r => r.id === 1);
if (row) row.steps = 3;

for (const r of route) {
  for (let i = 0; i < r.steps; i++) {
    hero.move(r.direction);
  }
}`,
    solutionCode: `const route = [
  { id: 1, direction: "right", steps: 2 },
  { id: 2, direction: "down",  steps: 1 },
];

route.push({ id: 3, direction: "right", steps: 3 });

const row = route.find(r => r.id === 1);
if (row) row.steps = 3;

for (const r of route) {
  for (let i = 0; i < r.steps; i++) {
    hero.move(r.direction);
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
    hint: "After INSERT and UPDATE: right 3, down 1, right 3.",
    tip: "Wrap UPDATE in a transaction so you can rollback if something goes wrong.",
  },

  {
    id: "sql-10",
    courseId: "sql",
    number: 10,
    title: "DELETE & Transactions",
    description: "DELETE invalid moves and wrap the whole operation in a transaction.",
    concept: "DELETE & Transactions",
    conceptExplanation:
      "Transactions group operations into an all-or-nothing unit: `BEGIN; ... COMMIT;`. If anything fails, `ROLLBACK` undoes all changes. ACID properties (Atomicity, Consistency, Isolation, Durability) ensure data integrity. Always wrap multi-step writes in transactions.",
    codeExample: `BEGIN;
  DELETE FROM temp_jobs WHERE expires_at < NOW();
  UPDATE stats SET last_cleaned = NOW();
COMMIT;`,
    starterCode: `// Transaction: delete invalid moves, then execute what remains
function transaction(fn) {
  const backup = [...moves];
  try {
    fn();
  } catch(e) {
    moves.length = 0;
    moves.push(...backup);  // ROLLBACK
  }
}

const moves = [
  { direction: "right", valid: true },
  { direction: "invalid", valid: false },
  { direction: "right", valid: true },
  { direction: "down", valid: true },
  { direction: "right", valid: true },
  { direction: "right", valid: true },
];

transaction(() => {
  // DELETE WHERE valid = false
  const toDelete = moves.filter(m => !m.valid);
  for (const d of toDelete) moves.splice(moves.indexOf(d), 1);
});

for (const m of moves) hero.move(m.direction);`,
    solutionCode: `function transaction(fn) {
  const backup = [...moves];
  try {
    fn();
  } catch(e) {
    moves.length = 0;
    moves.push(...backup);
  }
}

const moves = [
  { direction: "right", valid: true },
  { direction: "invalid", valid: false },
  { direction: "right", valid: true },
  { direction: "down", valid: true },
  { direction: "right", valid: true },
  { direction: "right", valid: true },
];

transaction(() => {
  const toDelete = moves.filter(m => !m.valid);
  for (const d of toDelete) moves.splice(moves.indexOf(d), 1);
});

for (const m of moves) hero.move(m.direction);`,
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
    hint: "After DELETE: right, right, down, right, right — exactly 5 valid moves.",
    tip: "Use savepoints inside long transactions to rollback only part of the work.",
  },

  {
    id: "sql-11",
    courseId: "sql",
    number: 11,
    title: "Indexes",
    description: "Simulate indexed lookups — find moves by direction in O(1) vs O(n).",
    concept: "Indexes",
    conceptExplanation:
      "Indexes speed up queries by avoiding full table scans. A B-tree index on `direction` lets the DB jump directly to matching rows. `CREATE INDEX idx_name ON table(column)`. Tradeoff: indexes use disk space and slow down INSERTs/UPDATEs.",
    codeExample: `-- Without index: scans every row
SELECT * FROM orders WHERE user_id = 5;

-- Create index
CREATE INDEX idx_user ON orders(user_id);

-- Now the same query uses the index
SELECT * FROM orders WHERE user_id = 5;`,
    starterCode: `// Build an "index" — a Map for O(1) lookup by direction
const moveLog = [
  { direction: "right", id: 1 }, { direction: "right", id: 2 },
  { direction: "down",  id: 3 }, { direction: "right", id: 4 },
  { direction: "right", id: 5 },
];

// CREATE INDEX idx_dir ON moves(direction)
const index = new Map();
for (const m of moveLog) {
  if (!index.has(m.direction)) index.set(m.direction, []);
  index.get(m.direction).push(m);
}

// O(1) lookup: SELECT * FROM moves WHERE direction = 'right'
const rightMoves = index.get("right") ?? [];
for (const m of rightMoves) hero.moveRight();

hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    solutionCode: `const moveLog = [
  { direction: "right", id: 1 }, { direction: "right", id: 2 },
  { direction: "down",  id: 3 }, { direction: "right", id: 4 },
  { direction: "right", id: 5 },
];

const index = new Map();
for (const m of moveLog) {
  if (!index.has(m.direction)) index.set(m.direction, []);
  index.get(m.direction).push(m);
}

const rightMoves = index.get("right") ?? [];
for (const m of rightMoves) hero.moveRight();

hero.moveDown();
hero.moveRight();
hero.moveRight();`,
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
    hint: "The index has 4 'right' entries — use them all, then down 1, right 2 to exit.",
    tip: "Add indexes on columns used in WHERE, JOIN ON, and ORDER BY. Don't over-index write-heavy tables.",
  },

  {
    id: "sql-12",
    courseId: "sql",
    number: 12,
    title: "Window Functions",
    description: "Use a window function to rank moves and execute them in rank order.",
    concept: "Window Functions",
    conceptExplanation:
      "Window functions compute values across a set of rows related to the current row — without collapsing them like GROUP BY. `ROW_NUMBER() OVER (ORDER BY col)`, `RANK()`, `LAG()`, `LEAD()`, `SUM() OVER (...)`. Available in PostgreSQL, MySQL 8+, SQL Server.",
    codeExample: `SELECT
  name,
  score,
  RANK() OVER (ORDER BY score DESC) as rank,
  SUM(score) OVER () as total
FROM players;`,
    starterCode: `const moves = [
  { direction: "right", priority: 2 },
  { direction: "down",  priority: 3 },
  { direction: "right", priority: 1 },
  { direction: "right", priority: 4 },
];

// ROW_NUMBER() OVER (ORDER BY priority ASC)
const ranked = [...moves]
  .sort((a, b) => a.priority - b.priority)
  .map((m, i) => ({ ...m, row_number: i + 1 }));

for (const row of ranked) {
  for (let i = 0; i < 1; i++) hero.move(row.direction);
}

hero.moveRight();
hero.moveRight();`,
    solutionCode: `const moves = [
  { direction: "right", priority: 2 },
  { direction: "down",  priority: 3 },
  { direction: "right", priority: 1 },
  { direction: "right", priority: 4 },
];

const ranked = [...moves]
  .sort((a, b) => a.priority - b.priority)
  .map((m, i) => ({ ...m, row_number: i + 1 }));

for (const row of ranked) {
  hero.move(row.direction);
}

hero.moveRight();
hero.moveRight();`,
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
    hint: "Ranked order by priority: p1=right, p2=right, p3=down, p4=right. Then 2 more right.",
    tip: "Window functions are SQL's most powerful feature for analytics — learn PARTITION BY next.",
  },

  {
    id: "sql-13",
    courseId: "sql",
    number: 13,
    title: "CTEs (WITH clause)",
    description: "Use a Common Table Expression to name and reuse a subquery.",
    concept: "Common Table Expressions",
    conceptExplanation:
      "CTEs define named temporary result sets with `WITH name AS (SELECT ...)`. They make complex queries readable by breaking them into named steps. Recursive CTEs (`WITH RECURSIVE`) can traverse trees and graphs.",
    codeExample: `WITH active_users AS (
  SELECT * FROM users WHERE last_login > NOW() - INTERVAL '30 days'
),
big_spenders AS (
  SELECT user_id FROM orders WHERE total > 1000
)
SELECT au.*
FROM active_users au
JOIN big_spenders bs ON au.id = bs.user_id;`,
    starterCode: `// CTE: named intermediate results
function withCTE(name, query) {
  return { name, result: query() };
}

const rightMoves = withCTE("right_moves", () =>
  [1,2,3,4].map(() => "right")
);

const downMoves = withCTE("down_moves", () =>
  [1].map(() => "down")
);

// Main query uses the CTEs
const finalPath = [...rightMoves.result, ...downMoves.result, "right", "right"];

for (const step of finalPath) hero.move(step);`,
    solutionCode: `function withCTE(name, query) {
  return { name, result: query() };
}

const rightMoves = withCTE("right_moves", () =>
  [1,2,3,4].map(() => "right")
);

const downMoves = withCTE("down_moves", () =>
  [1].map(() => "down")
);

const finalPath = [...rightMoves.result, ...downMoves.result, "right", "right"];

for (const step of finalPath) hero.move(step);`,
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
    hint: "right_moves=[right×4], down_moves=[down]. Final path: right×4, down, right×2.",
    tip: "CTEs don't materialise in all databases — they may be inlined. Use temp tables for guaranteed materialisation.",
  },

  {
    id: "sql-14",
    courseId: "sql",
    number: 14,
    title: "Schema Design",
    description: "Design a normalised schema for dungeon routes — then execute one.",
    concept: "Normalisation & Schema Design",
    conceptExplanation:
      "Normalisation reduces redundancy. 1NF: atomic values, unique rows. 2NF: no partial dependencies. 3NF: no transitive dependencies. In practice, aim for 3NF and denormalise only when performance requires it.",
    codeExample: `-- Normalised schema (3NF)
CREATE TABLE routes (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE waypoints (
  id SERIAL PRIMARY KEY,
  route_id INT REFERENCES routes(id),
  step_order INT,
  direction VARCHAR(10),
  steps INT
);`,
    starterCode: `// Normalised schema in JS
const routes = [
  { id: 1, name: "dungeon_run" },
];

const waypoints = [
  { id: 1, route_id: 1, step_order: 1, direction: "right", steps: 3 },
  { id: 2, route_id: 1, step_order: 2, direction: "down",  steps: 1 },
  { id: 3, route_id: 1, step_order: 3, direction: "right", steps: 3 },
];

// JOIN routes + waypoints WHERE route_id = 1 ORDER BY step_order
const routeWaypoints = waypoints
  .filter(w => w.route_id === 1)
  .sort((a, b) => a.step_order - b.step_order);

for (const w of routeWaypoints) {
  for (let i = 0; i < w.steps; i++) {
    hero.move(w.direction);
  }
}`,
    solutionCode: `const routes = [
  { id: 1, name: "dungeon_run" },
];

const waypoints = [
  { id: 1, route_id: 1, step_order: 1, direction: "right", steps: 3 },
  { id: 2, route_id: 1, step_order: 2, direction: "down",  steps: 1 },
  { id: 3, route_id: 1, step_order: 3, direction: "right", steps: 3 },
];

const routeWaypoints = waypoints
  .filter(w => w.route_id === 1)
  .sort((a, b) => a.step_order - b.step_order);

for (const w of routeWaypoints) {
  for (let i = 0; i < w.steps; i++) {
    hero.move(w.direction);
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
    hint: "Filter by route_id=1 and sort by step_order to get the correct sequence.",
    tip: "Foreign keys enforce referential integrity — no orphaned waypoints without a parent route.",
  },

  {
    id: "sql-15",
    courseId: "sql",
    number: 15,
    title: "SQL Grand Finale",
    description: "The ultimate SQL dungeon — CTEs, JOINs, window functions, and transactions.",
    concept: "SQL Mastery",
    conceptExplanation:
      "You've learned SQL's full power: SELECT, WHERE, ORDER BY, LIMIT, aggregates, GROUP BY, JOINs, subqueries, INSERT/UPDATE/DELETE, transactions, indexes, window functions, CTEs, and schema design. SQL is the lingua franca of data — every system uses it.",
    codeExample: `WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (ORDER BY priority) as rn
  FROM waypoints
)
SELECT direction, steps FROM ranked ORDER BY rn;`,
    starterCode: `// Full SQL dungeon: CTE + JOIN + window function + transaction

const phases_table = [
  { id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }
];
const moves_table = [
  { phase_id: 1, direction: "right", steps: 4, priority: 1 },
  { phase_id: 2, direction: "down",  steps: 1, priority: 2 },
  { phase_id: 3, direction: "right", steps: 3, priority: 3 },
];

// WITH joined AS (SELECT ... JOIN ... ORDER BY priority)
const joined = moves_table
  .map(m => ({ ...m, ...phases_table.find(p => p.id === m.phase_id) }))
  .sort((a, b) => a.priority - b.priority);

// Transaction
const log = [];
try {
  for (const row of joined) {
    for (let i = 0; i < row.steps; i++) {
      hero.move(row.direction);
      log.push(row.direction);
    }
  }
  // COMMIT
} catch(e) {
  // ROLLBACK — in real DB: log.length = 0 and undo moves
}

// Final push to exit
hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    solutionCode: `const phases_table = [
  { id: 1, name: "alpha" }, { id: 2, name: "beta" }, { id: 3, name: "gamma" }
];
const moves_table = [
  { phase_id: 1, direction: "right", steps: 4, priority: 1 },
  { phase_id: 2, direction: "down",  steps: 1, priority: 2 },
  { phase_id: 3, direction: "right", steps: 3, priority: 3 },
];

const joined = moves_table
  .map(m => ({ ...m, ...phases_table.find(p => p.id === m.phase_id) }))
  .sort((a, b) => a.priority - b.priority);

const log = [];
try {
  for (const row of joined) {
    for (let i = 0; i < row.steps; i++) {
      hero.move(row.direction);
      log.push(row.direction);
    }
  }
} catch(e) {}

hero.moveDown();
hero.moveRight();
hero.moveRight();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","wall","empty","gem","gem"],
      ["wall","wall","wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×4, down×1, right×3 from the joined table. Then down 1, right 2 to exit.",
    tip: "Congratulations! You've mastered SQL. You can now design schemas, write complex queries, and reason about data at scale.",
  },
];
