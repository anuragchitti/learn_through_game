import { LevelDefinition } from "../types";

export const machineLearningLevels: LevelDefinition[] = [
  // ── Level 1 ──────────────────────────────────────────────────────────────
  {
    id: "ml-1",
    courseId: "machine-learning",
    number: 1,
    title: "ML Overview: Supervised & Unsupervised",
    description: "Machine learning lets computers learn from data. Navigate the ML landscape!",
    concept: "Supervised vs Unsupervised Learning",
    conceptExplanation:
      "Machine learning is split into two main paradigms. Supervised learning trains a model on labeled data (input→output pairs) — examples: classification (spam or not?) and regression (house price?). Unsupervised learning finds structure in unlabeled data — examples: clustering (k-means) and dimensionality reduction (PCA). The choice depends on whether you have labeled examples.",
    codeExample: `# Supervised learning example (classification)
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
model = RandomForestClassifier()
model.fit(X, y)
print(model.predict(X[:3]))   # [0 0 0]

# Unsupervised learning example (clustering)
from sklearn.cluster import KMeans

km = KMeans(n_clusters=3, random_state=42)
km.fit(X)
print(km.labels_[:5])         # cluster ids`,
    starterCode: `# Explore supervised vs unsupervised — collect every concept gem
hero.move("right")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")
`,
    solutionCode: `hero.move("right")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")`,
    // hero(1,1) →(1,2)gem →(1,3)gem →(1,4)gem ↓(2,4)empty →(2,5)gem exit(2,5) —
    // grid needs exit at (2,6); let's lay it out:
    // row1: wall hero gem gem gem wall wall
    // row2: wall wall wall wall empty gem exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "empty","gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 ML concept gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 3 to collect gems, then down and right twice to reach the final gem and exit.",
    tip: "When you have labeled data, start with supervised learning. Without labels, try clustering or PCA first.",
  },

  // ── Level 2 ──────────────────────────────────────────────────────────────
  {
    id: "ml-2",
    courseId: "machine-learning",
    number: 2,
    title: "Linear Regression",
    description: "Predict continuous values with a line of best fit. Navigate the regression grid!",
    concept: "Linear Regression",
    conceptExplanation:
      "Linear regression models the relationship between features X and a continuous target y as y = wX + b. The model learns weights w and bias b by minimizing the mean squared error (MSE). Scikit-learn's `LinearRegression` fits this in one call. Key metrics: R² (variance explained) and RMSE (average error in original units).",
    codeExample: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

model = LinearRegression()
model.fit(X, y)

preds = model.predict(X)
print("R2:  ", r2_score(y, preds))
print("RMSE:", mean_squared_error(y, preds, squared=False))
print("coef:", model.coef_[0])
print("intercept:", model.intercept_)`,
    starterCode: `# Fit a line through the gem data points
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
`,
    solutionCode: `hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")
hero.move("right")
hero.move("down")
hero.move("right")`,
    // row1: wall hero gem gem  wall  wall
    // row2: wall wall wall gem gem   wall
    // row3: wall wall wall wall empty exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 regression gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 2, down, right 2 (2 gems), down, right (exit). Trace the diagonal!",
    tip: "Always plot residuals (y - y_pred) after fitting. Patterns in residuals indicate your linear model is missing something.",
  },

  // ── Level 3 ──────────────────────────────────────────────────────────────
  {
    id: "ml-3",
    courseId: "machine-learning",
    number: 3,
    title: "Logistic Regression",
    description: "Classify binary outcomes with probabilities. Navigate the classification boundary!",
    concept: "Logistic Regression",
    conceptExplanation:
      "Logistic regression predicts the probability that an input belongs to class 1 using the sigmoid function: P(y=1) = 1 / (1 + e^(-wX)). It outputs values between 0 and 1; a threshold (default 0.5) converts them to class labels. Despite the name it is a classifier, not a regressor. Evaluate with accuracy, precision, recall, and the ROC-AUC score.",
    codeExample: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=10000)
model.fit(X_train, y_train)

print(classification_report(y_test, model.predict(X_test)))`,
    starterCode: `# Cross the decision boundary — collect every gem
for _ in range(3):
    hero.move("right")
hero.move("down")
for _ in range(3):
    hero.move("right")
`,
    solutionCode: `for _ in range(3):
    hero.move("right")
hero.move("down")
for _ in range(3):
    hero.move("right")`,
    // row1: wall hero gem gem gem  wall wall
    // row2: wall wall wall wall gem gem exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 classification gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Loop right 3 (3 gems), down 1, loop right 3 (2 gems + exit).",
    tip: "Scale your features with `StandardScaler` before logistic regression — it converges much faster.",
  },

  // ── Level 4 ──────────────────────────────────────────────────────────────
  {
    id: "ml-4",
    courseId: "machine-learning",
    number: 4,
    title: "Decision Trees & Random Forests",
    description: "Tree-based models split data by feature thresholds. Navigate the branching grid!",
    concept: "Decision Trees & Random Forests",
    conceptExplanation:
      "A decision tree recursively splits data on the feature that best separates classes (using Gini impurity or information gain). Trees are interpretable but prone to overfitting. A Random Forest trains many trees on random data subsets and averages their predictions — this ensemble approach dramatically reduces variance while keeping low bias. Use `max_depth` to control tree depth.",
    codeExample: `from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)

tree = DecisionTreeClassifier(max_depth=3)
tree.fit(X_tr, y_tr)
print("Tree acc:", tree.score(X_te, y_te))

forest = RandomForestClassifier(n_estimators=100, random_state=42)
forest.fit(X_tr, y_tr)
print("Forest acc:", forest.score(X_te, y_te))
print("Feature importances:", forest.feature_importances_)`,
    starterCode: `# Branch through the decision tree — collect every node gem
def traverse(direction, steps):
    for _ in range(steps):
        hero.move(direction)

traverse("right", 3)
traverse("down", 1)
traverse("right", 3)
`,
    solutionCode: `def traverse(direction, steps):
    for _ in range(steps):
        hero.move(direction)

traverse("right", 3)
traverse("down", 1)
traverse("right", 3)`,
    // row1: wall hero gem gem gem  wall wall
    // row2: wall wall wall wall gem gem exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 tree node gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 3 (row 1 gems), down 1, right 3 (row 2 gems + exit).",
    tip: "Use `feature_importances_` from a Random Forest for quick feature selection — drop features with near-zero importance.",
  },

  // ── Level 5 ──────────────────────────────────────────────────────────────
  {
    id: "ml-5",
    courseId: "machine-learning",
    number: 5,
    title: "Neural Network Basics",
    description: "Neural networks are layers of connected neurons. Navigate the network architecture!",
    concept: "Neural Networks & Deep Learning Basics",
    conceptExplanation:
      "A neural network is a stack of layers. Each layer applies a linear transformation (weights × inputs + bias) followed by a non-linear activation function (ReLU, sigmoid, softmax). Information flows forward through the network (forward pass); errors propagate backward to update weights (backpropagation). Scikit-learn's `MLPClassifier` provides a simple multi-layer perceptron; PyTorch and TensorFlow are used for deep learning.",
    codeExample: `from sklearn.neural_network import MLPClassifier
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X, y = load_digits(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)

scaler = StandardScaler()
X_tr = scaler.fit_transform(X_tr)
X_te = scaler.transform(X_te)

mlp = MLPClassifier(
    hidden_layer_sizes=(128, 64),
    activation="relu",
    max_iter=500,
    random_state=42,
)
mlp.fit(X_tr, y_tr)
print("Accuracy:", mlp.score(X_te, y_te))`,
    starterCode: `# Layer by layer — navigate the neural network grid
waypoints = [
    ("right", 4),
    ("down", 1),
    ("right", 2),
]
for direction, steps in waypoints:
    for _ in range(steps):
        hero.move(direction)
`,
    solutionCode: `waypoints = [
    ("right", 4),
    ("down", 1),
    ("right", 2),
]
for direction, steps in waypoints:
    for _ in range(steps):
        hero.move(direction)`,
    // row1: wall hero gem gem gem gem  wall
    // row2: wall wall wall wall wall gem exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 neuron gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 4 (4 gems), down 1, right 2 (last gem + exit). Follow the layer connections.",
    tip: "Always normalize inputs to a neural network. Unnormalized features cause exploding/vanishing gradients during training.",
  },

  // ── Level 6 ──────────────────────────────────────────────────────────────
  {
    id: "ml-6",
    courseId: "machine-learning",
    number: 6,
    title: "Train/Test Split & Cross-Validation",
    description: "Never evaluate a model on training data. Split wisely and cross-validate!",
    concept: "Train/Test Split & Cross-Validation",
    conceptExplanation:
      "Evaluating a model on its training data is optimistic and misleading (data leakage). Always hold out a test set. For robust evaluation use k-fold cross-validation: split data into k folds, train on k-1 folds, validate on the remaining fold, and rotate k times. Average the k scores for a low-variance estimate of true performance. `sklearn.model_selection.cross_val_score` automates this.",
    codeExample: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import (
    train_test_split,
    cross_val_score,
    StratifiedKFold,
)
import numpy as np

X, y = load_iris(return_X_y=True)

# Simple split
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

model = RandomForestClassifier(n_estimators=100)

# 5-fold cross-validation on training data
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X_tr, y_tr, cv=cv)
print("CV mean:", scores.mean().round(3))
print("CV std: ", scores.std().round(3))`,
    starterCode: `# Split the grid into folds — collect every validation gem
def fold(direction, n):
    for _ in range(n):
        hero.move(direction)

fold("right", 2)
fold("down", 1)
fold("right", 3)
fold("down", 1)
fold("right", 1)
`,
    solutionCode: `def fold(direction, n):
    for _ in range(n):
        hero.move(direction)

fold("right", 2)
fold("down", 1)
fold("right", 3)
fold("down", 1)
fold("right", 1)`,
    // row1: wall hero gem gem  wall  wall wall
    // row2: wall wall wall gem gem   gem  wall
    // row3: wall wall wall wall wall empty exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "empty","exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 validation gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 2 (2 gems), down, right 3 (3 gems), down, right (exit).",
    tip: "Use `StratifiedKFold` for classification to ensure each fold has the same class distribution as the full dataset.",
  },

  // ── Level 7 ──────────────────────────────────────────────────────────────
  {
    id: "ml-7",
    courseId: "machine-learning",
    number: 7,
    title: "Feature Engineering",
    description: "Better features beat better algorithms. Navigate the feature transformation grid!",
    concept: "Feature Engineering",
    conceptExplanation:
      "Feature engineering transforms raw data into inputs that help models learn. Techniques include: scaling (StandardScaler, MinMaxScaler), encoding categoricals (OneHotEncoder, OrdinalEncoder), polynomial features (PolynomialFeatures), log transforms for skewed distributions, and interaction terms. Pipelines (sklearn.pipeline.Pipeline) chain preprocessing and modeling steps safely to prevent data leakage.",
    codeExample: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression

numeric_features = ["age", "income"]
categorical_features = ["city"]

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), numeric_features),
    ("cat", OneHotEncoder(), categorical_features),
])

pipe = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression()),
])

# pipe.fit(X_train, y_train)
# pipe.predict(X_test)
print("Pipeline built successfully!")`,
    starterCode: `# Engineer your path — transform raw moves into a route
raw_features = [
    ("right", 3),
    ("down",  2),
    ("right", 2),
]

for direction, steps in raw_features:
    for _ in range(steps):
        hero.move(direction)
`,
    solutionCode: `raw_features = [
    ("right", 3),
    ("down",  2),
    ("right", 2),
]

for direction, steps in raw_features:
    for _ in range(steps):
        hero.move(direction)`,
    // row1: wall hero gem gem gem wall
    // row2: wall wall wall wall empty wall
    // row3: wall wall wall wall gem exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "empty","wall"],
      ["wall", "wall", "wall", "wall", "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 feature gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 3 (gems), down 2, right 2 (last gem + exit).",
    tip: "Always fit your scaler on training data only, then apply transform to both train and test. Never fit on test data.",
  },

  // ── Level 8 ──────────────────────────────────────────────────────────────
  {
    id: "ml-8",
    courseId: "machine-learning",
    number: 8,
    title: "Overfitting & Regularization",
    description: "A model that memorizes training data fails on new data. Regularize to generalize!",
    concept: "Overfitting & Regularization",
    conceptExplanation:
      "Overfitting happens when a model learns noise in the training data rather than the underlying pattern — training accuracy is high but test accuracy is low. Regularization adds a penalty on large weights: L1 (Lasso) shrinks some weights to exactly zero (feature selection); L2 (Ridge) shrinks all weights toward zero. In sklearn, control regularization strength with the `C` parameter (smaller C = more regularization) for logistic regression, or `alpha` for Ridge/Lasso.",
    codeExample: `from sklearn.linear_model import Ridge, Lasso, LogisticRegression
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
import numpy as np

X, y = make_regression(n_samples=200, n_features=100, noise=0.5)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)

ridge = Ridge(alpha=1.0)
ridge.fit(X_tr, y_tr)
print("Ridge R2:", ridge.score(X_te, y_te).round(3))

lasso = Lasso(alpha=0.1)
lasso.fit(X_tr, y_tr)
print("Lasso R2:", lasso.score(X_te, y_te).round(3))
# Lasso may zero out many coefficients
nonzero = np.sum(lasso.coef_ != 0)
print("Non-zero Lasso coefficients:", nonzero)`,
    starterCode: `# Regularize your route — avoid over-committing to a single path
def regularize(direction, n):
    for _ in range(n):
        hero.move(direction)

regularize("right", 2)
regularize("down", 1)
regularize("right", 3)
regularize("down", 1)
regularize("right", 1)
`,
    solutionCode: `def regularize(direction, n):
    for _ in range(n):
        hero.move(direction)

regularize("right", 2)
regularize("down", 1)
regularize("right", 3)
regularize("down", 1)
regularize("right", 1)`,
    // row1: wall hero gem gem  wall  wall wall
    // row2: wall wall wall gem gem   gem  wall
    // row3: wall wall wall wall wall empty exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "empty","exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 regularization gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 2 (2 gems), down, right 3 (3 gems), down, right (exit).",
    tip: "Plot train vs validation loss curves during training. A widening gap between them is the classic sign of overfitting.",
  },

  // ── Level 9 ──────────────────────────────────────────────────────────────
  {
    id: "ml-9",
    courseId: "machine-learning",
    number: 9,
    title: "Model Evaluation Metrics",
    description: "Accuracy alone can be misleading. Learn precision, recall, F1, and ROC-AUC!",
    concept: "Model Evaluation Metrics",
    conceptExplanation:
      "Accuracy = correct / total. But for imbalanced classes (99 % negative) a model that always predicts negative gets 99 % accuracy while being useless. Better metrics: Precision = TP / (TP + FP) — of all positive predictions, how many were correct? Recall = TP / (TP + FN) — of all actual positives, how many did we catch? F1 = harmonic mean of precision and recall. ROC-AUC measures the probability that a positive example is ranked above a negative one across all thresholds.",
    codeExample: `from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
)
import numpy as np

y_true = np.array([0, 1, 1, 0, 1, 0, 1, 1])
y_pred = np.array([0, 1, 0, 0, 1, 1, 1, 1])
y_prob = np.array([0.1, 0.9, 0.4, 0.3, 0.8, 0.6, 0.7, 0.85])

print("Accuracy: ", accuracy_score(y_true, y_pred))
print("Precision:", precision_score(y_true, y_pred))
print("Recall:   ", recall_score(y_true, y_pred))
print("F1:       ", f1_score(y_true, y_pred))
print("ROC-AUC:  ", roc_auc_score(y_true, y_prob))
print("Confusion matrix:")
print(confusion_matrix(y_true, y_pred))`,
    starterCode: `# Measure every metric gem — miss none
def metric_march(direction, n):
    for _ in range(n):
        hero.move(direction)

metric_march("right", 2)
metric_march("down", 1)
metric_march("right", 3)
metric_march("down", 1)
metric_march("right", 1)
`,
    solutionCode: `def metric_march(direction, n):
    for _ in range(n):
        hero.move(direction)

metric_march("right", 2)
metric_march("down", 1)
metric_march("right", 3)
metric_march("down", 1)
metric_march("right", 1)`,
    // row1: wall hero gem gem  wall  wall wall
    // row2: wall wall wall gem gem   gem  wall
    // row3: wall wall wall wall wall empty exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "wall", "wall", "wall"],
      ["wall", "wall", "wall", "gem",  "gem",  "gem",  "wall"],
      ["wall", "wall", "wall", "wall", "wall", "empty","exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 metric gems" },
      { type: "reach-exit", description: "Reach the exit" },
    ],
    hint: "Right 2, down, right 3, down, right — march through every evaluation metric.",
    tip: "For imbalanced datasets, prefer F1 or ROC-AUC over accuracy as your primary metric.",
  },

  // ── Level 10 ─────────────────────────────────────────────────────────────
  {
    id: "ml-10",
    courseId: "machine-learning",
    number: 10,
    title: "Grand Finale: Train a Classifier",
    description: "End-to-end ML pipeline: load, preprocess, train, evaluate. Navigate the grand dungeon!",
    concept: "End-to-End Machine Learning Pipeline",
    conceptExplanation:
      "A production ML pipeline: (1) Load and explore data, (2) split into train/test with stratification, (3) preprocess with a Pipeline (scaling, encoding), (4) train multiple models, (5) evaluate on held-out test data using appropriate metrics, (6) tune hyperparameters with GridSearchCV, (7) examine feature importances, (8) document findings. This covers the complete supervised learning workflow.",
    codeExample: `import pandas as pd
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

# 1. Load data
X, y = load_breast_cancer(return_X_y=True, as_frame=True)

# 2. Split
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 3. Build pipeline
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf",    RandomForestClassifier(random_state=42)),
])

# 4. Hyperparameter search
param_grid = {
    "clf__n_estimators": [50, 100],
    "clf__max_depth":    [None, 5],
}
search = GridSearchCV(pipe, param_grid, cv=5, scoring="roc_auc")
search.fit(X_tr, y_tr)

# 5. Evaluate
best = search.best_estimator_
y_pred = best.predict(X_te)
y_prob = best.predict_proba(X_te)[:, 1]

print("Best params:", search.best_params_)
print(classification_report(y_te, y_pred))
print("ROC-AUC:", roc_auc_score(y_te, y_prob).round(4))`,
    starterCode: `# Grand finale — run the full ML pipeline across the grid
def pipeline_run(phases):
    for direction, steps in phases:
        for _ in range(steps):
            hero.move(direction)

pipeline_run([
    ("right", 4),
    ("down",  1),
    ("right", 3),
])
`,
    solutionCode: `def pipeline_run(phases):
    for direction, steps in phases:
        for _ in range(steps):
            hero.move(direction)

pipeline_run([
    ("right", 4),
    ("down",  1),
    ("right", 3),
])`,
    // hero(1,1) right×4 → (1,2)gem (1,3)gem (1,4)gem (1,5)gem
    // down → (2,5)gem  right×3 → (2,6)gem (2,7)gem (2,8) — need col8
    // Switch to a shape that works within reachable columns:
    // right×4 gems, down, right×2 (2 gems + exit in col 7)
    // row1: wall hero gem gem gem gem  wall  wall
    // row2: wall wall wall wall wall gem gem  exit
    grid: [
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
      ["wall", "hero", "gem",  "gem",  "gem",  "gem",  "wall", "wall"],
      ["wall", "wall", "wall", "wall", "wall", "gem",  "gem",  "exit"],
      ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 6 ML pipeline gems" },
      { type: "reach-exit", description: "Reach the ML exit" },
    ],
    hint: "Right 4 (4 gems), down 1, right 3 (2 gems + exit). Full pipeline complete!",
    tip: "Congratulations! You now know the full supervised ML pipeline: preprocessing, training, cross-validation, tuning, and evaluation.",
  },
];
