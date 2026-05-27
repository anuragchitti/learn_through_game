import { LevelDefinition } from "../types";

export const cicdLevels: LevelDefinition[] = [
  {
    id: "cicd-1",
    courseId: "cicd",
    number: 1,
    title: "What is CI/CD?",
    description: "CI/CD automates testing and deployment so you can ship code safely and frequently.",
    concept: "CI/CD Overview",
    conceptExplanation:
      "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment.\n\nContinuous Integration (CI):\n• Developers merge code frequently (many times per day)\n• Every merge triggers automated tests\n• Broken builds are caught immediately\n• Reduces integration conflicts\n\nContinuous Delivery (CD):\n• Code is always in a deployable state\n• Deployment to production is manual (one click)\n\nContinuous Deployment:\n• Every passing build auto-deploys to production\n• Requires excellent test coverage\n\nWhy CI/CD?\n• Catch bugs early (cheaper to fix)\n• Ship features faster\n• Reduce deployment risk\n• Enable small, frequent releases\n\nPopular tools: GitHub Actions, GitLab CI, CircleCI, Jenkins, Bitbucket Pipelines",
    codeExample: `# Simple CI/CD flow
1. Developer pushes code to GitHub
   ↓
2. CI pipeline triggers automatically
   ↓
3. Install dependencies (npm ci)
   ↓
4. Run linter (npm run lint)
   ↓
5. Run tests (npm test)
   ↓
6. Build artifact (npm run build)
   ↓
7. Deploy to staging (auto)
   ↓
8. Run integration tests
   ↓
9. Deploy to production (manual approval)`,
    starterCode: `// CI/CD: automate test and deploy
const pipeline = [
  { step: "push code",       dir: "right" },
  { step: "trigger CI",      dir: "right" },
  { step: "run tests",       dir: "right" },
  { step: "build artifact",  dir: "down" },
  { step: "deploy staging",  dir: "right" },
  { step: "deploy prod",     dir: "right" },
];

for (const s of pipeline) {
  hero.move(s.dir);
}
hero.move("down");`,
    solutionCode: `const pipeline = [
  { step: "push code",      dir: "right" },
  { step: "trigger CI",     dir: "right" },
  { step: "run tests",      dir: "right" },
  { step: "build artifact", dir: "down" },
  { step: "deploy staging", dir: "right" },
  { step: "deploy prod",    dir: "right" },
];

for (const s of pipeline) {
  hero.move(s.dir);
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
    tip: "The goal of CI/CD is confidence: deploy at any time without fear. Start with CI before worrying about CD.",
  },

  {
    id: "cicd-2",
    courseId: "cicd",
    number: 2,
    title: "GitHub Actions",
    description: "GitHub Actions automates workflows directly in your repository with YAML configuration.",
    concept: "GitHub Actions Basics",
    conceptExplanation:
      "GitHub Actions is GitHub's built-in CI/CD platform.\n\nKey concepts:\n• Workflow — automated process (.github/workflows/ci.yml)\n• Event — what triggers the workflow (push, pull_request, schedule, etc.)\n• Job — a set of steps that run on the same runner\n• Step — individual command or action\n• Action — reusable workflow component\n• Runner — machine that runs the workflow (ubuntu-latest, windows, macos)\n\nWorkflow syntax:\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n      - run: npm ci\n      - run: npm test",
    codeExample: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm test -- --coverage
        env:
          DATABASE_URL: \${{ secrets.TEST_DATABASE_URL }}

      - name: Upload coverage
        uses: codecov/codecov-action@v3`,
    starterCode: `// GitHub Actions: define workflow steps
const workflow = {
  trigger: ["push", "pull_request"],
  jobs: [
    { name: "checkout", dir: "right" },
    { name: "setup-node", dir: "right" },
    { name: "npm-ci", dir: "right" },
    { name: "lint", dir: "down" },
    { name: "test", dir: "right" },
  ],
};

for (const job of workflow.jobs) {
  hero.move(job.dir);
}
hero.move("right");`,
    solutionCode: `const workflow = {
  trigger: ["push", "pull_request"],
  jobs: [
    { name: "checkout",   dir: "right" },
    { name: "setup-node", dir: "right" },
    { name: "npm-ci",     dir: "right" },
    { name: "lint",       dir: "down" },
    { name: "test",       dir: "right" },
  ],
};

for (const job of workflow.jobs) {
  hero.move(job.dir);
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
    tip: "Use actions/cache to cache node_modules between runs — saves 1-2 minutes on every CI run.",
  },

  {
    id: "cicd-3",
    courseId: "cicd",
    number: 3,
    title: "Automated Testing in CI",
    description: "Run unit, integration, and e2e tests automatically on every commit.",
    concept: "Testing in Pipelines",
    conceptExplanation:
      "A solid test strategy in CI includes multiple test layers:\n\n1. Unit tests (fast, isolated):\n   • Jest, Vitest, Mocha\n   • Test individual functions/components\n   • Should run in < 1 minute\n\n2. Integration tests:\n   • Test multiple units working together\n   • May need DB, Redis (use Docker)\n   • Run in < 5 minutes\n\n3. E2E tests (slow, realistic):\n   • Playwright, Cypress\n   • Test full user flows in a browser\n   • Run on PRs to main, not every commit\n\nCI best practices:\n• Run tests in parallel (matrix jobs)\n• Cache dependencies between runs\n• Fail fast — stop on first failure\n• Test in same environment as production\n• Generate and upload coverage reports",
    codeExample: `# ci.yml — matrix testing + services
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [18, 20, 22]  # test multiple versions

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        ports: ['5432:5432']
      redis:
        image: redis:7
        ports: ['6379:6379']

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: \${{ matrix.node }}, cache: npm }
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test
          REDIS_URL: redis://localhost:6379`,
    starterCode: `// Tests in CI: unit → integration → e2e
function runTestSuite(suites) {
  for (const suite of suites) {
    if (suite.pass) {
      hero.move(suite.dir);
    }
    // fail: pipeline stops
  }
}

runTestSuite([
  { name: "unit tests",        pass: true, dir: "right" },
  { name: "integration tests", pass: true, dir: "right" },
  { name: "type check",        pass: true, dir: "down" },
  { name: "e2e tests",         pass: true, dir: "right" },
]);
hero.move("right");`,
    solutionCode: `function runTestSuite(suites) {
  for (const suite of suites) {
    if (suite.pass) {
      hero.move(suite.dir);
    }
  }
}

runTestSuite([
  { name: "unit tests",        pass: true, dir: "right" },
  { name: "integration tests", pass: true, dir: "right" },
  { name: "type check",        pass: true, dir: "down" },
  { name: "e2e tests",         pass: true, dir: "right" },
]);
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
    hint: "right×2 (gems), down, right×2 (gems+exit).",
    tip: "Run unit tests on every push, E2E tests only on PRs to main — E2E is slow and should guard the critical path.",
  },

  {
    id: "cicd-4",
    courseId: "cicd",
    number: 4,
    title: "Docker in CI/CD",
    description: "Build Docker images in CI, push to a registry, and deploy the image to production.",
    concept: "Container-based Pipelines",
    conceptExplanation:
      "Using Docker in CI/CD ensures consistent environments from dev to prod.\n\nTypical flow:\n1. Build Docker image in CI\n2. Tag with git SHA or version\n3. Push to container registry (ECR, GHCR, Docker Hub)\n4. Deploy the exact same image to production\n\nBenefits:\n• Reproducible builds\n• Same image runs everywhere\n• Easy rollbacks (pull previous tag)\n• Dependency isolation\n\nRegistry options:\n• GHCR — GitHub Container Registry (free for public)\n• ECR — AWS Elastic Container Registry\n• Docker Hub — public images free\n• GCR — Google Container Registry\n\nTagging strategy:\n• main branch: latest + sha\n• Tags: v1.2.3\n• PRs: pr-42",
    codeExample: `# .github/workflows/docker.yml
name: Build & Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: |
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
    starterCode: `// Docker CI: build → tag → push → deploy
const dockerPipeline = [
  { step: "docker build",     dir: "right" },
  { step: "tag with SHA",     dir: "right" },
  { step: "push to registry", dir: "right" },
  { step: "deploy image",     dir: "down" },
  { step: "health check",     dir: "right" },
  { step: "rollback on fail", dir: "right" },
];

for (const s of dockerPipeline) {
  hero.move(s.dir);
}
hero.move("down");`,
    solutionCode: `const dockerPipeline = [
  { step: "docker build",     dir: "right" },
  { step: "tag with SHA",     dir: "right" },
  { step: "push to registry", dir: "right" },
  { step: "deploy image",     dir: "down" },
  { step: "health check",     dir: "right" },
  { step: "rollback on fail", dir: "right" },
];

for (const s of dockerPipeline) {
  hero.move(s.dir);
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
    tip: "Use docker/build-push-action with GitHub Actions cache (cache-from: type=gha) to make Docker builds 5-10x faster.",
  },

  {
    id: "cicd-5",
    courseId: "cicd",
    number: 5,
    title: "Secrets & Environment Variables",
    description: "Store credentials securely in CI — never hard-code secrets in your pipeline.",
    concept: "Secrets Management in CI",
    conceptExplanation:
      "Secrets in CI/CD need special handling — never put them in code or logs.\n\nGitHub Actions secrets:\n• Repository secrets — for a single repo\n• Organization secrets — shared across repos\n• Environment secrets — tied to deployment environments\n\nUsing secrets:\nenv:\n  DATABASE_URL: \${{ secrets.DATABASE_URL }}\n  API_KEY: \${{ secrets.API_KEY }}\n\nBest practices:\n• Never echo secrets in steps (they'll appear in logs)\n• Use environment-specific secrets (prod vs staging)\n• Rotate secrets regularly\n• Minimum permissions — only the secrets each job needs\n• Use OIDC for AWS/GCP instead of long-lived keys\n\nOIDC (OpenID Connect):\n• GitHub Actions can assume AWS IAM roles directly\n• No long-lived AWS access keys needed\n• More secure than storing AWS_SECRET_ACCESS_KEY",
    codeExample: `# Using secrets safely
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production  # environment-specific secrets

    permissions:
      id-token: write  # needed for OIDC
      contents: read

    steps:
      - uses: actions/checkout@v4

      # OIDC: no AWS keys needed!
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123:role/github-actions
          aws-region: us-east-1

      - name: Deploy (secret available as env var)
        run: |
          echo "Deploying to \${{ vars.ENVIRONMENT }}"
          # DO NOT: echo "\${{ secrets.API_KEY }}" -- leaks to logs!
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}`,
    starterCode: `// Secrets: inject securely into CI steps
function deployWithSecrets(envVars, steps) {
  // Inject secrets as env vars
  for (const v of envVars) {
    hero.move("right"); // each secret loaded
  }
  hero.move("down");
  // Run deploy steps
  for (const step of steps) {
    hero.move(step.dir);
  }
}

deployWithSecrets(
  ["DATABASE_URL", "API_KEY", "AWS_ROLE"],
  [{ dir: "right" }, { dir: "right" }, { dir: "down" }]
);`,
    solutionCode: `function deployWithSecrets(envVars, steps) {
  for (const v of envVars) {
    hero.move("right");
  }
  hero.move("down");
  for (const step of steps) {
    hero.move(step.dir);
  }
}

deployWithSecrets(
  ["DATABASE_URL", "API_KEY", "AWS_ROLE"],
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
    hint: "3 secrets → right×3 (gems), down, 2 steps → right×2 (gems), down, down to exit.",
    tip: "Use OIDC federation instead of long-lived AWS access keys — GitHub Actions can assume IAM roles directly.",
  },

  {
    id: "cicd-6",
    courseId: "cicd",
    number: 6,
    title: "Deployment Strategies",
    description: "Rolling, blue/green, and canary deployments reduce risk when shipping to production.",
    concept: "Deployment Strategies",
    conceptExplanation:
      "Different strategies trade speed for safety:\n\n1. Recreate:\n   • Shut down all old, start all new\n   • Simple but causes downtime\n\n2. Rolling update:\n   • Replace instances gradually (e.g., 1 at a time)\n   • Zero downtime, but old+new run simultaneously\n   • Default in Kubernetes\n\n3. Blue/Green:\n   • Run two identical environments (blue=old, green=new)\n   • Switch DNS/LB instantly\n   • Instant rollback (switch back)\n   • Expensive (double infrastructure)\n\n4. Canary:\n   • Route 5-10% of traffic to new version\n   • Monitor for errors\n   • Gradually increase percentage\n   • Used by Facebook, Google for every deploy\n\n5. Feature flags:\n   • Deploy code but enable features for % of users\n   • Decouple deploy from release",
    codeExample: `# GitHub Actions: canary deployment
jobs:
  deploy-canary:
    runs-on: ubuntu-latest
    steps:
      # Deploy new version to 10% of traffic
      - name: Deploy canary
        run: |
          kubectl apply -f canary-deployment.yaml
          # Route 10% traffic to canary
          kubectl patch service my-app \\
            -p '{"spec":{"selector":{"version":"canary"}}}'

      # Monitor for 10 minutes
      - name: Monitor canary
        run: |
          sleep 600
          ERROR_RATE=$(./scripts/get-error-rate.sh canary)
          if [ "$ERROR_RATE" -gt "1" ]; then
            echo "Canary error rate too high: $ERROR_RATE%"
            kubectl rollout undo deployment/canary
            exit 1
          fi

      # Promote to 100%
      - name: Promote canary
        if: success()
        run: kubectl set image deployment/my-app app=my-app:\${{ github.sha }}`,
    starterCode: `// Deployment strategies: reduce risk
function canaryDeploy(totalPct, step) {
  let pct = 0;
  while (pct < totalPct) {
    pct += step;
    hero.move("right"); // route more traffic
    // monitor for errors here
  }
  hero.move("down");
  hero.move("right"); // promote to 100%
  hero.move("right");
}

canaryDeploy(50, 10); // 0→10→20→30→40→50%`,
    solutionCode: `function canaryDeploy(totalPct, step) {
  let pct = 0;
  while (pct < totalPct) {
    pct += step;
    hero.move("right");
  }
  hero.move("down");
  hero.move("right");
  hero.move("right");
}

canaryDeploy(50, 10);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "5 steps (10%×5=50%) → right×5 (gems), down, promote → right (gem), right (gem+exit)... wait, check grid.",
    tip: "Canary deployments require good observability — instrument your app with metrics so you can detect regressions automatically.",
  },

  {
    id: "cicd-7",
    courseId: "cicd",
    number: 7,
    title: "Database Migrations in CI/CD",
    description: "Run database migrations safely as part of your deployment pipeline.",
    concept: "Safe DB Migrations",
    conceptExplanation:
      "Database migrations are the trickiest part of CI/CD.\n\nKey rules:\n1. Migrations must be backward compatible\n   - Old code must still work with new schema\n   - Add columns as nullable, not NOT NULL\n   - Never rename/drop columns in one step\n\n2. Migration steps (expand-contract):\n   Deploy 1: ADD new_column (nullable)\n   Deploy 2: Backfill data, app uses new column\n   Deploy 3: DROP old_column\n\n3. Test migrations on a copy of production data\n\n4. Use a migration tool:\n   - Prisma Migrate\n   - Flyway\n   - Liquibase\n   - Alembic (Python)\n   - node-pg-migrate\n\n5. Rollback plan:\n   - Each migration should have a down migration\n   - Or: test on staging first, don't rollback DB in prod",
    codeExample: `# GitHub Actions: run migrations before deploy
jobs:
  migrate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run database migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}

      - name: Verify migration
        run: npx prisma db pull --print
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}

      - name: Deploy application
        run: |
          # Deploy AFTER migration succeeds
          kubectl set image deployment/my-app \\
            app=my-app:\${{ github.sha }}
          kubectl rollout status deployment/my-app

      - name: Rollback on failure
        if: failure()
        run: kubectl rollout undo deployment/my-app`,
    starterCode: `// DB migrations: run before deploying new code
function migrateAndDeploy(migrations) {
  for (const m of migrations) {
    if (!m.safe) throw new Error("Unsafe migration!");
    hero.move("right"); // run migration
  }
  hero.move("down");
  // Deploy after migrations succeed
  hero.move("right");
  hero.move("right");
}

migrateAndDeploy([
  { name: "add email_verified column", safe: true },
  { name: "backfill data",             safe: true },
  { name: "create index",              safe: true },
]);`,
    solutionCode: `function migrateAndDeploy(migrations) {
  for (const m of migrations) {
    if (!m.safe) throw new Error("Unsafe migration!");
    hero.move("right");
  }
  hero.move("down");
  hero.move("right");
  hero.move("right");
}

migrateAndDeploy([
  { name: "add email_verified column", safe: true },
  { name: "backfill data",             safe: true },
  { name: "create index",              safe: true },
]);`,
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
    hint: "3 migrations → right×3 (gems), down, deploy → right×2 (gems+exit).",
    tip: "Never drop a column in the same deploy you stop using it. Deploy code that ignores it first, then drop in a follow-up PR.",
  },

  {
    id: "cicd-8",
    courseId: "cicd",
    number: 8,
    title: "Monitoring & Alerts",
    description: "Monitor your CI/CD pipeline and application health after deployment.",
    concept: "Post-Deploy Monitoring",
    conceptExplanation:
      "Deployment doesn't end when code is live — monitoring catches issues fast.\n\nKey metrics to monitor:\n• Error rate — % of requests returning 5xx\n• Latency — p50, p95, p99 response times\n• Throughput — requests per second\n• Availability — uptime percentage\n• Saturation — CPU, memory, disk usage\n\nTools:\n• Datadog, New Relic — APM and infrastructure\n• Prometheus + Grafana — open-source metrics\n• Sentry — error tracking\n• PagerDuty / OpsGenie — alerting\n• CloudWatch — AWS native monitoring\n\nPost-deploy checks:\n1. Smoke tests — hit key endpoints\n2. Synthetic monitoring — Playwright on schedule\n3. Alert thresholds — error rate > 1%, p99 > 2s\n\nRunbook:\n• Document how to respond to each alert\n• Automate rollback when metrics breach thresholds",
    codeExample: `# Post-deploy smoke test in GitHub Actions
jobs:
  smoke-test:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Wait for deployment
        run: sleep 30

      - name: Smoke test - health endpoint
        run: |
          STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.myapp.com/health)
          if [ "$STATUS" != "200" ]; then
            echo "Health check failed: $STATUS"
            exit 1
          fi

      - name: Smoke test - core endpoints
        run: |
          curl -f https://api.myapp.com/users || exit 1
          curl -f https://myapp.com || exit 1

      - name: Check error rate (Datadog)
        run: |
          ERROR_RATE=$(./scripts/datadog-metric.sh error_rate 5min)
          if (( \$(echo "$ERROR_RATE > 0.01" | bc -l) )); then
            echo "Error rate spike: $ERROR_RATE"
            ./scripts/rollback.sh
            exit 1
          fi`,
    starterCode: `// Post-deploy: smoke tests + monitoring
function postDeployChecks(checks) {
  for (const check of checks) {
    if (check.pass) {
      hero.move(check.dir);
    } else {
      // rollback!
      throw new Error("Check failed: " + check.name);
    }
  }
}

postDeployChecks([
  { name: "health endpoint",  pass: true, dir: "right" },
  { name: "login flow",       pass: true, dir: "right" },
  { name: "error rate < 1%",  pass: true, dir: "down" },
  { name: "p99 latency < 2s", pass: true, dir: "right" },
]);
hero.move("right");`,
    solutionCode: `function postDeployChecks(checks) {
  for (const check of checks) {
    if (check.pass) {
      hero.move(check.dir);
    } else {
      throw new Error("Check failed: " + check.name);
    }
  }
}

postDeployChecks([
  { name: "health endpoint",  pass: true, dir: "right" },
  { name: "login flow",       pass: true, dir: "right" },
  { name: "error rate < 1%",  pass: true, dir: "down" },
  { name: "p99 latency < 2s", pass: true, dir: "right" },
]);
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
    hint: "right×2 (gems), down, right×2 (gems+exit).",
    tip: "Set up alerts before you launch. It's much easier to tune thresholds than to build monitoring under pressure during an outage.",
  },

  {
    id: "cicd-9",
    courseId: "cicd",
    number: 9,
    title: "GitOps with ArgoCD",
    description: "GitOps: the git repo is the single source of truth for what should be deployed.",
    concept: "GitOps",
    conceptExplanation:
      "GitOps is a deployment methodology where git is the source of truth.\n\nPrinciples:\n1. Entire system state declared in git\n2. Approved changes auto-applied to the cluster\n3. Software agents ensure actual state matches desired state\n4. All changes via git PRs (audit trail, rollback by reverting)\n\nArgoCD:\n• Watches a git repo for K8s manifests\n• Automatically syncs the cluster to match the repo\n• Detects drift (manual changes to cluster)\n• Provides UI, CLI, and health status\n\nFlux:\n• Alternative to ArgoCD\n• More composable, Helm and Kustomize support\n\nGitOps flow:\n1. Developer opens PR to update image tag\n2. CI tests and merges\n3. ArgoCD detects change in git\n4. ArgoCD applies to cluster\n5. ArgoCD reports sync status",
    codeExample: `# ArgoCD Application manifest
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/my-app
    targetRevision: HEAD
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true      # delete removed resources
      selfHeal: true   # revert manual changes
    syncOptions:
      - CreateNamespace=true

# Update image tag in CI and push to git
# ArgoCD detects the change and deploys automatically
yq -i '.spec.template.spec.containers[0].image = "my-app:\${{ github.sha }}"' \\
  k8s/overlays/production/deployment.yaml
git commit -m "Deploy \${{ github.sha }}" && git push`,
    starterCode: `// GitOps: git is source of truth
function gitopsFlow(steps) {
  for (const step of steps) {
    hero.move(step.dir);
  }
}

gitopsFlow([
  { step: "PR: update image tag",    dir: "right" },
  { step: "CI: tests pass",          dir: "right" },
  { step: "Merge to main",           dir: "right" },
  { step: "ArgoCD: detect change",   dir: "down" },
  { step: "ArgoCD: sync cluster",    dir: "right" },
  { step: "verify health",           dir: "right" },
]);
hero.move("down");`,
    solutionCode: `function gitopsFlow(steps) {
  for (const step of steps) {
    hero.move(step.dir);
  }
}

gitopsFlow([
  { step: "PR: update image tag",  dir: "right" },
  { step: "CI: tests pass",        dir: "right" },
  { step: "Merge to main",         dir: "right" },
  { step: "ArgoCD: detect change", dir: "down" },
  { step: "ArgoCD: sync cluster",  dir: "right" },
  { step: "verify health",         dir: "right" },
]);
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
    tip: "GitOps gives you a complete history of every deployment via git log — invaluable for debugging incidents.",
  },

  {
    id: "cicd-10",
    courseId: "cicd",
    number: 10,
    title: "Grand Finale",
    description: "Build a complete CI/CD pipeline: test, build, push Docker, migrate, deploy, and monitor.",
    concept: "Production CI/CD",
    conceptExplanation:
      "A complete production CI/CD pipeline:\n\nOn Pull Request:\n1. Lint + type check\n2. Unit tests\n3. Integration tests (with Docker Compose services)\n4. Build Docker image (don't push yet)\n5. Security scan (Trivy, Snyk)\n\nOn Merge to Main:\n1. All PR checks +\n2. Push Docker image to registry\n3. Run DB migrations\n4. Deploy to staging\n5. Smoke tests on staging\n6. Manual approval for production\n7. Deploy to production (canary)\n8. Smoke tests on production\n9. Monitor error rate\n10. Auto-rollback on failure\n\nTools to know:\n• GitHub Actions / GitLab CI\n• Docker + container registry\n• Helm for K8s deployments\n• ArgoCD for GitOps\n• Terraform for infrastructure\n• Sentry for errors, Datadog for metrics",
    codeExample: `# Full pipeline in ~50 lines
name: Production Pipeline
on:
  push:
    branches: [main]

jobs:
  # 1. Test
  test:
    uses: ./.github/workflows/test.yml

  # 2. Build & Push
  build:
    needs: test
    uses: ./.github/workflows/build.yml
    secrets: inherit

  # 3. Deploy Staging
  deploy-staging:
    needs: build
    uses: ./.github/workflows/deploy.yml
    with:
      environment: staging
      image-tag: \${{ needs.build.outputs.image-tag }}
    secrets: inherit

  # 4. Smoke Tests
  smoke-staging:
    needs: deploy-staging
    uses: ./.github/workflows/smoke.yml
    with: { environment: staging }

  # 5. Production (manual approval)
  deploy-production:
    needs: smoke-staging
    environment: production  # requires approval
    uses: ./.github/workflows/deploy.yml
    with:
      environment: production
      image-tag: \${{ needs.build.outputs.image-tag }}
    secrets: inherit`,
    starterCode: `// Grand finale: complete CI/CD pipeline
const pipeline = {
  pr:   () => { hero.move("right"); hero.move("right"); },
  ci:   () => { hero.move("down"); hero.move("right"); hero.move("right"); },
  cd:   () => { hero.move("down"); hero.move("right"); },
};

pipeline.pr();   // lint + test
pipeline.ci();   // build + push + staging
pipeline.cd();   // prod deploy + monitor`,
    solutionCode: `const pipeline = {
  pr:   () => { hero.move("right"); hero.move("right"); },
  ci:   () => { hero.move("down"); hero.move("right"); hero.move("right"); },
  cd:   () => { hero.move("down"); hero.move("right"); },
};

pipeline.pr();
pipeline.ci();
pipeline.cd();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "pr: right×2 (gems), ci: down+right×2 (gems), cd: down+right (gem+exit).",
    tip: "Start simple — even a single GitHub Actions workflow that runs tests on every PR dramatically improves code quality.",
  },
];
