"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/data/courses";
import { Goal, ExistingKnowledge, OnboardingAnswers, CourseCategory } from "@/types";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const goals: { value: Goal; label: string; icon: string; desc: string }[] = [
  { value: "get-a-job", label: "Get a job", icon: "💼", desc: "Learn what employers actually look for" },
  { value: "build-project", label: "Build a project", icon: "🔨", desc: "Make something real from scratch" },
  { value: "learn-for-fun", label: "Learn for fun", icon: "🎉", desc: "Explore at my own pace, no pressure" },
  { value: "upskill", label: "Upskill", icon: "📈", desc: "Level up in my current role" },
];

const knowledgeLevels: { value: ExistingKnowledge; label: string; icon: string; desc: string }[] = [
  { value: "complete-beginner", label: "Complete beginner", icon: "🌱", desc: "Never done this before" },
  { value: "know-a-little", label: "Know a little", icon: "🌿", desc: "I've seen some code/concepts" },
  { value: "intermediate", label: "Intermediate", icon: "🌳", desc: "Comfortable with the basics" },
  { value: "just-refreshing", label: "Just refreshing", icon: "🎓", desc: "I know it well, want a refresher" },
];

const STEPS = ["What to learn", "Your goal", "Your level", "Let's go"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | "all">("all");

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const categories = Array.from(new Set(courses.map((c) => c.category)));

  function handleCourseSelect(slug: string) {
    setAnswers((prev) => ({ ...prev, courseSlug: slug }));
    setStep(1);
  }

  function handleGoalSelect(goal: Goal) {
    setAnswers((prev) => ({ ...prev, goal }));
    setStep(2);
  }

  function handleKnowledgeSelect(knowledge: ExistingKnowledge) {
    setAnswers((prev) => ({ ...prev, knowledge }));
    setStep(3);
  }

  function handleStart() {
    if (!answers.courseSlug || !answers.goal || !answers.knowledge) return;
    sessionStorage.setItem("ltg_onboarding", JSON.stringify(answers));
    router.push(`/auth?next=/courses/${answers.courseSlug}`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-10">
        <div className="flex items-center gap-2 mb-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? "bg-indigo-600 text-white"
                    : i === step
                    ? "bg-indigo-600/50 border-2 border-indigo-500 text-white"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < step ? "bg-indigo-600" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-white/40">
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Choose course */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-4xl"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
              What do you want to learn?
            </h1>
            <p className="text-white/50 text-center mb-8">
              Pick a course. We'll build your personalised learning path.
            </p>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-white/60 hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelect(course.slug)}
                  className={`text-left p-5 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                    answers.courseSlug === course.slug
                      ? "border-indigo-500 bg-indigo-600/20"
                      : "border-white/10 bg-white/5 hover:border-white/25"
                  }`}
                >
                  <span className="text-3xl mb-3 block">{course.icon}</span>
                  <h3 className="font-semibold text-white mb-1">{course.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-3 text-xs text-white/30">{course.estimatedHours}h · {course.category}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Goal */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-xl"
          >
            <button
              onClick={() => setStep(0)}
              className="flex items-center gap-1 text-white/40 hover:text-white mb-6 text-sm"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
              What&apos;s your goal?
            </h1>
            <p className="text-white/50 text-center mb-8">
              This helps us tailor the content and examples for you.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {goals.map((g) => (
                <button
                  key={g.value}
                  onClick={() => handleGoalSelect(g.value)}
                  className="text-left p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all"
                >
                  <span className="text-3xl mb-3 block">{g.icon}</span>
                  <h3 className="font-semibold text-white mb-1">{g.label}</h3>
                  <p className="text-white/50 text-sm">{g.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Knowledge level */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-xl"
          >
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-white/40 hover:text-white mb-6 text-sm"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
              How much do you already know?
            </h1>
            <p className="text-white/50 text-center mb-8">
              Be honest — we'll start you at exactly the right level.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {knowledgeLevels.map((k) => (
                <button
                  key={k.value}
                  onClick={() => handleKnowledgeSelect(k.value)}
                  className="text-left p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all"
                >
                  <span className="text-3xl mb-3 block">{k.icon}</span>
                  <h3 className="font-semibold text-white mb-1">{k.label}</h3>
                  <p className="text-white/50 text-sm">{k.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Summary + start */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg text-center"
          >
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Your path is ready!
            </h1>
            {(() => {
              const course = courses.find((c) => c.slug === answers.courseSlug);
              const goal = goals.find((g) => g.value === answers.goal);
              const knowledge = knowledgeLevels.find((k) => k.value === answers.knowledge);
              return (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{course?.icon}</span>
                    <div>
                      <div className="text-xs text-white/40">Course</div>
                      <div className="font-semibold">{course?.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal?.icon}</span>
                    <div>
                      <div className="text-xs text-white/40">Goal</div>
                      <div className="font-semibold">{goal?.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{knowledge?.icon}</span>
                    <div>
                      <div className="text-xs text-white/40">Starting level</div>
                      <div className="font-semibold">{knowledge?.label}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
            <button
              onClick={handleStart}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              Sign in & Start Learning
              <ArrowRight size={20} />
            </button>
            <p className="text-white/30 text-sm mt-4">
              Free account · No credit card needed
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
