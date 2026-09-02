import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learning Portal | TechEdu",
  description: "Your TechEdu course modules",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
