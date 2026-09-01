import site from "@/data/site.json";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] blob-purple pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blob-blue pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] pulse-dot" />
          <span className="font-mono text-[var(--violet)] text-xs tracking-widest uppercase">
            Now Enrolling — Limited 1-on-1 Seats
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-extrabold leading-[1.06] tracking-tight mb-6">
          <span className="block text-white" style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)" }}>
            Master DevOps.
          </span>
          <span
            className="block grad-text"
            style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)" }}
          >
            Change Your Career.
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-mono text-[var(--muted)] leading-relaxed max-w-2xl mx-auto mb-10 text-sm sm:text-base">
          {site.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white font-semibold bg-grad hover:opacity-85 transition-all duration-200 hover:-translate-y-1 text-sm sm:text-base"
          >
            🗓 Book Free Discovery Call
          </a>
          <a
            href="#modules"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-[var(--text)] border border-[var(--border)] hover:border-[var(--purple)] hover:text-[var(--violet)] transition-all duration-200 hover:-translate-y-1 text-sm sm:text-base font-medium"
          >
            📋 View Curriculum
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-8 max-w-3xl mx-auto">
          {site.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="font-sans font-extrabold grad-text"
                style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)" }}
              >
                {s.value}
              </div>
              <div className="font-mono text-[var(--muted)] text-[0.65rem] tracking-widest uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
