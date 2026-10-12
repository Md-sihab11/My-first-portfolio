"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  User,
  Sparkles,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProfileSettings } from "@/types/site-settings";
import { Button } from "@/components/ui/Button";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProfileSettings>({
    fullName: "",
    displayName: "",
    role: "",
    intro: "",
    aboutStory: "",
    aboutPhilosophy: "",
    currentFocus: "",
    location: "",
    availability: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    profileImage: "/images/profile/profile.png",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.settings?.profile) {
        setForm(data.settings.profile);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError(null);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "profile");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");

      setForm((prev) => ({ ...prev, profileImage: data.url }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Could not upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: form }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile.");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Save operation failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center text-xs font-mono text-secondary-muted">
          Loading profile settings...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Identity Management
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Profile & Public Information
            </h1>
            <p className="text-xs text-secondary mt-1">
              All modifications persist to MongoDB Atlas and update the public portfolio immediately.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={saving || uploadingImage}
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {success && (
          <div className="p-4 rounded-xl bg-accent-subtle border border-accent/40 flex items-center gap-3 text-accent text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Profile settings saved and published successfully!</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 flex items-center gap-3 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Picture & Core Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar Upload Column */}
          <div className="lg:col-span-4 p-6 rounded-2xl border border-border bg-surface space-y-5">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              <span>Profile Picture</span>
            </h2>

            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-border bg-surface-muted">
              <Image
                src={form.profileImage || "/images/profile/profile.png"}
                alt="Profile preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-secondary">
                Upload New Image:
              </label>
              <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-dashed border-border hover:border-accent bg-surface-elevated text-xs font-semibold text-primary cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-accent" />
                <span>{uploadingImage ? "Uploading..." : "Select File (PNG, JPG)"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-mono text-secondary mb-1">
                Or Direct Image URL:
              </label>
              <input
                type="text"
                value={form.profileImage}
                onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Core Info Fields */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-6">
            <h2 className="text-sm font-bold text-primary pb-3 border-b border-border">
              Basic Credentials
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. MD Shakib (Sihab Sharar)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                  Display / Short Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  placeholder="e.g. Shakib"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                  Professional Title / Role *
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Full-stack Developer in Progress"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Dhaka, Bangladesh"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                  Public Contact Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                  Availability Status
                </label>
                <input
                  type="text"
                  value={form.availability}
                  onChange={(e) => setForm({ ...form, availability: e.target.value })}
                  placeholder="Available for junior roles & internships"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                Hero Short Introduction
              </label>
              <textarea
                rows={2}
                value={form.intro}
                onChange={(e) => setForm({ ...form, intro: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Narrative & Story Section */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-6">
          <h2 className="text-sm font-bold text-primary pb-3 border-b border-border">
            About & Development Narrative
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                My Story (About Page)
              </label>
              <textarea
                rows={4}
                value={form.aboutStory}
                onChange={(e) => setForm({ ...form, aboutStory: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                Engineering Philosophy
              </label>
              <textarea
                rows={3}
                value={form.aboutPhilosophy}
                onChange={(e) => setForm({ ...form, aboutPhilosophy: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-secondary mb-1.5">
                Current Technical Focus & Goals
              </label>
              <input
                type="text"
                value={form.currentFocus}
                onChange={(e) => setForm({ ...form, currentFocus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Links & SEO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-surface space-y-4">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2 pb-2 border-b border-border">
              <LinkIcon className="w-4 h-4 text-accent" />
              <span>Core Profile Links</span>
            </h2>

            <div>
              <label className="block text-xs font-mono text-secondary mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-secondary mb-1">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={form.linkedinUrl || ""}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface space-y-4">
            <h2 className="text-sm font-bold text-primary flex items-center gap-2 pb-2 border-b border-border">
              <Globe className="w-4 h-4 text-accent" />
              <span>SEO Meta Tags</span>
            </h2>

            <div>
              <label className="block text-xs font-mono text-secondary mb-1">
                SEO Title
              </label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-secondary mb-1">
                SEO Description
              </label>
              <textarea
                rows={2}
                value={form.seoDescription}
                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface-muted text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
