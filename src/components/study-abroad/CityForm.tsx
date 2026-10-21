"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import {
  LOCATION_TYPES,
  type City,
  type CityInput,
  type SourceLink,
} from "@/lib/study-abroad/types";
import { ApiError, isVerificationError, requestJson } from "@/lib/study-abroad/client";
import { useEditAccess } from "@/components/study-abroad/EditAccess";
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

export function CityForm({
  countryId,
  initial,
  onClose,
  onSaved,
}: {
  countryId: string;
  initial?: City;
  onClose: () => void;
  onSaved: (city: City) => void;
}) {
  const { grant, clearGrant } = useEditAccess();
  const [sources, setSources] = useState<SourceLink[]>(initial?.sources ?? []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const editing = Boolean(initial);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!grant) {
      setError("Verify the access code before saving.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const body: CityInput = {
      name: String(data.get("name") ?? ""),
      locationType: String(
        data.get("locationType") ?? "Medium-sized city"
      ) as CityInput["locationType"],
      summary: String(data.get("summary") ?? ""),
      campusAreas: String(data.get("campusAreas") ?? ""),
      nearbyCities: String(data.get("nearbyCities") ?? ""),
      nearestAirport: String(data.get("nearestAirport") ?? ""),
      publicTransport: String(data.get("publicTransport") ?? ""),
      busTrainMetro: String(data.get("busTrainMetro") ?? ""),
      nearestStation: String(data.get("nearestStation") ?? ""),
      monthlyRent: String(data.get("monthlyRent") ?? ""),
      foodCost: String(data.get("foodCost") ?? ""),
      transportCost: String(data.get("transportCost") ?? ""),
      facilities: String(data.get("facilities") ?? ""),
      studentLifestyle: String(data.get("studentLifestyle") ?? ""),
      sources: sources.filter((item) => item.label.trim() && item.url.trim()),
      markVerified: data.get("markVerified") === "on",
    };

    setSubmitting(true);
    setError("");
    setFieldErrors({});

    try {
      const result = await requestJson<{ success: true; city: City }>(
        editing
          ? `/api/study-abroad/cities/${initial?.id}`
          : `/api/study-abroad/countries/${countryId}/cities`,
        {
          method: editing ? "PATCH" : "POST",
          body,
          csrfToken: grant.csrfToken,
        }
      );
      clearGrant();
      onSaved(result.city);
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
        setFieldErrors(caught.fieldErrors ?? {});
        if (isVerificationError(caught)) clearGrant();
      } else {
        setError("The city could not be saved. Check the form and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={editing ? `Edit ${initial?.name}` : "Add a city or town"}
      description="Location research makes the rest of the hub useful. Capture the campus area, transport, nearby cities and the costs you still need to verify."
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
            <SubmitButton form="city-form" loading={submitting} disabled={!grant}>
              <Save className="h-4 w-4" />
              {editing ? "Save city" : "Add city"}
            </SubmitButton>
          </div>
        </div>
      }
    >
      <form id="city-form" onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Notice tone="error" title="Could not save the city">
            {error}
          </Notice>
        )}

        <FormSection
          title="City basics"
          description="Use the location type and a short summary to help compare a major city with a smaller university town."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="City or town name" htmlFor="city-name" required error={fieldErrors.name}>
              <TextInput
                id="city-name"
                name="name"
                defaultValue={initial?.name ?? ""}
                required
                minLength={2}
                maxLength={100}
                placeholder="e.g. Utrecht"
              />
            </Field>
            <Field label="Location type" htmlFor="city-location-type" required error={fieldErrors.locationType}>
              <Select
                id="city-location-type"
                name="locationType"
                defaultValue={initial?.locationType ?? "Medium-sized city"}
                required
              >
                {LOCATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Summary"
              htmlFor="city-summary"
              required
              error={fieldErrors.summary}
              className="sm:col-span-2"
            >
              <TextArea
                id="city-summary"
                name="summary"
                defaultValue={initial?.summary ?? ""}
                required
                minLength={10}
                maxLength={600}
                placeholder="What is the city like for a student?"
              />
            </Field>
            <Field
              label="Campus areas"
              htmlFor="city-campus-areas"
              hint="Where are the main universities or campuses located?"
              className="sm:col-span-2"
            >
              <TextArea
                id="city-campus-areas"
                name="campusAreas"
                defaultValue={initial?.campusAreas ?? ""}
                maxLength={600}
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title="Getting around and nearby places"
          description="Approximate distances are enough here; label them as approximate."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nearby major cities" htmlFor="city-nearby">
              <TextArea
                id="city-nearby"
                name="nearbyCities"
                defaultValue={initial?.nearbyCities ?? ""}
                maxLength={300}
                placeholder="Oxford (~90 km); Cambridge (~95 km)"
              />
            </Field>
            <Field label="Nearest airport" htmlFor="city-airport">
              <TextArea
                id="city-airport"
                name="nearestAirport"
                defaultValue={initial?.nearestAirport ?? ""}
                maxLength={300}
                placeholder="Airport name and code"
              />
            </Field>
            <Field label="Public transport" htmlFor="city-public-transport">
              <TextArea
                id="city-public-transport"
                name="publicTransport"
                defaultValue={initial?.publicTransport ?? ""}
                maxLength={600}
                placeholder="Bus, train, metro, tram or ferry options"
              />
            </Field>
            <Field label="Bus / train / metro details" htmlFor="city-transit-details">
              <TextArea
                id="city-transit-details"
                name="busTrainMetro"
                defaultValue={initial?.busTrainMetro ?? ""}
                maxLength={600}
              />
            </Field>
            <Field label="Nearest station" htmlFor="city-nearest-station" className="sm:col-span-2">
              <TextInput
                id="city-nearest-station"
                name="nearestStation"
                defaultValue={initial?.nearestStation ?? ""}
                maxLength={400}
                placeholder="Station name(s) useful for the campus"
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title="Costs and student life"
          description="Add estimates only after checking a current source. If a number is not verified, write “Check official website” and add the source link below."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Estimated rent" htmlFor="city-rent">
              <TextArea
                id="city-rent"
                name="monthlyRent"
                defaultValue={initial?.monthlyRent ?? ""}
                maxLength={500}
                placeholder="Range, period and source"
              />
            </Field>
            <Field label="Food costs" htmlFor="city-food">
              <TextArea
                id="city-food"
                name="foodCost"
                defaultValue={initial?.foodCost ?? ""}
                maxLength={500}
              />
            </Field>
            <Field label="Transport costs" htmlFor="city-transport-cost">
              <TextArea
                id="city-transport-cost"
                name="transportCost"
                defaultValue={initial?.transportCost ?? ""}
                maxLength={500}
              />
            </Field>
            <Field label="Facilities" htmlFor="city-facilities" className="sm:col-span-2">
              <TextArea
                id="city-facilities"
                name="facilities"
                defaultValue={initial?.facilities ?? ""}
                maxLength={800}
                placeholder="Hospitals, groceries, pharmacies, banks, libraries"
              />
            </Field>
            <Field label="Student lifestyle" htmlFor="city-lifestyle">
              <TextArea
                id="city-lifestyle"
                name="studentLifestyle"
                defaultValue={initial?.studentLifestyle ?? ""}
                maxLength={800}
              />
            </Field>
          </div>

          <label className="inline-flex items-start gap-2 text-xs text-secondary">
            <input
              type="checkbox"
              name="markVerified"
              defaultChecked={Boolean(initial?.lastVerifiedAt)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-accent"
            />
            <span>
              I checked the city information against the official sources
              below.
            </span>
          </label>
        </FormSection>

        <FormSection
          title="Official sources"
          description="City transit, airport, university cost and local authority pages."
        >
          <SourceEditor sources={sources} onChange={setSources} />
        </FormSection>
      </form>
    </Modal>
  );
}
