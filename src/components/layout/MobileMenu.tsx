"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navHeight: number;
}

export function MobileMenu({ open, onClose, navHeight }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  useBodyScrollLock(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-40 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-earth/15 transition-opacity duration-500 ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        aria-label="Cerrar menú"
        tabIndex={open ? 0 : -1}
      />

      <nav
        id="mobile-menu"
        aria-label="Menú móvil"
        style={{ top: navHeight }}
        className={cn(
          "absolute inset-x-0 border-b border-sand/25 bg-cream/97 shadow-[0_16px_48px_-16px_rgba(74,54,40,0.14)] backdrop-blur-md transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        )}
      >
        <ul className="mx-auto max-w-7xl px-5 py-6 pb-8 sm:px-6">
          {NAV_LINKS.map((link, index) => (
            <li
              key={link.href}
              className={cn(
                "border-b border-sand/20 last:border-b-0",
                "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="flex min-h-12 items-center py-3 font-sans text-[15px] font-medium tracking-wide text-earth/85 transition-colors duration-300 hover:text-earth active:text-earth-dark"
              >
                <span className="mr-4 font-sans text-[10px] font-semibold tabular-nums text-olive/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            </li>
          ))}

          <li
            className={cn(
              "pt-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
            style={{
              transitionDelay: open
                ? `${80 + NAV_LINKS.length * 45}ms`
                : "0ms",
            }}
          >
            <Link
              href="#contacto"
              onClick={onClose}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-earth/20 bg-earth px-6 py-3 font-sans text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-earth hover:bg-earth-dark sm:w-auto sm:min-w-[200px]"
            >
              Escríbenos
            </Link>
          </li>
        </ul>
      </nav>
    </div>,
    document.body,
  );
}
