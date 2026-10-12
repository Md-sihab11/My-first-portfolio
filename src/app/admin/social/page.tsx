"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Share2, CheckCircle2, AlertCircle, X, ExternalLink } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SocialLink, SocialPlatform } from "@/types/social";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const popularPlatforms: SocialPlatform[] = [
  "GitHub",
  "LinkedIn",
  "Codeforces",
  "LeetCode",
  "HackerRank",
  "CodeChef",
  "AtCoder",
  "Stack Overflow",
  "Dev.to",
  "Medium",
  "YouTube",
  "X",
  "Facebook",
  "Email",
];

export default function AdminSocialPage() {
  const [profiles, setProfiles] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<SocialLink | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/social");
      const data = await res.json();
      if (data.profiles) setProfiles(data.profiles);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load profiles." });
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProfile({
      id: `soc-${Date.now()}`,
      platform: "GitHub",
      label: "Visit my profile",
      url: "",
      username: "",
      featured: true,
      visible: true,
      order: profiles.length,
      shortDescription: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: SocialLink) => {
    setEditingProfile({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;

    try {
      setSaving(true);
      setFeedback(null);

      const res = await fetch("/api/admin/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProfile),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile.");

      setIsModalOpen(false);
      setFeedback({ type: "success", message: "Profile channel saved." });
      fetchProfiles();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Save operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Are you sure you want to remove this profile?")) return;

    try {
      const res = await fetch(`/api/admin/social?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed.");

      setFeedback({ type: "success", message: "Profile removed." });
      fetchProfiles();
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
              Network & Coding Profiles
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Social & Competitive Platforms
            </h1>
            <p className="text-xs text-secondary mt-1">
              Manage verified GitHub, Codeforces, LeetCode, and LinkedIn channels saved to MongoDB Atlas.
            </p>
          </div>

          <Button onClick={openCreateModal} variant="primary" size="md">
            <Plus className="w-4 h-4" />
            <span>Add Profile Channel</span>
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

        {/* Profiles Table */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-elevated border-b border-border text-secondary uppercase">
                <tr>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Username</th>
                  <th className="p-4">Direct Link</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-secondary">
                {profiles.map((p) => (
                  <tr key={p.id || p.platform} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4 font-semibold text-primary">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-accent" />
                        <span>{p.platform}</span>
                      </div>
                    </td>
                    <td className="p-4">{p.username || "—"}</td>
                    <td className="p-4 text-secondary-muted truncate max-w-xs">
                      {p.url}
                    </td>
                    <td className="p-4">
                      {p.visible ? (
                        <span className="px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/20">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-secondary-muted border border-border">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg border border-border hover:border-red-500 text-secondary hover:text-red-400 transition-colors"
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
        {isModalOpen && editingProfile && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="text-lg font-bold text-primary">
                  Profile Channel
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
                    Platform Name *
                  </label>
                  <input
                    list="platforms-list"
                    type="text"
                    required
                    value={editingProfile.platform}
                    onChange={(e) =>
                      setEditingProfile({ ...editingProfile, platform: e.target.value })
                    }
                    placeholder="e.g. LeetCode / GitHub"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                  <datalist id="platforms-list">
                    {popularPlatforms.map((plat) => (
                      <option key={plat} value={plat} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Profile URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProfile.url}
                    onChange={(e) =>
                      setEditingProfile({ ...editingProfile, url: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">
                    Username / Handle
                  </label>
                  <input
                    type="text"
                    value={editingProfile.username || ""}
                    onChange={(e) =>
                      setEditingProfile({ ...editingProfile, username: e.target.value })
                    }
                    placeholder="e.g. Md-sihab11"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="visible-toggle"
                    checked={editingProfile.visible !== false}
                    onChange={(e) =>
                      setEditingProfile({ ...editingProfile, visible: e.target.checked })
                    }
                    className="rounded border-border"
                  />
                  <label htmlFor="visible-toggle" className="text-xs text-primary font-medium">
                    Show on Public Portfolio
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
                    {saving ? "Saving..." : "Save Profile"}
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
