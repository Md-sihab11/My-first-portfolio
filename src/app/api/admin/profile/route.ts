import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await saveSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update profile settings." },
      { status: 500 }
    );
  }
}
