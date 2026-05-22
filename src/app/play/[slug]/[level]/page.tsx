"use client";
import { use, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { editor as MonacoEditorNS } from "monaco-editor";
import { getLevelsForCourse, getLevel, getNextLevel } from "@/game-engine/levels";
import { runUserCode } from "@/game-engine/CodeRunner";
import { CharacterClass, HERO_AVATAR } from "@/game-engine/characters";
import { runCommands, buildInitialState, checkObjectives } from "@/game-engine/WorldEngine";
import { WorldState, LevelDefinition, GameResult } from "@/game-engine/types";
import GameWorld from "@/components/game-ui/GameWorld";
import ConceptPanel from "@/components/game-ui/ConceptPanel";
import ObjectivesPanel from "@/components/game-ui/ObjectivesPanel";
import { Play, RotateCcw, ChevronRight, ChevronLeft, Lightbulb, Trophy, AlertCircle, Zap, CheckCircle, Loader } from "lucide-react";
import { getCourseBySlug } from "@/data/courses";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { saveCompletion, saveLocalXP } from "@/lib/db";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type ValidationState =
  | { status: "idle" }
  | { status: "validating" }
  | { status: "ok"; commandCount: number }
  | { status: "error"; message: string };

type Params = { slug: string; level: string };

export default function PlayPage({ params }: { params: Promise<Params> }) {
  const { slug, level: levelParam } = use(params);
  const router = useRouter();
  const levelNumber = parseInt(levelParam, 10) || 1;

  const course = getCourseBySlug(slug);
  const levelDef = getLevel(slug, levelNumber);
  const levels = getLevelsForCourse(slug);
  const nextLevelDef = getNextLevel(slug, levelNumber);

  const [code, setCode] = useState(levelDef?.starterCode ?? "");
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [prevWorldState, setPrevWorldState] = useState<WorldState | null>(null);
  const [snapshots, setSnapshots] = useState<WorldState[]>([]);
  const [snapshotIndex, setSnapshotIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [characterClass, setCharacterClass] = useState<CharacterClass>("warrior");
  const [validation, setValidation] = useState<ValidationState>({ status: "idle" });

  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const validateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<MonacoEditorNS.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import("monaco-editor") | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("ltg_character") as CharacterClass | null;
    if (saved) setCharacterClass(saved);
  }, []);

  useEffect(() => {
    if (levelDef) {
      resetLevel(levelDef);
    }
  }, [levelDef]);

  // Debounced real-time validation: runs 400ms after user stops typing
  const validateCode = useCallback((currentCode: string, cls: CharacterClass) => {
    if (validateTimer.current) clearTimeout(validateTimer.current);
    setValidation({ status: "validating" });

    validateTimer.current = setTimeout(() => {
      const { commands, error } = runUserCode(currentCode, cls);

      if (error) {
        setValidation({ status: "error", message: error });

        // Add Monaco squiggles when we have editor + monaco refs
        if (editorRef.current && monacoRef.current) {
          const model = editorRef.current.getModel();
          if (model) {
            // Try to extract line number from error (e.g. "SyntaxError ... line 3")
            const lineMatch = error.match(/line\s+(\d+)/i) ?? error.match(/:(\d+):/);
            const line = lineMatch ? parseInt(lineMatch[1], 10) : 1;
            monacoRef.current.editor.setModelMarkers(model, "ltg-validator", [
              {
                severity: monacoRef.current.MarkerSeverity.Error,
                message: error,
                startLineNumber: line,
                endLineNumber: line,
                startColumn: 1,
                endColumn: model.getLineMaxColumn(line),
              },
            ]);
          }
        }
      } else {
        setValidation({ status: "ok", commandCount: commands.length });
        // Clear markers on valid code
        if (editorRef.current && monacoRef.current) {
          const model = editorRef.current.getModel();
          if (model) monacoRef.current.editor.setModelMarkers(model, "ltg-validator", []);
        }
      }
    }, 400);
  }, []);

  // Trigger validation whenever code or class changes
  useEffect(() => {
    if (code.trim()) validateCode(code, characterClass);
    else setValidation({ status: "idle" });
  }, [code, characterClass, validateCode]);

  function handleEditorMount(
    ed: MonacoEditorNS.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor")
  ) {
    editorRef.current = ed;
    monacoRef.current = monaco;

    // Inject hero API type hints for autocomplete via the top-level typescript namespace
    // (monaco 0.55+ uses top-level "typescript" rather than "languages.typescript")
    const classApis: Record<CharacterClass, string> = {
      warrior: "moveRight():void; moveLeft():void; moveUp():void; moveDown():void; move(dir:string):void; attack(dir?:string):void; say(msg:string):void; wait():void; charge(dir?:string):void; shield():void;",
      mage:    "moveRight():void; moveLeft():void; moveUp():void; moveDown():void; move(dir:string):void; attack(dir?:string):void; say(msg:string):void; wait():void; blink(dir:string):void; fireball(dir:string):void;",
      archer:  "moveRight():void; moveLeft():void; moveUp():void; moveDown():void; move(dir:string):void; attack(dir?:string):void; say(msg:string):void; wait():void; shoot(dir:string):void; dash(dir:string):void;",
    };

    const heroTypeDef = `declare const hero: { ${classApis[characterClass]} };`;
    try {
      // Monaco 0.55+: top-level typescript namespace
      const ts = (monaco as unknown as { typescript?: { javascriptDefaults?: { addExtraLib(src: string, path: string): void; getExtraLibs(): Record<string, unknown> } } }).typescript;
      if (ts?.javascriptDefaults) {
        const existing = ts.javascriptDefaults.getExtraLibs();
        if (!existing["ltg-hero"]) {
          ts.javascriptDefaults.addExtraLib(heroTypeDef, "ltg-hero");
        }
      }
    } catch {
      // Type hints are best-effort — don't break if API not available
    }
  }

  function resetLevel(def: LevelDefinition) {
    const initial = buildInitialState(def);
    setWorldState(initial);
    setSnapshots([initial]);
    setSnapshotIndex(0);
    setCode(def.starterCode);
    setCodeError(null);
    setResult(null);
    setIsAnimating(false);
    setShowHint(false);
    setValidation({ status: "idle" });
    if (animRef.current) clearTimeout(animRef.current);
    if (validateTimer.current) clearTimeout(validateTimer.current);
    // Clear markers
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) monacoRef.current.editor.setModelMarkers(model, "ltg-validator", []);
    }
  }

  const runCode = useCallback(() => {
    if (!levelDef) return;
    setCodeError(null);
    setResult(null);
    setIsAnimating(false);
    if (animRef.current) clearTimeout(animRef.current);

    const { commands, error } = runUserCode(code, characterClass);
    if (error) {
      setCodeError(error);
      return;
    }

    const allSnapshots = runCommands(levelDef, commands);
    setSnapshots(allSnapshots);
    setSnapshotIndex(0);
    setPrevWorldState(null);
    setWorldState(allSnapshots[0]);

    // Animate through snapshots
    setIsAnimating(true);
    let i = 0;

    function step() {
      i++;
      if (i < allSnapshots.length) {
        setSnapshotIndex(i);
        setPrevWorldState(allSnapshots[i - 1] ?? null);
        setWorldState(allSnapshots[i]);
        animRef.current = setTimeout(step, 350);
      } else {
        setIsAnimating(false);
        const finalState = allSnapshots[allSnapshots.length - 1];

        if (!finalState.isAlive) {
          setResult({ success: false, reason: finalState.message ?? "The hero was defeated.", gemsCollected: finalState.gemsCollected, commandsUsed: finalState.commandsUsed, xpEarned: 0 });
          return;
        }

        const gameResult = checkObjectives(finalState, levelDef!);
        if (gameResult) {
          setResult(gameResult);
          setXpEarned(gameResult.xpEarned);

          // Fire-and-forget XP persistence — don't block UI
          if (gameResult.success) {
            if (supabase) {
              supabase.auth.getUser().then(({ data }) => {
                if (data.user) {
                  saveCompletion(data.user.id, slug, levelNumber, gameResult.xpEarned);
                } else {
                  // Not logged in — save to localStorage as fallback
                  saveLocalXP(slug, levelNumber, gameResult.xpEarned);
                }
              });
            } else {
              // Supabase not configured — always use localStorage
              saveLocalXP(slug, levelNumber, gameResult.xpEarned);
            }
          }
        } else {
          // Build a partial feedback message
          const missingObjectives = levelDef!.objectives
            .map((obj) => {
              if (obj.type === "reach-exit" && !finalState.reachedExit) return "Reach the exit 🚪";
              if ((obj.type === "collect-all-gems" || obj.type === "collect-and-exit") && finalState.gemsCollected < finalState.totalGems)
                return `Collect all gems (${finalState.gemsCollected}/${finalState.totalGems} so far)`;
              if (obj.type === "defeat-enemies" && finalState.enemiesDefeated < finalState.totalEnemies)
                return `Defeat all enemies (${finalState.enemiesDefeated}/${finalState.totalEnemies})`;
              return null;
            })
            .filter(Boolean);
          setResult({
            success: false,
            reason: `Not done yet: ${missingObjectives.join(", ")}`,
            gemsCollected: finalState.gemsCollected,
            commandsUsed: finalState.commandsUsed,
            xpEarned: 0,
          });
        }
      }
    }

    animRef.current = setTimeout(step, 350);
  }, [code, levelDef, characterClass]);

  if (!levelDef || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2">Level coming soon</h2>
        <p className="text-white/50 mb-6">This level is being crafted. Check back soon!</p>
        <Link href={`/courses/${slug}`} className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold">
          Back to Course
        </Link>
      </div>
    );
  }

  const currentState = worldState ?? buildInitialState(levelDef);

  return (
    <div className="min-h-screen bg-[#0d0d14] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-[#0d0d14]/90 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/courses/${slug}`} className="text-white/40 hover:text-white shrink-0">
            <ChevronLeft size={18} />
          </Link>
          <div className="min-w-0">
            <div className="text-xs text-white/40 truncate">{course.title}</div>
            <div className="font-semibold text-sm truncate">
              Level {levelNumber}: {levelDef.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Character avatar chip */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
            <span>{HERO_AVATAR[characterClass]}</span>
            <span className="capitalize hidden sm:inline">{characterClass}</span>
          </div>
          {/* Level nav */}
          {levelNumber > 1 && (
            <button
              onClick={() => router.push(`/play/${slug}/${levelNumber - 1}`)}
              className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Previous level"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <span className="text-xs text-white/30">{levelNumber}/{levels.length}</span>
          {nextLevelDef && (
            <button
              onClick={() => router.push(`/play/${slug}/${levelNumber + 1}`)}
              className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Next level"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 h-full">
        {/* LEFT: Editor + controls */}
        <div className="flex flex-col border-r border-white/10 min-h-0">
          {/* Mission description */}
          <div className="px-4 py-3 border-b border-white/10 bg-indigo-600/5">
            <p className="text-sm text-white/70">{levelDef.description}</p>
          </div>

          {/* Code editor */}
          <div className="flex-1 min-h-0" style={{ minHeight: "280px" }}>
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              onMount={handleEditorMount}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                folding: false,
                glyphMargin: true,
                renderLineHighlight: "line",
                bracketPairColorization: { enabled: true },
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>

          {/* Validation status bar */}
          <div className="border-t border-white/5 px-4 py-1.5 flex items-center gap-2 bg-[#0d0d14] min-h-[32px]">
            {validation.status === "idle" && (
              <span className="text-xs text-white/20">Write code above to see a live preview</span>
            )}
            {validation.status === "validating" && (
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <Loader size={11} className="animate-spin" />
                Checking...
              </span>
            )}
            {validation.status === "ok" && (
              <span className="flex items-center gap-1.5 text-xs text-green-400/80">
                <CheckCircle size={11} />
                {validation.commandCount} command{validation.commandCount !== 1 ? "s" : ""} ready — press Run
              </span>
            )}
            {validation.status === "error" && (
              <span className="flex items-center gap-1.5 text-xs text-red-400/80 truncate">
                <AlertCircle size={11} className="shrink-0" />
                <span className="truncate">{validation.message}</span>
              </span>
            )}
          </div>

          {/* Control bar */}
          <div className="border-t border-white/10 px-4 py-3 flex items-center gap-3 bg-[#0d0d14]">
            <button
              onClick={runCode}
              disabled={isAnimating || validation.status === "error"}
              title={validation.status === "error" ? "Fix errors before running" : undefined}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
            >
              <Play size={15} />
              {isAnimating ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={() => resetLevel(levelDef)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-colors text-sm"
              title="Reset level"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-yellow-400 hover:bg-yellow-500/10 rounded-xl transition-colors text-sm ml-auto"
            >
              <Lightbulb size={14} />
              Hint
            </button>
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-3 bg-yellow-500/10 border-t border-yellow-500/20 flex items-start gap-2">
                  <Lightbulb size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-200/80">{levelDef.hint}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code error */}
          <AnimatePresence>
            {codeError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 py-3 bg-red-500/10 border-t border-red-500/20 flex items-start gap-2"
              >
                <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <pre className="text-sm text-red-300 font-mono whitespace-pre-wrap">{codeError}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: World + panels */}
        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          {/* Game world */}
          <div className="flex items-center justify-center p-4 rounded-2xl bg-gray-900/60 border border-white/10">
            <GameWorld state={currentState} prevState={prevWorldState ?? undefined} isAnimating={isAnimating} characterClass={characterClass} />
          </div>

          {/* Objectives */}
          <ObjectivesPanel level={levelDef} state={currentState} />

          {/* Concept panel */}
          <ConceptPanel level={levelDef} />
        </div>
      </div>

      {/* Result overlay */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setResult(null); }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className={`w-full max-w-sm rounded-2xl border p-8 text-center ${
                result.success
                  ? "bg-green-900/40 border-green-500/30"
                  : "bg-gray-900 border-white/10"
              }`}
            >
              <div className="text-5xl mb-4">
                {result.success ? "🏆" : "💡"}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {result.success ? "Level Complete!" : "Keep Going!"}
              </h2>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">{result.reason}</p>

              {result.success && (
                <div className="flex items-center justify-center gap-1.5 text-yellow-400 font-semibold mb-6">
                  <Zap size={16} />
                  +{result.xpEarned} XP earned
                </div>
              )}

              <div className="flex flex-col gap-3">
                {result.success && nextLevelDef ? (
                  <button
                    onClick={() => router.push(`/play/${slug}/${levelNumber + 1}`)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    Next Level <ChevronRight size={16} />
                  </button>
                ) : result.success ? (
                  <button
                    onClick={() => router.push(`/courses/${slug}`)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    <Trophy size={16} /> Course Complete!
                  </button>
                ) : null}
                <button
                  onClick={() => { setResult(null); resetLevel(levelDef); }}
                  className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-medium rounded-xl transition-colors"
                >
                  {result.success ? "Replay Level" : "Try Again"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
