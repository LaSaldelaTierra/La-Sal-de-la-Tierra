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
  const payload: Record<string, unknown> = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock,
    activo: data.activo,
    imagen: data.imagen,
  };

  if (data.destacado !== undefined) {
    payload.destacado = data.destacado;
  }
  if (data.categoria) {
    payload.categoria = data.categoria;
  }

  const collectionRef = collection(db, COLLECTION);
  console.log("[ProductsAdmin] createProduct start", {
    payload,
    dbDefined: Boolean(db),
    collectionPath: collectionRef.path,
    collectionId: COLLECTION,
  });

  try {
    console.log("[ProductsAdmin] createProduct before addDoc", {
      collectionPath: collectionRef.path,
      dbDefined: Boolean(db),
    });
    const ref = await addDoc(collectionRef, payload);
    console.log("[ProductsAdmin] createProduct after addDoc", { id: ref.id });
    console.log("[ProductsAdmin] createProduct before return", { id: ref.id });
    return ref.id;
  } catch (error) {
    console.error("[ProductsAdmin] createProduct failed", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  data: Partial<ProductoInput>,
): Promise<void> {
  const payload: Record<string, unknown> = {};

  if (data.nombre !== undefined) payload.nombre = data.nombre;
  if (data.descripcion !== undefined) payload.descripcion = data.descripcion;
  if (data.precio !== undefined) payload.precio = data.precio;
  if (data.stock !== undefined) payload.stock = data.stock;
  if (data.activo !== undefined) payload.activo = data.activo;
  if (data.imagen !== undefined) payload.imagen = data.imagen;
  if (data.destacado !== undefined) payload.destacado = data.destacado;
  if (data.categoria !== undefined) payload.categoria = data.categoria;

  console.log("[ProductsAdmin] updateProduct start", { id, payload });
  try {
    await updateDoc(doc(db, COLLECTION, id), payload);
    console.log("[ProductsAdmin] updateProduct success", { id });
  } catch (error) {
    console.error("[ProductsAdmin] updateProduct failed", { id, error });
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
