import React from "react";
import site from "@/data/site.json";

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href: string | null;
}

const contactItems: ContactItem[] = [
  {
    icon: "✉",
    label: "Email",
    value: "techeduq1@gmail.com",
    href: "mailto:techeduq1@gmail.com",
  },
  {
    icon: "📞",
    label: "Phone / WhatsApp",
    value: "+880 1835 964 977",
    href: "https://wa.me/8801835964977",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/techeduq1",
    href: "https://github.com/techeduq1",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
];

function LinkCard(props: { item: ContactItem }) {
  const item = props.item;
  const url = item.href as string;
  const isExternal = url.startsWith("http");
  return (
    <a
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex gap-4 items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[#6366f1]/40 hover:translate-x-1 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-[#6366f1]/50 transition-colors">
        {item.icon}
      </div>
      <div className="overflow-hidden">
        <div className="font-semibold text-white text-sm">{item.label}</div>
        <div className="font-mono text-[var(--muted)] text-xs truncate">{item.value}</div>
      </div>
    </a>
  );
}

function StaticCard(props: { item: ContactItem }) {
  const item = props.item;
  return (
    <div className="flex gap-4 items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
      <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-lg flex-shrink-0">
        {item.icon}
      </div>
      <div className="overflow-hidden">
        <div className="font-semibold text-white text-sm">{item.label}</div>
        <div className="font-mono text-[var(--muted)] text-xs">{item.value}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-10">

          <div>
            <p className="font-mono text-xs tracking-widest uppercase grad-text-r mb-3 lg:pt-16">
              // get in touch
            </p>
            <h2
              className="font-sans font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
            >
              Contact TechEdu
            </h2>
            <p className="font-mono text-[var(--muted)] text-sm leading-relaxed max-w-md">
              Have questions about the curriculum, pricing, or career services?
              Reach out directly or book a free discovery call — we reply within
              24 hours.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[#6366f1]/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-grad rounded-t-2xl" />
            <div className="w-16 h-16 rounded-2xl bg-grad flex items-center justify-center text-3xl mb-5">
              🗓
            </div>
            <h4
              className="font-sans font-extrabold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.2rem,2vw,2.0rem)" }}
            >
              Not Sure Yet?{" "}
              <span className="grad-text">{"Let's Talk."}</span>
            </h4>
            <p className="font-mono text-[var(--muted)] text-xs leading-relaxed mb-6 max-w-xs">
              Schedule a free 30-minute discovery session with Miraz. Discuss
              your goals, background, and get a personalized roadmap — no
              commitment needed.
            </p>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold bg-grad hover:opacity-85 transition-all duration-200 hover:-translate-y-1"
            >
              Schedule Free 30-min Call
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item) =>
            item.href !== null ? (
              <LinkCard key={item.label} item={item} />
            ) : (
              <StaticCard key={item.label} item={item} />
            )
          )}
        </div>

      </div>
    </section>
  );
}