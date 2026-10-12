"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  FileText,
  BookOpen,
  Share2,
  Code2,
  Briefcase,
  FileBadge,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Profile Identity", href: "/admin/profile", icon: User },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Resources & PDFs", href: "/admin/resources", icon: FileText },
  { label: "Blog & Articles", href: "/admin/blog", icon: BookOpen },
  { label: "Social & Coding Profiles", href: "/admin/social", icon: Share2 },
  { label: "Skills & Stack", href: "/admin/skills", icon: Code2 },
  { label: "Experience & Education", href: "/admin/experience", icon: Briefcase },
  { label: "Resume File", href: "/admin/resume", icon: FileBadge },
  { label: "Contact Messages", href: "/admin/messages", icon: Mail },
  { label: "Site & SEO Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      window.location.href = "/admin/login";
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2 pb-4 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-accent text-accent-text font-mono font-bold text-xs">
              &lt;/&gt;
            </div>
            <div>
              <div className="text-sm font-bold text-primary flex items-center gap-1.5">
                <span>Owner Portal</span>
                <ShieldCheck className="w-4 h-4 text-accent" />
              </div>
              <div className="text-[11px] font-mono text-secondary-muted">
                Private CMS
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile menu"
            className="md:hidden p-1.5 rounded-lg border border-border text-secondary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors border",
                  isActive
                    ? "bg-accent-subtle text-accent border-accent/30 font-semibold"
                    : "text-secondary hover:text-primary hover:bg-surface border-transparent"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-secondary hover:text-accent hover:bg-surface transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </span>
          <span className="text-[10px] text-accent">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors border border-transparent hover:border-red-900/50"
        >
          <LogOut className="w-4 h-4" />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-accent text-accent-text font-mono font-bold text-xs">
            CMS
          </div>
          <span className="text-sm font-bold text-primary">Admin Dashboard</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin sidebar navigation"
          className="p-2 rounded-lg border border-border bg-surface-elevated text-secondary"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-surface border-r border-border overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background/80 backdrop-blur-sm flex">
          <div className="w-72 bg-surface h-full shadow-2xl border-r border-border animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
