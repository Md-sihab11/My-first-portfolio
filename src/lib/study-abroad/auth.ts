import {
  createHash,
  createHmac,
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { NextResponse } from "next/server";
import { assertSchemaReady, getDb } from "@/lib/study-abroad/db";

export const GRANT_COOKIE = "sa_edit_grant";
export const CSRF_COOKIE = "sa_csrf";
const GRANT_PATH = "/api/study-abroad";

interface GrantPayload {
  v: 1;
  scope: string;
  jti: string;
  iat: number;
  exp: number;
}

export interface EditGrant {
  payload: GrantPayload;
  csrfToken: string;
  expiresAt: string;
  ttlSeconds: number;
}

export class AuthError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
    this.code = code;
  }
}

function getAccessCodeHash(): string | null {
  const value = process.env.STUDY_ABROAD_ACCESS_CODE_HASH?.trim();
  return value || null;
}

function getSessionSecret(): string | null {
  const value = process.env.STUDY_ABROAD_SESSION_SECRET?.trim();
  if (!value || value.length < 32) return null;
  return value;
}

function parseHash(value: string): {
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  hash: Buffer;
} | null {
  // Accept both "$" and ":" separators. ":" avoids dotenv variable expansion
  // problems when the hash is stored in a local .env file.
  const separator = value.includes("$") ? "$" : ":";
  const parts = value.split(separator);
  if (parts.length !== 6 || parts[0] !== "scrypt") return null;

  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  if (
    !Number.isInteger(N) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    N < 2 ||
    N > 1_048_576 ||
    (N & (N - 1)) !== 0 ||
    r < 1 ||
    r > 32 ||
    p < 1 ||
    p > 16
  ) {
    return null;
  }

  try {
    const salt = Buffer.from(parts[4], "hex");
    const hash = Buffer.from(parts[5], "hex");
    if (salt.length < 8 || hash.length < 32) return null;
    return { N, r, p, salt, hash };
  } catch {
    return null;
  }
}

export function isStudyAbroadEditConfigured(): boolean {
  const hash = getAccessCodeHash();
  const secret = getSessionSecret();
  return Boolean(hash && secret && parseHash(hash));
}

export function verifyAccessCode(code: string): boolean {
  const configuredHash = getAccessCodeHash();
  if (!configuredHash || !code || code.length > 512) return false;

  const parsed = parseHash(configuredHash);
  if (!parsed) return false;

  try {
    const candidate = scryptSync(
      code.normalize("NFKC"),
      parsed.salt,
      parsed.hash.length,
      {
        cost: parsed.N,
        blockSize: parsed.r,
        parallelization: parsed.p,
        maxmem: 128 * 1024 * 1024,
      }
    );
    return timingSafeEqual(candidate, parsed.hash);
  } catch {
    return false;
  }
}

export function getGrantTtlSeconds(): number {
  const configured = Number(process.env.STUDY_ABROAD_EDIT_TTL_MINUTES);
  if (!Number.isFinite(configured)) return 10 * 60;
  const minutes = Math.min(60, Math.max(1, Math.floor(configured)));
  return minutes * 60;
}

function base64Url(value: Buffer | string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function signPayload(payload: string, secret: string): string {
  return base64Url(createHmac("sha256", secret).update(payload).digest());
}

function safeEqualStrings(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function createSignaturePayload(payload: GrantPayload, secret: string): string {
  const encoded = base64Url(JSON.stringify(payload));
  return `${encoded}.${signPayload(encoded, secret)}`;
}

function hashGrantToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function issueEditGrant(scope: string): Promise<EditGrant> {
  const secret = getSessionSecret();
  if (!secret || !isStudyAbroadEditConfigured()) {
    throw new AuthError(
      "Editing is not configured on this server.",
      503,
      "not-configured"
    );
  }

  const db = getDb();
  await assertSchemaReady(db);

  const ttlSeconds = getGrantTtlSeconds();
  const iat = Date.now();
  const payload: GrantPayload = {
    v: 1,
    scope,
    jti: randomBytes(18).toString("hex"),
    iat,
    exp: iat + ttlSeconds * 1000,
  };

  await db`
    INSERT INTO study_abroad_action_grants
      (id, token_hash, scope, expires_at)
    VALUES (
      ${randomUUID()},
      ${hashGrantToken(payload.jti)},
      ${scope},
      ${new Date(payload.exp).toISOString()}
    )
  `;

  // Housekeeping: remove grants that have been expired for more than a day.
  await db`
    DELETE FROM study_abroad_action_grants
    WHERE expires_at < now() - interval '1 day'
  `;

  return {
    payload,
    csrfToken: randomBytes(32).toString("hex"),
    expiresAt: new Date(payload.exp).toISOString(),
    ttlSeconds,
  };
}

export async function markGrantUsed(grant: EditGrant): Promise<void> {
  const db = getDb();
  await db`
    UPDATE study_abroad_action_grants
    SET used_at = now()
    WHERE token_hash = ${hashGrantToken(grant.payload.jti)}
      AND used_at IS NULL
  `;
}

export async function markGrantRevoked(grant: EditGrant): Promise<void> {
  const db = getDb();
  await db`
    UPDATE study_abroad_action_grants
    SET revoked_at = now()
    WHERE token_hash = ${hashGrantToken(grant.payload.jti)}
      AND revoked_at IS NULL
  `;
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  const result: Record<string, string> = {};
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const name = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!name) continue;
    try {
      result[name] = decodeURIComponent(value);
    } catch {
      result[name] = value;
    }
  }
  return result;
}

export function getCookie(req: Request, name: string): string | null {
  return parseCookies(req.headers.get("cookie"))[name] ?? null;
}

function parseGrant(req: Request): EditGrant | null {
  const raw = getCookie(req, GRANT_COOKIE);
  const secret = getSessionSecret();
  if (!raw || !secret) return null;

  const [encoded, signature] = raw.split(".");
  if (!encoded || !signature) return null;
  if (!safeEqualStrings(signPayload(encoded, secret), signature)) return null;

  try {
    const decoded = Buffer.from(
      encoded.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString("utf8");
    const payload = JSON.parse(decoded) as GrantPayload;
    if (
      payload.v !== 1 ||
      typeof payload.scope !== "string" ||
      typeof payload.jti !== "string" ||
      typeof payload.iat !== "number" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    const now = Date.now();
    if (payload.exp <= now || payload.iat > now + 60_000) return null;

    const csrfToken = getCookie(req, CSRF_COOKIE);
    if (!csrfToken) return null;

    return {
      payload,
      csrfToken,
      expiresAt: new Date(payload.exp).toISOString(),
      ttlSeconds: Math.max(0, Math.floor((payload.exp - now) / 1000)),
    };
  } catch {
    return null;
  }
}

function requestProtocol(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  try {
    return new URL(req.url).protocol.replace(":", "");
  } catch {
    return "http";
  }
}

function shouldUseSecureCookies(req: Request): boolean {
  const forced = process.env.STUDY_ABROAD_COOKIE_SECURE?.trim().toLowerCase();
  if (forced === "true") return true;
  if (forced === "false") return false;
  return requestProtocol(req) === "https";
}

function cookieAttributes(
  req: Request,
  options: { path: string; maxAge: number; httpOnly: boolean }
): string {
  const attributes = [
    `Path=${options.path}`,
    `Max-Age=${options.maxAge}`,
    "SameSite=Strict",
  ];
  if (options.httpOnly) attributes.push("HttpOnly");
  if (shouldUseSecureCookies(req)) attributes.push("Secure");
  return attributes.join("; ");
}

export function setAuthCookies(
  response: NextResponse,
  req: Request,
  grant: EditGrant
): void {
  const grantCookie = `${GRANT_COOKIE}=${encodeURIComponent(
    createSignaturePayload(grant.payload, getSessionSecret() as string)
  )}; ${cookieAttributes(req, {
    path: GRANT_PATH,
    maxAge: grant.ttlSeconds,
    httpOnly: true,
  })}`;

  const csrfCookie = `${CSRF_COOKIE}=${encodeURIComponent(
    grant.csrfToken
  )}; ${cookieAttributes(req, {
    path: "/",
    maxAge: grant.ttlSeconds,
    httpOnly: false,
  })}`;

  response.headers.append("Set-Cookie", grantCookie);
  response.headers.append("Set-Cookie", csrfCookie);
}

export function clearAuthCookies(
  response: NextResponse,
  req: Request
): void {
  response.headers.append(
    "Set-Cookie",
    `${GRANT_COOKIE}=; ${cookieAttributes(req, {
      path: GRANT_PATH,
      maxAge: 0,
      httpOnly: true,
    })}`
  );
  response.headers.append(
    "Set-Cookie",
    `${CSRF_COOKIE}=; ${cookieAttributes(req, {
      path: "/",
      maxAge: 0,
      httpOnly: false,
    })}`
  );
}

export function checkRequestOrigin(req: Request): void {
  const origin = req.headers.get("origin");
  if (!origin) return;

  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    req.headers.get("host");
  if (!host) {
    throw new AuthError(
      "The request origin could not be verified.",
      403,
      "origin-rejected"
    );
  }

  try {
    const parsed = new URL(origin);
    if (parsed.host !== host) {
      throw new AuthError(
        "The request origin could not be verified.",
        403,
        "origin-rejected"
      );
    }
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError(
      "The request origin could not be verified.",
      403,
      "origin-rejected"
    );
  }
}

export function checkCsrfToken(req: Request): void {
  const header = req.headers.get("x-csrf-token");
  const cookie = getCookie(req, CSRF_COOKIE);
  if (
    !header ||
    !cookie ||
    header.length > 256 ||
    !safeEqualStrings(header, cookie)
  ) {
    throw new AuthError(
      "The request could not be verified. Refresh the page and try again.",
      403,
      "csrf-failed"
    );
  }
}

export function readEditGrant(req: Request): EditGrant | null {
  return parseGrant(req);
}

export async function authorizeWrite(
  req: Request,
  expectedScope: string
): Promise<EditGrant> {
  if (!isStudyAbroadEditConfigured()) {
    throw new AuthError(
      "Editing is not configured on this server.",
      503,
      "not-configured"
    );
  }

  checkRequestOrigin(req);
  checkCsrfToken(req);

  const grant = parseGrant(req);
  if (!grant) {
    throw new AuthError(
      "Edit permission is missing or has expired. Verify the access code again.",
      401,
      "verification-required"
    );
  }

  if (grant.payload.scope !== expectedScope) {
    throw new AuthError(
      "This edit permission is not valid for the requested action. Verify the access code again.",
      403,
      "scope-mismatch"
    );
  }

  const db = getDb();
  await assertSchemaReady(db);

  const rows = await db<{ id: string }[]>`
    UPDATE study_abroad_action_grants
    SET used_at = now()
    WHERE token_hash = ${hashGrantToken(grant.payload.jti)}
      AND scope = ${expectedScope}
      AND used_at IS NULL
      AND revoked_at IS NULL
      AND expires_at > now()
    RETURNING id
  `;

  if (!rows[0]) {
    throw new AuthError(
      "Edit permission is missing or has expired. Verify the access code again.",
      401,
      "verification-required"
    );
  }

  return grant;
}

export function finishWrite(
  response: NextResponse,
  req: Request,
  _grant: EditGrant
): NextResponse {
  clearAuthCookies(response, req);
  return response;
}
