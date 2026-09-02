"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAdminGuard } from "@/lib/useAdminGuard";
import { clearToken } from "@/lib/auth";
import {
  listUsers,
  approveUser,
  rejectUser,
  updateUser,
  deleteUser,
  UnauthorizedError,
  ForbiddenError,
  type User,
} from "@/lib/api";
import AdminHeader from "@/components/AdminHeader";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function UsersPage() {
  const token = useAdminGuard();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

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
      const data = await listUsers(token);
      setUsers(data);
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err instanceof Error ? err.message : "Failed to load users.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, handleAuthError]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleApprove(user: User) {
    if (!token) return;
    setBusyId(user.id);
    try {
      await approveUser(token, user.id);
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to approve user.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleReject(user: User) {
    if (!token) return;
    setBusyId(user.id);
    try {
      await rejectUser(token, user.id);
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to reject user.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleRoleChange(user: User, role: "student" | "admin") {
    if (!token) return;
    setBusyId(user.id);
    try {
      await updateUser(token, user.id, { role });
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to update role.");
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!token || !deleteTarget) return;
    setBusyId(deleteTarget.id);
    try {
      await deleteUser(token, deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      if (!handleAuthError(err)) setError("Failed to delete user.");
    } finally {
      setBusyId(null);
    }
  }

  if (!token) return null;

  return (
    <main className="min-h-screen">
      <AdminHeader />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Users</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Approve signups and manage accounts.
            </p>
          </div>
          <button
            onClick={load}
            className="text-sm text-[var(--muted)] hover:text-white transition-colors"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-[var(--muted)] text-sm">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">No users yet.</p>
        ) : (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isBusy = busyId === user.id;
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      <td className="px-4 py-3 text-white">{user.name}</td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role}
                          disabled={isBusy}
                          onChange={(e) =>
                            handleRoleChange(
                              user,
                              e.target.value as "student" | "admin"
                            )
                          }
                          className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-2 py-1 text-xs text-white disabled:opacity-50"
                        >
                          <option value="student">student</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs border ${STATUS_STYLES[user.status]}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)] text-xs">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(user)}
                                disabled={isBusy}
                                className="px-2.5 py-1 rounded-md text-xs bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(user)}
                                disabled={isBusy}
                                className="px-2.5 py-1 rounded-md text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {user.status === "approved" && (
                            <button
                              onClick={() => handleReject(user)}
                              disabled={isBusy}
                              className="px-2.5 py-1 rounded-md text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                            >
                              Revoke
                            </button>
                          )}
                          {user.status === "rejected" && (
                            <button
                              onClick={() => handleApprove(user)}
                              disabled={isBusy}
                              className="px-2.5 py-1 rounded-md text-xs bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteTarget(user)}
                            disabled={isBusy}
                            className="px-2.5 py-1 rounded-md text-xs text-[var(--muted)] hover:text-red-400 transition-colors disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-semibold mb-2">Delete user?</h3>
            <p className="text-sm text-[var(--muted)] mb-6">
              This will permanently delete{" "}
              <span className="text-white">{deleteTarget.email}</span>. This
              can&apos;t be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
