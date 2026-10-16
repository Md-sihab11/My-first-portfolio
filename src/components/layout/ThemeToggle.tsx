"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Switch theme"}
      className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-border bg-surface text-secondary hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {mounted && theme === "light" ? (
        <Moon className="w-4 h-4 text-primary" />
      ) : (
        <Sun className="w-4 h-4 text-accent" />
      )}
    </button>
  );
}
