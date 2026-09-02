"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAdminGuard } from "@/lib/useAdminGuard";
import { clearToken } from "@/lib/auth";
import {
  listModules,
  createModule,
  deleteModule,
  createResource,
  deleteResource,
  UnauthorizedError,
  ForbiddenError,
  type Module,
} from "@/lib/api";
import AdminHeader from "@/components/AdminHeader";

export default function ContentPage() {
  const token = useAdminGuard();
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [creatingModule, setCreatingModule] = useState(false);

  const handleAuthError = useCallback(
    (err: unknown) => {
      if (err instanceof UnauthorizedError) {
        clearToken();
        router.replace("/login");
        return true;
      }
      if (err instanceof ForbiddenError) {
        setError("Your account no longer has admin access.");
        return true;
      }
      return false;
    },
    [router]
  );

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listModules(token);
      setModules(data);
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err instanceof Error ? err.message : "Failed to load modules.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, handleAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreateModule(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !newTitle.trim()) return;
    setCreatingModule(true);
    try {
      await createModule(token, {
        title: newTitle.trim(),
        description: newDescription.trim() || undefined,
        order: modules.length + 1,
      });
      setNewTitle("");
      setNewDescription("");
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to create module.");
    } finally {
      setCreatingModule(false);
    }
  }

  async function handleDeleteModule(moduleId: number) {
    if (!token) return;
    if (!confirm("Delete this module and all its resources?")) return;
    try {
      await deleteModule(token, moduleId);
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to delete module.");
    }
  }

  async function handleDeleteResource(resourceId: number) {
    if (!token) return;
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResource(token, resourceId);
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to delete resource.");
    }
  }

  if (!token) return null;

  return (
    <main className="min-h-screen">
      <AdminHeader />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-1">Content</h1>
        <p className="text-sm text-[var(--muted)] mb-8">
          Manage modules and their Drive/Doc links.
        </p>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleCreateModule}
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 mb-8 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            required
            placeholder="New module title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)]"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)]"
          />
          <button
            type="submit"
            disabled={creatingModule}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-grad hover:opacity-85 transition-opacity disabled:opacity-50 whitespace-nowrap"
          >
            {creatingModule ? "Adding…" : "Add Module"}
          </button>
        </form>

        {loading ? (
          <p className="text-[var(--muted)] text-sm">Loading modules…</p>
        ) : modules.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">
            No modules yet — add one above.
          </p>
        ) : (
          <div className="space-y-6">
            {modules.map((module) => (
              <ModuleEditor
                key={module.id}
                module={module}
                token={token}
                onChanged={load}
                onError={setError}
                onAuthError={handleAuthError}
                onDeleteModule={() => handleDeleteModule(module.id)}
                onDeleteResource={handleDeleteResource}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ModuleEditor({
  module,
  token,
  onChanged,
  onError,
  onAuthError,
  onDeleteModule,
  onDeleteResource,
}: {
  module: Module;
  token: string;
  onChanged: () => void;
  onError: (msg: string) => void;
  onAuthError: (err: unknown) => boolean;
  onDeleteModule: () => void;
  onDeleteResource: (resourceId: number) => void;
}) {
  const [resType, setResType] = useState<"video" | "doc">("video");
  const [resTitle, setResTitle] = useState("");
  const [resUrl, setResUrl] = useState("");
  const [adding, setAdding] = useState(false);

  async function handleAddResource(e: React.FormEvent) {
    e.preventDefault();
    if (!resTitle.trim() || !resUrl.trim()) return;
    setAdding(true);
    try {
      await createResource(token, module.id, {
        type: resType,
        title: resTitle.trim(),
        url: resUrl.trim(),
        order: module.resources.length + 1,
      });
      setResTitle("");
      setResUrl("");
      onChanged();
    } catch (err) {
      if (!onAuthError(err)) onError("Failed to add resource.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">{module.title}</h2>
          {module.description && (
            <p className="text-sm text-[var(--muted)] mt-1">
              {module.description}
            </p>
          )}
        </div>
        <button
          onClick={onDeleteModule}
          className="text-xs text-[var(--muted)] hover:text-red-400 transition-colors whitespace-nowrap"
        >
          Delete module
        </button>
      </div>

      {module.resources.length > 0 && (
        <ul className="mt-4 space-y-2">
          {module.resources.map((resource) => (
            <li
              key={resource.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[var(--border)]"
            >
              <span className="text-xs uppercase tracking-wide text-[var(--muted)] w-12">
                {resource.type}
              </span>
              
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-[var(--violet)] transition-colors flex-1 truncate"
              >
                {resource.title}
              </a>
              <button
                onClick={() => onDeleteResource(resource.id)}
                className="text-xs text-[var(--muted)] hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleAddResource}
        className="mt-4 flex flex-col sm:flex-row gap-2"
      >
        <select
          value={resType}
          onChange={(e) => setResType(e.target.value as "video" | "doc")}
          className="px-2 py-2 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm"
        >
          <option value="video">video</option>
          <option value="doc">doc</option>
        </select>
        <input
          type="text"
          required
          placeholder="Resource title"
          value={resTitle}
          onChange={(e) => setResTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)]"
        />
        <input
          type="url"
          required
          placeholder="https://..."
          value={resUrl}
          onChange={(e) => setResUrl(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg2)] border border-[var(--border)] text-white text-sm focus:outline-none focus:border-[var(--violet)]"
        />
        <button
          type="submit"
          disabled={adding}
          className="px-3 py-2 rounded-lg text-sm text-white border border-[var(--border)] hover:border-[var(--violet)] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>
    </div>
  );
}
