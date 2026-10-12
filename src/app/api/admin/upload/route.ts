import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { uploadFileToStorage } from "@/lib/storage";

export async function POST(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided in request." }, { status: 400 });
    }

    // Maximum 25MB limit
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File exceeds maximum permitted size of 25MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadFileToStorage(buffer, file.name, file.type, folder);

    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
      size: result.size,
      format: result.format,
    });
  } catch (error: any) {
    console.error("[Upload API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file to storage." },
      { status: 500 }
    );
  }
}
