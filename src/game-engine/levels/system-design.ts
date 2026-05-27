import { LevelDefinition } from "../types";

export const systemDesignLevels: LevelDefinition[] = [
  // ─── LEVEL 1 ── Load Balancing ───────────────────────────────────────────────
  {
    id: "system-design-1",
    courseId: "system-design",
    number: 1,
    title: "Load Balancing",
    description: "A load balancer distributes incoming traffic across multiple servers. Route requests to stay alive at scale!",
    concept: "Load Balancing",
    conceptExplanation:
      "A load balancer sits in front of your servers and distributes incoming requests so no single server becomes a bottleneck.\n\nCommon algorithms:\n• Round Robin — each server gets requests in turn\n• Least Connections — route to the server with the fewest active connections\n• IP Hash — same client always hits the same server (session stickiness)\n• Weighted Round Robin — servers with more capacity get more requests\n\nLoad balancers also perform health checks — if a server stops responding, traffic is rerouted automatically.\nLayer 4 (TCP) balancers are faster; Layer 7 (HTTP) balancers can route based on URL paths or headers.\nHorizontal scaling (adding more servers behind the balancer) is the foundation of high-availability architecture.",
    codeExample: `// Simulating a round-robin load balancer
const servers = ["server-A", "server-B", "server-C"];
let index = 0;

function getNextServer(): string {
  const server = servers[index % servers.length];
  index++;
  return server;
}

console.log(getNextServer()); // server-A
console.log(getNextServer()); // server-B
console.log(getNextServer()); // server-C
console.log(getNextServer()); // server-A (wraps around)`,
    starterCode: `// Route all requests through the load balancer
// Collect each server gem, then reach the exit

function routeRequest(direction) {
  hero.move(direction);
}

// Visit server-A, server-B, server-C, then exit
routeRequest("right");  // server-A gem
routeRequest("right");  // server-B gem
routeRequest("down");
routeRequest("right");  // server-C gem
routeRequest("right");  // gem
routeRequest("down");   // exit`,
    solutionCode: `function routeRequest(direction) {
  hero.move(direction);
}

routeRequest("right");
routeRequest("right");
routeRequest("down");
routeRequest("right");
routeRequest("right");
routeRequest("down");`,
    // hero(1,1) →(1,2)gem →(1,3)gem ↓(2,3) →(2,4)gem →(2,5) ↓... need valid grid
    // Grid 5 cols, 4 rows:
    // row0: wall wall wall wall wall wall
    // row1: wall hero gem  gem  wall wall
    // row2: wall wall wall gem  gem  wall
    // row3: wall wall wall wall exit wall
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "exit", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems (server requests)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (all servers healthy)" },
    ],
    hint: "Move right twice to collect two gems, then down, right twice for two more gems, then down to the exit.",
    tip: "Always place your load balancer before your app servers — it's your first line of defense against traffic spikes.",
  },

  // ─── LEVEL 2 ── Caching Strategies ──────────────────────────────────────────
  {
    id: "system-design-2",
    courseId: "system-design",
    number: 2,
    title: "Caching Strategies",
    description: "Caches serve repeated data without hitting your database. Warm the cache, then fly to the exit!",
    concept: "Caching Strategies",
    conceptExplanation:
      "A cache stores frequently accessed data in fast memory so repeated requests avoid slow disk or network calls.\n\nKey strategies:\n• Cache-Aside (Lazy Loading) — app checks cache first; on miss, loads from DB and populates cache\n• Write-Through — every write goes to cache AND DB simultaneously; reads are always warm\n• Write-Behind (Write-Back) — writes go to cache immediately, DB is updated asynchronously\n• Read-Through — cache sits between app and DB; cache fetches from DB on miss automatically\n\nCache eviction policies:\n• LRU (Least Recently Used) — evict the item not accessed for the longest time\n• LFU (Least Frequently Used) — evict the item accessed the fewest times\n• TTL (Time-to-Live) — expire entries after a fixed duration\n\nTools: Redis, Memcached, CDN edge caches, browser cache. Cache invalidation is famously hard — be explicit about TTLs.",
    codeExample: `// Cache-aside pattern
const cache = new Map<string, string>();

async function getUser(id: string): Promise<string> {
  if (cache.has(id)) {
    console.log("Cache HIT");
    return cache.get(id)!;
  }
  console.log("Cache MISS — querying DB");
  const user = await fetchFromDatabase(id); // slow
  cache.set(id, user);
  return user;
}

// LRU eviction (conceptual)
// If cache is full, evict the least recently used entry`,
    starterCode: `// Warm up the cache layer by layer
// Each gem is a cached entry — collect them all!

function checkCache(direction) {
  hero.move(direction);
}

checkCache("right");  // L1 cache hit
checkCache("right");  // L2 cache hit
checkCache("right");  // L3 cache hit
checkCache("down");
checkCache("down");
checkCache("left");   // DB result cached
checkCache("left");   // warm cache exit`,
    solutionCode: `function checkCache(direction) {
  hero.move(direction);
}

checkCache("right");
checkCache("right");
checkCache("right");
checkCache("down");
checkCache("down");
checkCache("left");
checkCache("left");`,
    // hero(1,1) →(1,2)gem →(1,3)gem →(1,4)gem ↓(2,4) ↓(3,4)gem ←(3,3)gem ←(3,2)exit? no, exit must be at end
    // Let's use:
    // row0: wall wall wall wall wall wall
    // row1: wall hero gem  gem  gem  wall
    // row2: wall wall wall wall gem  wall
    // row3: wall exit gem  gem  gem  wall  <- exit at col1, gems at 2,3,4
    // Actually hero needs to reach exit after gems. Let's do:
    // row3: wall exit wall wall wall wall — hero arrives at (3,2) after left from (3,3) needs exit at (3,2)?
    // Let me re-trace: (1,1)→right(1,2)gem→right(1,3)gem→right(1,4)gem→down(2,4)gem→down(3,4)gem→left(3,3)gem→left(3,2)exit? need exit at col2 row3...
    // Wait, I have 6 moves giving 5 gems + exit. Let me recount: right,right,right = 3 gems at (1,2),(1,3),(1,4); down= (2,4); down=(3,4); left=(3,3); left=(3,2). That's 3 moves collecting gems plus 4 moves navigating. Need gems at (1,2)(1,3)(1,4)(3,4)(3,3) = 5 gems, exit at (3,2).
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "wall"],
      ["wall", "wall", "exit", "gem",  "gem",  "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (cache layers)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (cache warmed up!)" },
    ],
    hint: "Go right 3 times, then down twice, left twice — the cache path snakes through the grid.",
    tip: "Cache-aside is the most common pattern. Always set a TTL — stale cache data can cause subtle, hard-to-debug bugs.",
  },

  // ─── LEVEL 3 ── Database Sharding ────────────────────────────────────────────
  {
    id: "system-design-3",
    courseId: "system-design",
    number: 3,
    title: "Database Sharding",
    description: "Sharding splits data across multiple databases. Navigate each shard to gather all the data!",
    concept: "Database Sharding",
    conceptExplanation:
      "Sharding is a horizontal scaling technique that partitions data across multiple database instances called shards.\n\nEach shard holds a subset of the total data — for example, users A-M on shard 1, N-Z on shard 2.\n\nCommon sharding keys:\n• User ID (range or hash-based) — most common for user-centric apps\n• Geography — shard by region to keep data close to users\n• Date/time — useful for time-series data (logs, events)\n\nChallenges:\n• Cross-shard queries — joining data across shards is expensive\n• Rebalancing — adding a new shard requires migrating data\n• Hot shards — if one shard gets most traffic, you lose the benefit\n• No cross-shard transactions — ACID guarantees weaken\n\nAlternatives: read replicas (for read-heavy loads), vertical scaling (for simpler setups). Shard only when you must.",
    codeExample: `// Hash-based shard routing
function getShard(userId: number, totalShards: number): number {
  return userId % totalShards;
}

const shards = ["shard-0 (users 0,3,6...)", "shard-1 (users 1,4,7...)", "shard-2 (users 2,5,8...)"];

console.log(shards[getShard(42, 3)]); // shard-0
console.log(shards[getShard(7, 3)]);  // shard-1
console.log(shards[getShard(11, 3)]); // shard-2

// Consistent hashing reduces rebalancing when shards change`,
    starterCode: `// Query each shard in order — collect the data gems!

function queryShard(direction) {
  hero.move(direction);
}

queryShard("down");   // shard-0
queryShard("down");   // shard-1
queryShard("right");  // shard-2
queryShard("right");  // shard-3
queryShard("up");     // shard-4
queryShard("right");  // exit`,
    solutionCode: `function queryShard(direction) {
  hero.move(direction);
}

queryShard("down");
queryShard("down");
queryShard("right");
queryShard("right");
queryShard("up");
queryShard("right");`,
    // hero(1,1) ↓(2,1)gem ↓(3,1)gem →(3,2)gem →(3,3)gem ↑(2,3)gem →(2,4)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "wall", "gem",  "exit"],
      ["wall", "gem",  "wall", "gem",  "wall"],
      ["wall", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (shard data)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (data aggregated!)" },
    ],
    hint: "Go down twice, right twice, up once, then right to the exit — wind through each shard.",
    tip: "Choose your shard key carefully upfront — resharding later is one of the most painful migrations in database engineering.",
  },

  // ─── LEVEL 4 ── CAP Theorem ──────────────────────────────────────────────────
  {
    id: "system-design-4",
    courseId: "system-design",
    number: 4,
    title: "CAP Theorem",
    description: "You can only guarantee two of three: Consistency, Availability, Partition Tolerance. Choose wisely!",
    concept: "CAP Theorem",
    conceptExplanation:
      "The CAP theorem states that a distributed system can only guarantee two of three properties simultaneously:\n\n• Consistency (C) — every read receives the most recent write or an error\n• Availability (A) — every request receives a (possibly stale) non-error response\n• Partition Tolerance (P) — the system continues operating even when network partitions drop messages between nodes\n\nIn practice, network partitions always happen, so P is non-negotiable. The real choice is C vs A:\n• CP systems (e.g., HBase, Zookeeper, MongoDB in strong mode) — sacrifice availability during a partition; return an error rather than stale data\n• AP systems (e.g., Cassandra, CouchDB, DynamoDB) — remain available during a partition but may return stale reads\n\nPACELC extends CAP: even without partitions, you trade off latency vs consistency. Most modern systems let you tune the trade-off per query.",
    codeExample: `// CAP trade-off example: AP vs CP
type Mode = "CP" | "AP";

function readUser(id: string, mode: Mode, partitionActive: boolean) {
  if (partitionActive && mode === "CP") {
    throw new Error("Partition detected — refusing to return stale data (CP)");
  }
  // AP mode: return possibly stale data
  return { id, name: "Alice", stale: partitionActive };
}

// CP: strong consistency, risking downtime during partition
readUser("1", "CP", true);  // throws — consistent but unavailable

// AP: always available, possibly stale
readUser("1", "AP", true);  // { id: "1", name: "Alice", stale: true }`,
    starterCode: `// Balance C, A, P trade-offs — navigate all three gem pillars

function pickGuarantee(direction) {
  hero.move(direction);
}

pickGuarantee("right");  // Consistency gem
pickGuarantee("down");
pickGuarantee("down");
pickGuarantee("right");  // Availability gem
pickGuarantee("up");
pickGuarantee("right");  // Partition gem
pickGuarantee("right");
pickGuarantee("down");
pickGuarantee("down");   // exit`,
    solutionCode: `function pickGuarantee(direction) {
  hero.move(direction);
}

pickGuarantee("right");
pickGuarantee("down");
pickGuarantee("down");
pickGuarantee("right");
pickGuarantee("up");
pickGuarantee("right");
pickGuarantee("right");
pickGuarantee("down");
pickGuarantee("down");`,
    // hero(1,1)→(1,2)gem ↓(2,2) ↓(3,2)gem →(3,3) ↑(2,3)gem →(2,4) →(2,5) ↓(3,5)gem ↓(4,5)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems (C, A, P pillars)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (trade-off understood!)" },
    ],
    hint: "Right for C gem, down twice for A gem, right then up for P gem, then navigate to the exit.",
    tip: "In most web apps you want AP — users prefer a slightly stale answer over an error. Reserve CP for financial or medical data.",
  },

  // ─── LEVEL 5 ── Message Queues ───────────────────────────────────────────────
  {
    id: "system-design-5",
    courseId: "system-design",
    number: 5,
    title: "Message Queues",
    description: "Message queues decouple producers from consumers. Process every message gem in the queue!",
    concept: "Message Queues",
    conceptExplanation:
      "A message queue is a buffer that holds messages between a producer (sender) and one or more consumers (receivers), decoupling them in time and space.\n\nKey benefits:\n• Decoupling — producer doesn't wait for consumer; they evolve independently\n• Load leveling — queue absorbs traffic spikes; consumers process at their own rate\n• Reliability — messages persist until acknowledged; no data loss on consumer crash\n• Fan-out — one message can be delivered to multiple consumers (pub/sub)\n\nDelivery guarantees:\n• At-most-once — message may be lost but never duplicated (fire-and-forget)\n• At-least-once — message delivered at least once; consumer must be idempotent\n• Exactly-once — the holy grail; expensive but possible with transactions\n\nPopular tools: RabbitMQ (AMQP), Apache Kafka (high-throughput log), AWS SQS, Google Pub/Sub. Kafka retains messages for replay; SQS deletes them after consumption.",
    codeExample: `// Simulating a message queue with a simple array
const queue: string[] = [];

function enqueue(message: string): void {
  queue.push(message);
  console.log(\`Produced: \${message}\`);
}

function dequeue(): string | undefined {
  const message = queue.shift(); // FIFO
  if (message) console.log(\`Consumed: \${message}\`);
  return message;
}

enqueue("order-placed");
enqueue("payment-received");
enqueue("email-send");

dequeue(); // Consumed: order-placed
dequeue(); // Consumed: payment-received`,
    starterCode: `// Drain the message queue — process each gem (message)

function processMessage(direction) {
  hero.move(direction);
}

processMessage("right");  // msg-1
processMessage("right");  // msg-2
processMessage("right");  // msg-3
processMessage("down");
processMessage("left");   // msg-4
processMessage("left");   // msg-5
processMessage("down");   // exit`,
    solutionCode: `function processMessage(direction) {
  hero.move(direction);
}

processMessage("right");
processMessage("right");
processMessage("right");
processMessage("down");
processMessage("left");
processMessage("left");
processMessage("down");`,
    // hero(1,1)→(1,2)gem→(1,3)gem→(1,4)gem ↓(2,4)gem ←(2,3)gem ←(2,2) ↓(3,2)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem" ],
      ["wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "exit", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (queue messages)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (queue drained!)" },
    ],
    hint: "Go right 3 times across the top of the queue, then down and left twice, then down to exit.",
    tip: "Make your consumers idempotent — with at-least-once delivery, the same message may arrive twice, and you need to handle that gracefully.",
  },

  // ─── LEVEL 6 ── API Gateways ─────────────────────────────────────────────────
  {
    id: "system-design-6",
    courseId: "system-design",
    number: 6,
    title: "API Gateways",
    description: "An API Gateway is the front door for all clients. Route through each service checkpoint to reach the exit!",
    concept: "API Gateways",
    conceptExplanation:
      "An API Gateway is a single entry point that sits between clients and your backend services, handling cross-cutting concerns so individual services don't have to.\n\nCore responsibilities:\n• Routing — forward requests to the correct microservice based on path or headers\n• Authentication & Authorization — validate JWTs or API keys before requests reach services\n• Rate Limiting — throttle clients to prevent abuse\n• SSL Termination — handle TLS so backend services communicate over plain HTTP\n• Request/Response Transformation — adapt payloads between clients and services\n• Observability — centralized logging, tracing, and metrics\n\nPopular options: AWS API Gateway, Kong, NGINX, Traefik, Envoy. BFF (Backend for Frontend) is a pattern where each client type (mobile, web) gets its own gateway tailored to its needs.",
    codeExample: `// Minimal API Gateway routing logic
type Route = { path: string; service: string; authRequired: boolean };

const routes: Route[] = [
  { path: "/users",   service: "user-service",   authRequired: true  },
  { path: "/products",service: "product-service", authRequired: false },
  { path: "/orders",  service: "order-service",   authRequired: true  },
];

function gateway(path: string, token?: string): string {
  const route = routes.find(r => path.startsWith(r.path));
  if (!route) return "404 Not Found";
  if (route.authRequired && !token) return "401 Unauthorized";
  return \`Forwarding to \${route.service}\`;
}

console.log(gateway("/users", "jwt-abc")); // Forwarding to user-service
console.log(gateway("/users"));            // 401 Unauthorized`,
    starterCode: `// Pass each gateway checkpoint (gem) in sequence

function passCheckpoint(direction) {
  hero.move(direction);
}

passCheckpoint("down");   // auth checkpoint
passCheckpoint("down");   // rate-limit checkpoint
passCheckpoint("right");  // routing gem
passCheckpoint("right");  // transform gem
passCheckpoint("up");     // logging gem
passCheckpoint("up");     // observability gem
passCheckpoint("right");  // exit`,
    solutionCode: `function passCheckpoint(direction) {
  hero.move(direction);
}

passCheckpoint("down");
passCheckpoint("down");
passCheckpoint("right");
passCheckpoint("right");
passCheckpoint("up");
passCheckpoint("up");
passCheckpoint("right");`,
    // hero(1,1) ↓(2,1)gem ↓(3,1)gem →(3,2)gem →(3,3) ↑(2,3)gem ↑(1,3)gem →(1,4)exit
    grid: [
      ["wall", "wall", "wall", "wall", "exit"],
      ["wall", "hero", "wall", "gem",  "wall"],
      ["wall", "gem",  "wall", "gem",  "wall"],
      ["wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (gateway checks)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (request forwarded!)" },
    ],
    hint: "Go down twice for two gems, right and right for more gems, then up twice and right to the exit.",
    tip: "Centralise cross-cutting concerns (auth, rate limiting) in the gateway — don't repeat that logic in every microservice.",
  },

  // ─── LEVEL 7 ── Microservices vs Monolith ────────────────────────────────────
  {
    id: "system-design-7",
    courseId: "system-design",
    number: 7,
    title: "Microservices vs Monolith",
    description: "Monoliths are simple to start; microservices scale teams. Explore both architecture gems!",
    concept: "Microservices vs Monolith",
    conceptExplanation:
      "A monolith packages all application functionality into a single deployable unit. A microservices architecture splits functionality into small, independently deployable services.\n\nMonolith pros & cons:\n• Simple to develop, test, and deploy early on\n• Easy transactions and in-process function calls\n• Becomes hard to scale teams and components independently as it grows\n\nMicroservices pros & cons:\n• Each service can be deployed, scaled, and rewritten independently\n• Teams own their service end-to-end (Conway's Law: system mirrors org structure)\n• Introduces network latency, distributed tracing, data consistency challenges\n• Operational complexity: service discovery, circuit breakers, observability\n\nThe Strangler Fig Pattern is a safe migration path: incrementally replace monolith features with microservices, routing traffic gradually. Start with a monolith and extract services only when pain points are proven.",
    codeExample: `// Monolith: all logic in one process
class MonolithApp {
  handleOrder(userId: string, itemId: string) {
    const user    = this.getUser(userId);   // in-process
    const item    = this.getItem(itemId);   // in-process
    const payment = this.charge(user, item); // in-process
    this.sendEmail(user, payment);           // in-process
    return payment;
  }
  private getUser(id: string)    { return { id, name: "Alice" }; }
  private getItem(id: string)    { return { id, price: 100 };    }
  private charge(u: any, i: any) { return { status: "ok" };      }
  private sendEmail(u: any, p: any) { console.log("email sent"); }
}

// Microservices: each concern is a separate network call
// user-service  → GET /users/:id
// product-service → GET /items/:id
// payment-service → POST /payments
// notification-service → POST /emails`,
    starterCode: `// Visit monolith wing then microservices wing

function explore(direction) {
  hero.move(direction);
}

explore("right");  // monolith gem 1
explore("right");  // monolith gem 2
explore("down");
explore("down");
explore("left");   // microservice gem 1
explore("left");   // microservice gem 2
explore("down");   // microservice gem 3
explore("right");  // exit`,
    solutionCode: `function explore(direction) {
  hero.move(direction);
}

explore("right");
explore("right");
explore("down");
explore("down");
explore("left");
explore("left");
explore("down");
explore("right");`,
    // hero(1,1)→(1,2)gem→(1,3)gem ↓(2,3) ↓(3,3)gem ←(3,2)gem ←(3,1)gem ↓(4,1)gem →(4,2)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "exit", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (both architectures)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (architecture decided!)" },
    ],
    hint: "Go right twice for monolith gems, down twice, left twice for microservice gems, down once, right to exit.",
    tip: "Start with a well-structured monolith. Extract microservices only when a specific scalability or team-autonomy pain point demands it.",
  },

  // ─── LEVEL 8 ── CDN ──────────────────────────────────────────────────────────
  {
    id: "system-design-8",
    courseId: "system-design",
    number: 8,
    title: "Content Delivery Networks (CDN)",
    description: "A CDN caches assets at edge nodes worldwide. Collect from each edge PoP, then reach the origin exit!",
    concept: "Content Delivery Networks",
    conceptExplanation:
      "A CDN is a globally distributed network of servers (Points of Presence, PoPs) that cache and serve static content close to end users.\n\nHow it works:\n• User requests an asset (image, JS, video)\n• DNS resolves to the nearest CDN edge server\n• Edge serves cached content instantly (cache HIT)\n• On cache MISS, edge fetches from origin, caches it, then serves it\n\nBenefits:\n• Reduced latency — content is physically closer to the user\n• Reduced origin load — most requests never reach your servers\n• DDoS absorption — CDN's global capacity absorbs volumetric attacks\n• High availability — redundant edge nodes mean no single point of failure\n\nCache control headers (Cache-Control, ETag, Last-Modified) tell CDNs and browsers how long to cache content. Use cache-busting (content hashing in filenames, e.g., main.abc123.js) to force fresh content on deploy.",
    codeExample: `// Cache-Control headers for CDN behaviour
// In an Express.js server:

// Static assets — cache for 1 year, immutable (content-hashed filename)
app.use("/static", express.static("public", {
  maxAge: "1y",
  immutable: true, // tells CDN/browser: never revalidate
}));

// HTML pages — always revalidate with origin
app.get("/", (req, res) => {
  res.set("Cache-Control", "no-cache, must-revalidate");
  res.sendFile("index.html");
});

// API responses — cache for 60 s at CDN edge
app.get("/api/products", (req, res) => {
  res.set("Cache-Control", "public, max-age=60, s-maxage=60");
  res.json(products);
});`,
    starterCode: `// Hit each CDN edge PoP to collect cached assets

function hitEdge(direction) {
  hero.move(direction);
}

hitEdge("right");  // US-East PoP
hitEdge("right");  // EU-West PoP
hitEdge("right");  // EU-West gem
hitEdge("down");
hitEdge("left");   // APAC PoP
hitEdge("left");   // APAC gem
hitEdge("left");   // origin gem
hitEdge("down");   // exit`,
    solutionCode: `function hitEdge(direction) {
  hero.move(direction);
}

hitEdge("right");
hitEdge("right");
hitEdge("right");
hitEdge("down");
hitEdge("left");
hitEdge("left");
hitEdge("left");
hitEdge("down");`,
    // hero(1,1)→(1,2)gem→(1,3)gem→(1,4)gem ↓(2,4) ←(2,3)gem ←(2,2)gem ←(2,1)gem ↓(3,1)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem" ],
      ["wall", "gem",  "gem",  "gem",  "wall"],
      ["exit", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems (edge PoPs cached)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (origin reached!)" },
    ],
    hint: "Right 3 times across the top PoPs, then down and left 3 times, then down to the origin exit.",
    tip: "Use content-hashed filenames for static assets so you can set max-age to 1 year — the filename changes on every deploy, busting the cache automatically.",
  },

  // ─── LEVEL 9 ── Rate Limiting at Scale ───────────────────────────────────────
  {
    id: "system-design-9",
    courseId: "system-design",
    number: 9,
    title: "Rate Limiting at Scale",
    description: "Rate limiters protect your API from abuse. Navigate the throttle gates and collect the allowed-request gems!",
    concept: "Rate Limiting",
    conceptExplanation:
      "Rate limiting controls how many requests a client can make in a given time window, protecting your service from abuse, DoS attacks, and accidental overload.\n\nCommon algorithms:\n• Token Bucket — a bucket fills with tokens at a fixed rate; each request consumes one token; allows short bursts\n• Leaky Bucket — requests enter a queue and drain at a fixed rate; strictly smooth output\n• Fixed Window Counter — count requests per time window (e.g., 100 req/min); simple but allows burst at window boundary\n• Sliding Window Log — store timestamps of each request; precise but memory-intensive\n• Sliding Window Counter — hybrid: approximates sliding window using two fixed windows\n\nImplementation at scale:\n• Store counters in Redis with atomic INCR + EXPIRE — handles distributed servers\n• Use client IP, API key, or user ID as the rate limit key\n• Return 429 Too Many Requests with Retry-After header so clients back off gracefully\n• Apply different limits per tier (free vs paid) or per endpoint (read vs write)",
    codeExample: `// Token bucket in Redis (pseudo-code using ioredis)
async function isAllowed(clientId: string, limit: number, windowSec: number): Promise<boolean> {
  const key = \`rate:\${clientId}\`;
  const current = await redis.incr(key);

  if (current === 1) {
    // First request in window — set expiry
    await redis.expire(key, windowSec);
  }

  if (current > limit) {
    // 429 Too Many Requests
    return false;
  }
  return true;
}

// Usage: 100 requests per 60 seconds per client
const allowed = await isAllowed("user-42", 100, 60);
if (!allowed) throw new Error("Rate limit exceeded — retry after 60s");`,
    starterCode: `// Pass through each rate-limit gate — collect allowed requests

function passGate(direction) {
  hero.move(direction);
}

passGate("right");  // token 1
passGate("down");
passGate("right");  // token 2
passGate("down");
passGate("right");  // token 3
passGate("right");  // token 4
passGate("up");     // token 5
passGate("right");  // exit`,
    solutionCode: `function passGate(direction) {
  hero.move(direction);
}

passGate("right");
passGate("down");
passGate("right");
passGate("down");
passGate("right");
passGate("right");
passGate("up");
passGate("right");`,
    // hero(1,1)→(1,2)gem ↓(2,2)gem →(2,3) ↓(3,3)gem →(3,4)gem →(3,5)gem ↑(2,5)gem →(2,6) needs 6 cols
    // Simplify to 5 cols:
    // hero(1,1)→(1,2)gem ↓(2,2)gem →(2,3) ↓(3,3)gem →(3,4)gem ↑(2,4)gem →(2,5)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "gem",  "exit"],
      ["wall", "wall", "gem",  "wall", "gem",  "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (rate limit tokens)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (within the rate limit!)" },
    ],
    hint: "Right for token 1, down for token 2, right and down for token 3, right and right for tokens 4-5, up and right to exit.",
    tip: "Store rate-limit counters in Redis with atomic INCR — a single in-memory counter per app server breaks down the moment you scale horizontally.",
  },

  // ─── LEVEL 10 ── Grand Finale: Design Twitter Feed ───────────────────────────
  {
    id: "system-design-10",
    courseId: "system-design",
    number: 10,
    title: "Grand Finale: Design Twitter Feed",
    description: "Apply everything — caching, sharding, queues, CDN, rate limiting — to design a Twitter-scale feed system!",
    concept: "System Design: Twitter Feed",
    conceptExplanation:
      "Designing Twitter's feed at scale synthesises every concept from this course.\n\nWrite path (tweeting):\n1. API Gateway authenticates & rate-limits the request\n2. Tweet service stores the tweet in a sharded DB (sharded by tweet ID)\n3. A message queue (Kafka) fans the tweet out to followers asynchronously\n4. Fan-out workers pre-compute each follower's feed and store it in Redis (feed cache)\n\nRead path (loading feed):\n1. Client hits the CDN edge for static assets; API calls go to the load balancer\n2. Feed service reads the pre-computed feed from Redis (cache-aside)\n3. On cache MISS, it queries the DB and rebuilds from the follow graph\n4. Tweets from celebrity users (high follower count) are NOT pre-fanned — pulled on read to avoid a single tweet causing millions of fan-out writes\n\nKey trade-offs:\n• AP over CP for feeds — a slightly stale feed is fine; availability is critical\n• Pre-compute (push) for regular users, pull on read for celebrities (hybrid fan-out)\n• Rate limit aggressively at the API gateway to prevent abuse at 500M+ tweets/day",
    codeExample: `// Simplified Twitter feed — hybrid fan-out
async function postTweet(authorId: string, text: string): Promise<void> {
  const tweet = await tweetDB.insert({ authorId, text, ts: Date.now() });
  const followerCount = await followDB.count(authorId);

  if (followerCount < 10_000) {
    // Push model: fan out to each follower's Redis feed list
    const followers = await followDB.getFollowers(authorId);
    await Promise.all(
      followers.map(fId => redis.lpush(\`feed:\${fId}\`, tweet.id))
    );
  }
  // Celebrity tweets are injected at read time, not write time
}

async function getFeed(userId: string): Promise<string[]> {
  const tweetIds = await redis.lrange(\`feed:\${userId}\`, 0, 99); // pre-computed
  const celebrityTweets = await pullCelebrityTweets(userId);     // on-demand
  return mergeSorted([tweetIds, celebrityTweets]);
}`,
    starterCode: `// The grand finale — traverse the full system design path

function designStep(direction) {
  hero.move(direction);
}

// Write path
designStep("right");  // API Gateway
designStep("right");  // Tweet DB shard
designStep("right");  // Kafka queue
designStep("down");
designStep("down");
// Read path
designStep("left");   // Redis feed cache
designStep("left");   // Load balancer
designStep("left");   // CDN edge
designStep("down");   // exit — system live!`,
    solutionCode: `function designStep(direction) {
  hero.move(direction);
}

designStep("right");
designStep("right");
designStep("right");
designStep("down");
designStep("down");
designStep("left");
designStep("left");
designStep("left");
designStep("down");`,
    // hero(1,1)→(1,2)gem→(1,3)gem→(1,4)gem ↓(2,4)gem ↓(3,4)gem ←(3,3)gem ←(3,2)gem ←(3,1)gem ↓(4,1)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem" ],
      ["wall", "wall", "wall", "wall", "gem" ],
      ["wall", "gem",  "gem",  "gem",  "gem" ],
      ["exit", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 8 💎 gems (system components)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (system is live at scale!)" },
    ],
    hint: "Right 3 times (write path), down twice, left 3 times (read path), down to the exit.",
    tip: "No single design is correct — state your assumptions, reason about trade-offs, and always ask 'what fails first?' when interviewing.",
  },
];
