import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getFirestoreErrorMessage } from "@/lib/firestore-errors";
import { isValidCategorySlug, slugifyCategoryName } from "@/lib/category-slug";
import { parseCategoria } from "@/lib/categories-client";
import type { Categoria, CategoriaInput } from "@/types/categoria";

const COLLECTION = "categorias";

async function fetchAllCategories(): Promise<Categoria[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, COLLECTION), orderBy("orden"), orderBy("nombre")),
    );
    return snapshot.docs
      .map((document) => parseCategoria(document.id, document.data()))
      .filter((categoria): categoria is Categoria => categoria !== null);
  } catch (error) {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      return snapshot.docs
        .map((document) => parseCategoria(document.id, document.data()))
        .filter((categoria): categoria is Categoria => categoria !== null)
        .sort((a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, "es"));
    } catch {
      throw error;
    }
  }
}

export async function getAdminCategories(): Promise<Categoria[]> {
  return fetchAllCategories();
}

export async function createCategory(nombre: string): Promise<Categoria> {
  const trimmed = nombre.trim();
  if (!trimmed) {
    throw new Error("El nombre de la categoría es obligatorio.");
  }

  const slug = slugifyCategoryName(trimmed);
  if (!slug || !isValidCategorySlug(slug)) {
    throw new Error("No se pudo generar un identificador válido para la categoría.");
  }

  const existing = await fetchAllCategories().catch((error) => {
    throw new Error(
      getFirestoreErrorMessage(error, "No se pudieron leer las categorías existentes."),
    );
  });
  if (existing.some((categoria) => categoria.slug === slug)) {
    throw new Error(`Ya existe una categoría con el identificador "${slug}".`);
  }

  const maxOrden = existing.reduce((max, categoria) => Math.max(max, categoria.orden), 0);
  const data: CategoriaInput = {
    nombre: trimmed,
    slug,
    orden: maxOrden + 1,
    activo: true,
  };

  try {
    await setDoc(doc(db, COLLECTION, slug), data);
  } catch (error) {
    throw new Error(
      getFirestoreErrorMessage(error, "No se pudo crear la categoría."),
    );
  }

  return { id: slug, ...data };
}

export async function updateCategory(
  slug: string,
  data: Partial<Pick<CategoriaInput, "nombre" | "orden" | "activo">>,
): Promise<void> {
  const payload: Record<string, unknown> = {};

  if (data.nombre !== undefined) {
    const trimmed = data.nombre.trim();
    if (!trimmed) throw new Error("El nombre no puede estar vacío.");
    payload.nombre = trimmed;
  }
  if (data.orden !== undefined) payload.orden = data.orden;
  if (data.activo !== undefined) payload.activo = data.activo;

  try {
    await updateDoc(doc(db, COLLECTION, slug), payload);
  } catch (error) {
    throw new Error(
      getFirestoreErrorMessage(error, "No se pudo actualizar la categoría."),
    );
  }
}

export async function deleteCategory(slug: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION, slug));
  } catch (error) {
    throw new Error(
      getFirestoreErrorMessage(error, "No se pudo eliminar la categoría."),
    );
  }
}
