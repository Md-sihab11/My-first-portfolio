import React from "react";
import { Download, FileText, Calendar } from "lucide-react";
import { Resource } from "@/types/resource";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="group relative flex flex-col justify-between p-6 rounded-xl border border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="accent">{resource.category}</Badge>
          <span className="text-xs font-mono text-secondary-muted uppercase">
            {resource.format} • {resource.fileSize}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
            {resource.title}
          </h3>
          <p className="mt-2 text-sm text-secondary leading-relaxed">
            {resource.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px] py-0">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-secondary-muted font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>Updated {formatDate(resource.updatedAt)}</span>
        </div>

        <a
          href={resource.fileUrl}
          download
          aria-label={`Download ${resource.title} (${resource.format}, ${resource.fileSize})`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-surface-elevated border border-border text-primary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Download className="w-3.5 h-3.5 text-accent" />
          <span>Download</span>
        </a>
      </div>
    </article>
  );
}
