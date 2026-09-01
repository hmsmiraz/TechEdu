import services from "@/data/services.json";

export default function Services() {
  return (
    <section id="services" className="section-pad bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3">
          // career services
        </p>
        <h2
          className="font-sans font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
        >
          Beyond the Course
        </h2>
        <p className="font-mono text-[var(--muted)] text-sm leading-relaxed max-w-xl mb-12">
          We don&apos;t just teach DevOps — we help you get hired. From your first resume
          to your first job offer, TechEdu has you covered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[#6366f1]/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-grad opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{s.title}</h3>
              <p className="font-mono text-[var(--muted)] text-xs leading-relaxed mb-4">
                {s.description}
              </p>
              {s.paid ? (
                <span className="inline-block font-mono text-[0.65rem] bg-[#3b82f6]/10 text-[var(--blue-light)] border border-[#3b82f6]/20 rounded-md px-3 py-1">
                  charges apply
                </span>
              ) : (
                <span className="inline-block font-mono text-[0.65rem] bg-[#7c3aed]/10 text-[var(--violet)] border border-[#7c3aed]/20 rounded-md px-3 py-1">
                  included in course
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
