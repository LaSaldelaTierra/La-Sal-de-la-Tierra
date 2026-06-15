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
  /** Opcional: se muestra como etiqueta en la tarjeta del producto. */
  categoria?: string;
}

export type ProductoInput = Omit<Producto, "id">;

/** Modelo de presentación usado por los componentes de UI existentes. */
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  price: number;
  stock: number;
}
