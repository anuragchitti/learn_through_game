import { LevelDefinition } from "../types";

export const htmlCssLevels: LevelDefinition[] = [
  {
    id: "html-css-1",
    courseId: "html-css",
    number: 1,
    title: "HTML Structure",
    description: "HTML is the skeleton of every webpage. Use block structure to navigate the hero.",
    concept: "HTML Elements",
    conceptExplanation:
      "HTML (HyperText Markup Language) defines the structure of a page using elements. Elements are written as tags: <tagName>content</tagName>. The most common structural tags are <html>, <head>, <body>, <div>, <h1>–<h6>, <p>, and <span>. Tags can be nested to build a hierarchy.",
    codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
  </body>
</html>`,
    starterCode: `// HTML has nested structure — parent → child
// Mirror that with nested function calls
function renderSection(direction, steps) {
  for (let i = 0; i < steps; i++) {
    hero.move(direction);
  }
}

// <body> → <main> → <section> → navigate
renderSection("right", 3);
renderSection("down", 2);`,
    solutionCode: `function renderSection(direction, steps) {
  for (let i = 0; i < steps; i++) {
    hero.move(direction);
  }
}

renderSection("right", 3);
renderSection("down", 2);`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","wall"],
      ["wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right 2 to the gem, then down 2 to the next gem, then down 1 to exit.",
    tip: "HTML nesting is like function calls: the outer tag wraps the inner ones, just like outer functions call inner ones.",
  },

  {
    id: "html-css-2",
    courseId: "html-css",
    number: 2,
    title: "CSS Selectors",
    description: "CSS selects HTML elements to style them. Use selectors to target moves.",
    concept: "CSS Selectors",
    conceptExplanation:
      "CSS (Cascading Style Sheets) styles HTML elements. Selectors define which elements to target:\n• Element: p { color: red; }\n• Class: .highlight { font-weight: bold; }\n• ID: #header { background: blue; }\n• Descendant: nav a { text-decoration: none; }\nThe more specific the selector, the higher its priority (specificity).",
    codeExample: `/* Element selector */
h1 { color: indigo; }

/* Class selector */
.card { border-radius: 8px; padding: 16px; }

/* ID selector */
#hero { font-size: 2rem; font-weight: bold; }

/* Descendant selector */
nav a { color: white; text-decoration: none; }`,
    starterCode: `// CSS selectors map elements to styles
// Map directions to step counts (like selector → rule)
const moves = {
  right: 4,
  down: 1,
};

for (const [dir, steps] of Object.entries(moves)) {
  for (let i = 0; i < steps; i++) {
    hero.move(dir);
  }
}`,
    solutionCode: `const moves = {
  right: 4,
  down: 1,
};

for (const [dir, steps] of Object.entries(moves)) {
  for (let i = 0; i < steps; i++) {
    hero.move(dir);
  }
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","exit","wall"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right 3 collecting gems, then adjust: one gem is below at col 4.",
    tip: "CSS specificity works like a score: ID > class > element. Higher specificity wins when rules conflict.",
  },

  {
    id: "html-css-3",
    courseId: "html-css",
    number: 3,
    title: "The Box Model",
    description: "Every HTML element is a box with content, padding, border, and margin.",
    concept: "CSS Box Model",
    conceptExplanation:
      "Every HTML element is treated as a rectangular box with four layers:\n1. Content — the actual text/image\n2. Padding — space between content and border\n3. Border — the edge of the element\n4. Margin — space outside the border, separating elements\n\nBy default, width/height only apply to the content. Set box-sizing: border-box to include padding and border in the element's total size.",
    codeExample: `.card {
  /* Content */
  width: 200px;
  height: 100px;

  /* Padding: space inside */
  padding: 16px;

  /* Border */
  border: 2px solid #4f46e5;

  /* Margin: space outside */
  margin: 24px;

  /* Include padding+border in width */
  box-sizing: border-box;
}`,
    starterCode: `// Box model: 4 layers around content
// Simulate: content (1) + padding (2) + border (1) + margin (2)
const boxLayers = [
  { label: "content", steps: 1 },
  { label: "padding", steps: 2 },
  { label: "border",  steps: 1 },
  { label: "margin",  steps: 2 },
];

let totalSteps = boxLayers.reduce((sum, l) => sum + l.steps, 0);
for (let i = 0; i < totalSteps; i++) {
  hero.move("right");
}`,
    solutionCode: `const boxLayers = [
  { label: "content", steps: 1 },
  { label: "padding", steps: 2 },
  { label: "border",  steps: 1 },
  { label: "margin",  steps: 2 },
];

let totalSteps = boxLayers.reduce((sum, l) => sum + l.steps, 0);
for (let i = 0; i < totalSteps; i++) {
  hero.move("right");
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","empty","empty","empty","empty","wall"],
      ["wall","empty","wall","wall","wall","wall","wall","wall"],
      ["wall","gem","wall","wall","wall","wall","wall","wall"],
      ["wall","empty","wall","wall","wall","wall","wall","wall"],
      ["wall","empty","wall","wall","wall","wall","wall","wall"],
      ["wall","exit","wall","wall","wall","wall","wall","wall"],
      ["wall","wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect the 💎 gem" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right 6, then down 2 to the gem, then down 3 to the exit.",
    tip: "box-sizing: border-box is almost always what you want — it makes sizing intuitive.",
  },

  {
    id: "html-css-4",
    courseId: "html-css",
    number: 4,
    title: "Flexbox",
    description: "Flexbox is CSS's most powerful layout tool for arranging items in a row or column.",
    concept: "CSS Flexbox",
    conceptExplanation:
      "Flexbox (Flexible Box Layout) arranges children along a main axis.\n\nKey properties on the container:\n• display: flex — activates flexbox\n• flex-direction: row | column\n• justify-content: flex-start | center | space-between | space-around\n• align-items: stretch | center | flex-start | flex-end\n• gap: spacing between items\n\nKey properties on children:\n• flex: 1 — grow to fill space\n• flex-shrink: 0 — don't shrink",
    codeExample: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grow-item {
  flex: 1; /* takes remaining space */
}`,
    starterCode: `// Flexbox arranges items in rows or columns
// Simulate a flex row: move right, then a flex column: move down
function flexRow(count) {
  for (let i = 0; i < count; i++) hero.move("right");
}
function flexColumn(count) {
  for (let i = 0; i < count; i++) hero.move("down");
}

flexRow(3);    // flex-direction: row
flexColumn(2); // flex-direction: column
flexRow(1);`,
    solutionCode: `function flexRow(count) {
  for (let i = 0; i < count; i++) hero.move("right");
}
function flexColumn(count) {
  for (let i = 0; i < count; i++) hero.move("down");
}

flexRow(3);
flexColumn(2);
flexRow(1);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","wall","wall"],
      ["wall","wall","wall","wall","exit","wall"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "flexRow(2) to col 3, then flexColumn(2) collecting gems, then flexRow(1) to exit.",
    tip: "justify-content handles alignment on the main axis; align-items handles the cross axis.",
  },

  {
    id: "html-css-5",
    courseId: "html-css",
    number: 5,
    title: "CSS Grid",
    description: "CSS Grid provides a two-dimensional layout system with rows and columns.",
    concept: "CSS Grid",
    conceptExplanation:
      "CSS Grid lets you define a 2D layout with explicit rows and columns.\n\nKey container properties:\n• display: grid\n• grid-template-columns: repeat(3, 1fr)\n• grid-template-rows: auto 1fr auto\n• gap: 16px\n• grid-template-areas (named regions)\n\nKey item properties:\n• grid-column: 1 / 3 (span columns)\n• grid-row: 1 / 2\n• grid-area: header",
    codeExample: `.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }`,
    starterCode: `// CSS Grid navigates a 2D space
// Think: grid-column controls horizontal (right/left)
//        grid-row controls vertical (down/up)
function gridMove(col, row) {
  for (let c = 0; c < col; c++) hero.move("right");
  for (let r = 0; r < row; r++) hero.move("down");
}

gridMove(2, 1); // move to column 3, row 2
gridMove(2, 1); // move to column 5, row 3`,
    solutionCode: `function gridMove(col, row) {
  for (let c = 0; c < col; c++) hero.move("right");
  for (let r = 0; r < row; r++) hero.move("down");
}

gridMove(2, 1);
gridMove(2, 1);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right 2 to gem at col 3, down 1, right 2 to gem at col 5, down 1 to exit.",
    tip: "Use grid-template-areas for named regions — it makes your layout self-documenting.",
  },

  {
    id: "html-css-6",
    courseId: "html-css",
    number: 6,
    title: "Responsive Design",
    description: "Responsive design adapts layouts to different screen sizes using media queries.",
    concept: "Media Queries",
    conceptExplanation:
      "Media queries apply CSS rules only when certain conditions are true (e.g., screen width).\n\nSyntax:\n@media (min-width: 768px) { ... }\n\nCommon breakpoints:\n• sm: 640px\n• md: 768px\n• lg: 1024px\n• xl: 1280px\n\nMobile-first approach: write base styles for small screens, then override for larger screens with min-width queries.",
    codeExample: `/* Mobile first — base styles */
.container {
  padding: 16px;
  font-size: 14px;
}

/* Tablet and above */
@media (min-width: 768px) {
  .container {
    padding: 32px;
    font-size: 16px;
  }
}

/* Desktop and above */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}`,
    starterCode: `// Media queries: different rules at different breakpoints
// Simulate 3 screen sizes (mobile→tablet→desktop)
const screens = [
  { name: "mobile",  steps: 1 },
  { name: "tablet",  steps: 2 },
  { name: "desktop", steps: 3 },
];

for (const screen of screens) {
  for (let i = 0; i < screen.steps; i++) {
    hero.move("right");
  }
  if (screen.name !== "desktop") hero.move("down");
}`,
    solutionCode: `const screens = [
  { name: "mobile",  steps: 1 },
  { name: "tablet",  steps: 2 },
  { name: "desktop", steps: 3 },
];

for (const screen of screens) {
  for (let i = 0; i < screen.steps; i++) {
    hero.move("right");
  }
  if (screen.name !== "desktop") hero.move("down");
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","wall","wall","wall","wall"],
      ["wall","wall","empty","gem","gem","wall","wall"],
      ["wall","wall","wall","wall","empty","gem","gem"],
      ["wall","wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right 1 (gem), down 1, right 2 (gems), down 1, right 2 (gems), right 1 to exit.",
    tip: "Always design mobile-first. It's easier to add complexity for larger screens than to remove it.",
  },

  {
    id: "html-css-7",
    courseId: "html-css",
    number: 7,
    title: "CSS Variables",
    description: "CSS custom properties (variables) let you define reusable values.",
    concept: "CSS Custom Properties",
    conceptExplanation:
      "CSS variables (custom properties) store reusable values.\n\nDefine in :root for global access:\n:root {\n  --color-primary: #4f46e5;\n  --spacing-md: 16px;\n}\n\nUse with var():\n.button { background: var(--color-primary); padding: var(--spacing-md); }\n\nVariables cascade — you can override them per-component:\n.dark-theme { --color-primary: #818cf8; }",
    codeExample: `:root {
  --color-primary: #4f46e5;
  --color-secondary: #7c3aed;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --border-radius: 8px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
}

.button:hover {
  background: var(--color-secondary);
}`,
    starterCode: `// CSS variables: define once, use everywhere
const cssVars = {
  "--move-right": 3,
  "--move-down": 2,
  "--move-right-2": 2,
};

for (let i = 0; i < cssVars["--move-right"]; i++) hero.move("right");
for (let i = 0; i < cssVars["--move-down"]; i++) hero.move("down");
for (let i = 0; i < cssVars["--move-right-2"]; i++) hero.move("right");`,
    solutionCode: `const cssVars = {
  "--move-right": 3,
  "--move-down": 2,
  "--move-right-2": 2,
};

for (let i = 0; i < cssVars["--move-right"]; i++) hero.move("right");
for (let i = 0; i < cssVars["--move-down"]; i++) hero.move("down");
for (let i = 0; i < cssVars["--move-right-2"]; i++) hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","exit","wall"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right 2 to gem, down 2 to row 3, right 2 more collecting gems, exit at col 5.",
    tip: "Naming CSS variables semantically (--color-primary vs --indigo-600) makes themes easy to swap.",
  },

  {
    id: "html-css-8",
    courseId: "html-css",
    number: 8,
    title: "CSS Transitions",
    description: "Transitions smoothly animate property changes on hover or state change.",
    concept: "CSS Transitions & Animations",
    conceptExplanation:
      "Transitions animate a CSS property change over time:\ntransition: property duration easing delay\n\nExample:\n.button {\n  background: blue;\n  transition: background 0.3s ease;\n}\n.button:hover { background: purple; }\n\nFor continuous animations use @keyframes:\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n.loader { animation: spin 1s linear infinite; }",
    codeExample: `.card {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-enter {
  animation: fadeIn 0.4s ease forwards;
}`,
    starterCode: `// Transitions: state change over time
// Animate 3 "states" — each with different moves
const states = [
  { state: "idle",    dir: "right", steps: 2 },
  { state: "hover",   dir: "down",  steps: 1 },
  { state: "active",  dir: "right", steps: 3 },
];

for (const s of states) {
  for (let i = 0; i < s.steps; i++) {
    hero.move(s.dir);
  }
}`,
    solutionCode: `const states = [
  { state: "idle",    dir: "right", steps: 2 },
  { state: "hover",   dir: "down",  steps: 1 },
  { state: "active",  dir: "right", steps: 3 },
];

for (const s of states) {
  for (let i = 0; i < s.steps; i++) {
    hero.move(s.dir);
  }
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","empty","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right 2, gem at col 3. down 1. right 3: gem at col 3, gem at col 5, exit at col 6.",
    tip: "Keep transition durations short (200-400ms) — fast enough to feel snappy, slow enough to be visible.",
  },

  {
    id: "html-css-9",
    courseId: "html-css",
    number: 9,
    title: "Semantic HTML",
    description: "Semantic HTML uses meaningful tags that describe their content's purpose.",
    concept: "Semantic Elements",
    conceptExplanation:
      "Semantic HTML uses tags that convey meaning about their content:\n• <header> — site or section header\n• <nav> — navigation links\n• <main> — primary content\n• <article> — standalone content\n• <section> — thematic group\n• <aside> — side content\n• <footer> — site or section footer\n\nBenefits: accessibility (screen readers), SEO, and code readability. Don't just use <div> for everything.",
    codeExample: `<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Article Title</h1>
      <section>
        <h2>Section 1</h2>
        <p>Content here...</p>
      </section>
    </article>
    <aside>Related links</aside>
  </main>

  <footer>© 2026</footer>
</body>`,
    starterCode: `// Semantic HTML has a logical page structure
// header → nav → main → article → section → footer
const pageStructure = [
  { tag: "header",  move: () => hero.move("right") },
  { tag: "nav",     move: () => hero.move("right") },
  { tag: "main",    move: () => hero.move("down") },
  { tag: "article", move: () => hero.move("right") },
  { tag: "section", move: () => hero.move("right") },
  { tag: "footer",  move: () => hero.move("down") },
];

for (const part of pageStructure) {
  part.move();
}`,
    solutionCode: `const pageStructure = [
  { tag: "header",  move: () => hero.move("right") },
  { tag: "nav",     move: () => hero.move("right") },
  { tag: "main",    move: () => hero.move("down") },
  { tag: "article", move: () => hero.move("right") },
  { tag: "section", move: () => hero.move("right") },
  { tag: "footer",  move: () => hero.move("down") },
];

for (const part of pageStructure) {
  part.move();
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right→right→gem, down, right→right→gems, down→exit.",
    tip: "Use semantic tags for layout structure and <div>/<span> only for styling hooks.",
  },

  {
    id: "html-css-10",
    courseId: "html-css",
    number: 10,
    title: "CSS Specificity",
    description: "Specificity determines which CSS rule wins when multiple rules apply to the same element.",
    concept: "Specificity & Cascade",
    conceptExplanation:
      "When multiple rules target the same element, the most specific one wins.\n\nSpecificity is scored (A, B, C, D):\n• A: inline styles (1,0,0,0)\n• B: IDs (0,1,0,0)\n• C: classes, attributes, pseudo-classes (0,0,1,0)\n• D: elements, pseudo-elements (0,0,0,1)\n\nExample:\n• p → (0,0,0,1)\n• .text → (0,0,1,0)\n• #hero → (0,1,0,0)\n• #hero .text → (0,1,1,0) — wins\n\nequal specificity → last rule wins (cascade).",
    codeExample: `/* Specificity: (0,0,0,1) */
p { color: gray; }

/* Specificity: (0,0,1,0) — wins over element */
.highlight { color: blue; }

/* Specificity: (0,1,0,0) — wins over class */
#title { color: red; }

/* Specificity: (0,1,1,0) — wins over id alone */
#title.highlight { color: purple; }`,
    starterCode: `// CSS specificity: higher score wins
// Score rules and pick the highest one
const rules = [
  { selector: "p",              specificity: 1,   dir: "up" },
  { selector: ".text",          specificity: 10,  dir: "left" },
  { selector: "#hero",          specificity: 100, dir: "right" },
  { selector: "#hero .text",    specificity: 110, dir: "right" },
];

const winning = rules.reduce((a, b) => a.specificity > b.specificity ? a : b);

for (let i = 0; i < 4; i++) {
  hero.move(winning.dir);
}
hero.move("down");`,
    solutionCode: `const rules = [
  { selector: "p",              specificity: 1,   dir: "up" },
  { selector: ".text",          specificity: 10,  dir: "left" },
  { selector: "#hero",          specificity: 100, dir: "right" },
  { selector: "#hero .text",    specificity: 110, dir: "right" },
];

const winning = rules.reduce((a, b) => a.specificity > b.specificity ? a : b);

for (let i = 0; i < 4; i++) {
  hero.move(winning.dir);
}
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect both 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The highest specificity is #hero .text (110), so move right 4, collecting gems, then down 1 to exit.",
    tip: "Avoid !important — it breaks the cascade and makes debugging painful. Use proper specificity instead.",
  },

  {
    id: "html-css-11",
    courseId: "html-css",
    number: 11,
    title: "Forms & Inputs",
    description: "HTML forms collect user input with various input types and attributes.",
    concept: "HTML Forms",
    conceptExplanation:
      "Forms collect user data and submit it to a server.\n\n<form action='/submit' method='POST'>\n  <label for='email'>Email</label>\n  <input type='email' id='email' name='email' required />\n  <input type='submit' value='Send' />\n</form>\n\nKey input types: text, email, password, number, checkbox, radio, file, date, range\nKey attributes: required, placeholder, min/max, pattern, disabled, readonly",
    codeExample: `<form action="/register" method="POST">
  <label for="name">Name</label>
  <input type="text" id="name" name="name"
         placeholder="Your name" required />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password</label>
  <input type="password" id="password" name="password"
         minlength="8" required />

  <button type="submit">Create Account</button>
</form>`,
    starterCode: `// HTML forms: each input is a field to fill
// Fill 5 form fields, then submit
const formFields = [
  { name: "name",     dir: "right" },
  { name: "email",    dir: "right" },
  { name: "password", dir: "right" },
  { name: "confirm",  dir: "down" },
  { name: "agree",    dir: "right" },
];

for (const field of formFields) {
  hero.move(field.dir);
}
hero.move("right"); // submit`,
    solutionCode: `const formFields = [
  { name: "name",     dir: "right" },
  { name: "email",    dir: "right" },
  { name: "password", dir: "right" },
  { name: "confirm",  dir: "down" },
  { name: "agree",    dir: "right" },
];

for (const field of formFields) {
  hero.move(field.dir);
}
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down×2, right×2 (gems), right×1 to exit.",
    tip: "Always use <label> elements linked to inputs via for/id — it improves accessibility and click area.",
  },

  {
    id: "html-css-12",
    courseId: "html-css",
    number: 12,
    title: "Grand Finale",
    description: "Build a complete webpage using all the HTML & CSS skills you've mastered.",
    concept: "Putting It All Together",
    conceptExplanation:
      "A production webpage combines all the concepts:\n1. Semantic HTML structure (header, nav, main, footer)\n2. CSS reset + box-sizing: border-box\n3. CSS variables for theming\n4. Flexbox/Grid for layout\n5. Media queries for responsiveness\n6. Transitions for interactivity\n7. Forms for user input\n\nModern workflow: write semantic HTML first, add CSS to style it, test on mobile, add interactions last.",
    codeExample: `/* 1. Variables */
:root { --primary: #4f46e5; --gap: 16px; }

/* 2. Reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; }

/* 3. Semantic structure */
body { font-family: system-ui; }
header { display: flex; justify-content: space-between; padding: var(--gap); }
main { display: grid; grid-template-columns: 1fr 3fr; gap: var(--gap); }

/* 4. Responsive */
@media (max-width: 768px) {
  main { grid-template-columns: 1fr; }
}

/* 5. Interactive */
.btn { transition: transform 0.2s; }
.btn:hover { transform: scale(1.05); }`,
    starterCode: `// Grand finale: use everything!
// Navigate a complex dungeon using all your CSS skills
function cssPattern(pattern) {
  for (const [dir, steps] of pattern) {
    for (let i = 0; i < steps; i++) hero.move(dir);
  }
}

// Layout: flexbox row → grid column → responsive adjustment
cssPattern([["right", 2], ["down", 1], ["right", 3], ["down", 2], ["right", 1]]);`,
    solutionCode: `function cssPattern(pattern) {
  for (const [dir, steps] of pattern) {
    for (let i = 0; i < steps; i++) hero.move(dir);
  }
}

cssPattern([["right", 2], ["down", 1], ["right", 3], ["down", 2], ["right", 1]]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","wall","wall","wall"],
      ["wall","wall","wall","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 to gem, down×1, right×3 collecting 3 gems, down×2, right×1 to gem+exit.",
    tip: "You now know enough HTML & CSS to build any static website. Next: add JavaScript for interactivity!",
  },
];
