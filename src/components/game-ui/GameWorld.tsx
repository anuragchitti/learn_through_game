"use client";
import { motion, AnimatePresence } from "framer-motion";
import { WorldState } from "@/game-engine/types";
import { useEffect, useState } from "react";

interface Props {
  state: WorldState;
  prevState?: WorldState;
  isAnimating: boolean;
}

// Tile visual config
const TILE_STYLE: Record<string, { bg: string; border: string; shadow?: string }> = {
  wall:  { bg: "bg-slate-700", border: "border-slate-600", shadow: "shadow-inner" },
  empty: { bg: "bg-slate-900", border: "border-slate-800" },
  gem:   { bg: "bg-slate-900", border: "border-slate-800" },
  exit:  { bg: "bg-emerald-950", border: "border-emerald-700" },
  hero:  { bg: "bg-slate-900", border: "border-slate-800" },
  enemy: { bg: "bg-red-950",   border: "border-red-800" },
  key:   { bg: "bg-amber-950", border: "border-amber-800" },
  chest: { bg: "bg-amber-950", border: "border-amber-800" },
  spike: { bg: "bg-red-950",   border: "border-red-900" },
  bush:  { bg: "bg-green-950", border: "border-green-800" },
};

const TILE_CONTENT: Record<string, string> = {
  gem:   "💎",
  exit:  "🚪",
  enemy: "👹",
  key:   "🗝️",
  chest: "📦",
  spike: "🔺",
  bush:  "🌿",
  wall:  "",
  empty: "",
  hero:  "",
};

const HERO_DIRECTION_EMOJI: Record<string, string> = {
  right: "🦸",
  left:  "🦸",
  up:    "🦸",
  down:  "🦸",
};

export default function GameWorld({ state, prevState, isAnimating }: Props) {
  const [collectedCells, setCollectedCells] = useState<Set<string>>(new Set());
  const [shakeDead, setShakeDead] = useState(false);

  // Detect newly collected gems for sparkle effect
  useEffect(() => {
    if (!prevState) return;
    const newCollected = new Set<string>();
    prevState.grid.forEach((row, r) =>
      row.forEach((tile, c) => {
        if (tile.type === "gem" && state.grid[r][c].type !== "gem") {
          newCollected.add(`${r}-${c}`);
        }
      })
    );
    if (newCollected.size > 0) {
      setCollectedCells(newCollected);
      setTimeout(() => setCollectedCells(new Set()), 500);
    }
  }, [state, prevState]);

  // Screen shake on death
  useEffect(() => {
    if (prevState?.isAlive && !state.isAlive) {
      setShakeDead(true);
      setTimeout(() => setShakeDead(false), 600);
    }
  }, [state.isAlive, prevState?.isAlive]);

  const cols = state.grid[0]?.length ?? 0;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* World grid */}
      <motion.div
        animate={shakeDead ? { x: [-6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          className="inline-grid gap-1 p-3 rounded-2xl bg-slate-950 border border-slate-700/50 shadow-2xl"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {state.grid.map((row, r) =>
            row.map((tile, c) => {
              const isHero = state.heroPos.row === r && state.heroPos.col === c;
              const cellKey = `${r}-${c}`;
              const style = TILE_STYLE[tile.type] ?? TILE_STYLE.empty;
              const isJustCollected = collectedCells.has(cellKey);

              return (
                <div
                  key={cellKey}
                  className={`
                    relative flex items-center justify-center
                    w-11 h-11 sm:w-13 sm:h-13 rounded-lg
                    border ${style.bg} ${style.border}
                    transition-colors duration-150
                    ${tile.type === "wall" ? "shadow-inner" : ""}
                  `}
                >
                  {/* Wall texture overlay */}
                  {tile.type === "wall" && (
                    <div className="absolute inset-0 rounded-lg opacity-20 bg-gradient-to-br from-slate-500 to-transparent pointer-events-none" />
                  )}

                  {/* Exit glow */}
                  {tile.type === "exit" && (
                    <div className="absolute inset-0 rounded-lg bg-emerald-500/10 animate-pulse pointer-events-none" />
                  )}

                  {/* Tile content (gem, enemy, etc.) */}
                  {!isHero && TILE_CONTENT[tile.type] && (
                    <motion.span
                      className="text-lg sm:text-xl select-none z-10"
                      initial={isJustCollected ? { scale: 1.5, opacity: 1 } : false}
                      animate={isJustCollected ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {TILE_CONTENT[tile.type]}
                    </motion.span>
                  )}

                  {/* Gem sparkle burst */}
                  {isJustCollected && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {["✨", "⭐", "✨"].map((s, i) => (
                        <motion.span
                          key={i}
                          className="absolute text-xs"
                          initial={{ x: 0, y: 0, scale: 1 }}
                          animate={{
                            x: (i - 1) * 20,
                            y: -20,
                            scale: 0,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  {/* Hero */}
                  {isHero && (
                    <motion.div
                      key={`hero-${r}-${c}`}
                      className="absolute inset-0 flex items-center justify-center z-10"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: !state.isAlive ? [0, -10, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-xl sm:text-2xl select-none drop-shadow-lg">
                        {state.isAlive ? "🦸" : "💀"}
                      </span>
                      {/* Hero glow ring */}
                      {state.isAlive && (
                        <div className="absolute inset-0 rounded-lg bg-indigo-500/15 border border-indigo-500/30 pointer-events-none" />
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Torchlight corners */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-amber-400/30 blur-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-400/30 blur-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
      </motion.div>

      {/* Stats bar */}
      <div className="flex items-center gap-5 text-sm">
        {state.totalGems > 0 && (
          <div className="flex items-center gap-1.5">
            <span>💎</span>
            <span className="font-semibold text-white">{state.gemsCollected}</span>
            <span className="text-white/30">/ {state.totalGems}</span>
          </div>
        )}
        {state.totalEnemies > 0 && (
          <div className="flex items-center gap-1.5">
            <span>⚔️</span>
            <span className="font-semibold text-white">{state.enemiesDefeated}</span>
            <span className="text-white/30">/ {state.totalEnemies}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <span>📜</span>
          <span>{state.commandsUsed} cmd{state.commandsUsed !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Message toast */}
      <AnimatePresence mode="wait">
        {state.message && (
          <motion.div
            key={state.message}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`text-sm px-4 py-2 rounded-xl border font-medium ${
              state.message.includes("💀")
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : state.message.includes("⚔️") || state.message.includes("📦")
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-200"
            }`}
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
