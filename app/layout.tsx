import type { Metadata } from "next";
import "./globals.css";
import { AudioPlayer } from "@/components/orchestra/Features";

export const metadata: Metadata = {
  title: "McKay High School Orchestras | Many musicians. One sound.",
  description: "Discover McKay High School's five orchestras, concerts, and musical community in Salem, Oregon.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}<AudioPlayer/></body>
    </html>
  );
}
