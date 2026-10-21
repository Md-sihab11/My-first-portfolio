import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UniversityDetailView } from "@/components/study-abroad/UniversityDetailView";
import { StudyAbroadSetupNotice } from "@/components/study-abroad/SetupNotice";
import { Container } from "@/components/ui/Container";
import {
  getStudyAbroadRuntimeState,
  readStudyAbroadData,
} from "@/lib/study-abroad/store";

export const dynamic = "force-dynamic";

interface UniversityPageProps {
  params: Promise<{ countrySlug: string; universitySlug: string }>;
}

export async function generateMetadata({
  params,
}: UniversityPageProps): Promise<Metadata> {
  const { countrySlug, universitySlug } = await params;
  try {
    const data = await readStudyAbroadData();
    const country = data.countries.find((item) => item.slug === countrySlug);
    const university = data.universities.find(
      (item) =>
        item.slug === universitySlug && item.countryId === country?.id
    );
    if (!country || !university) {
      return { title: "University not found | Study Abroad" };
    }
    return {
      title: `${university.name} study guide | Study Abroad`,
      description: university.summary.slice(0, 160),
    };
  } catch {
    return { title: "Study Abroad Research Hub" };
  }
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { countrySlug, universitySlug } = await params;
  const runtime = await getStudyAbroadRuntimeState();

  if (runtime.mode === "setup") {
    return (
      <div className="py-16 sm:py-24">
        <Container size="lg">
          <StudyAbroadSetupNotice databaseConfigured />
        </Container>
      </div>
    );
  }

  const data = await readStudyAbroadData();
  const country = data.countries.find((item) => item.slug === countrySlug);
  if (!country) notFound();

  const university = data.universities.find(
    (item) => item.slug === universitySlug && item.countryId === country.id
  );
  if (!university) notFound();

  const cities = data.cities.filter((city) => city.countryId === country.id);
  const city = cities.find((item) => item.id === university.cityId);
  const editConfigured =
    runtime.mode === "database" && runtime.editConfigured;

  return (
    <div className="py-16 sm:py-24">
      <Container size="lg">
        <UniversityDetailView
          country={country}
          city={city}
          university={university}
          cities={cities}
          editConfigured={editConfigured}
        />
      </Container>
    </div>
  );
}
