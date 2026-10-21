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
import { createCountry } from "@/lib/study-abroad/store";
import { parseCountryInput } from "@/lib/study-abroad/validation";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
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

    const body = await readJsonBody(req);
    const input = parseCountryInput(body);
    const grant = await authorizeWrite(req, scopeFor("create", "country", "new"));
    const country = await createCountry(input);

    return finishWrite(
      jsonResponse({ success: true, country }, 201),
      req,
      grant
    );
  } catch (error) {
    return handleApiError(error);
  }
}
