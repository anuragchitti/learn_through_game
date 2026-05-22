"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCourseBySlug, courses } from "@/data/courses";
import { getLevelsForCourse } from "@/game-engine/levels";
import { supabase } from "@/lib/supabase";
import { getUserProfile, getUserCompletions } from "@/lib/db";
import { Zap, Trophy, ArrowRight, BookOpen, User } from "lucide-react";
import { HERO_AVATAR } from "@/game-engine/characters";
import type { CharacterClass } from "@/game-engine/characters";

interface CourseSummary {
  slug: string;
  title: string;
  icon: string;
  levelsCompleted: number;
  totalLevels: number;
  xpEarned: number;
  lastLevelCompleted: number;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [characterClass, setCharacterClass] = useState<CharacterClass>("warrior");
  const [totalXP, setTotalXP] = useState(0);
  const [levelsCompleted, setLevelsCompleted] = useState(0);
  const [courseSummaries, setCourseSummaries] = useState<CourseSummary[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      // Load profile (XP, username, class)
      const profile = await getUserProfile(user.id);
      if (profile) {
        setUsername(profile.username);
        setTotalXP(profile.total_xp);
        setLevelsCompleted(profile.levels_completed);
        if (profile.character_class) {
          setCharacterClass(profile.character_class as CharacterClass);
        }
      }

      // Load per-course completion breakdown
      const completions = await getUserCompletions(user.id);

      // Group by course
      const bySlug = new Map<string, { levels: Set<number>; xp: number; lastLevel: number }>();
      for (const c of completions) {
        if (!bySlug.has(c.courseSlug)) {
          bySlug.set(c.courseSlug, { levels: new Set(), xp: 0, lastLevel: 0 });
        }
        const entry = bySlug.get(c.courseSlug)!;
        entry.levels.add(c.levelNumber);
        entry.xp += c.xpEarned;
        if (c.levelNumber > entry.lastLevel) entry.lastLevel = c.levelNumber;
      }

      const summaries: CourseSummary[] = [];
      for (const [slug, data] of bySlug.entries()) {
        const course = getCourseBySlug(slug);
        if (!course) continue;
        const allLevels = getLevelsForCourse(slug);
        summaries.push({
          slug,
          title: course.title,
          icon: course.icon,
          levelsCompleted: data.levels.size,
          totalLevels: allLevels.length,
          xpEarned: data.xp,
          lastLevelCompleted: data.lastLevel,
        });
      }

      setCourseSummaries(summaries);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading dashboard...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold mb-2">Sign in to see your dashboard</h2>
        <p className="text-white/50 mb-6">Your progress and XP are saved per account.</p>
        <Link
          href="/auth?next=/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
        >
          Sign In <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-3xl">
            {HERO_AVATAR[characterClass]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{username ?? "Player"}</h1>
            <p className="text-white/40 text-sm capitalize">{characterClass} · {levelsCompleted} levels completed</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <Zap size={24} className="text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
            <div className="text-xs text-white/40 mt-0.5">Total XP</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <BookOpen size={24} className="text-indigo-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{levelsCompleted}</div>
            <div className="text-xs text-white/40 mt-0.5">Levels Done</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <User size={24} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{courseSummaries.length}</div>
            <div className="text-xs text-white/40 mt-0.5">Courses Started</div>
          </div>
        </div>

        {/* Courses in progress */}
        {courseSummaries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎮</div>
            <h2 className="text-xl font-semibold mb-2">No levels completed yet</h2>
            <p className="text-white/50 mb-6">Play a level and complete it to see your progress here.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
            >
              Browse Courses <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Courses in Progress</h2>
            {courseSummaries.map((s, i) => {
              const pct = Math.round((s.levelsCompleted / Math.max(s.totalLevels, 1)) * 100);
              const nextLevel = s.lastLevelCompleted + 1;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <span className="text-4xl shrink-0">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold mb-2 truncate">{s.title}</div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-white/30 mt-1">
                      {s.levelsCompleted}/{s.totalLevels} levels · {pct}%
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                      <Zap size={13} /> {s.xpEarned.toLocaleString()} XP
                    </div>
                    <Link
                      href={`/play/${s.slug}/${nextLevel}`}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      Continue <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Certificates placeholder */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-yellow-400" />
            <h2 className="text-lg font-semibold">Certificates</h2>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-sm text-center">
            Complete all levels of any course to earn a certificate.
          </div>
        </div>
      </div>
    </div>
  );
}
