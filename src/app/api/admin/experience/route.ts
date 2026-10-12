import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getExperience, saveExperience, deleteExperience } from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const items = await getExperience();
  return NextResponse.json({ success: true, items });
}

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.role || !body.company) {
      return NextResponse.json({ error: "Role and company/context are required." }, { status: 400 });
    }

    await saveExperience(body);
    return NextResponse.json({ success: true, message: "Experience entry saved." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save experience." }, { status: 500 });
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

    await deleteExperience(id);
    return NextResponse.json({ success: true, message: "Entry deleted." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete entry." }, { status: 500 });
  }
}
