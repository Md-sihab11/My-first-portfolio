export type ProtectedAction = "create" | "update" | "delete";
export type TargetType = "country" | "city" | "university";

export const REGIONS = [
  "North America",
  "Europe",
  "Oceania",
  "Asia",
  "Africa",
  "South America",
  "Other",
] as const;

export type Region = (typeof REGIONS)[number];

export const LOCATION_TYPES = [
  "Major city",
  "Medium-sized city",
  "Small town",
  "Rural area",
] as const;

export type LocationType = (typeof LOCATION_TYPES)[number];

export const CAMPUS_SETTINGS = [
  "City centre",
  "Suburb",
  "Outskirts",
  "Rural setting",
] as const;

export type CampusSetting = (typeof CAMPUS_SETTINGS)[number];

export interface SourceLink {
  label: string;
  url: string;
}

export const COUNTRY_INFO_DEFINITIONS = [
  {
    key: "embassy",
    label: "Embassy & visa application centres",
    hint: "Embassy, high commission and visa application centres relevant to applicants in Bangladesh.",
  },
  {
    key: "intakes",
    label: "University intakes & deadlines",
    hint: "Main intakes and the application deadlines students should plan around.",
  },
  {
    key: "visa-process",
    label: "Visa process & processing time",
    hint: "The official application route and where current processing times are published.",
  },
  {
    key: "documents",
    label: "Required documents",
    hint: "The document checklist for the student visa route.",
  },
  {
    key: "fees",
    label: "Visa & service fees",
    hint: "Government visa fees plus any visa-centre service fees.",
  },
  {
    key: "funds",
    label: "Financial requirements & proof of funds",
    hint: "How much evidence is needed and which official page confirms it.",
  },
  {
    key: "insurance",
    label: "Health insurance",
    hint: "What cover is required and where it can be arranged.",
  },
  {
    key: "living-costs",
    label: "Living costs & monthly budget",
    hint: "Typical cost categories and the official cost guidance to check.",
  },
  {
    key: "scholarships",
    label: "Scholarships & funding",
    hint: "The main official scholarship routes and funding pages.",
  },
  {
    key: "work",
    label: "Part-time work & post-study options",
    hint: "Work conditions during study and post-study routes.",
  },
] as const;

export type CountryInfoKey = (typeof COUNTRY_INFO_DEFINITIONS)[number]["key"];

export interface CountryInfoItem {
  key: CountryInfoKey;
  summary: string;
  verified: boolean;
  source?: SourceLink;
}

export interface Country {
  id: string;
  slug: string;
  name: string;
  flag: string;
  region: Region;
  overview: string;
  locationSummary: string;
  info: CountryInfoItem[];
  sources: SourceLink[];
  sample: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  countryId: string;
  name: string;
  locationType: LocationType;
  summary: string;
  campusAreas: string;
  nearbyCities: string;
  nearestAirport: string;
  publicTransport: string;
  busTrainMetro: string;
  nearestStation: string;
  monthlyRent: string;
  foodCost: string;
  transportCost: string;
  facilities: string;
  studentLifestyle: string;
  sources: SourceLink[];
  lastVerifiedAt?: string;
  sample: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface University {
  id: string;
  countryId: string;
  cityId: string;
  slug: string;
  name: string;
  shortName: string;
  logoUrl: string;
  summary: string;
  website: string;
  address: string;
  region: string;
  campusName: string;
  campusSetting: CampusSetting;
  cityClassification: LocationType;
  nearbyCities: string;
  nearestAirport: string;
  publicTransport: string;

  courses: string[];
  degreeLevels: string[];
  admissionRequirements: string;
  gpaRequirements: string;
  englishRequirements: string;
  studyGapPolicy: string;
  intakes: string;
  applicationDeadlines: string;
  applicationFee: string;
  tuitionFees: string;
  courseDuration: string;
  requiredDocuments: string[];
  scholarships: string;
  applicationPortal: string;
  admissionsContact: string;

  dormitories: string;
  privateAccommodation: string;
  estimatedRent: string;
  monthlyLivingCost: string;
  foodCost: string;
  transportCost: string;
  essentialFacilities: string;
  publicTransportAccess: string;
  partTimeWork: string;
  studentLife: string;
  safety: string;
  climate: string;

  sources: SourceLink[];
  lastVerifiedAt?: string;
  sample: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudyAbroadData {
  version: 1;
  countries: Country[];
  cities: City[];
  universities: University[];
}

export interface CountryInput {
  name: string;
  flag: string;
  region: Region;
  overview: string;
  locationSummary: string;
  info: Array<{
    key: CountryInfoKey;
    summary: string;
    verified: boolean;
    sourceLabel?: string;
    sourceUrl?: string;
  }>;
  sources: SourceLink[];
}

export interface CityInput {
  name: string;
  locationType: LocationType;
  summary: string;
  campusAreas: string;
  nearbyCities: string;
  nearestAirport: string;
  publicTransport: string;
  busTrainMetro: string;
  nearestStation: string;
  monthlyRent: string;
  foodCost: string;
  transportCost: string;
  facilities: string;
  studentLifestyle: string;
  sources: SourceLink[];
  markVerified: boolean;
}

export interface UniversityInput {
  name: string;
  shortName: string;
  logoUrl: string;
  summary: string;
  website: string;
  address: string;
  region: string;
  cityId: string;
  campusName: string;
  campusSetting: CampusSetting;
  cityClassification: LocationType;
  nearbyCities: string;
  nearestAirport: string;
  publicTransport: string;
  courses: string[];
  degreeLevels: string[];
  admissionRequirements: string;
  gpaRequirements: string;
  englishRequirements: string;
  studyGapPolicy: string;
  intakes: string;
  applicationDeadlines: string;
  applicationFee: string;
  tuitionFees: string;
  courseDuration: string;
  requiredDocuments: string[];
  scholarships: string;
  applicationPortal: string;
  admissionsContact: string;
  dormitories: string;
  privateAccommodation: string;
  estimatedRent: string;
  monthlyLivingCost: string;
  foodCost: string;
  transportCost: string;
  essentialFacilities: string;
  publicTransportAccess: string;
  partTimeWork: string;
  studentLife: string;
  safety: string;
  climate: string;
  sources: SourceLink[];
  markVerified: boolean;
}

export interface UniversityDetailField {
  key: string;
  label: string;
  list?: boolean;
  wide?: boolean;
}

export const UNIVERSITY_ACADEMIC_FIELDS: readonly UniversityDetailField[] = [
  { key: "courses", label: "Courses & programmes", list: true, wide: true },
  { key: "degreeLevels", label: "Degree levels", list: true, wide: false },
  { key: "admissionRequirements", label: "Admission requirements", wide: true },
  { key: "gpaRequirements", label: "GPA requirements", wide: false },
  { key: "englishRequirements", label: "English requirements (IELTS / TOEFL / PTE / MOI)", wide: true },
  { key: "studyGapPolicy", label: "Study-gap policy", wide: false },
  { key: "intakes", label: "Intakes", wide: false },
  { key: "applicationDeadlines", label: "Application deadlines", wide: false },
  { key: "applicationFee", label: "Application fee", wide: false },
  { key: "tuitionFees", label: "Tuition fees", wide: false },
  { key: "courseDuration", label: "Course duration", wide: false },
  { key: "requiredDocuments", label: "Required admission documents", list: true, wide: true },
  { key: "scholarships", label: "Scholarships & funding", wide: true },
  { key: "applicationPortal", label: "Official application portal", wide: false },
  { key: "admissionsContact", label: "Admissions office contact", wide: false },
];

export const UNIVERSITY_LIFE_FIELDS: readonly UniversityDetailField[] = [
  { key: "dormitories", label: "University dormitories", wide: true },
  { key: "privateAccommodation", label: "Private accommodation", wide: true },
  { key: "estimatedRent", label: "Estimated rent", wide: false },
  { key: "monthlyLivingCost", label: "Monthly living expenses", wide: false },
  { key: "foodCost", label: "Food costs", wide: false },
  { key: "transportCost", label: "Transport costs", wide: false },
  { key: "essentialFacilities", label: "Essential facilities near campus", wide: true },
  { key: "publicTransportAccess", label: "Public transport access", wide: true },
  { key: "partTimeWork", label: "Part-time work opportunities", wide: false },
  { key: "studentLife", label: "Student life & local environment", wide: true },
  { key: "safety", label: "Safety information", wide: false },
  { key: "climate", label: "Climate", wide: false },
];

export function isRegion(value: unknown): value is Region {
  return typeof value === "string" && (REGIONS as readonly string[]).includes(value);
}

export function isLocationType(value: unknown): value is LocationType {
  return (
    typeof value === "string" &&
    (LOCATION_TYPES as readonly string[]).includes(value)
  );
}

export function isCampusSetting(value: unknown): value is CampusSetting {
  return (
    typeof value === "string" &&
    (CAMPUS_SETTINGS as readonly string[]).includes(value)
  );
}

export function getCountryInfoDefinition(key: CountryInfoKey) {
  return COUNTRY_INFO_DEFINITIONS.find((item) => item.key === key);
}

export function createEmptyCountryInfo(): CountryInfoItem[] {
  return COUNTRY_INFO_DEFINITIONS.map((item) => ({
    key: item.key,
    summary: "",
    verified: false,
  }));
}

export function formatUniversityFieldValue(
  value: string | string[] | undefined
): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
}
