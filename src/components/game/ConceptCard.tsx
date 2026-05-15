"use client";
import { motion } from "framer-motion";
import { ConceptCard as ConceptCardType } from "@/types";
import { Lightbulb } from "lucide-react";

interface Props {
  card: ConceptCardType;
  index: number;
  total: number;
}

export default function ConceptCard({ card, index, total }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8"
    >
      <div className="text-xs text-white/40 mb-1">
        Concept {index + 1} of {total}
      </div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{card.title}</h2>
      <p className="text-white/70 leading-relaxed mb-6">{card.content}</p>

      {card.codeExample && (
        <div className="rounded-xl overflow-hidden border border-white/10 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-white/30 ml-2">{card.language ?? "code"}</span>
          </div>
          <pre className="p-4 text-sm text-green-300 overflow-x-auto leading-relaxed bg-black/30">
            <code>{card.codeExample}</code>
          </pre>
        </div>
      )}

      {card.tip && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <Lightbulb size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-yellow-200/80 text-sm leading-relaxed">{card.tip}</p>
        </div>
      )}
    </motion.div>
  );
}
