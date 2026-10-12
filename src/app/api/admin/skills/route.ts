import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getSkills, saveSkillCategory, deleteSkillCategory } from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const categories = await getSkills();
  return NextResponse.json({ success: true, categories });
}

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Category title is required." }, { status: 400 });
    }

    await saveSkillCategory(body);
    return NextResponse.json({ success: true, message: "Skill category saved." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save skill." }, { status: 500 });
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

    await deleteSkillCategory(id);
    return NextResponse.json({ success: true, message: "Category deleted." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete category." }, { status: 500 });
  }
}
