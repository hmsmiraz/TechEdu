"use client";

import { useEffect, useState } from "react";
import { getToken, clearToken } from "@/lib/auth";
import { fetchModules, UnauthorizedError, type Module } from "@/lib/api";
import { LANDING_URL } from "@/lib/config";
import Header from "@/components/Header";
import ModuleCard from "@/components/ModuleCard";

type LoadState = "checking" | "loading" | "ready" | "error";

export default function HomePage() {
  const [state, setState] = useState<LoadState>("checking");
  const [modules, setModules] = useState<Module[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = `${LANDING_URL}/login`;
      return;
    }

    setState("loading");
    fetchModules(token)
      .then((data) => {
        setModules(data);
        setState("ready");
      })
      .catch((err) => {
        if (err instanceof UnauthorizedError) {
          clearToken();
          window.location.href = `${LANDING_URL}/login`;
          return;
        }
        setErrorMessage(err.message || "Something went wrong.");
        setState("error");
      });
  }, []);

  if (state === "checking" || state === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--muted)] text-sm">Loading your modules…</p>
      </main>
    );
  }

  if (state === "error") {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <p className="text-red-400 text-sm">{errorMessage}</p>
          <p className="text-[var(--muted)] text-sm mt-2">
            Try refreshing the page. If this keeps happening, contact your
            mentor.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-1">Your Modules</h1>
        <p className="text-sm text-[var(--muted)] mb-8">
          Click any video or doc to open it in a new tab.
        </p>

        {modules.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">
            No modules have been added yet — check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {modules
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
