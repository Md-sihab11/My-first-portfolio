import React from "react";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container size="sm" className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-border border-t-accent animate-spin" />
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-secondary-muted">
          Loading portfolio...
        </p>
      </Container>
    </div>
  );
}
