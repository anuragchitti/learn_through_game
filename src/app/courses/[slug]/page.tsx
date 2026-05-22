import { getCourseBySlug, courses } from "@/data/courses";
import { getLevelsForCourse, warriorLevels, mageLevels, archerLevels } from "@/game-engine/levels";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, Trophy, Play, ChevronRight, Lock, Sword } from "lucide-react";
import LevelMap from "@/components/game-ui/LevelMap";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const levels = getLevelsForCourse(slug);
  const hasLevels = levels.length > 0;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/courses" className="text-white/40 hover:text-white text-sm mb-8 inline-flex items-center gap-1">
          ← All Courses
        </Link>

        {/* Hero */}
        <div className="mt-4 mb-10 flex items-start gap-6">
          <span className="text-6xl">{course.icon}</span>
          <div>
            <div className="text-xs text-indigo-400 font-medium mb-1">{course.category}</div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">{course.description}</p>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {course.estimatedHours}h</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} /> {hasLevels ? levels.length : course.totalModules} levels</span>
              <span className="flex items-center gap-1.5"><Trophy size={14} /> Certificate on completion</span>
            </div>
          </div>
        </div>

        {hasLevels ? (
          <>
            {/* Level map */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Level Map</h2>
              <Link
                href={`/play/${slug}/1`}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                <Play size={14} /> Start Playing
              </Link>
            </div>

            <LevelMap slug={slug} levels={levels} />
          </>
        ) : (
          /* Placeholder for courses without levels yet */
          <div className="space-y-4 mb-12">
            {["Beginner", "Intermediate", "Advanced", "Pro"].map((tier, i) => (
              <div key={tier} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Lock size={16} className="text-white/30" />
                </div>
                <div>
                  <div className="font-semibold text-white/80">{tier}</div>
                  <div className="text-sm text-white/40">Coming soon</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Class-specific challenge levels */}
        {hasLevels && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Sword size={18} className="text-indigo-400" />
              Class Challenge Levels
            </h2>
            <p className="text-white/40 text-sm mb-5">Unique levels unlocked based on your character class.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Warrior", emoji: "🗡️", color: "text-orange-400", border: "border-orange-500/30 hover:border-orange-400/60", bg: "bg-orange-500/5", levels: warriorLevels },
                { label: "Mage",    emoji: "🔮", color: "text-violet-400", border: "border-violet-500/30 hover:border-violet-400/60", bg: "bg-violet-500/5", levels: mageLevels },
                { label: "Archer",  emoji: "🏹", color: "text-green-400",  border: "border-green-500/30 hover:border-green-400/60",  bg: "bg-green-500/5",  levels: archerLevels },
              ].map(({ label, emoji, color, border, bg, levels: classLvls }) => (
                <div key={label} className={`p-4 rounded-2xl border ${border} ${bg} transition-colors`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{emoji}</span>
                    <span className={`font-bold ${color}`}>{label}</span>
                  </div>
                  <div className="space-y-2">
                    {classLvls.map((lvl) => (
                      <Link
                        key={lvl.id}
                        href={`/play/${slug}/${lvl.number}`}
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        <ChevronRight size={12} className="shrink-0 opacity-40" />
                        <span className="truncate">{lvl.title.replace(/^(Warrior|Mage|Archer): /, "")}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center p-10 rounded-2xl bg-indigo-600/10 border border-indigo-500/20">
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold mb-2">
            {hasLevels ? "Ready to play?" : "Launching soon"}
          </h2>
          <p className="text-white/50 mb-6">
            {hasLevels
              ? "Write real code. Move a hero. Learn by doing — not watching."
              : "Full level content for this course is being crafted."}
          </p>
          {hasLevels && (
            <Link
              href={`/play/${slug}/1`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              <Play size={16} /> Play Level 1
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
