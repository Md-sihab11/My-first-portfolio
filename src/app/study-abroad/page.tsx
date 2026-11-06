import React from "react";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { studyAbroadLastReviewed } from "@/data/study-abroad";
import { StudyAbroadHub } from "@/components/study-abroad/StudyAbroadHub";
import { Notice } from "@/components/study-abroad/ui";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { readStudyAbroadDataSafe } from "@/lib/study-abroad/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Study Abroad Research Hub",
  description:
    "Research countries, cities and universities, compare visa guidance, costs and scholarships, and keep every fact linked to an official source.",
};

export default async function StudyAbroadPage() {
  const { data, runtime } = await readStudyAbroadDataSafe();
  const editConfigured =
    runtime.editConfigured && runtime.mode === "database";

  return (
    <div className="py-16 sm:py-24 space-y-16">
      <Container size="lg" className="space-y-6">
        {runtime.mode !== "database" && (
          <Notice
            tone="info"
            title={
              runtime.mode === "setup"
                ? "Database setup is incomplete"
                : "Sample data mode"
            }
          >
            {runtime.mode === "setup"
              ? "A database is configured but the Study Abroad schema is missing. The bundled sample records are shown and editing is locked. Run the setup SQL described in STUDY_ABROAD.md, then restart the app."
              : "No study-abroad database is connected yet, so the hub is showing bundled sample records. Browsing works now; connect a database and run the setup files described in STUDY_ABROAD.md to save your own research."}
          </Notice>
        )}

        <StudyAbroadHub data={data} editConfigured={editConfigured} />
      </Container>

      {/* Call to action */}
      <Container size="lg">
        <section className="border-t border-border/60 pt-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-gradient-to-r from-surface via-surface-muted to-surface p-8 sm:p-10 md:flex-row md:items-center">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-accent">
                Keep Exploring
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                Found a broken link or need a second pair of eyes?
              </h2>
              <p className="text-sm leading-relaxed text-secondary">
                Send me a note if a resource needs updating, or browse my
                developer notes and cheatsheets while you plan your next step.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="primary" size="md">
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/resources" variant="secondary" size="md">
                Developer resources
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-wider text-secondary-muted">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-accent" />
              Official sources first
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Free to use
            </span>
            <span>Last reviewed {formatDate(studyAbroadLastReviewed)}</span>
          </div>
        </section>
      </Container>
    </div>
  );
}
