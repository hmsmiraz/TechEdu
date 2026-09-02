"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "@/lib/auth";
import { LANDING_URL } from "@/lib/config";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      window.location.href = `${LANDING_URL}/login`;
      return;
    }
    setToken(token);
    router.replace("/");
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-[var(--muted)] text-sm">Signing you in…</p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackHandler />
    </Suspense>
  );
}
