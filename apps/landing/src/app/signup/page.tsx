"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(name, email, password);
      router.push("/pending-approval");
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <img src="/favicon.svg" alt="TechEdu" className="w-7 h-7" />
            <span className="text-lg font-mono font-bold grad-text tracking-wide">
              TechEdu
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6">
            Create your account
          </h1>
          <p className="text-[var(--muted)] text-sm mt-2">
            Sign up, and we&apos;ll review your request shortly.
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
              Full name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)] transition-colors"
              placeholder="Jane Doe"
            />
          </div>

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
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--muted)] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)] transition-colors"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold bg-grad hover:opacity-85 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>

          <p className="text-center text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--violet)] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
