import postgres from "postgres";
import { initialStudyAbroadData } from "../src/data/study-abroad-research.ts";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  max: 1,
  prepare: false,
  connect_timeout: 15,
});

try {
  const counts = await sql.begin(async (tx) => {
    let countries = 0;
    let cities = 0;
    let universities = 0;

    for (const country of initialStudyAbroadData.countries) {
      const rows = await tx`
        INSERT INTO study_abroad_countries
          (id, slug, name, flag, region, overview, location_summary,
           info, sources, sample, created_at, updated_at)
        VALUES (
          ${country.id}, ${country.slug}, ${country.name}, ${country.flag},
          ${country.region}, ${country.overview}, ${country.locationSummary},
          ${tx.json(country.info)},
          ${tx.json(country.sources)},
          ${country.sample}, ${country.createdAt}, ${country.updatedAt}
        )
        ON CONFLICT DO NOTHING
        RETURNING id
      `;
      countries += rows.length;
    }

    for (const city of initialStudyAbroadData.cities) {
      const rows = await tx`
        INSERT INTO study_abroad_cities
          (id, country_id, name, location_type, summary, campus_areas,
           nearby_cities, nearest_airport, public_transport, bus_train_metro,
           nearest_station, monthly_rent, food_cost, transport_cost, facilities,
           student_lifestyle, sources, last_verified_at, sample, created_at,
           updated_at)
        VALUES (
          ${city.id}, ${city.countryId}, ${city.name}, ${city.locationType},
          ${city.summary}, ${city.campusAreas}, ${city.nearbyCities},
          ${city.nearestAirport}, ${city.publicTransport}, ${city.busTrainMetro},
          ${city.nearestStation}, ${city.monthlyRent}, ${city.foodCost},
          ${city.transportCost}, ${city.facilities}, ${city.studentLifestyle},
          ${tx.json(city.sources)},
          ${city.lastVerifiedAt ?? null}, ${city.sample}, ${city.createdAt},
          ${city.updatedAt}
        )
        ON CONFLICT DO NOTHING
        RETURNING id
      `;
      cities += rows.length;
    }

    for (const university of initialStudyAbroadData.universities) {
      const rows = await tx`
        INSERT INTO study_abroad_universities
          (id, country_id, city_id, slug, name, short_name, logo_url, summary,
           website, address, region, campus_name, campus_setting,
           city_classification, nearby_cities, nearest_airport,
           public_transport, courses, degree_levels, admission_requirements,
           gpa_requirements, english_requirements, study_gap_policy, intakes,
           application_deadlines, application_fee, tuition_fees,
           course_duration, required_documents, scholarships,
           application_portal, admissions_contact, dormitories,
           private_accommodation, estimated_rent, monthly_living_cost,
           food_cost, transport_cost, essential_facilities,
           public_transport_access, part_time_work, student_life, safety,
           climate, sources, last_verified_at, sample, created_at, updated_at)
        VALUES (
          ${university.id}, ${university.countryId}, ${university.cityId},
          ${university.slug}, ${university.name}, ${university.shortName},
          ${university.logoUrl}, ${university.summary}, ${university.website},
          ${university.address}, ${university.region},
          ${university.campusName}, ${university.campusSetting},
          ${university.cityClassification}, ${university.nearbyCities},
          ${university.nearestAirport}, ${university.publicTransport},
          ${tx.array(university.courses)},
          ${tx.array(university.degreeLevels)},
          ${university.admissionRequirements}, ${university.gpaRequirements},
          ${university.englishRequirements}, ${university.studyGapPolicy},
          ${university.intakes}, ${university.applicationDeadlines},
          ${university.applicationFee}, ${university.tuitionFees},
          ${university.courseDuration},
          ${tx.array(university.requiredDocuments)},
          ${university.scholarships}, ${university.applicationPortal},
          ${university.admissionsContact}, ${university.dormitories},
          ${university.privateAccommodation}, ${university.estimatedRent},
          ${university.monthlyLivingCost}, ${university.foodCost},
          ${university.transportCost}, ${university.essentialFacilities},
          ${university.publicTransportAccess}, ${university.partTimeWork},
          ${university.studentLife}, ${university.safety}, ${university.climate},
          ${tx.json(university.sources)},
          ${university.lastVerifiedAt ?? null}, ${university.sample},
          ${university.createdAt}, ${university.updatedAt}
        )
        ON CONFLICT DO NOTHING
        RETURNING id
      `;
      universities += rows.length;
    }

    return { countries, cities, universities };
  });

  console.log(
    `Seeded ${counts.countries} countries, ${counts.cities} cities and ${counts.universities} universities.`
  );
  console.log(
    "Existing rows were left unchanged. Sample rows remain marked as sample data."
  );
} catch (error) {
  console.error(
    "Seeding failed. Run scripts/study-abroad-schema.sql first, then retry."
  );
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
