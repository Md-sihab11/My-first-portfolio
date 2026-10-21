import { randomUUID } from "node:crypto";
import { initialStudyAbroadData } from "@/data/study-abroad-research";
import {
  COUNTRY_INFO_DEFINITIONS,
  type City,
  type CityInput,
  type Country,
  type CountryInfoItem,
  type CountryInput,
  type LocationType,
  type Region,
  type SourceLink,
  type StudyAbroadData,
  type University,
  type UniversityInput,
} from "@/lib/study-abroad/types";
import { normalizeName, slugify } from "@/lib/study-abroad/validation";
import {
  assertSchemaReady,
  getDb,
  isDatabaseConfigured,
  isSchemaReady,
  type StudyAbroadDb,
  type StudyAbroadTx,
} from "@/lib/study-abroad/db";
import { isStudyAbroadEditConfigured } from "@/lib/study-abroad/auth";

export class StoreError extends Error {
  status: number;
  details?: Record<string, unknown>;

  constructor(
    message: string,
    status = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "StoreError";
    this.status = status;
    this.details = details;
  }
}

type DbClient = StudyAbroadDb | StudyAbroadTx;
type Row = Record<string, unknown>;
type JsonValue = Parameters<StudyAbroadDb["json"]>[0];

function jsonValue(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}

function cloneSeed(): StudyAbroadData {
  return JSON.parse(
    JSON.stringify(initialStudyAbroadData)
  ) as StudyAbroadData;
}

function text(row: Row, key: string, fallback = ""): string {
  const value = row[key];
  return typeof value === "string" ? value : fallback;
}

function bool(row: Row, key: string): boolean {
  return row[key] === true;
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function jsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return new Date().toISOString();
}

function optionalIso(value: unknown): string | undefined {
  if (!value) return undefined;
  return iso(value);
}

function mapCountryRow(row: Row): Country {
  return {
    id: text(row, "id"),
    slug: text(row, "slug"),
    name: text(row, "name"),
    flag: text(row, "flag", "🌍"),
    region: text(row, "region", "Other") as Region,
    overview: text(row, "overview"),
    locationSummary: text(row, "location_summary"),
    info: jsonArray<CountryInfoItem>(row.info),
    sources: jsonArray<SourceLink>(row.sources),
    sample: bool(row, "sample"),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  };
}

function mapCityRow(row: Row): City {
  return {
    id: text(row, "id"),
    countryId: text(row, "country_id"),
    name: text(row, "name"),
    locationType: text(row, "location_type", "Major city") as LocationType,
    summary: text(row, "summary"),
    campusAreas: text(row, "campus_areas"),
    nearbyCities: text(row, "nearby_cities"),
    nearestAirport: text(row, "nearest_airport"),
    publicTransport: text(row, "public_transport"),
    busTrainMetro: text(row, "bus_train_metro"),
    nearestStation: text(row, "nearest_station"),
    monthlyRent: text(row, "monthly_rent"),
    foodCost: text(row, "food_cost"),
    transportCost: text(row, "transport_cost"),
    facilities: text(row, "facilities"),
    studentLifestyle: text(row, "student_lifestyle"),
    sources: jsonArray<SourceLink>(row.sources),
    lastVerifiedAt: optionalIso(row.last_verified_at),
    sample: bool(row, "sample"),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  };
}

function mapUniversityRow(row: Row): University {
  return {
    id: text(row, "id"),
    countryId: text(row, "country_id"),
    cityId: text(row, "city_id"),
    slug: text(row, "slug"),
    name: text(row, "name"),
    shortName: text(row, "short_name", text(row, "name")),
    logoUrl: text(row, "logo_url"),
    summary: text(row, "summary"),
    website: text(row, "website"),
    address: text(row, "address"),
    region: text(row, "region"),
    campusName: text(row, "campus_name"),
    campusSetting: text(row, "campus_setting", "City centre") as University["campusSetting"],
    cityClassification: text(row, "city_classification", "Major city") as LocationType,
    nearbyCities: text(row, "nearby_cities"),
    nearestAirport: text(row, "nearest_airport"),
    publicTransport: text(row, "public_transport"),
    courses: stringArray(row.courses),
    degreeLevels: stringArray(row.degree_levels),
    admissionRequirements: text(row, "admission_requirements"),
    gpaRequirements: text(row, "gpa_requirements"),
    englishRequirements: text(row, "english_requirements"),
    studyGapPolicy: text(row, "study_gap_policy"),
    intakes: text(row, "intakes"),
    applicationDeadlines: text(row, "application_deadlines"),
    applicationFee: text(row, "application_fee"),
    tuitionFees: text(row, "tuition_fees"),
    courseDuration: text(row, "course_duration"),
    requiredDocuments: stringArray(row.required_documents),
    scholarships: text(row, "scholarships"),
    applicationPortal: text(row, "application_portal"),
    admissionsContact: text(row, "admissions_contact"),
    dormitories: text(row, "dormitories"),
    privateAccommodation: text(row, "private_accommodation"),
    estimatedRent: text(row, "estimated_rent"),
    monthlyLivingCost: text(row, "monthly_living_cost"),
    foodCost: text(row, "food_cost"),
    transportCost: text(row, "transport_cost"),
    essentialFacilities: text(row, "essential_facilities"),
    publicTransportAccess: text(row, "public_transport_access"),
    partTimeWork: text(row, "part_time_work"),
    studentLife: text(row, "student_life"),
    safety: text(row, "safety"),
    climate: text(row, "climate"),
    sources: jsonArray<SourceLink>(row.sources),
    lastVerifiedAt: optionalIso(row.last_verified_at),
    sample: bool(row, "sample"),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  };
}

function buildCountryInfo(input: CountryInput): CountryInfoItem[] {
  return COUNTRY_INFO_DEFINITIONS.map((definition) => {
    const item = input.info.find((entry) => entry.key === definition.key);
    return {
      key: definition.key,
      summary: item?.summary ?? "",
      verified: item?.verified ?? false,
      source: item?.sourceUrl
        ? {
            label: item.sourceLabel?.trim() || definition.label,
            url: item.sourceUrl,
          }
        : undefined,
    };
  });
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}

function assertUniqueOrThrow(error: unknown, message: string): never {
  if (isUniqueViolation(error)) {
    throw new StoreError(message, 409);
  }
  throw error;
}

async function findCountry(db: DbClient, id: string): Promise<Country> {
  const rows = await db<Row[]>`
    SELECT * FROM study_abroad_countries WHERE id = ${id} LIMIT 1
  `;
  if (!rows[0]) {
    throw new StoreError("The selected country was not found.", 404);
  }
  return mapCountryRow(rows[0]);
}

async function findCity(db: DbClient, id: string): Promise<City> {
  const rows = await db<Row[]>`
    SELECT * FROM study_abroad_cities WHERE id = ${id} LIMIT 1
  `;
  if (!rows[0]) {
    throw new StoreError("The selected city was not found.", 404);
  }
  return mapCityRow(rows[0]);
}

async function findUniversity(
  db: DbClient,
  id: string
): Promise<University> {
  const rows = await db<Row[]>`
    SELECT * FROM study_abroad_universities WHERE id = ${id} LIMIT 1
  `;
  if (!rows[0]) {
    throw new StoreError("The selected university was not found.", 404);
  }
  return mapUniversityRow(rows[0]);
}

async function assertCountryNameAvailable(
  db: DbClient,
  name: string,
  exceptId = ""
): Promise<void> {
  const rows = await db<Row[]>`
    SELECT id FROM study_abroad_countries
    WHERE lower(name) = lower(${name}) AND id <> ${exceptId}
    LIMIT 1
  `;
  if (rows[0]) {
    throw new StoreError("A country with this name already exists.", 409);
  }
}

async function assertCityNameAvailable(
  db: DbClient,
  countryId: string,
  name: string,
  exceptId = ""
): Promise<void> {
  const rows = await db<Row[]>`
    SELECT id FROM study_abroad_cities
    WHERE country_id = ${countryId}
      AND lower(name) = lower(${name})
      AND id <> ${exceptId}
    LIMIT 1
  `;
  if (rows[0]) {
    throw new StoreError(
      "A city with this name already exists in this country.",
      409
    );
  }
}

async function assertUniversityNameAvailable(
  db: DbClient,
  countryId: string,
  name: string,
  exceptId = ""
): Promise<void> {
  const rows = await db<Row[]>`
    SELECT id FROM study_abroad_universities
    WHERE country_id = ${countryId}
      AND lower(name) = lower(${name})
      AND id <> ${exceptId}
    LIMIT 1
  `;
  if (rows[0]) {
    throw new StoreError(
      "A university with this name already exists in this country.",
      409
    );
  }
}

async function assertCityBelongsToCountry(
  db: DbClient,
  cityId: string,
  countryId: string
): Promise<City> {
  const city = await findCity(db, cityId);
  if (city.countryId !== countryId) {
    throw new StoreError(
      "The selected city does not belong to this country.",
      400
    );
  }
  return city;
}

async function uniqueCountrySlug(
  db: DbClient,
  base: string
): Promise<string> {
  const initial = slugify(base);
  let candidate = initial;
  for (let suffix = 2; suffix < 100; suffix += 1) {
    const rows = await db<Row[]>`
      SELECT id FROM study_abroad_countries WHERE slug = ${candidate} LIMIT 1
    `;
    if (!rows[0]) return candidate;
    candidate = `${initial}-${suffix}`;
  }
  throw new StoreError("Could not generate a unique country URL.", 409);
}

async function uniqueUniversitySlug(
  db: DbClient,
  countryId: string,
  base: string
): Promise<string> {
  const initial = slugify(base);
  let candidate = initial;
  for (let suffix = 2; suffix < 100; suffix += 1) {
    const rows = await db<Row[]>`
      SELECT id FROM study_abroad_universities
      WHERE country_id = ${countryId} AND slug = ${candidate}
      LIMIT 1
    `;
    if (!rows[0]) return candidate;
    candidate = `${initial}-${suffix}`;
  }
  throw new StoreError("Could not generate a unique university URL.", 409);
}

export async function getStudyAbroadRuntimeState(): Promise<{
  mode: "sample" | "database" | "setup";
  databaseConfigured: boolean;
  schemaReady: boolean;
  editConfigured: boolean;
}> {
  const databaseConfigured = isDatabaseConfigured();
  const editConfigured = isStudyAbroadEditConfigured();

  if (!databaseConfigured) {
    return {
      mode: "sample",
      databaseConfigured: false,
      schemaReady: false,
      editConfigured,
    };
  }

  let schemaReady = false;
  try {
    schemaReady = await isSchemaReady();
  } catch {
    schemaReady = false;
  }

  return {
    mode: schemaReady ? "database" : "setup",
    databaseConfigured,
    schemaReady,
    editConfigured,
  };
}

export async function readStudyAbroadDataSafe(): Promise<{
  data: StudyAbroadData;
  runtime: Awaited<ReturnType<typeof getStudyAbroadRuntimeState>>;
}> {
  const runtime = await getStudyAbroadRuntimeState();

  if (runtime.mode !== "database") {
    return { data: cloneSeed(), runtime };
  }

  try {
    return { data: await readStudyAbroadData(), runtime };
  } catch (error) {
    console.error(
      "[study-abroad] Could not read the database. Showing sample records instead:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return {
      data: cloneSeed(),
      runtime: { ...runtime, mode: "setup", schemaReady: false },
    };
  }
}

export async function readStudyAbroadData(): Promise<StudyAbroadData> {
  if (!isDatabaseConfigured()) {
    return cloneSeed();
  }

  const db = getDb();
  await assertSchemaReady(db);

  const [countryRows, cityRows, universityRows] = await Promise.all([
    db<Row[]>`SELECT * FROM study_abroad_countries ORDER BY name ASC`,
    db<Row[]>`SELECT * FROM study_abroad_cities ORDER BY name ASC`,
    db<Row[]>`SELECT * FROM study_abroad_universities ORDER BY name ASC`,
  ]);

  return {
    version: 1,
    countries: countryRows.map(mapCountryRow),
    cities: cityRows.map(mapCityRow),
    universities: universityRows.map(mapUniversityRow),
  };
}

export async function createCountry(input: CountryInput): Promise<Country> {
  const db = getDb();
  await assertSchemaReady(db);
  await assertCountryNameAvailable(db, input.name);

  const id = randomUUID();
  const slug = await uniqueCountrySlug(db, input.name);
  const timestamp = new Date().toISOString();
  const info = buildCountryInfo(input);

  try {
    const rows = await db<Row[]>`
      INSERT INTO study_abroad_countries
        (id, slug, name, flag, region, overview, location_summary, info, sources, sample, created_at, updated_at)
      VALUES (
        ${id}, ${slug}, ${input.name}, ${input.flag}, ${input.region},
        ${input.overview}, ${input.locationSummary},
        ${db.json(jsonValue(info))}, ${db.json(jsonValue(input.sources))},
        false, ${timestamp}, ${timestamp}
      )
      RETURNING *
    `;
    return mapCountryRow(rows[0]);
  } catch (error) {
    return assertUniqueOrThrow(
      error,
      "A country with this name or URL already exists."
    );
  }
}

export async function updateCountry(
  id: string,
  input: CountryInput
): Promise<Country> {
  const db = getDb();
  await assertSchemaReady(db);
  await findCountry(db, id);
  await assertCountryNameAvailable(db, input.name, id);
  const info = buildCountryInfo(input);

  try {
    const rows = await db<Row[]>`
      UPDATE study_abroad_countries
      SET
        name = ${input.name},
        flag = ${input.flag},
        region = ${input.region},
        overview = ${input.overview},
        location_summary = ${input.locationSummary},
        info = ${db.json(jsonValue(info))},
        sources = ${db.json(jsonValue(input.sources))},
        sample = false,
        updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows[0]) throw new StoreError("The selected country was not found.", 404);
    return mapCountryRow(rows[0]);
  } catch (error) {
    return assertUniqueOrThrow(
      error,
      "A country with this name or URL already exists."
    );
  }
}

export async function deleteCountry(id: string): Promise<{
  country: Country;
  cities: number;
  universities: number;
}> {
  const db = getDb();
  await assertSchemaReady(db);

  return db.begin(async (tx) => {
    const country = await findCountry(tx, id);
    const counts = await tx<Row[]>`
      SELECT
        (SELECT count(*)::int FROM study_abroad_cities WHERE country_id = ${id}) AS cities,
        (SELECT count(*)::int FROM study_abroad_universities WHERE country_id = ${id}) AS universities
    `;
    // Delete children explicitly so the city foreign key can stay RESTRICT.
    // This keeps a direct city delete from silently removing universities while
    // still allowing an intentional country delete to remove the whole tree.
    await tx`DELETE FROM study_abroad_universities WHERE country_id = ${id}`;
    await tx`DELETE FROM study_abroad_cities WHERE country_id = ${id}`;
    await tx`DELETE FROM study_abroad_countries WHERE id = ${id}`;

    return {
      country,
      cities: Number(counts[0]?.cities ?? 0),
      universities: Number(counts[0]?.universities ?? 0),
    };
  });
}

export async function createCity(
  countryId: string,
  input: CityInput
): Promise<City> {
  const db = getDb();
  await assertSchemaReady(db);
  await findCountry(db, countryId);
  await assertCityNameAvailable(db, countryId, input.name);

  const id = randomUUID();
  const timestamp = new Date().toISOString();
  const lastVerifiedAt = input.markVerified ? timestamp : null;

  try {
    const rows = await db<Row[]>`
      INSERT INTO study_abroad_cities
        (id, country_id, name, location_type, summary, campus_areas, nearby_cities,
         nearest_airport, public_transport, bus_train_metro, nearest_station,
         monthly_rent, food_cost, transport_cost, facilities, student_lifestyle,
         sources, last_verified_at, sample, created_at, updated_at)
      VALUES (
        ${id}, ${countryId}, ${input.name}, ${input.locationType}, ${input.summary},
        ${input.campusAreas}, ${input.nearbyCities}, ${input.nearestAirport},
        ${input.publicTransport}, ${input.busTrainMetro}, ${input.nearestStation},
        ${input.monthlyRent}, ${input.foodCost}, ${input.transportCost},
        ${input.facilities}, ${input.studentLifestyle},
        ${db.json(jsonValue(input.sources))}, ${lastVerifiedAt}, false,
        ${timestamp}, ${timestamp}
      )
      RETURNING *
    `;
    return mapCityRow(rows[0]);
  } catch (error) {
    return assertUniqueOrThrow(
      error,
      "A city with this name already exists in this country."
    );
  }
}

export async function updateCity(
  id: string,
  input: CityInput
): Promise<City> {
  const db = getDb();
  await assertSchemaReady(db);
  const existing = await findCity(db, id);
  await assertCityNameAvailable(db, existing.countryId, input.name, id);
  const timestamp = new Date().toISOString();
  const lastVerifiedAt = input.markVerified ? timestamp : null;

  try {
    const rows = await db<Row[]>`
      UPDATE study_abroad_cities
      SET
        name = ${input.name},
        location_type = ${input.locationType},
        summary = ${input.summary},
        campus_areas = ${input.campusAreas},
        nearby_cities = ${input.nearbyCities},
        nearest_airport = ${input.nearestAirport},
        public_transport = ${input.publicTransport},
        bus_train_metro = ${input.busTrainMetro},
        nearest_station = ${input.nearestStation},
        monthly_rent = ${input.monthlyRent},
        food_cost = ${input.foodCost},
        transport_cost = ${input.transportCost},
        facilities = ${input.facilities},
        student_lifestyle = ${input.studentLifestyle},
        sources = ${db.json(jsonValue(input.sources))},
        last_verified_at = ${lastVerifiedAt},
        sample = false,
        updated_at = ${timestamp}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows[0]) throw new StoreError("The selected city was not found.", 404);
    return mapCityRow(rows[0]);
  } catch (error) {
    return assertUniqueOrThrow(
      error,
      "A city with this name already exists in this country."
    );
  }
}

export async function deleteCity(id: string): Promise<{
  city: City;
  universityCount: number;
}> {
  const db = getDb();
  await assertSchemaReady(db);

  return db.begin(async (tx) => {
    const city = await findCity(tx, id);
    const rows = await tx<Row[]>`
      SELECT count(*)::int AS count
      FROM study_abroad_universities
      WHERE city_id = ${id}
    `;
    const universityCount = Number(rows[0]?.count ?? 0);

    if (universityCount > 0) {
      throw new StoreError(
        `This city still has ${universityCount} universit${
          universityCount === 1 ? "y" : "ies"
        }. Delete or move them before deleting the city.`,
        409,
        { universityCount }
      );
    }

    await tx`DELETE FROM study_abroad_cities WHERE id = ${id}`;
    return { city, universityCount };
  });
}

export async function createUniversity(
  countryId: string,
  input: UniversityInput
): Promise<University> {
  const db = getDb();
  await assertSchemaReady(db);
  await findCountry(db, countryId);
  await assertCityBelongsToCountry(db, input.cityId, countryId);
  await assertUniversityNameAvailable(db, countryId, input.name);

  const id = randomUUID();
  const slug = await uniqueUniversitySlug(db, countryId, input.name);
  const timestamp = new Date().toISOString();
  const lastVerifiedAt = input.markVerified ? timestamp : null;

  try {
    const rows = await db<Row[]>`
      INSERT INTO study_abroad_universities
        (id, country_id, city_id, slug, name, short_name, logo_url, summary,
         website, address, region, campus_name, campus_setting, city_classification,
         nearby_cities, nearest_airport, public_transport, courses, degree_levels,
         admission_requirements, gpa_requirements, english_requirements,
         study_gap_policy, intakes, application_deadlines, application_fee,
         tuition_fees, course_duration, required_documents, scholarships,
         application_portal, admissions_contact, dormitories,
         private_accommodation, estimated_rent, monthly_living_cost, food_cost,
         transport_cost, essential_facilities, public_transport_access,
         part_time_work, student_life, safety, climate, sources,
         last_verified_at, sample, created_at, updated_at)
      VALUES (
        ${id}, ${countryId}, ${input.cityId}, ${slug}, ${input.name},
        ${input.shortName}, ${input.logoUrl}, ${input.summary}, ${input.website},
        ${input.address}, ${input.region}, ${input.campusName},
        ${input.campusSetting}, ${input.cityClassification}, ${input.nearbyCities},
        ${input.nearestAirport}, ${input.publicTransport}, ${input.courses},
        ${input.degreeLevels}, ${input.admissionRequirements},
        ${input.gpaRequirements}, ${input.englishRequirements},
        ${input.studyGapPolicy}, ${input.intakes},
        ${input.applicationDeadlines}, ${input.applicationFee},
        ${input.tuitionFees}, ${input.courseDuration},
        ${input.requiredDocuments}, ${input.scholarships},
        ${input.applicationPortal}, ${input.admissionsContact},
        ${input.dormitories}, ${input.privateAccommodation},
        ${input.estimatedRent}, ${input.monthlyLivingCost}, ${input.foodCost},
        ${input.transportCost}, ${input.essentialFacilities},
        ${input.publicTransportAccess}, ${input.partTimeWork},
        ${input.studentLife}, ${input.safety}, ${input.climate},
        ${db.json(jsonValue(input.sources))}, ${lastVerifiedAt}, false,
        ${timestamp}, ${timestamp}
      )
      RETURNING *
    `;
    return mapUniversityRow(rows[0]);
  } catch (error) {
    return assertUniqueOrThrow(
      error,
      "A university with this name or URL already exists in this country."
    );
  }
}

export async function updateUniversity(
  id: string,
  input: UniversityInput
): Promise<University> {
  const db = getDb();
  await assertSchemaReady(db);
  const existing = await findUniversity(db, id);
  await assertCityBelongsToCountry(db, input.cityId, existing.countryId);
  await assertUniversityNameAvailable(
    db,
    existing.countryId,
    input.name,
    id
  );
  const timestamp = new Date().toISOString();
  const lastVerifiedAt = input.markVerified ? timestamp : null;

  try {
    const rows = await db<Row[]>`
      UPDATE study_abroad_universities
      SET
        city_id = ${input.cityId},
        name = ${input.name},
        short_name = ${input.shortName},
        logo_url = ${input.logoUrl},
        summary = ${input.summary},
        website = ${input.website},
        address = ${input.address},
        region = ${input.region},
        campus_name = ${input.campusName},
        campus_setting = ${input.campusSetting},
        city_classification = ${input.cityClassification},
        nearby_cities = ${input.nearbyCities},
        nearest_airport = ${input.nearestAirport},
        public_transport = ${input.publicTransport},
        courses = ${input.courses},
        degree_levels = ${input.degreeLevels},
        admission_requirements = ${input.admissionRequirements},
        gpa_requirements = ${input.gpaRequirements},
        english_requirements = ${input.englishRequirements},
        study_gap_policy = ${input.studyGapPolicy},
        intakes = ${input.intakes},
        application_deadlines = ${input.applicationDeadlines},
        application_fee = ${input.applicationFee},
        tuition_fees = ${input.tuitionFees},
        course_duration = ${input.courseDuration},
        required_documents = ${input.requiredDocuments},
        scholarships = ${input.scholarships},
        application_portal = ${input.applicationPortal},
        admissions_contact = ${input.admissionsContact},
        dormitories = ${input.dormitories},
        private_accommodation = ${input.privateAccommodation},
        estimated_rent = ${input.estimatedRent},
        monthly_living_cost = ${input.monthlyLivingCost},
        food_cost = ${input.foodCost},
        transport_cost = ${input.transportCost},
        essential_facilities = ${input.essentialFacilities},
        public_transport_access = ${input.publicTransportAccess},
        part_time_work = ${input.partTimeWork},
        student_life = ${input.studentLife},
        safety = ${input.safety},
        climate = ${input.climate},
        sources = ${db.json(jsonValue(input.sources))},
        last_verified_at = ${lastVerifiedAt},
        sample = false,
        updated_at = ${timestamp}
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows[0]) {
      throw new StoreError("The selected university was not found.", 404);
    }
    return mapUniversityRow(rows[0]);
  } catch (error) {
    return assertUniqueOrThrow(
      error,
      "A university with this name or URL already exists in this country."
    );
  }
}

export async function deleteUniversity(id: string): Promise<University> {
  const db = getDb();
  await assertSchemaReady(db);
  const university = await findUniversity(db, id);
  await db`DELETE FROM study_abroad_universities WHERE id = ${id}`;
  return university;
}

export async function targetExists(
  targetType: "country" | "city" | "university",
  targetId: string
): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    const seed = initialStudyAbroadData;
    if (targetType === "country") {
      return seed.countries.some((item) => item.id === targetId);
    }
    if (targetType === "city") {
      return seed.cities.some((item) => item.id === targetId);
    }
    return seed.universities.some((item) => item.id === targetId);
  }

  const db = getDb();
  await assertSchemaReady(db);
  const table =
    targetType === "country"
      ? "study_abroad_countries"
      : targetType === "city"
        ? "study_abroad_cities"
        : "study_abroad_universities";

  const rows = await db.unsafe(
    `SELECT EXISTS(SELECT 1 FROM ${table} WHERE id = $1) AS exists`,
    [targetId]
  ) as Array<{ exists: boolean }>;

  return Boolean(rows[0]?.exists);
}

export function normalizeCountryName(name: string): string {
  return normalizeName(name);
}
