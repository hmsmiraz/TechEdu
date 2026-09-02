"use client";

import Image from "next/image";
import { clearToken } from "@/lib/auth";
import { LANDING_URL } from "@/lib/config";

export default function Header() {
  function handleLogout() {
    clearToken();
    window.location.href = `${LANDING_URL}/login`;
  }

  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/favicon.svg" alt="TechEdu" width={28} height={28} />
          <span className="text-lg font-mono font-bold grad-text tracking-wide">
            TechEdu
          </span>
          <span className="text-sm text-[var(--muted)] ml-2 hidden sm:inline">
            Learning Portal
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-[var(--muted)] hover:text-white transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
