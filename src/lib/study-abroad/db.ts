import postgres from "postgres";

export type StudyAbroadDb = postgres.Sql;
export type StudyAbroadTx = postgres.TransactionSql;

const globalForStudyAbroad = globalThis as unknown as {
  studyAbroadSql?: StudyAbroadDb;
};

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("Study Abroad database is not configured.");
    this.name = "DatabaseNotConfiguredError";
  }
}

export class SchemaNotReadyError extends Error {
  constructor() {
    super("Study Abroad database schema is not initialized.");
    this.name = "SchemaNotReadyError";
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0
  );
}

export function getDb(): StudyAbroadDb {
  if (!isDatabaseConfigured()) {
    throw new DatabaseNotConfiguredError();
  }

  if (!globalForStudyAbroad.studyAbroadSql) {
    globalForStudyAbroad.studyAbroadSql = postgres(
      process.env.DATABASE_URL as string,
      {
        max: 2,
        idle_timeout: 20,
        connect_timeout: 10,
        prepare: false,
      }
    );
  }

  return globalForStudyAbroad.studyAbroadSql;
}

export async function isSchemaReady(
  db: StudyAbroadDb | StudyAbroadTx = getDb()
): Promise<boolean> {
  const rows = await db<{ table_name: string | null }[]>`
    SELECT to_regclass('public.study_abroad_countries')::text AS table_name
  `;

  return Boolean(rows[0]?.table_name);
}

export async function assertSchemaReady(
  db: StudyAbroadDb | StudyAbroadTx = getDb()
): Promise<void> {
  if (!(await isSchemaReady(db))) {
    throw new SchemaNotReadyError();
  }
}
