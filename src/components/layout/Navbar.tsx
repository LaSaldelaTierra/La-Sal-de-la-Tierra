"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setNavHeight(headerRef.current.offsetHeight);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled, menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[border-color,background-color,box-shadow] duration-500",
          scrolled || menuOpen
            ? "border-sand/30 bg-cream/90 shadow-[0_1px_0_rgba(107,79,58,0.04)] backdrop-blur-xl"
            : "border-transparent bg-cream/0"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:gap-6 sm:px-6 sm:py-4 lg:px-8"
          aria-label="Navegación principal"
        >
          <BrandLogo size="sm" onClick={menuOpen ? closeMenu : undefined} />

          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link font-sans text-[13px] font-medium tracking-wide text-earth/75"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              href="#contacto"
              className="nav-cta rounded-sm border border-earth/20 bg-earth px-5 py-2.5 font-sans text-[13px] font-medium tracking-wide text-cream transition-all duration-300 hover:border-earth hover:bg-earth-dark"
            >
              Escríbenos
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle className="h-11 w-11" />
            <button
              type="button"
              className="relative z-[60] -mr-1 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-sm transition-colors active:bg-warm-beige/50"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
            <span
              className={cn(
                "block h-px w-5 bg-earth transition-all duration-300",
                menuOpen && "translate-y-[5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-earth transition-all duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-earth transition-all duration-300",
                menuOpen && "-translate-y-[5px] -rotate-45"
              )}
            />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        navHeight={navHeight}
      />
    </>
  );
}
