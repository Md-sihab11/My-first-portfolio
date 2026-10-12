"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Layout,
  Type,
  PanelBottom,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/Button";

interface SiteSettings {
  hero: {
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    primaryCtaLink: string;
    secondaryCtaLabel: string;
    secondaryCtaLink: string;
  };
  sectionsVisibility: {
    showExperience: boolean;
    showEducation: boolean;
    showBlog: boolean;
    showResources: boolean;
    showSocial: boolean;
    showContact: boolean;
  };
  footer: {
    wordmark: string;
    note: string;
  };
}

const defaultSettings: SiteSettings = {
  hero: {
    headline: "Building for the web. Growing through every project.",
    subheadline:
      "Hi, I'm Shakib (Sihab Sharar). Full-stack developer focused on creating responsive, performant web applications with modern Next.js and MongoDB.",
    primaryCtaLabel: "Explore Projects",
    primaryCtaLink: "/projects",
    secondaryCtaLabel: "Contact Me",
    secondaryCtaLink: "/contact",
  },
  sectionsVisibility: {
    showExperience: true,
    showEducation: true,
    showBlog: true,
    showResources: true,
    showSocial: true,
    showContact: true,
  },
  footer: {
    wordmark: "Sihab sharar",
    note: "Crafted with Next.js App Router, TypeScript & editorial dark aesthetics.",
  },
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({
            hero: { ...prev.hero, ...(data.settings.hero || {}) },
            sectionsVisibility: {
              ...prev.sectionsVisibility,
              ...(data.settings.sectionsVisibility || {}),
            },
            footer: { ...prev.footer, ...(data.settings.footer || {}) },
          }));
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save settings.");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (key: keyof SiteSettings["hero"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      hero: { ...prev.hero, [key]: value },
    }));
  };

  const toggleSection = (key: keyof SiteSettings["sectionsVisibility"]) => {
    setSettings((prev) => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [key]: !prev.sectionsVisibility[key],
      },
    }));
  };

  const updateFooter = (key: keyof SiteSettings["footer"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      footer: { ...prev.footer, [key]: value },
    }));
  };

  const sectionToggles: { key: keyof SiteSettings["sectionsVisibility"]; label: string; description: string }[] = [
    { key: "showExperience", label: "Experience Section", description: "Show work experience and learning milestones on About page" },
    { key: "showEducation", label: "Education Section", description: "Show formal education on About page" },
    { key: "showBlog", label: "Blog Section", description: "Show blog posts in home page preview and navigation" },
    { key: "showResources", label: "Resources Section", description: "Show downloadable resources page in navigation" },
    { key: "showSocial", label: "Social Profiles Page", description: "Show dedicated social profiles page" },
    { key: "showContact", label: "Contact Section", description: "Show contact form CTA and navigation link" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3 text-secondary font-mono text-sm">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Loading settings...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Site Configuration
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">
              Site Settings
            </h1>
            <p className="text-xs sm:text-sm text-secondary mt-1">
              Control hero section content, page visibility, and footer text.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="primary"
            size="md"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-950/40 border border-green-700/50 text-green-300 text-sm">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-400" />
            Settings saved successfully.
          </div>
        )}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            {error}
          </div>
        )}

        {/* Hero Section Settings */}
        <div className="p-6 rounded-2xl border border-border bg-surface space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="p-2 rounded-lg bg-surface-elevated border border-border text-accent">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary">Hero Section</h2>
              <p className="text-xs text-secondary-muted font-mono">
                Main headline and call-to-action text displayed on the homepage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                Main Headline
              </label>
              <textarea
                rows={2}
                value={settings.hero.headline}
                onChange={(e) => updateHero("headline", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted text-primary text-sm font-semibold placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 resize-none transition-colors"
                placeholder="Your compelling hero headline..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                Subheadline / Description
              </label>
              <textarea
                rows={3}
                value={settings.hero.subheadline}
                onChange={(e) => updateHero("subheadline", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 resize-none transition-colors"
                placeholder="Introductory paragraph..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={settings.hero.primaryCtaLabel}
                  onChange={(e) => updateHero("primaryCtaLabel", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                  placeholder="Explore Projects"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={settings.hero.primaryCtaLink}
                  onChange={(e) => updateHero("primaryCtaLink", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                  placeholder="/projects"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={settings.hero.secondaryCtaLabel}
                  onChange={(e) => updateHero("secondaryCtaLabel", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                  placeholder="Contact Me"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                  Secondary CTA Link
                </label>
                <input
                  type="text"
                  value={settings.hero.secondaryCtaLink}
                  onChange={(e) => updateHero("secondaryCtaLink", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                  placeholder="/contact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Visibility */}
        <div className="p-6 rounded-2xl border border-border bg-surface space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="p-2 rounded-lg bg-surface-elevated border border-border text-accent">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary">Section Visibility</h2>
              <p className="text-xs text-secondary-muted font-mono">
                Toggle entire page sections on or off for the public site
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {sectionToggles.map(({ key, label, description }) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-muted hover:border-accent/30 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-primary">{label}</span>
                  <p className="text-xs text-secondary-muted font-mono">{description}</p>
                </div>
                <button
                  onClick={() => toggleSection(key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    settings.sectionsVisibility[key]
                      ? "bg-accent/15 text-accent border border-accent/30 hover:bg-accent/20"
                      : "bg-surface border border-border text-secondary-muted hover:border-border"
                  }`}
                >
                  {settings.sectionsVisibility[key] ? (
                    <>
                      <Eye className="w-3 h-3" />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" />
                      Hidden
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Settings */}
        <div className="p-6 rounded-2xl border border-border bg-surface space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="p-2 rounded-lg bg-surface-elevated border border-border text-accent">
              <PanelBottom className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary">Footer</h2>
              <p className="text-xs text-secondary-muted font-mono">
                Customize footer wordmark and attribution note
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                Footer Wordmark
              </label>
              <input
                type="text"
                value={settings.footer.wordmark}
                onChange={(e) => updateFooter("wordmark", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                placeholder="Sihab sharar"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                Footer Note / Tagline
              </label>
              <input
                type="text"
                value={settings.footer.note}
                onChange={(e) => updateFooter("note", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-muted text-primary text-sm placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-colors"
                placeholder="Crafted with Next.js App Router..."
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="primary"
            size="lg"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
