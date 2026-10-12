import { NextResponse } from "next/server";
import { requireOwnerApi } from "@/lib/admin-auth";
import {
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from "@/lib/db-content";

export async function GET() {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  const messages = await getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function PATCH(req: Request) {
  const authCheck = await requireOwnerApi();
  if (!authCheck.authorized) {
    return NextResponse.json(authCheck.response, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    await updateMessageStatus(body.id, {
      read: body.read,
      archived: body.archived,
    });

    return NextResponse.json({ success: true, message: "Message updated." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update message status." },
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
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    await deleteContactMessage(id);
    return NextResponse.json({ success: true, message: "Message deleted." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete message." },
      { status: 500 }
    );
  }
}
