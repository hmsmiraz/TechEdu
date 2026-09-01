import features from "@/data/about-features.json";

export default function About() {
  return (
    <section id="about" className="section-pad bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3">
          // about techedu
        </p>
        <h2
          className="font-sans font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
        >
          Built for Career Changers
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-10 items-center">
          {/* Features list */}
          <div>
            <p className="font-mono text-[var(--muted)] text-sm leading-relaxed mb-8 max-w-lg">
              TechEdu isn&apos;t a generic tutorial platform. It&apos;s a structured, mentored
              journey — with real AWS projects, real CI/CD pipelines, AI-powered learning
              tools, and a dedicated mentor who helps you land the job.
            </p>
            <div className="space-y-5">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center flex-shrink-0 text-xl group-hover:border-[#6366f1]/50 transition-colors">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">{f.title}</h4>
                    <p className="font-mono text-[var(--muted)] text-xs leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden grad-border">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--border)]">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="font-mono text-[var(--muted)] text-xs ml-3">techedu ~ journey.sh</span>
            </div>
            <div className="p-6 font-mono text-sm leading-[2.1] text-[var(--muted)]">
              <div>
                <span className="text-[var(--violet)]">$</span>{" "}
                <span className="text-white">whoami</span>
              </div>
              <div>
                <span className="text-[var(--blue-light)]">→</span>{" "}
                devops_engineer_in_progress
              </div>
              <br />
              <div>
                <span className="text-[var(--violet)]">$</span>{" "}
                <span className="text-white">cat journey.sh</span>
              </div>
              {[
                "Linux & AWS Fundamentals",
                "Docker & Kubernetes",
                "Terraform, Ansible, Vault",
                "CI/CD, ArgoCD, GitOps",
                "AI-Adapted Learning Path",
                "Resume + LinkedIn + Portfolio",
                "Mock Interviews + Job Support",
              ].map((line) => (
                <div key={line}>
                  <span className="text-[var(--blue-light)]">[✓]</span>{" "}
                  <span className="text-[var(--text)]">{line}</span>
                </div>
              ))}
              <br />
              <div>
                <span className="text-[var(--violet)]">$</span>{" "}
                <span className="text-white">status --career</span>
              </div>
              <div>
                <span className="text-[var(--blue-light)]">→</span>{" "}
                <span className="font-bold grad-text">HIRED ✓</span>
                <span className="cursor-blink inline-block w-0.5 h-4 bg-[var(--purple)] ml-1 align-middle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
