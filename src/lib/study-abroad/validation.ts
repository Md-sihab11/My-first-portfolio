import {
  COUNTRY_INFO_DEFINITIONS,
  CAMPUS_SETTINGS,
  LOCATION_TYPES,
  REGIONS,
  type CampusSetting,
  type CityInput,
  type CountryInfoKey,
  type CountryInput,
  type LocationType,
  type Region,
  type SourceLink,
  type UniversityInput,
} from "@/lib/study-abroad/types";

export class ValidationError extends Error {
  fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError("The request body must be a JSON object.");
  }
  return value as Record<string, unknown>;
}

function fail(field: string, message: string): never {
  throw new ValidationError(message, { [field]: message });
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function requiredText(
  value: unknown,
  field: string,
  label: string,
  minLength: number,
  maxLength: number
): string {
  const text = cleanText(value, maxLength);
  if (text.length < minLength) {
    fail(
      field,
      `${label} must be at least ${minLength} character${minLength === 1 ? "" : "s"}.`
    );
  }
  return text;
}

function optionalText(value: unknown, maxLength: number): string {
  return cleanText(value, maxLength);
}

function oneOf<T extends string>(
  value: unknown,
  field: string,
  label: string,
  allowed: readonly T[]
): T {
  if (typeof value !== "string" || !(allowed as readonly string[]).includes(value)) {
    fail(field, `${label} is not valid.`);
  }
  return value as T;
}

function asBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "on";
}

export function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "item";
}

function normalizeUrl(
  value: unknown,
  field: string,
  label: string,
  options: { required?: boolean; allowRelative?: boolean } = {}
): string {
  const text = cleanText(value, 500);
  if (!text) {
    if (options.required) {
      fail(field, `${label} is required.`);
    }
    return "";
  }

  if (options.allowRelative && text.startsWith("/") && !text.startsWith("//")) {
    return text;
  }

  let parsed: URL;
  try {
    parsed = new URL(text);
  } catch {
    fail(field, `${label} must be a valid URL.`);
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    fail(field, `${label} must start with https:// or http://.`);
  }

  return parsed.toString();
}

function normalizeEmailOrUrl(
  value: unknown,
  field: string,
  label: string,
  options: { required?: boolean } = {}
): string {
  const text = cleanText(value, 500);
  if (!text) {
    if (options.required) {
      fail(field, `${label} is required.`);
    }
    return "";
  }

  if (text.includes("@") && !text.includes("://")) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      fail(field, `${label} must be a valid email address or URL.`);
    }
    return text;
  }

  return normalizeUrl(text, field, label, { required: options.required });
}

function parseSources(value: unknown, fieldPrefix: string): SourceLink[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    fail(fieldPrefix, "Sources must be a list.");
  }

  const seen = new Set<string>();
  const sources: SourceLink[] = [];

  value.slice(0, 12).forEach((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(`${fieldPrefix}.${index}`, "Each source must have a label and URL.");
    }
    const record = item as Record<string, unknown>;
    const label = cleanText(record.label, 100);
    const url = normalizeUrl(
      record.url,
      `${fieldPrefix}.${index}.url`,
      "Source URL",
      { required: true }
    );

    if (!label) {
      fail(`${fieldPrefix}.${index}.label`, "Source label is required.");
    }
    if (seen.has(url)) return;
    seen.add(url);
    sources.push({ label, url });
  });

  return sources;
}

function parseList(
  value: unknown,
  field: string,
  label: string,
  maxItems = 30
): string[] {
  let items: unknown[] = [];
  if (Array.isArray(value)) {
    items = value;
  } else if (typeof value === "string") {
    items = value.split(/\r?\n|,/);
  } else if (value === undefined || value === null) {
    return [];
  } else {
    fail(field, `${label} must be a list.`);
  }

  const result: string[] = [];
  for (const item of items.slice(0, maxItems)) {
    if (typeof item !== "string") continue;
    const cleaned = cleanText(item, 180);
    if (cleaned && !result.includes(cleaned)) {
      result.push(cleaned);
    }
  }

  return result;
}

function parseCountryInfo(value: unknown): CountryInput["info"] {
  const inputs = new Map<string, Record<string, unknown>>();
  if (Array.isArray(value)) {
    for (const item of value) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const record = item as Record<string, unknown>;
      const key = record.key;
      if (typeof key === "string") {
        inputs.set(key, record);
      }
    }
  }

  return COUNTRY_INFO_DEFINITIONS.map((definition) => {
    const record = inputs.get(definition.key);
    const summary = cleanText(record?.summary, 2200);
    const verified = asBoolean(record?.verified);
    const sourceLabel = cleanText(record?.sourceLabel, 100);
    const sourceUrl = normalizeUrl(
      record?.sourceUrl,
      `info.${definition.key}.sourceUrl`,
      "Source URL"
    );

    if (verified && !sourceUrl) {
      fail(
        `info.${definition.key}.sourceUrl`,
        "Add an official source before marking this item as verified."
      );
    }

    return {
      key: definition.key as CountryInfoKey,
      summary,
      verified,
      sourceLabel,
      sourceUrl,
    };
  });
}

export function parseCountryInput(body: unknown): CountryInput {
  const data = asRecord(body);
  const name = requiredText(data.name, "name", "Country name", 2, 80);
  const flag = cleanText(data.flag, 8) || "🌍";
  const region = oneOf<Region>(data.region, "region", "Region", REGIONS);
  const overview = requiredText(
    data.overview,
    "overview",
    "Overview",
    10,
    1200
  );
  const locationSummary = requiredText(
    data.locationSummary,
    "locationSummary",
    "Location summary",
    5,
    600
  );

  return {
    name,
    flag,
    region,
    overview,
    locationSummary,
    info: parseCountryInfo(data.info),
    sources: parseSources(data.sources, "sources"),
  };
}

export function parseCityInput(body: unknown): CityInput {
  const data = asRecord(body);
  const sources = parseSources(data.sources, "sources");
  const markVerified = asBoolean(data.markVerified);

  if (markVerified && sources.length === 0) {
    fail(
      "markVerified",
      "Add at least one official source before marking this city as verified."
    );
  }

  return {
    name: requiredText(data.name, "name", "City name", 2, 100),
    locationType: oneOf<LocationType>(
      data.locationType,
      "locationType",
      "Location type",
      LOCATION_TYPES
    ),
    summary: requiredText(data.summary, "summary", "Summary", 10, 600),
    campusAreas: optionalText(data.campusAreas, 600),
    nearbyCities: optionalText(data.nearbyCities, 300),
    nearestAirport: optionalText(data.nearestAirport, 300),
    publicTransport: optionalText(data.publicTransport, 600),
    busTrainMetro: optionalText(data.busTrainMetro, 600),
    nearestStation: optionalText(data.nearestStation, 400),
    monthlyRent: optionalText(data.monthlyRent, 500),
    foodCost: optionalText(data.foodCost, 500),
    transportCost: optionalText(data.transportCost, 500),
    facilities: optionalText(data.facilities, 800),
    studentLifestyle: optionalText(data.studentLifestyle, 800),
    sources,
    markVerified,
  };
}

export function parseUniversityInput(body: unknown): UniversityInput {
  const data = asRecord(body);
  const sources = parseSources(data.sources, "sources");
  const markVerified = asBoolean(data.markVerified);

  if (markVerified && sources.length === 0) {
    fail(
      "markVerified",
      "Add at least one official source before marking this university as verified."
    );
  }

  return {
    name: requiredText(data.name, "name", "University name", 2, 140),
    shortName: optionalText(data.shortName, 40),
    logoUrl: normalizeUrl(data.logoUrl, "logoUrl", "Logo URL", {
      allowRelative: true,
    }),
    summary: requiredText(data.summary, "summary", "Summary", 10, 900),
    website: normalizeUrl(data.website, "website", "Official website", {
      required: true,
    }),
    address: requiredText(data.address, "address", "Address", 5, 300),
    region: requiredText(data.region, "region", "Region", 2, 120),
    cityId: requiredText(data.cityId, "cityId", "City", 1, 80),
    campusName: requiredText(
      data.campusName,
      "campusName",
      "Campus name",
      2,
      160
    ),
    campusSetting: oneOf<CampusSetting>(
      data.campusSetting,
      "campusSetting",
      "Campus setting",
      CAMPUS_SETTINGS
    ),
    cityClassification: oneOf<LocationType>(
      data.cityClassification,
      "cityClassification",
      "City classification",
      LOCATION_TYPES
    ),
    nearbyCities: optionalText(data.nearbyCities, 400),
    nearestAirport: optionalText(data.nearestAirport, 400),
    publicTransport: optionalText(data.publicTransport, 700),
    courses: parseList(data.courses, "courses", "Courses"),
    degreeLevels: parseList(
      data.degreeLevels,
      "degreeLevels",
      "Degree levels",
      12
    ),
    admissionRequirements: optionalText(data.admissionRequirements, 1400),
    gpaRequirements: optionalText(data.gpaRequirements, 600),
    englishRequirements: optionalText(data.englishRequirements, 900),
    studyGapPolicy: optionalText(data.studyGapPolicy, 800),
    intakes: optionalText(data.intakes, 400),
    applicationDeadlines: optionalText(data.applicationDeadlines, 800),
    applicationFee: optionalText(data.applicationFee, 400),
    tuitionFees: optionalText(data.tuitionFees, 800),
    courseDuration: optionalText(data.courseDuration, 500),
    requiredDocuments: parseList(
      data.requiredDocuments,
      "requiredDocuments",
      "Required documents",
      40
    ),
    scholarships: optionalText(data.scholarships, 1200),
    applicationPortal: normalizeUrl(
      data.applicationPortal,
      "applicationPortal",
      "Application portal",
      { required: true }
    ),
    admissionsContact: normalizeEmailOrUrl(
      data.admissionsContact,
      "admissionsContact",
      "Admissions contact",
      { required: true }
    ),
    dormitories: optionalText(data.dormitories, 900),
    privateAccommodation: optionalText(data.privateAccommodation, 900),
    estimatedRent: optionalText(data.estimatedRent, 500),
    monthlyLivingCost: optionalText(data.monthlyLivingCost, 500),
    foodCost: optionalText(data.foodCost, 500),
    transportCost: optionalText(data.transportCost, 500),
    essentialFacilities: optionalText(data.essentialFacilities, 900),
    publicTransportAccess: optionalText(data.publicTransportAccess, 900),
    partTimeWork: optionalText(data.partTimeWork, 900),
    studentLife: optionalText(data.studentLife, 1200),
    safety: optionalText(data.safety, 800),
    climate: optionalText(data.climate, 500),
    sources,
    markVerified,
  };
}

export function normalizeName(value: string): string {
  return cleanText(value, 200).toLocaleLowerCase("en-US");
}
