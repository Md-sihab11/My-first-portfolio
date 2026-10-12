import React from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { SocialLink } from "@/types/social";
import { cn } from "@/lib/utils";

interface SocialItemProps {
  link: SocialLink;
  variant?: "icon-only" | "card" | "pill";
  className?: string;
}

export function getSocialIcon(platform: SocialLink["platform"], className = "w-5 h-5") {
  switch (platform) {
    case "GitHub":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "Facebook":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "X":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9 10 15" />
        </svg>
      );
    case "Email":
    default:
      return <Mail className={className} aria-hidden="true" />;
  }
}

export function SocialCard({ link, variant = "card", className }: SocialItemProps) {
  if (!link.url || link.url.trim() === "") return null;

  const isMailto = link.url.startsWith("mailto:");

  if (variant === "icon-only") {
    return (
      <a
        href={link.url}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noopener noreferrer"}
        aria-label={link.label}
        className={cn(
          "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-border bg-surface text-secondary hover:text-accent hover:border-accent/40 hover:bg-surface-elevated transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className
        )}
      >
        {getSocialIcon(link.platform, "w-5 h-5")}
      </a>
    );
  }

  if (variant === "pill") {
    return (
      <a
        href={link.url}
        target={isMailto ? undefined : "_blank"}
        rel={isMailto ? undefined : "noopener noreferrer"}
        aria-label={link.label}
        className={cn(
          "inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[44px] rounded-lg border border-border bg-surface text-sm font-medium text-primary hover:border-accent/50 hover:bg-surface-elevated hover:text-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className
        )}
      >
        {getSocialIcon(link.platform, "w-4 h-4 text-accent")}
        <span>{link.platform}</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
      </a>
    );
  }

  return (
    <a
      href={link.url}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      aria-label={link.label}
      className={cn(
        "group relative flex items-center justify-between p-5 min-h-[56px] rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-elevated transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-lg bg-surface-elevated border border-border group-hover:border-accent/30 text-secondary group-hover:text-accent transition-colors">
          {getSocialIcon(link.platform, "w-5 h-5")}
        </div>
        <div>
          <div className="font-semibold text-primary group-hover:text-accent transition-colors">
            {link.platform}
          </div>
          {link.username && (
            <div className="text-xs text-secondary font-mono">{link.username}</div>
          )}
        </div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}
