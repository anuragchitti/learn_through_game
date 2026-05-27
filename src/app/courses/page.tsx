"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { courses, courseCategories } from "@/data/courses";
import { Search } from "lucide-react";

const PLAYABLE_SLUGS = new Set(["javascript", "python", "typescript", "react", "sql", "html-css", "git-github", "nodejs", "linux", "dsa", "nextjs", "mongodb", "docker", "redis", "graphql", "kubernetes", "aws", "cicd"]);

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = courses.filter((c) => {
    const matchesCat = category === "all" || c.category === category;
    const matchesQuery =
      !query ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">All Courses</h1>
          <p className="text-white/50">
            {courses.length} courses across {courseCategories.length} categories
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              category === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            All ({courses.length})
          </button>
          {courseCategories.map((cat) => {
            const count = courses.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            No courses match your search. Try a different term.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <Link href={`/courses/${course.slug}`}>
                  <div className={`group h-full p-6 rounded-2xl bg-white/5 border hover:-translate-y-1 transition-all cursor-pointer ${PLAYABLE_SLUGS.has(course.slug) ? "border-indigo-500/30 hover:border-indigo-400/60" : "border-white/10 hover:border-white/25"}`}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <div className="text-right flex flex-col items-end gap-1">
                        {PLAYABLE_SLUGS.has(course.slug) && (
                          <span className="text-xs text-indigo-300 bg-indigo-600/20 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
                            ▶ Playable
                          </span>
                        )}
                        <div className="text-xs text-white/40">{course.estimatedHours}h</div>
                        <div className="text-xs text-white/40">{course.totalModules} modules</div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30">
                      {course.category}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white/50">Loading...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
