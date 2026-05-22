"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GitBranch, Mail, Eye, EyeOff, Info } from "lucide-react";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { upsertProfile } from "@/lib/db";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!supabase) {
      // Demo mode — just redirect
      await new Promise((r) => setTimeout(r, 600));
      setLoading(false);
      router.push(next);
      return;
    }

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Save character class from onboarding sessionStorage
        const characterClass =
          (typeof window !== "undefined" &&
            sessionStorage.getItem("ltg_character")) ||
          "warrior";
        await upsertProfile(data.user.id, {
          username: name || email.split("@")[0],
          character_class: characterClass,
        });
      }

      setMessage(
        "Check your email to confirm your account, then sign in below."
      );
      setMode("signin");
    } else {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const characterClass =
          (typeof window !== "undefined" &&
            sessionStorage.getItem("ltg_character")) ||
          "warrior";
        await upsertProfile(data.user.id, { character_class: characterClass });
      }

      router.push(next);
    }

    setLoading(false);
  }

  async function handleOAuth(provider: "github" | "google") {
    if (!supabase) {
      router.push(next);
      return;
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}${next}` },
    });

    if (oauthError) {
      setError(oauthError.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🎮</span>
          <h1 className="text-2xl font-bold mb-1">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-white/50 text-sm">
            {mode === "signup"
              ? "Start learning for free — no credit card needed"
              : "Continue your learning journey"}
          </p>
        </div>

        {/* Demo mode notice */}
        {!supabaseEnabled && (
          <div className="mb-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300">
            <Info size={16} className="shrink-0 mt-0.5" />
            <span>
              <strong>Demo mode</strong> — Supabase is not configured. Progress
              is saved locally and auth redirects immediately.
            </span>
          </div>
        )}

        {/* Error / info messages */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-300">
            {message}
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth("github")}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-xl transition-colors"
            >
              <GitBranch size={18} />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleOAuth("google")}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-xl transition-colors"
            >
              <span className="text-lg">G</span>
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm text-white/50 block mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-white/50 block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-white/50 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors mt-2"
            >
              {loading
                ? "Loading..."
                : mode === "signup"
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            {mode === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "signup" ? "signin" : "signup");
                setError(null);
                setMessage(null);
              }}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              {mode === "signup" ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white/50">
          Loading...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
