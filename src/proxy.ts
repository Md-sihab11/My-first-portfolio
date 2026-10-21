import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readStudyAbroadDataSafe } from "@/lib/study-abroad/store";

export async function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (segments[0] !== "study-abroad" || segments.length < 2) {
    return NextResponse.next();
  }

  const { data, runtime } = await readStudyAbroadDataSafe();
  if (runtime.mode === "setup") {
    return NextResponse.next();
  }

  const country = data.countries.find((item) => item.slug === segments[1]);
  if (!country) {
    return NextResponse.rewrite(
      new URL("/study-abroad-not-found", request.url),
      { status: 404 }
    );
  }

  if (segments.length === 3) {
    const university = data.universities.find(
      (item) => item.countryId === country.id && item.slug === segments[2]
    );
    if (!university) {
      return NextResponse.rewrite(
        new URL("/study-abroad-not-found", request.url),
        { status: 404 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/study-abroad/:path*"],
};
