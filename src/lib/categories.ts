import { isValidCategorySlug } from "@/lib/category-slug";

export function getCategoryLabel(
  slug: string,
  labelBySlug?: ReadonlyMap<string, string>,
): string {
  return labelBySlug?.get(slug) ?? slug.replace(/-/g, " ");
}

export function getPrimaryCategoryLabel(
  categoryIds: string[],
  labelBySlug?: ReadonlyMap<string, string>,
): string {
  if (categoryIds.length === 0) return "Artesanal";
  return getCategoryLabel(categoryIds[0], labelBySlug);
}

export function parseCategoriesFromFirestore(data: Record<string, unknown>): string[] {
  const fromArray = Array.isArray(data.categories)
    ? data.categories.filter((item): item is string => typeof item === "string")
    : [];

  const normalized = fromArray
    .map((slug) => slug.trim().toLowerCase())
    .filter((slug) => isValidCategorySlug(slug));

  if (normalized.length > 0) {
    return [...new Set(normalized)];
  }

  if (typeof data.categoria === "string" && data.categoria.trim()) {
    const legacySlug = data.categoria.trim().toLowerCase().replace(/\s+/g, "-");
    return isValidCategorySlug(legacySlug) ? [legacySlug] : [];
  }

  return [];
}
