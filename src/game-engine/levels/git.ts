import { LevelDefinition } from "../types";

export const gitLevels: LevelDefinition[] = [
  {
    id: "git-1",
    courseId: "git-github",
    number: 1,
    title: "git init & git status",
    description: "Every Git project starts with git init. Use status to see what's changed.",
    concept: "Initialising a Repository",
    conceptExplanation:
      "Git tracks changes to files in a repository.\n\ngit init — creates a .git folder in the current directory, starting tracking.\ngit status — shows the state of the working tree:\n• Untracked files: not yet added to Git\n• Staged changes: added but not yet committed\n• Modified files: changed since last commit\n\nWorkflow: edit → stage → commit → push",
    codeExample: `$ mkdir my-project && cd my-project
$ git init
Initialized empty Git repository in .git/

$ echo "Hello" > README.md
$ git status
On branch main
Untracked files:
  README.md`,
    starterCode: `// git init starts a repo; git status shows state
// Initialise the dungeon run
function gitInit() {
  hero.move("right");
}
function gitStatus() {
  hero.move("right");
}
function checkUntracked() {
  hero.move("down");
}

gitInit();
gitStatus();
checkUntracked();`,
    solutionCode: `function gitInit() {
  hero.move("right");
}
function gitStatus() {
  hero.move("right");
}
function checkUntracked() {
  hero.move("down");
}

gitInit();
gitStatus();
checkUntracked();`,
    grid: [
      ["wall","wall","wall","wall"],
      ["wall","hero","gem","wall"],
      ["wall","wall","gem","wall"],
      ["wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect both 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right to first gem, right again to second gem, then down to exit.",
    tip: "Run git status before every commit — it's your safety check before making changes permanent.",
  },

  {
    id: "git-2",
    courseId: "git-github",
    number: 2,
    title: "git add & git commit",
    description: "Stage changes with git add, then save a snapshot with git commit.",
    concept: "Staging & Committing",
    conceptExplanation:
      "Git has a two-step save process:\n\n1. Stage: git add <file> (or git add . for all)\n   Moves changes to the staging area (index)\n\n2. Commit: git commit -m \"message\"\n   Saves a permanent snapshot of staged changes\n\nGood commit messages:\n• Present tense: 'Add login form' not 'Added login form'\n• Describe why, not what (the diff shows what)\n• Keep the subject line under 72 characters",
    codeExample: `# Stage specific file
$ git add src/app.js

# Stage all changes
$ git add .

# Commit with message
$ git commit -m "Add user authentication"

# Stage + commit in one step (tracked files only)
$ git commit -am "Fix typo in README"`,
    starterCode: `// Staging is like packing a box before shipping
// add = pack items, commit = seal and label the box
function gitAdd(files) {
  for (let i = 0; i < files; i++) {
    hero.move("right");
  }
}
function gitCommit() {
  hero.move("down");
  hero.move("right");
}

gitAdd(3); // stage 3 files
gitCommit();`,
    solutionCode: `function gitAdd(files) {
  for (let i = 0; i < files; i++) {
    hero.move("right");
  }
}
function gitCommit() {
  hero.move("down");
  hero.move("right");
}

gitAdd(3);
gitCommit();`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","gem","wall"],
      ["wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Move right 3 times collecting gems, then down, then right to exit... wait — check the grid layout carefully.",
    tip: "Commit often. Small, focused commits are easier to understand, revert, and review than large dumps.",
  },

  {
    id: "git-3",
    courseId: "git-github",
    number: 3,
    title: "git log & git diff",
    description: "Inspect history with git log and see what changed with git diff.",
    concept: "Viewing History",
    conceptExplanation:
      "git log — shows the commit history:\n• git log --oneline — compact format\n• git log --graph --decorate — branch graph\n• git log -p — show diffs with each commit\n\ngit diff — shows unstaged changes vs last commit\ngit diff --staged — shows staged changes vs last commit\ngit diff HEAD~1 — compare with previous commit\ngit show <hash> — show a specific commit",
    codeExample: `$ git log --oneline
a1b2c3d Add authentication
e4f5g6h Fix bug in payment flow
i7j8k9l Initial commit

$ git diff
diff --git a/src/app.js b/src/app.js
index 1234567..abcdefg 100644
--- a/src/app.js
+++ b/src/app.js
@@ -10,3 +10,4 @@
+  console.log('hello');`,
    starterCode: `// git log: read history forward (oldest to newest)
// git diff: compare current vs committed
const commits = [
  { hash: "i7j8k9l", msg: "Initial commit",        dir: "right" },
  { hash: "e4f5g6h", msg: "Fix bug",                dir: "right" },
  { hash: "a1b2c3d", msg: "Add authentication",     dir: "down" },
];

for (const commit of commits) {
  hero.move(commit.dir);
}
hero.move("right");
hero.move("right");`,
    solutionCode: `const commits = [
  { hash: "i7j8k9l", msg: "Initial commit",    dir: "right" },
  { hash: "e4f5g6h", msg: "Fix bug",            dir: "right" },
  { hash: "a1b2c3d", msg: "Add authentication", dir: "down" },
];

for (const commit of commits) {
  hero.move(commit.dir);
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
    hint: "right×2 collecting gems, down, right×2 more gems, right to exit.",
    tip: "git log --oneline --graph --all is the most useful one-liner — alias it to 'git lg'.",
  },

  {
    id: "git-4",
    courseId: "git-github",
    number: 4,
    title: "Branching",
    description: "Branches let you work on features independently without affecting main.",
    concept: "Git Branches",
    conceptExplanation:
      "Branches are independent lines of development.\n\ngit branch <name> — create a branch\ngit checkout <name> — switch to branch\ngit checkout -b <name> — create and switch\ngit branch — list all branches\ngit branch -d <name> — delete branch\n\nMain/master is the default primary branch.\nFeature branches isolate work until it's ready to merge.\nConvention: feature/login, fix/payment-bug, chore/update-deps",
    codeExample: `# Create and switch to feature branch
$ git checkout -b feature/user-profile

# Work, add, commit...
$ git add .
$ git commit -m "Add user profile page"

# Switch back to main
$ git checkout main

# List all branches
$ git branch
* main
  feature/user-profile`,
    starterCode: `// Branches: parallel paths of development
function checkout(branch) {
  if (branch === "main") return;
  if (branch === "feature/auth") hero.move("right");
  if (branch === "feature/ui")   hero.move("down");
}

checkout("feature/auth");
for (let i = 0; i < 3; i++) hero.move("right");
checkout("feature/ui");
for (let i = 0; i < 2; i++) hero.move("down");`,
    solutionCode: `function checkout(branch) {
  if (branch === "main") return;
  if (branch === "feature/auth") hero.move("right");
  if (branch === "feature/ui")   hero.move("down");
}

checkout("feature/auth");
for (let i = 0; i < 3; i++) hero.move("right");
checkout("feature/ui");
for (let i = 0; i < 2; i++) hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×4 (3 gems), down×3 (2 gems), down to exit.",
    tip: "Name branches descriptively: type/description. Delete merged branches to keep the repo clean.",
  },

  {
    id: "git-5",
    courseId: "git-github",
    number: 5,
    title: "Merging",
    description: "Merge integrates changes from one branch into another.",
    concept: "git merge",
    conceptExplanation:
      "git merge <branch> — integrates commits from another branch.\n\nFast-forward merge: when main hasn't diverged, Git just moves the pointer forward. No merge commit.\n\nThree-way merge: when both branches have new commits, Git creates a merge commit that combines both histories.\n\ngit merge --no-ff <branch> — always creates a merge commit (shows branch history clearly)\n\nMerge conflicts: when the same lines were changed in both branches, Git can't auto-merge — you must resolve manually.",
    codeExample: `# On main branch
$ git merge feature/user-profile
Updating a1b2c3d..d4e5f6g
Fast-forward
  src/profile.js | 45 ++++++++++++++++

# Three-way merge
$ git merge feature/auth
Merge made by the 'recursive' strategy.
  src/auth.js | 80 ++++++++++`,
    starterCode: `// Merge: combine two branch paths into one
function merge(sourceBranch, moves) {
  for (const [dir, steps] of moves) {
    for (let i = 0; i < steps; i++) hero.move(dir);
  }
}

// Merging feature/auth into main
merge("feature/auth", [
  ["right", 2],
  ["down", 1],
  ["right", 3],
]);`,
    solutionCode: `function merge(sourceBranch, moves) {
  for (const [dir, steps] of moves) {
    for (let i = 0; i < steps; i++) hero.move(dir);
  }
}

merge("feature/auth", [
  ["right", 2],
  ["down", 1],
  ["right", 3],
]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","wall","wall","wall"],
      ["wall","wall","gem","wall","wall","wall"],
      ["wall","wall","gem","gem","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right to gem, down to gem, right 3 collecting 3 more gems, then exit.",
    tip: "Prefer --no-ff merges on long-lived feature branches — the merge commit documents when the feature landed.",
  },

  {
    id: "git-6",
    courseId: "git-github",
    number: 6,
    title: "GitHub: Remote & Push",
    description: "Push your local commits to a remote repository on GitHub.",
    concept: "Remote Repositories",
    conceptExplanation:
      "Remote repositories live on servers (GitHub, GitLab, etc.) and enable collaboration.\n\ngit remote add origin <url> — add a remote\ngit remote -v — list remotes\ngit push origin main — push branch to remote\ngit push -u origin main — push and track upstream\ngit pull origin main — fetch + merge remote changes\ngit fetch origin — download without merging",
    codeExample: `# Add GitHub remote
$ git remote add origin https://github.com/user/repo.git

# Push for first time (set upstream)
$ git push -u origin main

# Subsequent pushes (shorthand)
$ git push

# Pull latest from remote
$ git pull`,
    starterCode: `// Push: local → remote. Pull: remote → local
const workflow = [
  { step: "git add",    dir: "right" },
  { step: "git commit", dir: "right" },
  { step: "git push",   dir: "right" },
  { step: "confirmed",  dir: "down" },
  { step: "git pull",   dir: "right" },
];

for (const w of workflow) {
  hero.move(w.dir);
}`,
    solutionCode: `const workflow = [
  { step: "git add",    dir: "right" },
  { step: "git commit", dir: "right" },
  { step: "git push",   dir: "right" },
  { step: "confirmed",  dir: "down" },
  { step: "git pull",   dir: "right" },
];

for (const w of workflow) {
  hero.move(w.dir);
}`,
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
    tip: "Always pull before you push in a shared repo — it prevents rejected pushes and merge conflicts.",
  },

  {
    id: "git-7",
    courseId: "git-github",
    number: 7,
    title: "Pull Requests",
    description: "Pull Requests (PRs) are how you propose and review code changes on GitHub.",
    concept: "GitHub Pull Requests",
    conceptExplanation:
      "A Pull Request (PR) asks to merge your branch into another branch.\n\nPR workflow:\n1. Push a feature branch: git push origin feature/login\n2. Open a PR on GitHub (base: main ← compare: feature/login)\n3. Add a description, screenshots, checklist\n4. Reviewers leave comments\n5. You address feedback and push new commits\n6. Reviewer approves → Merge\n7. Delete the feature branch\n\nGood PRs are small and focused — easier to review, less risky to merge.",
    codeExample: `# Push feature branch
$ git push origin feature/add-auth

# Then on GitHub:
# 1. Click "Compare & pull request"
# 2. Fill in title and description
# 3. Assign reviewers
# 4. Submit PR

# After approval and merge on GitHub:
$ git checkout main
$ git pull
$ git branch -d feature/add-auth`,
    starterCode: `// PR lifecycle: push → open PR → review → merge
const prSteps = [
  { step: "push branch",    moves: [["right", 2]] },
  { step: "open PR",        moves: [["down",  1]] },
  { step: "review",         moves: [["right", 2]] },
  { step: "address review", moves: [["down",  1]] },
  { step: "merge",          moves: [["right", 1]] },
];

for (const pr of prSteps) {
  for (const [dir, steps] of pr.moves) {
    for (let i = 0; i < steps; i++) hero.move(dir);
  }
}`,
    solutionCode: `const prSteps = [
  { step: "push branch",    moves: [["right", 2]] },
  { step: "open PR",        moves: [["down",  1]] },
  { step: "review",         moves: [["right", 2]] },
  { step: "address review", moves: [["down",  1]] },
  { step: "merge",          moves: [["right", 1]] },
];

for (const pr of prSteps) {
  for (const [dir, steps] of pr.moves) {
    for (let i = 0; i < steps; i++) hero.move(dir);
  }
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","empty","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
      ["wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gem), down, right×2 (gems), down, right (gem), down+exit.",
    tip: "PRs smaller than 400 lines of change get reviewed thoroughly. Larger PRs often get rubber-stamped.",
  },

  {
    id: "git-8",
    courseId: "git-github",
    number: 8,
    title: "Resolving Conflicts",
    description: "Conflicts happen when two branches edit the same lines. You resolve them manually.",
    concept: "Merge Conflicts",
    conceptExplanation:
      "A merge conflict occurs when Git can't auto-merge because the same lines differ between branches.\n\nGit marks the conflict:\n<<<<<<< HEAD\nyour current version\n=======\nthe incoming version\n>>>>>>> feature/login\n\nTo resolve:\n1. Open the conflicted file\n2. Decide which version (or combination) to keep\n3. Delete the markers\n4. git add <file>\n5. git commit\n\nTool: git mergetool opens a visual diff tool.",
    codeExample: `# After a conflicting merge:
<<<<<<< HEAD
const API_URL = "https://api.production.com";
=======
const API_URL = "https://api.staging.com";
>>>>>>> feature/staging

# Resolved (keep production):
const API_URL = "https://api.production.com";

$ git add src/config.js
$ git commit -m "Resolve merge conflict in config"`,
    starterCode: `// Conflict resolution: pick the right version
const conflictMarkers = [
  { marker: "<<<<<<< HEAD", resolution: "keep-mine", dir: "right" },
  { marker: "=======",      resolution: "evaluate",  dir: "right" },
  { marker: ">>>>>>> feat", resolution: "keep-mine", dir: "down" },
];

for (const c of conflictMarkers) {
  hero.move(c.dir);
}
hero.move("right");
hero.move("right");`,
    solutionCode: `const conflictMarkers = [
  { marker: "<<<<<<< HEAD", resolution: "keep-mine", dir: "right" },
  { marker: "=======",      resolution: "evaluate",  dir: "right" },
  { marker: ">>>>>>> feat", resolution: "keep-mine", dir: "down" },
];

for (const c of conflictMarkers) {
  hero.move(c.dir);
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
    hint: "right×2 (gems), down, right×2 (gems), exit is at col 5.",
    tip: "Avoid long-lived branches — the longer a branch diverges, the worse the conflict. Merge main frequently.",
  },

  {
    id: "git-9",
    courseId: "git-github",
    number: 9,
    title: "git rebase",
    description: "Rebase rewrites commit history by replaying commits on top of another branch.",
    concept: "Rebasing",
    conceptExplanation:
      "git rebase <branch> replays your commits on top of another branch's tip.\n\nMerge vs Rebase:\n• merge: preserves history, adds a merge commit\n• rebase: linear history, no merge commit\n\nInteractive rebase (git rebase -i HEAD~3):\n• pick — keep commit\n• squash/fixup — combine commits\n• reword — edit commit message\n• drop — remove commit\n\nGolden rule: never rebase public/shared branches (main, develop). Only rebase your local feature branches.",
    codeExample: `# Update feature branch with latest main
$ git checkout feature/login
$ git rebase main

# Interactive rebase: clean up last 3 commits
$ git rebase -i HEAD~3

# In editor:
pick a1b2c3d Add login form
squash e4f5g6h Fix typo
reword i7j8k9l Add password validation`,
    starterCode: `// Rebase: replay commits on a new base
// 3 commits to replay, then linear path to merge
const rebaseCommits = ["feat: form UI", "fix: validation", "chore: tests"];

for (const commit of rebaseCommits) {
  hero.move("right");
}
hero.move("down");
for (let i = 0; i < 3; i++) hero.move("right");`,
    solutionCode: `const rebaseCommits = ["feat: form UI", "fix: validation", "chore: tests"];

for (const commit of rebaseCommits) {
  hero.move("right");
}
hero.move("down");
for (let i = 0; i < 3; i++) hero.move("right");`,
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
    hint: "right×2 (gems), down, right×3 (gems+exit at col 5).",
    tip: "git rebase -i is one of Git's most powerful tools — use it to squash 'wip' commits before merging.",
  },

  {
    id: "git-10",
    courseId: "git-github",
    number: 10,
    title: "Grand Finale",
    description: "Complete a full Git workflow from init to merged PR.",
    concept: "The Complete Git Workflow",
    conceptExplanation:
      "The professional Git workflow:\n1. git clone / git init\n2. git checkout -b feature/name\n3. Write code, git add, git commit often\n4. git fetch && git rebase origin/main (stay up-to-date)\n5. git push origin feature/name\n6. Open Pull Request on GitHub\n7. Address review comments, push fixes\n8. Squash/rebase if needed\n9. Merge PR → delete branch\n10. git pull on local main\n\nAlways: small commits, meaningful messages, short-lived branches.",
    codeExample: `# Full workflow in one script
git checkout -b feature/payment
# ... write code ...
git add src/payment.js tests/payment.test.js
git commit -m "Add Stripe payment integration"
git fetch origin
git rebase origin/main
git push -u origin feature/payment
# Open PR on GitHub, get reviewed, merge
git checkout main && git pull
git branch -d feature/payment`,
    starterCode: `// Complete Git workflow
const workflow = {
  init:    () => hero.move("right"),
  branch:  () => hero.move("right"),
  commit:  (n) => { for (let i = 0; i < n; i++) hero.move("right"); },
  rebase:  () => hero.move("down"),
  push:    () => hero.move("right"),
  openPR:  () => hero.move("right"),
  merge:   () => hero.move("down"),
  cleanup: () => hero.move("right"),
};

workflow.init();
workflow.branch();
workflow.commit(2);
workflow.rebase();
workflow.push();
workflow.openPR();
workflow.merge();
workflow.cleanup();`,
    solutionCode: `const workflow = {
  init:    () => hero.move("right"),
  branch:  () => hero.move("right"),
  commit:  (n) => { for (let i = 0; i < n; i++) hero.move("right"); },
  rebase:  () => hero.move("down"),
  push:    () => hero.move("right"),
  openPR:  () => hero.move("right"),
  merge:   () => hero.move("down"),
  cleanup: () => hero.move("right"),
};

workflow.init();
workflow.branch();
workflow.commit(2);
workflow.rebase();
workflow.push();
workflow.openPR();
workflow.merge();
workflow.cleanup();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","wall","exit"],
      ["wall","wall","wall","wall","wall","wall","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×5 (4 gems), down, right×2 (2 gems), down, right to exit.",
    tip: "You now know Git. Practice daily — muscle memory is everything. Contribute to open source on GitHub!",
  },
];
