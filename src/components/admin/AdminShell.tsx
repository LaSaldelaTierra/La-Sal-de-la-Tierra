"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

interface AdminShellProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminShell({ title, description, action, children }: AdminShellProps) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-sand/40 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
              Administración
            </p>
            <h1 className="font-serif text-2xl font-medium text-earth">{SITE.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="font-sans text-sm text-earth-light transition-colors hover:text-earth"
            >
              Ver sitio
            </Link>
            {user?.email && (
              <span className="hidden font-sans text-sm text-earth-light sm:inline">
                {user.email}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-medium text-earth">{title}</h2>
            {description && (
              <p className="mt-2 font-sans text-sm text-earth-light">{description}</p>
            )}
          </div>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}
