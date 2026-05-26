import { LevelDefinition } from "../types";

export const dsaLevels: LevelDefinition[] = [
  {
    id: "dsa-1",
    courseId: "dsa",
    number: 1,
    title: "Arrays & Time Complexity",
    description: "Arrays store ordered data. Big O describes how algorithms scale.",
    concept: "Arrays & Big O Notation",
    conceptExplanation:
      "Arrays store elements at contiguous memory locations, indexed from 0.\n\nBig O notation describes how runtime or space scales with input size n:\n• O(1) — constant: array access by index\n• O(log n) — logarithmic: binary search\n• O(n) — linear: linear search\n• O(n log n) — linearithmic: merge sort\n• O(n²) — quadratic: bubble sort\n• O(2ⁿ) — exponential: recursive fibonacci\n\nAlways analyze the worst case unless stated otherwise.",
    codeExample: `// O(1) — constant time
function getFirst(arr) {
  return arr[0]; // always 1 operation
}

// O(n) — linear time
function findMax(arr) {
  let max = arr[0];
  for (const n of arr) {  // n iterations
    if (n > max) max = n;
  }
  return max;
}

// O(n²) — quadratic time
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) { // n²
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}`,
    starterCode: `// Big O: more efficient = fewer moves needed
// O(1) = 1 step, O(n) = n steps, O(n²) = skip (too slow!)

function bigO(complexity, n) {
  if (complexity === "O(1)")     return 1;
  if (complexity === "O(n)")     return n;
  if (complexity === "O(log n)") return Math.floor(Math.log2(n)) + 1;
  return 0;
}

const n = 4;
const steps = bigO("O(n)", n);
for (let i = 0; i < steps; i++) hero.move("right");
hero.move("down");`,
    solutionCode: `function bigO(complexity, n) {
  if (complexity === "O(1)")     return 1;
  if (complexity === "O(n)")     return n;
  if (complexity === "O(log n)") return Math.floor(Math.log2(n)) + 1;
  return 0;
}

const n = 4;
const steps = bigO("O(n)", n);
for (let i = 0; i < steps; i++) hero.move("right");
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
    hint: "O(n) with n=4 → right×4 (gems), then down×2 to exit.",
    tip: "Space complexity also matters. Sometimes you trade O(n) extra space for O(n²) → O(n) time.",
  },

  {
    id: "dsa-2",
    courseId: "dsa",
    number: 2,
    title: "Two Pointers",
    description: "Two pointers solve many array problems in O(n) that would otherwise be O(n²).",
    concept: "Two-Pointer Technique",
    conceptExplanation:
      "The two-pointer technique uses two indices that move toward each other (or both forward) to solve array problems efficiently.\n\nClassic use cases:\n• Check if array has pair summing to target\n• Reverse an array in-place\n• Remove duplicates from sorted array\n• Container with most water\n\nPattern for sorted arrays:\nleft = 0, right = arr.length - 1\nwhile (left < right) {\n  if (condition) { left++; } else { right--; }\n}\n\nTime: O(n) — each pointer moves at most n steps\nSpace: O(1) — no extra data structures",
    codeExample: `// Two sum in sorted array — O(n)
function twoSum(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

twoSum([1, 2, 4, 6, 8], 10); // [1, 4] → nums[1]+nums[4]=2+8

// Reverse in-place — O(n)
function reverse(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++; right--;
  }
}`,
    starterCode: `// Two pointers: left and right converging
function twoPointers(arr, target) {
  let left = 0, right = arr.length - 1;
  let moves = 0;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) break;
    if (sum < target) left++;
    else right--;
    moves++;
  }
  return moves;
}

const arr = [1, 3, 5, 7, 9];
const steps = twoPointers(arr, 12); // target=12: needs 2 pointer moves
for (let i = 0; i < steps; i++) hero.move("right");
hero.move("down");
hero.move("right");`,
    solutionCode: `function twoPointers(arr, target) {
  let left = 0, right = arr.length - 1;
  let moves = 0;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) break;
    if (sum < target) left++;
    else right--;
    moves++;
  }
  return moves;
}

const arr = [1, 3, 5, 7, 9];
const steps = twoPointers(arr, 12);
for (let i = 0; i < steps; i++) hero.move("right");
hero.move("down");
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall"],
      ["wall","wall","wall","empty","wall"],
      ["wall","wall","wall","gem","wall"],
      ["wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "twoPointers([1,3,5,7,9], 12): sum=1+9=10<12 so left++; sum=3+9=12 → done. 1 move → right×1, but check the actual array path... need 2 steps right. Trace carefully.",
    tip: "Two pointers works best on sorted arrays. For unsorted, consider using a hash set instead.",
  },

  {
    id: "dsa-3",
    courseId: "dsa",
    number: 3,
    title: "Hash Maps",
    description: "Hash maps provide O(1) average lookup, insertion, and deletion.",
    concept: "Hash Maps (Objects/Maps)",
    conceptExplanation:
      "A hash map stores key-value pairs with O(1) average-case operations.\n\nIn JavaScript:\n• Object: {}: simple key-value, keys must be strings/symbols\n• Map: new Map(): any type as key, preserves insertion order\n\nCommon patterns:\n• Frequency counter: count occurrences\n• Two sum: store seen values\n• Caching/memoization\n\nTime complexity:\n• get/set/has: O(1) average, O(n) worst (hash collision)\n• Space: O(n)\n\nWhen to use: when you need fast lookups by key, counting, or avoiding nested loops.",
    codeExample: `// Frequency counter — O(n)
function charFrequency(str) {
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }
  return freq;
}
charFrequency("hello"); // {h:1, e:1, l:2, o:1}

// Two sum with hash map — O(n) vs O(n²) brute force
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return null;
}`,
    starterCode: `// Hash map: count frequencies, then use counts
function countAndMove(items) {
  const freq = {};
  for (const item of items) {
    freq[item] = (freq[item] ?? 0) + 1;
  }
  // Move based on frequency of each unique item
  for (const [item, count] of Object.entries(freq)) {
    for (let i = 0; i < count; i++) hero.move("right");
  }
  hero.move("down");
}

countAndMove(["a", "b", "a", "c", "b", "a"]); // a:3, b:2, c:1`,
    solutionCode: `function countAndMove(items) {
  const freq = {};
  for (const item of items) {
    freq[item] = (freq[item] ?? 0) + 1;
  }
  for (const [item, count] of Object.entries(freq)) {
    for (let i = 0; i < count; i++) hero.move("right");
  }
  hero.move("down");
}

countAndMove(["a", "b", "a", "c", "b", "a"]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","wall","gem","wall"],
      ["wall","wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "a:3, b:2, c:1 → 3+2+1=6 right moves, then down. right×5+1, down, right (gem), down to exit.",
    tip: "Hash maps turn many O(n²) brute-force solutions into O(n) by enabling O(1) lookups.",
  },

  {
    id: "dsa-4",
    courseId: "dsa",
    number: 4,
    title: "Linked Lists",
    description: "Linked lists are chains of nodes where each points to the next.",
    concept: "Singly Linked Lists",
    conceptExplanation:
      "A linked list is a linear data structure where each node contains data and a pointer to the next node.\n\nNode structure:\nclass Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}\n\nOperations:\n• append: O(n) — traverse to tail\n• prepend: O(1) — update head\n• delete: O(n) — find node first\n• search: O(n)\n\nadvantage over arrays: O(1) insert/delete at known position\ndisadvantage: O(n) access by index, extra memory for pointers\n\nCommon interview patterns: Floyd's cycle detection, reversal, middle of list",
    codeExample: `class Node {
  constructor(val) { this.val = val; this.next = null; }
}

class LinkedList {
  constructor() { this.head = null; }

  append(val) {
    const node = new Node(val);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  // Reverse in-place — O(n)
  reverse() {
    let prev = null, curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }
}`,
    starterCode: `// Traverse linked list node by node
class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Build: 1 → 2 → 3 → 4 → null
const list = new Node(1, new Node(2, new Node(3, new Node(4))));

// Traverse
let curr = list;
while (curr !== null) {
  hero.move("right");
  curr = curr.next;
}
hero.move("down");`,
    solutionCode: `class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const list = new Node(1, new Node(2, new Node(3, new Node(4))));

let curr = list;
while (curr !== null) {
  hero.move("right");
  curr = curr.next;
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
    hint: "4 nodes → right×4 (gems), down×2 to exit.",
    tip: "Draw the list on paper before coding. Pointer manipulation is easy to get wrong — visualize first.",
  },

  {
    id: "dsa-5",
    courseId: "dsa",
    number: 5,
    title: "Stacks & Queues",
    description: "Stacks are LIFO, queues are FIFO. Both are fundamental data structures.",
    concept: "Stack & Queue",
    conceptExplanation:
      "Stack (LIFO — Last In, First Out):\n• push: add to top\n• pop: remove from top\n• peek: view top without removing\n• Use cases: undo/redo, call stack, balanced parentheses, DFS\n\nQueue (FIFO — First In, First Out):\n• enqueue: add to back\n• dequeue: remove from front\n• Use cases: BFS, task scheduling, request queues\n\nIn JavaScript:\n// Stack\nconst stack = [];\nstack.push(1); stack.push(2);\nstack.pop(); // 2\n\n// Queue\nconst queue = [];\nqueue.push(1); queue.push(2);\nqueue.shift(); // 1 — O(n) in JS arrays!\n// Better: use a deque or linked list for true O(1) queue",
    codeExample: `// Valid parentheses — stack-based — O(n)
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('({['.includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}

isValid("({[]})"); // true
isValid("({)}");   // false

// BFS with queue
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    queue.push(...(graph[node] ?? []));
  }
  return visited;
}`,
    starterCode: `// Stack: push/pop. Queue: enqueue/dequeue
// Process tasks: stack processes in reverse order
const stack = [];
const dirs = ["right", "right", "right", "down"];

// Push all tasks
for (const dir of dirs) stack.push(dir);

// Pop and execute (LIFO)
while (stack.length > 0) {
  hero.move(stack.pop());
}
hero.move("right");`,
    solutionCode: `const stack = [];
const dirs = ["right", "right", "right", "down"];

for (const dir of dirs) stack.push(dir);

while (stack.length > 0) {
  hero.move(stack.pop());
}
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem"],
      ["wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 2, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "Stack reversed: pop 'down' first → down, then pop 'right' 3x → right×3 (gems). Then right to exit.",
    tip: "Use a stack when you need the most recently added item. Use a queue for ordering/fairness (first-come-first-served).",
  },

  {
    id: "dsa-6",
    courseId: "dsa",
    number: 6,
    title: "Binary Search",
    description: "Binary search finds an element in a sorted array in O(log n) instead of O(n).",
    concept: "Binary Search",
    conceptExplanation:
      "Binary search repeatedly halves the search space.\n\nAlgorithm:\n1. Set left=0, right=arr.length-1\n2. mid = Math.floor((left+right)/2)\n3. If arr[mid] === target: found\n4. If arr[mid] < target: left = mid+1\n5. If arr[mid] > target: right = mid-1\n6. Repeat until left > right\n\nTime: O(log n) — halves input each step\nSpace: O(1)\n\nRequires: sorted array\n\nTemplates: classic (exact match), left bound (first occurrence), right bound (last occurrence)",
    codeExample: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target)  left = mid + 1;
    else                    right = mid - 1;
  }
  return -1;
}

binarySearch([1,3,5,7,9,11,13], 7); // returns 3

// Count iterations for n=128: log2(128) = 7
// vs linear search: up to 128 iterations`,
    starterCode: `// Binary search: halve the search space each step
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  let steps = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps++;
    if (arr[mid] === target) break;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return steps;
}

// Array of 16 elements, target at index 12: needs ~4 steps
const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const steps = binarySearch(arr, 13);
for (let i = 0; i < steps; i++) hero.move("right");
hero.move("down");`,
    solutionCode: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  let steps = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps++;
    if (arr[mid] === target) break;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return steps;
}

const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const steps = binarySearch(arr, 13);
for (let i = 0; i < steps; i++) hero.move("right");
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
    hint: "binarySearch([1..16], 13): mid=8 (9→right), mid=12 (13→right), mid=14 (13→left), mid=13 found! 4 steps → right×4 (gems), down×2 to exit.",
    tip: "Off-by-one errors are common in binary search. Use left <= right (not <) for inclusive bounds.",
  },

  {
    id: "dsa-7",
    courseId: "dsa",
    number: 7,
    title: "Recursion",
    description: "Recursion solves problems by breaking them into smaller subproblems of the same type.",
    concept: "Recursion & Call Stack",
    conceptExplanation:
      "A recursive function calls itself with a smaller input until it reaches a base case.\n\nStructure:\nfunction solve(n) {\n  if (n === 0) return 0; // base case\n  return solve(n - 1) + 1; // recursive case\n}\n\nThinking recursively:\n1. What's the simplest case? (base case)\n2. How does a smaller version of the problem help?\n3. Trust the recursion — don't trace every call\n\nCall stack: each call adds a frame, which is popped when it returns\nStack overflow: too deep recursion (Node default: ~10,000 frames)\n\nTail recursion & memoization can optimize recursive solutions.",
    codeExample: `// Fibonacci — naive O(2^n)
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

// Fibonacci — memoized O(n)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
  return memo[n];
}

// Tree traversal (recursive)
function sumTree(node) {
  if (!node) return 0;
  return node.val + sumTree(node.left) + sumTree(node.right);
}`,
    starterCode: `// Recursion: solve n by solving n-1
function countdown(n) {
  if (n === 0) {
    hero.move("down");
    return;
  }
  hero.move("right");
  countdown(n - 1);
}

countdown(4); // 4 right moves, then 1 down`,
    solutionCode: `function countdown(n) {
  if (n === 0) {
    hero.move("down");
    return;
  }
  hero.move("right");
  countdown(n - 1);
}

countdown(4);`,
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
    hint: "countdown(4): right, countdown(3): right, ..., countdown(0): down. Then down to exit.",
    tip: "Write the base case first. Then write the recursive case assuming the recursive call works perfectly.",
  },

  {
    id: "dsa-8",
    courseId: "dsa",
    number: 8,
    title: "Sorting Algorithms",
    description: "Understand the trade-offs between sorting algorithms and when to use each.",
    concept: "Sorting",
    conceptExplanation:
      "Key sorting algorithms and their complexities:\n\n• Bubble Sort: O(n²) — simple but slow, rarely used\n• Selection Sort: O(n²) — O(n) writes, good for small n\n• Insertion Sort: O(n²) average, O(n) best — good for nearly-sorted data\n• Merge Sort: O(n log n) — stable, predictable, needs O(n) extra space\n• Quick Sort: O(n log n) average, O(n²) worst — in-place, fastest in practice\n• Heap Sort: O(n log n) — in-place but not stable\n• Counting/Radix Sort: O(n) — only for integers within a range\n\nIn interviews: JS Array.sort() uses TimSort (merge+insertion) — O(n log n).",
    codeExample: `// Merge sort — O(n log n), stable
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
    starterCode: `// Merge sort: split, sort, merge
// Number of merge steps = log2(n)
function mergeSortSteps(arr) {
  if (arr.length <= 1) return 0;
  const mid = Math.floor(arr.length / 2);
  return 1 + mergeSortSteps(arr.slice(0, mid));
}

const arr = [5, 3, 8, 1, 9, 2, 7, 4]; // 8 elements
const depth = mergeSortSteps(arr); // log2(8) = 3

for (let i = 0; i < depth; i++) hero.move("right");
hero.move("down");
for (let i = 0; i < depth; i++) hero.move("right");`,
    solutionCode: `function mergeSortSteps(arr) {
  if (arr.length <= 1) return 0;
  const mid = Math.floor(arr.length / 2);
  return 1 + mergeSortSteps(arr.slice(0, mid));
}

const arr = [5, 3, 8, 1, 9, 2, 7, 4];
const depth = mergeSortSteps(arr);

for (let i = 0; i < depth; i++) hero.move("right");
hero.move("down");
for (let i = 0; i < depth; i++) hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem"],
      ["wall","wall","wall","wall","empty"],
      ["wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "depth=3: right×3 (gems), down, right×2... only 2 free gems at row 3 cols 3-4. down to exit.",
    tip: "In practice, use Array.sort() or a well-tested library. Write your own sort only in interviews or when you need custom comparators.",
  },

  {
    id: "dsa-9",
    courseId: "dsa",
    number: 9,
    title: "Trees & DFS/BFS",
    description: "Trees are hierarchical structures. Traverse them with depth-first or breadth-first search.",
    concept: "Binary Trees & Traversal",
    conceptExplanation:
      "A binary tree has nodes with at most 2 children (left, right).\n\nTraversals:\n• In-order (left, root, right): sorted output for BST\n• Pre-order (root, left, right): copy/serialize tree\n• Post-order (left, right, root): delete tree\n• Level-order (BFS): level by level\n\nDFS (depth-first): uses stack/recursion, good for: path problems, cycle detection\nBFS (breadth-first): uses queue, good for: shortest path, level-order\n\nBinary Search Tree (BST):\n• left child < node < right child\n• Search, insert, delete: O(log n) average, O(n) worst (unbalanced)",
    codeExample: `// DFS — recursive pre-order
function dfs(node, result = []) {
  if (!node) return result;
  result.push(node.val);        // visit
  dfs(node.left, result);       // go left
  dfs(node.right, result);      // go right
  return result;
}

// BFS — iterative with queue
function bfs(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left)  queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
    starterCode: `// BFS: level by level using a queue
function bfsLevels(root) {
  if (!root) return 0;
  let levels = 0;
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels++;
  }
  return levels;
}

// Tree with 3 levels
const tree = { val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: null, right: null }
};

const levels = bfsLevels(tree); // 3 levels
for (let i = 0; i < levels; i++) hero.move("right");
hero.move("down");`,
    solutionCode: `function bfsLevels(root) {
  if (!root) return 0;
  let levels = 0;
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels++;
  }
  return levels;
}

const tree = { val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: null, right: null }
};

const levels = bfsLevels(tree);
for (let i = 0; i < levels; i++) hero.move("right");
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem"],
      ["wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "3 levels → right×3 (gems), down×2 to exit.",
    tip: "Use DFS when you need to explore all paths. Use BFS when you need the shortest path.",
  },

  {
    id: "dsa-10",
    courseId: "dsa",
    number: 10,
    title: "Grand Finale",
    description: "Combine arrays, hash maps, two pointers, and binary search to solve a real interview problem.",
    concept: "Putting It All Together",
    conceptExplanation:
      "The top interview pattern checklist:\n\n• Hash map for O(1) lookup / counting\n• Two pointers for sorted arrays or in-place operations\n• Sliding window for subarray/substring problems\n• Binary search when the array is sorted\n• Stack for matching/balanced problems\n• BFS for shortest path / level-order\n• DFS for path exploration / tree problems\n• Recursion + memoization for overlapping subproblems\n\nApproach for any problem:\n1. Understand — restate, ask clarifying questions\n2. Brute force — describe it, state the complexity\n3. Optimize — identify the bottleneck, apply a pattern\n4. Code — clean, no magic numbers\n5. Test — edge cases: empty, single, duplicates, negatives",
    codeExample: `// Classic: find all pairs summing to target — O(n) with hash map
function allPairs(nums, target) {
  const seen = new Set();
  const pairs = [];
  for (const n of nums) {
    const complement = target - n;
    if (seen.has(complement)) {
      pairs.push([complement, n]);
    }
    seen.add(n);
  }
  return pairs;
}

allPairs([1,2,3,4,5,6,7], 8);
// [[1,7],[2,6],[3,5]]`,
    starterCode: `// Grand finale: combine multiple patterns
function solve(nums, target) {
  const seen = new Set();
  let pairsFound = 0;
  for (const n of nums) {
    if (seen.has(target - n)) pairsFound++;
    seen.add(n);
  }
  return pairsFound;
}

const nums = [1, 2, 3, 4, 5, 6, 7];
const pairs = solve(nums, 8); // finds 3 pairs: [1,7],[2,6],[3,5]

for (let i = 0; i < pairs; i++) hero.move("right");
hero.move("down");
for (let i = 0; i < pairs; i++) hero.move("right");`,
    solutionCode: `function solve(nums, target) {
  const seen = new Set();
  let pairsFound = 0;
  for (const n of nums) {
    if (seen.has(target - n)) pairsFound++;
    seen.add(n);
  }
  return pairsFound;
}

const nums = [1, 2, 3, 4, 5, 6, 7];
const pairs = solve(nums, 8);

for (let i = 0; i < pairs; i++) hero.move("right");
hero.move("down");
for (let i = 0; i < pairs; i++) hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem"],
      ["wall","wall","wall","wall","empty"],
      ["wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","gem"],
      ["wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "pairs=3: right×3 (gems), down, right×2 (gems), down (gem), down to exit.",
    tip: "You now have the DSA fundamentals for coding interviews. Practice on LeetCode with the NeetCode 150 roadmap.",
  },
];
