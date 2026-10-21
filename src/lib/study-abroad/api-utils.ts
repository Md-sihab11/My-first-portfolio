import { NextResponse } from "next/server";
import { AuthError } from "@/lib/study-abroad/auth";
import {
  DatabaseNotConfiguredError,
  SchemaNotReadyError,
} from "@/lib/study-abroad/db";
import { StoreError } from "@/lib/study-abroad/store";
import { ValidationError } from "@/lib/study-abroad/validation";
import type { ProtectedAction, TargetType } from "@/lib/study-abroad/types";

export function scopeFor(
  action: ProtectedAction,
  targetType: TargetType,
  targetId: string
): string {
  return `${action}:${targetType}:${targetId}`;
}

export function jsonResponse(
  body: Record<string, unknown>,
  status = 200
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
}

export function jsonError(
  message: string,
  status: number,
  extra: Record<string, unknown> = {}
): NextResponse {
  return jsonResponse({ success: false, error: message, ...extra }, status);
}

export async function readJsonBody(
  req: Request
): Promise<Record<string, unknown>> {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ValidationError(
      "The request must use application/json."
    );
  }

  const declaredLength = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > 1_200_000) {
    throw new ValidationError("The request body is too large.");
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    throw new ValidationError("The request body could not be read.");
  }

  if (text.length > 1_200_000) {
    throw new ValidationError("The request body is too large.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ValidationError("The request body is not valid JSON.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new ValidationError("The request body must be a JSON object.");
  }

  return parsed as Record<string, unknown>;
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return jsonError(error.message, error.status, { code: error.code });
  }
  if (error instanceof ValidationError) {
    return jsonError(error.message, 400, {
      code: "validation-failed",
      fieldErrors: error.fieldErrors,
    });
  }
  if (error instanceof StoreError) {
    return jsonError(error.message, error.status, {
      code: error.status === 409 ? "conflict" : "store-error",
      ...(error.details ?? {}),
    });
  }
  if (error instanceof DatabaseNotConfiguredError) {
    return jsonError(
      "Study Abroad editing is not configured on this deployment.",
      503,
      { code: "database-not-configured" }
    );
  }
  if (error instanceof SchemaNotReadyError) {
    return jsonError(
      "The Study Abroad database schema is not initialized. Run the setup SQL before editing.",
      503,
      { code: "schema-not-ready" }
    );
  }

  console.error(
    "[study-abroad] A protected operation failed:",
    error instanceof Error ? error.message : "Unknown error"
  );
  return jsonError(
    "The operation could not be completed. No changes were saved.",
    500,
    { code: "server-error" }
  );
}
