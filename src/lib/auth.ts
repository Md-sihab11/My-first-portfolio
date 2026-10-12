import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "portfolio";

// Cached client for Better Auth
let client: MongoClient | null = null;
if (uri) {
  client = new MongoClient(uri);
} else {
  // Safe mock client during build time if MONGODB_URI is not yet configured
  client = new MongoClient("mongodb://127.0.0.1:27017/portfolio_build_placeholder");
}

const db = client.db(dbName);

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "fallback_secret_key_minimum_32_characters_long_for_security_testing",

  database: mongodbAdapter(db, { client }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ownerEmail = (process.env.OWNER_EMAIL || "").trim().toLowerCase();
          const candidateEmail = (user.email || "").trim().toLowerCase();

          if (!ownerEmail) {
            throw new Error(
              "Forbidden: OWNER_EMAIL environment variable is not configured."
            );
          }

          if (candidateEmail !== ownerEmail) {
            throw new Error(
              `Forbidden: Authentication is restricted exclusively to the designated owner (${ownerEmail}).`
            );
          }
        },
      },
    },
  },
});
