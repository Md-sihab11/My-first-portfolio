"use client";

import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  BadgeCheck,
  ExternalLink,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { SourceLink } from "@/lib/study-abroad/types";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        "[data-autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      focusable?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
    };
  }, [open]);

  if (!mounted || !open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (closeOnOverlay && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "my-auto flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl",
          sizeClasses[size]
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-lg font-bold tracking-tight text-primary"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-xs leading-relaxed text-secondary"
              >
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-secondary transition-colors hover:text-primary hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {children}
        </div>

        {footer && (
          <div className="border-t border-border bg-surface-muted/60 px-5 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-primary"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] leading-relaxed text-secondary-muted">
          {hint}
        </p>
      )}
      {error && (
        <p className="text-[11px] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-primary placeholder:text-secondary-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30";

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputClasses, className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(inputClasses, "min-h-[6rem] resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(inputClasses, className)} {...props}>
      {children}
    </select>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-surface-muted/50 p-4 sm:p-5">
      <div>
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        {description && (
          <p className="mt-1 text-[11px] leading-relaxed text-secondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

export function SourceEditor({
  sources,
  onChange,
}: {
  sources: SourceLink[];
  onChange: (sources: SourceLink[]) => void;
}) {
  return (
    <div className="space-y-2">
      {sources.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-background p-2 sm:grid-cols-[1fr_1.4fr_auto]"
        >
          <TextInput
            aria-label={`Source ${index + 1} label`}
            placeholder="Source label"
            value={item.label}
            onChange={(event) => {
              const next = [...sources];
              next[index] = { ...next[index], label: event.target.value };
              onChange(next);
            }}
          />
          <TextInput
            aria-label={`Source ${index + 1} URL`}
            placeholder="https://official-site.example/page"
            value={item.url}
            onChange={(event) => {
              const next = [...sources];
              next[index] = { ...next[index], url: event.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(sources.filter((_, i) => i !== index))}
            aria-label={`Remove source ${index + 1}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:border-red-500/40 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      {sources.length < 12 && (
        <button
          type="button"
          onClick={() => onChange([...sources, { label: "", url: "" }])}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-semibold text-secondary transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Plus className="h-3.5 w-3.5" />
          Add official source
        </button>
      )}
    </div>
  );
}

export function StatusBadge({ verified }: { verified: boolean }) {
  return (
    <Badge
      variant={verified ? "accent" : "muted"}
      className="shrink-0 gap-1 py-0 text-[10px] uppercase tracking-wider"
    >
      {verified ? (
        <BadgeCheck className="h-3 w-3" />
      ) : (
        <AlertCircle className="h-3 w-3" />
      )}
      {verified ? "Verified" : "Needs checking"}
    </Badge>
  );
}

export function ExternalSourceLink({
  source,
  className,
}: {
  source: SourceLink;
  className?: string;
}) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded text-[11px] font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {source.label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function SourceList({
  sources,
  emptyLabel = "No additional official links saved yet.",
}: {
  sources: SourceLink[];
  emptyLabel?: string;
}) {
  if (sources.length === 0) {
    return (
      <p className="text-xs italic text-secondary-muted">{emptyLabel}</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {sources.map((source) => (
        <li key={`${source.url}-${source.label}`}>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-secondary transition-colors hover:border-accent/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-primary">
                {source.label}
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-secondary-muted">
                {source.url}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function isCheckPlaceholder(value: string): boolean {
  return !value || /^check official website\.?$/i.test(value.trim());
}

export function ResearchField({
  label,
  value,
  source,
  verified,
  wide = false,
}: {
  label: string;
  value: string | string[];
  source?: SourceLink;
  verified?: boolean;
  wide?: boolean;
}) {
  const values = Array.isArray(value) ? value.filter(Boolean) : [value];
  const hasContent = values.some((item) => item && !isCheckPlaceholder(item));
  const showCheck = !hasContent;
  const effectiveVerified = Boolean(verified) && hasContent;
  const sourceToUse = source;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-4",
        wide && "sm:col-span-2"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-secondary-muted">
          {label}
        </h4>
        {typeof verified === "boolean" && <StatusBadge verified={verified} />}
      </div>

      {showCheck ? (
        <p className="mt-3 text-sm italic text-secondary-muted">
          Check official website.
        </p>
      ) : Array.isArray(value) ? (
        <ul className="mt-3 space-y-1.5">
          {values.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-relaxed text-secondary"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-secondary">
          {value}
        </p>
      )}

      {sourceToUse && (
        <div className="mt-3 border-t border-border/70 pt-2.5">
          <ExternalSourceLink source={sourceToUse} />
        </div>
      )}
    </div>
  );
}

export function UniversityLogo({
  name,
  shortName,
  logoUrl,
  size = "md",
}: {
  name: string;
  shortName?: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const initials = (shortName || name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const sizeClasses = {
    sm: "h-10 w-10 text-xs rounded-lg",
    md: "h-14 w-14 text-sm rounded-xl",
    lg: "h-20 w-20 text-lg rounded-2xl",
  };

  if (logoUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={`${name} logo`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={cn(
          "shrink-0 border border-border bg-surface-elevated object-contain p-1.5",
          sizeClasses[size]
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center border border-accent/20 bg-accent-subtle font-mono font-bold text-accent",
        sizeClasses[size]
      )}
    >
      {initials || "U"}
    </div>
  );
}

export function Notice({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "error" | "success";
  title?: string;
  children: ReactNode;
}) {
  const toneClasses = {
    info: "border-border bg-surface-muted/70 text-secondary",
    error: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300",
    success:
      "border-accent/30 bg-accent-subtle text-primary",
  };

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border p-3 text-xs leading-relaxed",
        toneClasses[tone]
      )}
      role={tone === "error" ? "alert" : undefined}
    >
      {tone === "success" ? (
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      ) : (
        <AlertCircle
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0",
            tone === "error" ? "text-red-500" : "text-accent"
          )}
        />
      )}
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? "mt-1" : undefined}>{children}</div>
      </div>
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
  className,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-accent-solid px-4 py-2.5 text-sm font-semibold text-accent-text shadow-glow transition-colors hover:bg-accent-solid-hover disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function ActionButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
