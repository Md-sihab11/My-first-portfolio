import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getProjects, saveProject, deleteProject } from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const allProjects = await getProjects({ onlyPublished: false });
  return NextResponse.json({ success: true, projects: allProjects });
}

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Project title and unique slug are required." },
        { status: 400 }
      );
    }

    await saveProject(body);
    return NextResponse.json({ success: true, message: "Project saved successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save project." },
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
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    await deleteProject(slug);
    return NextResponse.json({ success: true, message: "Project deleted." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete project." },
      { status: 500 }
    );
  }
}
