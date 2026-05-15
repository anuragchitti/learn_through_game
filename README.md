# LearnThroughGame 🎮

> Master any technical course by playing — not watching.

LearnThroughGame is an interactive, gamified learning platform where users progress through **Beginner → Intermediate → Advanced → Pro** levels by reading concept cards and solving hands-on code challenges. Completing all four levels of a course earns a verifiable digital certificate.

---

## Features

- **Personalised onboarding** — choose your course, goal, and existing knowledge level; the platform starts you in exactly the right place
- **Concept-first learning** — every module opens with plain-English explanations and real code examples before any challenge
- **6 challenge types** — fill-the-blank, fix-the-bug, predict-output, arrange-steps, build-it, spot-the-difference
- **Gamification** — XP points, lives, streaks, level gates
- **25 courses** across Web & Frontend, Backend, Databases, DevOps & Cloud, AI & Data, and Computer Science
- **Digital certificates** with unique verifiable IDs
- **Mobile-first** — works on phone, tablet, and desktop
- **Accessible** — plain English, WCAG AA contrast

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Auth | NextAuth.js (OAuth + credentials) |
| Database | Supabase (PostgreSQL) |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/anuragchitti/learn_through_game.git
cd learn_through_game
npm install
```

### Environment variables

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Supabase (optional — local storage used as fallback)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# OAuth providers (optional)
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── onboarding/         # 3-step onboarding flow
│   ├── courses/            # Course catalog + detail pages
│   ├── play/[slug]/[level] # Game screen (concepts + challenges)
│   ├── dashboard/          # User progress & certificates
│   ├── auth/               # Sign in / Sign up
│   └── certificate/[id]/   # Public certificate page
├── components/
│   ├── ui/                 # Button, Badge, ProgressBar
│   ├── layout/             # Navbar
│   └── game/               # ConceptCard, ChallengePanel, GameHeader
├── data/
│   ├── courses.ts          # All 25 course definitions
│   └── modules.ts          # Module content (concept cards + challenges)
├── lib/
│   ├── utils.ts            # Helpers: cn, XP formatting, level logic
│   └── progress.ts         # localStorage-based progress tracking
├── types/
│   └── index.ts            # Shared TypeScript types
└── tests/
    ├── utils.test.ts
    ├── courses.test.ts
    ├── progress.test.ts
    └── modules.test.ts
```

---

## Running Tests

```bash
npm test               # run all tests once
npm run test:watch     # watch mode
npm run test:coverage  # with coverage report
```

44 unit tests across utils, course data, progress logic, and module content — all passing.

---

## Deployment (Vercel)

```bash
npm run build   # verify build locally
```

Connect the repo to [vercel.com](https://vercel.com) and deploy. Set environment variables in the Vercel dashboard.

---

## Course List

25 courses across 6 categories:

**Web & Frontend** — HTML & CSS, JavaScript, React.js, TypeScript, Next.js  
**Backend** — Node.js & Express, Python, Django/FastAPI, REST API Design, GraphQL  
**Databases** — SQL, MongoDB, Redis  
**DevOps & Cloud** — Git & GitHub, Docker, Kubernetes, CI/CD, AWS, Linux  
**AI & Data** — Python for Data Science, Machine Learning, Prompt Engineering  
**Computer Science** — Data Structures & Algorithms, System Design, Networking  

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit with clear messages following [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a pull request against `main`

---

## License

MIT
