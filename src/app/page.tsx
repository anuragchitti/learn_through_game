"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { courses, courseCategories } from "@/data/courses";
import { ArrowRight, Zap, Trophy, BookOpen, Star } from "lucide-react";

const PLAYABLE_SLUGS = new Set(["javascript", "python", "typescript", "react", "sql", "html-css", "git-github", "nodejs", "linux", "dsa", "nextjs"]);

const stats = [
  { label: "Courses", value: "25+" },
  { label: "Challenges", value: "125+" },
  { label: "Courses", value: "11" },
  { label: "Certificates", value: "11" },
];

const features = [
  {
    icon: BookOpen,
    title: "Learn First, Challenge After",
    description:
      "Every topic starts with clear concept cards — plain-English explanations with real code examples before you solve anything.",
  },
  {
    icon: Zap,
    title: "Hands-On Challenges",
    description:
      "No multiple-choice quizzes. Fix bugs, fill blanks, predict outputs, and write real code to prove you understand.",
  },
  {
    icon: Trophy,
    title: "Four Levels of Mastery",
    description:
      "Go from complete beginner to Pro at your own pace. Each level unlocks richer content and harder challenges.",
  },
  {
    icon: Star,
    title: "Real Certificates",
    description:
      "Earn a unique certificate with a verifiable ID when you complete all four levels of any course.",
  },
];

export default function HomePage() {
  const playable = courses.filter((c) => PLAYABLE_SLUGS.has(c.slug));
  const others = courses.filter((c) => !PLAYABLE_SLUGS.has(c.slug));
  const featuredCourses = [...playable, ...others].slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
            >
              <Zap size={14} />
              Code. Play. Level up.
            </motion.span>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Learn to Code
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                by Playing a Game
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Write real code. Control a hero. Conquer dungeons.
              Every level teaches a concept — functions, loops, objects — through
              hands-on challenges, not passive videos.
            </p>

            {/* Mini game preview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-700 mb-10 font-mono text-xs text-green-400 shadow-lg"
            >
              <span className="px-2 py-1 rounded bg-slate-800">hero</span>
              <span className="text-white/40">.</span>
              <span className="px-2 py-1 rounded bg-indigo-900/60 text-indigo-300">moveRight</span>
              <span className="text-white/40">()</span>
              <span className="ml-2 px-2 py-1 rounded bg-green-900/40 text-green-400">→ 🦸 moves</span>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-lg transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50"
              >
                Start Learning Free
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl text-lg transition-all"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 border-y border-white/10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/50 text-lg">
              A proven loop that makes learning stick
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-4">
                  <f.icon size={24} className="text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Level progression visual */}
      <section className="py-16 px-4 sm:px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Four Levels of Mastery</h2>
          <p className="text-white/50 mb-10">
            Progress at your own pace. Each level adapts to your existing knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { level: "Beginner", color: "from-green-500 to-emerald-600", desc: "What is it? Core vocabulary." },
              { level: "Intermediate", color: "from-blue-500 to-indigo-600", desc: "How it works. Build small things." },
              { level: "Advanced", color: "from-purple-500 to-violet-600", desc: "Edge cases. Debug real problems." },
              { level: "Pro", color: "from-yellow-500 to-orange-600", desc: "Architecture. Production-grade." },
            ].map((l, i) => (
              <motion.div
                key={l.level}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className={`text-2xl font-black bg-gradient-to-r ${l.color} bg-clip-text text-transparent mb-1`}>
                  {l.level}
                </div>
                <p className="text-white/50 text-sm">{l.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Courses</h2>
              <p className="text-white/50 mt-1">10 fully playable now · 15+ coming soon</p>
            </div>
            <Link
              href="/courses"
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
              >
                <Link href={`/courses/${course.slug}`}>
                  <div className={`group p-6 rounded-2xl bg-white/5 border transition-all hover:-translate-y-1 cursor-pointer h-full ${PLAYABLE_SLUGS.has(course.slug) ? "border-indigo-500/30 hover:border-indigo-400/60" : "border-white/10 hover:border-white/25"}`}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <div className="flex items-center gap-2">
                        {PLAYABLE_SLUGS.has(course.slug) && (
                          <span className="text-xs text-indigo-300 bg-indigo-600/20 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
                            ▶ Playable
                          </span>
                        )}
                        <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">
                          {course.estimatedHours}h
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-white/30">{course.category}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-xs text-white/30">{course.totalModules} modules</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-6">🎮</div>
          <h2 className="text-4xl font-bold mb-4">Ready to start playing?</h2>
          <p className="text-white/50 text-lg mb-8">
            Tell us what you want to learn. We'll build your personalised path in 30 seconds.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-lg transition-all shadow-xl shadow-indigo-600/30"
          >
            Get Started — It's Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎮</span>
            <span>LearnThroughGame</span>
          </div>
          <div className="flex gap-6">
            {courseCategories.map((cat) => (
              <Link key={cat} href={`/courses?category=${encodeURIComponent(cat)}`} className="hover:text-white transition-colors hidden sm:inline">
                {cat}
              </Link>
            ))}
          </div>
          <span>© 2026 LearnThroughGame</span>
        </div>
      </footer>
    </div>
  );
}
