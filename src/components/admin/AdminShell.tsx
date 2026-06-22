"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ADMIN_LINKS = [
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
] as const;

interface AdminShellProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminShell({ title, description, action, children }: AdminShellProps) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

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
            <Button variant="outline" size="sm" onClick={() => void signOut()}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav
          className="mb-6 flex flex-wrap gap-2 border-b border-sand/30 pb-4"
          aria-label="Secciones de administración"
        >
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-sm px-3 py-1.5 font-sans text-sm transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-earth text-cream"
                  : "text-earth-light hover:bg-warm-beige/60 hover:text-earth",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

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
