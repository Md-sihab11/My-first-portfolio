"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Modal, Notice } from "@/components/study-abroad/ui";

export function ConfirmDeleteDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Delete permanently",
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      await onConfirm();
      setLoading(false);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "The item could not be deleted. No data was changed."
      );
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!loading) onClose();
      }}
      title={title}
      description="This action is permanent and cannot be undone."
      size="sm"
      closeOnOverlay={false}
      footer={
        <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-secondary-muted disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div className="text-sm leading-relaxed text-primary">{description}</div>
        </div>
        {error && (
          <Notice tone="error" title="Delete failed">
            {error}
          </Notice>
        )}
      </div>
    </Modal>
  );
}
