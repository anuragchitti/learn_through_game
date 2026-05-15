import { getCourseBySlug, courses } from "@/data/courses";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight, Trophy } from "lucide-react";
import { levelLabel, levelColor } from "@/lib/utils";
import { Level } from "@/types";

const levels: Level[] = ["beginner", "intermediate", "advanced", "pro"];

const levelDetails: Record<Level, { desc: string; topics: string[] }> = {
  beginner: {
    desc: "Start from zero. Every concept explained in plain English.",
    topics: ["What it is and why it exists", "Core vocabulary", "Basic syntax", "Simple hands-on challenges"],
  },
  intermediate: {
    desc: "Build on the basics. Start creating real things.",
    topics: ["How it actually works under the hood", "Common patterns", "Build something small", "Fix real bugs"],
  },
  advanced: {
    desc: "Handle the hard stuff. Think like a professional.",
    topics: ["Edge cases and gotchas", "Performance considerations", "Best practices", "Debug complex problems"],
  },
  pro: {
    desc: "Production-grade thinking. Architecture and scale.",
    topics: ["System design decisions", "Production concerns", "Design a solution from scratch", "Code review mindset"],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
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
            <div className="flex items-center gap-6 mt-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {course.estimatedHours} hours</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} /> {course.totalModules} modules</span>
              <span className="flex items-center gap-1.5"><Trophy size={14} /> Certificate on completion</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {course.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/50">
              {tag}
            </span>
          ))}
        </div>

        {/* Level map */}
        <h2 className="text-xl font-bold mb-6">Your Learning Path</h2>
        <div className="space-y-4 mb-12">
          {levels.map((level, i) => {
            const detail = levelDetails[level];
            return (
              <div
                key={level}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <div className="flex items-center gap-3 sm:w-40 shrink-0">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${levelColor(level)}`}>
                    {levelLabel(level)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-sm mb-3">{detail.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {detail.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center p-10 rounded-2xl bg-indigo-600/10 border border-indigo-500/20">
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold mb-2">Ready to start?</h2>
          <p className="text-white/50 mb-6">
            Complete a quick 30-second setup and we'll put you in the right level.
          </p>
          <Link
            href={`/onboarding?course=${course.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Start {course.title}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
