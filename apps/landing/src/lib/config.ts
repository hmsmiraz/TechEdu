// Central place for env-driven URLs. Set these in .env.local (see .env.example).
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export const LEARNING_PORTAL_URL =
  process.env.NEXT_PUBLIC_LEARNING_PORTAL_URL || "http://localhost:3002";
