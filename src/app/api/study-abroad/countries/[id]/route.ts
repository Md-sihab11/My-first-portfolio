import {
  authorizeWrite,
  finishWrite,
} from "@/lib/study-abroad/auth";
import {
  handleApiError,
  jsonError,
  jsonResponse,
  readJsonBody,
  scopeFor,
} from "@/lib/study-abroad/api-utils";
import {
  checkWriteRateLimit,
  getClientKey,
} from "@/lib/study-abroad/rate-limit";
import { deleteCountry, updateCountry } from "@/lib/study-abroad/store";
import { parseCountryInput } from "@/lib/study-abroad/validation";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const limit = await checkWriteRateLimit(getClientKey(req, "write"));
    if (!limit.allowed) {
      const response = jsonError(
        "Too many save requests. Wait a minute and try again.",
        429,
        { code: "rate-limited" }
      );
      if (limit.retryAfterSeconds) {
        response.headers.set("Retry-After", String(limit.retryAfterSeconds));
      }
      return response;
    }

    const { id } = await params;
    const body = await readJsonBody(req);
    const input = parseCountryInput(body);
    const grant = await authorizeWrite(req, scopeFor("update", "country", id));
    const country = await updateCountry(id, input);

    return finishWrite(
      jsonResponse({ success: true, country }),
      req,
      grant
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const limit = await checkWriteRateLimit(getClientKey(req, "write"));
    if (!limit.allowed) {
      const response = jsonError(
        "Too many save requests. Wait a minute and try again.",
        429,
        { code: "rate-limited" }
      );
      if (limit.retryAfterSeconds) {
        response.headers.set("Retry-After", String(limit.retryAfterSeconds));
      }
      return response;
    }

    const { id } = await params;
    const grant = await authorizeWrite(req, scopeFor("delete", "country", id));
    const result = await deleteCountry(id);

    return finishWrite(
      jsonResponse({
        success: true,
        deleted: result.country,
        cities: result.cities,
        universities: result.universities,
      }),
      req,
      grant
    );
  } catch (error) {
    return handleApiError(error);
  }
}
