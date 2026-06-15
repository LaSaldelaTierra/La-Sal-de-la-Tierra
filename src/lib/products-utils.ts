import type { Producto } from "@/types/product";

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

  return {
    id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock,
    activo: data.activo,
    imagen: data.imagen,
    destacado: typeof data.destacado === "boolean" ? data.destacado : undefined,
    categoria: typeof data.categoria === "string" ? data.categoria : undefined,
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
