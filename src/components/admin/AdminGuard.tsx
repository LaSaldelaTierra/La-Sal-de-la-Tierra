"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    if (loading) return;

    if (!user && !isLoginPage) {
      router.replace("/");
      return;
    }

    if (user && isLoginPage) {
      router.replace("/dashboard/productos");
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-sans text-sm text-earth-light">Cargando…</p>
      </div>
    );
  }

  if (!user && !isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-sans text-sm text-earth-light">Redirigiendo…</p>
      </div>
    );
  }

  if (user && isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="font-sans text-sm text-earth-light">Redirigiendo…</p>
      </div>
    );
  }

  return <>{children}</>;
}
