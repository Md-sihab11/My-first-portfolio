"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Bug,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Calendar,
  Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BlogPost, DebuggingDetails } from "@/types/blog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load posts." });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingPost({
      slug: "",
      title: "",
      summary: "",
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      tags: ["React", "JavaScript"],
      categories: ["Web Development"],
      featured: false,
      status: "published",
      content: "## Introduction\n\nStart typing your article content here in Markdown format...\n\n```tsx\n// Code snippet\nconst example = true;\n```\n",
      author: "Shakib",
      isDebuggingTemplate: false,
      debuggingDetails: {
        errorTitle: "",
        context: "",
        expected: "",
        actual: "",
        errorMessage: "",
        reproduction: "",
        rootCause: "",
        fixCode: "",
        lessonLearned: "",
      },
    });
    setIsPreviewMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsPreviewMode(false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      setSaving(true);
      setFeedback(null);

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save blog post.");

      setIsModalOpen(false);
      setFeedback({ type: "success", message: "Blog post saved to MongoDB Atlas." });
      fetchPosts();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Save operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete article "${slug}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed.");

      setFeedback({ type: "success", message: "Article deleted." });
      fetchPosts();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Delete failed." });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Publishing Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Blog & Article Management
            </h1>
            <p className="text-xs text-secondary mt-1">
              Write, edit, draft, and publish technical articles and debugging logs with MongoDB persistence.
            </p>
          </div>

          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Button>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-3 ${
              feedback.type === "success"
                ? "bg-accent-subtle border border-accent/40 text-accent"
                : "bg-red-950/40 border border-red-800/60 text-red-300"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Posts Table */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-elevated border-b border-border text-secondary uppercase">
                <tr>
                  <th className="p-4">Title & Slug</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Tags</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Published</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-secondary">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4 font-semibold text-primary">
                      <div>
                        <span className="block text-sm">{post.title}</span>
                        <span className="text-[11px] font-mono text-secondary-muted">
                          /blog/{post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {post.isDebuggingTemplate ? (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Bug className="w-3.5 h-3.5" /> Debug Log
                        </span>
                      ) : (
                        <span className="text-secondary">Standard Article</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      {post.status === "draft" ? (
                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-secondary-muted border border-border">
                          Draft
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/20">
                          Published
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-secondary-muted">
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1.5 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="p-1.5 rounded-lg border border-border hover:border-red-500 text-secondary hover:text-red-400 transition-colors"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Editor */}
        {isModalOpen && editingPost && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-primary">
                    {editingPost.slug ? "Edit Article" : "Compose Article"}
                  </h2>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setIsPreviewMode(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono ${
                        !isPreviewMode
                          ? "bg-accent text-accent-text font-bold"
                          : "text-secondary hover:bg-surface-elevated"
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPreviewMode(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono ${
                        isPreviewMode
                          ? "bg-accent text-accent-text font-bold"
                          : "text-secondary hover:bg-surface-elevated"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg border border-border text-secondary hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isPreviewMode ? (
                /* Live Preview Mode */
                <div className="space-y-6 p-6 rounded-xl border border-border bg-surface-muted">
                  <div className="space-y-2">
                    <Badge variant="accent">{editingPost.readTime}</Badge>
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                      {editingPost.title || "Untitled Article"}
                    </h1>
                    <p className="text-sm text-secondary">{editingPost.summary}</p>
                  </div>
                  <div className="pt-4 border-t border-border prose prose-invert max-w-none text-xs sm:text-sm text-secondary leading-relaxed whitespace-pre-line font-mono">
                    {editingPost.content}
                  </div>
                </div>
              ) : (
                /* Editor Form */
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPost.title}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            title: e.target.value,
                            slug: editingPost.slug || e.target.value.toLowerCase().replace(/[^\w-]/g, "-"),
                          })
                        }
                        placeholder="e.g. Debugging React Hydration Issues"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPost.slug}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, slug: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">
                        Publication Status
                      </label>
                      <select
                        value={editingPost.status || "published"}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            status: e.target.value as "published" | "draft" | "archived",
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft (Private)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        value={editingPost.readTime}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, readTime: e.target.value })
                        }
                        placeholder="5 min read"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Short Summary / Excerpt *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingPost.summary}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, summary: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary resize-none"
                    />
                  </div>

                  {/* Template Option */}
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-surface-muted">
                    <input
                      type="checkbox"
                      id="debugging-toggle"
                      checked={editingPost.isDebuggingTemplate}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          isDebuggingTemplate: e.target.checked,
                        })
                      }
                      className="rounded border-border"
                    />
                    <label htmlFor="debugging-toggle" className="text-xs text-primary font-medium flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5 text-accent" />
                      <span>Use Specialized Bug & Debugging Incident Log Template</span>
                    </label>
                  </div>

                  {/* Markdown Content */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Article Content (Markdown / MDX Supported) *
                    </label>
                    <textarea
                      rows={12}
                      required
                      value={editingPost.content}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, content: e.target.value })
                      }
                      className="w-full p-4 rounded-xl border border-border bg-surface-muted text-xs font-mono text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingPost.tags.join(", ")}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm" disabled={saving}>
                      {saving ? "Saving..." : "Save Article"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
