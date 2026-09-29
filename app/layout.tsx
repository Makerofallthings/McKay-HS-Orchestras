import type { Metadata } from "next";
import "./globals.css";
import "./redesign.css";
import { AudioPlayer } from "@/components/orchestra/Features";
import RouteScroll from "@/components/orchestra/RouteScroll";

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
    <html lang="en" data-scroll-behavior="smooth">
      <head><meta name="darkreader-lock" content=""/><meta name="color-scheme" content="dark"/></head>
      <body className="antialiased"><RouteScroll/>{children}<AudioPlayer/></body>
    </html>
  );
}
