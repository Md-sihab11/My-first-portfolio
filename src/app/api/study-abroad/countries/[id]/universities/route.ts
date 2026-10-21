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
import { createUniversity } from "@/lib/study-abroad/store";
import { parseUniversityInput } from "@/lib/study-abroad/validation";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: RouteContext) {
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
    const input = parseUniversityInput(body);
    const grant = await authorizeWrite(req, scopeFor("create", "university", id));
    const university = await createUniversity(id, input);

    return finishWrite(
      jsonResponse({ success: true, university }, 201),
      req,
      grant
    );
  } catch (error) {
    return handleApiError(error);
  }
}
