"use client";
import { useState } from "react";
import { LevelDefinition } from "@/game-engine/types";
import { Lightbulb, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface Props {
  level: LevelDefinition;
}

export default function ConceptPanel({ level }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
          <BookOpen size={15} />
          {level.concept}
        </div>
        {expanded ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-white/70 leading-relaxed">
            {level.conceptExplanation}
          </p>

          <div className="rounded-lg overflow-hidden border border-white/10">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border-b border-white/10">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-white/30">example</span>
            </div>
            <pre className="p-3 text-xs text-green-300 overflow-x-auto leading-relaxed bg-black/30">
              <code>{level.codeExample}</code>
            </pre>
          </div>

          {level.tip && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Lightbulb size={13} className="text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-200/80 leading-relaxed">{level.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
