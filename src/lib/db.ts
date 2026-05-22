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
 * Save a level completion to Supabase.
 * Skips if the level was already completed (no XP double-counting on replays).
 * Recomputes total_xp and levels_completed from all rows to stay accurate.
 */
export async function saveCompletion(
  userId: string,
  courseSlug: string,
  levelNumber: number,
  xpEarned: number
): Promise<void> {
  if (!supabase) return;

  // Skip if already completed — replaying a level should not award XP again
  const { data: existing } = await supabase
    .from("level_completions")
    .select("id")
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .eq("level_number", levelNumber)
    .single();

  if (existing) return;

  const { error: completionError } = await supabase
    .from("level_completions")
    .insert({ user_id: userId, course_slug: courseSlug, level_number: levelNumber, xp_earned: xpEarned });

  if (completionError) {
    console.error("saveCompletion error:", completionError);
    return;
  }

  // Recompute totals from all rows so the counter is always accurate
  const { data: allCompletions } = await supabase
    .from("level_completions")
    .select("xp_earned")
    .eq("user_id", userId);

  const totalXP = (allCompletions ?? []).reduce((sum, r) => sum + (r.xp_earned ?? 0), 0);
  const levelsCompleted = (allCompletions ?? []).length;

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: userId, total_xp: totalXP, levels_completed: levelsCompleted }, { onConflict: "id" });

  if (profileError) {
    console.error("saveCompletion profile upsert error:", profileError);
  }
}

/** Save XP to localStorage (fallback for unauthenticated users). */
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

/** Fetch all completed levels for a user. */
export async function getUserCompletions(userId: string): Promise<{
  courseSlug: string;
  levelNumber: number;
  xpEarned: number;
  completedAt: string;
}[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("level_completions")
    .select("course_slug, level_number, xp_earned, completed_at")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (error) return [];

  return (data ?? []).map((r) => ({
    courseSlug: r.course_slug,
    levelNumber: r.level_number,
    xpEarned: r.xp_earned,
    completedAt: r.completed_at,
  }));
}

/** Fetch top players ordered by XP. Returns [] if Supabase not configured. */
export async function getLeaderboard(limit = 20): Promise<LeaderboardEntry[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, character_class, total_xp, levels_completed")
    .order("total_xp", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []) as LeaderboardEntry[];
}

/** Get a single user's profile row. */
export async function getUserProfile(userId: string): Promise<ProfileData | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data as ProfileData;
}

/** Delete the current user's data and sign them out. */
export async function deleteMyData(): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.rpc("delete_my_account");
  if (error) return { error: error.message };
  await supabase.auth.signOut();
  return { error: null };
}

/** Create or update profile metadata (username, character_class). */
export async function upsertProfile(
  userId: string,
  profileData: { username?: string; character_class?: string }
): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...profileData }, { onConflict: "id" });

  if (error) {
    console.error("upsertProfile error:", error);
  }
}
