"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, LayoutDashboard, Award, Menu, X, Trophy, LogOut, User, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/certificate", label: "Certificates", icon: Award },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load the current Supabase user on mount
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    setDropdownOpen(false);
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/");
  }

  const initial = userEmail ? userEmail[0].toUpperCase() : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <span className="text-2xl">🎮</span>
          <span className="hidden sm:inline">
            Learn<span className="text-indigo-400">Through</span>Game
          </span>
          <span className="sm:hidden text-indigo-400">LTG</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-indigo-600 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop right: user state */}
        <div className="hidden md:flex items-center gap-3">
          {userEmail ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
                aria-label="User menu"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                  {initial}
                </span>
                <span className="text-sm text-white/70 max-w-[120px] truncate">{userEmail}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#13131c] border border-white/10 rounded-xl shadow-xl py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-xs text-white/40 truncate">{userEmail}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User size={14} />
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Settings size={14} />
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth"
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/onboarding"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Start Learning
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0f] px-4 py-4 flex flex-col gap-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-indigo-600 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-3 mt-1 flex flex-col gap-2">
            {userEmail ? (
              <>
                <div className="px-4 py-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {initial}
                  </span>
                  <span className="text-sm text-white/60 truncate">{userEmail}</span>
                </div>
                <Link
                  href="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); handleSignOut(); }}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/5 rounded-xl transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-white/70 hover:text-white">
                  Sign in
                </Link>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl text-center"
                >
                  Start Learning
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
