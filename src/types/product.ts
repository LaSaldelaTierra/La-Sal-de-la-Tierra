/** Esquema de documento en Firestore (colección `productos`). */
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  activo: boolean;
  imagen: string;
  destacado?: boolean;
  /** Slugs de categoría, ej: ["sales", "parrilla"] */
  categories: string[];
  /** @deprecated Campo legacy — se migra a `categories` al leer */
  categoria?: string;
  ingredientes?: string;
  formato?: string;
}

export type ProductoInput = Omit<Producto, "id">;

/** Modelo de presentación usado por los componentes de UI existentes. */
export interface Product {
  id: string;
  name: string;
  description: string;
  /** Etiqueta principal para la tarjeta */
  category: string;
  categories: string[];
  image: string;
  imageAlt: string;
  price: number;
  stock: number;
  destacado?: boolean;
  ingredientes?: string;
  formato?: string;
}
