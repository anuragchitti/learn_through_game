import { LevelDefinition } from "../types";

export const pythonDataLevels: LevelDefinition[] = [
  // ── Level 1 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-1",
    courseId: "python-data",
    number: 1,
    title: "NumPy Arrays",
    description: "NumPy is the backbone of data science in Python. Move the hero to collect all data gems!",
    concept: "NumPy Arrays",
    conceptExplanation:
      "NumPy provides the `ndarray` — an n-dimensional array that is far faster than a Python list for numerical work. You create one with `np.array([...])` and perform element-wise operations like `arr * 2` without loops.",
    codeExample: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr * 2)        # [2 4 6 8 10]
print(arr.mean())     # 3.0
print(arr.shape)      # (5,)`,
    starterCode: `# Move right to collect all NumPy gems, then reach the exit
hero.move("right")
hero.move("right")
hero.move("right")
hero.move("right")
`,
    solutionCode: `hero.move("right")
hero.move("right")
hero.move("right")
hero.move("right")`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "exit", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 data gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Move right 3 times to collect the gems, then navigate down to the exit.",
    tip: "NumPy arrays support vectorized operations — no Python loops needed for element-wise math.",
  },

  // ── Level 2 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-2",
    courseId: "python-data",
    number: 2,
    title: "Pandas DataFrames",
    description: "Pandas DataFrames are 2-D labeled tables. Navigate the grid to collect all rows!",
    concept: "Pandas DataFrames",
    conceptExplanation:
      "A `DataFrame` is a 2-D table with named columns and an index. You create one from a dict, CSV, or JSON. Access columns with `df['col']` or `df.col`. Filter rows with boolean indexing: `df[df['age'] > 30]`.",
    codeExample: `import pandas as pd

df = pd.DataFrame({
    "name": ["Alice", "Bob", "Carol"],
    "score": [92, 85, 78],
})

print(df.head())
print(df["score"].mean())   # 85.0
print(df[df["score"] > 80]) # Alice, Bob`,
    starterCode: `# Collect all DataFrame gems across two rows
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")
`,
    solutionCode: `hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 DataFrame gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right twice to get gems, then down-right-right for the last gem and exit.",
    tip: "`df.dtypes` shows the data type of each column. Always check this after loading data.",
  },

  // ── Level 3 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-3",
    courseId: "python-data",
    number: 3,
    title: "Data Cleaning",
    description: "Real data is messy. Drop nulls, fix types — then navigate to the clean exit.",
    concept: "Data Cleaning",
    conceptExplanation:
      "Data cleaning includes handling missing values (`df.dropna()`, `df.fillna()`), removing duplicates (`df.drop_duplicates()`), fixing data types (`df['col'].astype(int)`), and renaming columns. Clean data is the most important step in any analysis.",
    codeExample: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "age": [25, None, 30, 30],
    "city": ["NY", "LA", None, "LA"],
})

df = df.dropna()           # remove rows with any NaN
df = df.drop_duplicates()  # remove duplicate rows
df["age"] = df["age"].astype(int)
print(df)`,
    starterCode: `# Navigate through the cleaning pipeline — collect every gem
hero.move("right")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("down")
hero.move("right")
hero.move("right")
`,
    solutionCode: `hero.move("right")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("down")
hero.move("right")
hero.move("right")`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 cleaning gems" },
      { type: "reach-exit", description: "Reach the clean exit" },
    ],
    hint: "Move right 3 times, then down twice, then right twice for the final gem and exit.",
    tip: "`df.isnull().sum()` shows you exactly how many missing values each column has.",
  },

  // ── Level 4 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-4",
    courseId: "python-data",
    number: 4,
    title: "Groupby & Aggregations",
    description: "Group your data and compute summaries. Navigate grouped rows to collect insights!",
    concept: "Groupby & Aggregations",
    conceptExplanation:
      "`df.groupby('col').agg(...)` splits the DataFrame into groups, applies an aggregation function (sum, mean, count, min, max), and combines the results. This is the split-apply-combine pattern — the foundation of data summarization.",
    codeExample: `import pandas as pd

df = pd.DataFrame({
    "dept": ["Eng", "Eng", "HR", "HR"],
    "salary": [90000, 95000, 60000, 65000],
})

summary = df.groupby("dept")["salary"].agg(["mean", "count"])
print(summary)
# dept   mean    count
# Eng    92500   2
# HR     62500   2`,
    starterCode: `# Navigate the grouped data — collect every aggregation gem
hero.move("right")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")
hero.move("right")
`,
    solutionCode: `hero.move("right")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")
hero.move("right")`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 aggregation gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 3, down 1, then right 3 to pick up the last gems and reach the exit.",
    tip: "Use `.agg(['mean','std','count'])` to get multiple statistics in one call.",
  },

  // ── Level 5 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-5",
    courseId: "python-data",
    number: 5,
    title: "Matplotlib Basics",
    description: "Visualize your data! Navigate the plot canvas to collect all chart gems.",
    concept: "Matplotlib Basics",
    conceptExplanation:
      "Matplotlib is Python's core plotting library. `plt.plot(x, y)` draws a line chart. `plt.bar(labels, values)` draws a bar chart. Always call `plt.xlabel()`, `plt.ylabel()`, and `plt.title()` to label your chart. `plt.show()` displays it.",
    codeExample: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 4))
plt.plot(x, y, label="sin(x)")
plt.xlabel("x")
plt.ylabel("y")
plt.title("Sine Wave")
plt.legend()
plt.show()`,
    starterCode: `# Chart your path — collect every data-viz gem
for step in range(3):
    hero.move("right")
hero.move("down")
for step in range(2):
    hero.move("right")
`,
    solutionCode: `for step in range(3):
    hero.move("right")
hero.move("down")
for step in range(2):
    hero.move("right")`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 chart gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Loop right 3 times, move down, then loop right 2 more to hit the last gem and exit.",
    tip: "`plt.tight_layout()` automatically adjusts padding so labels don't get clipped.",
  },

  // ── Level 6 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-6",
    courseId: "python-data",
    number: 6,
    title: "Seaborn & Visualization",
    description: "Seaborn makes beautiful statistical charts. Navigate the visual grid!",
    concept: "Seaborn & Statistical Visualization",
    conceptExplanation:
      "Seaborn wraps Matplotlib with a higher-level API for statistical plots. `sns.histplot(df['col'])` shows distributions. `sns.boxplot(x='cat', y='num', data=df)` compares groups. `sns.heatmap(df.corr())` shows correlations. Use `sns.set_theme()` for polished styling.",
    codeExample: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = sns.load_dataset("tips")

sns.set_theme(style="whitegrid")
sns.boxplot(x="day", y="total_bill", data=df)
plt.title("Tips by Day")
plt.show()`,
    starterCode: `# Traverse the Seaborn gem grid
moves = ["right", "right", "down", "right", "right", "down", "right"]
for m in moves:
    hero.move(m)
`,
    solutionCode: `moves = ["right", "right", "down", "right", "right", "down", "right"]
for m in moves:
    hero.move(m)`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "empty","gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 3 Seaborn gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 2, down, right 2 (gem), down, right (exit). Follow the list of moves.",
    tip: "`sns.pairplot(df)` creates a full grid of scatter plots between every numeric column pair — great for quick EDA.",
  },

  // ── Level 7 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-7",
    courseId: "python-data",
    number: 7,
    title: "Merging Datasets",
    description: "Combine data from multiple sources with Pandas merge. Navigate the joined grid!",
    concept: "Merging & Joining DataFrames",
    conceptExplanation:
      "`pd.merge(left, right, on='key', how='inner')` joins two DataFrames like SQL. Use `how='left'` to keep all left rows, `how='outer'` to keep all rows from both. `pd.concat([df1, df2])` stacks DataFrames vertically. Always check the row count after merging to spot data loss.",
    codeExample: `import pandas as pd

users = pd.DataFrame({"id": [1, 2, 3], "name": ["Alice", "Bob", "Carol"]})
orders = pd.DataFrame({"id": [1, 1, 2], "amount": [50, 30, 80]})

merged = pd.merge(users, orders, on="id", how="left")
print(merged)
# id  name   amount
# 1   Alice  50
# 1   Alice  30
# 2   Bob    80
# 3   Carol  NaN`,
    starterCode: `# Merge two paths into one route
def go(direction, steps):
    for i in range(steps):
        hero.move(direction)

go("right", 3)
go("down", 1)
go("right", 3)
`,
    solutionCode: `def go(direction, steps):
    for i in range(steps):
        hero.move(direction)

go("right", 3)
go("down", 1)
go("right", 3)`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 merge gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "go() moves in a direction N times. Right 3, then down 1, then right 3 to finish.",
    tip: "After a merge, always run `assert len(merged) == expected_rows` to catch unexpected duplicates.",
  },

  // ── Level 8 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-8",
    courseId: "python-data",
    number: 8,
    title: "Time Series",
    description: "Parse dates, resample, and roll — then navigate the time-series grid!",
    concept: "Time Series Analysis",
    conceptExplanation:
      "Pandas has first-class time series support. Parse dates with `pd.to_datetime()`, set a DatetimeIndex with `df.set_index('date')`, resample to different frequencies with `.resample('M').mean()`, and compute rolling statistics with `.rolling(7).mean()`. Use `df.shift(1)` to create lag features.",
    codeExample: `import pandas as pd

df = pd.read_csv("sales.csv", parse_dates=["date"])
df = df.set_index("date")

monthly = df["revenue"].resample("ME").sum()
rolling = df["revenue"].rolling(window=7).mean()

print(monthly.head())`,
    starterCode: `# Navigate the time series — step through each period
waypoints = [
    ("right", 3),
    ("down", 2),
    ("right", 2),
]

for direction, steps in waypoints:
    for i in range(steps):
        hero.move(direction)
`,
    solutionCode: `waypoints = [
    ("right", 3),
    ("down", 2),
    ("right", 2),
]

for direction, steps in waypoints:
    for i in range(steps):
        hero.move(direction)`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 time-series gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Unpack each waypoint tuple: right 3, down 2, right 2 to reach the final gem and exit.",
    tip: "Always localize timezone-naive datetimes with `.dt.tz_localize('UTC')` before comparing across sources.",
  },

  // ── Level 9 ──────────────────────────────────────────────────────────────
  {
    id: "pydata-9",
    courseId: "python-data",
    number: 9,
    title: "Statistical Analysis",
    description: "Compute correlations, run t-tests, and interpret p-values. Navigate the stats grid!",
    concept: "Statistical Analysis with SciPy",
    conceptExplanation:
      "`scipy.stats` provides hypothesis tests, distributions, and more. `ttest_ind(a, b)` runs a two-sample t-test. A p-value < 0.05 typically means the difference is statistically significant. `pearsonr(x, y)` computes the correlation coefficient. `df.describe()` gives a quick statistical summary.",
    codeExample: `import pandas as pd
from scipy import stats

df = pd.read_csv("experiment.csv")
group_a = df[df["group"] == "A"]["score"]
group_b = df[df["group"] == "B"]["score"]

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print("p-value:", p_value)

if p_value < 0.05:
    print("Significant difference!")`,
    starterCode: `# Navigate the statistical landscape
def march(direction, n):
    for i in range(n):
        hero.move(direction)

march("right", 2)
march("down", 1)
march("right", 3)
march("down", 1)
march("right", 1)
`,
    solutionCode: `def march(direction, n):
    for i in range(n):
        hero.move(direction)

march("right", 2)
march("down", 1)
march("right", 3)
march("down", 1)
march("right", 1)`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "empty","gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 statistics gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 2, down, right 3 (2 gems), down, right (final gem + exit).",
    tip: "p-value < 0.05 is a convention, not a law. Always consider effect size alongside statistical significance.",
  },

  // ── Level 10 ─────────────────────────────────────────────────────────────
  {
    id: "pydata-10",
    courseId: "python-data",
    number: 10,
    title: "Grand Finale: Analyze a Dataset",
    description: "Load, clean, analyze, and visualize a full dataset. Navigate the ultimate data dungeon!",
    concept: "End-to-End Data Analysis",
    conceptExplanation:
      "A complete data analysis pipeline: (1) Load data with Pandas, (2) clean nulls and types, (3) explore with `describe()` and `value_counts()`, (4) group and aggregate, (5) visualize distributions and relationships, (6) run a statistical test, (7) write conclusions. This is the full data science workflow.",
    codeExample: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# 1. Load
df = pd.read_csv("titanic.csv")

# 2. Clean
df = df.dropna(subset=["Age", "Survived"])
df["Age"] = df["Age"].astype(int)

# 3. Explore
print(df.describe())
print(df["Survived"].value_counts())

# 4. Aggregate
survival = df.groupby("Pclass")["Survived"].mean()
print(survival)

# 5. Visualize
sns.barplot(x="Pclass", y="Survived", data=df)
plt.title("Survival Rate by Class")
plt.show()

# 6. Test
first = df[df["Pclass"] == 1]["Survived"]
third = df[df["Pclass"] == 3]["Survived"]
t, p = stats.ttest_ind(first, third)
print("p-value:", p)`,
    starterCode: `# The grand finale — navigate every phase of the data pipeline
def pipeline(phases):
    for direction, steps in phases:
        for i in range(steps):
            hero.move(direction)

pipeline([
    ("right", 4),
    ("down", 1),
    ("right", 3),
    ("down", 1),
    ("right", 2),
])
`,
    solutionCode: `def pipeline(phases):
    for direction, steps in phases:
        for i in range(steps):
            hero.move(direction)

pipeline([
    ("right", 4),
    ("down", 1),
    ("right", 3),
    ("down", 1),
    ("right", 2),
])`,
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "gem",  "gem",  "gem"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "empty"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 7 analysis gems" },
      { type: "reach-exit", description: "Reach the data science exit" },
    ],
    hint: "pipeline() takes a list of (direction, steps) tuples. The five phases navigate the full grid.",
    tip: "Congratulations! You now know the full Python data science stack: NumPy, Pandas, Matplotlib, Seaborn, and SciPy.",
  },
];
