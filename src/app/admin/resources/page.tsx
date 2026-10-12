"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Plus,
  Trash2,
  Edit,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Resource } from "@/types/resource";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/resources");
      const data = await res.json();
      if (data.resources) setResources(data.resources);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load resources." });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingResource({
      id: `res-${Date.now()}`,
      title: "",
      description: "",
      category: "Web Development",
      fileUrl: "",
      fileSize: "1.0 MB",
      format: "PDF",
      updatedAt: new Date().toISOString(),
      tags: ["Notes", "Next.js"],
      published: true,
      downloads: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (r: Resource) => {
    setEditingResource({ ...r });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingResource) return;

    try {
      setUploadingFile(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "resources");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "File upload failed.");

      const sizeFormatted = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const formatExt = file.name.split(".").pop()?.toUpperCase() || "PDF";

      setEditingResource((prev) =>
        prev
          ? {
              ...prev,
              fileUrl: data.url,
              storageKey: data.key,
              fileSize: sizeFormatted,
              format: formatExt,
              title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
            }
          : null
      );
    } catch (err: any) {
      alert(err.message || "Upload failed.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;

    try {
      setSaving(true);
      setFeedback(null);

      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingResource),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save resource.");

      setIsModalOpen(false);
      setFeedback({ type: "success", message: "Resource saved successfully." });
      fetchResources();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Save failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (r: Resource) => {
    if (!confirm(`Are you sure you want to delete "${r.title}"?`)) return;

    try {
      const url = `/api/admin/resources?id=${encodeURIComponent(r.id)}${
        r.storageKey ? `&storageKey=${encodeURIComponent(r.storageKey)}` : ""
      }`;
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed.");

      setFeedback({ type: "success", message: "Resource removed." });
      fetchResources();
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
              Downloads & Materials
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Resource Management
            </h1>
            <p className="text-xs text-secondary mt-1">
              Upload PDF notes, cheatsheets, and learning guides to object storage.
            </p>
          </div>

          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>Upload New Material</span>
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

        {/* Resources Table */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-elevated border-b border-border text-secondary uppercase">
                <tr>
                  <th className="p-4">Material Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Format / Size</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4">Updated</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-secondary">
                {resources.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4 font-semibold text-primary">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{r.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="accent">{r.category}</Badge>
                    </td>
                    <td className="p-4">
                      {r.format} • {r.fileSize}
                    </td>
                    <td className="p-4">
                      {r.published ? (
                        <span className="px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/20">
                          Public
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-secondary-muted border border-border">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-secondary-muted">{formatDate(r.updatedAt)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {r.fileUrl && (
                          <a
                            href={r.fileUrl}
                            download
                            className="p-1.5 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                            aria-label={`Download ${r.title}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(r)}
                          className="p-1.5 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                          aria-label={`Edit ${r.title}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(r)}
                          className="p-1.5 rounded-lg border border-border hover:border-red-500 text-secondary hover:text-red-400 transition-colors"
                          aria-label={`Delete ${r.title}`}
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
        {isModalOpen && editingResource && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-xl bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 my-8">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary">
                  {editingResource.title ? "Edit Resource" : "Upload Resource"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg border border-border text-secondary hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingResource.title}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, title: e.target.value })
                    }
                    placeholder="e.g. Modern JavaScript Cheatsheet"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingResource.category}
                      onChange={(e) =>
                        setEditingResource({ ...editingResource, category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Visibility
                    </label>
                    <select
                      value={editingResource.published ? "true" : "false"}
                      onChange={(e) =>
                        setEditingResource({
                          ...editingResource,
                          published: e.target.value === "true",
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    >
                      <option value="true">Public (Live Download)</option>
                      <option value="false">Private Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingResource.description}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary resize-none"
                  />
                </div>

                {/* Upload File Input */}
                <div className="space-y-2 p-4 rounded-xl border border-dashed border-border bg-surface-muted">
                  <label className="block text-xs font-mono uppercase text-secondary">
                    Select File (PDF, MD, ZIP)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="File URL will appear after upload"
                      value={editingResource.fileUrl}
                      onChange={(e) =>
                        setEditingResource({ ...editingResource, fileUrl: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-surface text-xs text-primary font-mono"
                    />
                    <label className="px-3 py-2 rounded-lg border border-border bg-surface-elevated text-xs font-semibold text-primary hover:border-accent cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-accent" />
                      <span>{uploadingFile ? "Uploading..." : "Browse"}</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {editingResource.fileSize && (
                    <span className="text-[11px] font-mono text-secondary-muted block">
                      Size: {editingResource.fileSize} • Format: {editingResource.format}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingResource.tags.join(", ")}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
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
                    {saving ? "Saving..." : "Save Resource"}
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
