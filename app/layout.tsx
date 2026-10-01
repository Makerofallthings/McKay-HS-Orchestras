import type { Metadata } from "next";
import "./globals.css";
import "./redesign.css";
import "./mobile.css";
import { AudioPlayer } from "@/components/orchestra/Features";
import {SiteContentProvider} from "@/components/orchestra/SiteContent";
import RouteScroll from "@/components/orchestra/RouteScroll";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "McKay High School Orchestras | Many musicians. One sound.",
  description: "Discover McKay High School's five orchestras, concerts, and musical community in Salem, Oregon.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${siteBasePath}/favicon.svg`,
    shortcut: `${siteBasePath}/favicon.svg`,
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
      <body className="antialiased"><SiteContentProvider><RouteScroll/>{children}<AudioPlayer/></SiteContentProvider></body>
    </html>
  );
}
