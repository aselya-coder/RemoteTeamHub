import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  noBottomPadding?: boolean;
}

export function PageLayout({ children, noBottomPadding = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 pt-24 ${noBottomPadding ? "" : "pb-16"}`}>{children}</main>
      <Footer />
    </div>
  );
}
