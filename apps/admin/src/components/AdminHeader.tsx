"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.replace("/login");
  }

  const tabs = [
    { href: "/users", label: "Users" },
    { href: "/content", label: "Content" },
  ];

  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="TechEdu" className="w-7 h-7" />
            <span className="text-lg font-mono font-bold grad-text tracking-wide">
              TechEdu Admin
            </span>
          </div>
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  pathname === tab.href
                    ? "bg-[var(--card)] text-white border border-[var(--border)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
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
