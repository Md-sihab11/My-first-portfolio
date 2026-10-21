import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  className,
  size = "lg",
  children,
  ...props
}: ContainerProps) {
  // Wide, centered content with generous side margins on large screens.
  // The size prop is kept so existing callers continue to type-check.
  const sizeMap = {
    sm: "max-w-[1440px]",
    md: "max-w-[1440px]",
    lg: "max-w-[1440px]",
    xl: "max-w-[1440px]",
    full: "max-w-[1440px]",
  };

  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
