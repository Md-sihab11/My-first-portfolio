"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      router.push("/admin");
    }
  }, [session, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      await signIn.social({
        provider: "google",
        callbackURL: "/admin",
      });
    } catch (err: any) {
      console.error("Login attempt failed:", err);
      setError(
        err.message ||
          "Authentication failed. Please verify that your Google account matches OWNER_EMAIL."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6 sm:p-12 text-primary">
      {/* Top back link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md mx-auto my-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-surface border border-border shadow-glow text-accent">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
            Owner Sign In
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            This administration portal is restricted exclusively to the verified portfolio owner.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-glow">
          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading || isPending}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-surface-elevated text-sm font-semibold text-primary hover:border-accent hover:text-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none shadow-sm"
            >
              {/* Official Google 'G' icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? "Redirecting to Google..." : "Continue with Google"}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-xs font-mono text-secondary-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span>Secured with Better Auth & OAuth 2.0</span>
          </div>
        </div>

        <p className="text-center text-xs font-mono text-secondary-muted">
          Only the authorized Google account matching <code>OWNER_EMAIL</code> is granted access.
        </p>
      </div>

      <div className="text-center text-xs font-mono text-secondary-muted">
        © {new Date().getFullYear()} Sihab sharar • Secure Administration
      </div>
    </div>
  );
}
