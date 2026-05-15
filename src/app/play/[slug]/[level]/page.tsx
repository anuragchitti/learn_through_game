"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getCourseBySlug } from "@/data/courses";
import { getModules } from "@/data/modules";
import { getProgress, initProgress, completeModule, loseLife, saveProgress } from "@/lib/progress";
import { Level, UserProgress } from "@/types";
import GameHeader from "@/components/game/GameHeader";
import ConceptCard from "@/components/game/ConceptCard";
import ChallengePanel from "@/components/game/ChallengePanel";
import { Trophy, ArrowRight, Heart } from "lucide-react";

type Params = { slug: string; level: string };
type Stage = "concepts" | "challenge" | "module-complete" | "level-complete" | "no-lives";

export default function PlayPage({ params }: { params: Promise<Params> }) {
  const { slug, level } = use(params);
  const router = useRouter();

  const course = getCourseBySlug(slug);
  const modules = getModules(slug, level);

  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("concepts");

  useEffect(() => {
    let p = getProgress(slug);
    if (!p) {
      p = initProgress("guest", {
        courseSlug: slug,
        goal: "learn-for-fun",
        knowledge: "complete-beginner",
      });
    }
    setProgress(p);
    setModuleIndex(p.currentModule);
  }, [slug]);

  if (!course) return <div className="min-h-screen flex items-center justify-center text-white/50">Course not found</div>;

  if (modules.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-white/50 mb-6">Full content for this level is being built. Check back soon!</p>
        <button onClick={() => router.push(`/courses/${slug}`)} className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold">
          Back to Course
        </button>
      </div>
    );
  }

  const currentModule = modules[moduleIndex];
  if (!currentModule || !progress) {
    return <div className="min-h-screen flex items-center justify-center text-white/50">Loading...</div>;
  }

  function handleNextCard() {
    const total = currentModule.conceptCards.length;
    if (cardIndex < total - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setStage("challenge");
    }
  }

  function handleChallengeSuccess(xp: number) {
    const updated = completeModule(slug, currentModule.id, xp);
    if (updated) setProgress({ ...updated });

    if (moduleIndex < modules.length - 1) {
      setStage("module-complete");
    } else {
      setStage("level-complete");
    }
  }

  function handleChallengeFail() {
    const updated = loseLife(slug);
    if (updated) {
      setProgress({ ...updated });
      if (updated.lives <= 0) {
        setStage("no-lives");
      }
    }
  }

  function handleNextModule() {
    setModuleIndex(moduleIndex + 1);
    setCardIndex(0);
    setStage("concepts");
  }

  function handleRetry() {
    if (progress) {
      const updated = { ...progress, lives: 3 };
      saveProgress(updated);
      setProgress(updated);
      setStage("concepts");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <GameHeader
        courseTitle={course.title}
        courseSlug={slug}
        level={level as Level}
        xp={progress.xp}
        lives={progress.lives}
        moduleIndex={moduleIndex}
        totalModules={modules.length}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Module title */}
        <div className="mb-6">
          <div className="text-xs text-white/30 mb-1">Module {moduleIndex + 1} of {modules.length}</div>
          <h1 className="text-2xl font-bold">{currentModule.title}</h1>
        </div>

        <AnimatePresence mode="wait">
          {/* Concept cards */}
          {stage === "concepts" && (
            <motion.div key={`card-${cardIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ConceptCard
                card={currentModule.conceptCards[cardIndex]}
                index={cardIndex}
                total={currentModule.conceptCards.length}
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNextCard}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all"
                >
                  {cardIndex < currentModule.conceptCards.length - 1 ? "Next Concept" : "Start Challenge"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Challenge */}
          {stage === "challenge" && (
            <motion.div key="challenge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ChallengePanel
                challenge={currentModule.challenge}
                onSuccess={handleChallengeSuccess}
                onFail={handleChallengeFail}
                xpReward={currentModule.xpReward}
              />
            </motion.div>
          )}

          {/* Module complete */}
          {stage === "module-complete" && (
            <motion.div
              key="module-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">⭐</div>
              <h2 className="text-3xl font-bold mb-2">Module Complete!</h2>
              <p className="text-white/50 mb-2">+{currentModule.xpReward} XP earned</p>
              <p className="text-white/30 text-sm mb-8">Total: {progress.xp} XP</p>
              <button
                onClick={handleNextModule}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 mx-auto"
              >
                Next Module <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* Level complete */}
          {stage === "level-complete" && (
            <motion.div
              key="level-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Level Complete! 🎉</h2>
              <p className="text-white/60 mb-6">
                You've finished the {level} level of {course.title}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push(`/dashboard`)}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl"
                >
                  View Dashboard
                </button>
                <button
                  onClick={() => router.push(`/courses/${slug}`)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2"
                >
                  Next Level <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* No lives */}
          {stage === "no-lives" && (
            <motion.div
              key="no-lives"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[0, 1, 2].map((i) => <Heart key={i} size={32} className="text-white/10" />)}
              </div>
              <h2 className="text-3xl font-bold mb-2">Out of lives!</h2>
              <p className="text-white/50 mb-8">
                Take a break, re-read the concept, and come back stronger.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => { setStage("concepts"); setCardIndex(0); }}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl"
                >
                  Re-read Concept
                </button>
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl"
                >
                  Try Again (3 lives restored)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
