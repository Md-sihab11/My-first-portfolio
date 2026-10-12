import React from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-primary">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
}
