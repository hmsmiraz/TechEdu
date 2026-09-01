"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import site from "@/data/site.json";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "AI Learning", href: "#ai" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "Instructor", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07080f]/95 backdrop-blur-xl border-b border-[#1a1d35]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="flex items-center gap-2">
              <img src="/favicon.svg" alt="TechEdu" className="w-7 h-7" />
              <span className="text-lg font-mono font-bold grad-text tracking-wide">
                TechEdu
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[var(--muted)] hover:text-[var(--violet)] text-sm font-medium tracking-wide transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--muted)] hover:text-white text-sm font-semibold border border-[#2a2d45] hover:border-[var(--violet)] transition-colors"
            >
              Login
            </Link>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold bg-grad hover:opacity-85 transition-opacity"
            >
              <span>🗓</span> Book Free Call
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[var(--muted)] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0a0b16] border border-[#1a1d35] rounded-xl mb-4 p-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-[#1a1d35] mt-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white text-sm font-semibold border border-[#2a2d45]"
                >
                  Login
                </Link>
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white text-sm font-semibold bg-grad hover:opacity-85 transition-opacity"
                >
                  🗓 Book Free Discovery Call
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
