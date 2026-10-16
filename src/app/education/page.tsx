import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Download, BookOpen, Code, Award, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Education } from "@/components/home/Education";

export const metadata: Metadata = {
  title: `Education & Qualifications | ${siteConfig.fullName}`,
  description: `Academic background and degree credentials of ${siteConfig.fullName}, studying B.Sc. in Computer Science and Engineering at Dhaka International University.`,
};

export default function EducationPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <Container size="lg">
        {/* Page Heading */}
        <SectionHeading
          eyebrow="Academic Credentials"
          title="Education & Qualifications"
          description="Formal academic qualifications, undergraduate Computer Science coursework, and scientific foundations shaping my engineering discipline."
        />

        {/* Education Cards Component */}
        <Education showHeader={false} className="py-0 border-t-0" />

        {/* Academic Highlights / Engineering Philosophy */}
        <div className="mt-16 pt-16 border-t border-border/60 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Academic Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Curriculum & Engineering Foundations
            </h2>
            <p className="text-sm text-secondary leading-relaxed mt-2 max-w-2xl">
              How my academic studies at Dhaka International University and science background directly translate into software engineering capability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-surface space-y-3 shadow-glow">
              <div className="p-3 rounded-xl bg-surface-elevated border border-border w-fit text-accent">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary">
                Algorithms & Problem Solving
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Emphasis on data structures, algorithmic complexity (Big-O analysis), recursion, and memory management. Tested daily through competitive programming.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface space-y-3 shadow-glow">
              <div className="p-3 rounded-xl bg-surface-elevated border border-border w-fit text-accent">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary">
                Software Architecture & Systems
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Coursework covering Object-Oriented Design (OOP), database normalization, relational & non-relational database principles, and operating system concepts.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface space-y-3 shadow-glow">
              <div className="p-3 rounded-xl bg-surface-elevated border border-border w-fit text-accent">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-primary">
                Mathematics & Analytical Rigor
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Strong background in calculus, linear algebra, discrete mathematics, and logic from high school science through undergraduate engineering.
              </p>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="p-8 rounded-2xl border border-border bg-surface-muted/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-primary">
                Interested in reviewing my verified resume?
              </h3>
              <p className="text-xs text-secondary">
                Find my comprehensive academic records, project implementations, and technical competencies.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                href={siteConfig.resumeUrl}
                variant="primary"
                size="md"
                download="Shihab_Sharar_CV.pdf"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </Button>
              <Button href="/contact" variant="secondary" size="md">
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
