"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getUserCompletions } from "@/lib/db";
import type { LevelDefinition } from "@/game-engine/types";

interface Props {
  slug: string;
  levels: LevelDefinition[];
}

export default function LevelMap({ slug, levels }: Props) {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [loadingCompletions, setLoadingCompletions] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoadingCompletions(false);
      return;
    }
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setLoadingCompletions(false);
        return;
      }
      const completions = await getUserCompletions(data.user.id);
      const nums = new Set(
        completions
          .filter((c) => c.courseSlug === slug)
          .map((c) => c.levelNumber)
      );
      setCompletedLevels(nums);
      setLoadingCompletions(false);
    });
  }, [slug]);

  // Highest completed level number (0 if none)
  const highestCompleted = completedLevels.size > 0 ? Math.max(...completedLevels) : 0;

  // Group levels into worlds (every 4 levels)
  const worlds = Array.from({ length: Math.ceil(levels.length / 4) }, (_, i) =>
    levels.slice(i * 4, i * 4 + 4)
  );

  return (
    <div className="space-y-6">
      {worlds.map((world, wi) => (
        <div key={wi} className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs text-white/30 font-medium uppercase tracking-wide mb-4">
            World {wi + 1}
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {world.map((lvl) => {
              const isCompleted = completedLevels.has(lvl.number);
              // A level is locked if it's more than 1 ahead of the highest completed
              const isLocked = !loadingCompletions && lvl.number > highestCompleted + 1;
              // The "next" level to play
              const isNext = !loadingCompletions && lvl.number === highestCompleted + 1;

              if (isLocked) {
                return (
                  <div
                    key={lvl.id}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 opacity-40 cursor-not-allowed"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white/30 shrink-0">
                      <Lock size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate text-white/50">{lvl.title}</div>
                      <div className="text-xs text-white/30 truncate">{lvl.concept}</div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={lvl.id}
                  href={`/play/${slug}/${lvl.number}`}
                  className={`group flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    isNext
                      ? "bg-indigo-600/10 border-indigo-500/50 ring-2 ring-indigo-500/30 ring-offset-1 ring-offset-transparent animate-pulse-ring hover:bg-indigo-600/20"
                      : "bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-indigo-600/10"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      isCompleted
                        ? "bg-green-600/30 text-green-400"
                        : isNext
                        ? "bg-indigo-600/40 text-indigo-300"
                        : "bg-indigo-600/20 text-indigo-300 group-hover:bg-indigo-600/40"
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={16} /> : lvl.number}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{lvl.title}</div>
                    <div className="text-xs text-white/40 truncate">{lvl.concept}</div>
                  </div>
                  {isCompleted && (
                    <span className="ml-auto shrink-0 text-xs text-green-400 font-medium">Done</span>
                  )}
                  {!isCompleted && (
                    <ChevronRight
                      size={14}
                      className={`ml-auto shrink-0 transition-colors ${
                        isNext ? "text-indigo-400" : "text-white/20 group-hover:text-indigo-400"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
