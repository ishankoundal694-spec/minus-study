import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { WorkspaceProvider } from "@/components/WorkspaceProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Minus Study — Learn smarter. Score higher.",
    template: "%s | Minus Study",
  },
  description: "A complete Class 10 HPBOSE learning companion with original chapter notes, official book links, practice tests, progress tracking and Minus AI Tutor in Hindi, Hinglish and English.",
  applicationName: "Minus Study",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] text-slate-900 antialiased">
        <WorkspaceProvider>
          <AppShell>{children}</AppShell>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
