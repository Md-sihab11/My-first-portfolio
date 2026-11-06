import React from "react";
import type { Metadata } from "next";
import { Download, FileText, Sparkles } from "lucide-react";
import { getAllResources } from "@/lib/resources";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Resources & Notes",
  description: "Curated learning notes, algorithms reference, and cheatsheets authored by Shakib.",
};

export default function ResourcesPage() {
  const allResources = getAllResources();

  return (
    <div className="py-16 sm:py-24 space-y-16">
      <Container size="lg">
        {/* Banner with Resume Highlight */}
        <div className="p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-r from-surface via-surface-muted to-surface mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Curriculum Vitae
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              Looking for Shakib&apos;s Developer Resume?
            </h2>
            <p className="text-sm text-secondary leading-relaxed">
              Download the latest verified PDF resume covering projects, core competencies, and contact information.
            </p>
          </div>
          <Button href="/files/resume.pdf" variant="primary" size="md" isExternal>
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </Button>
        </div>

        <SectionHeading
          eyebrow="Study Guides & Reference"
          title="Developer Resources"
          description="Free reference notes, problem-solving breakdowns, and quick sheets prepared during my full-stack learning journey."
        />

        <ResourceGrid resources={allResources} />
      </Container>
    </div>
  );
}
