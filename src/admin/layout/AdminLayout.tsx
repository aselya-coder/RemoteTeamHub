import { ReactNode } from "react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminNavbar } from "../components/AdminNavbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Fixed top navbar */}
      <AdminNavbar />

      {/* Sidebar + main content */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-64 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
