"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Globe2,
  GraduationCap,
  MapPin,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import {
  REGIONS,
  type City,
  type Country,
  type Region,
  type StudyAbroadData,
  type University,
} from "@/lib/study-abroad/types";
import { ApiError, requestJson } from "@/lib/study-abroad/client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  EditAccessProvider,
  useEditAccess,
} from "@/components/study-abroad/EditAccess";
import { CountryForm } from "@/components/study-abroad/CountryForm";
import { ConfirmDeleteDialog } from "@/components/study-abroad/ConfirmDeleteDialog";
import {
  ActionButton,
  Notice,
  UniversityLogo,
} from "@/components/study-abroad/ui";

function StatCard({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/80 px-4 py-3">
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-2xl font-bold tracking-tight text-primary">
          {value}
        </span>
      </div>
      <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-secondary-muted">
        {label}
      </div>
    </div>
  );
}

function CountryCard({
  country,
  cities,
  universities,
  onEdit,
  onDelete,
}: {
  country: Country;
  cities: City[];
  universities: University[];
  onEdit: (country: Country) => void;
  onDelete: (country: Country) => void;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:border-accent/40 hover:shadow-glow">
      <Link
        href={`/study-abroad/${country.slug}`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Open ${country.name} research`}
      />

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-2xl"
              aria-hidden="true"
            >
              {country.flag || "🌍"}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="truncate text-lg font-bold tracking-tight text-primary transition-colors group-hover:text-accent">
                  {country.name}
                </h3>
                {country.sample && (
                  <Badge variant="outline" className="py-0 text-[9px] uppercase">
                    Sample
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 text-[11px] font-mono uppercase tracking-wider text-secondary-muted">
                {country.region}
              </p>
            </div>
          </div>

          <div className="pointer-events-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(country)}
              aria-label={`Edit ${country.name}`}
              title={`Edit ${country.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-secondary transition-colors hover:border-border hover:bg-surface-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(country)}
              aria-label={`Delete ${country.name}`}
              title={`Delete ${country.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-secondary transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-secondary">
          {country.overview}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-semibold text-primary">
            <GraduationCap className="h-3.5 w-3.5 text-accent" />
            {universities.length}{" "}
            {universities.length === 1 ? "university" : "universities"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {cities.length} {cities.length === 1 ? "city" : "cities"}
          </span>
        </div>

        <div className="mt-4 space-y-2 border-t border-border/70 pt-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
            Key locations
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cities.length > 0 ? (
              cities.slice(0, 4).map((city) => (
                <span
                  key={city.id}
                  className="rounded-md border border-border bg-background px-2 py-1 text-[11px] text-secondary"
                >
                  {city.name}
                  <span className="ml-1 text-secondary-muted">
                    · {city.locationType}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-xs italic text-secondary-muted">
                No cities saved yet.
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-secondary">
            {country.locationSummary}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
          <span className="text-xs font-mono text-secondary-muted">
            {universities.length} saved{" "}
            {universities.length === 1 ? "record" : "records"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
            Open country
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

function HubContent({
  data,
  editConfigured,
}: {
  data: StudyAbroadData;
  editConfigured: boolean;
}) {
  const router = useRouter();
  const { authorize, grant, clearGrant } = useEditAccess();
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"All" | Region>("All");
  const [sort, setSort] = useState<"name" | "universities">("name");
  const [countryFormOpen, setCountryFormOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | undefined>();
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);

  const citiesByCountry = useMemo(() => {
    const map = new Map<string, City[]>();
    for (const city of data.cities) {
      const list = map.get(city.countryId) ?? [];
      list.push(city);
      map.set(city.countryId, list);
    }
    return map;
  }, [data.cities]);

  const universitiesByCountry = useMemo(() => {
    const map = new Map<string, University[]>();
    for (const university of data.universities) {
      const list = map.get(university.countryId) ?? [];
      list.push(university);
      map.set(university.countryId, list);
    }
    return map;
  }, [data.universities]);

  const countryById = useMemo(
    () => new Map(data.countries.map((country) => [country.id, country])),
    [data.countries]
  );

  const availableRegions = useMemo(
    () =>
      Array.from(new Set(data.countries.map((country) => country.region))).sort(),
    [data.countries]
  );

  useEffect(() => {
    if (regionFilter !== "All" && !availableRegions.includes(regionFilter)) {
      setRegionFilter("All");
    }
  }, [availableRegions, regionFilter]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredCountries = useMemo(() => {
    const result = data.countries.filter((country) => {
      if (regionFilter !== "All" && country.region !== regionFilter) {
        return false;
      }
      if (!normalizedQuery) return true;

      const cities = citiesByCountry.get(country.id) ?? [];
      const universities = universitiesByCountry.get(country.id) ?? [];
      return [
        country.name,
        country.region,
        country.overview,
        country.locationSummary,
        ...cities.map((city) => city.name),
        ...universities.map((university) => university.name),
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
    });

    return result.sort((a, b) => {
      if (sort === "universities") {
        const difference =
          (universitiesByCountry.get(b.id)?.length ?? 0) -
          (universitiesByCountry.get(a.id)?.length ?? 0);
        if (difference !== 0) return difference;
      }
      return a.name.localeCompare(b.name);
    });
  }, [
    citiesByCountry,
    data.countries,
    normalizedQuery,
    regionFilter,
    sort,
    universitiesByCountry,
  ]);

  const topCountries = useMemo(
    () =>
      [...data.countries]
        .sort((a, b) => {
          const difference =
            (universitiesByCountry.get(b.id)?.length ?? 0) -
            (universitiesByCountry.get(a.id)?.length ?? 0);
          return difference !== 0 ? difference : a.name.localeCompare(b.name);
        })
        .slice(0, 3),
    [data.countries, universitiesByCountry]
  );

  const topUniversities = useMemo(
    () => data.universities.slice(0, 4),
    [data.universities]
  );

  const sampleCount =
    data.countries.filter((country) => country.sample).length +
    data.cities.filter((city) => city.sample).length +
    data.universities.filter((university) => university.sample).length;

  const requestCountryForm = async (country?: Country) => {
    const result = await authorize({
      action: country ? "update" : "create",
      targetType: "country",
      targetId: country?.id ?? "new",
      actionLabel: country ? `Edit ${country.name}` : "Add a new country",
    });
    if (!result) return;
    setEditingCountry(country);
    setCountryFormOpen(true);
  };

  const requestCountryDelete = async (country: Country) => {
    const result = await authorize({
      action: "delete",
      targetType: "country",
      targetId: country.id,
      actionLabel: `Delete ${country.name}`,
    });
    if (!result) return;
    setDeletingCountry(country);
  };

  const handleCountrySaved = (country: Country) => {
    setCountryFormOpen(false);
    setEditingCountry(undefined);
    if (editingCountry) {
      router.refresh();
    } else {
      router.push(`/study-abroad/${country.slug}`);
    }
  };

  const handleCountryDelete = async () => {
    if (!deletingCountry) return;
    if (!grant) {
      throw new Error("Verification expired. Please verify the access code again.");
    }

    try {
      await requestJson(
        `/api/study-abroad/countries/${deletingCountry.id}`,
        {
          method: "DELETE",
          csrfToken: grant.csrfToken,
        }
      );
      clearGrant();
      setDeletingCountry(null);
      router.refresh();
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) {
        clearGrant();
      }
      throw caught;
    }
  };

  const clearFilters = () => {
    setQuery("");
    setRegionFilter("All");
    setSort("name");
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-surface-muted to-surface p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <GraduationCap
          className="pointer-events-none absolute -bottom-12 -right-8 h-52 w-52 text-accent/5"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-subtle px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Personal research workspace
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Study Abroad Research Hub
            </h1>
            <p className="mt-3 text-lg font-medium text-secondary sm:text-xl">
              Explore countries, universities and study opportunities.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">
              A working space for comparing destinations, cities, visa routes and
              universities. Every saved section can point to an official source,
              and anything still unverified is marked for follow-up.
            </p>

            <div className="mt-6 max-w-2xl">
              <label htmlFor="study-abroad-country-search" className="sr-only">
                Search countries, cities or universities
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-muted" />
                <input
                  id="study-abroad-country-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a country, city or university..."
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-primary shadow-sm placeholder:text-secondary-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <p className="mt-2 text-[11px] text-secondary-muted" aria-live="polite">
                {filteredCountries.length} of {data.countries.length} countries
                match your search.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Button onClick={() => requestCountryForm()} size="md">
                Add country
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="#country-research"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Browse countries
              </a>
            </div>
            {!data.countries.length && (
              <p className="mt-3 text-xs text-secondary-muted">
                No countries are saved yet. Add your first destination to begin.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:content-center">
            <StatCard
              value={data.countries.length}
              label="Countries researched"
              icon={<Globe2 className="h-4 w-4" />}
            />
            <StatCard
              value={data.universities.length}
              label="Universities saved"
              icon={<GraduationCap className="h-4 w-4" />}
            />
            <StatCard
              value={data.cities.length}
              label="Cities & towns saved"
              icon={<MapPin className="h-4 w-4" />}
            />
          </div>
        </div>

        <div className="relative mt-7 grid gap-3 border-t border-border/60 pt-5 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              Researched regions
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {availableRegions.length > 0 ? (
                availableRegions.map((region) => (
                  <span
                    key={region}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-secondary"
                  >
                    {region}
                  </span>
                ))
              ) : (
                <span className="text-xs italic text-secondary-muted">
                  Add a country to build your region overview.
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              Official-source approach
            </p>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              Fees, deadlines and visa rules change. Save an official link for
              each fact you rely on, and keep unverified items marked “Needs
              checking.”
            </p>
          </div>
        </div>
      </section>

      {(sampleCount > 0 || !data.countries.length) && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {sampleCount > 0 && (
            <Notice tone="info" title="Starter records are marked Sample">
              {sampleCount} starter records are included to show the structure.
              Edit one to turn it into your own saved research, or delete it and
              add your own.
            </Notice>
          )}
          {!data.countries.length && (
            <Notice tone="info" title="Your country list is empty">
              Use “Add country” to create the first record. The university and
              city totals will update automatically.
            </Notice>
          )}
        </div>
      )}

      {(topCountries.length > 0 || topUniversities.length > 0) && (
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                  Quick access
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-primary">
                  Countries with the most saved universities
                </h2>
              </div>
              <Globe2 className="h-5 w-5 shrink-0 text-secondary-muted" />
            </div>
            <div className="mt-4 space-y-2">
              {topCountries.length > 0 ? (
                topCountries.map((country) => (
                  <Link
                    key={country.id}
                    href={`/study-abroad/${country.slug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-3 transition-colors hover:border-accent/40 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="text-xl" aria-hidden="true">
                        {country.flag || "🌍"}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-primary">
                          {country.name}
                        </span>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
                          {universitiesByCountry.get(country.id)?.length ?? 0}{" "}
                          universities ·{" "}
                          {citiesByCountry.get(country.id)?.length ?? 0} cities
                        </span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                  </Link>
                ))
              ) : (
                <p className="text-xs italic text-secondary-muted">
                  Add a country to see quick links here.
                </p>
              )}
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                  Quick access
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-primary">
                  Universities to review next
                </h2>
              </div>
              <GraduationCap className="h-5 w-5 shrink-0 text-secondary-muted" />
            </div>
            <div className="mt-4 space-y-2">
              {topUniversities.length > 0 ? (
                topUniversities.map((university) => {
                  const country = countryById.get(university.countryId);
                  return (
                    <Link
                      key={university.id}
                      href={`/study-abroad/${country?.slug ?? ""}/${university.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3 transition-colors hover:border-accent/40 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <UniversityLogo
                        name={university.name}
                        shortName={university.shortName}
                        logoUrl={university.logoUrl}
                        size="sm"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-primary">
                          {university.name}
                        </span>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
                          {country?.name ?? "Country"} ·{" "}
                          {university.cityId
                            ? data.cities.find(
                                (city) => city.id === university.cityId
                              )?.name ?? "City"
                            : "City"}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                    </Link>
                  );
                })
              ) : (
                <p className="text-xs italic text-secondary-muted">
                  Add a university to see quick links here.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section id="country-research" className="mt-12 border-t border-border/60 pt-10">
        <SectionHeading
          eyebrow="Country research"
          title="Your destinations"
          description="Open a country to review visa guidance, cities, costs and the universities attached to it."
          className="mb-8"
        />

        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </span>
            <button
              type="button"
              onClick={() => setRegionFilter("All")}
              aria-pressed={regionFilter === "All"}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                regionFilter === "All"
                  ? "border-accent-solid bg-accent-solid font-semibold text-accent-text"
                  : "border-border bg-surface text-secondary hover:bg-surface-muted hover:text-primary"
              )}
            >
              All
            </button>
            {(availableRegions.length > 0 ? availableRegions : REGIONS).map(
              (region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setRegionFilter(region)}
                  aria-pressed={regionFilter === region}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    regionFilter === region
                      ? "border-accent-solid bg-accent-solid font-semibold text-accent-text"
                      : "border-border bg-surface text-secondary hover:bg-surface-muted hover:text-primary"
                  )}
                >
                  {region}
                </button>
              )
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="country-sort" className="sr-only">
              Sort countries
            </label>
            <select
              id="country-sort"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as "name" | "universities")
              }
              className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-primary focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="name">Sort: Name A–Z</option>
              <option value="universities">Sort: Most universities</option>
            </select>
            <Button onClick={() => requestCountryForm()} size="sm">
              Add country
            </Button>
          </div>
        </div>

        {data.countries.length === 0 ? (
          <EmptyState
            icon={<Globe2 className="h-6 w-6" />}
            title="No countries saved yet"
            description="Add your first country to start tracking visa guidance, cities, universities and official sources."
            action={
              <Button onClick={() => requestCountryForm()}>
                Add your first country
              </Button>
            }
          />
        ) : filteredCountries.length === 0 ? (
          <EmptyState
            icon={<Search className="h-6 w-6" />}
            title="No countries match your search"
            description="Try a different country, city or university name, or clear the region filter."
            action={
              <Button variant="outline" onClick={clearFilters}>
                Clear search and filters
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.id}
                country={country}
                cities={citiesByCountry.get(country.id) ?? []}
                universities={universitiesByCountry.get(country.id) ?? []}
                onEdit={requestCountryForm}
                onDelete={requestCountryDelete}
              />
            ))}
          </div>
        )}
      </section>

      {!editConfigured && (
        <div className="mt-8">
          <Notice tone="info" title="Editing is locked until the server is configured">
            Browsing is public. Adding, editing and deleting require a private
            access code configured in the server environment. See{" "}
            <span className="font-mono">STUDY_ABROAD.md</span> for setup. No
            access code is included in the client bundle.
          </Notice>
        </div>
      )}

      {countryFormOpen && (
        <CountryForm
          key={editingCountry?.id ?? "new-country"}
          initial={editingCountry}
          onClose={() => {
            setCountryFormOpen(false);
            setEditingCountry(undefined);
          }}
          onSaved={handleCountrySaved}
        />
      )}

      {deletingCountry && (
        <ConfirmDeleteDialog
          open
          onClose={() => setDeletingCountry(null)}
          title={`Delete ${deletingCountry.name}?`}
          description={
            <>
              This will permanently delete{" "}
              <strong>{deletingCountry.name}</strong>,{" "}
              {citiesByCountry.get(deletingCountry.id)?.length ?? 0} cities and{" "}
              {universitiesByCountry.get(deletingCountry.id)?.length ?? 0}{" "}
              universities linked to it. The database is updated only if the
              server confirms success.
            </>
          }
          onConfirm={handleCountryDelete}
        />
      )}
    </>
  );
}

export function StudyAbroadHub({
  data,
  editConfigured,
}: {
  data: StudyAbroadData;
  editConfigured: boolean;
}) {
  return (
    <EditAccessProvider configured={editConfigured}>
      <HubContent data={data} editConfigured={editConfigured} />
    </EditAccessProvider>
  );
}
