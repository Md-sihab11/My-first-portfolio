"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Briefcase, CheckCircle2, AlertCircle, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ExperienceItem } from "@/types/experience";
import { Button } from "@/components/ui/Button";

export default function AdminExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load entries." });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingItem({
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "Remote / Dhaka",
      period: "2026 - Present",
      description: "",
      current: true,
      order: items.length + 1,
      visible: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ExperienceItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setSaving(true);
      setFeedback(null);

      const res = await fetch("/api/admin/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save entry.");

      setIsModalOpen(false);
      setFeedback({ type: "success", message: "Learning milestone saved." });
      fetchItems();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Save operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const res = await fetch(`/api/admin/experience?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed.");

      setFeedback({ type: "success", message: "Entry removed." });
      fetchItems();
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
              Career & Study Path
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Experience & Learning Milestones
            </h1>
            <p className="text-xs text-secondary mt-1">
              Document full-stack learning phases, personal milestones, and junior roles without fabricated claims.
            </p>
          </div>

          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
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

        {/* List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-accent">
                    {item.period}
                  </span>
                  {item.current && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-accent-subtle text-accent border border-accent/30 font-semibold">
                      CURRENT
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-primary">
                  {item.role}
                </h3>
                <p className="text-xs text-secondary-muted font-medium">
                  {item.company} {item.location && `• ${item.location}`}
                </p>
                <p className="text-xs text-secondary leading-relaxed pt-1 max-w-2xl">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg border border-border hover:border-red-500 text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form */}
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary">
                  Milestone Editor
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
                    Role / Phase Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, role: e.target.value })
                    }
                    placeholder="e.g. Full-Stack Web Development with Next.js"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Organization / Focus Setting *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, company: e.target.value })
                    }
                    placeholder="e.g. Project-Driven Study / Independent"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Time Period
                    </label>
                    <input
                      type="text"
                      value={editingItem.period}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, period: e.target.value })
                      }
                      placeholder="2026 - Present"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editingItem.location || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, location: e.target.value })
                      }
                      placeholder="Dhaka, Bangladesh"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="current-toggle"
                    checked={editingItem.current}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, current: e.target.checked })
                    }
                    className="rounded border-border"
                  />
                  <label htmlFor="current-toggle" className="text-xs text-primary font-medium">
                    Currently Ongoing Phase
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
                    {saving ? "Saving..." : "Save Entry"}
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
