import { API_BASE_URL } from "./config";

export type AuthResponse = {
  access_token?: string;
  status?: "pending" | "approved" | "rejected";
  detail?: string;
};

async function postJSON(path: string, body: unknown): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.detail || "Something went wrong. Please try again.");
  }

  return data;
}

export function signup(name: string, email: string, password: string) {
  return postJSON("/auth/signup", { name, email, password });
}

export function login(email: string, password: string) {
  return postJSON("/auth/login", { email, password });
}
