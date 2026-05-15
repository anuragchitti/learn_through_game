import { Module } from "@/types";

// Full module content for JavaScript (Vanilla) — Beginner Level
export const javascriptBeginnerModules: Module[] = [
  {
    id: "js-b-1",
    courseId: "javascript",
    level: "beginner",
    order: 1,
    title: "What is JavaScript?",
    xpReward: 50,
    conceptCards: [
      {
        id: "js-b-1-c1",
        title: "JavaScript is the language of the web",
        content:
          "Every modern website you visit uses JavaScript. It's what makes buttons respond when you click them, forms validate as you type, and pages update without reloading. HTML builds the structure, CSS adds the style, and JavaScript adds the behaviour.",
        codeExample: `// A simple JavaScript example
document.getElementById("btn").addEventListener("click", function() {
  alert("You clicked the button!");
});`,
        language: "javascript",
        tip: "JavaScript runs directly in your browser — no installation needed to get started.",
      },
      {
        id: "js-b-1-c2",
        title: "Your first line of JavaScript",
        content:
          "The simplest way to see JavaScript in action is console.log(). It prints a message to the browser's developer console — think of it like a notebook where JavaScript writes its thoughts.",
        codeExample: `console.log("Hello, World!");
console.log(42);
console.log(true);`,
        language: "javascript",
        tip: "Open your browser's DevTools (F12) → Console tab to see console.log output.",
      },
    ],
    challenge: {
      id: "js-b-1-ch",
      type: "fill-blank",
      title: "Print your name",
      description:
        "Use console.log() to print the message: 'My name is Alex' to the console. Fill in the blank to complete the code.",
      starterCode: `___("My name is Alex");`,
      solution: `console.log("My name is Alex");`,
      blanks: ["console.log"],
      hints: [
        "The function that prints to the console starts with 'console'",
        "It's console dot something",
        "console.log() is the function you need",
      ],
      explanation:
        "console.log() is JavaScript's print statement. Anything you put inside the parentheses gets printed to the browser console. You'll use this constantly for debugging.",
    },
  },
  {
    id: "js-b-2",
    courseId: "javascript",
    level: "beginner",
    order: 2,
    title: "Variables — Storing Information",
    xpReward: 75,
    conceptCards: [
      {
        id: "js-b-2-c1",
        title: "What is a variable?",
        content:
          "A variable is a named container that holds a value. Imagine labelling a box — the label is the variable name, and whatever's inside is the value. In JavaScript, you create variables using let or const.",
        codeExample: `let age = 25;
const name = "Sarah";
let isStudent = true;

console.log(name); // Sarah
console.log(age);  // 25`,
        language: "javascript",
      },
      {
        id: "js-b-2-c2",
        title: "let vs const — what's the difference?",
        content:
          "Use const when the value will never change (like a person's birth year). Use let when the value might change (like a score in a game). There's also var, but modern JavaScript prefers let and const.",
        codeExample: `const birthYear = 1998; // never changes
let score = 0;         // will change as game progresses

score = score + 10;    // this works!
// birthYear = 2000;   // this would cause an error`,
        language: "javascript",
        tip: "Default to const. Switch to let only if you know the value will change.",
      },
    ],
    challenge: {
      id: "js-b-2-ch",
      type: "fix-bug",
      title: "Fix the broken variable",
      description:
        "This code tries to store a username and print it, but something is wrong. Find and fix the bug.",
      starterCode: `const username = "Jordan";
username = "Alex";
console.log(username);`,
      solution: `let username = "Jordan";
username = "Alex";
console.log(username);`,
      hints: [
        "Look at what keyword is used to declare username",
        "const means the value cannot be reassigned",
        "Change const to let to allow reassignment",
      ],
      explanation:
        "const prevents reassignment. Since username is being changed on line 2, it must be declared with let instead of const. This is one of the most common beginner mistakes in JavaScript.",
    },
  },
  {
    id: "js-b-3",
    courseId: "javascript",
    level: "beginner",
    order: 3,
    title: "Data Types — The Kinds of Values",
    xpReward: 75,
    conceptCards: [
      {
        id: "js-b-3-c1",
        title: "The basic data types",
        content:
          "JavaScript has a few fundamental types of values. Knowing which type you're working with matters because different types behave differently — you can add numbers, but you concatenate strings.",
        codeExample: `// String — text in quotes
let name = "Alice";

// Number — any number
let score = 100;
let price = 9.99;

// Boolean — true or false only
let isLoggedIn = true;

// Checking the type
console.log(typeof name);      // "string"
console.log(typeof score);     // "number"
console.log(typeof isLoggedIn);// "boolean"`,
        language: "javascript",
      },
    ],
    challenge: {
      id: "js-b-3-ch",
      type: "predict-output",
      title: "What will this print?",
      description:
        'Look at this code carefully and predict what gets printed. Think about what "+" does with a number and a string.',
      starterCode: `let x = 5;
let y = "10";
console.log(x + y);`,
      solution: `510`,
      options: ["15", "510", "5 + 10", "Error"],
      correctOption: 1,
      hints: [
        "What is the type of y?",
        'When you add a number to a string, JavaScript converts the number to a string first',
        '"5" + "10" would give you "510"',
      ],
      explanation:
        'This is called type coercion. When you use + with a number and a string, JavaScript converts the number to a string and concatenates them. 5 becomes "5", and "5" + "10" = "510". This is why knowing your data types matters!',
    },
  },
];

// Full module content for Python (Core) — Beginner Level
export const pythonBeginnerModules: Module[] = [
  {
    id: "py-b-1",
    courseId: "python",
    level: "beginner",
    order: 1,
    title: "What is Python?",
    xpReward: 50,
    conceptCards: [
      {
        id: "py-b-1-c1",
        title: "Python — readable by design",
        content:
          "Python was designed to be easy to read and write. Its syntax looks almost like plain English, which is why it's the #1 language for beginners. It's also used by NASA, Instagram, Spotify, and almost every AI company in the world.",
        codeExample: `# Your very first Python program
print("Hello, World!")

# Python reads almost like English
name = "Alex"
age = 25
print(f"My name is {name} and I am {age} years old.")`,
        language: "python",
        tip: "Python uses indentation (spaces/tabs) to structure code — no curly braces needed.",
      },
    ],
    challenge: {
      id: "py-b-1-ch",
      type: "fill-blank",
      title: "Say hello",
      description: "Complete the code to print 'Hello, Python!' to the screen.",
      starterCode: `___("Hello, Python!")`,
      solution: `print("Hello, Python!")`,
      blanks: ["print"],
      hints: [
        "Python's output function starts with 'p'",
        "It's a built-in function that displays text",
        "The function is print()",
      ],
      explanation:
        "print() is Python's way of displaying output. Anything inside the parentheses gets printed to the terminal. Unlike JavaScript's console.log(), Python's print() is shorter and simpler.",
    },
  },
  {
    id: "py-b-2",
    courseId: "python",
    level: "beginner",
    order: 2,
    title: "Variables in Python",
    xpReward: 75,
    conceptCards: [
      {
        id: "py-b-2-c1",
        title: "No keywords needed",
        content:
          "In Python, you don't need let, const, or var. You just write the variable name, an equals sign, and the value. Python figures out the type automatically.",
        codeExample: `name = "Jordan"     # string
age = 28            # integer
height = 5.9        # float (decimal)
is_student = True   # boolean

print(name)
print(type(age))    # <class 'int'>`,
        language: "python",
        tip: "Python variable names use snake_case (underscores) by convention, not camelCase.",
      },
    ],
    challenge: {
      id: "py-b-2-ch",
      type: "build-it",
      title: "Create your profile",
      description:
        "Create three variables: your_name (a string), your_age (a number), and your_city (a string). Then print them all on one line using an f-string.",
      starterCode: `# Create your variables here
your_name = ___
your_age = ___
your_city = ___

# Print them using an f-string
print(f"___ is ___ years old and lives in ___")`,
      solution: `your_name = "Alex"
your_age = 25
your_city = "New York"

print(f"{your_name} is {your_age} years old and lives in {your_city}")`,
      hints: [
        "Strings go in quotes: your_name = \"Alex\"",
        "Numbers don't need quotes: your_age = 25",
        'F-strings use curly braces: f"Hello {name}"',
      ],
      explanation:
        'F-strings (formatted strings) are one of Python\'s best features. By putting an f before the quotes and wrapping variable names in {}, Python automatically inserts the values. Much cleaner than concatenation!',
    },
  },
];

// HTML & CSS modules — Beginner
export const htmlCssBeginnerModules: Module[] = [
  {
    id: "html-b-1",
    courseId: "html-css",
    level: "beginner",
    order: 1,
    title: "What is HTML?",
    xpReward: 50,
    conceptCards: [
      {
        id: "html-b-1-c1",
        title: "HTML is the skeleton of every webpage",
        content:
          "HTML stands for HyperText Markup Language. It's not a programming language — it's a markup language that describes the structure of a webpage using tags. Think of it like the frame of a house: it defines what goes where.",
        codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>`,
        language: "html",
        tip: "Every HTML tag has an opening <tag> and a closing </tag> (with a forward slash).",
      },
    ],
    challenge: {
      id: "html-b-1-ch",
      type: "arrange-steps",
      title: "Build a valid HTML page",
      description:
        "Arrange these HTML elements in the correct order to form a valid webpage structure.",
      starterCode: "",
      solution: `<!DOCTYPE html>\n<html>\n<head>\n<title>Page</title>\n</head>\n<body>\n<h1>Hello</h1>\n</body>\n</html>`,
      steps: [
        "<body>",
        "<!DOCTYPE html>",
        "<head>",
        "<h1>Hello</h1>",
        "</body>",
        "<html>",
        "<title>Page</title>",
        "</head>",
        "</html>",
      ],
      correctOrder: [1, 5, 2, 6, 7, 0, 3, 4, 8],
      hints: [
        "DOCTYPE always comes first",
        "<html> wraps everything",
        "<head> comes before <body>",
      ],
      explanation:
        "A valid HTML page follows a strict structure: DOCTYPE declaration → html tag → head (with title) → body (with visible content). Browsers can still render pages with missing parts, but proper structure ensures consistent behaviour across all browsers.",
    },
  },
];

export const modulesByCoursAndLevel: Record<string, Record<string, Module[]>> = {
  javascript: {
    beginner: javascriptBeginnerModules,
    intermediate: [],
    advanced: [],
    pro: [],
  },
  python: {
    beginner: pythonBeginnerModules,
    intermediate: [],
    advanced: [],
    pro: [],
  },
  "html-css": {
    beginner: htmlCssBeginnerModules,
    intermediate: [],
    advanced: [],
    pro: [],
  },
};

export function getModules(courseSlug: string, level: string): Module[] {
  return modulesByCoursAndLevel[courseSlug]?.[level] ?? [];
}
