export type Level = "beginner" | "intermediate" | "advanced" | "pro";

export type ChallengeType =
  | "fill-blank"
  | "fix-bug"
  | "arrange-steps"
  | "predict-output"
  | "build-it"
  | "spot-difference";

export type Goal =
  | "get-a-job"
  | "build-project"
  | "learn-for-fun"
  | "upskill";

export type ExistingKnowledge =
  | "complete-beginner"
  | "know-a-little"
  | "intermediate"
  | "just-refreshing";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: CourseCategory;
  color: string;
  totalModules: number;
  estimatedHours: number;
  tags: string[];
}

export type CourseCategory =
  | "Web & Frontend"
  | "Backend"
  | "Databases"
  | "DevOps & Cloud"
  | "AI & Data"
  | "Computer Science";

export interface Module {
  id: string;
  courseId: string;
  level: Level;
  order: number;
  title: string;
  conceptCards: ConceptCard[];
  challenge: Challenge;
  xpReward: number;
}

export interface ConceptCard {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  language?: string;
  tip?: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  starterCode?: string;
  solution: string;
  hints: string[];
  explanation: string;
  options?: string[];
  correctOption?: number;
  blanks?: string[];
  steps?: string[];
  correctOrder?: number[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  currentLevel: Level;
  currentModule: number;
  completedModules: string[];
  xp: number;
  lives: number;
  streak: number;
  lastActiveDate: string;
  certificateId?: string;
}

export interface OnboardingAnswers {
  courseSlug: string;
  goal: Goal;
  knowledge: ExistingKnowledge;
}
