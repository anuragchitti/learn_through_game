"use client";
import { LevelDefinition } from "@/game-engine/types";
import { WorldState } from "@/game-engine/types";
import { CheckCircle, Circle } from "lucide-react";

interface Props {
  level: LevelDefinition;
  state: WorldState;
}

function isObjectiveMet(
  obj: LevelDefinition["objectives"][0],
  state: WorldState
): boolean {
  switch (obj.type) {
    case "reach-exit":
      return state.reachedExit;
    case "collect-all-gems":
      return state.gemsCollected >= state.totalGems && state.totalGems > 0;
    case "collect-gems":
      return state.gemsCollected >= (obj.count ?? 1);
    case "defeat-enemies":
      return state.enemiesDefeated >= state.totalEnemies && state.totalEnemies > 0;
    case "collect-and-exit":
      return state.gemsCollected >= state.totalGems && state.reachedExit;
    default:
      return false;
  }
}

export default function ObjectivesPanel({ level, state }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">
        Objectives
      </div>
      <div className="space-y-2">
        {level.objectives.map((obj, i) => {
          const met = isObjectiveMet(obj, state);
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              {met ? (
                <CheckCircle size={15} className="text-green-400 shrink-0" />
              ) : (
                <Circle size={15} className="text-white/30 shrink-0" />
              )}
              <span className={met ? "text-green-300 line-through opacity-70" : "text-white/70"}>
                {obj.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
