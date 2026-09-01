import aiFeatures from "@/data/ai-features.json";

export default function AISection() {
  return (
    <section id="ai" className="section-pad bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3">
          // ai in devops
        </p>
        <h2
          className="font-sans font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
        >
          Work Smarter with AI
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 items-start">
          {/* Left — description + features */}
          <div>
            <p className="font-mono text-[var(--muted)] text-sm leading-relaxed mb-8 max-w-lg">
              AI isn&apos;t replacing DevOps engineers — it&apos;s making them 10x faster.
              We&apos;ll teach you how to use AI tools professionally in your real daily
              DevOps work: writing code, debugging systems, managing infrastructure, and
              learning new concepts at speed.
            </p>
            <div className="space-y-4">
              {aiFeatures.map((f) => (
                <div
                  key={f.id}
                  className="flex gap-4 items-start bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[#6366f1]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-grad flex items-center justify-center font-mono text-white text-xs font-bold flex-shrink-0">
                    {String(f.id).padStart(2, "0")}
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

          {/* Right — terminal demo */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden grad-border">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--border)]">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="font-mono text-[var(--muted)] text-xs ml-3">
                copilot ~ terraform-fix.sh
              </span>
            </div>

            <div className="p-6 font-mono text-xs leading-[1.95] text-[var(--muted)]">
              <div className="text-[var(--violet)] mb-1">// You ask GitHub Copilot:</div>
              <div className="bg-[#6366f1]/08 border border-[#6366f1]/15 rounded-lg p-3 mb-4 text-[var(--text)]">
                &quot;Fix this Terraform error: Error acquiring the state lock.
                ConditionalCheckFailedException&quot;
              </div>

              <div className="text-[var(--violet)] mb-1">// Copilot suggests:</div>
              <div className="space-y-1 mb-4">
                <div>
                  <span className="text-[var(--blue-light)]">$</span>{" "}
                  <span className="text-white">
                    terraform force-unlock &lt;LOCK_ID&gt;
                  </span>
                </div>
                <div className="pl-4 text-[var(--muted)]">
                  # Or if lock is stale in DynamoDB:
                </div>
                <div>
                  <span className="text-[var(--blue-light)]">$</span>{" "}
                  <span className="text-white">
                    aws dynamodb delete-item \
                  </span>
                </div>
                <div className="pl-4 text-white">
                  --table-name terraform-locks \
                </div>
                <div className="pl-4 text-white">
                  --key {`'{"LockID": {"S": "your-lock-id"}}'`}
                </div>
              </div>

              <div className="text-[var(--violet)] mb-1">// Result:</div>
              <div className="text-[#22c55e]">
                ✓ Lock released. Apply completed successfully.
                <span className="cursor-blink inline-block w-0.5 h-3 bg-[var(--purple)] ml-1 align-middle" />
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border)] text-[0.65rem] text-[var(--muted)] tracking-wide">
                You&apos;ll learn: ChatGPT · GitHub Copilot · AI log analysis · Prompt
                engineering for DevOps
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}