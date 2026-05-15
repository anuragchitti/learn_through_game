import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Level, ExistingKnowledge } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function knowledgeToLevel(knowledge: ExistingKnowledge): Level {
  const map: Record<ExistingKnowledge, Level> = {
    "complete-beginner": "beginner",
    "know-a-little": "beginner",
    intermediate: "intermediate",
    "just-refreshing": "advanced",
  };
  return map[knowledge];
}

export function levelOrder(level: Level): number {
  return { beginner: 0, intermediate: 1, advanced: 2, pro: 3 }[level];
}

export function nextLevel(level: Level): Level | null {
  const levels: Level[] = ["beginner", "intermediate", "advanced", "pro"];
  const idx = levels.indexOf(level);
  return idx < levels.length - 1 ? levels[idx + 1] : null;
}

export function levelLabel(level: Level): string {
  return { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", pro: "Pro" }[level];
}

export function levelColor(level: Level): string {
  return {
    beginner: "text-green-400 bg-green-400/10",
    intermediate: "text-blue-400 bg-blue-400/10",
    advanced: "text-purple-400 bg-purple-400/10",
    pro: "text-yellow-400 bg-yellow-400/10",
  }[level];
}

export function generateCertificateId(): string {
  return `LTG-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toString();
}
