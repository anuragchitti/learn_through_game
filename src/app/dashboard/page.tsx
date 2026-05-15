"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllProgress } from "@/lib/progress";
import { getCourseBySlug } from "@/data/courses";
import { getModules } from "@/data/modules";
import { UserProgress } from "@/types";
import { formatXP, levelLabel, levelColor } from "@/lib/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import { Zap, Flame, Trophy, ArrowRight, BookOpen } from "lucide-react";

interface CourseProgress {
  progress: UserProgress;
  courseTitle: string;
  courseIcon: string;
  totalModules: number;
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<CourseProgress[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const all = getAllProgress();
    const built: CourseProgress[] = Object.values(all).map((p) => {
      const course = getCourseBySlug(p.courseId);
      const modules = getModules(p.courseId, p.currentLevel);
      return {
        progress: p,
        courseTitle: course?.title ?? p.courseId,
        courseIcon: course?.icon ?? "📘",
        totalModules: modules.length || course?.totalModules || 1,
      };
    });
    setEntries(built);
    setTotalXP(built.reduce((sum, e) => sum + e.progress.xp, 0));
  }, []);

  const streak = entries[0]?.progress.streak ?? 0;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-white/50 mb-10">Track your progress, XP, and streaks</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <Zap size={24} className="text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{formatXP(totalXP)}</div>
            <div className="text-xs text-white/40 mt-0.5">Total XP</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <Flame size={24} className="text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-xs text-white/40 mt-0.5">Day Streak</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <BookOpen size={24} className="text-indigo-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{entries.length}</div>
            <div className="text-xs text-white/40 mt-0.5">Courses Started</div>
          </div>
        </div>

        {/* Course progress */}
        {entries.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎮</div>
            <h2 className="text-xl font-semibold mb-2">No courses started yet</h2>
            <p className="text-white/50 mb-6">Pick a course and start playing!</p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
            >
              Start Learning <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">In Progress</h2>
            {entries.map(({ progress, courseTitle, courseIcon, totalModules }, i) => (
              <motion.div
                key={progress.courseId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <span className="text-4xl shrink-0">{courseIcon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{courseTitle}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor(progress.currentLevel)}`}>
                      {levelLabel(progress.currentLevel)}
                    </span>
                  </div>
                  <ProgressBar
                    value={progress.currentModule}
                    max={totalModules}
                    label={`${progress.currentModule}/${totalModules} modules`}
                    className="mt-2"
                  />
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                    <Zap size={13} /> {formatXP(progress.xp)} XP
                  </div>
                  <Link
                    href={`/play/${progress.courseId}/${progress.currentLevel}`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    Continue <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificates */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-yellow-400" />
            <h2 className="text-lg font-semibold">Certificates Earned</h2>
          </div>
          {entries.filter((e) => e.progress.certificateId).length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-sm text-center">
              Complete all 4 levels of any course to earn your first certificate.
            </div>
          ) : (
            <div className="space-y-3">
              {entries
                .filter((e) => e.progress.certificateId)
                .map(({ progress, courseTitle, courseIcon }) => (
                  <Link
                    key={progress.certificateId}
                    href={`/certificate/${progress.certificateId}`}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors"
                  >
                    <span className="text-3xl">{courseIcon}</span>
                    <div>
                      <div className="font-semibold">{courseTitle}</div>
                      <div className="text-xs text-white/40 font-mono">{progress.certificateId}</div>
                    </div>
                    <Trophy size={20} className="text-yellow-400 ml-auto" />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
