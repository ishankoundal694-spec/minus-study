"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, BookMarked, Bot, ChevronLeft, ChevronRight, ClipboardList, FileText, ListChecks,
  GraduationCap, LayoutDashboard, LibraryBig, Menu, Settings2, X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWorkspace } from "@/components/WorkspaceProvider";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subjects", label: "Subjects", icon: BookMarked },
  { href: "/syllabus", label: "My Syllabus", icon: ListChecks },
  { href: "/library", label: "Study Library", icon: LibraryBig },
  { href: "/ai-tutor", label: "Minus AI Tutor", icon: Bot },
  { href: "/practice", label: "Practice Tests", icon: ClipboardList },
  { href: "/sample-papers", label: "Maths Papers", icon: FileText },
  { href: "/previous-year-questions", label: "Previous Year Questions", icon: FileText },
  { href: "/model-question-papers", label: "Model Question Papers", icon: ClipboardList },
  { href: "/progress", label: "My Progress", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline-offset-4" aria-label="Minus Study home">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold leading-none text-white shadow-sm" aria-hidden="true">−</span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-tight text-slate-950">Minus Study</span>
          <span className="block text-[11px] font-medium text-slate-500">Learn smarter. Score higher.</span>
        </span>
      )}
    </Link>
  );
}

function NavLinks({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            title={compact ? item.label : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            } ${compact ? "justify-center px-2" : ""}`}
          >
            <Icon size={19} strokeWidth={2} aria-hidden="true" />
            {!compact && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

function BoardNote({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-blue-100 bg-blue-50/80 p-3.5 ${compact ? "hidden" : ""}`}>
      <div className="flex items-center gap-2 text-blue-700">
        <GraduationCap size={17} aria-hidden="true" />
        <span className="text-xs font-bold">Class 10 · HPBOSE + NCERT</span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">Original study guides, verified official sources, and a patient AI tutor.</p>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { backend, saving } = useWorkspace();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const firstLink = drawerRef.current?.querySelector("a");
    firstLink?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  if (pathname.startsWith("/admin")) return <>{children}</>;

  const syncLabel = saving ? "Saving…" : backend === "supabase" ? "Supabase synced" : "Private browser workspace";

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <aside className={`fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200 bg-white px-4 py-5 transition-[width] duration-200 lg:flex lg:flex-col ${collapsed ? "w-20" : "w-64"}`} aria-label="Sidebar">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          <Brand compact={collapsed} />
        </div>
        <div className="mt-8 flex-1"><NavLinks compact={collapsed} /></div>
        <div className="space-y-3">
          <BoardNote compact={collapsed} />
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="btn-ghost w-full justify-center border border-slate-200 bg-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={17} aria-hidden="true" /> : <><ChevronLeft size={17} aria-hidden="true" /><span className="text-xs">Collapse</span></>}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close navigation menu" className="absolute inset-0 h-full w-full bg-slate-950/40" onClick={() => setMobileOpen(false)} />
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Navigation menu" className="animate-enter relative flex h-full w-[min(88vw,300px)] flex-col border-r border-slate-200 bg-white px-5 py-5 shadow-xl">
            <div className="flex items-center justify-between">
              <Brand />
              <button type="button" className="btn-ghost" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={20} aria-hidden="true" /></button>
            </div>
            <div className="mt-8 flex-1"><NavLinks onNavigate={() => setMobileOpen(false)} /></div>
            <BoardNote />
          </div>
        </div>
      )}

      <div className={`min-h-screen transition-[padding] duration-200 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="btn-ghost border border-slate-200 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <div className="lg:hidden"><Brand /></div>
          <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
            <span className="tag border border-blue-100 bg-blue-50 text-blue-700">Class 10 · HPBOSE + NCERT</span>
            <span className="truncate text-xs font-medium text-slate-400">Learn smarter. Score higher.</span>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-500 xl:flex">
              <span className={`h-2 w-2 rounded-full ${saving ? "bg-amber-400 animate-pulse-dot" : "bg-emerald-500"}`} aria-hidden="true" />
              {syncLabel}
            </span>
            <Link href="/ai-tutor" className="btn-primary hidden sm:inline-flex"><Bot size={17} aria-hidden="true" />Ask AI</Link>
            <Link href="/settings" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-blue-700 hover:bg-blue-50" aria-label="Open settings">
              <Settings2 size={17} aria-hidden="true" />
            </Link>
          </div>
        </header>
        <main id="main-content" className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
        <footer className="mx-auto flex w-full max-w-[1500px] flex-col gap-2 border-t border-slate-200 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Minus Study · Class 10 HPBOSE learning companion.</span>
          <span>Original notes · Official book links · No copyrighted textbooks redistributed.</span>
        </footer>
      </div>
    </div>
  );
}
