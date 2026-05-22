import { supabase } from "@/lib/supabase";
import { getProgress, saveProgress } from "@/lib/progress";

export interface LeaderboardEntry {
  id?: string;
  username: string | null;
  character_class: string | null;
  total_xp: number;
  levels_completed: number;
}

export interface ProfileData {
  id: string;
  username: string | null;
  character_class: string | null;
  total_xp: number;
  levels_completed: number;
  created_at?: string;
}

/**
 * Save a level completion to Supabase (or no-op if supabase is null).
 * Also increments total_xp and levels_completed in the profiles table.
 */
export async function saveCompletion(
  userId: string,
  courseSlug: string,
  levelNumber: number,
  xpEarned: number
): Promise<void> {
  if (!supabase) return;

  // Upsert level completion (unique per user/course/level)
  const { error: completionError } = await supabase
    .from("level_completions")
    .upsert(
      {
        user_id: userId,
        course_slug: courseSlug,
        level_number: levelNumber,
        xp_earned: xpEarned,
      },
      { onConflict: "user_id,course_slug,level_number" }
    );

  if (completionError) {
    console.error("saveCompletion error:", completionError);
    return;
  }

  // Fetch current profile to accumulate XP correctly
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp, levels_completed")
    .eq("id", userId)
    .single();

  const currentXP = profile?.total_xp ?? 0;
  const currentLevels = profile?.levels_completed ?? 0;

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      total_xp: currentXP + xpEarned,
      levels_completed: currentLevels + 1,
    },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("saveCompletion profile upsert error:", profileError);
  }
}

/**
 * Save XP to localStorage (fallback when user is not logged in).
 */
export function saveLocalXP(
  courseSlug: string,
  levelNumber: number,
  xpEarned: number
): void {
  const progress = getProgress(courseSlug);
  if (!progress) return;

  const levelKey = `level_${levelNumber}`;
  if (!progress.completedModules.includes(levelKey)) {
    progress.completedModules.push(levelKey);
    progress.xp += xpEarned;
    saveProgress(progress);
  }
}

/**
 * Fetch top players ordered by XP.
 * Falls back to [] if supabase is null.
 */
export async function getLeaderboard(limit = 20): Promise<LeaderboardEntry[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, character_class, total_xp, levels_completed")
    .order("total_xp", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getLeaderboard error:", error);
    return [];
  }

  return (data ?? []) as LeaderboardEntry[];
}

/**
 * Get a single user's profile.
 */
export async function getUserProfile(userId: string): Promise<ProfileData | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("getUserProfile error:", error);
    return null;
  }

  return data as ProfileData;
}

/**
 * Create or update a user's profile metadata (username, character_class).
 */
export async function upsertProfile(
  userId: string,
  data: { username?: string; character_class?: string }
): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...data }, { onConflict: "id" });

  if (error) {
    console.error("upsertProfile error:", error);
  }
}
