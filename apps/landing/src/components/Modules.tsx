"use client";
import { useState, useMemo } from "react";
import modules from "@/data/modules.json";

const INITIAL_SHOW = 8; // 2 rows of 4 (desktop), adjust if needed

export default function Modules() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || m.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  const isFiltering = search.length > 0 || activeTag !== null;
  const visible = isFiltering || showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hiddenCount = filtered.length - INITIAL_SHOW;

  return (
    <section id="modules" className="section-pad bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3">
          // curriculum
        </p>
        <h2
          className="font-sans font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
        >
          27 Battle-Tested Modules
        </h2>
        <p className="font-mono text-[var(--muted)] text-sm leading-relaxed max-w-xl mb-8">
          From Linux basics to full microservices deployments — every module maps to
          real industry skills companies are actively hiring for.
        </p>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowAll(false);
            }}
            className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-mono text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[var(--purple)] transition-colors"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveTag(null); setShowAll(false); }}
              className={`font-mono text-xs px-3 py-2 rounded-lg border transition-all ${
                !activeTag
                  ? "bg-grad text-white border-transparent"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--purple)] hover:text-[var(--violet)]"
              }`}
            >
              All
            </button>
            {["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"].map((tag) => (
              <button
                key={tag}
                onClick={() => { setActiveTag(activeTag === tag ? null : tag); setShowAll(false); }}
                className={`font-mono text-xs px-3 py-2 rounded-lg border transition-all ${
                  activeTag === tag
                    ? "bg-grad text-white border-transparent"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--purple)] hover:text-[var(--violet)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((m) => (
            <div
              key={m.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[#6366f1]/40 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-grad opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
              <div className="font-mono text-[0.65rem] grad-text-r mb-2 tracking-widest">
                MODULE {String(m.id).padStart(2, "0")}
              </div>
              <p className="font-medium text-[var(--text)] text-sm leading-snug mb-3">
                {m.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.6rem] bg-[#3b82f6]/08 text-[var(--blue-light)] border border-[#3b82f6]/15 rounded px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 font-mono text-[var(--muted)] text-sm">
            No modules found for &quot;{search}&quot;
          </div>
        )}

        {/* Show more / Show less */}
        {!isFiltering && filtered.length > INITIAL_SHOW && (
          <div className="flex flex-col items-center gap-3 mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-mono font-bold text-sm border border-[#6366f1]/40 text-[var(--violet)] hover:bg-[#6366f1]/08 hover:border-[#6366f1]/70 transition-all duration-200"
            >
              {showAll ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  Show {hiddenCount} More Modules
                </>
              )}
            </button>
            <p className="font-mono text-[var(--muted)] text-xs">
              Showing {visible.length} of {filtered.length} modules
            </p>
          </div>
        )}
      </div>
    </section>
  );
}