"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import {
  CAMPUS_SETTINGS,
  LOCATION_TYPES,
  UNIVERSITY_ACADEMIC_FIELDS,
  UNIVERSITY_LIFE_FIELDS,
  type City,
  type SourceLink,
  type University,
  type UniversityInput,
} from "@/lib/study-abroad/types";
import { ApiError, isVerificationError, requestJson } from "@/lib/study-abroad/client";
import { useEditAccess } from "@/components/study-abroad/EditAccess";
import { cn } from "@/lib/utils";
import {
  Field,
  FormSection,
  Modal,
  Notice,
  Select,
  SourceEditor,
  SubmitButton,
  TextArea,
  TextInput,
} from "@/components/study-abroad/ui";

const TABS = [
  { id: "basics", label: "Profile & location" },
  { id: "academics", label: "Academics & admission" },
  { id: "life", label: "Accommodation & life" },
  { id: "sources", label: "Sources & verification" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function initialValue(
  university: University | undefined,
  key: string
): string {
  if (!university) return "";
  const value = (university as unknown as Record<string, unknown>)[key];
  if (Array.isArray(value)) return value.join("\n");
  return typeof value === "string" ? value : "";
}

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function UniversityForm({
  countryId,
  cities,
  initial,
  onClose,
  onSaved,
}: {
  countryId: string;
  cities: City[];
  initial?: University;
  onClose: () => void;
  onSaved: (university: University) => void;
}) {
  const { grant, clearGrant } = useEditAccess();
  const [tab, setTab] = useState<TabId>("basics");
  const [sources, setSources] = useState<SourceLink[]>(initial?.sources ?? []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const editing = Boolean(initial);
  const basicsActive = tab === "basics";
  const defaultCity = initial?.cityId ?? cities[0]?.id ?? "";
  const defaultClassification =
    initial?.cityClassification ?? cities[0]?.locationType ?? "Major city";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!grant) {
      setError("Verify the access code before saving.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const body: UniversityInput = {
      name: String(data.get("name") ?? ""),
      shortName: String(data.get("shortName") ?? ""),
      logoUrl: String(data.get("logoUrl") ?? ""),
      summary: String(data.get("summary") ?? ""),
      website: String(data.get("website") ?? ""),
      address: String(data.get("address") ?? ""),
      region: String(data.get("region") ?? ""),
      cityId: String(data.get("cityId") ?? ""),
      campusName: String(data.get("campusName") ?? ""),
      campusSetting: String(
        data.get("campusSetting") ?? "City centre"
      ) as UniversityInput["campusSetting"],
      cityClassification: String(
        data.get("cityClassification") ?? "Major city"
      ) as UniversityInput["cityClassification"],
      nearbyCities: String(data.get("nearbyCities") ?? ""),
      nearestAirport: String(data.get("nearestAirport") ?? ""),
      publicTransport: String(data.get("publicTransport") ?? ""),
      courses: splitLines(data.get("courses")),
      degreeLevels: splitLines(data.get("degreeLevels")),
      admissionRequirements: String(data.get("admissionRequirements") ?? ""),
      gpaRequirements: String(data.get("gpaRequirements") ?? ""),
      englishRequirements: String(data.get("englishRequirements") ?? ""),
      studyGapPolicy: String(data.get("studyGapPolicy") ?? ""),
      intakes: String(data.get("intakes") ?? ""),
      applicationDeadlines: String(data.get("applicationDeadlines") ?? ""),
      applicationFee: String(data.get("applicationFee") ?? ""),
      tuitionFees: String(data.get("tuitionFees") ?? ""),
      courseDuration: String(data.get("courseDuration") ?? ""),
      requiredDocuments: splitLines(data.get("requiredDocuments")),
      scholarships: String(data.get("scholarships") ?? ""),
      applicationPortal: String(data.get("applicationPortal") ?? ""),
      admissionsContact: String(data.get("admissionsContact") ?? ""),
      dormitories: String(data.get("dormitories") ?? ""),
      privateAccommodation: String(data.get("privateAccommodation") ?? ""),
      estimatedRent: String(data.get("estimatedRent") ?? ""),
      monthlyLivingCost: String(data.get("monthlyLivingCost") ?? ""),
      foodCost: String(data.get("foodCost") ?? ""),
      transportCost: String(data.get("transportCost") ?? ""),
      essentialFacilities: String(data.get("essentialFacilities") ?? ""),
      publicTransportAccess: String(data.get("publicTransportAccess") ?? ""),
      partTimeWork: String(data.get("partTimeWork") ?? ""),
      studentLife: String(data.get("studentLife") ?? ""),
      safety: String(data.get("safety") ?? ""),
      climate: String(data.get("climate") ?? ""),
      sources: sources.filter((item) => item.label.trim() && item.url.trim()),
      markVerified: data.get("markVerified") === "on",
    };

    setSubmitting(true);
    setError("");
    setFieldErrors({});

    try {
      const result = await requestJson<{
        success: true;
        university: University;
      }>(
        editing
          ? `/api/study-abroad/universities/${initial?.id}`
          : `/api/study-abroad/countries/${countryId}/universities`,
        {
          method: editing ? "PATCH" : "POST",
          body,
          csrfToken: grant.csrfToken,
        }
      );
      clearGrant();
      onSaved(result.university);
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
        setFieldErrors(caught.fieldErrors ?? {});
        if (isVerificationError(caught)) clearGrant();
      } else {
        setError(
          "The university could not be saved. Check the form and try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={editing ? `Edit ${initial?.name}` : "Add a university"}
      description="Record what you have checked and leave everything else marked for follow-up. Official links are more useful than unsourced numbers."
      size="xl"
      closeOnOverlay={false}
      footer={
        <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[11px] text-secondary-muted">
            {grant
              ? `Verified session expires at ${new Date(
                  grant.expiresAt
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}.`
              : "Verification is required before saving."}
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-secondary-muted disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Cancel
            </button>
            <SubmitButton
              form="university-form"
              loading={submitting}
              disabled={!grant}
            >
              <Save className="h-4 w-4" />
              {editing ? "Save university" : "Add university"}
            </SubmitButton>
          </div>
        </div>
      }
    >
      <form id="university-form" onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Notice tone="error" title="Could not save the university">
            {error}
          </Notice>
        )}

        <div
          role="tablist"
          aria-label="University form sections"
          className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-surface-muted/60 p-1.5"
        >
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-[11px] font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                tab === item.id
                  ? "bg-surface text-accent font-semibold shadow-sm"
                  : "text-secondary hover:text-primary"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={tab === "basics" ? "space-y-5" : "hidden"}>
          <FormSection
            title="University profile"
            description="The official website and full address are required. The card uses a logo when available and falls back to initials."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="University name" htmlFor="university-name" required error={fieldErrors.name}>
                <TextInput
                  id="university-name"
                  name="name"
                  defaultValue={initial?.name ?? ""}
                  required={basicsActive}
                  minLength={2}
                  maxLength={140}
                />
              </Field>
              <Field label="Short name" htmlFor="university-short-name" hint="Used for the logo fallback and compact labels.">
                <TextInput
                  id="university-short-name"
                  name="shortName"
                  defaultValue={initial?.shortName ?? ""}
                  maxLength={40}
                />
              </Field>
              <Field label="Logo URL" htmlFor="university-logo" hint="Optional https:// image URL or a path beginning with /." className="sm:col-span-2">
                <TextInput
                  id="university-logo"
                  name="logoUrl"
                  defaultValue={initial?.logoUrl ?? ""}
                  maxLength={500}
                  placeholder="https://... or /images/..."
                />
              </Field>
              <Field label="Official website" htmlFor="university-website" required error={fieldErrors.website} className="sm:col-span-2">
                <TextInput
                  id="university-website"
                  name="website"
                  type="url"
                  defaultValue={initial?.website ?? ""}
                  required={basicsActive}
                  maxLength={500}
                  placeholder="https://www.university.edu"
                />
              </Field>
              <Field label="Summary" htmlFor="university-summary" required error={fieldErrors.summary} className="sm:col-span-2">
                <TextArea
                  id="university-summary"
                  name="summary"
                  defaultValue={initial?.summary ?? ""}
                  required={basicsActive}
                  minLength={10}
                  maxLength={900}
                />
              </Field>
              <Field label="Full address" htmlFor="university-address" required error={fieldErrors.address} className="sm:col-span-2">
                <TextInput
                  id="university-address"
                  name="address"
                  defaultValue={initial?.address ?? ""}
                  required={basicsActive}
                  minLength={5}
                  maxLength={300}
                />
              </Field>
              <Field label="Region / state" htmlFor="university-region" required error={fieldErrors.region}>
                <TextInput
                  id="university-region"
                  name="region"
                  defaultValue={initial?.region ?? ""}
                  required={basicsActive}
                  minLength={2}
                  maxLength={120}
                />
              </Field>
              <Field label="City" htmlFor="university-city" required error={fieldErrors.cityId}>
                <Select
                  id="university-city"
                  name="cityId"
                  defaultValue={defaultCity}
                  required={basicsActive}
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name} — {city.locationType}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </FormSection>

          <FormSection
            title="Campus and location"
            description="Help a student understand whether the campus is central, suburban or rural, and how to reach it."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Campus name" htmlFor="university-campus-name" required error={fieldErrors.campusName}>
                <TextInput
                  id="university-campus-name"
                  name="campusName"
                  defaultValue={initial?.campusName ?? ""}
                  required={basicsActive}
                  minLength={2}
                  maxLength={160}
                />
              </Field>
              <Field label="Campus setting" htmlFor="university-campus-setting" required>
                <Select
                  id="university-campus-setting"
                  name="campusSetting"
                  defaultValue={initial?.campusSetting ?? "City centre"}
                  required={basicsActive}
                >
                  {CAMPUS_SETTINGS.map((setting) => (
                    <option key={setting} value={setting}>
                      {setting}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="City classification" htmlFor="university-city-classification" required>
                <Select
                  id="university-city-classification"
                  name="cityClassification"
                  defaultValue={defaultClassification}
                  required={basicsActive}
                >
                  {LOCATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Nearby major cities" htmlFor="university-nearby">
                <TextArea
                  id="university-nearby"
                  name="nearbyCities"
                  defaultValue={initial?.nearbyCities ?? ""}
                  maxLength={400}
                  placeholder="City (~distance in km)"
                />
              </Field>
              <Field label="Nearest airport" htmlFor="university-airport">
                <TextArea
                  id="university-airport"
                  name="nearestAirport"
                  defaultValue={initial?.nearestAirport ?? ""}
                  maxLength={400}
                />
              </Field>
              <Field label="Public transport" htmlFor="university-public-transport">
                <TextArea
                  id="university-public-transport"
                  name="publicTransport"
                  defaultValue={initial?.publicTransport ?? ""}
                  maxLength={700}
                />
              </Field>
            </div>
          </FormSection>
        </div>

        <div className={tab === "academics" ? "space-y-5" : "hidden"}>
          <FormSection
            title="Academic and admission information"
            description="Use one line per item for courses and required documents. If a requirement is not officially documented, write “Check official website.”"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {UNIVERSITY_ACADEMIC_FIELDS.map((field) => {
                const isList = "list" in field && field.list;
                return (
                <Field
                  key={field.key}
                  label={field.label}
                  htmlFor={`university-${field.key}`}
                  hint={isList ? "One item per line." : undefined}
                  className={field.wide ? "sm:col-span-2" : undefined}
                >
                  {isList || field.wide ? (
                    <TextArea
                      id={`university-${field.key}`}
                      name={field.key}
                      defaultValue={initialValue(initial, field.key)}
                      maxLength={isList ? 4000 : 1600}
                      placeholder={
                        field.key === "applicationPortal"
                          ? "https://..."
                          : isList
                            ? "One item per line"
                            : undefined
                      }
                    />
                  ) : (
                    <TextInput
                      id={`university-${field.key}`}
                      name={field.key}
                      defaultValue={initialValue(initial, field.key)}
                      maxLength={800}
                      placeholder={
                        field.key === "admissionsContact"
                          ? "admissions@university.edu or https://..."
                          : undefined
                      }
                    />
                  )}
                </Field>
                );
              })}
            </div>
          </FormSection>
        </div>

        <div className={tab === "life" ? "space-y-5" : "hidden"}>
          <FormSection
            title="Accommodation, costs and student life"
            description="Add estimates only after checking a current official source. Keep the source list below up to date."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {UNIVERSITY_LIFE_FIELDS.map((field) => (
                <Field
                  key={field.key}
                  label={field.label}
                  htmlFor={`university-${field.key}`}
                  className={field.wide ? "sm:col-span-2" : undefined}
                >
                  <TextArea
                    id={`university-${field.key}`}
                    name={field.key}
                    defaultValue={initialValue(initial, field.key)}
                    maxLength={1200}
                  />
                </Field>
              ))}
            </div>
          </FormSection>
        </div>

        <div className={tab === "sources" ? "space-y-5" : "hidden"}>
          <FormSection
            title="Official links and verification"
            description="Add the university admissions page, international office, housing page, application portal and any official cost page."
          >
            <SourceEditor sources={sources} onChange={setSources} />
            <label className="mt-4 inline-flex items-start gap-2 text-xs text-secondary">
              <input
                type="checkbox"
                name="markVerified"
                defaultChecked={Boolean(initial?.lastVerifiedAt)}
                className="mt-0.5 h-4 w-4 rounded border-border accent-accent"
              />
              <span>
                I have checked this university profile against the official
                sources above. Leave this unticked if anything still needs
                checking.
              </span>
            </label>
          </FormSection>
        </div>
      </form>
    </Modal>
  );
}
