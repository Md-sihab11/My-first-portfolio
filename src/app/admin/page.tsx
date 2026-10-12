import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  FileText,
  BookOpen,
  Mail,
  Share2,
  Code2,
  ArrowRight,
  Database,
  Cloud,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { requireOwnerPage } from "@/lib/admin-auth";
import {
  getProjects,
  getResources,
  getBlogPosts,
  getContactMessages,
  getSiteSettings,
} from "@/lib/db-content";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatDate } from "@/lib/utils";

export default async function AdminOverviewPage() {
  await requireOwnerPage();

  const [projects, resources, posts, messages, settings] = await Promise.all([
    getProjects({ onlyPublished: false }),
    getResources({ onlyPublished: false }),
    getBlogPosts({ onlyPublished: false }),
    getContactMessages(),
    getSiteSettings(),
  ]);

  const unreadMessages = messages.filter((m) => !m.read).length;
  const isMongoActive = Boolean(process.env.MONGODB_URI);
  const isS3Active = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID);

  const stats = [
    {
      label: "Projects",
      count: projects.length,
      detail: `${projects.filter((p) => p.status === "published").length} published`,
      href: "/admin/projects",
      icon: FolderGit2,
    },
    {
      label: "Resources",
      count: resources.length,
      detail: `${resources.filter((r) => r.published).length} public downloads`,
      href: "/admin/resources",
      icon: FileText,
    },
    {
      label: "Blog Posts",
      count: posts.length,
      detail: `${posts.filter((p) => p.status === "published").length} published articles`,
      href: "/admin/blog",
      icon: BookOpen,
    },
    {
      label: "Inquiries",
      count: messages.length,
      detail: `${unreadMessages} unread messages`,
      href: "/admin/messages",
      icon: Mail,
      alert: unreadMessages > 0,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-gradient-to-r from-surface to-surface-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Welcome back
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              {settings.profile.fullName || "Shakib"} &apos;s Control Center
            </h1>
            <p className="text-xs sm:text-sm text-secondary">
              Manage your personal developer platform, write articles, and publish projects.
            </p>
          </div>
          <Link
            href="/admin/profile"
            className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-accent text-accent-text hover:bg-accent-hover transition-colors shadow-glow"
          >
            Edit Profile
          </Link>
        </div>

        {/* System Health / Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-surface flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-elevated text-accent border border-border">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-primary">
                  MongoDB Atlas
                </div>
                <div className="text-[11px] font-mono text-secondary-muted">
                  {isMongoActive ? "Connected (Persistent Data)" : "Local Defaults Mode"}
                </div>
              </div>
            </div>
            {isMongoActive ? (
              <span className="flex items-center gap-1 text-[11px] font-mono text-accent">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                Needs URI
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-elevated text-accent border border-border">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-primary">
                  Object Storage (S3 / R2)
                </div>
                <div className="text-[11px] font-mono text-secondary-muted">
                  {isS3Active ? "Cloud Storage Active" : "Local FS Fallback"}
                </div>
              </div>
            </div>
            {isS3Active ? (
              <span className="flex items-center gap-1 text-[11px] font-mono text-accent">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Configured
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-mono text-secondary-muted">
                Local Dev
              </span>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className="group p-5 rounded-2xl border border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-surface-muted text-accent border border-border">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-secondary group-hover:text-accent group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">
                  {s.count}
                </div>
                <div className="text-xs font-semibold text-primary mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-secondary-muted font-mono mt-0.5">
                  {s.detail}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Messages & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Messages */}
          <div className="lg:col-span-8 p-6 rounded-2xl border border-border bg-surface space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-primary flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>Recent Inquiries</span>
              </h2>
              <Link
                href="/admin/messages"
                className="text-xs font-semibold text-accent hover:underline"
              >
                View all ({messages.length})
              </Link>
            </div>

            {messages.length === 0 ? (
              <p className="text-xs text-secondary-muted py-6 text-center font-mono">
                No contact inquiries received yet.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {messages.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    className="py-3 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary">
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-accent text-accent-text font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-secondary line-clamp-1">
                        {msg.subject || msg.message}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-secondary-muted flex-shrink-0">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shortcuts */}
          <div className="lg:col-span-4 p-6 rounded-2xl border border-border bg-surface space-y-4">
            <h2 className="text-base font-bold text-primary pb-3 border-b border-border">
              Fast Publishing
            </h2>
            <div className="space-y-2">
              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-muted hover:border-accent/40 text-xs font-semibold text-primary transition-colors"
              >
                <span>Write New Article</span>
                <BookOpen className="w-4 h-4 text-accent" />
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-muted hover:border-accent/40 text-xs font-semibold text-primary transition-colors"
              >
                <span>Add Project</span>
                <FolderGit2 className="w-4 h-4 text-accent" />
              </Link>

              <Link
                href="/admin/resources"
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-muted hover:border-accent/40 text-xs font-semibold text-primary transition-colors"
              >
                <span>Upload PDF / Cheatsheet</span>
                <FileText className="w-4 h-4 text-accent" />
              </Link>

              <Link
                href="/admin/resume"
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-muted hover:border-accent/40 text-xs font-semibold text-primary transition-colors"
              >
                <span>Replace Resume PDF</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
