import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { isValidCategorySlug } from "@/lib/category-slug";
import type { Categoria } from "@/types/categoria";

const COLLECTION = "categorias";

function parseCategoria(id: string, data: Record<string, unknown>): Categoria | null {
  if (typeof data.nombre !== "string" || typeof data.slug !== "string") {
    return null;
  }

  const activo = typeof data.activo === "boolean" ? data.activo : true;
  const orden = typeof data.orden === "number" ? data.orden : 0;

  return {
    id,
    nombre: data.nombre,
    slug: data.slug,
    orden,
    activo,
  };
}

/** Categorías activas para el sitio público (lectura en cliente). */
export async function fetchActiveCategoriesClient(): Promise<Categoria[]> {
  const categoriasQuery = query(
    collection(db, COLLECTION),
    where("activo", "==", true),
    orderBy("orden"),
    orderBy("nombre"),
  );

  try {
    const snapshot = await getDocs(categoriasQuery);
    return snapshot.docs
      .map((document) => parseCategoria(document.id, document.data()))
      .filter((categoria): categoria is Categoria => categoria !== null);
  } catch {
    // Fallback si falta índice compuesto: ordenar en cliente
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs
      .map((document) => parseCategoria(document.id, document.data()))
      .filter((categoria): categoria is Categoria => categoria !== null && categoria.activo)
      .sort((a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, "es"));
  }
}

export function buildCategoryLabelMap(categorias: Categoria[]): Map<string, string> {
  return new Map(categorias.map((categoria) => [categoria.slug, categoria.nombre]));
}

export function resolveCategoryFromList(
  raw: string | null,
  categorias: Categoria[],
): string | null {
  if (!raw || raw === "todos") return null;
  const slug = raw.trim();
  if (!isValidCategorySlug(slug)) return null;
  return categorias.some((categoria) => categoria.slug === slug) ? slug : null;
}

export async function getCategoryBySlug(slug: string): Promise<Categoria | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, slug));
  if (!snapshot.exists()) return null;
  return parseCategoria(snapshot.id, snapshot.data());
}

export { parseCategoria };
