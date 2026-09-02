"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { setToken, getTokenRole } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);

      if (res.status !== "approved" || !res.access_token) {
        setError(res.detail || "Login failed.");
        return;
      }

      const role = getTokenRole(res.access_token);
      if (role !== "admin") {
        setError("This account doesn't have admin access.");
        return;
      }

      setToken(res.access_token);
      router.replace("/users");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <img src="/favicon.svg" alt="TechEdu" className="w-7 h-7" />
            <span className="text-lg font-mono font-bold grad-text tracking-wide">
              TechEdu Admin
            </span>
          </div>
          <p className="text-[var(--muted)] text-sm mt-2">
            Sign in with your admin account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-4"
        >
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[var(--muted)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)] transition-colors"
              placeholder="admin@techedu.dev"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--muted)] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold bg-grad hover:opacity-85 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Log In"}
          </button>
        </form>
      </div>
    </main>
  );
}
