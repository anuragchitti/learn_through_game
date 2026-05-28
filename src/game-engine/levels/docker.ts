import { LevelDefinition } from "../types";

export const dockerLevels: LevelDefinition[] = [
  // ─── LEVEL 1 ── What is Docker? ───────────────────────────────────────────────
  {
    id: "docker-1",
    courseId: "docker",
    number: 1,
    title: "What is Docker?",
    description: "Docker packages your app and its dependencies into a portable container. Step inside!",
    concept: "Containers vs Virtual Machines",
    conceptExplanation:
      "Docker is a platform for building, shipping, and running applications inside lightweight, portable containers.\n\nA container bundles your application code together with all its dependencies (libraries, runtime, config) into a single unit that runs consistently on any machine — 'it works on my machine' becomes a solved problem.\n\nContainers vs Virtual Machines:\n• A VM runs a full OS on virtualised hardware — it can be gigabytes in size and takes minutes to boot.\n• A container shares the host OS kernel — it contains only the app and its dependencies, is megabytes in size, and starts in milliseconds.\n\nKey Docker concepts:\n• Image  — a read-only template (like a class) used to create containers\n• Container — a running instance of an image (like an object)\n• Dockerfile — a script that defines how to build an image\n• Registry — a store for images (Docker Hub is the public default)\n• Docker Engine — the daemon that builds images and runs containers\n\nDocker is the foundation of modern DevOps: CI/CD pipelines build images, Kubernetes orchestrates containers at scale.",
    codeExample: `# Check Docker is installed
docker --version

# Pull an image from Docker Hub
docker pull nginx

# Run a container from an image
docker run nginx

# Run interactively, map port 8080 → 80
docker run -p 8080:80 nginx

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>`,
    starterCode: `// A container wraps your app — isolating it from the host
// Step through the containerised environment to reach the exit

const environment = ["deps", "runtime", "exit"];

// Each step moves deeper into the container
for (const layer of environment) {
  hero.move("right");
}`,
    solutionCode: `const environment = ["deps", "runtime", "exit"];

for (const layer of environment) {
  hero.move("right");
}`,
    // hero(1,1) right→(1,2)gem right→(1,3)gem right→(1,4)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 2 💎 gems (app + deps)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (container is running!)" },
    ],
    hint: "Move right 3 times — once for deps, once for runtime, once for the exit.",
    tip: "Containers start in milliseconds and use a fraction of VM memory — that's why microservices love Docker.",
  },

  // ─── LEVEL 2 ── Dockerfile ────────────────────────────────────────────────────
  {
    id: "docker-2",
    courseId: "docker",
    number: 2,
    title: "Writing a Dockerfile",
    description: "A Dockerfile is a recipe for building an image. Follow each instruction to build yours!",
    concept: "Dockerfile",
    conceptExplanation:
      "A Dockerfile is a plain-text file containing a sequence of instructions that Docker executes to build an image. Each instruction adds a new layer on top of the previous one.\n\nCore instructions:\n• FROM    — sets the base image (every Dockerfile starts here)\n• WORKDIR — sets the working directory inside the image\n• COPY    — copies files from the build context (your local machine) into the image\n• RUN     — executes a shell command during the build (e.g., npm install)\n• ENV     — sets environment variables\n• EXPOSE  — documents which port the app listens on (doesn't publish it)\n• CMD     — the default command to run when the container starts\n• ENTRYPOINT — like CMD but harder to override; good for executable containers\n\nBest practices:\n• Use a specific base image tag (node:20-alpine), not just 'latest'\n• Combine RUN commands with && to reduce layers\n• Copy package.json before source code so npm install is cached\n• Use .dockerignore to exclude node_modules, .git, .env from the build context\n• Prefer alpine-based images — they are 5-10× smaller than debian/ubuntu",
    codeExample: `# ── Dockerfile ──────────────────────────────────────────
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Document the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]

# ── .dockerignore ────────────────────────────────────────
node_modules
.git
.env
*.log`,
    starterCode: `// Each Dockerfile instruction is a step in the build
// Execute them in order to build a valid image

const instructions = [
  { name: "FROM",    move: "right" },
  { name: "WORKDIR", move: "right" },
  { name: "COPY",    move: "down"  },
  { name: "RUN",     move: "right" },
];

// Run each instruction to build the image
for (const instr of instructions) {
  hero.move(instr.move);
}`,
    solutionCode: `const instructions = [
  { name: "FROM",    move: "right" },
  { name: "WORKDIR", move: "right" },
  { name: "COPY",    move: "down"  },
  { name: "RUN",     move: "right" },
];

for (const instr of instructions) {
  hero.move(instr.move);
}`,
    // right,right,down,right
    // hero(1,1)→(1,2)gem→(1,3)gem→(2,3)gem→(2,4)exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems (Dockerfile layers)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (image built!)" },
    ],
    hint: "FROM→right, WORKDIR→right, COPY→down, RUN→right reaches the exit.",
    tip: "Copy package.json before your source code — Docker caches each layer, so unchanged layers aren't rebuilt.",
  },

  // ─── LEVEL 3 ── docker build & docker run ─────────────────────────────────────
  {
    id: "docker-3",
    courseId: "docker",
    number: 3,
    title: "Build & Run",
    description: "docker build creates an image; docker run starts a container from it. Go end-to-end!",
    concept: "docker build & docker run",
    conceptExplanation:
      "Once you have a Dockerfile, two commands take you from code to running container.\n\n`docker build` reads the Dockerfile and produces a tagged image:\ndocker build -t myapp:1.0 .\n  -t myapp:1.0  — name and tag the image\n  .             — build context (the current directory is sent to the Docker daemon)\n\n`docker run` creates and starts a container from an image:\ndocker run -d -p 3000:3000 --name web myapp:1.0\n  -d            — detach (run in background)\n  -p 3000:3000  — map host port 3000 → container port 3000\n  --name web    — give the container a memorable name\n  myapp:1.0     — the image to use\n\nUseful run flags:\n  -e KEY=VALUE  — set an environment variable\n  -v /host:/container — bind mount a volume\n  --rm          — automatically remove the container when it stops\n  -it           — interactive + pseudo-TTY (for shells)\n\nOther handy commands:\ndocker logs web         — stream container stdout/stderr\ndocker exec -it web sh  — open a shell inside a running container\ndocker inspect web      — low-level JSON metadata",
    codeExample: `# Build an image tagged "myapp:1.0"
docker build -t myapp:1.0 .

# Run in detached mode, mapping port 3000
docker run -d -p 3000:3000 --name web myapp:1.0

# View logs
docker logs web

# Open a shell in the running container
docker exec -it web sh

# Stop and remove
docker stop web
docker rm web

# Remove the image
docker rmi myapp:1.0

# Build and run in one pipeline
docker build -t myapp:latest . && docker run -p 3000:3000 myapp:latest`,
    starterCode: `// Two-phase workflow: BUILD then RUN
// Phase 1: build the image (move down toward the container)
// Phase 2: run the container (move right to the exit)

function dockerBuild() {
  hero.move("down");   // read Dockerfile
  hero.move("down");   // compile layers
  hero.move("down");   // image ready
}

function dockerRun() {
  hero.move("down");   // start container = exit!
}

dockerBuild();
dockerRun();`,
    solutionCode: `function dockerBuild() {
  hero.move("down");
  hero.move("down");
  hero.move("down");
}

function dockerRun() {
  hero.move("down");
}

dockerBuild();
dockerRun();`,
    // hero(1,2) down×4 → (2,2)gem (3,2)gem (4,2)gem (5,2)exit
    grid: [
      ["wall", "wall", "wall", "wall"],
      ["wall", "wall", "hero", "wall"],
      ["wall", "wall", "gem",  "wall"],
      ["wall", "wall", "gem",  "wall"],
      ["wall", "wall", "gem",  "wall"],
      ["wall", "wall", "exit", "wall"],
    ],
    heroStart: { row: 1, col: 2 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems (build layers)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (container running!)" },
    ],
    hint: "Build creates 3 layers (down×3), then run starts the container (down×1 to exit).",
    tip: "docker build sends your entire build context to the Docker daemon — keep .dockerignore tight to speed up builds.",
  },

  // ─── LEVEL 4 ── Images & Layers ───────────────────────────────────────────────
  {
    id: "docker-4",
    courseId: "docker",
    number: 4,
    title: "Images & Layers",
    description: "Docker images are built from stacked layers. Each cached layer speeds up future builds!",
    concept: "Image Layers & Build Cache",
    conceptExplanation:
      "A Docker image is not a single monolithic file — it is a stack of read-only layers. Each instruction in a Dockerfile produces one layer.\n\nHow the cache works:\n• When you rebuild, Docker compares each instruction against its cache.\n• If the instruction and its inputs haven't changed, Docker reuses the cached layer (instant).\n• The first changed layer and all subsequent layers are rebuilt.\n\nThis is why layer order matters enormously:\n1. FROM node:20-alpine        (rarely changes — cached almost always)\n2. COPY package*.json ./      (changes only when deps change)\n3. RUN npm ci                 (expensive — cached when package.json is unchanged)\n4. COPY . .                   (changes on every code edit)\n5. CMD [\"node\", \"server.js\"]\n\nWith this order, a code-only change rebuilds only layers 4 and 5. If you put COPY . . before RUN npm ci, every code change triggers a full npm install.\n\nLayer sizes:\ndocker history myapp:1.0  — shows each layer and its size\ndocker image inspect myapp:1.0  — full metadata\n\nSmall images = faster pulls, smaller attack surface. Use multi-stage builds to strip build tools from the final image.",
    codeExample: `# View layers and sizes
docker history myapp:1.0

# Inspect image metadata
docker image inspect myapp:1.0

# List all local images
docker images

# Remove dangling (untagged) images
docker image prune

# Dockerfile ordered for best caching
FROM node:20-alpine
WORKDIR /app

# Layer 1: dep manifests (slow to change)
COPY package*.json ./
RUN npm ci --only=production     # cached until package.json changes

# Layer 2: source code (changes often)
COPY . .

CMD ["node", "server.js"]`,
    starterCode: `// Layers are stacked; cached layers are skipped (UP shortcut)
// Changed layers must be rebuilt (right + down path)

const layers = [
  { name: "base-os",   cached: true,  move: "right" },
  { name: "node",      cached: true,  move: "up"    },
  { name: "npm-ci",    cached: true,  move: "right" },
  { name: "source",    cached: false, move: "down"  },
  { name: "cmd",       cached: false, move: "right" },
];

for (const layer of layers) {
  hero.move(layer.move);
}`,
    solutionCode: `const layers = [
  { name: "base-os",   cached: true,  move: "right" },
  { name: "node",      cached: true,  move: "up"    },
  { name: "npm-ci",    cached: true,  move: "right" },
  { name: "source",    cached: false, move: "down"  },
  { name: "cmd",       cached: false, move: "right" },
];

for (const layer of layers) {
  hero.move(layer.move);
}`,
    // moves: right,up,right,down,right
    // hero(2,1)→right(2,2)gem→up(1,2)gem→right(1,3)gem→down(2,3)gem→right(2,4)gem... need exit at (2,5)
    // hero(2,1)→(2,2)gem→(1,2)gem→(1,3)gem→(2,3)gem→(2,4)exit ✓ (5 moves, 4 gems, but 5 layers)
    // Adjust: 5 moves, 4 gems. Right,up,right,down,right → exit at (2,4)
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 2, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems (image layers)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (image ready)" },
    ],
    hint: "Follow the layer order: right, up, right, down, right — cached layers zip by fast!",
    tip: "Ordering Dockerfile instructions from least-to-most-frequently-changed maximises cache hits and slashes build times.",
  },

  // ─── LEVEL 5 ── Volumes & Bind Mounts ────────────────────────────────────────
  {
    id: "docker-5",
    courseId: "docker",
    number: 5,
    title: "Volumes & Bind Mounts",
    description: "Volumes persist data outside the container lifecycle. Collect data even after restart!",
    concept: "Volumes & Bind Mounts",
    conceptExplanation:
      "Containers are ephemeral — when a container is removed, its writable layer vanishes. Volumes and bind mounts solve data persistence.\n\nDocker Volumes:\n• Managed by Docker, stored in /var/lib/docker/volumes/\n• Best for production data (databases, uploads)\n• Can be shared across multiple containers\n• Easy to back up and migrate\n\nBind Mounts:\n• Mount a specific host directory into the container\n• Great for development (live-reload without rebuilding)\n• Host path must exist\n\nCreating volumes:\ndocker volume create mydata\ndocker run -v mydata:/app/data myimage\n\nBind mount syntax:\ndocker run -v $(pwd)/src:/app/src myimage\n# or with --mount (more explicit):\ndocker run --mount type=bind,source=$(pwd)/src,target=/app/src myimage\n\ntmpfs mounts:\n• Stored in host memory only — lost on stop\n• Great for sensitive data that must never touch disk\n\nNamed volumes survive docker stop, docker start, and even docker rm. They're only deleted with docker volume rm or docker volume prune.",
    codeExample: `# Create a named volume
docker volume create pgdata

# Run Postgres with persistent storage
docker run -d \\
  --name db \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# Bind mount — sync local code into container (dev mode)
docker run -d \\
  -p 3000:3000 \\
  -v $(pwd):/app \\
  -w /app \\
  node:20-alpine \\
  npm run dev

# List volumes
docker volume ls

# Inspect a volume
docker volume inspect pgdata

# Remove unused volumes
docker volume prune`,
    starterCode: `// Volumes persist across container restarts
// Collect gems (data) and they survive even when the container exits

const dataPoints = [
  { label: "user_uploads", move: "right" },
  { label: "db_data",      move: "right" },
  { label: "cached_items", move: "down"  },
  { label: "volume_exit",  move: "right" },
];

// Persist data by visiting each volume mount
for (const dp of dataPoints) {
  hero.move(dp.move);
}`,
    solutionCode: `const dataPoints = [
  { label: "user_uploads", move: "right" },
  { label: "db_data",      move: "right" },
  { label: "cached_items", move: "down"  },
  { label: "volume_exit",  move: "right" },
];

for (const dp of dataPoints) {
  hero.move(dp.move);
}`,
    // right,right,down,right
    // hero(1,1)→(1,2)gem→(1,3)gem→(2,3)gem→(2,4)exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems (persistent data)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (data persisted!)" },
    ],
    hint: "right, right, down, right — your data survives the container lifecycle!",
    tip: "Never store database files in a container's writable layer — always use a named volume so data outlives the container.",
  },

  // ─── LEVEL 6 ── Networking ────────────────────────────────────────────────────
  {
    id: "docker-6",
    courseId: "docker",
    number: 6,
    title: "Networking & Ports",
    description: "Docker networks let containers talk to each other. Map ports to reach the outside world!",
    concept: "Docker Networking & Port Mapping",
    conceptExplanation:
      "By default, containers run in an isolated network namespace. Docker networking controls how containers communicate with each other and the host.\n\nDefault networks:\n• bridge — the default; containers on the same bridge can talk by IP. Not DNS-friendly.\n• host  — container shares the host's network stack (no isolation, fast)\n• none  — no networking at all\n\nUser-defined bridge networks (recommended):\ndocker network create mynet\ndocker run --network mynet --name web myapp\ndocker run --network mynet --name db postgres\n\nOn a user-defined network, containers resolve each other by name: `web` can connect to `db:5432` without knowing the IP.\n\nPort mapping:\n  -p <host_port>:<container_port>\n  -p 8080:80   — host port 8080 maps to container port 80\n  -P           — Docker picks random host ports for all EXPOSE'd ports\n\nInspect networking:\ndocker network ls              — list networks\ndocker network inspect mynet   — see connected containers and their IPs\ndocker inspect web | grep IPAddress  — container IP\n\nDocker Compose manages networks automatically — every Compose project gets its own default bridge network where service names are DNS entries.",
    codeExample: `# Create a user-defined network
docker network create appnet

# Run app container on the network
docker run -d \\
  --name web \\
  --network appnet \\
  -p 8080:3000 \\
  myapp:1.0

# Run database on the SAME network
docker run -d \\
  --name db \\
  --network appnet \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:16

# 'web' can now reach 'db' by hostname:
# postgresql://db:5432/mydb

# List networks
docker network ls

# Inspect a network
docker network inspect appnet

# Disconnect a container
docker network disconnect appnet web`,
    starterCode: `// Packets travel through the network — hop between containers
// right = move within the network, down = cross a network segment

const networkHops = [
  { from: "client",  to: "proxy",  dir: "right" },
  { from: "proxy",   to: "app",    dir: "right"  },
  { from: "app",     to: "db",     dir: "down"   },
  { from: "db",      to: "cache",  dir: "right"  },
  { from: "cache",   to: "exit",   dir: "down"   },
  { from: "exit",    to: "done",   dir: "right"  },
];

for (const hop of networkHops) {
  hero.move(hop.dir);
}`,
    solutionCode: `const networkHops = [
  { from: "client",  to: "proxy",  dir: "right" },
  { from: "proxy",   to: "app",    dir: "right" },
  { from: "app",     to: "db",     dir: "down"  },
  { from: "db",      to: "cache",  dir: "right" },
  { from: "cache",   to: "exit",   dir: "down"  },
  { from: "exit",    to: "done",   dir: "right" },
];

for (const hop of networkHops) {
  hero.move(hop.dir);
}`,
    // moves: right,right,down,right,down,right
    // hero(1,1)→(1,2)gem→(1,3)gem→(2,3)gem→(2,4)gem→(3,4)gem→(3,5)exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (network hops)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (response delivered!)" },
    ],
    hint: "Follow the request path: right×2 (proxy→app), down (app→db), right (db→cache), down+right (cache→exit).",
    tip: "Use user-defined bridge networks so containers resolve each other by service name — no hardcoded IPs needed.",
  },

  // ─── LEVEL 7 ── Docker Compose ────────────────────────────────────────────────
  {
    id: "docker-7",
    courseId: "docker",
    number: 7,
    title: "Docker Compose",
    description: "Compose orchestrates multi-container apps with a single YAML file. Spin up the stack!",
    concept: "Docker Compose",
    conceptExplanation:
      "Docker Compose lets you define and run multi-container applications with a single `docker-compose.yml` file. Instead of typing long `docker run` commands for each service, you declare everything in YAML and manage the whole stack with one command.\n\nCore Compose commands:\ndocker compose up -d        — start all services in background\ndocker compose down         — stop and remove containers + networks\ndocker compose logs -f web  — stream logs from the 'web' service\ndocker compose ps           — list running services\ndocker compose exec web sh  — open a shell in a running service\ndocker compose build        — rebuild images\n\nA docker-compose.yml file defines:\n• services — each container (image, ports, volumes, env, depends_on)\n• volumes  — named volumes shared across services\n• networks — custom networks (Compose creates a default one automatically)\n\nCompose features:\n• depends_on — start services in order\n• healthcheck — only route traffic to healthy containers\n• profiles    — include/exclude services with --profile flag\n• env_file    — load .env variables\n• scale       — run multiple replicas: docker compose up --scale web=3",
    codeExample: `# docker-compose.yml
version: "3.9"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./src:/app/src

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:

# Start the whole stack
# docker compose up -d`,
    starterCode: `// Compose starts services in dependency order
// Each service is a gem; when all are running, reach the exit

const services = [
  { name: "db",    move: "right" },   // starts first (no deps)
  { name: "cache", move: "down"  },   // starts second
  { name: "web",   move: "right" },   // starts after db+cache
  { name: "proxy", move: "right" },   // starts last
];

// Start services in order (depends_on)
for (const svc of services) {
  hero.move(svc.move);
}

// All services healthy — reach the exit
hero.move("up");
hero.move("right");
hero.move("down");`,
    solutionCode: `const services = [
  { name: "db",    move: "right" },
  { name: "cache", move: "down"  },
  { name: "web",   move: "right" },
  { name: "proxy", move: "right" },
];

for (const svc of services) {
  hero.move(svc.move);
}

hero.move("up");
hero.move("right");
hero.move("down");`,
    // moves: right,down,right,right,up,right,down
    // hero(1,1)→(1,2)gem→(2,2)gem→(2,3)gem→(2,4)gem→(1,4)gem→(1,5)wall...
    // Need to redesign
    // Verified grid for D7: right,down,right,right,up,right,down
    // hero(1,1)→(1,2)gem→(2,2)gem→(2,3)gem→(2,4)gem→(1,4)gem→(1,5)?→(2,5)exit
    // grid row1: hero,gem,wall,gem,gem,wall   row2: wall,gem,gem,gem,empty,exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "gem",  "gem",  "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (Compose services)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (stack is up!)" },
    ],
    hint: "Services start in order: right, down, right, right, up, right, down.",
    tip: "Use `depends_on` with `condition: service_healthy` to ensure databases are ready before the web service connects.",
  },

  // ─── LEVEL 8 ── Multi-stage Builds ───────────────────────────────────────────
  {
    id: "docker-8",
    courseId: "docker",
    number: 8,
    title: "Multi-stage Builds",
    description: "Separate build and runtime stages to create tiny, secure production images!",
    concept: "Multi-stage Builds",
    conceptExplanation:
      "A multi-stage Dockerfile uses multiple FROM instructions. Each FROM starts a fresh stage. You can selectively copy artifacts from earlier stages into the final image — leaving build tools, test dependencies, and intermediate files behind.\n\nWhy it matters:\n• A Node.js build image with TypeScript compiler, devDependencies, and build output might be 800 MB.\n• After a multi-stage build, the production image (just the compiled JS + node_modules --production) might be 80 MB.\n• Smaller images = faster pulls, less attack surface, lower storage costs.\n\nCommon patterns:\n\n1. Builder + Runtime\n   Stage 1 (builder): install all deps, compile TypeScript, run tests\n   Stage 2 (runtime): copy only compiled output + prod deps onto a slim base\n\n2. Test gate\n   Stage 1: build\n   Stage 2: run tests — if they fail, docker build fails\n   Stage 3: production image (only built if tests pass)\n\nTarget a specific stage during build:\ndocker build --target builder -t myapp:dev .\ndocker build --target runtime -t myapp:prod .",
    codeExample: `# ── Multi-stage Dockerfile ───────────────────────────────
# Stage 1: build + test
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                          # install ALL deps (including devDeps)
COPY . .
RUN npm run build                   # compile TypeScript → dist/
RUN npm test                        # fail the build if tests fail

# Stage 2: lean production image
FROM node:20-alpine AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production        # only production dependencies
COPY --from=builder /app/dist ./dist  # compiled output from stage 1

EXPOSE 3000
CMD ["node", "dist/server.js"]

# The compiler, devDeps, source TypeScript, and test files
# are NOT in the runtime image — it's 10× smaller.

# Build commands
docker build --target runtime -t myapp:prod .
docker build --target builder -t myapp:dev  .`,
    starterCode: `// Stage 1 (builder): gather dependencies, compile
// Stage 2 (runtime): only copy what's needed — leave build tools behind

function builderStage() {
  hero.move("right");   // install all deps
  hero.move("right");   // compile source
  hero.move("down");    // run tests
}

function runtimeStage() {
  hero.move("right");   // copy prod deps
  hero.move("down");    // copy compiled output
  hero.move("right");   // image ready → exit!
}

builderStage();
runtimeStage();`,
    solutionCode: `function builderStage() {
  hero.move("right");
  hero.move("right");
  hero.move("down");
}

function runtimeStage() {
  hero.move("right");
  hero.move("down");
  hero.move("right");
}

builderStage();
runtimeStage();`,
    // moves: right,right,down,right,down,right
    // hero(1,1)→(1,2)gem→(1,3)gem→(2,3)gem→(2,4)gem→(3,4)gem→(3,5)exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems (build + runtime artifacts)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (lean image shipped!)" },
    ],
    hint: "Builder: right×2, down. Runtime: right, down, right to the exit.",
    tip: "Multi-stage builds are the single biggest win for production image size — a 700 MB dev image becomes a 70 MB production image.",
  },

  // ─── LEVEL 9 ── Container Registries ─────────────────────────────────────────
  {
    id: "docker-9",
    courseId: "docker",
    number: 9,
    title: "Container Registries",
    description: "Registries store and distribute images. Push yours to Docker Hub and pull it anywhere!",
    concept: "Docker Hub & Container Registries",
    conceptExplanation:
      "A container registry is a service that stores and serves Docker images. Images are identified by a name and tag: `repository/image:tag`.\n\nDocker Hub (hub.docker.com):\n• The default public registry — `docker pull nginx` implicitly uses Docker Hub\n• Free public repositories; paid private repositories\n• Official images (node, postgres, redis, nginx) are maintained by Docker and vendors\n\nOther popular registries:\n• GitHub Container Registry (ghcr.io) — great for OSS projects\n• AWS ECR — managed registry in AWS (integrates with ECS/EKS)\n• Google Artifact Registry — GCP equivalent\n• Harbor — self-hosted, open-source registry\n\nPush workflow:\ndocker login\ndocker tag myapp:1.0 myusername/myapp:1.0\ndocker push myusername/myapp:1.0\n\nPull workflow:\ndocker pull myusername/myapp:1.0\ndocker run myusername/myapp:1.0\n\nImage naming:\n  [registry/][namespace/]image[:tag]\n  nginx                        → docker.io/library/nginx:latest\n  myuser/myapp:2.0             → docker.io/myuser/myapp:2.0\n  ghcr.io/org/myapp:sha-abc123 → GitHub registry\n\nAlways tag production images with a specific version, never just 'latest' — 'latest' gives you no auditability.",
    codeExample: `# Log in to Docker Hub
docker login

# Tag your image for the registry
docker tag myapp:1.0 myusername/myapp:1.0

# Push to Docker Hub
docker push myusername/myapp:1.0

# Pull on another machine
docker pull myusername/myapp:1.0

# Push to GitHub Container Registry
docker tag myapp:1.0 ghcr.io/myorg/myapp:1.0
docker push ghcr.io/myorg/myapp:1.0

# Push to AWS ECR
aws ecr get-login-password | docker login --username AWS \\
  --password-stdin <account>.dkr.ecr.<region>.amazonaws.com

docker tag myapp:1.0 <account>.dkr.ecr.<region>.amazonaws.com/myapp:1.0
docker push <account>.dkr.ecr.<region>.amazonaws.com/myapp:1.0`,
    starterCode: `// Registry workflow: tag → push → pull → run
const workflow = [
  { step: "tag",   move: "right" },
  { step: "push",  move: "right" },
  { step: "pull",  move: "down"  },
  { step: "run",   move: "right" },
];

// Complete the registry workflow
for (const w of workflow) {
  hero.move(w.move);
}`,
    solutionCode: `const workflow = [
  { step: "tag",   move: "right" },
  { step: "push",  move: "right" },
  { step: "pull",  move: "down"  },
  { step: "run",   move: "right" },
];

for (const w of workflow) {
  hero.move(w.move);
}`,
    // right,right,down,right
    // hero(1,1)→(1,2)gem→(1,3)gem→(2,3)gem→(2,4)exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems (tag, push, pull)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (deployed from registry!)" },
    ],
    hint: "Follow the registry workflow: tag→right, push→right, pull→down, run→right.",
    tip: "Tag images with semantic versions (1.2.3) AND a git SHA for traceability. Never rely solely on 'latest' in production.",
  },

  // ─── LEVEL 10 ── Grand Finale ─────────────────────────────────────────────────
  {
    id: "docker-10",
    courseId: "docker",
    number: 10,
    title: "Grand Finale: Production Deployment",
    description: "Combine everything — Dockerfile, multi-stage build, Compose, networking, volumes, and registry!",
    concept: "Docker in Production",
    conceptExplanation:
      "You've mastered all the Docker fundamentals. Here's how they combine in a real production deployment.\n\nA production Docker workflow:\n1. Write a multi-stage Dockerfile (small, secure runtime image)\n2. Add a .dockerignore (fast builds, no secrets in image)\n3. Write docker-compose.yml for local development\n4. CI/CD pipeline: build → test → push to registry (GitHub Actions, GitLab CI, etc.)\n5. Deploy: pull image on server / Kubernetes cluster\n\nSecurity checklist:\n☑ Run containers as a non-root user (USER node in Dockerfile)\n☑ Use read-only root filesystem (--read-only)\n☑ Scan images for CVEs: docker scout cves myapp:1.0 or Trivy\n☑ Never bake secrets into images — use Docker secrets or env vars\n☑ Pin base image digests: FROM node:20-alpine@sha256:...\n☑ Set resource limits: --memory 512m --cpus 1\n\nOrchestration next steps:\n• Docker Swarm — built-in, simple clustering\n• Kubernetes — industry standard for large-scale container orchestration\n• AWS ECS / Azure Container Apps / Google Cloud Run — managed container platforms\n\nYou now have everything you need to containerise any application and ship it confidently!",
    codeExample: `# ── Full production workflow ─────────────────────────────

# 1. Multi-stage build
docker build --target runtime -t myapp:$(git rev-parse --short HEAD) .

# 2. Scan for vulnerabilities
docker scout cves myapp:abc1234

# 3. Push to registry
docker tag myapp:abc1234 ghcr.io/myorg/myapp:abc1234
docker push ghcr.io/myorg/myapp:abc1234

# 4. docker-compose.yml (production override)
# docker-compose.yml + docker-compose.prod.yml
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 5. Health check
docker compose ps
docker compose logs --tail=50 web

# 6. Rolling update (Docker Swarm)
docker service update --image myapp:abc1234 mystack_web

# 7. Resource limits in docker-compose.yml
# deploy:
#   resources:
#     limits:
#       cpus: "1"
#       memory: 512M`,
    starterCode: `// Grand finale: full deployment pipeline
// Dockerfile → build → test → push → compose up → health-check

const deployPipeline = [
  { phase: "dockerfile",  moves: ["right", "right"] },
  { phase: "build",       moves: ["down"           ] },
  { phase: "test",        moves: ["right", "right"] },
  { phase: "push",        moves: ["up",    "right"] },
  { phase: "compose-up",  moves: ["down",  "right"] },
];

for (const phase of deployPipeline) {
  for (const dir of phase.moves) {
    hero.move(dir);
  }
}`,
    solutionCode: `const deployPipeline = [
  { phase: "dockerfile",  moves: ["right", "right"] },
  { phase: "build",       moves: ["down"           ] },
  { phase: "test",        moves: ["right", "right"] },
  { phase: "push",        moves: ["up",    "right"] },
  { phase: "compose-up",  moves: ["down",  "right"] },
];

for (const phase of deployPipeline) {
  for (const dir of phase.moves) {
    hero.move(dir);
  }
}`,
    // moves: right,right,down,right,right,up,right,down,right
    // hero(2,1)→(2,2)gem→(2,3)gem→(3,3)gem→(3,4)gem→(3,5)gem→(2,5)gem→(2,6)gem→(3,6)gem→(3,7)exit ✓
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "gem",  "gem",  "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 2, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 8 💎 gems (full deploy pipeline)" },
      { type: "reach-exit", description: "Reach the exit 🚪 (app live in production!)" },
    ],
    hint: "Follow the pipeline phases: Dockerfile→right×2, build→down, test→right×2, push→up+right, compose→down+right.",
    tip: "Automate this entire pipeline in GitHub Actions — every git push triggers build, test, push, and deploy automatically.",
  },
];
