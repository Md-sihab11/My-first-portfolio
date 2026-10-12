import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export function getNormalizedOwnerEmail(): string {
  const email = process.env.OWNER_EMAIL || "";
  return email.trim().toLowerCase();
}

export function isOwnerEmail(candidate?: string | null): boolean {
  const owner = getNormalizedOwnerEmail();
  if (!owner || !candidate) return false;
  return candidate.trim().toLowerCase() === owner;
}

export async function getOwnerSession() {
  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session || !session.user || !session.user.email) {
      return null;
    }

    if (!isOwnerEmail(session.user.email)) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("[Auth] getOwnerSession error:", error);
    return null;
  }
}

/**
 * Server-side guard for Admin React Server Components and pages.
 * Redirects unauthorized visitors directly to /admin/login.
 */
export async function requireOwnerPage() {
  const session = await getOwnerSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

/**
 * Server-side guard for API Route Handlers and mutations.
 * Returns an error object or null if authorized.
 */
export async function requireOwnerApi() {
  const session = await getOwnerSession();
  if (!session) {
    return {
      authorized: false,
      response: {
        error: "Unauthorized: Access is restricted exclusively to the verified owner.",
        status: 401,
      },
    };
  }
  return { authorized: true, session };
}
