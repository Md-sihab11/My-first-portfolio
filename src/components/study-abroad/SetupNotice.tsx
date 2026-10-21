import Link from "next/link";
import { Database, FileCode2 } from "lucide-react";

export function StudyAbroadSetupNotice({
  databaseConfigured,
}: {
  databaseConfigured: boolean;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent-subtle text-accent">
          <Database className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
            Database setup required
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            The research hub is not ready yet
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary">
            {databaseConfigured
              ? "A database connection is configured, but the Study Abroad tables are missing. Run the schema and seed scripts, then reload this page."
              : "No database is configured. Add DATABASE_URL to the server environment to enable saved countries, cities and universities."}
          </p>

          <ol className="mt-5 space-y-3 text-sm text-secondary">
            <li className="flex gap-3">
              <span className="font-mono text-xs text-accent">01</span>
              <span>
                Run{" "}
                <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-primary">
                  scripts/study-abroad-schema.sql
                </code>{" "}
                against your managed Postgres database.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-accent">02</span>
              <span>
                Seed the sample records with{" "}
                <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-primary">
                  npm run seed:study-abroad
                </code>{" "}
                (optional).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-xs text-accent">03</span>
              <span>
                Add the edit credentials from{" "}
                <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-primary">
                  node scripts/hash-study-abroad-code.mjs
                </code>{" "}
                to the server environment.
              </span>
            </li>
          </ol>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/study-abroad"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-solid px-4 py-2.5 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-solid-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Reload the hub
            </Link>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-xs text-secondary">
              <FileCode2 className="h-4 w-4 text-accent" />
              Setup details are in STUDY_ABROAD.md
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
