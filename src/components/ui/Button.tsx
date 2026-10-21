import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  download?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal,
      download,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-md gap-1.5",
      md: "text-sm px-4 py-2.5 rounded-lg gap-2",
      lg: "text-base px-6 py-3.5 rounded-lg gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-accent-solid text-accent-text hover:bg-accent-solid-hover font-semibold shadow-glow hover:shadow-glow-lg",
      accent:
        "bg-accent-solid text-accent-text hover:bg-accent-solid-hover font-semibold shadow-glow hover:shadow-glow-lg",
      secondary:
        "bg-surface hover:bg-surface-elevated text-primary border border-border hover:border-secondary-muted",
      outline:
        "bg-transparent border border-border text-primary hover:bg-surface hover:border-accent/60",
      ghost:
        "bg-transparent text-secondary hover:text-primary hover:bg-surface-muted",
    };

    const combinedStyles = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    if (href) {
      if (download) {
        return (
          <a
            href={href}
            download={download}
            className={combinedStyles}
          >
            {children}
          </a>
        );
      }
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedStyles}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
