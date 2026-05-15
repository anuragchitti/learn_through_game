"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, LayoutDashboard, Award, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/certificate", label: "Certificates", icon: Award },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

        <div className="hidden md:flex items-center gap-3">
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
          </div>
        </div>
      )}
    </nav>
  );
}
