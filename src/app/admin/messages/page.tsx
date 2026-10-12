"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Archive,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  User,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContactMessage } from "@/types/message";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Failed to load messages." });
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (msg: ContactMessage) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, read: !msg.read }),
      });
      if (res.ok) fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setFeedback({ type: "success", message: "Message deleted." });
      fetchMessages();
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Delete failed." });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Communications
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Contact Inquiries & Messages
            </h1>
            <p className="text-xs text-secondary mt-1">
              Private messages submitted through the public contact form and stored in MongoDB Atlas.
            </p>
          </div>
          <span className="text-xs font-mono text-secondary-muted px-3 py-1.5 rounded-lg bg-surface border border-border">
            Total: {messages.length} inquiries
          </span>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-3 ${
              feedback.type === "success"
                ? "bg-accent-subtle border border-accent/40 text-accent"
                : "bg-red-950/40 border border-red-800/60 text-red-300"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Messages List */}
        {messages.length === 0 ? (
          <div className="p-12 rounded-2xl border border-dashed border-border bg-surface text-center">
            <Mail className="w-8 h-8 text-secondary-muted mx-auto mb-3" />
            <p className="text-sm text-primary font-semibold">No messages yet</p>
            <p className="text-xs text-secondary mt-1">
              Submissions through <code>/contact</code> will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 rounded-2xl border transition-all ${
                  msg.read
                    ? "border-border bg-surface"
                    : "border-accent/40 bg-surface-elevated shadow-glow"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-muted text-accent border border-border">
                      {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-accent text-accent-text font-bold">
                            UNREAD
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-accent hover:underline font-mono"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-secondary-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(msg.createdAt)}
                    </span>
                    <button
                      onClick={() => toggleRead(msg)}
                      className="p-1.5 rounded-lg border border-border text-secondary hover:text-primary text-xs font-mono"
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-lg border border-border hover:border-red-500 text-secondary hover:text-red-400"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  {msg.subject && (
                    <div className="text-xs font-mono font-semibold text-primary">
                      Subject: {msg.subject}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed whitespace-pre-line bg-surface-muted p-4 rounded-xl border border-border/60">
                    {msg.message}
                  </p>
                  <div className="pt-1">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                        msg.subject || "Your message to Shakib"
                      )}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
