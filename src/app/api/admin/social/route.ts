import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getSocialProfiles, saveSocialProfile, deleteSocialProfile } from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const profiles = await getSocialProfiles({ onlyVisible: false });
  return NextResponse.json({ success: true, profiles });
}

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.platform || !body.url) {
      return NextResponse.json(
        { error: "Platform name and URL are required." },
        { status: 400 }
      );
    }

    await saveSocialProfile(body);
    return NextResponse.json({ success: true, message: "Social profile saved." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save profile." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required." }, { status: 400 });
    }

    await deleteSocialProfile(id);
    return NextResponse.json({ success: true, message: "Profile deleted." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete profile." },
      { status: 500 }
    );
  }
}
