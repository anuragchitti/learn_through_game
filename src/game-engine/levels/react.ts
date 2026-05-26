import { LevelDefinition } from "../types";

export const reactLevels: LevelDefinition[] = [
  {
    id: "react-1",
    courseId: "react",
    number: 1,
    title: "JSX & Components",
    description: "React apps are made of components. Move the hero using a component-like function.",
    concept: "Components & JSX",
    conceptExplanation:
      "React components are functions that return JSX — a syntax that looks like HTML inside JavaScript. Components are reusable, composable, and isolated. A component name must start with a capital letter.",
    codeExample: `function Button({ label }) {
  return <button>{label}</button>;
}

// Used as: <Button label="Click me" />`,
    starterCode: `// Think of this as a React component rendering moves
function HeroAction({ direction, times }) {
  for (let i = 0; i < times; i++) {
    hero.move(direction);
  }
}

HeroAction({ direction: "right", times: 3 });
HeroAction({ direction: "down", times: 1 });
HeroAction({ direction: "right", times: 2 });`,
    solutionCode: `function HeroAction({ direction, times }) {
  for (let i = 0; i < times; i++) {
    hero.move(direction);
  }
}

HeroAction({ direction: "right", times: 3 });
HeroAction({ direction: "down", times: 1 });
HeroAction({ direction: "right", times: 2 });`,
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
    hint: "Destructure { direction, times } from the props object — just like React does.",
    tip: "React components are just functions. Props are just arguments. JSX is just syntax sugar.",
  },

  {
    id: "react-2",
    courseId: "react",
    number: 2,
    title: "Props",
    description: "Pass data into components via props to make them reusable.",
    concept: "Props",
    conceptExplanation:
      "Props (properties) are how you pass data to React components — like function arguments. They flow down from parent to child (one-way data flow). Props are read-only inside the component — never mutate them.",
    codeExample: `function Greeting({ name, age }) {
  return <p>{name} is {age} years old</p>;
}

<Greeting name="Alice" age={30} />`,
    starterCode: `function March({ direction, steps, label }) {
  for (let i = 0; i < steps; i++) {
    hero.move(direction);
  }
}

March({ direction: "right", steps: 4, label: "Phase 1" });
March({ direction: "down", steps: 1, label: "Turn" });
March({ direction: "right", steps: 3, label: "Phase 2" });`,
    solutionCode: `function March({ direction, steps, label }) {
  for (let i = 0; i < steps; i++) {
    hero.move(direction);
  }
}

March({ direction: "right", steps: 4, label: "Phase 1" });
March({ direction: "down", steps: 1, label: "Turn" });
March({ direction: "right", steps: 3, label: "Phase 2" });`,
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
    hint: "Each March() call is like rendering a component with different props.",
    tip: "Props make components reusable. One March component replaces three separate movement functions.",
  },

  {
    id: "react-3",
    courseId: "react",
    number: 3,
    title: "useState",
    description: "Simulate React's useState to track hero position as state.",
    concept: "useState Hook",
    conceptExplanation:
      "`useState` is React's most fundamental hook. It returns a value and a setter: `const [count, setCount] = useState(0)`. Calling the setter re-renders the component with the new value. State drives the UI.",
    codeExample: `const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);  // triggers re-render
}`,
    starterCode: `// Simulating useState — state drives behaviour
function useState(initial) {
  let value = initial;
  const setValue = (next) => { value = next; };
  return [() => value, setValue];
}

const [getSteps, setSteps] = useState(0);

while (getSteps() < 5) {
  hero.moveRight();
  setSteps(getSteps() + 1);
}`,
    solutionCode: `function useState(initial) {
  let value = initial;
  const setValue = (next) => { value = next; };
  return [() => value, setValue];
}

const [getSteps, setSteps] = useState(0);

while (getSteps() < 5) {
  hero.moveRight();
  setSteps(getSteps() + 1);
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
    hint: "getSteps() < 5 runs while state is 0,1,2,3,4 — five iterations total.",
    tip: "In real React, setState is async and batched. Don't rely on reading state immediately after setting.",
  },

  {
    id: "react-4",
    courseId: "react",
    number: 4,
    title: "useEffect",
    description: "Simulate useEffect to trigger side effects when state changes.",
    concept: "useEffect Hook",
    conceptExplanation:
      "`useEffect` runs code after render, optionally when specific values change. `useEffect(() => { ... }, [dep])` — the dependency array controls when it re-runs. Empty array `[]` means run once on mount. No array means run every render.",
    codeExample: `useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);  // re-runs when count changes`,
    starterCode: `// useEffect simulation: callback runs whenever deps change
function useEffect(callback, deps) {
  callback();  // simplified — always run for this demo
}

const moves = ["right", "right", "right", "down", "right", "right"];

useEffect(() => {
  for (const m of moves) {
    hero.move(m);
  }
}, [moves]);`,
    solutionCode: `function useEffect(callback, deps) {
  callback();
}

const moves = ["right", "right", "right", "down", "right", "right"];

useEffect(() => {
  for (const m of moves) {
    hero.move(m);
  }
}, [moves]);`,
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
    hint: "The callback inside useEffect fires the moves — the deps array would control re-runs in real React.",
    tip: "Forgetting a dependency causes stale closure bugs. ESLint's exhaustive-deps rule catches these.",
  },

  {
    id: "react-5",
    courseId: "react",
    number: 5,
    title: "Lists & Keys",
    description: "Render a list of move items — each needs a unique key.",
    concept: "Lists, .map(), and Keys",
    conceptExplanation:
      "In React you render lists with `.map()` — each element must have a unique `key` prop so React can track changes efficiently. Keys must be stable, unique siblings. Using array index as key is a last resort.",
    codeExample: `const items = ["a", "b", "c"];

return (
  <ul>
    {items.map((item, i) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);`,
    starterCode: `const phases = [
  { id: "p1", direction: "right", steps: 3 },
  { id: "p2", direction: "down", steps: 1 },
  { id: "p3", direction: "right", steps: 3 },
];

// Simulate rendering a list — execute each phase
phases.map(({ id, direction, steps }) => {
  for (let i = 0; i < steps; i++) {
    hero.move(direction);
  }
});`,
    solutionCode: `const phases = [
  { id: "p1", direction: "right", steps: 3 },
  { id: "p2", direction: "down", steps: 1 },
  { id: "p3", direction: "right", steps: 3 },
];

phases.map(({ id, direction, steps }) => {
  for (let i = 0; i < steps; i++) {
    hero.move(direction);
  }
});`,
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
    hint: "Destructure { id, direction, steps } from each phase object in the map callback.",
    tip: "Use a stable, unique ID from your data as the key — never use Math.random() as a key.",
  },

  {
    id: "react-6",
    courseId: "react",
    number: 6,
    title: "Conditional Rendering",
    description: "Render different moves based on a condition — like ternaries in JSX.",
    concept: "Conditional Rendering",
    conceptExplanation:
      "React renders conditionally with `&&` (short-circuit) and ternaries `? :`. Inside JSX, `{condition && <Element />}` renders Element only when condition is true. Ternaries render one of two options.",
    codeExample: `// Short-circuit
{isLoggedIn && <Dashboard />}

// Ternary
{isLoggedIn ? <Dashboard /> : <Login />}`,
    starterCode: `const unlocked = true;
const bonus = false;

// Conditional execution (like conditional rendering)
if (unlocked) {
  hero.moveRight();
  hero.moveRight();
  hero.moveRight();
}

unlocked && hero.moveDown();
unlocked && hero.moveRight();
unlocked && hero.moveRight();

bonus ? hero.moveRight() : null;`,
    solutionCode: `const unlocked = true;
const bonus = false;

if (unlocked) {
  hero.moveRight();
  hero.moveRight();
  hero.moveRight();
}

unlocked && hero.moveDown();
unlocked && hero.moveRight();
unlocked && hero.moveRight();

bonus ? hero.moveRight() : null;`,
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
    hint: "`unlocked && hero.moveDown()` only runs hero.moveDown() when unlocked is true.",
    tip: "Be careful with `0 && <Component />` — it renders the number 0! Use `!!count &&` instead.",
  },

  {
    id: "react-7",
    courseId: "react",
    number: 7,
    title: "Event Handlers",
    description: "Wire event handlers to control the hero — like onClick in React.",
    concept: "Event Handlers",
    conceptExplanation:
      "React events use camelCase: `onClick`, `onChange`, `onSubmit`. You pass a function reference, not a call: `onClick={handleClick}` not `onClick={handleClick()}`. The latter runs immediately on render, not on click.",
    codeExample: `function Button() {
  const handleClick = () => {
    console.log("clicked!");
  };

  // Pass reference, not call:
  return <button onClick={handleClick}>Go</button>;
}`,
    starterCode: `// Simulating event-driven movement
const handleMove = (direction) => {
  hero.move(direction);
};

const events = [
  { type: "click", payload: "right" },
  { type: "click", payload: "right" },
  { type: "click", payload: "down" },
  { type: "click", payload: "right" },
  { type: "click", payload: "right" },
];

for (const event of events) {
  if (event.type === "click") {
    handleMove(event.payload);
  }
}`,
    solutionCode: `const handleMove = (direction) => {
  hero.move(direction);
};

const events = [
  { type: "click", payload: "right" },
  { type: "click", payload: "right" },
  { type: "click", payload: "down" },
  { type: "click", payload: "right" },
  { type: "click", payload: "right" },
];

for (const event of events) {
  if (event.type === "click") {
    handleMove(event.payload);
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
    hint: "handleMove receives the payload direction and calls hero.move() with it.",
    tip: "Arrow functions in onClick create a new function on every render — useCallback memoizes them.",
  },

  {
    id: "react-8",
    courseId: "react",
    number: 8,
    title: "useReducer",
    description: "Use a reducer pattern to manage complex movement state.",
    concept: "useReducer Hook",
    conceptExplanation:
      "`useReducer` is like `useState` but for complex state logic. `reducer(state, action)` takes current state and an action, returns new state. Dispatch actions to trigger state changes. Predictable and testable.",
    codeExample: `function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "RESET":     return { count: 0 };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "INCREMENT" });`,
    starterCode: `function reducer(state, action) {
  switch (action.type) {
    case "MOVE":
      hero.move(action.direction);
      return { ...state, moves: state.moves + 1 };
    default:
      return state;
  }
}

function useReducer(fn, initial) {
  let state = initial;
  const dispatch = (action) => { state = fn(state, action); };
  return [() => state, dispatch];
}

const [getState, dispatch] = useReducer(reducer, { moves: 0 });

const actions = [
  { type: "MOVE", direction: "right" },
  { type: "MOVE", direction: "right" },
  { type: "MOVE", direction: "down" },
  { type: "MOVE", direction: "right" },
  { type: "MOVE", direction: "right" },
];

for (const action of actions) {
  dispatch(action);
}`,
    solutionCode: `function reducer(state, action) {
  switch (action.type) {
    case "MOVE":
      hero.move(action.direction);
      return { ...state, moves: state.moves + 1 };
    default:
      return state;
  }
}

function useReducer(fn, initial) {
  let state = initial;
  const dispatch = (action) => { state = fn(state, action); };
  return [() => state, dispatch];
}

const [getState, dispatch] = useReducer(reducer, { moves: 0 });

const actions = [
  { type: "MOVE", direction: "right" },
  { type: "MOVE", direction: "right" },
  { type: "MOVE", direction: "down" },
  { type: "MOVE", direction: "right" },
  { type: "MOVE", direction: "right" },
];

for (const action of actions) {
  dispatch(action);
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
    hint: "dispatch sends an action to the reducer. The reducer decides what to do with it.",
    tip: "useReducer shines when next state depends on previous state or multiple sub-values change together.",
  },

  {
    id: "react-9",
    courseId: "react",
    number: 9,
    title: "Custom Hooks",
    description: "Extract movement logic into a custom hook — reuse it anywhere.",
    concept: "Custom Hooks",
    conceptExplanation:
      "Custom hooks are functions starting with `use` that call other hooks. They let you extract and share stateful logic without changing component hierarchy. `useWindowSize`, `useFetch`, `useLocalStorage` — all custom hooks.",
    codeExample: `function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}`,
    starterCode: `// Custom hook that builds and executes a route
function useRoute() {
  const steps = [];

  const add = (direction, count) => {
    for (let i = 0; i < count; i++) steps.push(direction);
  };

  const run = () => {
    for (const s of steps) hero.move(s);
  };

  return { add, run };
}

const { add, run } = useRoute();
add("right", 3);
add("down", 1);
add("right", 3);
run();`,
    solutionCode: `function useRoute() {
  const steps = [];

  const add = (direction, count) => {
    for (let i = 0; i < count; i++) steps.push(direction);
  };

  const run = () => {
    for (const s of steps) hero.move(s);
  };

  return { add, run };
}

const { add, run } = useRoute();
add("right", 3);
add("down", 1);
add("right", 3);
run();`,
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
    hint: "useRoute() returns { add, run } — destructure to use both functions.",
    tip: "If you're copying stateful logic between components, it's time for a custom hook.",
  },

  {
    id: "react-10",
    courseId: "react",
    number: 10,
    title: "Context API",
    description: "Share hero config globally with Context — no prop drilling.",
    concept: "Context API",
    conceptExplanation:
      "Context lets you share data without passing props through every level. Create with `createContext`, provide with `<Provider value={...}>`, consume with `useContext`. Use for themes, auth state, or app-wide config.",
    codeExample: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}`,
    starterCode: `// Simulating Context
function createContext(defaultValue) {
  let value = defaultValue;
  return {
    provide: (v) => { value = v; },
    consume: () => value,
  };
}

const HeroCtx = createContext({ speed: 1, direction: "right" });

// Provider sets the value
HeroCtx.provide({ speed: 3, direction: "right" });

// Consumer reads it
const config = HeroCtx.consume();

for (let i = 0; i < config.speed; i++) {
  hero.move(config.direction);
}
hero.moveDown();
for (let i = 0; i < config.speed; i++) {
  hero.move(config.direction);
}`,
    solutionCode: `function createContext(defaultValue) {
  let value = defaultValue;
  return {
    provide: (v) => { value = v; },
    consume: () => value,
  };
}

const HeroCtx = createContext({ speed: 1, direction: "right" });
HeroCtx.provide({ speed: 3, direction: "right" });

const config = HeroCtx.consume();

for (let i = 0; i < config.speed; i++) {
  hero.move(config.direction);
}
hero.moveDown();
for (let i = 0; i < config.speed; i++) {
  hero.move(config.direction);
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
    hint: "config.speed is 3 so each loop runs 3 times — right 3, down 1, right 3.",
    tip: "Context isn't a state manager — combine it with useState or useReducer for reactive updates.",
  },

  {
    id: "react-11",
    courseId: "react",
    number: 11,
    title: "useMemo & useCallback",
    description: "Memoize an expensive path calculation so it doesn't recompute.",
    concept: "useMemo & useCallback",
    conceptExplanation:
      "`useMemo(() => compute(), [deps])` memoizes a computed value — recalculates only when deps change. `useCallback(() => fn, [deps])` memoizes a function reference. Both optimize performance by preventing unnecessary work.",
    codeExample: `// Without memoization — recalculates every render
const sorted = items.sort(compare);

// With useMemo — only recalculates when items changes
const sorted = useMemo(() => items.sort(compare), [items]);`,
    starterCode: `function useMemo(fn, deps) {
  return fn();  // simplified — always compute for demo
}

const baseSteps = [3, 1, 3];  // right, down, right counts

const path = useMemo(() => {
  const result = [];
  for (let i = 0; i < baseSteps[0]; i++) result.push("right");
  for (let i = 0; i < baseSteps[1]; i++) result.push("down");
  for (let i = 0; i < baseSteps[2]; i++) result.push("right");
  return result;
}, [baseSteps]);

for (const step of path) {
  hero.move(step);
}`,
    solutionCode: `function useMemo(fn, deps) {
  return fn();
}

const baseSteps = [3, 1, 3];

const path = useMemo(() => {
  const result = [];
  for (let i = 0; i < baseSteps[0]; i++) result.push("right");
  for (let i = 0; i < baseSteps[1]; i++) result.push("down");
  for (let i = 0; i < baseSteps[2]; i++) result.push("right");
  return result;
}, [baseSteps]);

for (const step of path) {
  hero.move(step);
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
    hint: "useMemo returns the result of fn() — in this demo it always recomputes, but in React it caches.",
    tip: "Don't over-memoize. Profile first. useMemo has overhead — use it only when a computation is expensive.",
  },

  {
    id: "react-12",
    courseId: "react",
    number: 12,
    title: "Component Composition",
    description: "Compose small focused components to build a complex dungeon navigator.",
    concept: "Composition over Inheritance",
    conceptExplanation:
      "React favours composition over inheritance. Build complex behaviour by combining small, focused components. Children are passed via `props.children`. Slots, render props, and higher-order components are all composition patterns.",
    codeExample: `function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h1>Title</h1>
  <p>Body text</p>
</Card>`,
    starterCode: `function withLogging(moveFn, label) {
  return function(...args) {
    moveFn(...args);
  };
}

function moveRight(steps) {
  for (let i = 0; i < steps; i++) hero.moveRight();
}
function moveDown(steps) {
  for (let i = 0; i < steps; i++) hero.moveDown();
}

const loggedRight = withLogging(moveRight, "right");
const loggedDown  = withLogging(moveDown, "down");

loggedRight(4);
loggedDown(1);
loggedRight(3);`,
    solutionCode: `function withLogging(moveFn, label) {
  return function(...args) {
    moveFn(...args);
  };
}

function moveRight(steps) {
  for (let i = 0; i < steps; i++) hero.moveRight();
}
function moveDown(steps) {
  for (let i = 0; i < steps; i++) hero.moveDown();
}

const loggedRight = withLogging(moveRight, "right");
const loggedDown  = withLogging(moveDown, "down");

loggedRight(4);
loggedDown(1);
loggedRight(3);`,
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
    hint: "withLogging wraps any move function — the returned function passes all args through.",
    tip: "Higher-order components (HOCs) wrap components to add behaviour — the functional equivalent of decorators.",
  },

  {
    id: "react-13",
    courseId: "react",
    number: 13,
    title: "Forms & Controlled Inputs",
    description: "Simulate controlled form input — React owns the value.",
    concept: "Controlled Components",
    conceptExplanation:
      "In React, form inputs are 'controlled' when their value comes from state. `<input value={val} onChange={e => setVal(e.target.value)} />`. React is the single source of truth. This enables validation, formatting, and predictable behaviour.",
    codeExample: `const [text, setText] = useState("");

<input
  value={text}
  onChange={e => setText(e.target.value)}
/>`,
    starterCode: `// Simulating a controlled form that drives hero commands
function createInput(value) {
  return {
    value,
    onChange: (newValue) => { return { value: newValue }; }
  };
}

let dirInput = createInput("right");

const commands = ["right", "right", "right", "down", "right", "right"];

for (const cmd of commands) {
  dirInput = { ...dirInput, ...dirInput.onChange(cmd) };
  hero.move(dirInput.value);
}`,
    solutionCode: `function createInput(value) {
  return {
    value,
    onChange: (newValue) => { return { value: newValue }; }
  };
}

let dirInput = createInput("right");

const commands = ["right", "right", "right", "down", "right", "right"];

for (const cmd of commands) {
  dirInput = { ...dirInput, ...dirInput.onChange(cmd) };
  hero.move(dirInput.value);
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
    hint: "Each iteration updates dirInput.value with the new command, then moves the hero.",
    tip: "Controlled inputs make forms predictable — you can validate, format, or sync to server on every keystroke.",
  },

  {
    id: "react-14",
    courseId: "react",
    number: 14,
    title: "React Router (Simulation)",
    description: "Simulate React Router's navigation to move between dungeon rooms.",
    concept: "Client-Side Routing",
    conceptExplanation:
      "React Router maps URL paths to components. `<Route path='/home' element={<Home />} />`. `useNavigate` programmatically navigates. `useParams` reads URL parameters. The URL becomes a source of truth for app state.",
    codeExample: `import { useNavigate, useParams } from "react-router-dom";

function Room() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(\`/room/\${id + 1}\`)}>
      Next Room
    </button>
  );
}`,
    starterCode: `// Simulating router-driven navigation
const routes = {
  "/room/1": () => { hero.moveRight(); hero.moveRight(); },
  "/room/2": () => { hero.moveDown(); hero.moveRight(); hero.moveRight(); },
  "/room/3": () => { hero.moveDown(); hero.moveRight(); },
};

function navigate(path) {
  const handler = routes[path];
  if (handler) handler();
}

navigate("/room/1");
navigate("/room/2");
navigate("/room/3");`,
    solutionCode: `const routes = {
  "/room/1": () => { hero.moveRight(); hero.moveRight(); },
  "/room/2": () => { hero.moveDown(); hero.moveRight(); hero.moveRight(); },
  "/room/3": () => { hero.moveDown(); hero.moveRight(); },
};

function navigate(path) {
  const handler = routes[path];
  if (handler) handler();
}

navigate("/room/1");
navigate("/room/2");
navigate("/room/3");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall","wall"],
      ["wall","wall","wall","empty","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Each route handler fires the hero moves for that 'room'. Navigate through all three.",
    tip: "React Router 6+ uses `<Routes>` and `<Route element={}>` — the render prop API is gone.",
  },

  {
    id: "react-15",
    courseId: "react",
    number: 15,
    title: "React Grand Finale",
    description: "The ultimate React dungeon — hooks, context, reducer, and composition.",
    concept: "React Mastery",
    conceptExplanation:
      "You've learned React's core: components, props, state, effects, context, reducers, custom hooks, memoization, composition, forms, and routing. React's model is simple: UI = f(state). Everything else is patterns built on top of that.",
    codeExample: `// The React mental model
const ui = component(state, props);
// When state or props change, React re-runs component()`,
    starterCode: `// Full React-inspired dungeon run
function createStore(reducer, initial) {
  let state = initial;
  const dispatch = (action) => { state = reducer(state, action); };
  const getState = () => state;
  return { dispatch, getState };
}

function reducer(state, action) {
  switch (action.type) {
    case "MOVE":
      hero.move(action.dir);
      return { ...state, steps: state.steps + 1 };
    default:
      return state;
  }
}

const store = createStore(reducer, { steps: 0 });

const plan = [
  ["right", 4], ["down", 1], ["right", 3], ["down", 1], ["right", 2]
];

for (const [dir, count] of plan) {
  for (let i = 0; i < count; i++) {
    store.dispatch({ type: "MOVE", dir });
  }
}`,
    solutionCode: `function createStore(reducer, initial) {
  let state = initial;
  const dispatch = (action) => { state = reducer(state, action); };
  const getState = () => state;
  return { dispatch, getState };
}

function reducer(state, action) {
  switch (action.type) {
    case "MOVE":
      hero.move(action.dir);
      return { ...state, steps: state.steps + 1 };
    default:
      return state;
  }
}

const store = createStore(reducer, { steps: 0 });

const plan = [
  ["right", 4], ["down", 1], ["right", 3], ["down", 1], ["right", 2]
];

for (const [dir, count] of plan) {
  for (let i = 0; i < count; i++) {
    store.dispatch({ type: "MOVE", dir });
  }
}`,
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
    hint: "The plan array uses destructuring: [dir, count] unpacks each tuple directly in the for-of.",
    tip: "Congratulations! You've finished the React course. You're ready to build real apps with components, state, and hooks.",
  },
];
