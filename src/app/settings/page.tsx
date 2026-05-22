// Run this SQL in Supabase SQL Editor before using "Delete my data":
// create or replace function delete_my_account()
// returns void language plpgsql security definer as $$
// begin
//   delete from level_completions where user_id = auth.uid();
//   delete from profiles where id = auth.uid();
// end; $$;

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getUserProfile, upsertProfile, deleteMyData } from "@/lib/db";
import { CharacterClass, characters } from "@/game-engine/characters";
import { Settings, Loader, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [characterClass, setCharacterClass] = useState<CharacterClass>("warrior");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  // Danger zone
  const [deleteInput, setDeleteInput] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setLoading(false);
        return;
      }
      setUserId(data.user.id);
      const profile = await getUserProfile(data.user.id);
      if (profile) {
        setUsername(profile.username ?? "");
        setCharacterClass((profile.character_class as CharacterClass) ?? "warrior");
      }
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!userId) return;
    setSaving(true);
    setSaveMsg(null);
    await upsertProfile(userId, { username, character_class: characterClass });
    // Also persist to sessionStorage so play page picks it up
    sessionStorage.setItem("ltg_character", characterClass);
    setSaving(false);
    setSaveMsg("Changes saved!");
    setTimeout(() => setSaveMsg(null), 3000);
  }

  async function handleDelete() {
    if (deleteInput !== "DELETE") return;
    setDeleting(true);
    setDeleteError(null);
    const { error } = await deleteMyData();
    if (error) {
      setDeleteError(error);
      setDeleting(false);
      return;
    }
    router.push("/?deleted=1");
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <Settings size={40} className="text-white/20 mb-4" />
        <h2 className="text-xl font-bold mb-2">Settings unavailable</h2>
        <p className="text-white/50 mb-4">Supabase is not configured in this environment.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={28} className="animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <Settings size={40} className="text-white/20 mb-4" />
        <h2 className="text-xl font-bold mb-2">Sign in to access settings</h2>
        <Link
          href="/auth"
          className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings size={24} className="text-indigo-400" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Profile section */}
        <section className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-5">Profile</h2>

          <div className="mb-5">
            <label className="block text-sm text-white/60 mb-1.5" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your display name"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            />
          </div>

          {/* Character class */}
          <div className="mb-6">
            <label className="block text-sm text-white/60 mb-3">Character Class</label>
            <div className="grid grid-cols-3 gap-3">
              {characters.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCharacterClass(c.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-sm font-medium ${
                    characterClass === c.id
                      ? `${c.colorBg} border-opacity-80`
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className={characterClass === c.id ? c.color : "text-white/60"}>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              {saving ? <Loader size={14} className="animate-spin" /> : null}
              Save changes
            </button>
            {saveMsg && (
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <CheckCircle size={14} />
                {saveMsg}
              </span>
            )}
          </div>
        </section>

        {/* Danger zone */}
        <section className="p-6 rounded-2xl border border-red-500/30 bg-red-500/5">
          <h2 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} />
            Danger Zone
          </h2>
          <p className="text-sm text-white/50 mb-5">
            Permanently delete all your data — progress, XP, and profile. This cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-2.5 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium"
            >
              Delete my data
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-red-300">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 placeholder-red-400/30 focus:outline-none focus:border-red-400 transition-colors text-sm font-mono"
              />
              {deleteError && (
                <p className="text-xs text-red-400">{deleteError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleteInput !== "DELETE" || deleting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {deleting ? <Loader size={14} className="animate-spin" /> : null}
                  Yes, delete everything
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setDeleteInput(""); setDeleteError(null); }}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
