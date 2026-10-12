"use client";

import React, { useState, useEffect } from "react";
import {
  FileBadge,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/Button";

export default function AdminResumePage() {
  const [resumeUrl, setResumeUrl] = useState("/files/resume.pdf");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.settings?.profile?.resumeUrl) {
        setResumeUrl(data.settings.profile.resumeUrl);
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load resume info." });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setFeedback(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "resume");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload resume file.");

      setResumeUrl(data.url);

      // Immediately save to profile settings in MongoDB
      const saveRes = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: { resumeUrl: data.url } }),
      });

      if (!saveRes.ok) throw new Error("Uploaded but failed to update profile record.");

      setFeedback({
        type: "success",
        message: "New resume uploaded and live across all public download buttons!",
      });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div className="pb-6 border-b border-border">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            Curriculum Vitae
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">
            Resume Management
          </h1>
          <p className="text-xs text-secondary mt-1">
            Replace your active PDF resume. Public buttons in the hero, about page, and resources will immediately serve the new document.
          </p>
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

        {/* Current Resume Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-secondary-muted block">
                Active Resume Document
              </span>
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileBadge className="w-5 h-5 text-accent" />
                <span className="truncate max-w-sm sm:max-w-md">{resumeUrl}</span>
              </h3>
            </div>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-accent text-secondary hover:text-accent transition-colors"
              aria-label="Preview resume in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Upload Replacement Box */}
          <div className="p-8 rounded-xl border border-dashed border-border bg-surface-muted flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 rounded-full bg-surface-elevated text-accent border border-border">
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-primary">
                Upload New Resume PDF
              </h4>
              <p className="text-xs text-secondary-muted max-w-xs">
                Select your updated CV (PDF format, up to 10MB).
              </p>
            </div>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-text text-xs font-bold cursor-pointer hover:bg-accent-hover transition-colors shadow-glow">
              <span>{uploading ? "Uploading & Updating..." : "Choose PDF Document"}</span>
              <input
                type="file"
                accept="application/pdf"
                disabled={uploading}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-secondary-muted pt-2 border-t border-border">
            <span>Public download link: <code>{resumeUrl}</code></span>
            <a
              href={resumeUrl}
              download="Sihab_Sharar_Resume.pdf"
              className="text-accent hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Test Download</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
