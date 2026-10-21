import { randomUUID } from "node:crypto";
import { assertSchemaReady, getDb } from "@/lib/study-abroad/db";

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.floor(parsed);
}

function verificationPolicy() {
  return {
    maxAttempts: positiveInteger(
      process.env.STUDY_ABROAD_MAX_VERIFY_ATTEMPTS,
      5
    ),
    windowSeconds:
      positiveInteger(process.env.STUDY_ABROAD_VERIFY_WINDOW_MINUTES, 10) *
      60,
    lockoutSeconds:
      positiveInteger(process.env.STUDY_ABROAD_VERIFY_LOCKOUT_MINUTES, 15) *
      60,
  };
}

export function getClientKey(req: Request, prefix: string): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address =
    forwarded ||
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("cf-connecting-ip")?.trim() ||
    "unknown";
  return `${prefix}:${address}`;
}

export async function checkVerificationRateLimit(key: string): Promise<{
  allowed: boolean;
  retryAfterSeconds?: number;
  remaining?: number;
}> {
  const policy = verificationPolicy();
  const db = getDb();
  await assertSchemaReady(db);

  const rows = await db<
    { count: number; last_attempt: Date | string | null }[]
  >`
    SELECT
      count(*)::int AS count,
      max(created_at) AS last_attempt
    FROM study_abroad_rate_events
    WHERE kind = 'verify-failure'
      AND client_key = ${key}
      AND created_at > now() - make_interval(secs => ${policy.windowSeconds})
  `;

  const count = Number(rows[0]?.count ?? 0);
  if (count < policy.maxAttempts) {
    return {
      allowed: true,
      remaining: Math.max(0, policy.maxAttempts - count),
    };
  }

  const lastAttempt = rows[0]?.last_attempt
    ? new Date(rows[0].last_attempt).getTime()
    : 0;
  const retryAfterSeconds = Math.ceil(
    (lastAttempt + policy.lockoutSeconds * 1000 - Date.now()) / 1000
  );

  if (retryAfterSeconds > 0) {
    return { allowed: false, retryAfterSeconds };
  }

  // The lockout has elapsed. Clear the old failure window so the next
  // attempt is treated as a fresh window.
  await db`
    DELETE FROM study_abroad_rate_events
    WHERE kind = 'verify-failure' AND client_key = ${key}
  `;

  return { allowed: true, remaining: policy.maxAttempts };
}

export async function recordVerificationFailure(
  key: string
): Promise<void> {
  const db = getDb();
  await assertSchemaReady(db);

  await db`
    INSERT INTO study_abroad_rate_events (id, kind, client_key)
    VALUES (${randomUUID()}, 'verify-failure', ${key})
  `;

  await db`
    DELETE FROM study_abroad_rate_events
    WHERE created_at < now() - interval '1 day'
  `;
}

export async function clearVerificationFailures(
  key: string
): Promise<void> {
  const db = getDb();
  await assertSchemaReady(db);

  await db`
    DELETE FROM study_abroad_rate_events
    WHERE kind = 'verify-failure' AND client_key = ${key}
  `;
}

export async function checkWriteRateLimit(key: string): Promise<{
  allowed: boolean;
  retryAfterSeconds?: number;
}> {
  const db = getDb();
  await assertSchemaReady(db);
  const limit = positiveInteger(
    process.env.STUDY_ABROAD_WRITE_LIMIT_PER_MINUTE,
    120
  );

  const rows = await db<{ count: number; last_attempt: Date | string | null }[]>`
    SELECT
      count(*)::int AS count,
      max(created_at) AS last_attempt
    FROM study_abroad_rate_events
    WHERE kind = 'write'
      AND client_key = ${key}
      AND created_at > now() - interval '1 minute'
  `;

  const count = Number(rows[0]?.count ?? 0);
  if (count >= limit) {
    const lastAttempt = rows[0]?.last_attempt
      ? new Date(rows[0].last_attempt).getTime()
      : Date.now();
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((lastAttempt + 60_000 - Date.now()) / 1000)
      ),
    };
  }

  await db`
    INSERT INTO study_abroad_rate_events (id, kind, client_key)
    VALUES (${randomUUID()}, 'write', ${key})
  `;

  await db`
    DELETE FROM study_abroad_rate_events
    WHERE created_at < now() - interval '1 day'
  `;

  return { allowed: true };
}
