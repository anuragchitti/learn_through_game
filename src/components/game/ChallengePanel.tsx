"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Challenge } from "@/types";
import Button from "@/components/ui/Button";
import { Lightbulb, CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface Props {
  challenge: Challenge;
  onSuccess: (xp: number) => void;
  onFail: () => void;
  xpReward: number;
}

export default function ChallengePanel({ challenge, onSuccess, onFail, xpReward }: Props) {
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function checkAnswer(): boolean {
    if (challenge.type === "predict-output" && challenge.options) {
      return selectedOption === challenge.correctOption;
    }
    const userAnswer = answer.trim().replace(/\s+/g, " ");
    const correct = challenge.solution.trim().replace(/\s+/g, " ");
    return userAnswer.toLowerCase() === correct.toLowerCase();
  }

  function handleSubmit() {
    const correct = checkAnswer();
    setIsCorrect(correct);
    setSubmitted(true);
    if (!correct) onFail();
  }

  function handleContinue() {
    if (isCorrect) onSuccess(xpReward);
  }

  function showHint() {
    setHintIndex((i) => Math.min(i + 1, challenge.hints.length - 1));
  }

  const canSubmit =
    challenge.type === "predict-output"
      ? selectedOption !== null
      : answer.trim().length > 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
      <div className="text-xs text-indigo-400 font-medium mb-2 uppercase tracking-wide">
        Challenge
      </div>
      <h2 className="text-xl font-bold mb-2">{challenge.title}</h2>
      <p className="text-white/60 leading-relaxed mb-6">{challenge.description}</p>

      {/* Starter code */}
      {challenge.starterCode && challenge.type !== "predict-output" && (
        <div className="rounded-xl overflow-hidden border border-white/10 mb-6">
          <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-white/30">
            starter code
          </div>
          <pre className="p-4 text-sm text-white/80 bg-black/30 overflow-x-auto leading-relaxed">
            <code>{challenge.starterCode}</code>
          </pre>
        </div>
      )}

      {/* Multiple choice (predict-output) */}
      {challenge.type === "predict-output" && challenge.options && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {challenge.options.map((opt, i) => (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelectedOption(i)}
              className={`p-4 rounded-xl border text-sm font-mono transition-all text-left ${
                submitted
                  ? i === challenge.correctOption
                    ? "border-green-500 bg-green-500/10 text-green-300"
                    : selectedOption === i && i !== challenge.correctOption
                    ? "border-red-500 bg-red-500/10 text-red-300"
                    : "border-white/10 text-white/30"
                  : selectedOption === i
                  ? "border-indigo-500 bg-indigo-500/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Text answer input */}
      {challenge.type !== "predict-output" && !submitted && (
        <div className="mb-6">
          <label className="text-sm text-white/50 mb-2 block">Your answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your solution here..."
            rows={4}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>
      )}

      {/* Hints */}
      {!submitted && challenge.hints.length > 0 && (
        <div className="mb-6">
          {hintIndex >= 0 && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-3">
              <Lightbulb size={14} className="text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-yellow-200/80 text-sm">{challenge.hints[hintIndex]}</p>
            </div>
          )}
          {hintIndex < challenge.hints.length - 1 && (
            <button
              onClick={showHint}
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <Lightbulb size={13} />
              {hintIndex < 0 ? "Need a hint?" : "Another hint"}
            </button>
          )}
        </div>
      )}

      {/* Result */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-xl border mb-6 ${
              isCorrect
                ? "border-green-500/40 bg-green-500/10"
                : "border-red-500/40 bg-red-500/10"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle size={18} className="text-green-400" />
              ) : (
                <XCircle size={18} className="text-red-400" />
              )}
              <span className={`font-semibold ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                {isCorrect ? `Correct! +${xpReward} XP` : "Not quite — read the explanation below"}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{challenge.explanation}</p>
            {!isCorrect && (
              <div className="mt-3 p-3 rounded-lg bg-black/20">
                <div className="text-xs text-white/40 mb-1">Correct answer:</div>
                <pre className="text-green-300 text-sm font-mono">{challenge.solution}</pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!canSubmit} className="flex-1">
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleContinue} className="flex-1 flex items-center justify-center gap-2">
            {isCorrect ? "Continue" : "Try Again"}
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
