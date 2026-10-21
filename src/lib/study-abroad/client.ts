export class ApiError extends Error {
  status: number;
  code?: string;
  fieldErrors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    code?: string,
    fieldErrors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

export function readCsrfCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    /(?:^|;\s*)sa_csrf=([^;]+)/
  );
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export async function requestJson<T>(
  url: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown;
    csrfToken?: string | null;
  } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  const csrfToken = options.csrfToken ?? readCsrfCookie();
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? "GET",
      credentials: "same-origin",
      cache: "no-store",
      headers,
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(
      "The server could not be reached. Check your connection and try again.",
      0,
      "network-error"
    );
  }

  let data: Record<string, unknown> = {};
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    data = {};
  }

  if (!response.ok) {
    const message =
      typeof data.error === "string"
        ? data.error
        : "The operation could not be completed.";
    throw new ApiError(
      message,
      response.status,
      typeof data.code === "string" ? data.code : undefined,
      data.fieldErrors && typeof data.fieldErrors === "object"
        ? (data.fieldErrors as Record<string, string>)
        : undefined
    );
  }

  return data as T;
}

export function isVerificationError(error: unknown): boolean {
  return (
    error instanceof ApiError &&
    (error.status === 401 ||
      error.code === "verification-required" ||
      error.code === "verification-expired" ||
      error.code === "csrf-failed")
  );
}
