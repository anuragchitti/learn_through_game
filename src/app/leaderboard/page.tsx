import { getLeaderboard } from "@/lib/db";
import { supabaseEnabled } from "@/lib/supabase";
import Link from "next/link";

const CLASS_EMOJI: Record<string, string> = {
  warrior: "⚔️",
  mage: "🧙",
  archer: "🏹",
};

const RANK_STYLE: Record<number, { bg: string; border: string; text: string; badge: string }> = {
  0: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", badge: "🥇" },
  1: { bg: "bg-slate-400/10",  border: "border-slate-400/30",  text: "text-slate-300",  badge: "🥈" },
  2: { bg: "bg-amber-700/10",  border: "border-amber-700/30",  text: "text-amber-600",  badge: "🥉" },
};

export default async function LeaderboardPage() {
  const entries = await getLeaderboard(20);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">🏆 Global Leaderboard</h1>
          <p className="text-white/50">Top players ranked by total XP earned</p>
        </div>

        {!supabaseEnabled ? (
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-8 py-12 text-center">
            <p className="text-4xl mb-4">🔌</p>
            <h2 className="text-xl font-semibold mb-2">Connect Supabase to enable the leaderboard</h2>
            <p className="text-white/50 text-sm max-w-sm mx-auto">
              Add <code className="px-1 py-0.5 bg-white/10 rounded text-indigo-300">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="px-1 py-0.5 bg-white/10 rounded text-indigo-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your{" "}
              <code className="px-1 py-0.5 bg-white/10 rounded text-indigo-300">.env.local</code> file, then see{" "}
              <code className="px-1 py-0.5 bg-white/10 rounded text-indigo-300">SUPABASE_SETUP.md</code> for the full setup guide.
            </p>
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-12 text-center">
            <p className="text-4xl mb-4">🌱</p>
            <h2 className="text-xl font-semibold mb-2">No players yet</h2>
            <p className="text-white/50 text-sm">Be the first to complete a level and claim the top spot!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, index) => {
              const style = RANK_STYLE[index] ?? {
                bg: "bg-white/3",
                border: "border-white/8",
                text: "text-white/40",
                badge: null,
              };
              const emoji = CLASS_EMOJI[entry.character_class ?? "warrior"] ?? "⚔️";

              return (
                <div
                  key={entry.id ?? index}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${style.bg} ${style.border}`}
                >
                  {/* Rank */}
                  <div className={`w-10 text-center font-bold text-lg ${style.text} shrink-0`}>
                    {style.badge ?? `#${index + 1}`}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">
                    {emoji}
                  </div>

                  {/* Name + class */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">
                      {entry.username ?? "Anonymous"}
                    </div>
                    <div className="text-xs text-white/40 capitalize">
                      {entry.character_class ?? "warrior"}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right shrink-0">
                    <div className="font-bold text-yellow-400">{entry.total_xp.toLocaleString()} XP</div>
                    <div className="text-xs text-white/40">{entry.levels_completed} level{entry.levels_completed !== 1 ? "s" : ""}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-white/30 text-sm mt-10">
          Complete levels to climb the ranks
        </p>

        <div className="text-center mt-6">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Play &amp; Earn XP →
          </Link>
        </div>
      </div>
    </div>
  );
}
