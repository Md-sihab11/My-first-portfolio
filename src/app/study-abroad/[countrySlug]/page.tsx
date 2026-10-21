import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountryDetailView } from "@/components/study-abroad/CountryDetailView";
import { StudyAbroadSetupNotice } from "@/components/study-abroad/SetupNotice";
import { Container } from "@/components/ui/Container";
import {
  getStudyAbroadRuntimeState,
  readStudyAbroadData,
} from "@/lib/study-abroad/store";

export const dynamic = "force-dynamic";

interface CountryPageProps {
  params: Promise<{ countrySlug: string }>;
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { countrySlug } = await params;
  try {
    const data = await readStudyAbroadData();
    const country = data.countries.find((item) => item.slug === countrySlug);
    if (!country) return { title: "Country not found | Study Abroad" };
    return {
      title: `${country.name} study guide | Study Abroad Research Hub`,
      description: country.overview.slice(0, 160),
    };
  } catch {
    return { title: "Study Abroad Research Hub" };
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { countrySlug } = await params;
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

  const cities = data.cities.filter((city) => city.countryId === country.id);
  const universities = data.universities.filter(
    (university) => university.countryId === country.id
  );
  const editConfigured =
    runtime.mode === "database" && runtime.editConfigured;

  return (
    <div className="py-16 sm:py-24">
      <Container size="lg">
        <CountryDetailView
          country={country}
          cities={cities}
          universities={universities}
          editConfigured={editConfigured}
        />
      </Container>
    </div>
  );
}
