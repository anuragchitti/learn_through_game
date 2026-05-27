import { LevelDefinition } from "../types";

export const graphqlLevels: LevelDefinition[] = [
  {
    id: "graphql-1",
    courseId: "graphql",
    number: 1,
    title: "What is GraphQL?",
    description: "GraphQL is a query language for APIs that lets you request exactly the data you need.",
    concept: "GraphQL Overview",
    conceptExplanation:
      "GraphQL is a query language and runtime for APIs, developed by Facebook in 2012.\n\nKey advantages over REST:\n• Ask for exactly what you need — no over-fetching\n• Get many resources in a single request — no under-fetching\n• Strong type system — the schema describes everything\n• Self-documenting — introspect the schema at runtime\n• Evolve APIs without versioning\n\nCore concepts:\n• Schema — defines types and operations\n• Query — read data\n• Mutation — write/update data\n• Subscription — real-time data via websockets\n• Resolver — function that returns the data for a field\n\nCompanies using GraphQL: GitHub, Shopify, Twitter, Airbnb",
    codeExample: `# REST: multiple round trips
GET /users/42
GET /users/42/posts
GET /users/42/followers

# GraphQL: one request, exactly what you need
query {
  user(id: "42") {
    name
    email
    posts {
      title
      publishedAt
    }
    followers {
      name
    }
  }
}`,
    starterCode: `// GraphQL: ask for exactly what you need
const queries = [
  { field: "user.name",      dir: "right" },
  { field: "user.email",     dir: "right" },
  { field: "user.posts",     dir: "right" },
  { field: "user.followers", dir: "down" },
  { field: "resolve",        dir: "right" },
];

for (const q of queries) {
  hero.move(q.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const queries = [
  { field: "user.name",      dir: "right" },
  { field: "user.email",     dir: "right" },
  { field: "user.posts",     dir: "right" },
  { field: "user.followers", dir: "down" },
  { field: "resolve",        dir: "right" },
];

for (const q of queries) {
  hero.move(q.dir);
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
    tip: "GraphQL's biggest win: one network round-trip instead of many. Especially valuable on mobile with high latency.",
  },

  {
    id: "graphql-2",
    courseId: "graphql",
    number: 2,
    title: "Schema & Types",
    description: "The GraphQL schema is a strongly-typed contract between client and server.",
    concept: "Schema Definition Language (SDL)",
    conceptExplanation:
      "GraphQL schemas are written in SDL (Schema Definition Language).\n\nScalar types (built-in):\n• String, Int, Float, Boolean, ID\n\nObject types:\ntype User {\n  id: ID!\n  name: String!\n  email: String\n  age: Int\n  posts: [Post!]!\n}\n\n! = non-null (required)\n[Post!]! = non-null list of non-null Posts\n\nSpecial types:\n• Query — read entry points\n• Mutation — write entry points\n• Subscription — real-time entry points\n\nEnums, Input types, Interfaces, Unions also supported.",
    codeExample: `# schema.graphql
type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

type User {
  id: ID!
  name: String!
  email: String!
  role: Role!
  posts: [Post!]!
  createdAt: String!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
  published: Boolean!
}

enum Role {
  ADMIN
  USER
  MODERATOR
}`,
    starterCode: `// Schema: define types before you can query
const schemaTypes = [
  { type: "Query",    dir: "right" },
  { type: "User",     dir: "right" },
  { type: "Post",     dir: "right" },
  { type: "Role",     dir: "down" },
  { type: "Mutation", dir: "right" },
];

for (const t of schemaTypes) {
  hero.move(t.dir);
}
hero.move("right");`,
    solutionCode: `const schemaTypes = [
  { type: "Query",    dir: "right" },
  { type: "User",     dir: "right" },
  { type: "Post",     dir: "right" },
  { type: "Role",     dir: "down" },
  { type: "Mutation", dir: "right" },
];

for (const t of schemaTypes) {
  hero.move(t.dir);
}
hero.move("right");`,
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
    hint: "right×3 (gems), down, right×2 (gems+exit).",
    tip: "The ! (non-null) modifier is important — use it on fields you guarantee will always have a value.",
  },

  {
    id: "graphql-3",
    courseId: "graphql",
    number: 3,
    title: "Queries",
    description: "GraphQL queries let you ask for nested data in one request.",
    concept: "Writing Queries",
    conceptExplanation:
      "A GraphQL query is hierarchical — it mirrors the shape of the data you want.\n\nBasic query:\nquery {\n  user(id: \"1\") {\n    name\n    email\n  }\n}\n\nNamed query (best practice for debugging):\nquery GetUser($id: ID!) {\n  user(id: $id) {\n    name\n    email\n    posts {\n      title\n    }\n  }\n}\n\nVariables (sent separately as JSON):\n{ \"id\": \"42\" }\n\nAliases (rename fields in response):\nquery {\n  alice: user(id: \"1\") { name }\n  bob: user(id: \"2\") { name }\n}\n\nFragments (reusable field sets):\nfragment UserFields on User {\n  id name email\n}",
    codeExample: `// Apollo Client query
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
        published
      }
    }
  }
\`;

function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{data.user.name}</div>;
}`,
    starterCode: `// Query: select only the fields you need
function runQuery(fields) {
  for (const field of fields) {
    hero.move(field.dir);
  }
}

runQuery([
  { name: "id",    dir: "right" },
  { name: "name",  dir: "right" },
  { name: "email", dir: "down" },
  { name: "posts.title", dir: "right" },
  { name: "posts.date",  dir: "right" },
]);
hero.move("down");`,
    solutionCode: `function runQuery(fields) {
  for (const field of fields) {
    hero.move(field.dir);
  }
}

runQuery([
  { name: "id",    dir: "right" },
  { name: "name",  dir: "right" },
  { name: "email", dir: "down" },
  { name: "posts.title", dir: "right" },
  { name: "posts.date",  dir: "right" },
]);
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
    tip: "Always name your queries (query GetUser vs just query {}) — named queries appear in logs and developer tools.",
  },

  {
    id: "graphql-4",
    courseId: "graphql",
    number: 4,
    title: "Mutations",
    description: "Mutations modify server-side data — create, update, or delete.",
    concept: "GraphQL Mutations",
    conceptExplanation:
      "Mutations change data on the server. They look like queries but use the mutation keyword.\n\nSchema definition:\ntype Mutation {\n  createUser(input: CreateUserInput!): User!\n  updatePost(id: ID!, title: String): Post\n  deletePost(id: ID!): Boolean!\n}\n\ninput CreateUserInput {\n  name: String!\n  email: String!\n  role: Role\n}\n\nCalling a mutation:\nmutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    name\n    email\n  }\n}\n\nVariables:\n{ \"input\": { \"name\": \"Alice\", \"email\": \"alice@example.com\" } }\n\nBest practice: mutations return the affected object so the client can update its cache.",
    codeExample: `// Mutation with Apollo Client
const CREATE_POST = gql\`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
      createdAt
    }
  }
\`;

function NewPost() {
  const [createPost, { loading, data }] = useMutation(CREATE_POST, {
    refetchQueries: ['GetPosts'], // refetch list after create
  });

  const handleSubmit = () => {
    createPost({
      variables: { title: "Hello", body: "World" },
    });
  };
}`,
    starterCode: `// Mutations: create, update, delete
function runMutation(ops) {
  for (const op of ops) {
    hero.move(op.dir);
  }
}

runMutation([
  { op: "createUser",  dir: "right" },
  { op: "updatePost",  dir: "right" },
  { op: "deletePost",  dir: "right" },
  { op: "updateCache", dir: "down" },
  { op: "refetch",     dir: "right" },
]);
hero.move("down");`,
    solutionCode: `function runMutation(ops) {
  for (const op of ops) {
    hero.move(op.dir);
  }
}

runMutation([
  { op: "createUser",  dir: "right" },
  { op: "updatePost",  dir: "right" },
  { op: "deletePost",  dir: "right" },
  { op: "updateCache", dir: "down" },
  { op: "refetch",     dir: "right" },
]);
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right (gem), down, down to exit.",
    tip: "Return the modified object from mutations — this lets Apollo Client automatically update the cache without a refetch.",
  },

  {
    id: "graphql-5",
    courseId: "graphql",
    number: 5,
    title: "Resolvers",
    description: "Resolvers are functions that return the data for each field in the schema.",
    concept: "Resolver Functions",
    conceptExplanation:
      "Every field in GraphQL has a resolver — a function that returns data.\n\nResolver signature:\n(parent, args, context, info) => data\n• parent: result from the parent field\n• args: arguments passed to this field\n• context: shared object (db, auth user, etc.)\n• info: query AST info (rarely needed)\n\nExample resolver map:\nconst resolvers = {\n  Query: {\n    user: (_, { id }, { db }) => db.users.findById(id),\n    users: (_, __, { db }) => db.users.findAll(),\n  },\n  User: {\n    posts: (user, _, { db }) => db.posts.findByAuthor(user.id),\n  },\n  Mutation: {\n    createUser: (_, { input }, { db }) => db.users.create(input),\n  },\n};\n\nDataLoader: batch and cache multiple DB calls to avoid N+1 queries",
    codeExample: `// Apollo Server resolvers
const resolvers = {
  Query: {
    user: async (_, { id }, { db, user: authUser }) => {
      if (!authUser) throw new AuthenticationError('Not authenticated');
      return db.users.findById(id);
    },
    posts: (_, { limit = 10, offset = 0 }, { db }) =>
      db.posts.findAll({ limit, offset }),
  },

  User: {
    // Resolver for User.posts — called once per user
    posts: async (parent, _, { loaders }) =>
      loaders.postsByUser.load(parent.id), // DataLoader: batches calls
  },

  Mutation: {
    createPost: async (_, { input }, { db, user }) => {
      if (!user) throw new AuthenticationError('Login required');
      return db.posts.create({ ...input, authorId: user.id });
    },
  },
};`,
    starterCode: `// Resolvers: each field needs a function
function resolveQuery(resolvers) {
  for (const resolver of resolvers) {
    hero.move(resolver.dir);
  }
}

resolveQuery([
  { field: "Query.user",       dir: "right" },
  { field: "Query.posts",      dir: "right" },
  { field: "User.posts",       dir: "down" },
  { field: "Mutation.create",  dir: "right" },
  { field: "Mutation.delete",  dir: "right" },
]);
hero.move("down");`,
    solutionCode: `function resolveQuery(resolvers) {
  for (const resolver of resolvers) {
    hero.move(resolver.dir);
  }
}

resolveQuery([
  { field: "Query.user",       dir: "right" },
  { field: "Query.posts",      dir: "right" },
  { field: "User.posts",       dir: "down" },
  { field: "Mutation.create",  dir: "right" },
  { field: "Mutation.delete",  dir: "right" },
]);
hero.move("down");`,
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
    tip: "Use DataLoader for field resolvers that query the DB — it batches all similar loads into one query, solving the N+1 problem.",
  },

  {
    id: "graphql-6",
    courseId: "graphql",
    number: 6,
    title: "Variables & Arguments",
    description: "Pass dynamic values to queries using variables — never string-interpolate.",
    concept: "Query Variables",
    conceptExplanation:
      "GraphQL variables separate the query structure from its inputs.\n\nWhy variables instead of string interpolation:\n• Safe from injection attacks\n• Can be cached by the server\n• Reusable query shapes\n\nDeclare variables in the query signature:\nquery GetUser($id: ID!, $includePost: Boolean = false) {\n  user(id: $id) {\n    name\n    posts @include(if: $includePost) { title }\n  }\n}\n\nSend variables as JSON:\n{ \"id\": \"42\", \"includePost\": true }\n\nDirectives:\n• @include(if: Boolean) — include field only if true\n• @skip(if: Boolean) — skip field if true\n• @deprecated(reason: \"...\") — mark field deprecated",
    codeExample: `// Variables in Apollo Client
const SEARCH_POSTS = gql\`
  query SearchPosts(
    $query: String!
    $limit: Int = 10
    $offset: Int = 0
    $published: Boolean = true
  ) {
    posts(
      search: $query
      limit: $limit
      offset: $offset
      published: $published
    ) {
      id
      title
      author {
        name
      }
      @include(if: $published) {
        publishedAt
      }
    }
  }
\`;

// Send variables separately — never interpolate!
const { data } = useQuery(SEARCH_POSTS, {
  variables: { query: "graphql", limit: 5 },
});`,
    starterCode: `// Variables: pass values safely
function queryWithVars(vars, ops) {
  // Validate vars first
  for (const v of Object.keys(vars)) {
    hero.move("right");
  }
  hero.move("down");
  // Execute query
  for (const op of ops) {
    hero.move(op.dir);
  }
}

queryWithVars(
  { id: "42", limit: 10, published: true },
  [{ dir: "right" }, { dir: "right" }, { dir: "down" }]
);`,
    solutionCode: `function queryWithVars(vars, ops) {
  for (const v of Object.keys(vars)) {
    hero.move("right");
  }
  hero.move("down");
  for (const op of ops) {
    hero.move(op.dir);
  }
}

queryWithVars(
  { id: "42", limit: 10, published: true },
  [{ dir: "right" }, { dir: "right" }, { dir: "down" }]
);`,
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
    hint: "3 vars → right×3 (gems), down, right×2 (gems), right, down, down to exit.",
    tip: "Never concatenate user input into a GraphQL query string — always use variables. It's the equivalent of SQL parameterized queries.",
  },

  {
    id: "graphql-7",
    courseId: "graphql",
    number: 7,
    title: "Subscriptions",
    description: "Subscriptions push real-time updates from server to client over WebSockets.",
    concept: "Real-Time with Subscriptions",
    conceptExplanation:
      "GraphQL Subscriptions enable real-time data via WebSockets (or SSE).\n\nSchema:\ntype Subscription {\n  messageAdded(channelId: ID!): Message!\n  orderStatusChanged(orderId: ID!): Order!\n}\n\nClient subscription:\nsubscription OnMessageAdded($channelId: ID!) {\n  messageAdded(channelId: $channelId) {\n    id\n    text\n    author { name }\n  }\n}\n\nServer implementation (Apollo):\nSubscription: {\n  messageAdded: {\n    subscribe: (_, { channelId }, { pubsub }) =>\n      pubsub.asyncIterator(`MESSAGE_${channelId}`),\n  },\n}\n\n// Publish on mutation:\nawait pubsub.publish('MESSAGE_42', { messageAdded: newMsg });\n\nUse cases: chat, live scores, notifications, collaborative editing",
    codeExample: `// Apollo Client subscription
import { useSubscription } from '@apollo/client';

const MESSAGE_ADDED = gql\`
  subscription OnMessageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
      author { name avatarUrl }
      createdAt
    }
  }
\`;

function Chat({ channelId }) {
  const [messages, setMessages] = useState([]);

  useSubscription(MESSAGE_ADDED, {
    variables: { channelId },
    onData: ({ data }) => {
      setMessages(prev => [...prev, data.data.messageAdded]);
    },
  });

  return <MessageList messages={messages} />;
}`,
    starterCode: `// Subscription: server pushes updates to client
function subscribe(channel, events) {
  // Connect WebSocket
  hero.move("right");
  // Subscribe
  hero.move("right");
  // Receive events
  for (let i = 0; i < events; i++) {
    hero.move("down");
    hero.move("right");
  }
}

subscribe("chat:42", 2);`,
    solutionCode: `function subscribe(channel, events) {
  hero.move("right");
  hero.move("right");
  for (let i = 0; i < events; i++) {
    hero.move("down");
    hero.move("right");
  }
}

subscribe("chat:42", 2);`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Connect+subscribe: right×2 (gems), 2 events: down+right (gem), down+exit.",
    tip: "Use subscriptions sparingly — they maintain persistent connections. For one-time updates, a query with polling is simpler.",
  },

  {
    id: "graphql-8",
    courseId: "graphql",
    number: 8,
    title: "N+1 Problem & DataLoader",
    description: "The N+1 query problem kills performance. DataLoader batches and caches DB calls.",
    concept: "DataLoader Pattern",
    conceptExplanation:
      "The N+1 problem: fetching a list of N users and then making 1 DB query per user to get their posts = N+1 queries total.\n\nExample:\nQuery { users } → 1 query (get 100 users)\nUser.posts for user 1 → 1 query\nUser.posts for user 2 → 1 query\n... = 101 queries!\n\nDataLoader solves this:\n1. All User.posts calls in the same tick are batched\n2. ONE query: SELECT * FROM posts WHERE author_id IN (1, 2, ..., 100)\n3. Results are cached for the request lifecycle\n\nconst userPostsLoader = new DataLoader(async (userIds) => {\n  const posts = await db.posts.findAll({ authorId: { in: userIds } });\n  return userIds.map(id => posts.filter(p => p.authorId === id));\n});\n\nCreate one DataLoader per request (not global) to avoid cross-request data leaks.",
    codeExample: `import DataLoader from 'dataloader';

// Create per-request in context
function createLoaders(db) {
  return {
    userById: new DataLoader(async (ids) => {
      const users = await db.users.findByIds(ids);
      // MUST return array in same order as ids
      return ids.map(id => users.find(u => u.id === id));
    }),

    postsByUser: new DataLoader(async (userIds) => {
      const posts = await db.posts.findAll({
        where: { authorId: { in: userIds } },
      });
      return userIds.map(id => posts.filter(p => p.authorId === id));
    }),
  };
}

// In resolver:
User: {
  posts: (parent, _, { loaders }) =>
    loaders.postsByUser.load(parent.id), // batched!
},`,
    starterCode: `// DataLoader: batch N queries into 1
function withDataLoader(userIds) {
  const batched = new Set(userIds);
  // One batch query instead of N
  hero.move("right"); // batch all IDs
  hero.move("right"); // single DB query
  hero.move("down");
  // Map results back
  for (let i = 0; i < batched.size; i++) {
    hero.move("right");
  }
  hero.move("down");
}

withDataLoader([1, 2, 3, 4]);`,
    solutionCode: `function withDataLoader(userIds) {
  const batched = new Set(userIds);
  hero.move("right");
  hero.move("right");
  hero.move("down");
  for (let i = 0; i < batched.size; i++) {
    hero.move("right");
  }
  hero.move("down");
}

withDataLoader([1, 2, 3, 4]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×3 (gems), down, down to exit.",
    tip: "DataLoader is a must-have in any production GraphQL server. Without it, a single query can trigger hundreds of DB calls.",
  },

  {
    id: "graphql-9",
    courseId: "graphql",
    number: 9,
    title: "Authentication & Error Handling",
    description: "Secure GraphQL APIs with context-based auth and handle errors gracefully.",
    concept: "Auth & Errors in GraphQL",
    conceptExplanation:
      "Authentication in GraphQL uses the context object.\n\nServer setup:\nconst server = new ApolloServer({\n  resolvers,\n  context: ({ req }) => ({\n    db,\n    user: getUserFromToken(req.headers.authorization),\n  }),\n});\n\nIn resolvers, check context.user:\nif (!context.user) throw new AuthenticationError('Login required');\nif (!context.user.isAdmin) throw new ForbiddenError('Admins only');\n\nError types:\n• AuthenticationError (401) — not logged in\n• ForbiddenError (403) — no permission\n• UserInputError (400) — bad input\n• ApolloError — generic base error\n\nGraphQL error format:\n{\n  \"errors\": [{ \"message\": \"...\", \"extensions\": { \"code\": \"UNAUTHENTICATED\" } }]\n}\n\nShield library: declarative auth rules on schema fields",
    codeExample: `import { AuthenticationError, ForbiddenError } from 'apollo-server';

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return user;
    },
    adminDashboard: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Login required');
      if (user.role !== 'ADMIN') throw new ForbiddenError('Admins only');
      return getDashboardData();
    },
  },
  Mutation: {
    updatePost: async (_, { id, input }, { user, db }) => {
      if (!user) throw new AuthenticationError('Login required');
      const post = await db.posts.findById(id);
      if (post.authorId !== user.id) throw new ForbiddenError('Not your post');
      return db.posts.update(id, input);
    },
  },
};`,
    starterCode: `// Auth: check context.user in each resolver
function authResolver(resolvers) {
  for (const resolver of resolvers) {
    if (resolver.protected) {
      hero.move("down"); // check auth
      hero.move("right"); // authorized → proceed
    } else {
      hero.move("right"); // public → proceed
    }
  }
}

authResolver([
  { name: "publicQuery",  protected: false },
  { name: "me",           protected: true  },
  { name: "adminPanel",   protected: true  },
]);`,
    solutionCode: `function authResolver(resolvers) {
  for (const resolver of resolvers) {
    if (resolver.protected) {
      hero.move("down");
      hero.move("right");
    } else {
      hero.move("right");
    }
  }
}

authResolver([
  { name: "publicQuery",  protected: false },
  { name: "me",           protected: true  },
  { name: "adminPanel",   protected: true  },
]);`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","wall","wall"],
      ["wall","wall","empty","wall","wall"],
      ["wall","wall","gem","wall","wall"],
      ["wall","wall","empty","wall","wall"],
      ["wall","wall","gem","wall","wall"],
      ["wall","wall","exit","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "public: right (gem). protected×2: down+right (gem) each time, then exit.",
    tip: "Use graphql-shield for production auth — it keeps permission logic separate from business logic resolvers.",
  },

  {
    id: "graphql-10",
    courseId: "graphql",
    number: 10,
    title: "Grand Finale",
    description: "Build a complete GraphQL API with schema, resolvers, auth, and caching.",
    concept: "Production GraphQL",
    conceptExplanation:
      "A production GraphQL setup combines all concepts:\n\n1. Schema-first design with SDL\n2. Resolvers with DataLoader for batching\n3. Context with auth user and DB\n4. Persisted queries for security and performance\n5. Depth & complexity limits to prevent abuse\n6. Rate limiting\n7. Caching with Redis or CDN\n8. Error handling with custom error codes\n\nPopular stacks:\n• Apollo Server + Prisma + PostgreSQL\n• GraphQL Yoga + Drizzle + SQLite\n• Pothos (code-first) + tRPC comparison\n\nSchema stitching / Federation: combine multiple GraphQL services into one (used at Netflix, Shopify)\n\nTools: GraphQL Playground, Apollo Studio, Postman",
    codeExample: `// Complete Apollo Server setup
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(7),                       // max query depth
    createComplexityLimitRule(1000),     // max complexity score
  ],
  plugins: [
    ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
    ApolloServerPluginUsageReporting(),
  ],
});

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => ({
    db: prisma,
    user: await getUserFromToken(req.headers.authorization),
    loaders: createLoaders(prisma),
  }),
}));`,
    starterCode: `// Grand finale: full GraphQL app
const api = {
  schema:        () => hero.move("right"),
  resolvers:     () => hero.move("right"),
  dataLoader:    () => hero.move("down"),
  auth:          () => hero.move("right"),
  errorHandling: () => hero.move("right"),
  caching:       () => hero.move("down"),
  deploy:        () => hero.move("right"),
};

api.schema();
api.resolvers();
api.dataLoader();
api.auth();
api.errorHandling();
api.caching();
api.deploy();`,
    solutionCode: `const api = {
  schema:        () => hero.move("right"),
  resolvers:     () => hero.move("right"),
  dataLoader:    () => hero.move("down"),
  auth:          () => hero.move("right"),
  errorHandling: () => hero.move("right"),
  caching:       () => hero.move("down"),
  deploy:        () => hero.move("right"),
};

api.schema();
api.resolvers();
api.dataLoader();
api.auth();
api.errorHandling();
api.caching();
api.deploy();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "schema+resolvers: right×2 (gems), dataLoader: down, auth+error: right×2 (gems), caching: down, deploy: right (gem), down to exit.",
    tip: "GraphQL shines for complex, interconnected data with multiple clients. For simple CRUD, REST may be simpler.",
  },
];
