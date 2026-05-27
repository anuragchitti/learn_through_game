import { LevelDefinition } from "../types";

export const redisLevels: LevelDefinition[] = [
  {
    id: "redis-1",
    courseId: "redis",
    number: 1,
    title: "What is Redis?",
    description: "Redis is an in-memory key-value store used for caching, sessions, and pub/sub.",
    concept: "Redis Overview",
    conceptExplanation:
      "Redis (Remote Dictionary Server) is an in-memory data structure store.\n\nKey properties:\n• Stores data in RAM → microsecond latency\n• Persistent: can snapshot to disk (RDB) or log every write (AOF)\n• Single-threaded: no race conditions on operations\n• Supports many data types: strings, lists, sets, sorted sets, hashes, streams\n\nCommon use cases:\n• Caching: cache DB results to avoid repeated slow queries\n• Sessions: store user session data\n• Rate limiting: atomic counters per IP\n• Pub/Sub: real-time messaging\n• Leaderboards: sorted sets with scores\n• Job queues: lists as FIFO queues",
    codeExample: `# Redis CLI basic commands
redis-cli

# Store and retrieve a string
SET user:1:name "Alice"
GET user:1:name   # "Alice"

# Set with expiry (60 seconds TTL)
SET session:abc123 "userId:42" EX 60
TTL session:abc123  # seconds remaining

# Check if key exists
EXISTS user:1:name  # 1 (true)

# Delete a key
DEL user:1:name`,
    starterCode: `// Redis: fast key-value store
// SET = store, GET = retrieve
const cacheOps = [
  { op: "SET user",    dir: "right" },
  { op: "SET session", dir: "right" },
  { op: "GET user",    dir: "right" },
  { op: "GET session", dir: "down" },
  { op: "EXPIRE",      dir: "right" },
];

for (const op of cacheOps) {
  hero.move(op.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const cacheOps = [
  { op: "SET user",    dir: "right" },
  { op: "SET session", dir: "right" },
  { op: "GET user",    dir: "right" },
  { op: "GET session", dir: "down" },
  { op: "EXPIRE",      dir: "right" },
];

for (const op of cacheOps) {
  hero.move(op.dir);
}
hero.move("right");
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), right, down, down to exit.",
    tip: "Redis is not a primary database — use it alongside PostgreSQL/MongoDB to cache frequently-read data.",
  },

  {
    id: "redis-2",
    courseId: "redis",
    number: 2,
    title: "Strings & Expiry",
    description: "Strings are Redis's most basic type. Expiry (TTL) makes keys auto-delete.",
    concept: "String Commands & TTL",
    conceptExplanation:
      "Redis strings can hold text, numbers, or binary data (up to 512MB).\n\nKey string commands:\n• SET key value [EX seconds] [PX ms] [NX|XX]\n• GET key\n• INCR key / INCRBY key amount — atomic increment\n• DECR key\n• APPEND key value\n• STRLEN key\n• GETSET key newvalue — returns old value\n• MSET / MGET — multi key operations\n\nExpiry:\n• SET key val EX 60 — expire in 60s\n• EXPIRE key 60 — set TTL on existing key\n• TTL key — seconds remaining (-1=no expiry, -2=deleted)\n• PERSIST key — remove expiry",
    codeExample: `// Node.js with ioredis
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Cache DB result for 5 minutes
async function getCachedUser(id) {
  const key = \`user:\${id}\`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const user = await db.users.findById(id);
  await redis.setex(key, 300, JSON.stringify(user)); // 300s TTL
  return user;
}

// Atomic page view counter
await redis.incr('page:home:views');
const views = await redis.get('page:home:views');`,
    starterCode: `// Atomic INCR: increment without race conditions
function atomicCounter(name, increments) {
  let count = 0;
  for (let i = 0; i < increments; i++) {
    count++; // INCR is atomic
    hero.move("right");
  }
  return count;
}

const pageViews = atomicCounter("page:home:views", 3);
hero.move("down");
for (let i = 0; i < 2; i++) hero.move("right");`,
    solutionCode: `function atomicCounter(name, increments) {
  let count = 0;
  for (let i = 0; i < increments; i++) {
    count++;
    hero.move("right");
  }
  return count;
}

atomicCounter("page:home:views", 3);
hero.move("down");
for (let i = 0; i < 2; i++) hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down to exit.",
    tip: "INCR is atomic — even with many concurrent clients, you'll never lose a count. This is why Redis beats DB for counters.",
  },

  {
    id: "redis-3",
    courseId: "redis",
    number: 3,
    title: "Lists",
    description: "Redis lists are linked lists — ideal for queues, stacks, and activity feeds.",
    concept: "Redis Lists",
    conceptExplanation:
      "Redis lists are linked lists of strings.\n\nCommands:\n• LPUSH key val — push to left (head)\n• RPUSH key val — push to right (tail)\n• LPOP key — pop from left\n• RPOP key — pop from right\n• LRANGE key 0 -1 — get all elements\n• LLEN key — length\n• LINDEX key 0 — get element at index\n• BLPOP key timeout — blocking pop (wait for element)\n\nPatterns:\n• Queue (FIFO): RPUSH + LPOP\n• Stack (LIFO): LPUSH + LPOP\n• Activity feed: LPUSH + LRANGE 0 99 (last 100 items)\n• Job queue: RPUSH jobs + BLPOP jobs 0 (worker blocks waiting)",
    codeExample: `// Job queue with Redis list
// Producer
await redis.rpush('jobs:email', JSON.stringify({
  to: 'alice@example.com',
  subject: 'Welcome!',
}));

// Worker (blocking pop — waits up to 30s)
while (true) {
  const [queue, job] = await redis.blpop('jobs:email', 30);
  if (job) await processEmail(JSON.parse(job));
}

// Activity feed (last 100 events)
await redis.lpush('feed:user:42', JSON.stringify(event));
await redis.ltrim('feed:user:42', 0, 99); // keep only 100
const feed = await redis.lrange('feed:user:42', 0, 9); // page 1`,
    starterCode: `// Queue: RPUSH to add, LPOP to consume
function processQueue(jobs) {
  const queue = [];
  // RPUSH
  for (const job of jobs) queue.push(job);
  // LPOP — process in order
  while (queue.length > 0) {
    queue.shift();
    hero.move("right");
  }
  hero.move("down");
}

processQueue(["email", "sms", "push", "webhook"]);`,
    solutionCode: `function processQueue(jobs) {
  const queue = [];
  for (const job of jobs) queue.push(job);
  while (queue.length > 0) {
    queue.shift();
    hero.move("right");
  }
  hero.move("down");
}

processQueue(["email", "sms", "push", "webhook"]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "4 jobs → right×4 (gems), down×2 to exit.",
    tip: "BLPOP is better than polling — the worker sleeps until a job arrives, saving CPU cycles.",
  },

  {
    id: "redis-4",
    courseId: "redis",
    number: 4,
    title: "Hashes",
    description: "Redis hashes store field-value pairs — perfect for user objects.",
    concept: "Redis Hashes",
    conceptExplanation:
      "Redis hashes map field names to values within a single key.\n\nCommands:\n• HSET key field val — set field\n• HGET key field — get one field\n• HMSET key f1 v1 f2 v2 — set multiple\n• HMGET key f1 f2 — get multiple\n• HGETALL key — get all field-value pairs\n• HDEL key field — delete field\n• HEXISTS key field — check existence\n• HLEN key — number of fields\n• HINCRBY key field amount\n\nWhen to use:\n• Store object attributes (user profile, product)\n• Cheaper memory than one key per field\n• Faster to update one field without fetching whole object",
    codeExample: `// Store user profile as Redis hash
await redis.hset('user:42', {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
  loginCount: '0',
});

// Get one field
const name = await redis.hget('user:42', 'name');

// Get all fields
const user = await redis.hgetall('user:42');

// Increment a field atomically
await redis.hincrby('user:42', 'loginCount', 1);

// Get multiple specific fields
const [email, role] = await redis.hmget('user:42', 'email', 'role');`,
    starterCode: `// Hash: multiple fields under one key
const userProfile = {
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  loginCount: 0,
};

// HSET each field
const fields = Object.keys(userProfile);
for (const field of fields) {
  hero.move("right");
}
hero.move("down");
// HGETALL
hero.move("right");`,
    solutionCode: `const userProfile = {
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
  loginCount: 0,
};

const fields = Object.keys(userProfile);
for (const field of fields) {
  hero.move("right");
}
hero.move("down");
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "4 fields → right×4 (gems), down, right (gem), down to exit.",
    tip: "Don't nest hashes — Redis doesn't support nested structures. Use flat field names like user:profile:bio.",
  },

  {
    id: "redis-5",
    courseId: "redis",
    number: 5,
    title: "Sorted Sets & Leaderboards",
    description: "Sorted sets rank members by a score — perfect for leaderboards and timelines.",
    concept: "Redis Sorted Sets",
    conceptExplanation:
      "Sorted sets store unique members with a floating-point score. Members are always sorted by score.\n\nCommands:\n• ZADD key score member — add/update member\n• ZRANK key member — rank (0-based, lowest score first)\n• ZREVRANK key member — rank (highest score first)\n• ZSCORE key member — get score\n• ZRANGE key 0 -1 WITHSCORES — all members ascending\n• ZREVRANGE key 0 9 WITHSCORES — top 10\n• ZRANGEBYSCORE key min max — by score range\n• ZINCRBY key amount member — increment score\n\nUse cases: leaderboards, rate limiting windows, priority queues, autocomplete",
    codeExample: `// Game leaderboard
// Add/update player scores
await redis.zadd('leaderboard', 5420, 'alice');
await redis.zadd('leaderboard', 3810, 'bob');
await redis.zadd('leaderboard', 7200, 'carol');

// Top 10 players (highest score first)
const top10 = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');

// Player's rank
const rank = await redis.zrevrank('leaderboard', 'alice');
// 1 (0-indexed; carol is #0)

// Increment score
await redis.zincrby('leaderboard', 500, 'alice');`,
    starterCode: `// Sorted set: rank by score
const players = [
  { name: "dave",  score: 1500 },
  { name: "bob",   score: 3810 },
  { name: "alice", score: 5420 },
  { name: "carol", score: 7200 },
];

// ZADD all players (sorted internally by score)
for (const p of players) hero.move("right");
hero.move("down");

// ZREVRANGE: top 3 (move right for each)
for (let i = 0; i < 3; i++) hero.move("right");`,
    solutionCode: `const players = [
  { name: "dave",  score: 1500 },
  { name: "bob",   score: 3810 },
  { name: "alice", score: 5420 },
  { name: "carol", score: 7200 },
];

for (const p of players) hero.move("right");
hero.move("down");
for (let i = 0; i < 3; i++) hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "ZADD 4 players → right×4 (gems), down, ZREVRANGE top 3 → right×3 (gems+exit).",
    tip: "Sorted sets are O(log n) for most operations — fast even with millions of members.",
  },

  {
    id: "redis-6",
    courseId: "redis",
    number: 6,
    title: "Pub/Sub",
    description: "Redis Pub/Sub enables real-time messaging between publishers and subscribers.",
    concept: "Publish / Subscribe",
    conceptExplanation:
      "Redis Pub/Sub decouples message producers from consumers.\n\nCommands:\n• PUBLISH channel message — send message\n• SUBSCRIBE channel — listen to channel\n• PSUBSCRIBE pattern — subscribe with glob pattern (e.g., user:*)\n• UNSUBSCRIBE\n\nHow it works:\n• Subscribers listen on channels\n• Publishers push messages to channels\n• All current subscribers receive the message\n• Messages are NOT persisted — missed messages are lost\n\nLimitations:\n• Fire-and-forget: if subscriber is offline, message is lost\n• For durability: use Redis Streams or a message queue (BullMQ)\n\nUse case: real-time notifications, live dashboards, chat",
    codeExample: `// Publisher (producer)
const publisher = new Redis();
await publisher.publish('notifications', JSON.stringify({
  type: 'order-shipped',
  orderId: '12345',
}));

// Subscriber (consumer)
const subscriber = new Redis();
await subscriber.subscribe('notifications');
subscriber.on('message', (channel, message) => {
  const event = JSON.parse(message);
  console.log('Received:', event);
  updateUI(event);
});

// Pattern subscribe
await subscriber.psubscribe('user:*');
subscriber.on('pmessage', (pattern, channel, message) => {
  console.log(\`\${channel}: \${message}\`);
});`,
    starterCode: `// Pub/Sub: broadcast to all subscribers
function publish(channel, subscribers) {
  // Each subscriber receives the message
  for (let i = 0; i < subscribers; i++) {
    hero.move("right");
  }
}

function subscribe(channel, dir) {
  hero.move(dir);
}

subscribe("notifications", "down");
publish("notifications", 3);`,
    solutionCode: `function publish(channel, subscribers) {
  for (let i = 0; i < subscribers; i++) {
    hero.move("right");
  }
}

function subscribe(channel, dir) {
  hero.move(dir);
}

subscribe("notifications", "down");
publish("notifications", 3);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","wall","wall","wall","wall"],
      ["wall","empty","wall","wall","wall","wall"],
      ["wall","gem","gem","gem","exit","wall"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "down to row 3, then right×3 (gems), exit at col 4.",
    tip: "For persistent messaging where you can't lose messages, use Redis Streams (XADD/XREAD) instead of Pub/Sub.",
  },

  {
    id: "redis-7",
    courseId: "redis",
    number: 7,
    title: "Caching Strategies",
    description: "Cache-aside, write-through, and cache invalidation patterns.",
    concept: "Caching Patterns",
    conceptExplanation:
      "Common caching strategies:\n\n1. Cache-aside (lazy loading):\n   - Check cache first\n   - On miss: fetch from DB, store in cache\n   - Simple but first request is slow\n\n2. Write-through:\n   - Write to cache AND DB on every update\n   - Always consistent, but double writes\n\n3. Write-behind (write-back):\n   - Write to cache immediately, DB later\n   - Fast writes, risk of data loss\n\n4. Read-through:\n   - Cache handles DB fetch automatically\n\nCache invalidation:\n• TTL-based: auto-expire after N seconds\n• Event-based: delete key when data changes\n• Versioned keys: user:42:v3 (bump version on change)",
    codeExample: `// Cache-aside pattern
async function getUser(id) {
  const key = \`user:\${id}\`;

  // 1. Check cache
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — fetch from DB
  const user = await db.users.findById(id);
  if (!user) return null;

  // 3. Store in cache with 15 min TTL
  await redis.setex(key, 900, JSON.stringify(user));
  return user;
}

// Invalidate on update
async function updateUser(id, data) {
  await db.users.updateById(id, data);
  await redis.del(\`user:\${id}\`); // bust the cache
}`,
    starterCode: `// Cache-aside: check cache → miss → DB → cache
async function cachedQuery(id) {
  const steps = [
    { step: "check cache", hit: false, dir: "right" },
    { step: "cache miss",  hit: false, dir: "right" },
    { step: "query DB",    hit: false, dir: "down" },
    { step: "store cache", hit: false, dir: "right" },
    { step: "return data", hit: false, dir: "right" },
  ];

  for (const s of steps) {
    hero.move(s.dir);
  }
  hero.move("down");
}

cachedQuery(42);`,
    solutionCode: `async function cachedQuery(id) {
  const steps = [
    { step: "check cache", dir: "right" },
    { step: "cache miss",  dir: "right" },
    { step: "query DB",    dir: "down" },
    { step: "store cache", dir: "right" },
    { step: "return data", dir: "right" },
  ];

  for (const s of steps) {
    hero.move(s.dir);
  }
  hero.move("down");
}

cachedQuery(42);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Cache-aside is the most common pattern. Invalidate on write, not on a timer, for freshest data.",
  },

  {
    id: "redis-8",
    courseId: "redis",
    number: 8,
    title: "Rate Limiting",
    description: "Use Redis atomic operations to implement API rate limiting.",
    concept: "Rate Limiting with Redis",
    conceptExplanation:
      "Rate limiting prevents abuse by capping requests per time window.\n\nSimple fixed-window:\nconst key = `rate:${ip}:${minute}`;\nconst count = await redis.incr(key);\nif (count === 1) redis.expire(key, 60);\nif (count > 100) throw new Error('Rate limit exceeded');\n\nSliding window with sorted sets:\n• ZADD rate:ip timestamp timestamp\n• ZREMRANGEBYSCORE rate:ip 0 windowStart\n• count = ZCARD rate:ip\n\nToken bucket (smooth): complex but fairest algorithm.\n\nLua scripts make multi-command rate limiting atomic.",
    codeExample: `// Fixed window rate limiter (Express middleware)
async function rateLimit(req, res, next) {
  const ip = req.ip;
  const minute = Math.floor(Date.now() / 60000);
  const key = \`rate:\${ip}:\${minute}\`;

  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);

  res.set('X-RateLimit-Limit', '100');
  res.set('X-RateLimit-Remaining', Math.max(0, 100 - count));

  if (count > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
}`,
    starterCode: `// Rate limit: count requests, block at threshold
function rateLimiter(maxReqs, requests) {
  let count = 0;
  const allowed = [];
  for (const req of requests) {
    count++; // INCR
    if (count <= maxReqs) {
      allowed.push(req);
      hero.move("right");
    }
    // else: 429 Too Many Requests
  }
  hero.move("down");
  return allowed;
}

rateLimiter(4, ["r1","r2","r3","r4","r5","r6"]);`,
    solutionCode: `function rateLimiter(maxReqs, requests) {
  let count = 0;
  for (const req of requests) {
    count++;
    if (count <= maxReqs) {
      hero.move("right");
    }
  }
  hero.move("down");
}

rateLimiter(4, ["r1","r2","r3","r4","r5","r6"]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "maxReqs=4, only 4 allowed → right×4 (gems), down×2 to exit.",
    tip: "Use Lua scripts for atomic multi-command rate limiting — Redis runs Lua atomically, preventing race conditions.",
  },

  {
    id: "redis-9",
    courseId: "redis",
    number: 9,
    title: "Persistence & Replication",
    description: "Redis can persist data to disk and replicate to replicas for high availability.",
    concept: "Redis Durability",
    conceptExplanation:
      "Redis persistence options:\n\n1. RDB (Redis Database Backup):\n   • Point-in-time snapshots\n   • Fast restart, smaller files\n   • Can lose data since last snapshot\n   • Good for: backups, caching\n\n2. AOF (Append-Only File):\n   • Logs every write command\n   • Much more durable (fsync every second)\n   • Larger files, slower restart\n   • Good for: sessions, queues\n\n3. RDB + AOF: best of both worlds\n\nReplication:\n• Primary → Replica (async)\n• Redis Sentinel: auto-failover\n• Redis Cluster: sharding across nodes\n\nIn production: use Redis Cloud or ElastiCache — they handle HA automatically.",
    codeExample: `# redis.conf persistence settings

# RDB snapshots
save 900 1      # snapshot if 1 key changed in 900s
save 300 10     # snapshot if 10 keys changed in 300s
save 60 10000   # snapshot if 10000 keys changed in 60s

# AOF
appendonly yes
appendfsync everysec  # fsync every second (balanced)

# Check persistence info
redis-cli INFO persistence
# rdb_last_save_time: 1704067200
# aof_enabled: 1
# aof_current_size: 1048576`,
    starterCode: `// Persistence: RDB snapshot vs AOF log
const strategies = [
  { name: "RDB snapshot",    dir: "right" },
  { name: "AOF log entry 1", dir: "right" },
  { name: "AOF log entry 2", dir: "right" },
  { name: "replica sync",    dir: "down" },
  { name: "failover ready",  dir: "right" },
];

for (const s of strategies) {
  hero.move(s.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const strategies = [
  { name: "RDB snapshot",    dir: "right" },
  { name: "AOF log entry 1", dir: "right" },
  { name: "AOF log entry 2", dir: "right" },
  { name: "replica sync",    dir: "down" },
  { name: "failover ready",  dir: "right" },
];

for (const s of strategies) {
  hero.move(s.dir);
}
hero.move("right");
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), right, down, down to exit.",
    tip: "For most production setups: enable AOF with appendfsync everysec — 1 second max data loss is acceptable.",
  },

  {
    id: "redis-10",
    courseId: "redis",
    number: 10,
    title: "Grand Finale",
    description: "Combine caching, rate limiting, pub/sub, and leaderboards in a real app design.",
    concept: "Production Redis",
    conceptExplanation:
      "A production app uses Redis for multiple purposes simultaneously:\n\n1. API caching (strings + TTL)\n2. Session storage (hashes + TTL)\n3. Rate limiting (INCR + EXPIRE)\n4. Real-time features (Pub/Sub or Streams)\n5. Leaderboards (sorted sets)\n6. Job queues (lists or BullMQ)\n7. Feature flags (strings or hashes)\n\nnpm packages:\n• ioredis — full-featured client\n• @upstash/redis — serverless-friendly\n• bullmq — production job queue on Redis\n\nCloud: Upstash (serverless), Redis Cloud, AWS ElastiCache",
    codeExample: `// Real app using Redis for everything
class RedisService {
  constructor(redis) { this.redis = redis; }

  // Cache
  async cache(key, ttl, fn) {
    const v = await this.redis.get(key);
    if (v) return JSON.parse(v);
    const data = await fn();
    await this.redis.setex(key, ttl, JSON.stringify(data));
    return data;
  }

  // Rate limit
  async rateLimit(ip, max = 100) {
    const key = \`rl:\${ip}:\${Math.floor(Date.now()/60000)}\`;
    const n = await this.redis.incr(key);
    if (n === 1) await this.redis.expire(key, 60);
    return n <= max;
  }

  // Leaderboard
  async updateScore(user, score) {
    await this.redis.zincrby('leaderboard', score, user);
  }
}`,
    starterCode: `// Grand finale: Redis does everything
const redisApp = {
  cache:       (steps) => { for (let i=0;i<steps;i++) hero.move("right"); },
  rateLimit:   ()      => hero.move("down"),
  session:     (steps) => { for (let i=0;i<steps;i++) hero.move("right"); },
  leaderboard: ()      => hero.move("down"),
};

redisApp.cache(2);
redisApp.rateLimit();
redisApp.session(3);
redisApp.leaderboard();
hero.move("right");`,
    solutionCode: `const redisApp = {
  cache:       (steps) => { for (let i=0;i<steps;i++) hero.move("right"); },
  rateLimit:   ()      => hero.move("down"),
  session:     (steps) => { for (let i=0;i<steps;i++) hero.move("right"); },
  leaderboard: ()      => hero.move("down"),
};

redisApp.cache(2);
redisApp.rateLimit();
redisApp.session(3);
redisApp.leaderboard();
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "cache(2): right×2 (gems), rateLimit: down, session(3): right×3 (gems), leaderboard: down, right (gem), down to exit.",
    tip: "Redis is the Swiss Army knife of backend caching. Master it and you'll dramatically improve any app's performance.",
  },
];
