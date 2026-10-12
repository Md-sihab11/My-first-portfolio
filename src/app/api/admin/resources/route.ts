import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getResources, saveResource, deleteResource } from "@/lib/db-content";
import { deleteFileFromStorage } from "@/lib/storage";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const allResources = await getResources({ onlyPublished: false });
  return NextResponse.json({ success: true, resources: allResources });
}

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.fileUrl) {
      return NextResponse.json(
        { error: "Resource title and file URL are required." },
        { status: 400 }
      );
    }

    const id = body.id || `res-${Date.now()}`;
    await saveResource({ ...body, id });
    return NextResponse.json({ success: true, message: "Resource saved successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save resource." },
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
    const storageKey = searchParams.get("storageKey");

    if (!id) {
      return NextResponse.json({ error: "ID is required." }, { status: 400 });
    }

    if (storageKey) {
      await deleteFileFromStorage(storageKey);
    }

    await deleteResource(id);
    return NextResponse.json({ success: true, message: "Resource deleted." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete resource." },
      { status: 500 }
    );
  }
}
