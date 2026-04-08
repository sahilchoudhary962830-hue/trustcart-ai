import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { LoadingPage } from "./ui/LoadingSpinner";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 ${className ?? ""}`}>{children}</main>
      <Footer />
    </div>
  );
}

interface ProtectedLayoutProps {
  children: ReactNode;
  requireAdmin?: boolean;
  className?: string;
}

export function ProtectedLayout({
  children,
  requireAdmin = false,
  className,
}: ProtectedLayoutProps) {
  const { isAuthenticated, role, hydrated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    } else if (requireAdmin && role !== "admin") {
      navigate({ to: "/dashboard" });
    }
  }, [hydrated, isAuthenticated, role, requireAdmin, navigate]);

  if (!hydrated) return <LoadingPage />;
  if (!isAuthenticated) return <LoadingPage />;
  if (requireAdmin && role !== "admin") return <LoadingPage />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 ${className ?? ""}`}>{children}</main>
      <Footer />
    </div>
  );
}
