// Points at the gateway. Both /api/auth + /api/admin/users (owned by
// auth-service) and /api/modules + /api/admin/modules + /api/admin/resources
// (owned by content-service) live under this one origin — see
// services/gateway/README.md for the full routing table.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
