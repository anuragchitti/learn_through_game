import { LevelDefinition } from "../types";

export const nextjsLevels: LevelDefinition[] = [
  {
    id: "nextjs-1",
    courseId: "nextjs",
    number: 1,
    title: "App Router & File-based Routing",
    description: "Next.js uses the filesystem as the router — every file in /app becomes a route.",
    concept: "File-based Routing",
    conceptExplanation:
      "Next.js App Router uses the /app directory to define routes.\n\nFile conventions:\n• app/page.tsx → /\n• app/about/page.tsx → /about\n• app/blog/[slug]/page.tsx → /blog/:slug (dynamic)\n• app/layout.tsx → shared UI wrapper\n• app/loading.tsx → loading state\n• app/error.tsx → error boundary\n• app/not-found.tsx → 404 page\n\nEvery page.tsx exports a default React component. Params are passed as props to dynamic routes.",
    codeExample: `// app/page.tsx — home route /
export default function HomePage() {
  return <h1>Welcome!</h1>;
}

// app/blog/[slug]/page.tsx — /blog/:slug
type Props = { params: Promise<{ slug: string }> };

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}

// app/layout.tsx — wraps all pages
export default function RootLayout({ children }) {
  return (
    <html><body>{children}</body></html>
  );
}`,
    starterCode: `// File-based routing: each file = one route
const routes = [
  { file: "page.tsx",           path: "/" },
  { file: "about/page.tsx",     path: "/about" },
  { file: "blog/[slug]/page",   path: "/blog/:slug" },
  { file: "layout.tsx",         path: "wrapper" },
];

// Navigate each route
for (const route of routes) {
  hero.move("right");
}
hero.move("down");`,
    solutionCode: `const routes = [
  { file: "page.tsx",         path: "/" },
  { file: "about/page.tsx",   path: "/about" },
  { file: "blog/[slug]/page", path: "/blog/:slug" },
  { file: "layout.tsx",       path: "wrapper" },
];

for (const route of routes) {
  hero.move("right");
}
hero.move("down");`,
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
    hint: "right×4 (gems), down×2 to exit.",
    tip: "The layout.tsx wraps all child routes. Use it for nav, footer, and global providers.",
  },

  {
    id: "nextjs-2",
    courseId: "nextjs",
    number: 2,
    title: "Server & Client Components",
    description: "Next.js components are server-rendered by default. Use 'use client' for interactivity.",
    concept: "RSC vs Client Components",
    conceptExplanation:
      "React Server Components (RSC) render on the server:\n• Default in Next.js App Router\n• Can be async — await database calls directly\n• Access server-only resources (DB, env vars)\n• No hooks, no browser APIs\n• Zero JS sent to client\n\nClient Components ('use client'):\n• Rendered on client after hydration\n• Can use useState, useEffect, onClick, etc.\n• Access browser APIs (localStorage, window)\n• Shipped as JavaScript bundle\n\nRule: push 'use client' as far down the tree as possible — keep the top async server components for data fetching.",
    codeExample: `// Server Component — no 'use client'
// Can fetch data directly!
async function UserProfile({ id }) {
  const user = await db.users.findById(id); // runs on server
  return <div>{user.name}</div>;
}

// Client Component — needs interactivity
'use client';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicks: {count}
    </button>
  );
}`,
    starterCode: `// Server first, client only when needed
const components = [
  { type: "server", name: "Layout",  dir: "right" },
  { type: "server", name: "Page",    dir: "right" },
  { type: "server", name: "UserCard",dir: "down" },
  { type: "client", name: "Button",  dir: "right" },
  { type: "client", name: "Form",    dir: "right" },
];

for (const c of components) {
  hero.move(c.dir);
}
hero.move("right");`,
    solutionCode: `const components = [
  { type: "server", name: "Layout",   dir: "right" },
  { type: "server", name: "Page",     dir: "right" },
  { type: "server", name: "UserCard", dir: "down" },
  { type: "client", name: "Button",   dir: "right" },
  { type: "client", name: "Form",     dir: "right" },
];

for (const c of components) {
  hero.move(c.dir);
}
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×3 (gems), down to exit.",
    tip: "A Server Component can import Client Components, but not vice versa (without passing as children).",
  },

  {
    id: "nextjs-3",
    courseId: "nextjs",
    number: 3,
    title: "Data Fetching",
    description: "Next.js Server Components can fetch data directly — no useEffect needed.",
    concept: "Server-side Data Fetching",
    conceptExplanation:
      "In the App Router, async Server Components can fetch data directly:\n\nasync function Page() {\n  const data = await fetch('https://api.example.com/data');\n  const json = await data.json();\n  return <div>{json.title}</div>;\n}\n\nNext.js extends native fetch with caching:\n• fetch(url) — cached by default (static)\n• fetch(url, { cache: 'no-store' }) — always fresh (dynamic)\n• fetch(url, { next: { revalidate: 60 } }) — revalidate every 60s (ISR)\n\nFor databases: import your DB client directly in the Server Component.\nFor waterfall prevention: use Promise.all to fetch in parallel.",
    codeExample: `// Parallel data fetching — no waterfall
async function ProductPage({ params }) {
  const { id } = await params;

  // Parallel fetches (not sequential)
  const [product, reviews] = await Promise.all([
    fetch(\`/api/products/\${id}\`).then(r => r.json()),
    fetch(\`/api/products/\${id}/reviews\`).then(r => r.json()),
  ]);

  return (
    <>
      <h1>{product.name}</h1>
      <ReviewList reviews={reviews} />
    </>
  );
}`,
    starterCode: `// Data fetching: parallel > sequential
async function fetchPage() {
  // Sequential (waterfall) — slow
  const sequential = async () => {
    hero.move("right"); // fetch user
    hero.move("right"); // wait
    hero.move("right"); // fetch posts
    hero.move("right"); // wait
  };

  // Parallel with Promise.all — fast
  const parallel = async () => {
    hero.move("down"); // both fetches start together
    hero.move("right"); // render combined result
  };

  await sequential();
  await parallel();
}

fetchPage();`,
    solutionCode: `async function fetchPage() {
  const sequential = async () => {
    hero.move("right");
    hero.move("right");
    hero.move("right");
    hero.move("right");
  };

  const parallel = async () => {
    hero.move("down");
    hero.move("right");
  };

  await sequential();
  await parallel();
}

fetchPage();`,
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
    hint: "right×4 (gems), down, right (gem), down to exit.",
    tip: "Use Promise.all for independent parallel fetches. Use sequential await only when one fetch depends on another.",
  },

  {
    id: "nextjs-4",
    courseId: "nextjs",
    number: 4,
    title: "API Routes",
    description: "Next.js API routes let you build a backend API inside your Next.js app.",
    concept: "Route Handlers",
    conceptExplanation:
      "Next.js Route Handlers (app/api/route.ts) create API endpoints.\n\napp/api/users/route.ts:\nexport async function GET(request) {\n  const users = await db.findAll();\n  return Response.json(users);\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  const user = await db.create(body);\n  return Response.json(user, { status: 201 });\n}\n\nDynamic routes:\napp/api/users/[id]/route.ts\nexport async function GET(req, { params }) {\n  const { id } = await params;\n  const user = await db.findById(id);\n  return Response.json(user);\n}",
    codeExample: `// app/api/products/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('q');
  const products = await db.products.findMany({
    where: search ? { name: { contains: search } } : {},
  });
  return Response.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await db.products.create({ data: body });
  return Response.json(product, { status: 201 });
}`,
    starterCode: `// API routes: one file handles multiple HTTP methods
const handlers = [
  { method: "GET",    path: "/api/users",     dir: "right" },
  { method: "POST",   path: "/api/users",     dir: "right" },
  { method: "GET",    path: "/api/users/:id", dir: "down" },
  { method: "PATCH",  path: "/api/users/:id", dir: "right" },
  { method: "DELETE", path: "/api/users/:id", dir: "right" },
];

for (const h of handlers) {
  hero.move(h.dir);
}
hero.move("down");`,
    solutionCode: `const handlers = [
  { method: "GET",    path: "/api/users",     dir: "right" },
  { method: "POST",   path: "/api/users",     dir: "right" },
  { method: "GET",    path: "/api/users/:id", dir: "down" },
  { method: "PATCH",  path: "/api/users/:id", dir: "right" },
  { method: "DELETE", path: "/api/users/:id", dir: "right" },
];

for (const h of handlers) {
  hero.move(h.dir);
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
    tip: "Don't call your own API routes from Server Components — import the function directly instead.",
  },

  {
    id: "nextjs-5",
    courseId: "nextjs",
    number: 5,
    title: "Server Actions",
    description: "Server Actions let you mutate data from forms without writing API routes.",
    concept: "Server Actions",
    conceptExplanation:
      "Server Actions are async functions that run on the server, called from client components or forms.\n\n'use server';\nasync function createUser(formData: FormData) {\n  const name = formData.get('name');\n  await db.users.create({ data: { name } });\n  revalidatePath('/users');\n}\n\nIn a form:\n<form action={createUser}>\n  <input name='name' />\n  <button type='submit'>Create</button>\n</form>\n\nBenefits:\n• No API route needed\n• Progressive enhancement (works without JS)\n• Automatic revalidation with revalidatePath\n• Type-safe with TypeScript",
    codeExample: `// actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;
  await db.todos.create({ data: { text } });
  revalidatePath('/todos');
}

// page.tsx (Server Component)
import { addTodo } from './actions';

export default function TodoPage() {
  return (
    <form action={addTodo}>
      <input name="text" placeholder="New todo" />
      <button type="submit">Add</button>
    </form>
  );
}`,
    starterCode: `// Server Actions: form → server function → revalidate
const actionFlow = [
  { step: "user fills form",    dir: "right" },
  { step: "submit triggers SA", dir: "right" },
  { step: "server runs action", dir: "right" },
  { step: "DB write",           dir: "down" },
  { step: "revalidatePath",     dir: "right" },
  { step: "page re-renders",    dir: "right" },
];

for (const step of actionFlow) {
  hero.move(step.dir);
}
hero.move("down");`,
    solutionCode: `const actionFlow = [
  { step: "user fills form",    dir: "right" },
  { step: "submit triggers SA", dir: "right" },
  { step: "server runs action", dir: "right" },
  { step: "DB write",           dir: "down" },
  { step: "revalidatePath",     dir: "right" },
  { step: "page re-renders",    dir: "right" },
];

for (const step of actionFlow) {
  hero.move(step.dir);
}
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
    hint: "right×3 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Prefer Server Actions over API routes for form mutations — they're simpler and type-safe end-to-end.",
  },

  {
    id: "nextjs-6",
    courseId: "nextjs",
    number: 6,
    title: "Static & Dynamic Rendering",
    description: "Next.js decides at build time whether each page is static or dynamic.",
    concept: "Rendering Strategies",
    conceptExplanation:
      "Next.js rendering modes:\n\n• Static (SSG): rendered at build time, served from CDN\n  When: no dynamic data, or data revalidated periodically\n  How: default for pages with no dynamic segments\n\n• Dynamic (SSR): rendered on each request\n  When: data changes per request (user-specific, real-time)\n  How: use { cache: 'no-store' } or cookies()/headers()\n\n• ISR (Incremental Static Regeneration): static but revalidated\n  How: next: { revalidate: 60 } in fetch options\n\n• Partial Pre-rendering (PPR): static shell + dynamic holes\n  How: experimental feature, Suspense boundaries",
    codeExample: `// Static — rendered at build time
export default async function StaticPage() {
  const posts = await fetch('/api/posts', {
    next: { revalidate: 3600 }, // ISR: refresh hourly
  }).then(r => r.json());
  return <PostList posts={posts} />;
}

// Dynamic — rendered per request
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = await getUserFromSession(cookieStore);
  return <Dashboard user={user} />;
}`,
    starterCode: `// Rendering: choose the right strategy for each page
const pages = [
  { page: "/",          strategy: "static",  dir: "right" },
  { page: "/blog",      strategy: "ISR",     dir: "right" },
  { page: "/dashboard", strategy: "dynamic", dir: "down" },
  { page: "/profile",   strategy: "dynamic", dir: "right" },
];

for (const p of pages) {
  hero.move(p.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const pages = [
  { page: "/",          strategy: "static",  dir: "right" },
  { page: "/blog",      strategy: "ISR",     dir: "right" },
  { page: "/dashboard", strategy: "dynamic", dir: "down" },
  { page: "/profile",   strategy: "dynamic", dir: "right" },
];

for (const p of pages) {
  hero.move(p.dir);
}
hero.move("right");
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
    hint: "right×2 (gems), down, right×2 (gems), right (no gem), down, down to exit.",
    tip: "Static > ISR > Dynamic in terms of performance. Be as static as possible, use dynamic only when needed.",
  },

  {
    id: "nextjs-7",
    courseId: "nextjs",
    number: 7,
    title: "Middleware",
    description: "Next.js middleware runs before every request, perfect for auth and redirects.",
    concept: "Next.js Middleware",
    conceptExplanation:
      "Middleware (middleware.ts at root) runs on every request before the page renders.\n\nexport function middleware(request: NextRequest) {\n  // Check auth, redirect, rewrite, etc.\n  if (!isAuthenticated(request)) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: ['/dashboard/:path*', '/settings/:path*'],\n};\n\nUse cases:\n• Auth guards (redirect to login)\n• Locale detection\n• A/B testing\n• Rate limiting\n• Rewriting URLs",
    codeExample: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};`,
    starterCode: `// Middleware: check before every request
function middleware(request) {
  const checks = [
    { check: "parse token",    pass: true,  dir: "right" },
    { check: "verify token",   pass: true,  dir: "right" },
    { check: "check role",     pass: true,  dir: "right" },
    { check: "rate limit",     pass: true,  dir: "down" },
    { check: "proceed",        pass: true,  dir: "right" },
  ];

  for (const c of checks) {
    if (!c.pass) return; // redirect
    hero.move(c.dir);
  }
  hero.move("right");
}

middleware({});`,
    solutionCode: `function middleware(request) {
  const checks = [
    { check: "parse token",  pass: true, dir: "right" },
    { check: "verify token", pass: true, dir: "right" },
    { check: "check role",   pass: true, dir: "right" },
    { check: "rate limit",   pass: true, dir: "down" },
    { check: "proceed",      pass: true, dir: "right" },
  ];

  for (const c of checks) {
    if (!c.pass) return;
    hero.move(c.dir);
  }
  hero.move("right");
}

middleware({});`,
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
    tip: "Middleware runs on the Edge — it has no access to Node.js APIs. Keep it lightweight.",
  },

  {
    id: "nextjs-8",
    courseId: "nextjs",
    number: 8,
    title: "Metadata & SEO",
    description: "Next.js has built-in metadata APIs for managing <head> tags and social previews.",
    concept: "Metadata API",
    conceptExplanation:
      "Next.js provides a Metadata API for SEO and social sharing.\n\nStatic metadata:\nexport const metadata = {\n  title: 'My App',\n  description: 'Best app ever',\n  openGraph: {\n    images: ['/og.png'],\n  },\n};\n\nDynamic metadata:\nexport async function generateMetadata({ params }) {\n  const product = await fetchProduct(params.id);\n  return {\n    title: product.name,\n    description: product.description,\n  };\n}\n\nTemplate titles:\ntitle: { template: '%s | My App', default: 'My App' }",
    codeExample: `// Static metadata
export const metadata = {
  title: 'LearnThroughGame',
  description: 'Learn coding by playing a game',
  openGraph: {
    title: 'LearnThroughGame',
    description: 'Write code, control a hero, conquer dungeons',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Dynamic per-page metadata
export async function generateMetadata({ params }) {
  const course = await getCourse(params.slug);
  return {
    title: course.title,
    description: course.description,
  };
}`,
    starterCode: `// Metadata: build the page's <head> section
const metadataTags = [
  { tag: "title",       dir: "right" },
  { tag: "description", dir: "right" },
  { tag: "og:title",    dir: "right" },
  { tag: "og:image",    dir: "down" },
  { tag: "robots",      dir: "right" },
];

for (const tag of metadataTags) {
  hero.move(tag.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const metadataTags = [
  { tag: "title",       dir: "right" },
  { tag: "description", dir: "right" },
  { tag: "og:title",    dir: "right" },
  { tag: "og:image",    dir: "down" },
  { tag: "robots",      dir: "right" },
];

for (const tag of metadataTags) {
  hero.move(tag.dir);
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
    hint: "right×3 (gems), down, right×2 (gems), right (no gem), down, down to exit.",
    tip: "generateMetadata is async — you can fetch data to build dynamic titles and descriptions.",
  },

  {
    id: "nextjs-9",
    courseId: "nextjs",
    number: 9,
    title: "Authentication with NextAuth",
    description: "NextAuth.js (Auth.js) adds authentication to Next.js apps in minutes.",
    concept: "Next-Auth / Auth.js",
    conceptExplanation:
      "Auth.js (formerly NextAuth) handles authentication for Next.js.\n\nSetup:\nnpm install next-auth@beta\n\nauth.ts:\nimport NextAuth from 'next-auth';\nimport GitHub from 'next-auth/providers/github';\n\nexport const { handlers, auth, signIn, signOut } = NextAuth({\n  providers: [GitHub],\n});\n\nIn layout: wrap with SessionProvider\nIn API routes: export { handlers as GET, POST } from auth.ts\n\nProtect routes:\nconst session = await auth();\nif (!session) redirect('/login');\n\nClient-side: useSession() hook",
    codeExample: `// auth.ts
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

// Protected page
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await auth();
  if (!session) redirect('/login');
  return <div>Hello {session.user?.name}</div>;
}`,
    starterCode: `// Auth flow: configure → sign in → session → protect
const authFlow = [
  { step: "configure providers", dir: "right" },
  { step: "user signs in",       dir: "right" },
  { step: "callback runs",       dir: "right" },
  { step: "session created",     dir: "down" },
  { step: "check session",       dir: "right" },
  { step: "render protected",    dir: "right" },
];

for (const step of authFlow) {
  hero.move(step.dir);
}
hero.move("down");`,
    solutionCode: `const authFlow = [
  { step: "configure providers", dir: "right" },
  { step: "user signs in",       dir: "right" },
  { step: "callback runs",       dir: "right" },
  { step: "session created",     dir: "down" },
  { step: "check session",       dir: "right" },
  { step: "render protected",    dir: "right" },
];

for (const step of authFlow) {
  hero.move(step.dir);
}
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
    tip: "Store user IDs in JWT tokens for stateless auth, or use a database adapter for persistent sessions.",
  },

  {
    id: "nextjs-10",
    courseId: "nextjs",
    number: 10,
    title: "Grand Finale",
    description: "Build a complete Next.js full-stack application with all the pieces.",
    concept: "Full-Stack Next.js",
    conceptExplanation:
      "A production Next.js app combines everything:\n\n1. File-based routing (app/)\n2. Server Components for data fetching\n3. Client Components for interactivity\n4. Route Handlers for API endpoints\n5. Server Actions for mutations\n6. Middleware for auth guards\n7. Metadata for SEO\n8. ISR for performance\n\nTypical stack:\n• Next.js + TypeScript\n• Prisma + PostgreSQL\n• Auth.js for authentication\n• Tailwind CSS for styling\n• Vercel for deployment\n\nDeploy: git push → Vercel auto-deploys from GitHub",
    codeExample: `// The complete Next.js architecture
//
// app/
//   layout.tsx       ← root layout (providers, nav)
//   page.tsx         ← home (static, ISR)
//   (auth)/
//     login/page.tsx ← login form (client component)
//   dashboard/
//     page.tsx       ← protected (server, dynamic)
//   api/
//     webhooks/route.ts ← API route handler
//   actions.ts       ← server actions
// middleware.ts      ← auth guards
// auth.ts            ← NextAuth config`,
    starterCode: `// Grand finale: full Next.js app lifecycle
const appLayers = [
  { layer: "middleware",       dir: "right" },
  { layer: "layout",           dir: "right" },
  { layer: "page (server)",    dir: "right" },
  { layer: "data fetch",       dir: "down" },
  { layer: "client component", dir: "right" },
  { layer: "server action",    dir: "right" },
  { layer: "revalidate",       dir: "down" },
  { layer: "re-render",        dir: "right" },
];

for (const l of appLayers) {
  hero.move(l.dir);
}`,
    solutionCode: `const appLayers = [
  { layer: "middleware",       dir: "right" },
  { layer: "layout",           dir: "right" },
  { layer: "page (server)",    dir: "right" },
  { layer: "data fetch",       dir: "down" },
  { layer: "client component", dir: "right" },
  { layer: "server action",    dir: "right" },
  { layer: "revalidate",       dir: "down" },
  { layer: "re-render",        dir: "right" },
];

for (const l of appLayers) {
  hero.move(l.dir);
}`,
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
    hint: "right×3 (gems), down, right×2 (gems), right (no gem), down, right (gem), down to exit.",
    tip: "You're ready to build production Next.js apps. Start with the official create-next-app template.",
  },
];
