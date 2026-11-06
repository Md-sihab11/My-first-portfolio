"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Bus,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Home,
  MapPin,
  Pencil,
  ShieldCheck,
  Trash2,
  Wallet,
} from "lucide-react";
import type { City, Country, University } from "@/lib/study-abroad/types";
import { ApiError, requestJson } from "@/lib/study-abroad/client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  EditAccessProvider,
  useEditAccess,
} from "@/components/study-abroad/EditAccess";
import { UniversityForm } from "@/components/study-abroad/UniversityForm";
import { ConfirmDeleteDialog } from "@/components/study-abroad/ConfirmDeleteDialog";
import {
  Notice,
  ResearchField,
  SourceList,
  UniversityLogo,
} from "@/components/study-abroad/ui";

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/80 px-3.5 py-3">
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-xl font-bold text-primary">{value}</span>
      </div>
      <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
        {label}
      </p>
    </div>
  );
}

function UniversityDetailContent({
  country,
  city,
  university,
  cities,
  editConfigured,
}: {
  country: Country;
  city?: City;
  university: University;
  cities: City[];
  editConfigured: boolean;
}) {
  const router = useRouter();
  const { authorize, grant, clearGrant } = useEditAccess();
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const requestEdit = async () => {
    const result = await authorize({
      action: "update",
      targetType: "university",
      targetId: university.id,
      actionLabel: `Edit ${university.name}`,
    });
    if (result) setFormOpen(true);
  };

  const requestDelete = async () => {
    const result = await authorize({
      action: "delete",
      targetType: "university",
      targetId: university.id,
      actionLabel: `Delete ${university.name}`,
    });
    if (result) setDeleting(true);
  };

  const deleteUniversity = async () => {
    if (!grant) {
      throw new Error("Verification expired. Please verify the access code again.");
    }
    try {
      await requestJson(`/api/study-abroad/universities/${university.id}`, {
        method: "DELETE",
        csrfToken: grant.csrfToken,
      });
      clearGrant();
      setDeleting(false);
      router.push(`/study-abroad/${country.slug}`);
      router.refresh();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) clearGrant();
      throw caught;
    }
  };

  const checked = Boolean(university.lastVerifiedAt);

  return (
    <div className="space-y-10">
      <div>
        <Link
          href={`/study-abroad/${country.slug}`}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to {country.name}
        </Link>
      </div>

      <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-surface-muted to-surface p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl items-start gap-4">
            <UniversityLogo
              name={university.name}
              shortName={university.shortName}
              logoUrl={university.logoUrl}
              size="lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  {university.name}
                </h1>
                {university.sample && (
                  <Badge variant="outline" className="py-0 text-[9px] uppercase">
                    Sample
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-[11px] font-mono uppercase tracking-widest text-secondary-muted">
                {city ? `${city.name}, ` : ""}
                {country.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {university.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {university.intakes && (
                  <Badge variant="muted" className="text-[10px]">
                    {university.intakes.split(";")[0]}
                  </Badge>
                )}
                <Badge
                  variant={checked ? "accent" : "muted"}
                  className="text-[10px]"
                >
                  <BadgeCheck className="mr-1 h-3 w-3" />
                  {checked
                    ? `Checked ${formatDate(university.lastVerifiedAt as string)}`
                    : "Needs checking"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {university.website ? (
              <Button
                href={university.website}
                isExternal
                variant="primary"
                size="sm"
              >
                Official website
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <span className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-xs font-semibold text-secondary-muted">
                Check official website.
              </span>
            )}
            <Button
              onClick={requestEdit}
              variant="outline"
              size="sm"
              disabled={!editConfigured}
              title={
                editConfigured
                  ? "Edit this university"
                  : "Editing is not configured on this server."
              }
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
            <Button
              onClick={requestDelete}
              variant="outline"
              size="sm"
              disabled={!editConfigured}
              title={
                editConfigured
                  ? "Delete this university"
                  : "Editing is not configured on this server."
              }
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-5 sm:grid-cols-4">
          <Stat
            icon={<MapPin className="h-4 w-4" />}
            value={city?.name ?? "Check official website."}
            label="City"
          />
          <Stat
            icon={<Building2 className="h-4 w-4" />}
            value={university.campusSetting}
            label="Campus setting"
          />
          <Stat
            icon={<GraduationCap className="h-4 w-4" />}
            value={university.courses.length}
            label="Courses listed"
          />
          <Stat
            icon={<ExternalLink className="h-4 w-4" />}
            value={university.sources.length}
            label="Source links"
          />
        </div>
      </header>

      {!editConfigured && (
        <Notice tone="info" title="Browsing only">
          Editing is disabled until the server database and private edit
          credentials are configured. All research content remains readable.
        </Notice>
      )}

      <section>
        <SectionHeading
          eyebrow="Admissions"
          title="Requirements, deadlines and costs"
          description="These are research notes, not an offer or a guarantee. Confirm every requirement, fee and deadline on the university's official pages."
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ResearchField
            label="Courses & programmes"
            value={university.courses}
            wide
          />
          <ResearchField label="Degree levels" value={university.degreeLevels} />
          <ResearchField label="Intakes" value={university.intakes} />
          <ResearchField
            label="Admission requirements"
            value={university.admissionRequirements}
            wide
          />
          <ResearchField label="GPA requirements" value={university.gpaRequirements} />
          <ResearchField
            label="English requirements (IELTS / TOEFL / PTE / MOI)"
            value={university.englishRequirements}
          />
          <ResearchField label="Study-gap policy" value={university.studyGapPolicy} />
          <ResearchField
            label="Application deadlines"
            value={university.applicationDeadlines}
          />
          <ResearchField label="Application fee" value={university.applicationFee} />
          <ResearchField label="Tuition fees" value={university.tuitionFees} />
          <ResearchField label="Course duration" value={university.courseDuration} />
          <ResearchField
            label="Required admission documents"
            value={university.requiredDocuments}
            wide
          />
          <ResearchField
            label="Scholarships & funding"
            value={university.scholarships}
            wide
          />
          <ResearchField
            label="Admissions office contact"
            value={university.admissionsContact}
          />
          <ResearchField
            label="Official application portal"
            value={university.applicationPortal}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Accommodation & living costs"
          title="Plan the monthly budget"
          description="Housing and living costs vary by city and lifestyle. Treat all estimates as a starting point and verify current prices."
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ResearchField
            label="University dormitories"
            value={university.dormitories}
            wide
          />
          <ResearchField
            label="Private accommodation"
            value={university.privateAccommodation}
            wide
          />
          <ResearchField label="Estimated rent" value={university.estimatedRent} />
          <ResearchField
            label="Monthly living expenses"
            value={university.monthlyLivingCost}
          />
          <ResearchField label="Food costs" value={university.foodCost} />
          <ResearchField label="Transport costs" value={university.transportCost} />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Campus & location"
          title="Getting there and settling in"
          description="Campus setting, transport, nearby cities and the practical details that shape daily student life."
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ResearchField label="Full address" value={university.address} wide />
          <ResearchField label="Region / state" value={university.region} />
          <ResearchField label="Campus name" value={university.campusName} />
          <ResearchField
            label="Campus setting"
            value={university.campusSetting}
          />
          <ResearchField
            label="City classification"
            value={university.cityClassification}
          />
          <ResearchField label="Nearby cities" value={university.nearbyCities} />
          <ResearchField label="Nearest airport" value={university.nearestAirport} />
          <ResearchField
            label="Public transport"
            value={university.publicTransport}
            wide
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Student life"
          title="Facilities, work and wellbeing"
          description="Check the official student-life, safety and visa-work pages before making decisions."
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ResearchField
            label="Essential facilities near campus"
            value={university.essentialFacilities}
            wide
          />
          <ResearchField
            label="Public transport access"
            value={university.publicTransportAccess}
            wide
          />
          <ResearchField
            label="Part-time work opportunities"
            value={university.partTimeWork}
          />
          <ResearchField label="Safety information" value={university.safety} />
          <ResearchField label="Student life & local environment" value={university.studentLife} wide />
          <ResearchField label="Climate" value={university.climate} />
        </div>
      </section>

      {city && (
        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
                City research file
              </p>
              <h2 className="mt-1 text-lg font-bold text-primary">
                {city.name}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-secondary">
                {city.summary}
              </p>
            </div>
            <Badge variant="accent" className="text-[10px]">
              {city.locationType}
            </Badge>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-muted/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
                Rent
              </p>
              <p className="mt-1 text-secondary">
                {city.monthlyRent || "Check official website."}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-muted/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
                Food
              </p>
              <p className="mt-1 text-secondary">
                {city.foodCost || "Check official website."}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-muted/60 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
                Transport
              </p>
              <p className="mt-1 text-secondary">
                {city.transportCost || "Check official website."}
              </p>
            </div>
          </div>
          <Link
            href={`/study-abroad/${country.slug}#cities`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Open full city research
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      )}

      <section className="border-t border-border/60 pt-10">
        <SectionHeading
          eyebrow="Official sources"
          title="Links to verify"
          description="University-level sources saved for this record. Always confirm fees, deadlines and policies on the official page before acting."
          className="mb-6"
        />
        <SourceList
          sources={university.sources}
          emptyLabel="No university sources saved yet. Add the official admissions, fees, accommodation and student-life links."
        />
        <div className="mt-6">
          <Notice tone="info" title="Accuracy note">
            This is a personal research workspace, not legal, immigration or
            financial advice. Requirements and costs change; verify every
            important detail on the linked official page.
          </Notice>
        </div>
      </section>

      {formOpen && (
        <UniversityForm
          key={university.id}
          countryId={country.id}
          cities={cities}
          initial={university}
          onClose={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false);
            router.refresh();
          }}
        />
      )}

      <ConfirmDeleteDialog
        open={deleting}
        onClose={() => setDeleting(false)}
        title={`Delete ${university.name}?`}
        description={
          <>
            This will permanently delete the university record for{" "}
            <strong>{university.name}</strong>. The country and city records
            will stay in place.
          </>
        }
        onConfirm={deleteUniversity}
      />
    </div>
  );
}

export function UniversityDetailView({
  country,
  city,
  university,
  cities,
  editConfigured,
}: {
  country: Country;
  city?: City;
  university: University;
  cities: City[];
  editConfigured: boolean;
}) {
  return (
    <EditAccessProvider configured={editConfigured}>
      <UniversityDetailContent
        country={country}
        city={city}
        university={university}
        cities={cities}
        editConfigured={editConfigured}
      />
    </EditAccessProvider>
  );
}
