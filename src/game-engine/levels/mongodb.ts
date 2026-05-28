import { LevelDefinition } from "../types";

export const mongodbLevels: LevelDefinition[] = [
  // ─── LEVEL 1 ── Documents & Collections ─────────────────────────────────────
  {
    id: "mongodb-1",
    courseId: "mongodb",
    number: 1,
    title: "Documents & Collections",
    description: "MongoDB stores JSON-like documents inside collections. Walk the hero through its first collection!",
    concept: "Documents & Collections",
    conceptExplanation:
      "MongoDB is a NoSQL document database. Instead of rows in tables, MongoDB stores data as documents — flexible JSON-like objects called BSON.\n\nA document looks like a JavaScript object:\n{\n  _id: ObjectId('...'),\n  name: 'Alice',\n  age: 30,\n  hobbies: ['reading', 'coding']\n}\n\nDocuments live inside collections. A collection is a grouping of related documents (roughly equivalent to a SQL table, but schema-free). Different documents in the same collection can have different fields.\n\nA MongoDB deployment contains one or more databases, each holding multiple collections. You select a database with `use mydb` in the shell, then work with collections like `db.users`.\n\nKey advantages of documents:\n• Nested objects and arrays represent complex data naturally\n• No JOINs needed for one-to-many data embedded in a document\n• Schema is flexible — add fields without ALTER TABLE migrations",
    codeExample: `// MongoDB Shell — select database, inspect a collection
use myapp

// Show all collections
show collections

// A single user document
{
  _id: ObjectId("64a1f2e3c9d4e5f6a7b8c9d0"),
  username: "alice",
  email: "alice@example.com",
  joinedAt: ISODate("2024-01-15"),
  scores: [42, 87, 95]
}

// Count documents in a collection
db.users.countDocuments()

// Show a sample document
db.users.findOne()`,
    starterCode: `// A "collection" is just an array of documents
// Walk through each document (gem) in the collection

const collection = ["doc1", "doc2", "doc3", "exit"];

// Visit each slot by moving right — last slot is the exit
for (let i = 0; i < collection.length; i++) {
  hero.move("right");
}`,
    solutionCode: `const collection = ["doc1", "doc2", "doc3", "exit"];

for (let i = 0; i < collection.length; i++) {
  hero.move("right");
}`,
    // hero(1,1): right×4 → (1,2)gem, (1,3)gem, (1,4)gem, (1,5)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems (documents)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (end of collection)" },
    ],
    hint: "The collection has 4 slots — loop right 4 times to collect every gem and reach the exit.",
    tip: "MongoDB collections are schema-free: each document can have different fields.",
  },

  // ─── LEVEL 2 ── insert & insertMany ──────────────────────────────────────────
  {
    id: "mongodb-2",
    courseId: "mongodb",
    number: 2,
    title: "Inserting Documents",
    description: "insertOne and insertMany add documents to a collection. Place gems on the grid!",
    concept: "insertOne & insertMany",
    conceptExplanation:
      "To add data to MongoDB you use insert operations on a collection.\n\n`insertOne` adds a single document:\ndb.users.insertOne({ name: 'Bob', age: 25 })\n\nMongoDB auto-generates an `_id` field (ObjectId) if you don't provide one. The return value includes the inserted document's _id.\n\n`insertMany` adds multiple documents in one call:\ndb.users.insertMany([\n  { name: 'Carol', age: 28 },\n  { name: 'Dave',  age: 32 }\n])\n\nThis is far more efficient than calling insertOne in a loop — the entire batch travels to the server in one network round-trip.\n\nInserts are atomic at the document level: each document is either fully written or not written at all. For insertMany, by default MongoDB stops on the first error (ordered inserts). Pass `{ ordered: false }` to attempt all documents even if some fail.",
    codeExample: `// Insert one document
db.products.insertOne({
  name: "Widget",
  price: 9.99,
  inStock: true
});
// Returns: { acknowledged: true, insertedId: ObjectId("...") }

// Insert many documents at once
db.products.insertMany([
  { name: "Gadget",  price: 14.99, inStock: true  },
  { name: "Doohickey", price: 4.49, inStock: false },
  { name: "Thingamajig", price: 22.0, inStock: true }
]);
// Returns: { acknowledged: true, insertedIds: { '0': ObjectId, '1': ObjectId, '2': ObjectId } }

// Unordered insert — continue even if one fails
db.logs.insertMany(docs, { ordered: false });`,
    starterCode: `// insertMany = add several documents in one batch
// Each "document" is a gem to collect

const inserts = [
  { direction: "right", doc: "user_1" },
  { direction: "down",  doc: "user_2" },
  { direction: "right", doc: "user_3" },
];

// "Insert" each document by moving to its position
for (const insert of inserts) {
  hero.move(insert.direction);
}`,
    solutionCode: `const inserts = [
  { direction: "right", doc: "user_1" },
  { direction: "down",  doc: "user_2" },
  { direction: "right", doc: "user_3" },
];

for (const insert of inserts) {
  hero.move(insert.direction);
}`,
    // hero(1,1) → right→(1,2) gem ✓ → down→(2,2) gem ✓ → right→(2,3) exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "wall"],
      ["wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems (insert documents)" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right to insert the first doc, down for the second, right again for the exit.",
    tip: "Always prefer insertMany over many insertOne calls — it cuts network round-trips dramatically.",
  },

  // ─── LEVEL 3 ── find & Queries ───────────────────────────────────────────────
  {
    id: "mongodb-3",
    courseId: "mongodb",
    number: 3,
    title: "Finding Documents",
    description: "Use find() to query documents. Follow the query path to collect every result.",
    concept: "find() & Basic Queries",
    conceptExplanation:
      "The primary way to read data in MongoDB is the `find` method.\n\n`db.collection.find()` returns all documents (like SELECT * in SQL).\n`db.collection.find({ field: value })` returns only documents matching the filter.\n`db.collection.findOne({ field: value })` returns the first match (or null).\n\nThe filter is a plain JavaScript object. MongoDB matches documents where every field in the filter equals the corresponding field in the document:\ndb.users.find({ city: 'London', active: true })\n\nYou can project (select only certain fields) with a second argument:\ndb.users.find({ active: true }, { name: 1, email: 1, _id: 0 })\n// 1 = include, 0 = exclude\n\nResults come back as a cursor — an iterator over the matched documents. Chain helpers like .limit(), .skip(), .sort() to shape the result set before MongoDB fetches it.",
    codeExample: `// Find all documents
db.users.find()

// Find with a filter
db.users.find({ country: "Canada" })

// Find one document
db.users.findOne({ email: "alice@example.com" })

// Projection: only return name and email (exclude _id)
db.users.find(
  { active: true },
  { name: 1, email: 1, _id: 0 }
)

// Limit and sort
db.users.find({ active: true })
        .sort({ joinedAt: -1 })
        .limit(10)`,
    starterCode: `// find() scans documents; we follow the matching path
// Query: find users where active === true

const documents = [
  { id: 1, active: true,  path: "right" },
  { id: 2, active: false, path: "right" },
  { id: 3, active: true,  path: "down"  },
  { id: 4, active: true,  path: "right" },
];

// Only process documents that match the query
const results = documents.filter(doc => doc.active);

for (const doc of results) {
  hero.move(doc.path);
}`,
    solutionCode: `const documents = [
  { id: 1, active: true,  path: "right" },
  { id: 2, active: false, path: "right" },
  { id: 3, active: true,  path: "down"  },
  { id: 4, active: true,  path: "right" },
];

const results = documents.filter(doc => doc.active);

for (const doc of results) {
  hero.move(doc.path);
}`,
    // Matching docs: id1 (right), id3 (down), id4 (right)
    // hero(1,1) → right→(1,2) gem ✓ → down→(2,2) gem ✓ → right→(2,3) exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "wall"],
      ["wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems (query results)" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Filter for active: true — you get 3 moves: right, down, right.",
    tip: "find() returns a lazy cursor. Documents aren't loaded until you iterate — great for large collections.",
  },

  // ─── LEVEL 4 ── Query Operators ──────────────────────────────────────────────
  {
    id: "mongodb-4",
    courseId: "mongodb",
    number: 4,
    title: "Query Operators",
    description: "Operators like $gt, $in, and $ne power expressive queries. Use them to navigate the grid.",
    concept: "Query Operators",
    conceptExplanation:
      "MongoDB query operators let you express conditions beyond simple equality.\n\nComparison operators:\n• $gt / $gte — greater than / greater than or equal\n• $lt / $lte — less than / less than or equal\n• $eq — equal (usually implicit)\n• $ne — not equal\n• $in — value is in an array: { status: { $in: ['active','trial'] } }\n• $nin — value is NOT in an array\n\nLogical operators:\n• $and — all conditions must match\n• $or  — at least one must match\n• $not — negate a condition\n• $nor — none must match\n\nElement operators:\n• $exists — field is present (or absent)\n• $type   — field is a specific BSON type\n\nArray operators:\n• $all   — array contains all specified values\n• $size  — array has exactly N elements\n• $elemMatch — at least one array element matches a sub-query",
    codeExample: `// $gt / $lt
db.products.find({ price: { $gt: 10, $lt: 50 } })

// $in
db.orders.find({ status: { $in: ["pending", "processing"] } })

// $ne
db.users.find({ role: { $ne: "admin" } })

// $and / $or
db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { parental_consent: true }
  ]
})

// $exists
db.products.find({ discount: { $exists: true } })

// $elemMatch
db.students.find({
  grades: { $elemMatch: { subject: "Math", score: { $gte: 90 } } }
})`,
    starterCode: `// Use $gt and $in style filters to decide movement
const docs = [
  { score: 85, tag: "north", dir: "up"    },
  { score: 30, tag: "south", dir: "down"  },
  { score: 92, tag: "north", dir: "right" },
  { score: 10, tag: "east",  dir: "right" },
  { score: 77, tag: "north", dir: "down"  },
];

// $gt: 60  AND  $in: ["north"]
const matched = docs.filter(d =>
  d.score > 60 && ["north"].includes(d.tag)
);

for (const d of matched) {
  hero.move(d.dir);
}`,
    solutionCode: `const docs = [
  { score: 85, tag: "north", dir: "up"    },
  { score: 30, tag: "south", dir: "down"  },
  { score: 92, tag: "north", dir: "right" },
  { score: 10, tag: "east",  dir: "right" },
  { score: 77, tag: "north", dir: "down"  },
];

const matched = docs.filter(d =>
  d.score > 60 && ["north"].includes(d.tag)
);

for (const d of matched) {
  hero.move(d.dir);
}`,
    // Matching: score85/north→up, score92/north→right, score77/north→down
    // hero(2,1) → up→(1,1) gem ✓ → right→(1,2) gem ✓ → down→(2,2) exit ✓
    grid: [
      ["wall", "wall", "wall", "wall"],
      ["wall", "gem",  "gem",  "wall"],
      ["wall", "hero", "exit", "wall"],
      ["wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 2, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems (operator matches)" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Only docs where score > 60 AND tag is 'north' pass — that gives: up, right, down.",
    tip: "Combine $and with $or to build rich query trees. MongoDB evaluates them efficiently with proper indexes.",
  },

  // ─── LEVEL 5 ── updateOne & updateMany ───────────────────────────────────────
  {
    id: "mongodb-5",
    courseId: "mongodb",
    number: 5,
    title: "Updating Documents",
    description: "updateOne and $set modify existing documents. Patch the hero's route!",
    concept: "updateOne & Update Operators",
    conceptExplanation:
      "MongoDB provides several methods to modify existing documents.\n\n`updateOne(filter, update)` modifies the first document matching the filter.\n`updateMany(filter, update)` modifies all matching documents.\n`replaceOne(filter, replacement)` completely replaces a document (keeps _id).\n\nThe second argument uses update operators:\n• $set   — set field values\n• $unset — remove a field\n• $inc   — increment a numeric field\n• $push  — append to an array\n• $pull  — remove elements from an array\n• $addToSet — add to array only if not already present\n• $rename   — rename a field\n\nExample:\ndb.users.updateOne(\n  { email: 'alice@example.com' },  // filter\n  { $set: { age: 31 }, $inc: { loginCount: 1 } }  // update\n)\n\nAdd `{ upsert: true }` to insert a new document if no match is found — a powerful 'insert-or-update' pattern.",
    codeExample: `// Update one document
db.users.updateOne(
  { username: "alice" },
  { $set: { age: 31, updatedAt: new Date() } }
)

// Increment a counter
db.pageViews.updateOne(
  { url: "/home" },
  { $inc: { views: 1 } }
)

// Push to an array
db.posts.updateOne(
  { _id: postId },
  { $push: { tags: "mongodb" } }
)

// Update many — give all inactive users a warning flag
db.users.updateMany(
  { lastLogin: { $lt: thirtyDaysAgo } },
  { $set: { warned: true } }
)

// Upsert — insert if missing
db.settings.updateOne(
  { key: "theme" },
  { $set: { value: "dark" } },
  { upsert: true }
)`,
    starterCode: `// $set patches a field; we "patch" the route at runtime
let route = [
  { dir: "right" },
  { dir: "right" },
  { dir: "down"  },
  { dir: "right" },
];

// $set: override index 2 from "down" to "right" — oops, wrong path!
// Actually keep as-is: the correct patch is already applied
route[2] = { dir: "down" }; // $set the correct direction

for (const step of route) {
  hero.move(step.dir);
}`,
    solutionCode: `let route = [
  { dir: "right" },
  { dir: "right" },
  { dir: "down"  },
  { dir: "right" },
];

route[2] = { dir: "down" };

for (const step of route) {
  hero.move(step.dir);
}`,
    // hero(1,1) → right→(1,2) gem ✓ → right→(1,3) gem ✓ → down→(2,3) gem ✓ → right→(2,4) exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "The route is: right, right, down, right — collect gems at (1,2), (1,3), (2,3) then exit at (2,4).",
    tip: "Always use $set rather than replacing the whole document — other fields you don't mention stay untouched.",
  },

  // ─── LEVEL 6 ── Aggregation Pipeline ─────────────────────────────────────────
  {
    id: "mongodb-6",
    courseId: "mongodb",
    number: 6,
    title: "Aggregation Pipeline",
    description: "Pipe documents through $match → $group → $sort stages. Walk the hero through each stage!",
    concept: "Aggregation Pipeline",
    conceptExplanation:
      "MongoDB's aggregation pipeline transforms documents through a series of stages. Each stage receives documents, processes them, and passes results to the next stage — like Unix pipes.\n\nCommon stages:\n• $match   — filter documents (like WHERE). Put early to use indexes.\n• $group   — group documents by a key and compute aggregates: $sum, $avg, $min, $max, $count\n• $sort    — order documents (-1 = descending, 1 = ascending)\n• $project — reshape documents: include/exclude/rename/compute fields\n• $limit / $skip — pagination\n• $lookup  — left outer join to another collection\n• $unwind  — deconstruct an array field into individual documents\n• $addFields / $set — add or overwrite fields\n\nExample pipeline — total revenue per product category:\ndb.orders.aggregate([\n  { $match:   { status: 'completed' } },\n  { $group:   { _id: '$category', total: { $sum: '$amount' } } },\n  { $sort:    { total: -1 } },\n  { $limit:   5 }\n])",
    codeExample: `// Top 3 categories by total sales
db.orders.aggregate([
  // Stage 1: only completed orders
  { $match: { status: "completed" } },

  // Stage 2: group by category, sum revenue
  { $group: {
      _id: "$category",
      revenue: { $sum: "$amount" },
      count:   { $sum: 1 }
  }},

  // Stage 3: highest revenue first
  { $sort: { revenue: -1 } },

  // Stage 4: top 3 only
  { $limit: 3 }
])

// Average score per student
db.grades.aggregate([
  { $group: { _id: "$studentId", avg: { $avg: "$score" } } },
  { $sort:  { avg: -1 } }
])`,
    starterCode: `// Walk through 3 pipeline stages: $match → $group → $sort
const stages = [
  { name: "$match",  moves: ["right", "right"] },   // filter documents
  { name: "$group",  moves: ["down",  "right"] },   // aggregate
  { name: "$sort",   moves: ["down"           ] },  // order results
];

// Execute each stage in order — like a real pipeline
for (const stage of stages) {
  for (const dir of stage.moves) {
    hero.move(dir);
  }
}`,
    solutionCode: `const stages = [
  { name: "$match",  moves: ["right", "right"] },
  { name: "$group",  moves: ["down",  "right"] },
  { name: "$sort",   moves: ["down"           ] },
];

for (const stage of stages) {
  for (const dir of stage.moves) {
    hero.move(dir);
  }
}`,
    // Moves: right,right,down,right,down
    // hero(1,1)→right(1,2)gem✓→right(1,3)gem✓→down(2,3)gem✓→right(2,4)gem✓→down(3,4)exit✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems (pipeline stages)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (pipeline output)" },
    ],
    hint: "Each stage moves the hero forward: $match→right×2, $group→down+right, $sort→down to exit.",
    tip: "Place $match as the first stage whenever possible — it can use indexes and eliminates documents early.",
  },

  // ─── LEVEL 7 ── Indexes ───────────────────────────────────────────────────────
  {
    id: "mongodb-7",
    courseId: "mongodb",
    number: 7,
    title: "Indexes",
    description: "Indexes speed up queries. An indexed path leads the hero straight to the gems!",
    concept: "Indexes",
    conceptExplanation:
      "Without an index, MongoDB must scan every document in a collection (a COLLSCAN) to find matches. For large collections this is slow.\n\nAn index stores a sorted copy of one or more field values along with pointers to the actual documents. MongoDB can jump directly to matching entries — an IXSCAN — which is orders of magnitude faster.\n\nCreating indexes:\ndb.users.createIndex({ email: 1 })           // ascending single-field\ndb.products.createIndex({ price: -1 })       // descending\ndb.orders.createIndex({ userId: 1, date: -1 }) // compound index\ndb.articles.createIndex({ title: 'text' })   // full-text search\ndb.places.createIndex({ location: '2dsphere' }) // geospatial\n\nUseful index options:\n{ unique: true }   — enforce uniqueness (like UNIQUE in SQL)\n{ sparse: true }   — only index docs where the field exists\n{ expireAfterSeconds: 3600 } — TTL index: auto-delete docs after 1 hour\n\nUse explain() to see if a query uses an index:\ndb.users.find({ email: 'x@y.com' }).explain('executionStats')\n\nOver-indexing wastes memory and slows writes — index only the fields you actually query.",
    codeExample: `// Create a single-field index
db.users.createIndex({ email: 1 })

// Create a compound index (userId + date)
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Unique index — no duplicate emails
db.users.createIndex({ email: 1 }, { unique: true })

// Text index for full-text search
db.articles.createIndex({ content: "text" })

// TTL index — delete sessions after 1 hour
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)

// See all indexes on a collection
db.users.getIndexes()

// Diagnose a slow query
db.users.find({ email: "alice@example.com" })
        .explain("executionStats")`,
    starterCode: `// An index gives us a direct path — no full scan!
// "Indexed" moves go straight to the gem; "unindexed" would wander

const indexedPath = ["right", "right", "up", "right", "down", "right"];

// With an index, we take the optimised direct route
for (const dir of indexedPath) {
  hero.move(dir);
}`,
    solutionCode: `const indexedPath = ["right", "right", "up", "right", "down", "right"];

for (const dir of indexedPath) {
  hero.move(dir);
}`,
    // Moves: right,right,up,right,down,right
    // hero(2,1)→right(2,2)gem✓→right(2,3)gem✓→up(1,3)gem✓→right(1,4)gem✓→down(2,4)gem✓→right(2,5)exit✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 2, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (indexed fields)" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Follow the index path: right×2, up, right, down, right — it hits every gem efficiently.",
    tip: "A COLLSCAN on a million-document collection can take seconds. The same query with an index takes microseconds.",
  },

  // ─── LEVEL 8 ── Schema Design ─────────────────────────────────────────────────
  {
    id: "mongodb-8",
    courseId: "mongodb",
    number: 8,
    title: "Schema Design",
    description: "Embed related data inside a document, or reference it by ID. Choose the right path!",
    concept: "Embedded vs Referenced Documents",
    conceptExplanation:
      "MongoDB is schema-flexible, but good schema design is critical for performance and clarity.\n\nTwo fundamental patterns:\n\n1. EMBEDDING (denormalisation)\n   Store related data inside the parent document as a nested object or array.\n   ✅ One read fetches everything — no joins needed\n   ✅ Atomic updates on the whole document\n   ❌ Document grows large; embedded array can exceed 16 MB BSON limit\n   Best for: one-to-few relationships, data always accessed together\n   Example: user with embedded addresses, order with embedded line items\n\n2. REFERENCING (normalisation)\n   Store related data in a separate collection; use an ObjectId reference.\n   ✅ Each document stays small\n   ✅ Related data can be queried independently\n   ❌ Requires $lookup (join) or multiple queries\n   Best for: one-to-many, many-to-many, frequently updated sub-documents\n   Example: posts referencing authorId from a users collection\n\nThe golden rule: model your data the way your application queries it, not the way a relational schema would look.",
    codeExample: `// ── Embedding ──────────────────────────────────────────
// User document with embedded addresses
{
  _id: ObjectId("..."),
  name: "Alice",
  addresses: [
    { type: "home",  street: "1 Main St", city: "London" },
    { type: "work",  street: "5 Tech Ave", city: "London" }
  ]
}

// ── Referencing ─────────────────────────────────────────
// Post references author by ID
{
  _id: ObjectId("post123"),
  title: "MongoDB Schema Design",
  authorId: ObjectId("user456"),  // <-- reference
  tags: ["mongodb", "nosql"]
}

// Resolve reference with $lookup
db.posts.aggregate([
  { $lookup: {
      from: "users",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
  }}
])`,
    starterCode: `// Two schema strategies = two possible paths
// Choose "embed" for data accessed together, "reference" for independent data

const strategy = "embed"; // try changing to "reference"

if (strategy === "embed") {
  // Embedded: direct path — one document holds everything
  hero.move("right");
  hero.move("right");
  hero.move("down");
  hero.move("right");
} else {
  // Referenced: indirect path — fetch parent then child
  hero.move("down");
  hero.move("right");
  hero.move("up");
  hero.move("right");
}`,
    solutionCode: `const strategy = "embed";

if (strategy === "embed") {
  hero.move("right");
  hero.move("right");
  hero.move("down");
  hero.move("right");
} else {
  hero.move("down");
  hero.move("right");
  hero.move("up");
  hero.move("right");
}`,
    // "embed" path: hero(1,1)→right(1,2)gem✓→right(1,3)gem✓→down(2,3)gem✓→right(2,4)exit✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Keep strategy as 'embed' and follow the direct path: right, right, down, right.",
    tip: "Embedding is usually faster for reads; referencing is better when sub-documents change often or grow unboundedly.",
  },

  // ─── LEVEL 9 ── Mongoose ODM ──────────────────────────────────────────────────
  {
    id: "mongodb-9",
    courseId: "mongodb",
    number: 9,
    title: "Mongoose ODM",
    description: "Mongoose brings schemas and models to MongoDB in Node.js. Validate the hero's path!",
    concept: "Mongoose ODM",
    conceptExplanation:
      "Mongoose is the most popular ODM (Object Document Mapper) for MongoDB in Node.js. It adds:\n\n• Schemas — define the shape and types of your documents\n• Models  — compiled schemas that provide query/save methods\n• Validation — run before saves; keep bad data out of the database\n• Middleware (hooks) — pre/post hooks on save, find, delete, etc.\n• Virtuals — computed properties that aren't stored in MongoDB\n• Population — automatic reference resolution (like $lookup)\n\nBasic workflow:\n1. Define a Schema\n2. Compile it into a Model\n3. Use the Model to create, query, update, delete documents\n\nMongoose is especially useful in teams — the schema acts as living documentation of what a document looks like.",
    codeExample: `import mongoose from "mongoose";

// 1. Connect
await mongoose.connect("mongodb://localhost:27017/myapp");

// 2. Define a Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, lowercase: true },
  age:      { type: Number, min: 0, max: 120 },
  role:     { type: String, enum: ["user","admin"], default: "user" },
  createdAt:{ type: Date,   default: Date.now }
});

// 3. Add a virtual
userSchema.virtual("isAdult").get(function () {
  return this.age >= 18;
});

// 4. Pre-save middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 5. Compile into a Model
const User = mongoose.model("User", userSchema);

// 6. Create & save a document
const user = new User({ username: "alice", email: "alice@example.com", age: 28 });
await user.save();

// 7. Query
const admins = await User.find({ role: "admin" }).sort({ username: 1 });`,
    starterCode: `// Mongoose validates data before saving — invalid docs are rejected
const schema = {
  direction: ["up", "down", "left", "right"], // enum validation
  required: true,
};

const moves = [
  { direction: "right", valid: true  },
  { direction: "fly",   valid: false }, // fails enum validation
  { direction: "down",  valid: true  },
  { direction: "right", valid: true  },
  { direction: "teleport", valid: false }, // fails
];

// Mongoose rejects invalid docs — only valid moves run
const validated = moves.filter(m =>
  m.valid && schema.direction.includes(m.direction)
);

for (const m of validated) {
  hero.move(m.direction);
}`,
    solutionCode: `const schema = {
  direction: ["up", "down", "left", "right"],
  required: true,
};

const moves = [
  { direction: "right", valid: true  },
  { direction: "fly",   valid: false },
  { direction: "down",  valid: true  },
  { direction: "right", valid: true  },
  { direction: "teleport", valid: false },
];

const validated = moves.filter(m =>
  m.valid && schema.direction.includes(m.direction)
);

for (const m of validated) {
  hero.move(m.direction);
}`,
    // Valid moves: right, down, right
    // hero(1,1)→right(1,2)gem✓→down(2,2)gem✓→right(2,3)exit✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "wall"],
      ["wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems (valid documents)" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Invalid directions ('fly', 'teleport') are rejected by the schema — only right, down, right remain.",
    tip: "Mongoose's required, enum, min/max, and match validators run before every save — they're your first line of defence against bad data.",
  },

  // ─── LEVEL 10 ── Grand Finale ─────────────────────────────────────────────────
  {
    id: "mongodb-10",
    courseId: "mongodb",
    number: 10,
    title: "Grand Finale: Full Application",
    description: "Combine everything — insert, query, update, aggregate, and Mongoose — in one epic run!",
    concept: "MongoDB in Production",
    conceptExplanation:
      "You've learned all the core MongoDB building blocks. Here's how they fit together in a real Node.js application.\n\nA typical production setup:\n• MongoDB Atlas — managed cloud cluster (free tier available)\n• Mongoose — ODM for schema, validation, and model methods\n• Indexes — on every field you filter or sort by\n• Aggregation pipelines — analytics dashboards, reports\n• Change Streams — react to inserts/updates in real time\n• Transactions — multi-document ACID operations (since MongoDB 4.0)\n\nProduction checklist:\n☑ Enable authentication and TLS\n☑ Use connection pooling (Mongoose handles this automatically)\n☑ Set maxTimeMS on long-running queries\n☑ Monitor with MongoDB Atlas Performance Advisor or explain()\n☑ Back up with Atlas continuous cloud backups or mongodump\n☑ Use $lookup sparingly — denormalise hot data instead\n☑ Keep documents under ~1 KB for high-throughput collections\n\nMongoDB excels at: flexible schemas, horizontal scaling (sharding), high write throughput, and hierarchical/document-oriented data.",
    codeExample: `import mongoose from "mongoose";

// ── Schema ───────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true, min: 0 },
  category: { type: String, index: true },
  tags:     [String],
  stock:    { type: Number, default: 0 },
}, { timestamps: true });

productSchema.index({ name: "text" });
const Product = mongoose.model("Product", productSchema);

// ── Insert ────────────────────────────────────────────────
await Product.insertMany([
  { name: "Widget A", price: 9.99,  category: "tools",  stock: 100 },
  { name: "Widget B", price: 24.99, category: "tools",  stock: 45  },
  { name: "Gadget X", price: 49.99, category: "electronics", stock: 10 },
]);

// ── Query + Update ────────────────────────────────────────
const cheapTools = await Product.find({
  category: "tools",
  price: { $lt: 20 }
});

await Product.updateMany(
  { stock: { $lt: 20 } },
  { $set: { lowStock: true } }
);

// ── Aggregation ───────────────────────────────────────────
const report = await Product.aggregate([
  { $match:  { category: "tools" } },
  { $group:  { _id: "$category", avgPrice: { $avg: "$price" }, total: { $sum: 1 } } },
  { $sort:   { avgPrice: -1 } },
]);

console.log(report);`,
    starterCode: `// Grand finale: simulate a full MongoDB workflow
// insert → find → update → aggregate → exit

const pipeline = [
  { stage: "insertMany", moves: ["right", "right"] },
  { stage: "find",       moves: ["down"           ] },
  { stage: "updateOne",  moves: ["right", "right"] },
  { stage: "aggregate",  moves: ["up",    "right"] },
  { stage: "exit",       moves: ["down",  "right"] },
];

for (const step of pipeline) {
  for (const dir of step.moves) {
    hero.move(dir);
  }
}`,
    solutionCode: `const pipeline = [
  { stage: "insertMany", moves: ["right", "right"] },
  { stage: "find",       moves: ["down"           ] },
  { stage: "updateOne",  moves: ["right", "right"] },
  { stage: "aggregate",  moves: ["up",    "right"] },
  { stage: "exit",       moves: ["down",  "right"] },
];

for (const step of pipeline) {
  for (const dir of step.moves) {
    hero.move(dir);
  }
}`,
    // All moves: right,right,down,right,right,up,right,down,right
    // hero(2,1)→(2,2)gem→(2,3)gem→(3,3)gem→(3,4)gem→(3,5)gem→(2,5)gem→(2,6)gem→(3,6)gem→(3,7)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "gem",  "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 2, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 8 💎 gems (full DB workflow)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (app deployed!)" },
    ],
    hint: "Follow the pipeline order: insertMany→find→updateOne→aggregate→exit. Each stage moves the hero forward.",
    tip: "You now know MongoDB from documents to production. Keep practicing with MongoDB Atlas free tier and the official Node.js driver docs.",
  },
];
