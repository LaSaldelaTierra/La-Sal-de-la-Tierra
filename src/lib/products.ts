import { unstable_noStore as noStore } from "next/cache";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product, Producto } from "@/types/product";
import { mapProductoToProduct, parseProducto, sortProductos } from "@/lib/products-utils";

const COLLECTION = "productos";

export { mapProductoToProduct };

export async function getProducts(): Promise<Product[]> {
  const productos = await getActiveProductos();
  return productos.map((producto) => mapProductoToProduct(producto));
}

export async function getProductById(id: string): Promise<Product | null> {
  const producto = await getActiveProductoById(id);
  return producto ? mapProductoToProduct(producto) : null;
}

/** @deprecated Usa getProducts() */
export const getAllProducts = getProducts;

async function getActiveProductos(): Promise<Producto[]> {
  noStore();
  const productosQuery = query(
    collection(db, COLLECTION),
    where("activo", "==", true),
  );
  const snapshot = await getDocs(productosQuery);

  const productos = snapshot.docs
    .map((document) => parseProducto(document.id, document.data()))
    .filter((producto): producto is Producto => producto !== null);

  return sortProductos(productos);
}

async function getActiveProductoById(id: string): Promise<Producto | null> {
  noStore();
  const snapshot = await getDoc(doc(db, COLLECTION, id));
  if (!snapshot.exists()) return null;

  const producto = parseProducto(snapshot.id, snapshot.data());
  if (!producto || !producto.activo) return null;

  return producto;
}
