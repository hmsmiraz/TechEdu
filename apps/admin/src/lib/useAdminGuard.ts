"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getTokenRole, clearToken } from "./auth";

export function useAdminGuard(): string | null {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const t = getToken();
    if (!t || getTokenRole(t) !== "admin") {
      clearToken();
      router.replace("/login");
      return;
    }
    setTokenState(t);
  }, [router]);

  return token;
}
