import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechEdu — Master DevOps. Change Your Career.",
  description:
    "Hands-on, AI-enhanced DevOps course with dedicated 1-on-1 mentorship. From Linux fundamentals to Kubernetes, Terraform & GitOps — plus resume, portfolio & job support.",
  keywords: ["DevOps", "AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "career change", "online course"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "TechEdu — Master DevOps. Change Your Career.",
    description: "Hands-on DevOps course with 1-on-1 mentorship, AI learning tools, and job placement support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}