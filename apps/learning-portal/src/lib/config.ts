// Points directly at content-service for now. Once the gateway (Step 7)
// exists, this should point at it instead (e.g. http://localhost:8080/api)
// and the /modules path stays the same.
export const CONTENT_API_URL =
  process.env.NEXT_PUBLIC_CONTENT_API_URL || "http://localhost:8001";

export const LANDING_URL =
  process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";
