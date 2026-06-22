/** Documento en Firestore (colección `categorias`, ID = slug). */
export interface Categoria {
  /** Igual al slug — ID del documento */
  id: string;
  nombre: string;
  slug: string;
  orden: number;
  activo: boolean;
}

export type CategoriaInput = Omit<Categoria, "id">;
