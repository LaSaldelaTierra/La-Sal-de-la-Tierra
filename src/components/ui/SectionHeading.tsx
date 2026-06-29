import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  className?: string;
  eyebrowClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "light",
  className,
  eyebrowClassName = "",
}: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.25em]",
            isDark ? "text-olive/90" : "text-olive",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-[1.65rem] font-medium leading-[1.15] min-[375px]:text-3xl sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-cream" : "text-earth"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 font-sans text-base leading-relaxed sm:text-lg",
            isDark ? "text-cream/65" : "text-earth-light"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
