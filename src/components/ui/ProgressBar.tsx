"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: string;
  label?: string;
}

export default function ProgressBar({
  value,
  max,
  className,
  color = "bg-indigo-500",
  label,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
