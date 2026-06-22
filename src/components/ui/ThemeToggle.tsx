"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const moonIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const sunIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-sm border border-sand/40 bg-cream/80 text-earth transition-colors hover:border-earth/30 hover:bg-warm-beige/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive",
        className,
      )}
      aria-label={
        mounted
          ? theme === "dark"
            ? "Activar modo claro"
            : "Activar modo oscuro"
          : "Cambiar tema"
      }
      title={mounted ? (theme === "dark" ? "Modo claro" : "Modo oscuro") : "Cambiar tema"}
    >
      <span className="relative h-[18px] w-[18px]">
        <span className={cn("absolute inset-0 transition-opacity", mounted && theme === "dark" ? "opacity-0" : "opacity-100")}>
          {moonIcon}
        </span>
        <span className={cn("absolute inset-0 transition-opacity", mounted && theme === "dark" ? "opacity-100" : "opacity-0")}>
          {sunIcon}
        </span>
      </span>
    </button>
  );
}
