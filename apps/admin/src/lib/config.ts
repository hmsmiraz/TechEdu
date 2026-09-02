// Points directly at each service for now. Once the gateway exists,
// both should point at it instead.
export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8000";

export const CONTENT_API_URL =
  process.env.NEXT_PUBLIC_CONTENT_API_URL || "http://localhost:8001";
