"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Info,
  MapPin,
  Pencil,
  Plus,
  School,
  Search,
  Trash2,
} from "lucide-react";
import {
  COUNTRY_INFO_DEFINITIONS,
  type City,
  type Country,
  type University,
} from "@/lib/study-abroad/types";
import { ApiError, requestJson } from "@/lib/study-abroad/client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  EditAccessProvider,
  useEditAccess,
} from "@/components/study-abroad/EditAccess";
import { CountryForm } from "@/components/study-abroad/CountryForm";
import { CityForm } from "@/components/study-abroad/CityForm";
import { UniversityForm } from "@/components/study-abroad/UniversityForm";
import { ConfirmDeleteDialog } from "@/components/study-abroad/ConfirmDeleteDialog";
import {
  Notice,
  ResearchField,
  SourceList,
  UniversityLogo,
} from "@/components/study-abroad/ui";

function CityCard({
  city,
  countrySlug,
  universities,
  onEdit,
  onDelete,
}: {
  city: City;
  countrySlug: string;
  universities: University[];
  onEdit: (city: City) => void;
  onDelete: (city: City) => void;
}) {
  const linked = universities.filter(
    (university) => university.cityId === city.id
  );

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-lg font-bold tracking-tight text-primary">
              {city.name}
            </h3>
            {city.sample && (
              <Badge variant="outline" className="py-0 text-[9px] uppercase">
                Sample
              </Badge>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge variant="accent" className="py-0 text-[10px]">
              {city.locationType}
            </Badge>
            {city.lastVerifiedAt ? (
              <Badge variant="default" className="py-0 text-[10px]">
                Checked {formatDate(city.lastVerifiedAt)}
              </Badge>
            ) : (
              <Badge variant="muted" className="py-0 text-[10px]">
                Needs checking
              </Badge>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(city)}
            aria-label={`Edit ${city.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-secondary transition-colors hover:border-border hover:bg-surface-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(city)}
            disabled={linked.length > 0}
            aria-label={`Delete ${city.name}`}
            title={
              linked.length > 0
                ? `Move or delete the ${linked.length} linked university record(s) first.`
                : `Delete ${city.name}`
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-secondary transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-secondary">{city.summary}</p>

      <div className="mt-3 rounded-lg border border-border bg-background p-3">
        <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
          Universities in this city
        </p>
        {linked.length > 0 ? (
          <ul className="mt-1.5 space-y-1.5">
            {linked.map((university) => (
              <li key={university.id}>
                <Link
                  href={`/study-abroad/${countrySlug}/${university.slug}`}
                  className="flex items-center gap-2 rounded-md px-1 py-1 text-xs font-semibold text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <GraduationCap className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="min-w-0 truncate">{university.name}</span>
                  <ArrowRight className="ml-auto h-3 w-3 shrink-0 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-xs italic text-secondary-muted">
            No universities linked to this city yet.
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface-muted/60 p-2.5">
          <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
            Nearby cities
          </p>
          <p className="mt-0.5 leading-relaxed text-secondary">
            {city.nearbyCities || "Check official website."}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-muted/60 p-2.5">
          <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
            Nearest airport
          </p>
          <p className="mt-0.5 leading-relaxed text-secondary">
            {city.nearestAirport || "Check official website."}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-border bg-background p-3">
        <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
          Getting around
        </p>
        <p className="mt-1 text-xs leading-relaxed text-secondary">
          {city.publicTransport || "Check official website."}
        </p>
        {city.nearestStation && (
          <p className="mt-1.5 text-xs leading-relaxed text-secondary">
            <span className="font-semibold text-primary">Nearest station:</span>{" "}
            {city.nearestStation}
          </p>
        )}
      </div>

      <details className="group mt-3 rounded-lg border border-border bg-background">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
          Costs, campus areas and student life
          <span className="text-[10px] font-mono text-secondary-muted group-open:hidden">
            Open
          </span>
        </summary>
        <div className="space-y-3 border-t border-border px-3 py-3 text-xs">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
              Campus areas
            </p>
            <p className="mt-0.5 leading-relaxed text-secondary">
              {city.campusAreas || "Check official website."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
                Rent
              </p>
              <p className="mt-0.5 leading-relaxed text-secondary">
                {city.monthlyRent || "Check official website."}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
                Food
              </p>
              <p className="mt-0.5 leading-relaxed text-secondary">
                {city.foodCost || "Check official website."}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
                Transport
              </p>
              <p className="mt-0.5 leading-relaxed text-secondary">
                {city.transportCost || "Check official website."}
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
              Facilities
            </p>
            <p className="mt-0.5 leading-relaxed text-secondary">
              {city.facilities || "Check official website."}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
              Student lifestyle
            </p>
            <p className="mt-0.5 leading-relaxed text-secondary">
              {city.studentLifestyle || "Check official website."}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-secondary-muted">
              Bus / train / metro
            </p>
            <p className="mt-0.5 leading-relaxed text-secondary">
              {city.busTrainMetro || "Check official website."}
            </p>
          </div>
          <SourceList
            sources={city.sources}
            emptyLabel="No city sources saved yet."
          />
        </div>
      </details>
    </article>
  );
}

function UniversityCard({
  country,
  city,
  university,
  onEdit,
  onDelete,
}: {
  country: Country;
  city?: City;
  university: University;
  onEdit: (university: University) => void;
  onDelete: (university: University) => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 sm:p-6">
      <div className="flex items-start gap-3">
        <UniversityLogo
          name={university.name}
          shortName={university.shortName}
          logoUrl={university.logoUrl}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-base font-bold leading-tight text-primary">
              {university.name}
            </h3>
            {university.sample && (
              <Badge variant="outline" className="py-0 text-[9px] uppercase">
                Sample
              </Badge>
            )}
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-secondary">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent" />
              {city?.name ?? "City not set"}
            </span>
            <span className="text-border-highlight">/</span>
            <span>{university.campusSetting}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(university)}
            aria-label={`Edit ${university.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-secondary transition-colors hover:border-border hover:bg-surface-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(university)}
            aria-label={`Delete ${university.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-secondary transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-secondary">
        {university.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="accent" className="py-0 text-[10px]">
          {university.cityClassification}
        </Badge>
        <Badge variant="outline" className="py-0 text-[10px]">
          {university.campusName}
        </Badge>
        {university.lastVerifiedAt ? (
          <Badge variant="default" className="py-0 text-[10px]">
            Checked {formatDate(university.lastVerifiedAt)}
          </Badge>
        ) : (
          <Badge variant="muted" className="py-0 text-[10px]">
            Needs checking
          </Badge>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
        {university.website ? (
          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Official website
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-[11px] font-semibold text-secondary-muted">
            Check official website.
          </span>
        )}
        <Link
          href={`/study-abroad/${country.slug}/${university.slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-solid px-3 py-2 text-[11px] font-semibold text-accent-text transition-colors hover:bg-accent-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Open university
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

function CountryDetailContent({
  country,
  cities,
  universities,
}: {
  country: Country;
  cities: City[];
  universities: University[];
}) {
  const router = useRouter();
  const { authorize, grant, clearGrant } = useEditAccess();
  const [countryFormOpen, setCountryFormOpen] = useState(false);
  const [cityForm, setCityForm] = useState<{ mode: "create" } | { mode: "edit"; city: City } | null>(null);
  const [universityForm, setUniversityForm] = useState<
    { mode: "create" } | { mode: "edit"; university: University } | null
  >(null);
  const [deletingCountry, setDeletingCountry] = useState(false);
  const [deletingCity, setDeletingCity] = useState<City | null>(null);
  const [deletingUniversity, setDeletingUniversity] = useState<University | null>(null);
  const [blockedMessage, setBlockedMessage] = useState("");
  const [universityQuery, setUniversityQuery] = useState("");

  const filteredUniversities = useMemo(() => {
    const query = universityQuery.trim().toLowerCase();
    if (!query) return universities;
    return universities.filter((university) => {
      const cityName =
        cities.find((city) => city.id === university.cityId)?.name ?? "";
      return [
        university.name,
        university.shortName,
        university.summary,
        cityName,
        ...university.courses,
        ...university.degreeLevels,
      ].some((value) => value.toLowerCase().includes(query));
    });
  }, [cities, universities, universityQuery]);

  const infoItems = useMemo(
    () =>
      COUNTRY_INFO_DEFINITIONS.map((definition) => ({
        definition,
        item: country.info.find((entry) => entry.key === definition.key),
      })),
    [country.info]
  );

  const verifiedInfoCount = infoItems.filter(
    (entry) => entry.item?.verified
  ).length;
  const sourceCount =
    country.sources.length +
    infoItems.filter((entry) => entry.item?.source).length;

  const requestCountryEdit = async () => {
    const result = await authorize({
      action: "update",
      targetType: "country",
      targetId: country.id,
      actionLabel: `Edit ${country.name}`,
    });
    if (result) setCountryFormOpen(true);
  };

  const requestCountryDelete = async () => {
    const result = await authorize({
      action: "delete",
      targetType: "country",
      targetId: country.id,
      actionLabel: `Delete ${country.name}`,
    });
    if (result) setDeletingCountry(true);
  };

  const requestCityCreate = async () => {
    const result = await authorize({
      action: "create",
      targetType: "city",
      targetId: country.id,
      actionLabel: `Add a city to ${country.name}`,
    });
    if (result) setCityForm({ mode: "create" });
  };

  const requestCityEdit = async (city: City) => {
    const result = await authorize({
      action: "update",
      targetType: "city",
      targetId: city.id,
      actionLabel: `Edit ${city.name}`,
    });
    if (result) setCityForm({ mode: "edit", city });
  };

  const requestCityDelete = async (city: City) => {
    const linked = universities.filter(
      (university) => university.cityId === city.id
    ).length;
    if (linked > 0) {
      setBlockedMessage(
        `${city.name} still has ${linked} linked university record${
          linked === 1 ? "" : "s"
        }. Move or delete those records before deleting the city.`
      );
      return;
    }
    const result = await authorize({
      action: "delete",
      targetType: "city",
      targetId: city.id,
      actionLabel: `Delete ${city.name}`,
    });
    if (result) setDeletingCity(city);
  };

  const requestUniversityCreate = async () => {
    if (cities.length === 0) {
      setBlockedMessage(
        "Add a city before adding a university. Every university needs a city and campus location."
      );
      return;
    }
    const result = await authorize({
      action: "create",
      targetType: "university",
      targetId: country.id,
      actionLabel: `Add a university to ${country.name}`,
    });
    if (result) setUniversityForm({ mode: "create" });
  };

  const requestUniversityEdit = async (university: University) => {
    const result = await authorize({
      action: "update",
      targetType: "university",
      targetId: university.id,
      actionLabel: `Edit ${university.name}`,
    });
    if (result) setUniversityForm({ mode: "edit", university });
  };

  const requestUniversityDelete = async (university: University) => {
    const result = await authorize({
      action: "delete",
      targetType: "university",
      targetId: university.id,
      actionLabel: `Delete ${university.name}`,
    });
    if (result) setDeletingUniversity(university);
  };

  const requireGrant = (): string => {
    if (!grant) {
      throw new Error("Verification expired. Please verify the access code again.");
    }
    return grant.csrfToken;
  };

  const deleteCountry = async () => {
    const csrfToken = requireGrant();
    try {
      await requestJson(`/api/study-abroad/countries/${country.id}`, {
        method: "DELETE",
        csrfToken,
      });
      clearGrant();
      setDeletingCountry(false);
      router.push("/study-abroad");
      router.refresh();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) clearGrant();
      throw caught;
    }
  };

  const deleteCity = async () => {
    if (!deletingCity) return;
    const csrfToken = requireGrant();
    try {
      await requestJson(`/api/study-abroad/cities/${deletingCity.id}`, {
        method: "DELETE",
        csrfToken,
      });
      clearGrant();
      setDeletingCity(null);
      router.refresh();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) clearGrant();
      throw caught;
    }
  };

  const deleteUniversity = async () => {
    if (!deletingUniversity) return;
    const csrfToken = requireGrant();
    try {
      await requestJson(
        `/api/study-abroad/universities/${deletingUniversity.id}`,
        {
          method: "DELETE",
          csrfToken,
        }
      );
      clearGrant();
      setDeletingUniversity(null);
      router.refresh();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) clearGrant();
      throw caught;
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <Link
          href="/study-abroad"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Study Abroad
        </Link>
      </div>

      <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-surface-muted to-surface p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-3xl"
                aria-hidden="true"
              >
                {country.flag || "🌍"}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {country.name}
                  </h1>
                  {country.sample && (
                    <Badge variant="outline" className="py-0 text-[9px] uppercase">
                      Sample
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-[11px] font-mono uppercase tracking-widest text-secondary-muted">
                  {country.region} · Country research file
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-secondary sm:text-base">
              {country.overview}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {country.locationSummary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Button onClick={requestCityCreate} variant="secondary" size="sm">
              <Plus className="h-3.5 w-3.5" />
              Add city
            </Button>
            <Button
              onClick={requestUniversityCreate}
              variant="secondary"
              size="sm"
              disabled={cities.length === 0}
              title={cities.length === 0 ? "Add a city first." : "Add a university"}
            >
              <Plus className="h-3.5 w-3.5" />
              Add university
            </Button>
            <Button onClick={requestCountryEdit} variant="outline" size="sm">
              <Pencil className="h-3.5 w-3.5" />
              Edit country
            </Button>
            <Button onClick={requestCountryDelete} variant="outline" size="sm">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-5 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-surface/80 px-3.5 py-3">
            <div className="flex items-center gap-2 text-accent">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xl font-bold text-primary">
                {universities.length}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              Universities
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface/80 px-3.5 py-3">
            <div className="flex items-center gap-2 text-accent">
              <MapPin className="h-4 w-4" />
              <span className="text-xl font-bold text-primary">
                {cities.length}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              Cities & towns
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface/80 px-3.5 py-3">
            <div className="flex items-center gap-2 text-accent">
              <Info className="h-4 w-4" />
              <span className="text-xl font-bold text-primary">
                {verifiedInfoCount}/{COUNTRY_INFO_DEFINITIONS.length}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              Sections checked
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface/80 px-3.5 py-3">
            <div className="flex items-center gap-2 text-accent">
              <ExternalLink className="h-4 w-4" />
              <span className="text-xl font-bold text-primary">
                {sourceCount}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              Source links
            </p>
          </div>
        </div>
      </header>

      {blockedMessage && (
        <Notice tone="info" title="Action paused">
          {blockedMessage}{" "}
          <button
            type="button"
            onClick={() => setBlockedMessage("")}
            className="font-semibold text-accent underline"
          >
            Dismiss
          </button>
        </Notice>
      )}

      <nav
        aria-label="Country page sections"
        className="flex flex-wrap gap-2 border-y border-border/60 py-3"
      >
        {[
          { href: "#country-information", label: "Country information" },
          { href: "#cities", label: `Cities (${cities.length})` },
          { href: "#universities", label: `Universities (${universities.length})` },
          { href: "#sources", label: "Official sources" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-secondary transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="country-information">
        <SectionHeading
          eyebrow="Country information"
          title="Visa, money and student life"
          description="Research notes for applicants in Bangladesh. Each item can carry one official source; unverified items remain visibly marked."
          className="mb-8"
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {infoItems.map(({ definition, item }) => (
            <ResearchField
              key={definition.key}
              label={definition.label}
              value={item?.summary ?? ""}
              source={item?.source}
              verified={item?.verified ?? false}
              wide={[
                "visa-process",
                "documents",
                "funds",
                "work",
              ].includes(definition.key)}
            />
          ))}
        </div>
      </section>

      <section id="cities">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Location research"
            title="Cities and towns"
            description="Campus areas, nearby cities, transport, costs and the universities attached to each location."
            className="mb-0"
          />
          <Button onClick={requestCityCreate} variant="secondary" size="md">
            <Plus className="h-4 w-4" />
            Add city
          </Button>
        </div>

        {cities.length === 0 ? (
          <EmptyState
            icon={<MapPin className="h-6 w-6" />}
            title="No cities saved for this country"
            description="Add a city or town to record campus locations, transport, nearby cities and living costs."
            action={
              <Button onClick={requestCityCreate}>
                <Plus className="h-4 w-4" />
                Add the first city
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {cities.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                countrySlug={country.slug}
                universities={universities}
                onEdit={requestCityEdit}
                onDelete={requestCityDelete}
              />
            ))}
          </div>
        )}
      </section>

      <section id="universities">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="University research"
            title="Universities in this country"
            description="Open a university for admission requirements, fees, campus location, accommodation and student-life notes."
            className="mb-0"
          />
          <Button
            onClick={requestUniversityCreate}
            variant="secondary"
            size="md"
            disabled={cities.length === 0}
            title={cities.length === 0 ? "Add a city first." : "Add a university"}
          >
            <Plus className="h-4 w-4" />
            Add university
          </Button>
        </div>

        {universities.length > 0 && (
          <div className="mb-5 max-w-xl">
            <label htmlFor="study-abroad-university-search" className="sr-only">
              Search universities by name, city or course
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-muted" />
              <input
                id="study-abroad-university-search"
                type="search"
                value={universityQuery}
                onChange={(event) => setUniversityQuery(event.target.value)}
                placeholder="Search by university, city or course..."
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-primary shadow-sm placeholder:text-secondary-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <p className="mt-2 text-[11px] text-secondary-muted" aria-live="polite">
              {filteredUniversities.length} of {universities.length} universities shown.
            </p>
          </div>
        )}

        {universities.length === 0 ? (
          <EmptyState
            icon={<School className="h-6 w-6" />}
            title="No universities saved for this country"
            description={
              cities.length > 0
                ? "Add a university, assign it to a city and start recording admission and accommodation details."
                : "Add a city first, then attach a university to it."
            }
            action={
              cities.length > 0 ? (
                <Button onClick={requestUniversityCreate}>
                  <Plus className="h-4 w-4" />
                  Add the first university
                </Button>
              ) : (
                <Button onClick={requestCityCreate} variant="outline">
                  Add a city first
                </Button>
              )
            }
          />
        ) : filteredUniversities.length === 0 ? (
          <EmptyState
            icon={<Search className="h-6 w-6" />}
            title="No universities match your search"
            description="Try a different university name, city or course, or clear the search to see every saved university."
            action={
              <Button onClick={() => setUniversityQuery("")} variant="outline">
                Clear search
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                country={country}
                city={cities.find((city) => city.id === university.cityId)}
                university={university}
                onEdit={requestUniversityEdit}
                onDelete={requestUniversityDelete}
              />
            ))}
          </div>
        )}
      </section>

      <section id="sources" className="border-t border-border/60 pt-10">
        <SectionHeading
          eyebrow="Official sources"
          title="Links to verify"
          description="Country-level sources saved for this research file. Item-specific links appear beside each section above."
          className="mb-6"
        />
        <SourceList
          sources={country.sources}
          emptyLabel="No country-level sources saved yet. Add official immigration, embassy, scholarship or cost links."
        />
        <div className="mt-6">
          <Notice tone="info" title="Accuracy note">
            This is a personal research workspace, not legal or immigration
            advice. Fees, deadlines and document rules change; verify every
            important detail on the linked official page before acting.
          </Notice>
        </div>
      </section>

      {countryFormOpen && (
        <CountryForm
          key={country.id}
          initial={country}
          onClose={() => setCountryFormOpen(false)}
          onSaved={() => {
            setCountryFormOpen(false);
            router.refresh();
          }}
        />
      )}

      {cityForm && (
        <CityForm
          key={cityForm.mode === "edit" ? cityForm.city.id : "new-city"}
          countryId={country.id}
          initial={cityForm.mode === "edit" ? cityForm.city : undefined}
          onClose={() => setCityForm(null)}
          onSaved={() => {
            setCityForm(null);
            router.refresh();
          }}
        />
      )}

      {universityForm && (
        <UniversityForm
          key={
            universityForm.mode === "edit"
              ? universityForm.university.id
              : "new-university"
          }
          countryId={country.id}
          cities={cities}
          initial={
            universityForm.mode === "edit"
              ? universityForm.university
              : undefined
          }
          onClose={() => setUniversityForm(null)}
          onSaved={() => {
            setUniversityForm(null);
            router.refresh();
          }}
        />
      )}

      {deletingCountry && (
        <ConfirmDeleteDialog
          open
          onClose={() => setDeletingCountry(false)}
          title={`Delete ${country.name}?`}
          description={
            <>
              This will permanently delete <strong>{country.name}</strong>,{" "}
              {cities.length} cities and {universities.length} universities
              linked to it. The server must confirm the write before the page
              updates.
            </>
          }
          onConfirm={deleteCountry}
        />
      )}

      {deletingCity && (
        <ConfirmDeleteDialog
          open
          onClose={() => setDeletingCity(null)}
          title={`Delete ${deletingCity.name}?`}
          description={
            <>
              This will permanently delete the city record for{" "}
              <strong>{deletingCity.name}</strong>. No university is currently
              linked to it.
            </>
          }
          onConfirm={deleteCity}
        />
      )}

      {deletingUniversity && (
        <ConfirmDeleteDialog
          open
          onClose={() => setDeletingUniversity(null)}
          title={`Delete ${deletingUniversity.name}?`}
          description={
            <>
              This will permanently delete the university record for{" "}
              <strong>{deletingUniversity.name}</strong>. The country and city
              records will stay in place.
            </>
          }
          onConfirm={deleteUniversity}
        />
      )}
    </div>
  );
}

export function CountryDetailView({
  country,
  cities,
  universities,
  editConfigured,
}: {
  country: Country;
  cities: City[];
  universities: University[];
  editConfigured: boolean;
}) {
  return (
    <EditAccessProvider configured={editConfigured}>
      <CountryDetailContent
        country={country}
        cities={cities}
        universities={universities}
      />
    </EditAccessProvider>
  );
}
