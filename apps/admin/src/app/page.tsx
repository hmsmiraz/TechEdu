"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getTokenRole } from "@/lib/auth";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token && getTokenRole(token) === "admin") {
      router.replace("/users");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
