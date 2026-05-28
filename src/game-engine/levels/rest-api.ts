import { LevelDefinition } from "../types";

export const restApiLevels: LevelDefinition[] = [
  // ─── Level 1: REST Principles ─────────────────────────────────────────────
  {
    id: "rest-api-1",
    courseId: "rest-api",
    number: 1,
    title: "REST Principles",
    description: "REST is an architectural style, not a protocol — six constraints define what makes an API truly RESTful.",
    concept: "The 6 REST Constraints",
    conceptExplanation:
      "REST (Representational State Transfer) was defined by Roy Fielding in his 2000 dissertation.\n\n" +
      "The six architectural constraints:\n\n" +
      "1. Client-Server — UI and data concerns are separated. Client doesn't know DB schema; server doesn't know UI.\n\n" +
      "2. Stateless — Each request contains all information needed. No session stored on the server. Horizontal scaling is easy.\n\n" +
      "3. Cacheable — Responses must label themselves as cacheable or not. Caching improves performance.\n\n" +
      "4. Uniform Interface — Resources are identified by URIs. Operations use standard HTTP methods. HATEOAS links guide navigation.\n\n" +
      "5. Layered System — Client doesn't know if it talks to origin, load balancer, or cache.\n\n" +
      "6. Code-On-Demand (optional) — Server may send executable code (JavaScript) to the client.\n\n" +
      "Key principle: Resources are nouns (/articles, /users), not verbs (/getArticles, /createUser).",
    codeExample: `# Good REST design — resource-oriented
GET    /articles          → list all articles
POST   /articles          → create an article
GET    /articles/42       → get article 42
PUT    /articles/42       → replace article 42 entirely
PATCH  /articles/42       → partially update article 42
DELETE /articles/42       → delete article 42

# Nested resources (relationships)
GET    /articles/42/comments      → comments on article 42
POST   /articles/42/comments      → add a comment
DELETE /articles/42/comments/7   → delete comment 7

# Bad (RPC-style URLs — not RESTful)
POST /getArticles           ❌
POST /createUser            ❌
GET  /deleteArticle?id=42   ❌`,
    starterCode: `// Navigate the REST constraints
const constraints = [
  { name: "Client-Server", dir: "right" },
  { name: "Stateless",     dir: "right" },
  { name: "Cacheable",     dir: "right" },
  { name: "Uniform",       dir: "down"  },
  { name: "Layered",       dir: "right" },
];

for (const c of constraints) {
  hero.move(c.dir);
}
hero.move("down");
hero.move("right");
`,
    solutionCode: `const constraints = [
  { name: "Client-Server", dir: "right" },
  { name: "Stateless",     dir: "right" },
  { name: "Cacheable",     dir: "right" },
  { name: "Uniform",       dir: "down"  },
  { name: "Layered",       dir: "right" },
];

for (const c of constraints) {
  hero.move(c.dir);
}
hero.move("down");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, right (gem), down to exit.",
    tip: "Statelessness is the most important REST constraint for scalability. It enables you to add servers behind a load balancer with no shared session store.",
  },

  // ─── Level 2: HTTP Methods & Status Codes ─────────────────────────────────
  {
    id: "rest-api-2",
    courseId: "rest-api",
    number: 2,
    title: "HTTP Methods & Status Codes",
    description: "Each HTTP method has a specific semantic meaning. Status codes tell the client exactly what happened.",
    concept: "HTTP Methods and Status Codes",
    conceptExplanation:
      "HTTP methods (verbs) define the operation:\n\n" +
      "• GET — Read a resource. Safe (no side effects) + idempotent.\n" +
      "• POST — Create a new resource. Not idempotent.\n" +
      "• PUT — Replace a resource entirely. Idempotent.\n" +
      "• PATCH — Partially update a resource.\n" +
      "• DELETE — Remove a resource. Idempotent.\n" +
      "• HEAD — Like GET but no body — used to check existence/headers.\n" +
      "• OPTIONS — Returns allowed methods (used in CORS preflight).\n\n" +
      "Status code families:\n" +
      "• 2xx Success: 200 OK, 201 Created, 204 No Content\n" +
      "• 3xx Redirect: 301 Moved Permanently, 304 Not Modified\n" +
      "• 4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 429 Too Many Requests\n" +
      "• 5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable\n\n" +
      "Rules of thumb:\n" +
      "• POST → 201 Created + Location header pointing to the new resource\n" +
      "• DELETE → 204 No Content (empty body)\n" +
      "• Validation error → 422 (not 400)\n" +
      "• Auth missing → 401; Auth present but forbidden → 403",
    codeExample: `# HTTP method semantics
# GET — read, safe, idempotent
GET /orders/99
→ 200 OK
{ "id": 99, "total": 49.99, "status": "shipped" }

# POST — create
POST /orders
{ "product_id": 5, "qty": 2 }
→ 201 Created
Location: /orders/100
{ "id": 100, "status": "pending" }

# PATCH — partial update
PATCH /orders/100
{ "status": "cancelled" }
→ 200 OK
{ "id": 100, "status": "cancelled" }

# DELETE — remove
DELETE /orders/100
→ 204 No Content   (empty body)

# Errors
GET /orders/9999
→ 404 Not Found
{ "error": "Order not found", "code": "ORDER_NOT_FOUND" }

POST /orders
{ "qty": -1 }
→ 422 Unprocessable Entity
{ "error": "qty must be positive" }`,
    starterCode: `// Map HTTP methods to their correct status codes
const methods = [
  { verb: "GET",    dir: "right" },
  { verb: "POST",   dir: "right" },
  { verb: "PUT",    dir: "right" },
  { verb: "PATCH",  dir: "down"  },
  { verb: "DELETE", dir: "right" },
  { verb: "204",    dir: "right" },
];

for (const m of methods) {
  hero.move(m.dir);
}
hero.move("down");
`,
    solutionCode: `const methods = [
  { verb: "GET",    dir: "right" },
  { verb: "POST",   dir: "right" },
  { verb: "PUT",    dir: "right" },
  { verb: "PATCH",  dir: "down"  },
  { verb: "DELETE", dir: "right" },
  { verb: "204",    dir: "right" },
];

for (const m of methods) {
  hero.move(m.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Always use 204 No Content (not 200) for successful DELETE operations. Returning a body on DELETE confuses clients and breaks idempotency semantics.",
  },

  // ─── Level 3: URL Design ──────────────────────────────────────────────────
  {
    id: "rest-api-3",
    courseId: "rest-api",
    number: 3,
    title: "URL Design",
    description: "Good URLs are predictable, resource-oriented, and use consistent naming conventions.",
    concept: "RESTful URL Design Patterns",
    conceptExplanation:
      "URL design rules for clean REST APIs:\n\n" +
      "Naming conventions:\n" +
      "• Use nouns, not verbs: /articles not /getArticles\n" +
      "• Use plural nouns: /users not /user\n" +
      "• Use lowercase and hyphens: /blog-posts not /blogPosts or /blog_posts\n" +
      "• No trailing slashes (or be consistent — pick one)\n\n" +
      "Hierarchy:\n" +
      "• /resources — collection\n" +
      "• /resources/{id} — single item\n" +
      "• /resources/{id}/sub-resources — related collection\n" +
      "• Avoid nesting deeper than 2 levels (/a/{id}/b/{id})\n\n" +
      "Query parameters vs path segments:\n" +
      "• Path: identifies a resource — /articles/42\n" +
      "• Query: filters/sorts/paginates — /articles?status=published&sort=date\n\n" +
      "Special actions (when truly needed):\n" +
      "• POST /orders/42/cancel — action as sub-resource\n" +
      "• POST /emails/42/send — better than a cryptic PATCH",
    codeExample: `# Well-designed URL hierarchy

# Collections
GET  /users
GET  /users/42
POST /users

# Nested resources (one level deep is fine)
GET  /users/42/orders
POST /users/42/orders
GET  /users/42/orders/17

# Filtering and sorting via query params
GET /articles?status=published&tag=python&sort=-created_at&limit=20

# Search
GET /articles?q=fastapi

# Actions as sub-resources (not verbs in path)
POST /users/42/deactivate     ✓
POST /payments/17/refund      ✓
POST /users/42/deactivateUser ✗  (verb in path)

# Version prefix (covered in level 6)
GET /v1/articles
GET /v2/articles`,
    starterCode: `// Navigate the URL design hierarchy
const urlLevels = [
  { segment: "/users",        dir: "right" },
  { segment: "/users/42",     dir: "right" },
  { segment: "/users/orders", dir: "down"  },
  { segment: "?sort=date",    dir: "right" },
  { segment: "?limit=20",     dir: "right" },
];

for (const u of urlLevels) {
  hero.move(u.dir);
}
hero.move("down");
hero.move("right");
`,
    solutionCode: `const urlLevels = [
  { segment: "/users",        dir: "right" },
  { segment: "/users/42",     dir: "right" },
  { segment: "/users/orders", dir: "down"  },
  { segment: "?sort=date",    dir: "right" },
  { segment: "?limit=20",     dir: "right" },
];

for (const u of urlLevels) {
  hero.move(u.dir);
}
hero.move("down");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "wall",  "wall"],
      ["wall",  "wall",  "wall",  "empty", "wall",  "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×2 (gems), down, right×3 (gems), down, right (gem), right to exit.",
    tip: "Keep URLs stable — they are public contracts. Use versioning to evolve them without breaking existing clients.",
  },

  // ─── Level 4: Request & Response Format (JSON) ────────────────────────────
  {
    id: "rest-api-4",
    courseId: "rest-api",
    number: 4,
    title: "Request & Response Format (JSON)",
    description: "Consistent JSON envelopes make APIs predictable and easy to consume.",
    concept: "JSON Request & Response Design",
    conceptExplanation:
      "JSON is the universal format for REST APIs. Design your payloads carefully.\n\n" +
      "Request body best practices:\n" +
      "• Use camelCase or snake_case — be consistent\n" +
      "• Include Content-Type: application/json header\n" +
      "• Validate all fields server-side — never trust the client\n\n" +
      "Response envelope patterns:\n\n" +
      "Success (single item):\n" +
      "{ \"data\": { \"id\": 1, \"name\": \"Widget\" } }\n\n" +
      "Success (list with metadata):\n" +
      "{ \"data\": [...], \"meta\": { \"total\": 100, \"page\": 1 } }\n\n" +
      "Error:\n" +
      "{ \"error\": { \"code\": \"NOT_FOUND\", \"message\": \"...\", \"details\": [...] } }\n\n" +
      "Common fields:\n" +
      "• id — always include; prefer string UUIDs over sequential integers\n" +
      "• created_at / updated_at — ISO 8601: 2024-01-15T09:30:00Z\n" +
      "• Avoid exposing internal fields: hashed_password, db_shard, etc.\n\n" +
      "HATEOAS (optional but powerful):\n" +
      "• Include _links with related resource URLs in each response\n" +
      "• Clients discover navigation rather than hardcoding URLs",
    codeExample: `# Consistent response envelope

# GET /articles/42 → 200 OK
{
  "data": {
    "id": "art_a1b2c3",
    "title": "REST API Design",
    "body": "...",
    "author": {
      "id": "usr_x9y8z7",
      "name": "Alice"
    },
    "tags": ["rest", "api", "design"],
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-16T12:00:00Z",
    "_links": {
      "self":     "/articles/art_a1b2c3",
      "author":   "/users/usr_x9y8z7",
      "comments": "/articles/art_a1b2c3/comments"
    }
  }
}

# GET /articles → 200 OK
{
  "data": [...],
  "meta": {
    "total": 843,
    "page": 1,
    "per_page": 20,
    "next": "/articles?page=2"
  }
}

# POST /articles (invalid) → 422
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "title", "message": "title is required" }
    ]
  }
}`,
    starterCode: `// Design consistent JSON envelopes
const envelope = [
  { part: "data field",    dir: "right" },
  { part: "meta field",    dir: "right" },
  { part: "_links",        dir: "right" },
  { part: "error shape",   dir: "down"  },
  { part: "ISO dates",     dir: "right" },
];

for (const e of envelope) {
  hero.move(e.dir);
}
hero.move("down");
hero.move("right");
`,
    solutionCode: `const envelope = [
  { part: "data field",    dir: "right" },
  { part: "meta field",    dir: "right" },
  { part: "_links",        dir: "right" },
  { part: "error shape",   dir: "down"  },
  { part: "ISO dates",     dir: "right" },
];

for (const e of envelope) {
  hero.move(e.dir);
}
hero.move("down");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "wall",  "wall",  "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, right (gem), down, right (gem), right to exit.",
    tip: "Use UUIDs (like 'art_a1b2c3') instead of sequential IDs in responses — they are safe to expose publicly and don't leak record counts.",
  },

  // ─── Level 5: Authentication (API Keys, Bearer, OAuth) ────────────────────
  {
    id: "rest-api-5",
    courseId: "rest-api",
    number: 5,
    title: "API Authentication",
    description: "API keys, Bearer tokens, and OAuth 2.0 are the three main patterns for REST API auth.",
    concept: "API Authentication Patterns",
    conceptExplanation:
      "Three main REST authentication strategies:\n\n" +
      "1. API Keys:\n" +
      "• Simple opaque string issued per client\n" +
      "• Passed via header: X-API-Key: sk_live_abc123\n" +
      "• Or query param: /data?api_key=... (avoid — keys end up in logs)\n" +
      "• Best for: server-to-server, simple public APIs\n" +
      "• Risk: if stolen, revoke and reissue\n\n" +
      "2. Bearer Tokens (JWT):\n" +
      "• Authorization: Bearer eyJhbGci...\n" +
      "• Self-contained — server verifies signature, no DB lookup\n" +
      "• Short-lived access tokens + long-lived refresh tokens\n" +
      "• Best for: SPAs, mobile apps calling your own API\n\n" +
      "3. OAuth 2.0:\n" +
      "• Delegated authorization — user grants your app access to their data\n" +
      "• Flows: Authorization Code (web), PKCE (mobile/SPA), Client Credentials (server)\n" +
      "• Returns access_token + refresh_token\n" +
      "• Best for: 'Login with Google/GitHub', third-party integrations\n\n" +
      "Always use HTTPS — credentials in plain HTTP are compromised.",
    codeExample: `# 1. API Key (header — preferred over query param)
curl -H "X-API-Key: sk_live_abc123" https://api.example.com/data

# 2. Bearer Token (JWT)
# Step 1: obtain token
POST /auth/login
{ "email": "alice@example.com", "password": "secret" }
→ { "access_token": "eyJ...", "expires_in": 1800 }

# Step 2: use token
curl -H "Authorization: Bearer eyJ..." https://api.example.com/me

# 3. OAuth 2.0 Authorization Code Flow
# Step 1: redirect user to provider
GET https://accounts.google.com/o/oauth2/auth
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=openid%20email%20profile

# Step 2: exchange code for tokens
POST https://oauth2.googleapis.com/token
{ "code": "4/P7q7W91", "client_id": "...", "client_secret": "...",
  "redirect_uri": "...", "grant_type": "authorization_code" }
→ { "access_token": "ya29...", "refresh_token": "1//0e..." }

# Step 3: call API with token
GET https://www.googleapis.com/oauth2/v3/userinfo
Authorization: Bearer ya29...`,
    starterCode: `// Authenticate through the API security layers
const authLayers = [
  { name: "API Key",      dir: "right" },
  { name: "HTTPS",        dir: "right" },
  { name: "JWT sign",     dir: "right" },
  { name: "Bearer",       dir: "down"  },
  { name: "OAuth code",   dir: "right" },
  { name: "token grant",  dir: "right" },
];

for (const a of authLayers) {
  hero.move(a.dir);
}
hero.move("down");
`,
    solutionCode: `const authLayers = [
  { name: "API Key",      dir: "right" },
  { name: "HTTPS",        dir: "right" },
  { name: "JWT sign",     dir: "right" },
  { name: "Bearer",       dir: "down"  },
  { name: "OAuth code",   dir: "right" },
  { name: "token grant",  dir: "right" },
];

for (const a of authLayers) {
  hero.move(a.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "For new projects: use OAuth 2.0 + PKCE for user-facing auth and API keys for machine-to-machine. Avoid rolling your own crypto.",
  },

  // ─── Level 6: API Versioning ──────────────────────────────────────────────
  {
    id: "rest-api-6",
    courseId: "rest-api",
    number: 6,
    title: "API Versioning",
    description: "Versioning lets you evolve your API without breaking existing clients.",
    concept: "API Versioning Strategies",
    conceptExplanation:
      "When you change your API, existing clients may break. Versioning prevents this.\n\n" +
      "Three main strategies:\n\n" +
      "1. URL path versioning (most common):\n" +
      "• GET /v1/articles, GET /v2/articles\n" +
      "• Pros: obvious, cacheable, easy to test in a browser\n" +
      "• Cons: URLs should be stable (purists object)\n\n" +
      "2. Header versioning:\n" +
      "• Accept: application/vnd.myapi.v2+json\n" +
      "• Or custom: API-Version: 2\n" +
      "• Pros: clean URLs\n" +
      "• Cons: harder to test, not visible in browser\n\n" +
      "3. Query parameter versioning:\n" +
      "• GET /articles?version=2\n" +
      "• Pros: simple\n" +
      "• Cons: parameters can be dropped by proxies\n\n" +
      "Best practices:\n" +
      "• Never remove a version without a deprecation period (3-6 months)\n" +
      "• Send Deprecation and Sunset headers on old versions\n" +
      "• Default to the latest stable version when no version given\n" +
      "• Document breaking vs non-breaking changes in a changelog",
    codeExample: `# Strategy 1: URL path versioning
GET /v1/users/42
→ { "name": "Alice", "email": "alice@example.com" }

GET /v2/users/42
→ {
    "id": "usr_abc123",
    "displayName": "Alice",
    "contact": { "email": "alice@example.com", "phone": "+1-555-0100" }
  }

# Strategy 2: Accept header versioning
GET /users/42
Accept: application/vnd.myapi.v2+json

# Strategy 3: Custom header
GET /users/42
API-Version: 2

# Deprecation notice headers
HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 31 Dec 2024 23:59:59 GMT
Link: <https://api.example.com/v2/users/42>; rel="successor-version"

# Non-breaking changes (safe, no new version needed):
# + Add optional response fields
# + Add optional request parameters
# + Add new endpoints
# Breaking changes (require new version):
# - Remove fields
# - Change field types
# - Change URL structure`,
    starterCode: `// Version the API to protect existing clients
const versions = [
  { ver: "v1 URL",     dir: "right" },
  { ver: "v2 URL",     dir: "right" },
  { ver: "headers",    dir: "down"  },
  { ver: "Deprecation",dir: "right" },
  { ver: "Sunset",     dir: "right" },
  { ver: "migrate",    dir: "right" },
];

for (const v of versions) {
  hero.move(v.dir);
}
hero.move("down");
`,
    solutionCode: `const versions = [
  { ver: "v1 URL",     dir: "right" },
  { ver: "v2 URL",     dir: "right" },
  { ver: "headers",    dir: "down"  },
  { ver: "Deprecation",dir: "right" },
  { ver: "Sunset",     dir: "right" },
  { ver: "migrate",    dir: "right" },
];

for (const v of versions) {
  hero.move(v.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "wall",  "wall"],
      ["wall",  "wall",  "wall",  "empty", "wall",  "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×2 (gems), down, right×3 (gems), down to exit.",
    tip: "URL path versioning (/v1/, /v2/) is the pragmatic choice — it is immediately visible, easily documented, and caches correctly.",
  },

  // ─── Level 7: Pagination & Filtering ──────────────────────────────────────
  {
    id: "rest-api-7",
    courseId: "rest-api",
    number: 7,
    title: "Pagination & Filtering",
    description: "Never return unbounded lists. Paginate all collections and support filtering to keep APIs fast.",
    concept: "Pagination, Filtering & Sorting",
    conceptExplanation:
      "Returning all records in one response breaks clients and overloads servers.\n\n" +
      "Pagination strategies:\n\n" +
      "1. Offset/Limit (page-based):\n" +
      "• GET /items?limit=20&offset=40\n" +
      "• Simple, but skips/duplicates on inserts between pages\n" +
      "• Use for: admin dashboards, static datasets\n\n" +
      "2. Cursor-based:\n" +
      "• GET /items?limit=20&cursor=eyJpZCI6NDB9\n" +
      "• Cursor = opaque pointer to last seen item (often base64-encoded ID)\n" +
      "• Consistent under concurrent writes, O(1) query\n" +
      "• Use for: feeds, real-time data, large datasets\n\n" +
      "3. Page number:\n" +
      "• GET /items?page=3&per_page=20\n" +
      "• Familiar to users, but same issues as offset\n\n" +
      "Filtering and sorting:\n" +
      "• Equality: GET /articles?status=published&author_id=42\n" +
      "• Range: GET /orders?created_after=2024-01-01\n" +
      "• Sort: GET /articles?sort=-created_at (prefix - = descending)\n" +
      "• Full-text search: GET /articles?q=fastapi\n\n" +
      "Response metadata:\n" +
      "{ meta: { total, page, per_page, next_cursor } }",
    codeExample: `# Offset-based pagination
GET /articles?page=2&per_page=20&sort=-created_at&status=published
→ {
  "data": [ ... ],
  "meta": {
    "total": 843,
    "page": 2,
    "per_page": 20,
    "total_pages": 43,
    "next": "/articles?page=3&per_page=20",
    "prev": "/articles?page=1&per_page=20"
  }
}

# Cursor-based pagination (recommended for feeds)
GET /posts?limit=20&cursor=eyJpZCI6MTAwfQ==
→ {
  "data": [ ... ],
  "meta": {
    "next_cursor": "eyJpZCI6MTIwfQ==",
    "has_more": true
  }
}

# Multiple filters + range
GET /orders?status=shipped&created_after=2024-01-01&total_min=100&sort=-total

# FastAPI implementation
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/articles")
def list_articles(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: str | None = None,
    sort: str = "-created_at",
):
    offset = (page - 1) * per_page
    # apply filters, sort, limit to query ...
    return {"data": [], "meta": {"page": page, "per_page": per_page}}`,
    starterCode: `// Paginate and filter efficiently
const querySteps = [
  { name: "page param",   dir: "right" },
  { name: "limit",        dir: "right" },
  { name: "cursor",       dir: "right" },
  { name: "filter",       dir: "down"  },
  { name: "sort param",   dir: "right" },
  { name: "meta block",   dir: "right" },
];

for (const q of querySteps) {
  hero.move(q.dir);
}
hero.move("down");
`,
    solutionCode: `const querySteps = [
  { name: "page param",   dir: "right" },
  { name: "limit",        dir: "right" },
  { name: "cursor",       dir: "right" },
  { name: "filter",       dir: "down"  },
  { name: "sort param",   dir: "right" },
  { name: "meta block",   dir: "right" },
];

for (const q of querySteps) {
  hero.move(q.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Always cap per_page at a maximum (e.g. 100). An uncapped limit=9999999 can DoS your database.",
  },

  // ─── Level 8: Error Handling ───────────────────────────────────────────────
  {
    id: "rest-api-8",
    courseId: "rest-api",
    number: 8,
    title: "API Error Handling",
    description: "Consistent, informative error responses help API consumers debug quickly.",
    concept: "REST Error Handling Best Practices",
    conceptExplanation:
      "Great error handling is as important as the happy path.\n\n" +
      "Principles:\n" +
      "• Use the correct HTTP status code (4xx = client error, 5xx = server error)\n" +
      "• Return a machine-readable error code (not just a human message)\n" +
      "• Include a human-readable message\n" +
      "• Add field-level details for validation errors\n" +
      "• Log all 5xx errors server-side with a trace ID\n" +
      "• Never expose stack traces, SQL, or internal paths to clients\n\n" +
      "Standard error schema:\n" +
      "{\n" +
      "  \"error\": {\n" +
      "    \"code\": \"MACHINE_READABLE_CODE\",\n" +
      "    \"message\": \"Human description\",\n" +
      "    \"trace_id\": \"abc-123\",\n" +
      "    \"details\": [ ... ]\n" +
      "  }\n" +
      "}\n\n" +
      "Common status codes:\n" +
      "• 400 — malformed JSON, wrong content-type\n" +
      "• 401 — authentication required or token expired\n" +
      "• 403 — authenticated but not authorized\n" +
      "• 404 — resource not found\n" +
      "• 409 — conflict (e.g. duplicate email)\n" +
      "• 422 — request body fails validation\n" +
      "• 429 — rate limit exceeded\n" +
      "• 500 — unexpected server error (fix immediately)\n" +
      "• 503 — service unavailable (DB down, overloaded)",
    codeExample: `# Validation error — 422
POST /users
{ "email": "not-an-email", "age": -5 }

→ 422 Unprocessable Entity
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request body validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "age",   "message": "Must be >= 0" }
    ]
  }
}

# Authentication error — 401
GET /me
Authorization: Bearer expired_token

→ 401 Unauthorized
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired",
    "hint": "Refresh your token at POST /auth/refresh"
  }
}

# Resource not found — 404
GET /orders/9999

→ 404 Not Found
{
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order 9999 does not exist"
  }
}

# Server error — 500 (hide internals, log trace_id)
→ 500 Internal Server Error
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "trace_id": "req_7x9mNp"
  }
}`,
    starterCode: `// Handle errors at every layer
const errorTypes = [
  { code: "400 Bad Request",    dir: "right" },
  { code: "401 Unauthorized",   dir: "right" },
  { code: "422 Validation",     dir: "right" },
  { code: "404 Not Found",      dir: "down"  },
  { code: "500 Server Error",   dir: "right" },
  { code: "trace_id",           dir: "right" },
];

for (const e of errorTypes) {
  hero.move(e.dir);
}
hero.move("down");
`,
    solutionCode: `const errorTypes = [
  { code: "400 Bad Request",    dir: "right" },
  { code: "401 Unauthorized",   dir: "right" },
  { code: "422 Validation",     dir: "right" },
  { code: "404 Not Found",      dir: "down"  },
  { code: "500 Server Error",   dir: "right" },
  { code: "trace_id",           dir: "right" },
];

for (const e of errorTypes) {
  hero.move(e.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Include a trace_id in every 5xx response. Log the full error server-side with the same trace_id so you can correlate client reports to server logs.",
  },

  // ─── Level 9: Rate Limiting ────────────────────────────────────────────────
  {
    id: "rest-api-9",
    courseId: "rest-api",
    number: 9,
    title: "Rate Limiting",
    description: "Rate limiting protects your API from abuse and ensures fair use across all clients.",
    concept: "API Rate Limiting Strategies",
    conceptExplanation:
      "Rate limiting caps how many requests a client can make in a time window.\n\n" +
      "Common algorithms:\n\n" +
      "1. Fixed Window:\n" +
      "• Count requests per window (e.g. 100 req/minute)\n" +
      "• Simple, but burst allowed at window boundary\n\n" +
      "2. Sliding Window:\n" +
      "• Track timestamps of recent requests\n" +
      "• Smoother; no burst at window boundary\n\n" +
      "3. Token Bucket:\n" +
      "• Bucket fills at a rate (e.g. 10 tokens/sec, max 100)\n" +
      "• Each request consumes one token\n" +
      "• Allows bursts up to bucket size; refills continuously\n\n" +
      "4. Leaky Bucket:\n" +
      "• Requests enter a queue; processed at a fixed rate\n" +
      "• Smooths bursts into steady flow\n\n" +
      "Rate limit by:\n" +
      "• IP address — for unauthenticated requests\n" +
      "• API key / user ID — for authenticated requests\n" +
      "• Endpoint — tighter limits on expensive endpoints\n\n" +
      "Response headers to include:\n" +
      "• X-RateLimit-Limit: 100\n" +
      "• X-RateLimit-Remaining: 42\n" +
      "• X-RateLimit-Reset: 1704067200 (Unix timestamp)\n" +
      "• Retry-After: 60 (seconds, on 429)",
    codeExample: `# Rate limit response headers (every response)
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 57
X-RateLimit-Reset: 1704067200

# When limit is exceeded
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1704067200

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Slow down.",
    "retry_after": 60
  }
}

# FastAPI with slowapi
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/items")
@limiter.limit("100/minute")
async def list_items(request: Request):
    return {"items": []}

@app.post("/items")
@limiter.limit("10/minute")   # stricter on writes
async def create_item(request: Request):
    return {"id": 1}`,
    starterCode: `// Navigate the rate limiting checkpoints
const rateLimits = [
  { check: "token bucket",    dir: "right" },
  { check: "sliding window",  dir: "right" },
  { check: "X-RateLimit",     dir: "right" },
  { check: "429 response",    dir: "down"  },
  { check: "Retry-After",     dir: "right" },
  { check: "pass through",    dir: "right" },
];

for (const r of rateLimits) {
  hero.move(r.dir);
}
hero.move("down");
`,
    solutionCode: `const rateLimits = [
  { check: "token bucket",    dir: "right" },
  { check: "sliding window",  dir: "right" },
  { check: "X-RateLimit",     dir: "right" },
  { check: "429 response",    dir: "down"  },
  { check: "Retry-After",     dir: "right" },
  { check: "pass through",    dir: "right" },
];

for (const r of rateLimits) {
  hero.move(r.dir);
}
hero.move("down");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "wall",  "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down to exit.",
    tip: "Use Redis as the backend for rate limit counters — it is fast, atomic (INCR), and supports TTL expiry natively. Do not store counters in-process memory on multi-instance deployments.",
  },

  // ─── Level 10: Grand Finale — Design a Complete REST API ──────────────────
  {
    id: "rest-api-10",
    courseId: "rest-api",
    number: 10,
    title: "Grand Finale: Design a Complete REST API",
    description: "Combine every principle to design a production-ready, well-documented REST API.",
    concept: "Complete REST API Design",
    conceptExplanation:
      "A production REST API requires all the pieces working together:\n\n" +
      "Design checklist:\n\n" +
      "URLs:\n" +
      "• Noun-based, plural, hyphenated\n" +
      "• Versioned: /v1/\n" +
      "• Nested only 1-2 levels deep\n\n" +
      "Methods & Status Codes:\n" +
      "• Correct verb for each operation\n" +
      "• 201 Created on POST, 204 on DELETE\n" +
      "• 422 for validation, 401/403 for auth\n\n" +
      "Request & Response:\n" +
      "• Consistent JSON envelope (data, meta, error)\n" +
      "• ISO 8601 timestamps\n" +
      "• UUID resource IDs\n" +
      "• Strip sensitive fields from responses\n\n" +
      "Security:\n" +
      "• HTTPS always\n" +
      "• JWT or OAuth 2.0 for user auth\n" +
      "• API keys for machine-to-machine\n" +
      "• Rate limiting on every endpoint\n\n" +
      "Pagination & Filtering:\n" +
      "• Cursor pagination for feeds\n" +
      "• Offset pagination for admin queries\n" +
      "• Filter by common fields; sort with -field\n\n" +
      "Error Handling:\n" +
      "• Machine-readable error codes\n" +
      "• trace_id on every 5xx\n" +
      "• Never leak internals\n\n" +
      "Documentation:\n" +
      "• OpenAPI/Swagger spec — auto-generate if possible\n" +
      "• Changelog for breaking changes\n" +
      "• Deprecation headers on old versions",
    codeExample: `# Complete REST API design — Blog platform example

# OpenAPI info block
openapi: 3.1.0
info:
  title: Blog API
  version: 1.0.0
  description: RESTful API for a blog platform

servers:
  - url: https://api.blog.example.com/v1

# Endpoints summary
GET    /v1/articles              → list (paginated, filterable)
POST   /v1/articles              → create (auth required)
GET    /v1/articles/{id}         → single article
PUT    /v1/articles/{id}         → replace (auth + author only)
PATCH  /v1/articles/{id}         → partial update
DELETE /v1/articles/{id}         → delete → 204

GET    /v1/articles/{id}/comments      → list comments
POST   /v1/articles/{id}/comments      → add comment (auth)
DELETE /v1/articles/{id}/comments/{cid}→ delete comment

POST   /v1/auth/register               → create account → 201
POST   /v1/auth/login                  → issue JWT
POST   /v1/auth/refresh                → refresh token
DELETE /v1/auth/logout                 → revoke token → 204

GET    /v1/me                          → current user profile

# Example: GET /v1/articles with pagination + filters
GET /v1/articles?page=2&per_page=10&tag=python&sort=-created_at
Authorization: Bearer eyJ...

→ 200 OK
{
  "data": [
    {
      "id": "art_a1b2c3",
      "title": "REST API Design",
      "author": { "id": "usr_x9y8z7", "name": "Alice" },
      "tags": ["rest", "api"],
      "created_at": "2024-01-15T09:30:00Z",
      "_links": {
        "self": "/v1/articles/art_a1b2c3",
        "comments": "/v1/articles/art_a1b2c3/comments"
      }
    }
  ],
  "meta": {
    "total": 843,
    "page": 2,
    "per_page": 10,
    "total_pages": 85,
    "next": "/v1/articles?page=3&per_page=10"
  }
}`,
    starterCode: `// The final REST API: every gem is a principle mastered
const principles = [
  { name: "URLs",          dir: "right" },
  { name: "Methods",       dir: "right" },
  { name: "Auth",          dir: "right" },
  { name: "Pagination",    dir: "down"  },
  { name: "Errors",        dir: "right" },
  { name: "Rate Limits",   dir: "right" },
];

for (const p of principles) {
  hero.move(p.dir);
}
hero.move("down");
hero.move("right");
hero.move("right");
`,
    solutionCode: `const principles = [
  { name: "URLs",          dir: "right" },
  { name: "Methods",       dir: "right" },
  { name: "Auth",          dir: "right" },
  { name: "Pagination",    dir: "down"  },
  { name: "Errors",        dir: "right" },
  { name: "Rate Limits",   dir: "right" },
];

for (const p of principles) {
  hero.move(p.dir);
}
hero.move("down");
hero.move("right");
hero.move("right");
`,
    grid: [
      ["wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
      ["wall",  "hero",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "wall",  "empty", "wall"],
      ["wall",  "wall",  "gem",   "gem",   "gem",   "wall"],
      ["wall",  "wall",  "wall",  "empty", "empty", "wall"],
      ["wall",  "wall",  "wall",  "gem",   "gem",   "exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 8 gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "right×3 (gems), down, left×2, down, right×3 (gems), down, right×2 (gems), right to exit.",
    tip: "A well-designed REST API is a product. Treat it like one: version it, document it, deprecate gracefully, listen to consumer feedback, and measure it with real metrics.",
  },
];
