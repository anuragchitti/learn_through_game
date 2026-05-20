"use client";
import { motion, AnimatePresence } from "framer-motion";
import { WorldState, TileType } from "@/game-engine/types";

interface Props {
  state: WorldState;
  isAnimating: boolean;
}

const TILE_BG: Partial<Record<TileType, string>> = {
  wall:  "bg-gray-700",
  empty: "bg-gray-900",
  gem:   "bg-gray-900",
  exit:  "bg-green-900/40",
  hero:  "bg-gray-900",
  enemy: "bg-red-900/30",
  key:   "bg-yellow-900/30",
  chest: "bg-yellow-900/30",
  spike: "bg-red-900/40",
  bush:  "bg-green-900/30",
};

const TILE_EMOJI: Partial<Record<TileType, string>> = {
  wall:  "🧱",
  gem:   "💎",
  exit:  "🚪",
  enemy: "👹",
  key:   "🗝️",
  chest: "📦",
  spike: "🔺",
  bush:  "🌿",
};

const HERO_EMOJI = "🦸";

export default function GameWorld({ state, isAnimating }: Props) {
  const rows = state.grid.length;
  const cols = state.grid[0]?.length ?? 0;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Grid */}
      <div
        className="inline-grid gap-0.5 p-2 rounded-xl bg-gray-800/60 border border-white/10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {state.grid.map((row, r) =>
          row.map((tile, c) => {
            const isHero = state.heroPos.row === r && state.heroPos.col === c;
            const bg = TILE_BG[tile.type] ?? "bg-gray-900";

            return (
              <div
                key={`${r}-${c}`}
                className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md text-xl sm:text-2xl ${bg} select-none`}
              >
                {/* Tile content */}
                {!isHero && TILE_EMOJI[tile.type] && (
                  <span>{TILE_EMOJI[tile.type]}</span>
                )}

                {/* Hero — animated */}
                <AnimatePresence>
                  {isHero && (
                    <motion.span
                      key="hero"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: isAnimating ? [1, 1.15, 1] : 1,
                        opacity: 1,
                      }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl z-10"
                    >
                      {state.isAlive ? HERO_EMOJI : "💀"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 text-sm text-white/60">
        {state.totalGems > 0 && (
          <span>💎 {state.gemsCollected}/{state.totalGems}</span>
        )}
        {state.totalEnemies > 0 && (
          <span>⚔️ {state.enemiesDefeated}/{state.totalEnemies}</span>
        )}
        <span>📜 {state.commandsUsed} commands</span>
      </div>

      {/* Message */}
      <AnimatePresence>
        {state.message && (
          <motion.div
            key={state.message}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-lg"
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
