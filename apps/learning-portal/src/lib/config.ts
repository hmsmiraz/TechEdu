// Points at the gateway. Both frontends and the gateway agree on this
// /api prefix scheme — see services/gateway/README.md for the full
// routing table.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export const LANDING_URL =
  process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";
