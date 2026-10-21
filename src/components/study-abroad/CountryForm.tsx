"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import {
  COUNTRY_INFO_DEFINITIONS,
  REGIONS,
  type Country,
  type CountryInput,
  type SourceLink,
} from "@/lib/study-abroad/types";
import { ApiError, isVerificationError, requestJson } from "@/lib/study-abroad/client";
import { useEditAccess } from "@/components/study-abroad/EditAccess";
import {
  ExternalSourceLink,
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

export function CountryForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Country;
  onClose: () => void;
  onSaved: (country: Country) => void;
}) {
  const { grant, clearGrant } = useEditAccess();
  const [sources, setSources] = useState<SourceLink[]>(initial?.sources ?? []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const editing = Boolean(initial);

  const infoValue = (key: string) =>
    initial?.info.find((item) => item.key === key);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!grant) {
      setError("Verify the access code before saving.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const body: CountryInput = {
      name: String(data.get("name") ?? ""),
      flag: String(data.get("flag") ?? ""),
      region: String(data.get("region") ?? "Other") as CountryInput["region"],
      overview: String(data.get("overview") ?? ""),
      locationSummary: String(data.get("locationSummary") ?? ""),
      info: COUNTRY_INFO_DEFINITIONS.map((definition) => ({
        key: definition.key,
        summary: String(
          data.get(`info.${definition.key}.summary`) ?? ""
        ),
        verified: data.get(`info.${definition.key}.verified`) === "on",
        sourceLabel: String(
          data.get(`info.${definition.key}.sourceLabel`) ?? ""
        ),
        sourceUrl: String(
          data.get(`info.${definition.key}.sourceUrl`) ?? ""
        ),
      })),
      sources: sources.filter((item) => item.label.trim() && item.url.trim()),
    };

    setSubmitting(true);
    setError("");
    setFieldErrors({});

    try {
      const result = await requestJson<{ success: true; country: Country }>(
        editing
          ? `/api/study-abroad/countries/${initial?.id}`
          : "/api/study-abroad/countries",
        {
          method: editing ? "PATCH" : "POST",
          body,
          csrfToken: grant.csrfToken,
        }
      );
      clearGrant();
      onSaved(result.country);
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
        setFieldErrors(caught.fieldErrors ?? {});
        if (isVerificationError(caught)) clearGrant();
      } else {
        setError("The country could not be saved. Check the form and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={editing ? `Edit ${initial?.name}` : "Add a country"}
      description="Save the country overview and the official-source details you want to track. Fields left as “Check official website” stay clearly marked as unverified."
      size="lg"
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
                })}. The code is never stored in the browser.`
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
              form="country-form"
              loading={submitting}
              disabled={!grant}
            >
              <Save className="h-4 w-4" />
              {editing ? "Save country" : "Add country"}
            </SubmitButton>
          </div>
        </div>
      }
    >
      <form id="country-form" onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Notice tone="error" title="Could not save the country">
            {error}
          </Notice>
        )}

        <FormSection
          title="Country basics"
          description="These details appear on the country card and at the top of the country page."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Country name"
              htmlFor="country-name"
              required
              error={fieldErrors.name}
            >
              <TextInput
                id="country-name"
                name="name"
                defaultValue={initial?.name ?? ""}
                required
                minLength={2}
                maxLength={80}
                placeholder="e.g. Denmark"
              />
            </Field>
            <Field
              label="Flag emoji"
              htmlFor="country-flag"
              hint="Optional. A flag emoji or a short symbol."
              error={fieldErrors.flag}
            >
              <TextInput
                id="country-flag"
                name="flag"
                defaultValue={initial?.flag ?? "🌍"}
                maxLength={8}
                placeholder="🇩🇰"
              />
            </Field>
            <Field
              label="Region"
              htmlFor="country-region"
              required
              error={fieldErrors.region}
            >
              <Select
                id="country-region"
                name="region"
                defaultValue={initial?.region ?? "Europe"}
                required
              >
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Location summary"
              htmlFor="country-location-summary"
              required
              error={fieldErrors.locationSummary}
              hint="A short geography/city summary for the country card."
            >
              <TextInput
                id="country-location-summary"
                name="locationSummary"
                defaultValue={initial?.locationSummary ?? ""}
                required
                minLength={5}
                maxLength={600}
                placeholder="Major student hubs and how they differ."
              />
            </Field>
            <Field
              label="Concise overview"
              htmlFor="country-overview"
              required
              error={fieldErrors.overview}
              className="sm:col-span-2"
            >
              <TextArea
                id="country-overview"
                name="overview"
                defaultValue={initial?.overview ?? ""}
                required
                minLength={10}
                maxLength={1200}
                placeholder="What should a student know before researching this destination?"
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title="Visa, money and student life"
          description="Keep each section short. Add an official source before marking an item verified. If you have not checked a fact, leave it unverified and the page will show “Check official website.”"
        >
          <div className="space-y-3">
            {COUNTRY_INFO_DEFINITIONS.map((definition) => {
              const current = infoValue(definition.key);
              return (
                <details
                  key={definition.key}
                  className="group rounded-xl border border-border bg-background"
                  open={Boolean(current?.summary || current?.source)}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                    <span>{definition.label}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
                      {current?.summary ? "Started" : "Needs research"}
                    </span>
                  </summary>
                  <div className="space-y-3 border-t border-border px-4 py-4">
                    <Field
                      label="Summary"
                      htmlFor={`info-${definition.key}-summary`}
                      hint={definition.hint}
                      error={fieldErrors[`info.${definition.key}.summary`]}
                    >
                      <TextArea
                        id={`info-${definition.key}-summary`}
                        name={`info.${definition.key}.summary`}
                        defaultValue={current?.summary ?? ""}
                        maxLength={2200}
                        placeholder="Write a concise, factual summary. Leave blank if not checked."
                      />
                    </Field>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field
                        label="Source label"
                        htmlFor={`info-${definition.key}-source-label`}
                      >
                        <TextInput
                          id={`info-${definition.key}-source-label`}
                          name={`info.${definition.key}.sourceLabel`}
                          defaultValue={current?.source?.label ?? ""}
                          maxLength={100}
                          placeholder="Official visa page"
                        />
                      </Field>
                      <Field
                        label="Official source URL"
                        htmlFor={`info-${definition.key}-source-url`}
                        error={fieldErrors[`info.${definition.key}.sourceUrl`]}
                      >
                        <TextInput
                          id={`info-${definition.key}-source-url`}
                          name={`info.${definition.key}.sourceUrl`}
                          type="url"
                          defaultValue={current?.source?.url ?? ""}
                          maxLength={500}
                          placeholder="https://..."
                        />
                      </Field>
                    </div>
                    <label className="inline-flex items-start gap-2 text-xs text-secondary">
                      <input
                        type="checkbox"
                        name={`info.${definition.key}.verified`}
                        defaultChecked={current?.verified ?? false}
                        className="mt-0.5 h-4 w-4 rounded border-border accent-accent"
                      />
                      <span>
                        I checked this item against the linked official source.
                        Only tick this when the source supports the summary.
                      </span>
                    </label>
                    {current?.source && (
                      <ExternalSourceLink source={current.source} />
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </FormSection>

        <FormSection
          title="Additional official sources"
          description="Useful embassy, immigration, scholarship or cost pages that do not fit a single section."
        >
          <SourceEditor sources={sources} onChange={setSources} />
        </FormSection>
      </form>
    </Modal>
  );
}
