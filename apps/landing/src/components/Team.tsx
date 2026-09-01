import team from "@/data/team.json";

export default function Team() {
  const member = team[0];

  return (
    <section id="team" className="section-pad bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3">
            // your instructor
          </p>
          <h2
            className="font-sans font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            Meet Your Mentor
          </h2>
          <p className="font-mono text-[var(--muted)] text-sm mt-4 max-w-md mx-auto">
            A working DevOps engineer who guides you personally — not a content creator, not a bot.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-grad rounded-t-3xl" />

          {/* Avatar + name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-[#6366f1]/10 border-2 border-[#6366f1]/30 flex items-center justify-center flex-shrink-0">
              <span className="font-mono font-bold text-2xl grad-text">{member.initials}</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-white text-xl mb-1">{member.name}</h3>
              <p className="font-mono grad-text-r text-xs tracking-widest uppercase mb-3">
                {member.role}
              </p>
              <p className="font-mono text-[var(--muted)] text-xs leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-7 pt-7 border-t border-[var(--border)]">
            <p className="font-mono text-[var(--muted)] text-[0.65rem] tracking-widest uppercase mb-3">
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[0.65rem] bg-[#3b82f6]/08 text-[var(--blue-light)] border border-[#3b82f6]/15 rounded-lg px-3 py-1.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-7 pt-7 border-t border-[var(--border)]">
            <p className="font-mono text-[var(--muted)] text-[0.65rem] tracking-widest uppercase mb-3">
              Find Me Online
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(member.links).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-mono text-xs px-4 py-2 rounded-xl border transition-all duration-200 capitalize ${
                    key === "booking"
                      ? "bg-grad text-white border-transparent hover:opacity-85"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--purple)] hover:text-[var(--violet)]"
                  }`}
                >
                  {key === "booking" ? "🗓 Book a Call" : `${key} ↗`}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
