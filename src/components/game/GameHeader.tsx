"use client";
import Link from "next/link";
import { Heart, Zap, X } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { Level } from "@/types";
import { levelLabel, levelColor, formatXP } from "@/lib/utils";

interface Props {
  courseTitle: string;
  courseSlug: string;
  level: Level;
  xp: number;
  lives: number;
  moduleIndex: number;
  totalModules: number;
}

export default function GameHeader({
  courseTitle,
  courseSlug,
  level,
  xp,
  lives,
  moduleIndex,
  totalModules,
}: Props) {
  return (
    <div className="sticky top-16 z-40 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center gap-4">
        {/* Close */}
        <Link href={`/courses/${courseSlug}`} className="text-white/40 hover:text-white shrink-0">
          <X size={20} />
        </Link>

        {/* Progress bar */}
        <div className="flex-1">
          <ProgressBar value={moduleIndex} max={totalModules} color="bg-indigo-500" />
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-yellow-400 shrink-0">
          <Zap size={15} />
          {formatXP(xp)}
        </div>

        {/* Lives */}
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              size={16}
              className={i < lives ? "text-red-400 fill-red-400" : "text-white/20"}
            />
          ))}
        </div>
      </div>

      {/* Level badge */}
      <div className="max-w-3xl mx-auto mt-1 flex items-center gap-2">
        <span className="text-xs text-white/30">{courseTitle} ·</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor(level)}`}>
          {levelLabel(level)}
        </span>
      </div>
    </div>
  );
}
