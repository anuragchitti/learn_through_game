import { LevelDefinition } from "../types";

export const linuxLevels: LevelDefinition[] = [
  {
    id: "linux-1",
    courseId: "linux",
    number: 1,
    title: "Navigating the Filesystem",
    description: "The Linux filesystem is a tree. Navigate it with pwd, ls, and cd.",
    concept: "Filesystem Navigation",
    conceptExplanation:
      "Linux organizes everything in a single directory tree rooted at /.\n\nKey commands:\n• pwd — print working directory (where am I?)\n• ls — list files in current directory\n• ls -la — long format with hidden files\n• cd <dir> — change directory\n• cd .. — go up one level\n• cd ~ — go to home directory\n• cd / — go to root\n\nPath types:\n• Absolute: /home/user/documents (starts at /)\n• Relative: documents/notes (relative to current dir)",
    codeExample: `$ pwd
/home/alice

$ ls -la
total 32
drwxr-xr-x  4 alice alice 4096 Jan 1 /
drwxr-xr-x  6 alice alice 4096 Jan 1 documents
-rw-r--r--  1 alice alice  220 Jan 1 .bashrc

$ cd documents
$ pwd
/home/alice/documents

$ cd ..
$ pwd
/home/alice`,
    starterCode: `// Navigate the filesystem tree
const path = [
  { cmd: "cd projects", dir: "right" },
  { cmd: "cd src",      dir: "right" },
  { cmd: "ls",          dir: "right" },
  { cmd: "cd ..",       dir: "down" },
];

for (const step of path) {
  hero.move(step.dir);
}
hero.move("right");`,
    solutionCode: `const path = [
  { cmd: "cd projects", dir: "right" },
  { cmd: "cd src",      dir: "right" },
  { cmd: "ls",          dir: "right" },
  { cmd: "cd ..",       dir: "down" },
];

for (const step of path) {
  hero.move(step.dir);
}
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right (gem), down to exit.",
    tip: "Tab completion is your friend — press Tab after typing the first few letters of a path.",
  },

  {
    id: "linux-2",
    courseId: "linux",
    number: 2,
    title: "Files & Directories",
    description: "Create, move, copy, and delete files and directories.",
    concept: "File Operations",
    conceptExplanation:
      "Key file management commands:\n\n• touch file.txt — create empty file\n• mkdir dir — create directory\n• mkdir -p a/b/c — create nested directories\n• cp src dest — copy file\n• cp -r src/ dest/ — copy directory recursively\n• mv src dest — move or rename\n• rm file — delete file\n• rm -rf dir — delete directory recursively (dangerous!)\n• cat file — print file contents\n• less file — page through file\n• head/tail -n 10 file — first/last 10 lines",
    codeExample: `# Create structure
$ mkdir -p project/src project/tests

# Create files
$ touch project/src/app.js
$ touch project/README.md

# Copy a file
$ cp project/README.md project/README.bak

# Rename
$ mv project/README.bak project/README.old

# Delete
$ rm project/README.old

# Delete directory (careful!)
$ rm -rf project/tests`,
    starterCode: `// File operations: create → move → copy → delete
const ops = [
  { op: "mkdir src",    dir: "right" },
  { op: "touch app.js", dir: "right" },
  { op: "cp app.js bk", dir: "down" },
  { op: "mv bk old",    dir: "right" },
  { op: "rm old",       dir: "right" },
];

for (const op of ops) {
  hero.move(op.dir);
}
hero.move("down");`,
    solutionCode: `const ops = [
  { op: "mkdir src",    dir: "right" },
  { op: "touch app.js", dir: "right" },
  { op: "cp app.js bk", dir: "down" },
  { op: "mv bk old",    dir: "right" },
  { op: "rm old",       dir: "right" },
];

for (const ops_item of ops) {
  hero.move(ops_item.dir);
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
    tip: "rm -rf is permanent — there's no trash/recycle bin. Always double-check before running it.",
  },

  {
    id: "linux-3",
    courseId: "linux",
    number: 3,
    title: "Permissions",
    description: "Linux controls file access with user, group, and world permissions.",
    concept: "File Permissions",
    conceptExplanation:
      "Every file has permissions for owner, group, and others:\n\nFormat: drwxrwxrwx\n• d = directory (- for file)\n• r = read (4)\n• w = write (2)\n• x = execute (1)\n\nchmod — change permissions:\n• chmod 755 file (rwxr-xr-x)\n• chmod +x script.sh (add execute)\n• chmod go-w file (remove write from group+others)\n\nchown — change owner:\n• chown alice:devs file\n• chown -R alice:devs dir/\n\nCommon patterns:\n• 644 — regular files (rw-r--r--)\n• 755 — directories and executables\n• 600 — private keys",
    codeExample: `# View permissions
$ ls -la
-rw-r--r-- 1 alice devs 1024 deploy.sh
-rwxr-xr-x 1 alice devs  512 server.js

# Make script executable
$ chmod +x deploy.sh

# Numeric permissions
$ chmod 755 deploy.sh   # rwxr-xr-x
$ chmod 600 .ssh/id_rsa # rw-------

# Change owner
$ chown alice:www-data /var/www/html

# Recursive
$ chmod -R 755 public/`,
    starterCode: `// Permissions: 3 levels × 3 bits = octal notation
// 7=rwx, 6=rw-, 5=r-x, 4=r--, etc.
const perms = [
  { who: "owner",  bits: 7, dir: "right" }, // rwx
  { who: "group",  bits: 5, dir: "right" }, // r-x
  { who: "others", bits: 5, dir: "down" },  // r-x
];

for (const p of perms) {
  hero.move(p.dir);
}
hero.move("right");
hero.move("right");`,
    solutionCode: `const perms = [
  { who: "owner",  bits: 7, dir: "right" },
  { who: "group",  bits: 5, dir: "right" },
  { who: "others", bits: 5, dir: "down" },
];

for (const p of perms) {
  hero.move(p.dir);
}
hero.move("right");
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
    tip: "Never run servers as root. Use a dedicated user with minimal permissions.",
  },

  {
    id: "linux-4",
    courseId: "linux",
    number: 4,
    title: "Pipes & Redirection",
    description: "Combine commands with pipes (|) and redirect input/output with > and <.",
    concept: "I/O Redirection",
    conceptExplanation:
      "Linux commands communicate via streams: stdin (0), stdout (1), stderr (2).\n\nRedirection:\n• cmd > file — redirect stdout to file (overwrite)\n• cmd >> file — append stdout to file\n• cmd 2> error.log — redirect stderr\n• cmd &> all.log — redirect both stdout and stderr\n• cmd < file — redirect file to stdin\n\nPipes (|) connect stdout of one command to stdin of the next:\nls -la | grep \".js\" | wc -l\n\nUseful combos:\n• cat file | grep pattern\n• command | sort | uniq -c | sort -rn\n• curl url | jq '.data'",
    codeExample: `# Count JS files
$ ls *.js | wc -l
5

# Find errors in logs
$ grep 'ERROR' app.log | tail -20

# Save filtered output
$ grep 'GET /api' access.log > api_requests.txt

# Count unique IPs
$ awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Live log filtering
$ tail -f app.log | grep --line-buffered 'ERROR'`,
    starterCode: `// Pipes: chain commands, output → input → output
function pipe(...commands) {
  for (const cmd of commands) {
    hero.move(cmd.dir);
  }
}

pipe(
  { name: "ls",   dir: "right" },
  { name: "grep", dir: "right" },
  { name: "sort", dir: "right" },
  { name: "head", dir: "down" },
  { name: "wc",   dir: "right" },
);`,
    solutionCode: `function pipe(...commands) {
  for (const cmd of commands) {
    hero.move(cmd.dir);
  }
}

pipe(
  { name: "ls",   dir: "right" },
  { name: "grep", dir: "right" },
  { name: "sort", dir: "right" },
  { name: "head", dir: "down" },
  { name: "wc",   dir: "right" },
);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right (gem), down to exit.",
    tip: "Pipes are the Unix philosophy in action: small, focused tools that do one thing well.",
  },

  {
    id: "linux-5",
    courseId: "linux",
    number: 5,
    title: "grep & find",
    description: "Search file contents with grep and find files by name or property.",
    concept: "Searching in Linux",
    conceptExplanation:
      "grep — search for patterns in file content:\n• grep 'pattern' file\n• grep -r 'pattern' dir/ — recursive\n• grep -i 'pattern' — case-insensitive\n• grep -n 'pattern' — show line numbers\n• grep -v 'pattern' — invert (lines NOT matching)\n• grep -E 'regex' — extended regex\n\nfind — find files by properties:\n• find . -name '*.js' — by name\n• find . -type f -mtime -7 — modified in last 7 days\n• find . -size +1M — larger than 1MB\n• find . -name '*.log' -delete — find and delete\n• find . -type f -exec chmod 644 {} \\;",
    codeExample: `# Find all JS files recursively
$ find . -name "*.js" -not -path "*/node_modules/*"

# Search for console.log in source
$ grep -rn "console.log" src/

# Find large files
$ find . -size +10M -type f

# Case-insensitive search
$ grep -ri "error" logs/

# Find recently modified
$ find . -type f -mtime -1

# Combine: find and search within
$ find src -name "*.ts" | xargs grep "TODO"`,
    starterCode: `// grep + find: search and navigate
function search(pattern, type) {
  if (type === "grep") return hero.move("right");
  if (type === "find") return hero.move("down");
}

search("error",  "grep");
search("error",  "grep");
search("*.log",  "find");
search("*.json", "grep");
search("*.json", "grep");`,
    solutionCode: `function search(pattern, type) {
  if (type === "grep") return hero.move("right");
  if (type === "find") return hero.move("down");
}

search("error",  "grep");
search("error",  "grep");
search("*.log",  "find");
search("*.json", "grep");
search("*.json", "grep");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems+exit).",
    tip: "Add -not -path '*/node_modules/*' to find commands in JS projects to skip dependencies.",
  },

  {
    id: "linux-6",
    courseId: "linux",
    number: 6,
    title: "Processes & Jobs",
    description: "Manage running processes with ps, kill, and job control.",
    concept: "Process Management",
    conceptExplanation:
      "Linux runs multiple processes simultaneously.\n\nViewing processes:\n• ps aux — all running processes\n• top / htop — live process monitor\n• pgrep node — find PIDs by name\n\nKilling processes:\n• kill <PID> — send SIGTERM (graceful)\n• kill -9 <PID> — send SIGKILL (force)\n• killall node — kill by name\n\nJob control:\n• cmd & — run in background\n• Ctrl+Z — suspend to background\n• jobs — list background jobs\n• fg %1 — bring job 1 to foreground\n• bg %1 — resume job 1 in background\n\nnohup cmd & — keep running after logout",
    codeExample: `# See all node processes
$ ps aux | grep node

# Kill by PID
$ kill 1234
$ kill -9 1234   # force kill

# Run server in background
$ node server.js &
[1] 5678

# Check jobs
$ jobs
[1]+ Running  node server.js &

# Bring to foreground
$ fg %1

# Suspend and resume
$ ^Z
[1]+ Stopped  node server.js
$ bg %1`,
    starterCode: `// Processes: start, monitor, stop
const processes = [
  { name: "start app",     signal: null,       dir: "right" },
  { name: "start worker",  signal: null,       dir: "right" },
  { name: "check status",  signal: "SIGINFO",  dir: "right" },
  { name: "kill zombie",   signal: "SIGKILL",  dir: "down" },
  { name: "graceful stop", signal: "SIGTERM",  dir: "right" },
];

for (const proc of processes) {
  hero.move(proc.dir);
}
hero.move("right");`,
    solutionCode: `const processes = [
  { name: "start app",     dir: "right" },
  { name: "start worker",  dir: "right" },
  { name: "check status",  dir: "right" },
  { name: "kill zombie",   dir: "down" },
  { name: "graceful stop", dir: "right" },
];

for (const proc of processes) {
  hero.move(proc.dir);
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
    hint: "right×3 (gems), down, right×2 (gems), down to exit.",
    tip: "Always try SIGTERM before SIGKILL — give the process a chance to clean up connections and write files.",
  },

  {
    id: "linux-7",
    courseId: "linux",
    number: 7,
    title: "Shell Scripting",
    description: "Automate repetitive tasks by writing shell scripts.",
    concept: "Bash Scripting",
    conceptExplanation:
      "Shell scripts automate sequences of commands.\n\nBasics:\n#!/bin/bash — shebang (which interpreter)\nvariables: NAME=\"Alice\" (no spaces around =)\nquoting: \"$NAME\" vs '$NAME' (double expands, single doesn't)\ncommand output: OUTPUT=$(command)\n\nConditions:\nif [ condition ]; then ... fi\n[ -f file ] — file exists\n[ $x -gt 5 ] — comparison\n\nLoops:\nfor i in 1 2 3; do echo $i; done\nfor f in *.js; do ...; done\nwhile [ condition ]; do ...; done\n\nFunctions:\nmy_func() { echo \"$1\"; }",
    codeExample: `#!/bin/bash
# deploy.sh — deploy a Node.js app

set -e  # exit on any error

APP_DIR="/var/www/app"
BRANCH="\${1:-main}"

echo "Deploying branch: $BRANCH"

cd "$APP_DIR"
git pull origin "$BRANCH"
npm ci --production
pm2 restart app

echo "Deployment complete!"`,
    starterCode: `// Shell script: commands executed top to bottom
function runScript(commands) {
  for (const cmd of commands) {
    if (cmd.type === "command") hero.move("right");
    if (cmd.type === "condition") hero.move("down");
  }
}

runScript([
  { type: "command",   cmd: "set -e" },
  { type: "command",   cmd: "cd /app" },
  { type: "command",   cmd: "git pull" },
  { type: "condition", cmd: "if success" },
  { type: "command",   cmd: "npm install" },
  { type: "command",   cmd: "pm2 restart" },
]);`,
    solutionCode: `function runScript(commands) {
  for (const cmd of commands) {
    if (cmd.type === "command") hero.move("right");
    if (cmd.type === "condition") hero.move("down");
  }
}

runScript([
  { type: "command",   cmd: "set -e" },
  { type: "command",   cmd: "cd /app" },
  { type: "command",   cmd: "git pull" },
  { type: "condition", cmd: "if success" },
  { type: "command",   cmd: "npm install" },
  { type: "command",   cmd: "pm2 restart" },
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
    hint: "right×3 (gems), down, right×2 (gems), down to exit.",
    tip: "Always add set -e at the top of scripts — it stops execution on any error instead of silently continuing.",
  },

  {
    id: "linux-8",
    courseId: "linux",
    number: 8,
    title: "Grand Finale",
    description: "Combine filesystem, permissions, pipes, and scripting to solve a real-world task.",
    concept: "Linux Mastery",
    conceptExplanation:
      "A typical server administration task combines everything:\n\n1. Find large log files: find /var/log -size +100M\n2. Check who owns them: ls -la\n3. Compress old logs: gzip old.log\n4. Check disk space: df -h\n5. Monitor processes: htop\n6. Automate with cron: crontab -e\n\ncron syntax: MIN HOUR DAY MON DOW command\n0 2 * * * /scripts/backup.sh (run at 2am daily)\n\nOther useful tools:\n• ssh user@host — remote login\n• scp file user@host:path — copy files\n• curl url — HTTP requests from terminal\n• wget url — download files\n• systemctl start/stop/status service",
    codeExample: `#!/bin/bash
# Daily maintenance script

# Find and compress logs older than 7 days
find /var/log/app -name "*.log" -mtime +7 -exec gzip {} \\;

# Check disk usage
USAGE=$(df / | tail -1 | awk '{print $5}' | tr -d '%')
if [ "$USAGE" -gt 80 ]; then
  echo "Disk usage high: $USAGE%" | mail -s "Alert" admin@example.com
fi

# Restart if crashed
if ! pgrep -x "node" > /dev/null; then
  systemctl start app
  echo "App restarted" >> /var/log/app/restarts.log
fi`,
    starterCode: `// Grand finale: full Linux sysadmin workflow
function sysadmin(tasks) {
  for (const task of tasks) {
    hero.move(task.dir);
  }
}

sysadmin([
  { task: "check disk",     dir: "right" },
  { task: "find logs",      dir: "right" },
  { task: "compress old",   dir: "right" },
  { task: "check procs",    dir: "down" },
  { task: "restart if down",dir: "right" },
  { task: "send report",    dir: "right" },
  { task: "done",           dir: "down" },
]);`,
    solutionCode: `function sysadmin(tasks) {
  for (const task of tasks) {
    hero.move(task.dir);
  }
}

sysadmin([
  { task: "check disk",      dir: "right" },
  { task: "find logs",       dir: "right" },
  { task: "compress old",    dir: "right" },
  { task: "check procs",     dir: "down" },
  { task: "restart if down", dir: "right" },
  { task: "send report",     dir: "right" },
  { task: "done",            dir: "down" },
]);`,
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
    tip: "Linux fluency is a force multiplier for every other dev skill. Practice daily in a terminal.",
  },
];
