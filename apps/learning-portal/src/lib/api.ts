import { CONTENT_API_URL } from "./config";

export type Resource = {
  id: number;
  module_id: number;
  type: "video" | "doc";
  title: string;
  url: string;
  order: number;
};

export type Module = {
  id: number;
  title: string;
  description: string | null;
  order: number;
  resources: Resource[];
};

export class UnauthorizedError extends Error {}

export async function fetchModules(token: string): Promise<Module[]> {
  const res = await fetch(`${CONTENT_API_URL}/modules`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    throw new UnauthorizedError("Session expired");
  }
  if (!res.ok) {
    throw new Error("Failed to load modules");
  }

  return res.json();
}
