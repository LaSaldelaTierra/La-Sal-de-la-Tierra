import { getCategoryLabel } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface CategoryBadgesProps {
  categoryIds: string[];
  labelBySlug?: ReadonlyMap<string, string>;
  size?: "sm" | "md";
  className?: string;
}

export function CategoryBadges({
  categoryIds,
  labelBySlug,
  size = "sm",
  className,
}: CategoryBadgesProps) {
  if (categoryIds.length === 0) {
    return (
      <span
        className={cn(
          "inline-block rounded-sm bg-sand/30 font-sans text-earth-light",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
          className,
        )}
      >
        Sin categoría
      </span>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {categoryIds.map((id) => (
        <span
          key={id}
          className={cn(
            "inline-block rounded-sm bg-olive/12 font-sans font-medium text-olive",
            size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
          )}
        >
          {getCategoryLabel(id, labelBySlug)}
        </span>
      ))}
    </div>
  );
}
