import site from "@/data/site.json";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: site.github },
  { label: "GitLab", href: site.gitlab },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/favicon.svg" alt="TechEdu" className="w-6 h-6" />
              <span className="font-mono font-bold text-lg grad-text">
                TechEdu
              </span>
            </div>
            <p className="font-mono text-[var(--muted)] text-xs leading-relaxed max-w-xs">
              Hands-on DevOps education with real mentorship, AI-powered
              learning, and career support. Built for people who want to change
              their careers.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div className="font-mono text-[0.65rem] text-[var(--muted)] tracking-widest uppercase mb-4">
              Navigation
            </div>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-mono text-[var(--muted)] hover:text-[var(--violet)] text-xs transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <div className="font-mono text-[0.65rem] text-[var(--muted)] tracking-widest uppercase mb-4">
              Find Us Online
            </div>
            <ul className="space-y-2 mb-5">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[var(--muted)] hover:text-[var(--violet)] text-xs transition-colors"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-mono text-xs font-bold bg-grad hover:opacity-85 transition-opacity"
            >
              🗓 Book Free Call
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[var(--muted)] text-xs">
            © {new Date().getFullYear()} TechEdu · Founded by Hassan Md.
            Sharfuddin Miraz · Dhaka, Bangladesh
          </p>
          <p className="font-mono text-[var(--muted)] text-xs">
            · Built with Next.js · 
          </p>
        </div>
      </div>
    </footer>
  );
}
