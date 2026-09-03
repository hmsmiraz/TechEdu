import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin | TechEdu",
  description: "TechEdu admin panel",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
      </head>
      <body className="min-h-screen bg-[var(--bg)] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
