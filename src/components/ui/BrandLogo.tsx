import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  showName?: boolean;
  size?: "sm" | "md" | "lg";
  brandText?: string;
  className?: string;
  onClick?: () => void;
}

const sizes = {
  sm: { image: 40, text: "text-sm max-[360px]:hidden sm:text-[15px]" },
  md: { image: 52, text: "text-base sm:text-lg" },
  lg: { image: 64, text: "text-xl sm:text-2xl" },
};

export function BrandLogo({
  showName = true,
  size = "md",
  brandText,
  className,
  onClick,
}: BrandLogoProps) {
  const { image, text } = sizes[size];
  const label = brandText ?? SITE.name;

  return (
    <Link
      href="#inicio"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
      aria-label={`${label} — Ir al inicio`}
    >
      <div
        className="relative shrink-0 overflow-hidden rounded-full"
        style={{
          width: image,
          height: image,
        }}
      >
        <Image
          src={SITE.logo}
          alt="La Sal de la Tierra"
          fill
          className="object-contain"
          priority={size !== "sm"}
        />
      </div>

      {showName && (
        <span
          className={cn(
            "font-serif font-medium leading-tight tracking-tight text-earth",
            text
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}