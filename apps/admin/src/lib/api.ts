import { AUTH_API_URL, CONTENT_API_URL } from "./config";

export type UserStatus = "pending" | "approved" | "rejected";
export type UserRole = "student" | "admin";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
};

export type LoginResponse = {
  status: UserStatus;
  access_token?: string;
  detail?: string;
};

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
export class ForbiddenError extends Error {}

async function request<T>(
  url: string,
  token: string | null,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) throw new UnauthorizedError("Session expired");
  if (res.status === 403) throw new ForbiddenError("Admin access required");
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return request(`${AUTH_API_URL}/auth/login`, null, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function listUsers(token: string): Promise<User[]> {
  return request(`${AUTH_API_URL}/admin/users`, token);
}

export function approveUser(token: string, userId: number): Promise<User> {
  return request(`${AUTH_API_URL}/admin/users/${userId}/approve`, token, {
    method: "PATCH",
  });
}

export function rejectUser(token: string, userId: number): Promise<User> {
  return request(`${AUTH_API_URL}/admin/users/${userId}/reject`, token, {
    method: "PATCH",
  });
}

export function updateUser(
  token: string,
  userId: number,
  payload: Partial<Pick<User, "name" | "email" | "role">>
): Promise<User> {
  return request(`${AUTH_API_URL}/admin/users/${userId}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteUser(token: string, userId: number): Promise<void> {
  return request(`${AUTH_API_URL}/admin/users/${userId}`, token, {
    method: "DELETE",
  });
}

export function listModules(token: string): Promise<Module[]> {
  return request(`${CONTENT_API_URL}/modules`, token);
}

export function createModule(
  token: string,
  payload: { title: string; description?: string; order?: number }
): Promise<Module> {
  return request(`${CONTENT_API_URL}/admin/modules`, token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateModule(
  token: string,
  moduleId: number,
  payload: Partial<{ title: string; description: string; order: number }>
): Promise<Module> {
  return request(`${CONTENT_API_URL}/admin/modules/${moduleId}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteModule(token: string, moduleId: number): Promise<void> {
  return request(`${CONTENT_API_URL}/admin/modules/${moduleId}`, token, {
    method: "DELETE",
  });
}

export function createResource(
  token: string,
  moduleId: number,
  payload: { type: "video" | "doc"; title: string; url: string; order?: number }
): Promise<Resource> {
  return request(`${CONTENT_API_URL}/admin/modules/${moduleId}/resources`, token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteResource(token: string, resourceId: number): Promise<void> {
  return request(`${CONTENT_API_URL}/admin/resources/${resourceId}`, token, {
    method: "DELETE",
  });
}
