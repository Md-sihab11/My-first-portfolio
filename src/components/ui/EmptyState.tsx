import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No items found",
  description = "Try adjusting your search or filters.",
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border bg-surface/50",
        className
      )}
    >
      <div className="p-3 mb-4 rounded-full bg-surface-elevated text-secondary border border-border">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-1 text-sm text-secondary max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
