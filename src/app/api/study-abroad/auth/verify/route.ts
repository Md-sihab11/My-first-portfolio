import {
  checkRequestOrigin,
  issueEditGrant,
  isStudyAbroadEditConfigured,
  setAuthCookies,
  verifyAccessCode,
  AuthError,
} from "@/lib/study-abroad/auth";
import {
  handleApiError,
  jsonError,
  jsonResponse,
  readJsonBody,
  scopeFor,
} from "@/lib/study-abroad/api-utils";
import type {
  ProtectedAction,
  TargetType,
} from "@/lib/study-abroad/types";
import {
  checkVerificationRateLimit,
  clearVerificationFailures,
  getClientKey,
  recordVerificationFailure,
} from "@/lib/study-abroad/rate-limit";
import { targetExists } from "@/lib/study-abroad/store";

export const dynamic = "force-dynamic";

const ACTIONS: ProtectedAction[] = ["create", "update", "delete"];
const TARGETS: TargetType[] = ["country", "city", "university"];

export async function POST(req: Request) {
  try {
    if (!isStudyAbroadEditConfigured()) {
      return jsonError(
        "Editing is not configured on this server.",
        503,
        { code: "not-configured" }
      );
    }

    const key = getClientKey(req, "verify");
    const limit = await checkVerificationRateLimit(key);
    if (!limit.allowed) {
      const response = jsonError(
        "Too many verification attempts. Wait a few minutes and try again.",
        429,
        { code: "rate-limited" }
      );
      if (limit.retryAfterSeconds) {
        response.headers.set("Retry-After", String(limit.retryAfterSeconds));
      }
      return response;
    }

    checkRequestOrigin(req);

    const body = await readJsonBody(req);
    const code = typeof body.code === "string" ? body.code : "";
    const action = body.action;
    const targetType = body.targetType;
    const targetId = typeof body.targetId === "string" ? body.targetId : "";

    if (!code || code.length > 512) {
      await recordVerificationFailure(key);
      return jsonError(
        "Verification failed. Check the access code and try again.",
        401,
        { code: "verification-failed" }
      );
    }

    if (
      !ACTIONS.includes(action as ProtectedAction) ||
      !TARGETS.includes(targetType as TargetType) ||
      !targetId ||
      targetId.length > 100
    ) {
      return jsonError("The verification request is not valid.", 400, {
        code: "invalid-request",
      });
    }

    const typedAction = action as ProtectedAction;
    const typedTarget = targetType as TargetType;

    if (
      typedAction === "create" &&
      typedTarget === "country" &&
      targetId !== "new"
    ) {
      return jsonError("The verification request is not valid.", 400, {
        code: "invalid-request",
      });
    }

    // Verify the secret before touching record lookups so a wrong code always
    // produces the same generic response and cannot be used to enumerate IDs.
    if (!verifyAccessCode(code)) {
      await recordVerificationFailure(key);
      return jsonError(
        "Verification failed. Check the access code and try again.",
        401,
        { code: "verification-failed" }
      );
    }

    await clearVerificationFailures(key);

    if (typedAction === "create") {
      if (
        typedTarget !== "country" &&
        !(await targetExists("country", targetId))
      ) {
        return jsonError("The selected country was not found.", 404, {
          code: "not-found",
        });
      }
    } else if (!(await targetExists(typedTarget, targetId))) {
      return jsonError("The selected record was not found.", 404, {
        code: "not-found",
      });
    }

    const grant = await issueEditGrant(
      scopeFor(typedAction, typedTarget, targetId)
    );
    const response = jsonResponse({
      success: true,
      expiresAt: grant.expiresAt,
      ttlSeconds: grant.ttlSeconds,
      csrfToken: grant.csrfToken,
    });
    setAuthCookies(response, req, grant);
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, error.status, { code: error.code });
    }
    return handleApiError(error);
  }
}
