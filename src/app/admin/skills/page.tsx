"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Code2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface SkillCategoryItem {
  id: string;
  title: string;
  description: string;
  skills: { name: string; focus: string }[];
  order?: number;
}

export default function AdminSkillsPage() {
  const [categories, setCategories] = useState<SkillCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategoryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load skills." });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCategory({
      id: `cat-${Date.now()}`,
      title: "",
      description: "",
      skills: [{ name: "Next.js", focus: "App Router & SSR" }],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: SkillCategoryItem) => {
    setEditingCategory({ ...cat });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      setSaving(true);
      setFeedback(null);

      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category.");

      setIsModalOpen(false);
      setFeedback({ type: "success", message: "Skills category saved to MongoDB Atlas." });
      fetchSkills();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Save operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/skills?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed.");

      setFeedback({ type: "success", message: "Category deleted." });
      fetchSkills();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Delete failed." });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Capabilities & Stack
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Skills & Technology Groups
            </h1>
            <p className="text-xs text-secondary mt-1">
              Organize technology competencies without arbitrary percentages or progress bars.
            </p>
          </div>

          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>New Category</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl border border-border bg-surface flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                  <h3 className="text-base font-bold text-primary flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    <span>{cat.title}</span>
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1 rounded-lg border border-border text-secondary hover:text-accent"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1 rounded-lg border border-border text-secondary hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-secondary leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="space-y-2">
                  {cat.skills.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-surface-muted border border-border/60 text-xs"
                    >
                      <span className="font-semibold text-primary block">
                        {s.name}
                      </span>
                      <span className="text-[11px] font-mono text-secondary-muted">
                        {s.focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {isModalOpen && editingCategory && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary">
                  Skill Group Editor
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg border border-border text-secondary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Group Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.title}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, title: e.target.value })
                    }
                    placeholder="e.g. Frontend Engineering"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingCategory.description}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary resize-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-secondary">
                      Technologies In This Group
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingCategory({
                          ...editingCategory,
                          skills: [
                            ...editingCategory.skills,
                            { name: "New Skill", focus: "Focus area" },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      + Add Item
                    </button>
                  </div>

                  {editingCategory.skills.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-border bg-surface-muted flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        placeholder="Name"
                        value={s.name}
                        onChange={(e) => {
                          const updated = [...editingCategory.skills];
                          updated[idx].name = e.target.value;
                          setEditingCategory({ ...editingCategory, skills: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded border border-border bg-surface text-xs text-primary"
                      />
                      <input
                        type="text"
                        placeholder="Focus / Context"
                        value={s.focus}
                        onChange={(e) => {
                          const updated = [...editingCategory.skills];
                          updated[idx].focus = e.target.value;
                          setEditingCategory({ ...editingCategory, skills: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded border border-border bg-surface text-xs text-primary"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingCategory.skills.filter((_, i) => i !== idx);
                          setEditingCategory({ ...editingCategory, skills: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
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
                    {saving ? "Saving..." : "Save Group"}
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
