import pricing from "@/data/pricing.json";
import site from "@/data/site.json";

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3">
          // pricing
        </p>
        <h2
          className="font-sans font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
        >
          Invest in Your Future
        </h2>
        <p className="font-mono text-[var(--muted)] text-sm leading-relaxed max-w-xl mb-12">
          Transparent pricing with no hidden fees. 1-on-1 support and AI learning tools
          included in all plans. One-time payment gives the biggest saving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {pricing.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl border p-7 transition-all duration-300 ${
                p.featured
                  ? "border-[#6366f1]/50 bg-[#6366f1]/04 shadow-[0_0_40px_rgba(99,102,241,0.12)]"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[#6366f1]/30"
              }`}
            >
              {/* Top border accent on featured */}
              {p.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-grad rounded-t-2xl" />
              )}

              {/* Badge */}
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-grad text-white font-mono text-[0.65rem] font-bold px-4 py-1 rounded-full tracking-widest whitespace-nowrap">
                  {p.badge.toUpperCase()}
                </div>
              )}

              <div className="font-mono text-[0.7rem] text-[var(--muted)] tracking-widest uppercase mb-3 mt-2">
                {p.plan}
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="font-extrabold grad-text"
                  style={{ fontSize: "clamp(2.2rem,4vw,3rem)" }}
                >
                  ${p.price}
                </span>
                {p.unit && (
                  <span className="font-mono text-[var(--muted)] text-base">{p.unit}</span>
                )}
              </div>

              <p className="font-mono text-[var(--muted)] text-xs mb-6">{p.period}</p>

              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-[var(--purple)] text-xs mt-0.5 flex-shrink-0">✦</span>
                    <span className="font-mono text-[var(--muted)] text-xs leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center font-mono font-bold text-sm py-3.5 rounded-xl transition-all duration-200 ${
                  p.featured
                    ? "bg-grad text-white hover:opacity-88"
                    : "border border-[var(--border)] text-[var(--text)] hover:border-[var(--purple)] hover:text-[var(--violet)]"
                }`}
              >
                {p.id === "lifetime" ? "Best Value →" : p.id === "monthly" ? "Get Started" : "Enroll Now"}
              </a>

              {p.saving && (
                <p className="font-mono text-xs text-center mt-3 text-[var(--blue-light)]">
                  {p.saving}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
