import type { Module } from "@/lib/api";

const TYPE_ICON: Record<string, string> = {
  video: "▶",
  doc: "📄",
};

export default function ModuleCard({ module }: { module: Module }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="text-lg font-bold text-white">{module.title}</h2>
      {module.description && (
        <p className="text-sm text-[var(--muted)] mt-1">
          {module.description}
        </p>
      )}

      {module.resources.length === 0 ? (
        <p className="text-sm text-[var(--muted)] mt-4 italic">
          No materials added yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {module.resources
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((resource) => (
              <li key={resource.id}>
                <a
                
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--violet)] transition-colors group"
                >
                  <span className="text-lg" aria-hidden>
                    {TYPE_ICON[resource.type] ?? "🔗"}
                  </span>
                  <span className="text-sm text-white group-hover:text-[var(--violet)] transition-colors">
                    {resource.title}
                  </span>
                  <span className="ml-auto text-xs text-[var(--muted)] uppercase tracking-wide">
                    {resource.type}
                  </span>
                </a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
