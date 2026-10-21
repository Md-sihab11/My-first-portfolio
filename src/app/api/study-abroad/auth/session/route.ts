import {
  AuthError,
  checkCsrfToken,
  checkRequestOrigin,
  clearAuthCookies,
  markGrantRevoked,
  readEditGrant,
} from "@/lib/study-abroad/auth";
import {
  handleApiError,
  jsonError,
  jsonResponse,
} from "@/lib/study-abroad/api-utils";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    checkRequestOrigin(req);
    const grant = readEditGrant(req);

    if (grant) {
      checkCsrfToken(req);
      await markGrantRevoked(grant);
    }

    const response = jsonResponse({ success: true, revoked: Boolean(grant) });
    clearAuthCookies(response, req);
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, error.status, { code: error.code });
    }
    return handleApiError(error);
  }
}
