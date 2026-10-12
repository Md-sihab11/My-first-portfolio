"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Star,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load projects." });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProject({
      slug: "",
      title: "",
      tagline: "",
      description: "",
      problem: "",
      solution: "",
      image: "/images/projects/bazar-dor.png",
      imageAlt: "",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "",
      featured: false,
      category: "Full-Stack",
      highlights: [],
      status: "published",
      order: projects.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject({ ...p });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "projects");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setEditingProject((prev) => (prev ? { ...prev, image: data.url } : null));
    } catch (err: any) {
      alert(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setSaving(true);
      setFeedback(null);

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project.");

      setIsModalOpen(false);
      setFeedback({ type: "success", message: "Project saved successfully." });
      fetchProjects();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Save operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete project.");

      setFeedback({ type: "success", message: "Project deleted." });
      fetchProjects();
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
              Content Catalog
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Project Management
            </h1>
            <p className="text-xs text-secondary mt-1">
              Add, edit, publish, and order portfolio projects saved to MongoDB Atlas.
            </p>
          </div>

          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
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

        {/* Project List Table */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-elevated border-b border-border text-secondary uppercase">
                <tr>
                  <th className="p-4">Project</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Tech Badges</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-secondary">
                {projects.map((p) => (
                  <tr key={p.slug} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded bg-surface-muted overflow-hidden flex-shrink-0 border border-border">
                          <Image
                            src={p.image || "/images/projects/bazar-dor.png"}
                            alt={p.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-primary block">
                            {p.title}
                          </span>
                          <span className="text-[11px] text-secondary-muted font-mono">
                            /{p.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{p.category}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.technologies.slice(0, 3).map((t) => (
                          <Badge key={t} variant="muted" className="text-[10px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      {p.featured ? (
                        <span className="text-accent flex items-center gap-1 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-accent" /> Yes
                        </span>
                      ) : (
                        <span className="text-secondary-muted">No</span>
                      )}
                    </td>
                    <td className="p-4">
                      {p.status === "draft" ? (
                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-secondary-muted border border-border">
                          Draft
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/20">
                          Published
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                          aria-label={`Edit ${p.title}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.slug)}
                          className="p-1.5 rounded-lg border border-border hover:border-red-500 text-secondary hover:text-red-400 transition-colors"
                          aria-label={`Delete ${p.title}`}
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

        {/* Modal Form */}
        {isModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary">
                  {editingProject.slug ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg border border-border text-secondary hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                          slug: editingProject.slug || e.target.value.toLowerCase().replace(/[^\w-]/g, "-"),
                        })
                      }
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
                      value={editingProject.slug}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, category: e.target.value })
                      }
                      placeholder="Full-Stack / Frontend"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Status
                    </label>
                    <select
                      value={editingProject.status || "published"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          status: e.target.value as "published" | "draft",
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft (Hidden from Public)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, tagline: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary resize-none"
                  />
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-2 p-4 rounded-xl border border-border bg-surface-muted">
                  <label className="block text-xs font-mono uppercase text-secondary">
                    Project Screenshot URL / Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingProject.image}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, image: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-surface text-xs text-primary"
                    />
                    <label className="px-3 py-2 rounded-lg border border-border bg-surface-elevated text-xs font-semibold text-primary hover:border-accent cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-accent" />
                      <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Tech Badges Comma Separated */}
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.technologies.join(", ")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.githubUrl || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, githubUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.liveUrl || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, liveUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-toggle"
                    checked={editingProject.featured}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featured: e.target.checked })
                    }
                    className="rounded border-border"
                  />
                  <label htmlFor="featured-toggle" className="text-xs text-primary font-medium">
                    Feature on Homepage Showcase
                  </label>
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
                    {saving ? "Saving..." : "Save Project"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
