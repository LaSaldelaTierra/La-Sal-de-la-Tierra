import type { Product, Producto } from "@/types/product";
import { getPrimaryCategoryLabel } from "@/lib/categories";
import { parseCategoriesFromFirestore } from "@/lib/categories";

export function mapProductoToProduct(
  producto: Producto,
  labelBySlug?: ReadonlyMap<string, string>,
): Product {
  return {
    id: producto.id,
    name: producto.nombre,
    description: producto.descripcion,
    category: getPrimaryCategoryLabel(producto.categories, labelBySlug),
    categories: producto.categories,
    image: producto.imagen,
    imageAlt: producto.nombre,
    price: producto.precio,
    stock: producto.stock,
    destacado: producto.destacado,
    ingredientes: producto.ingredientes,
    formato: producto.formato,
  };
}

export function parseProducto(
  id: string,
  data: Record<string, unknown>,
): Producto | null {
  if (
    typeof data.nombre !== "string" ||
    typeof data.descripcion !== "string" ||
    typeof data.precio !== "number" ||
    typeof data.stock !== "number" ||
    typeof data.activo !== "boolean" ||
    typeof data.imagen !== "string"
  ) {
    return null;
  }

  const categories = parseCategoriesFromFirestore(data);
  const destacado = typeof data.destacado === "boolean" ? data.destacado : undefined;
  const ingredientes =
    typeof data.ingredientes === "string" && data.ingredientes.trim()
      ? data.ingredientes.trim()
      : undefined;
  const formato =
    typeof data.formato === "string" && data.formato.trim()
      ? data.formato.trim()
      : undefined;

  return {
    id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock,
    activo: data.activo,
    imagen: data.imagen,
    destacado,
    categories,
    categoria: typeof data.categoria === "string" ? data.categoria : undefined,
    ingredientes,
    formato,
  };
}

export function sortProductos(productos: Producto[]): Producto[] {
  return [...productos].sort((a, b) => {
    if (a.destacado && !b.destacado) return -1;
    if (!a.destacado && b.destacado) return 1;
    return a.nombre.localeCompare(b.nombre, "es");
  });
}

export function formatPrice(precio: number): string {
  const amount = new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
  return `$${amount}`;
}

/** Solo dígitos 0-9; cadena vacía permitida. */
export function sanitizeDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Normaliza texto para búsqueda (minúsculas, sin acentos, espacios colapsados). */
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function productMatchesCategory(
  product: Product,
  categorySlug: string | null,
): boolean {
  if (!categorySlug) return true;
  return product.categories.includes(categorySlug);
}

export function productMatchesSearch(product: Product, query: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const haystack = normalizeSearchText(`${product.name} ${product.description}`);
  return haystack.includes(normalizedQuery);
}

export function filterProducts(
  products: Product[],
  categorySlug: string | null,
  searchQuery: string,
): Product[] {
  return products.filter(
    (product) =>
      productMatchesCategory(product, categorySlug) &&
      productMatchesSearch(product, searchQuery),
  );
}
