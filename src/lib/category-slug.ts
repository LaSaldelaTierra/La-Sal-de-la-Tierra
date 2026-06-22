import { normalizeSearchText } from "@/lib/products-utils";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Genera slug URL-safe a partir de un nombre legible. */
export function slugifyCategoryName(name: string): string {
  return normalizeSearchText(name)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isValidCategorySlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}
