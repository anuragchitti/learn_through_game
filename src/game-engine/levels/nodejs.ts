import { LevelDefinition } from "../types";

export const nodejsLevels: LevelDefinition[] = [
  {
    id: "nodejs-1",
    courseId: "nodejs",
    number: 1,
    title: "Node.js & the Event Loop",
    description: "Node.js runs JavaScript outside the browser using a non-blocking event loop.",
    concept: "Node.js Runtime",
    conceptExplanation:
      "Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JS on the server.\n\nKey features:\n• Single-threaded, non-blocking I/O\n• Event loop: handles async operations (file I/O, network) without blocking\n• CommonJS modules: require/module.exports\n• npm: package manager with millions of packages\n\nUse Node.js for: web servers, APIs, CLI tools, build tools, real-time apps.",
    codeExample: `// hello.js — run with: node hello.js
console.log('Server starting...');

setTimeout(() => {
  console.log('Async task done');
}, 1000);

console.log('This prints before async task');

// Output:
// Server starting...
// This prints before async task
// Async task done (after 1s)`,
    starterCode: `// Node event loop: sync code runs first, then callbacks
const tasks = [
  { type: "sync",  action: () => hero.move("right") },
  { type: "sync",  action: () => hero.move("right") },
  { type: "async", action: () => hero.move("down") },
  { type: "sync",  action: () => hero.move("right") },
];

const syncTasks = tasks.filter(t => t.type === "sync");
const asyncTasks = tasks.filter(t => t.type === "async");

for (const t of syncTasks) t.action();
for (const t of asyncTasks) t.action();`,
    solutionCode: `const tasks = [
  { type: "sync",  action: () => hero.move("right") },
  { type: "sync",  action: () => hero.move("right") },
  { type: "async", action: () => hero.move("down") },
  { type: "sync",  action: () => hero.move("right") },
];

const syncTasks = tasks.filter(t => t.type === "sync");
const asyncTasks = tasks.filter(t => t.type === "async");

for (const t of syncTasks) t.action();
for (const t of asyncTasks) t.action();`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","wall"],
      ["wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Sync tasks: right×3 (gems). Async task: down. Then exit via down.",
    tip: "The event loop is why Node.js can handle thousands of concurrent connections with a single thread.",
  },

  {
    id: "nodejs-2",
    courseId: "nodejs",
    number: 2,
    title: "Modules & require",
    description: "Node.js uses a module system to split code across files.",
    concept: "CommonJS Modules",
    conceptExplanation:
      "Node.js uses CommonJS modules by default.\n\nExporting:\nmodule.exports = { myFunc };\n// or\nexports.myFunc = myFunc;\n\nImporting:\nconst { myFunc } = require('./myModule');\nconst express = require('express'); // npm package\nconst path = require('path'); // built-in module\n\nES Modules (modern):\nexport default myFunc;\nexport { helper };\nimport myFunc from './myModule.js';\n\nEnable ESM: 'type': 'module' in package.json or use .mjs extension.",
    codeExample: `// math.js — export functions
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
module.exports = { add, multiply };

// app.js — import and use
const { add, multiply } = require('./math');
console.log(add(2, 3));       // 5
console.log(multiply(4, 5));  // 20

// Built-in modules
const fs   = require('fs');
const path = require('path');
const http = require('http');`,
    starterCode: `// Modules: import functionality, then use it
function requireModule(name) {
  const modules = { math: 2, http: 1, path: 1 };
  return modules[name] ?? 0;
}

const steps = requireModule("math") + requireModule("http");
for (let i = 0; i < steps; i++) hero.move("right");
hero.move("down");
for (let i = 0; i < requireModule("path"); i++) hero.move("right");`,
    solutionCode: `function requireModule(name) {
  const modules = { math: 2, http: 1, path: 1 };
  return modules[name] ?? 0;
}

const steps = requireModule("math") + requireModule("http");
for (let i = 0; i < steps; i++) hero.move("right");
hero.move("down");
for (let i = 0; i < requireModule("path"); i++) hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","wall"],
      ["wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "math=2, http=1 → right×3 collecting gems. down. path=1 → right×1. down to exit.",
    tip: "Prefer named exports over default exports — they're easier to autocomplete and refactor.",
  },

  {
    id: "nodejs-3",
    courseId: "nodejs",
    number: 3,
    title: "File System (fs)",
    description: "Node's built-in fs module reads and writes files asynchronously.",
    concept: "Node.js File System",
    conceptExplanation:
      "The fs module provides file system operations:\n\n// Async (callback)\nfs.readFile('file.txt', 'utf8', (err, data) => { ... });\nfs.writeFile('out.txt', 'content', err => { ... });\n\n// Promise-based (modern)\nconst fs = require('fs/promises');\nconst data = await fs.readFile('file.txt', 'utf8');\nawait fs.writeFile('out.txt', data);\n\n// Sync (blocks — avoid in servers)\nconst data = fs.readFileSync('file.txt', 'utf8');\n\nOther: fs.mkdir, fs.readdir, fs.unlink, fs.stat",
    codeExample: `const fs = require('fs/promises');

async function processFile(inputPath, outputPath) {
  try {
    const content = await fs.readFile(inputPath, 'utf8');
    const processed = content.toUpperCase();
    await fs.writeFile(outputPath, processed);
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

processFile('input.txt', 'output.txt');`,
    starterCode: `// fs operations: read → process → write
async function fsWorkflow() {
  const ops = ["readFile", "process", "writeFile", "confirm"];
  for (const op of ops) {
    hero.move("right");
  }
  hero.move("down");
  hero.move("right");
}

fsWorkflow();`,
    solutionCode: `async function fsWorkflow() {
  const ops = ["readFile", "process", "writeFile", "confirm"];
  for (const op of ops) {
    hero.move("right");
  }
  hero.move("down");
  hero.move("right");
}

fsWorkflow();`,
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
    hint: "right×3 (gems), down, right (gem), exit.",
    tip: "Always use async fs operations in servers. fs.readFileSync blocks the entire event loop.",
  },

  {
    id: "nodejs-4",
    courseId: "nodejs",
    number: 4,
    title: "HTTP Server",
    description: "Create a basic HTTP server using Node's built-in http module.",
    concept: "http.createServer",
    conceptExplanation:
      "Node's http module creates web servers:\n\nconst http = require('http');\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World');\n});\nserver.listen(3000);\n\nReq object: req.method, req.url, req.headers\nRes object: res.writeHead(status, headers), res.write(), res.end()\n\nSimple routing:\nif (req.url === '/') { ... }\nelse if (req.url === '/about') { ... }\nelse { res.writeHead(404); res.end('Not found'); }",
    codeExample: `const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    starterCode: `// HTTP server: route requests to handlers
const routes = [
  { path: "/",       method: "GET",  dir: "right" },
  { path: "/users",  method: "GET",  dir: "right" },
  { path: "/login",  method: "POST", dir: "down" },
  { path: "/logout", method: "POST", dir: "right" },
];

for (const route of routes) {
  hero.move(route.dir);
}
hero.move("right");`,
    solutionCode: `const routes = [
  { path: "/",       method: "GET",  dir: "right" },
  { path: "/users",  method: "GET",  dir: "right" },
  { path: "/login",  method: "POST", dir: "down" },
  { path: "/logout", method: "POST", dir: "right" },
];

for (const route of routes) {
  hero.move(route.dir);
}
hero.move("right");`,
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
    hint: "right×2 (gems), down, right×2 (gems), exit.",
    tip: "Use Express.js for real routing — it wraps the http module with a clean, middleware-based API.",
  },

  {
    id: "nodejs-5",
    courseId: "nodejs",
    number: 5,
    title: "Express.js",
    description: "Express is the most popular Node.js web framework for building APIs.",
    concept: "Express.js Basics",
    conceptExplanation:
      "Express adds routing, middleware, and convenience methods to Node's http module.\n\nconst express = require('express');\nconst app = express();\n\nRoute methods: app.get, app.post, app.put, app.delete\nRoute handler: (req, res) => { res.json(data); }\nMiddleware: app.use((req, res, next) => { ...; next(); })\nRoute params: app.get('/users/:id', ...)\nQuery params: req.query.search\nRequest body: app.use(express.json()); then req.body",
    codeExample: `const express = require('express');
const app = express();
app.use(express.json());

// GET all users
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }]);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// POST create user
app.post('/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  res.status(201).json(user);
});

app.listen(3000);`,
    starterCode: `// Express routing: method + path → handler
function expressRoute(method, path, steps) {
  for (let i = 0; i < steps; i++) hero.move("right");
}

expressRoute("GET",    "/",        2);  // home route
hero.move("down");
expressRoute("GET",    "/users",   2);  // list users
hero.move("down");
expressRoute("POST",   "/users",   1);  // create user`,
    solutionCode: `function expressRoute(method, path, steps) {
  for (let i = 0; i < steps; i++) hero.move("right");
}

expressRoute("GET",  "/",       2);
hero.move("down");
expressRoute("GET",  "/users",  2);
hero.move("down");
expressRoute("POST", "/users",  1);`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, right (gem), down to exit.",
    tip: "Express middleware runs in order. Put error handlers last with 4 parameters: (err, req, res, next).",
  },

  {
    id: "nodejs-6",
    courseId: "nodejs",
    number: 6,
    title: "Async/Await in Node",
    description: "Modern Node.js code uses async/await to handle asynchronous operations cleanly.",
    concept: "Promises & async/await",
    conceptExplanation:
      "Node.js is inherently async. Modern style uses async/await instead of callbacks.\n\nasync function fetchUser(id) {\n  const user = await db.findById(id);\n  return user;\n}\n\nError handling:\ntry/catch with await:\ntry {\n  const data = await fs.readFile('file.txt');\n} catch (err) {\n  console.error(err);\n}\n\nParallel execution:\nconst [a, b] = await Promise.all([opA(), opB()]);\n\nExpress async routes: wrap handlers in try/catch or use a wrapper like express-async-errors.",
    codeExample: `const express = require('express');
const fs = require('fs/promises');
const app = express();

app.get('/file/:name', async (req, res) => {
  try {
    const content = await fs.readFile(
      \`./files/\${req.params.name}\`,
      'utf8'
    );
    res.send(content);
  } catch (err) {
    res.status(404).json({ error: 'File not found' });
  }
});`,
    starterCode: `// async/await: sequential async operations
async function fetchData() {
  const ops = [
    { name: "connect to DB",  dir: "right" },
    { name: "fetch user",     dir: "right" },
    { name: "fetch orders",   dir: "down" },
    { name: "combine data",   dir: "right" },
    { name: "send response",  dir: "right" },
  ];
  for (const op of ops) {
    await hero.move(op.dir);
  }
}

fetchData();`,
    solutionCode: `async function fetchData() {
  const ops = [
    { name: "connect to DB", dir: "right" },
    { name: "fetch user",    dir: "right" },
    { name: "fetch orders",  dir: "down" },
    { name: "combine data",  dir: "right" },
    { name: "send response", dir: "right" },
  ];
  for (const op of ops) {
    hero.move(op.dir);
  }
}

fetchData();`,
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
    hint: "right×2 (gems), down, right×2 (gems), exit at col 5.",
    tip: "hero.move() is synchronous in this sandbox, so you don't need await — but in real Node, await every async call.",
  },

  {
    id: "nodejs-7",
    courseId: "nodejs",
    number: 7,
    title: "Middleware",
    description: "Middleware functions run between request and response to add functionality.",
    concept: "Express Middleware",
    conceptExplanation:
      "Middleware functions have access to req, res, and next().\n\nTypes:\n• Application: app.use(fn) — runs on every request\n• Router: router.use(fn) — runs on router requests\n• Built-in: express.json(), express.static()\n• Third-party: morgan (logging), helmet (security), cors\n\nPattern:\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next(); // Must call next() or the request hangs!\n});\n\nError middleware (4 args):\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});",
    codeExample: `const express = require('express');
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/protected', requireAuth, (req, res) => {
  res.json({ data: 'secret' });
});`,
    starterCode: `// Middleware pipeline: each step calls next()
const middlewares = [
  { name: "logger",    next: true,  dir: "right" },
  { name: "cors",      next: true,  dir: "right" },
  { name: "auth",      next: true,  dir: "right" },
  { name: "rateLimit", next: true,  dir: "down" },
  { name: "handler",   next: false, dir: "right" },
];

for (const mw of middlewares) {
  hero.move(mw.dir);
  // if !next: stop pipeline
}
hero.move("right");`,
    solutionCode: `const middlewares = [
  { name: "logger",    dir: "right" },
  { name: "cors",      dir: "right" },
  { name: "auth",      dir: "right" },
  { name: "rateLimit", dir: "down" },
  { name: "handler",   dir: "right" },
];

for (const mw of middlewares) {
  hero.move(mw.dir);
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
    hint: "right×3 (gems), down, right×2 (gems), down to exit.",
    tip: "Always call next() in middleware unless you've sent a response. Forgetting it leaves clients hanging.",
  },

  {
    id: "nodejs-8",
    courseId: "nodejs",
    number: 8,
    title: "Environment Variables",
    description: "Store configuration like API keys in environment variables, not source code.",
    concept: ".env & process.env",
    conceptExplanation:
      "Environment variables keep secrets out of your code.\n\n.env file (never commit to Git):\nPORT=3000\nDATABASE_URL=postgres://localhost/mydb\nJWT_SECRET=super_secret_key\n\nAccess with dotenv:\nrequire('dotenv').config();\nconst port = process.env.PORT ?? 3000;\n\nBest practices:\n• Add .env to .gitignore\n• Create a .env.example with placeholder values\n• Never log process.env in production\n• Use different .env files per environment (.env.production)",
    codeExample: `// .env
PORT=3000
DATABASE_URL=postgres://localhost/myapp
JWT_SECRET=abc123notreal

// app.js
require('dotenv').config();

const port = process.env.PORT ?? 3000;
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

app.listen(port, () => console.log(\`Port \${port}\`));`,
    starterCode: `// Environment variables: config from outside the code
const env = {
  PORT: 3000,
  DB_URL: "postgres://localhost/app",
  JWT_SECRET: "secret",
  NODE_ENV: "production",
};

// Each env var is a step in our configuration
const configSteps = Object.keys(env).length;
for (let i = 0; i < configSteps; i++) {
  hero.move("right");
}
hero.move("down");`,
    solutionCode: `const env = {
  PORT: 3000,
  DB_URL: "postgres://localhost/app",
  JWT_SECRET: "secret",
  NODE_ENV: "production",
};

const configSteps = Object.keys(env).length;
for (let i = 0; i < configSteps; i++) {
  hero.move("right");
}
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×4 (gems), down, down to exit.",
    tip: "Use Zod or joi to validate environment variables at startup — fail fast if config is missing.",
  },

  {
    id: "nodejs-9",
    courseId: "nodejs",
    number: 9,
    title: "REST API Design",
    description: "Design clean RESTful APIs with proper HTTP methods, status codes, and URL conventions.",
    concept: "REST Conventions",
    conceptExplanation:
      "REST (Representational State Transfer) uses HTTP methods and URLs to define resource operations:\n\nHTTP Methods:\n• GET /posts — list all\n• GET /posts/:id — get one\n• POST /posts — create\n• PUT /posts/:id — full update\n• PATCH /posts/:id — partial update\n• DELETE /posts/:id — remove\n\nStatus Codes:\n• 200 OK, 201 Created, 204 No Content\n• 400 Bad Request, 401 Unauthorized, 403 Forbidden\n• 404 Not Found, 409 Conflict\n• 500 Internal Server Error",
    codeExample: `// RESTful Express router
const router = express.Router();

router.get('/',         listPosts);     // GET /posts
router.get('/:id',      getPost);       // GET /posts/1
router.post('/',        createPost);    // POST /posts
router.patch('/:id',    updatePost);    // PATCH /posts/1
router.delete('/:id',   deletePost);    // DELETE /posts/1

// Responses
res.status(201).json(newPost);
res.status(204).end();
res.status(404).json({ error: 'Not found' });`,
    starterCode: `// REST: map operations to HTTP method + URL + status
const endpoints = [
  { method: "GET",    path: "/users",     status: 200, dir: "right" },
  { method: "POST",   path: "/users",     status: 201, dir: "right" },
  { method: "GET",    path: "/users/:id", status: 200, dir: "down" },
  { method: "PATCH",  path: "/users/:id", status: 200, dir: "right" },
  { method: "DELETE", path: "/users/:id", status: 204, dir: "right" },
];

for (const ep of endpoints) {
  hero.move(ep.dir);
}
hero.move("down");`,
    solutionCode: `const endpoints = [
  { method: "GET",    path: "/users",     status: 200, dir: "right" },
  { method: "POST",   path: "/users",     status: 201, dir: "right" },
  { method: "GET",    path: "/users/:id", status: 200, dir: "down" },
  { method: "PATCH",  path: "/users/:id", status: 200, dir: "right" },
  { method: "DELETE", path: "/users/:id", status: 204, dir: "right" },
];

for (const ep of endpoints) {
  hero.move(ep.dir);
}
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Use plural nouns for resources (/users not /user), never verbs (/getUser). HTTP method is the verb.",
  },

  {
    id: "nodejs-10",
    courseId: "nodejs",
    number: 10,
    title: "Grand Finale",
    description: "Build a complete Express API with middleware, routing, async handlers, and env vars.",
    concept: "Production Node.js",
    conceptExplanation:
      "A production-ready Node.js API combines everything:\n1. Environment validation (dotenv + validation)\n2. Security middleware (helmet, cors, rate-limiting)\n3. Logging (morgan or pino)\n4. Routing (Express Router per resource)\n5. Async error handling (express-async-errors or wrapper)\n6. Input validation (zod or joi)\n7. Database interaction (async, with proper error handling)\n8. Graceful shutdown (SIGTERM handler)\n\nnpm packages to know: express, dotenv, helmet, cors, morgan, zod, prisma/mongoose",
    codeExample: `require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(\`Running on \${PORT}\`));`,
    starterCode: `// Grand finale: full Node.js API lifecycle
function buildAPI() {
  const layers = [
    { step: "env config",     dir: "right" },
    { step: "middleware",     dir: "right" },
    { step: "routes",         dir: "right" },
    { step: "error handler",  dir: "down" },
    { step: "listen",         dir: "right" },
    { step: "handle request", dir: "right" },
    { step: "send response",  dir: "down" },
  ];
  for (const l of layers) hero.move(l.dir);
  hero.move("right");
}

buildAPI();`,
    solutionCode: `function buildAPI() {
  const layers = [
    { step: "env config",     dir: "right" },
    { step: "middleware",     dir: "right" },
    { step: "routes",         dir: "right" },
    { step: "error handler",  dir: "down" },
    { step: "listen",         dir: "right" },
    { step: "handle request", dir: "right" },
    { step: "send response",  dir: "down" },
  ];
  for (const l of layers) hero.move(l.dir);
  hero.move("right");
}

buildAPI();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down, right (gem), down to exit.",
    tip: "Ship it! You now know enough Node.js to build real APIs. Build something and put it on GitHub.",
  },
];
