# Study Abroad Research Hub

The `/study-abroad` section is a public research workspace with protected writes. Countries, cities and universities are read from managed Postgres. Every add, edit and delete requires a fresh entry of a private access code; the code is never stored in the client bundle.

## 1. Database

Set `DATABASE_URL` in `.env.local` (or in your hosting provider's environment variables), then run:

```bash
psql "$DATABASE_URL" -f scripts/study-abroad-schema.sql
npm run seed:study-abroad
```

The seed script is optional. It loads 6 countries, 12 cities and 12 universities from `src/data/study-abroad-research.ts`. All seeded rows are marked as sample data and remain visibly labelled. Seeded factual gaps render as `Check official website.` rather than invented values.

If the schema is missing, the UI shows a setup notice and all write endpoints return `503`. If `DATABASE_URL` is absent, the site uses the bundled sample data in read-only preview mode.

## 2. Edit credentials

Generate a salted scrypt hash and a session secret:

```bash
npm run hash:study-abroad
```

Add the generated values to `.env.local` (never commit them):

```dotenv
STUDY_ABROAD_ACCESS_CODE_HASH=scrypt:...
STUDY_ABROAD_SESSION_SECRET=...
```

Paste the hash exactly as the generator prints it. The generator uses `:` separators so Next.js does not expand segments such as `$16384` as environment variables.

Optional tuning:

```dotenv
STUDY_ABROAD_EDIT_TTL_MINUTES=10
STUDY_ABROAD_MAX_VERIFY_ATTEMPTS=5
STUDY_ABROAD_VERIFY_WINDOW_MINUTES=10
STUDY_ABROAD_VERIFY_LOCKOUT_MINUTES=15
STUDY_ABROAD_WRITE_LIMIT_PER_MINUTE=120
```

Restart the app after changing environment variables.

## 3. How authorization works

- The plaintext access code is never persisted or logged. Only a salted scrypt hash is read from the server environment.
- A successful verification creates a short-lived, action-scoped grant in `study_abroad_action_grants`. The raw grant token is placed in an `HttpOnly`, `SameSite=Strict` cookie; the database stores only its SHA-256 hash.
- Every write endpoint independently checks the grant, scope, expiry, CSRF token and request origin.
- The grant is consumed atomically by the first write. It cannot be reused for another action.
- Deletion shows a confirmation dialog after verification. The delete request is sent only after the user confirms.
- Verification failures are rate-limited in Postgres, so limits survive serverless cold starts and multiple instances.
- The client "Lock now" action calls `DELETE /api/study-abroad/auth/session`, which revokes the current grant server-side.
- A read-only `proxy.ts` checks country and university slugs before rendering, so unknown study-abroad URLs return a real `404` instead of a streamed soft `404`. It never authorizes writes; every write still passes the checks above.

Important limitation: this is a single shared private edit code, not a multi-user account system. If you need per-person audit trails, add an identity provider and per-user roles.

## 4. Routes

Public:

- `/study-abroad` - searchable country hub, roadmap, resources and FAQ
- `/study-abroad/[countrySlug]` - country research file
- `/study-abroad/[countrySlug]/[universitySlug]` - university research file

Protected writes:

- `POST/PATCH/DELETE /api/study-abroad/countries...`
- `POST/PATCH/DELETE /api/study-abroad/cities...`
- `POST/PATCH/DELETE /api/study-abroad/universities...`
- `POST /api/study-abroad/auth/verify`
- `DELETE /api/study-abroad/auth/session`

## 5. Data accuracy

This is a research workspace, not legal or immigration advice. Official links are stored per country section and per university. Items without a verified value intentionally display `Check official website.` Confirm all fees, deadlines, visa rules and document requirements on the linked official source before acting.
