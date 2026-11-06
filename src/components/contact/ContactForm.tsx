"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try emailing directly.");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      {status === "success" ? (
        <div className="p-8 text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-accent-subtle text-accent border border-accent/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-primary">Message Received</h3>
          <p className="text-sm text-secondary max-w-md mx-auto">
            Thank you for reaching out! Your message was validated and recorded. I&apos;ll get back to you at your email address as soon as possible.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus("idle")}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center gap-3 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-secondary mb-1.5">
                Your Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Md Karim Uddin"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-muted text-sm text-primary placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-secondary mb-1.5">
                Your Email *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-muted text-sm text-primary placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-mono uppercase text-secondary mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Project inquiry / Internship / Job"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-muted text-sm text-primary placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-secondary mb-1.5">
              Message *
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project, idea, or role..."
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-muted text-sm text-primary placeholder:text-secondary-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={status === "loading"}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4" />
            <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
          </Button>
        </form>
      )}
    </div>
  );
}
