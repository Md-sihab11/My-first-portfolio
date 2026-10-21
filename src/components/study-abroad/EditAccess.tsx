"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BadgeCheck,
  KeyRound,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Modal, Notice } from "@/components/study-abroad/ui";
import { ApiError, readCsrfCookie, requestJson } from "@/lib/study-abroad/client";
import type {
  ProtectedAction,
  TargetType,
} from "@/lib/study-abroad/types";

export interface VerifyRequest {
  action: ProtectedAction;
  targetType: TargetType;
  targetId: string;
  actionLabel: string;
}

export interface EditGrantInfo {
  csrfToken: string;
  expiresAt: string;
  ttlSeconds: number;
}

interface EditAccessContextValue {
  authorize: (request: VerifyRequest) => Promise<EditGrantInfo | null>;
  revoke: () => Promise<void>;
  clearGrant: () => void;
  grant: EditGrantInfo | null;
  configured: boolean;
}

const EditAccessContext = createContext<EditAccessContextValue | null>(null);

export function useEditAccess(): EditAccessContextValue {
  const context = useContext(EditAccessContext);
  if (!context) {
    throw new Error("useEditAccess must be used inside EditAccessProvider.");
  }
  return context;
}

export function EditAccessProvider({
  configured,
  children,
}: {
  configured: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState<VerifyRequest | null>(null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [grant, setGrant] = useState<EditGrantInfo | null>(null);
  const resolverRef = useRef<
    ((value: EditGrantInfo | null) => void) | null
  >(null);

  const close = useCallback((value: EditGrantInfo | null) => {
    setOpen(false);
    setStatus("idle");
    setError("");
    setCode("");
    setRequest(null);
    const resolver = resolverRef.current;
    resolverRef.current = null;
    resolver?.(value);
  }, []);

  const authorize = useCallback(
    (nextRequest: VerifyRequest) => {
      if (resolverRef.current) {
        resolverRef.current(null);
        resolverRef.current = null;
      }
      setGrant(null);
      setRequest(nextRequest);
      setCode("");
      setError("");
      setStatus("idle");
      setOpen(true);

      return new Promise<EditGrantInfo | null>((resolve) => {
        resolverRef.current = resolve;
      });
    },
    []
  );

  const handleCancel = useCallback(() => {
    if (status === "submitting") return;
    close(null);
  }, [close, status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!request || status === "submitting") return;
    if (!configured) {
      setStatus("error");
      setError("Editing is not configured on this server.");
      return;
    }
    if (!code.trim()) {
      setStatus("error");
      setError("Enter your private access code.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const data = await requestJson<{
        success: true;
        expiresAt: string;
        ttlSeconds: number;
        csrfToken: string;
      }>("/api/study-abroad/auth/verify", {
        method: "POST",
        body: {
          code,
          action: request.action,
          targetType: request.targetType,
          targetId: request.targetId,
        },
      });

      const nextGrant: EditGrantInfo = {
        csrfToken: data.csrfToken || readCsrfCookie() || "",
        expiresAt: data.expiresAt,
        ttlSeconds: data.ttlSeconds,
      };
      setGrant(nextGrant);
      setStatus("success");
      setCode("");
      window.setTimeout(() => close(nextGrant), 550);
    } catch (caught) {
      setStatus("error");
      setCode("");
      if (caught instanceof ApiError) {
        setError(caught.message);
      } else {
        setError(
          "Verification failed. Check the access code and try again."
        );
      }
    }
  };

  const revoke = useCallback(async () => {
    try {
      await requestJson("/api/study-abroad/auth/session", {
        method: "DELETE",
        csrfToken: grant?.csrfToken ?? readCsrfCookie(),
      });
    } catch {
      // The local grant is still cleared. The server grant is short-lived.
    } finally {
      setGrant(null);
    }
  }, [grant]);

  const clearGrant = useCallback(() => setGrant(null), []);

  const expiresLabel = grant
    ? new Date(grant.expiresAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <EditAccessContext.Provider
      value={{ authorize, revoke, clearGrant, grant, configured }}
    >
      {children}

      <Modal
        open={open}
        onClose={handleCancel}
        title="Edit Access Verification"
        description="Enter your private access code to authorize changes to country, city and university information."
        size="sm"
        closeOnOverlay={status !== "submitting"}
        footer={
          <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleCancel}
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-secondary-muted disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-access-form"
              disabled={status === "submitting" || !configured}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-solid px-4 py-2.5 text-sm font-semibold text-accent-text shadow-glow transition-colors hover:bg-accent-solid-hover disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {status === "submitting" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {status === "submitting" ? "Verifying..." : "Verify access"}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {request && (
            <div className="rounded-xl border border-border bg-surface-muted/70 px-3.5 py-3">
              <p className="text-[10px] font-mono uppercase tracking-wider text-secondary-muted">
                Requested action
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary">
                <KeyRound className="h-4 w-4 text-accent" />
                {request.actionLabel}
              </p>
            </div>
          )}

          {!configured && (
            <Notice tone="error" title="Editing is locked on this server">
              The private access code has not been configured. Add the
              server-side environment variables described in{" "}
              <span className="font-mono">STUDY_ABROAD.md</span>, then restart
              the app. No demo code is built into the frontend.
            </Notice>
          )}

          {status === "success" ? (
            <Notice tone="success" title="Access granted">
              Opening the requested action. This permission expires at{" "}
              {expiresLabel ?? "the configured time"} and is valid for this
              action only.
            </Notice>
          ) : (
            <form
              id="edit-access-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="study-abroad-access-code"
                  className="block text-xs font-semibold text-primary"
                >
                  Private access code
                </label>
                <input
                  id="study-abroad-access-code"
                  data-autofocus
                  type="password"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={status === "submitting" || !configured}
                  placeholder="Enter the server access code"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-primary placeholder:text-secondary-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
                />
                <p className="text-[11px] leading-relaxed text-secondary-muted">
                  The code is sent directly to the server and is never saved in
                  browser storage, URLs or this page&apos;s source.
                </p>
              </div>

              {status === "error" && error && (
                <Notice tone="error" title="Verification failed">
                  {error}
                </Notice>
              )}

              <div className="flex items-start gap-2 rounded-lg border border-border/70 bg-surface-muted/50 p-3 text-[11px] leading-relaxed text-secondary">
                <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>
                  A new verification is required for every add, edit or delete
                  action. Successful verification never bypasses the
                  server&apos;s own authorization check.
                </span>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </EditAccessContext.Provider>
  );
}
