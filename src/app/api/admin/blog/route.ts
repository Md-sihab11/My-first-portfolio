import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const posts = await getBlogPosts({ onlyPublished: false });
  return NextResponse.json({ success: true, posts });
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
        { error: "Article title and slug are required." },
        { status: 400 }
      );
    }

    await saveBlogPost(body);
    return NextResponse.json({ success: true, message: "Blog post saved." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save blog post." },
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

    await deleteBlogPost(slug);
    return NextResponse.json({ success: true, message: "Blog post deleted." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete blog post." },
      { status: 500 }
    );
  }
}
