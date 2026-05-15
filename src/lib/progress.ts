import { UserProgress, Level } from "@/types";
import { knowledgeToLevel } from "@/lib/utils";
import { OnboardingAnswers } from "@/types";

const STORAGE_KEY = "ltg_progress";

export function getAllProgress(): Record<string, UserProgress> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function getProgress(courseId: string): UserProgress | null {
  return getAllProgress()[courseId] ?? null;
}

export function initProgress(
  userId: string,
  answers: OnboardingAnswers
): UserProgress {
  const progress: UserProgress = {
    userId,
    courseId: answers.courseSlug,
    currentLevel: knowledgeToLevel(answers.knowledge),
    currentModule: 0,
    completedModules: [],
    xp: 0,
    lives: 3,
    streak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
  };
  saveProgress(progress);
  return progress;
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  const all = getAllProgress();
  all[progress.courseId] = progress;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function completeModule(
  courseId: string,
  moduleId: string,
  xpEarned: number
): UserProgress | null {
  const progress = getProgress(courseId);
  if (!progress) return null;

  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
    progress.xp += xpEarned;
    progress.currentModule += 1;
  }

  saveProgress(progress);
  return progress;
}

export function loseLife(courseId: string): UserProgress | null {
  const progress = getProgress(courseId);
  if (!progress) return null;
  progress.lives = Math.max(0, progress.lives - 1);
  saveProgress(progress);
  return progress;
}

export function isLevelComplete(
  progress: UserProgress,
  totalModulesInLevel: number
): boolean {
  return progress.currentModule >= totalModulesInLevel;
}

export function advanceLevel(
  courseId: string,
  nextLevel: Level
): UserProgress | null {
  const progress = getProgress(courseId);
  if (!progress) return null;
  progress.currentLevel = nextLevel;
  progress.currentModule = 0;
  progress.lives = 3;
  saveProgress(progress);
  return progress;
}
