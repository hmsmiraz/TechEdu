// NOTE: localStorage is used here for simplicity in this MVP. It's
// vulnerable to XSS token theft in a way an httpOnly cookie wouldn't be.
// Worth revisiting once the gateway exists — a backend-for-frontend
// pattern setting an httpOnly cookie would be the more hardened approach.
const TOKEN_KEY = "techedu_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}
