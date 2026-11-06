import Link from "next/link";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-medium outline-none transition-all duration-200 select-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent-solid text-accent-text shadow-glow hover:bg-accent-solid-hover hover:shadow-glow-lg",
        primary:
          "bg-accent-solid text-accent-text shadow-glow hover:bg-accent-solid-hover hover:shadow-glow-lg",
        accent:
          "bg-accent-solid text-accent-text shadow-glow hover:bg-accent-solid-hover hover:shadow-glow-lg",
        secondary:
          "border-border bg-surface text-primary hover:border-secondary-muted hover:bg-surface-elevated",
        outline:
          "border-border bg-transparent text-primary hover:border-accent/60 hover:bg-surface",
        ghost:
          "text-secondary hover:bg-surface-muted hover:text-primary",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3.5",
        xs: "h-7 gap-1 rounded-md px-2 text-[11px]",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-9 w-9",
        "icon-xs": "h-6 w-6 rounded-md",
        "icon-sm": "h-7 w-7 rounded-md",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  href?: string;
  isExternal?: boolean;
  download?: string;
}

function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  isExternal,
  download,
  children,
  render,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const external = isExternal || /^(https?:|mailto:|tel:)/.test(href);

    if (external || download) {
      return (
        <ButtonPrimitive
          data-slot="button"
          nativeButton={false}
          render={
            render ?? (
              <a
                href={href}
                {...(external && !download
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...(download ? { download } : {})}
              />
            )
          }
          className={classes}
          {...props}
        >
          {children}
        </ButtonPrimitive>
      );
    }

    return (
      <ButtonPrimitive
        data-slot="button"
        nativeButton={false}
        render={render ?? <Link href={href} />}
        className={classes}
        {...props}
      >
        {children}
      </ButtonPrimitive>
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      render={render}
      className={classes}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
