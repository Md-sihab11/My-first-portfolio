"use client";

import React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  // Site is dark-mode only; the toggle renders a static dark-mode indicator.
  useTheme(); // keep the import live in case the provider is extended later
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label="Dark mode"
      className="flex min-h-[40px] min-w-[40px] h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-secondary transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {mounted && <Moon className="h-4 w-4 text-primary" />}
    </button>
  );
}
