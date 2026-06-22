import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Producto, ProductoInput } from "@/types/product";
import { parseProducto, sortProductos } from "@/lib/products-utils";

const COLLECTION = "productos";

function buildFirestorePayload(data: Partial<ProductoInput>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  if (data.nombre !== undefined) payload.nombre = data.nombre;
  if (data.descripcion !== undefined) payload.descripcion = data.descripcion;
  if (data.precio !== undefined) payload.precio = data.precio;
  if (data.stock !== undefined) payload.stock = data.stock;
  if (data.activo !== undefined) payload.activo = data.activo;
  if (data.imagen !== undefined) payload.imagen = data.imagen;
  if (data.destacado !== undefined) payload.destacado = data.destacado;

  if (data.categories !== undefined) {
    payload.categories = data.categories;
    payload.categoria = data.categories.length > 0 ? data.categories[0] : null;
  }

  return payload;
}

export async function getAdminProducts(): Promise<Producto[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));

  const productos = snapshot.docs
    .map((document) => parseProducto(document.id, document.data()))
    .filter((producto): producto is Producto => producto !== null);

  return sortProductos(productos);
}

export async function getAdminProductById(id: string): Promise<Producto | null> {
  const snapshot = await getDoc(doc(db, COLLECTION, id));
  if (!snapshot.exists()) return null;
  return parseProducto(snapshot.id, snapshot.data());
}

export async function createProduct(data: ProductoInput): Promise<string> {
  const payload = buildFirestorePayload(data);
  const ref = await addDoc(collection(db, COLLECTION), payload);
  return ref.id;
}

export async function updateProduct(
  id: string,
  data: Partial<ProductoInput>,
): Promise<void> {
  const payload = buildFirestorePayload(data);
  await updateDoc(doc(db, COLLECTION, id), payload);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
