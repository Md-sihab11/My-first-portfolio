import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <Container size="sm" className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-accent bg-accent-subtle border border-accent/20">
          <span>Error 404</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-primary tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-secondary max-w-md mx-auto leading-relaxed">
          The requested page does not exist or has been moved. You can navigate back home or explore existing projects.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <Button href="/projects" variant="secondary" size="md">
            <span>Explore Projects</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
