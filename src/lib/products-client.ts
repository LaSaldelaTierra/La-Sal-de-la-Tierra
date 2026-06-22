import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product, Producto } from "@/types/product";
import { mapProductoToProduct, parseProducto, sortProductos } from "@/lib/products-utils";

const COLLECTION = "productos";

/** Lectura en el navegador — evita fallos de Firestore gRPC/SSL en SSR (Node). */
export async function fetchActiveProductsClient(): Promise<Product[]> {
  const productosQuery = query(
    collection(db, COLLECTION),
    where("activo", "==", true),
  );
  const snapshot = await getDocs(productosQuery);

  const productos = snapshot.docs
    .map((document) => parseProducto(document.id, document.data()))
    .filter((producto): producto is Producto => producto !== null);

  return sortProductos(productos).map((producto) => mapProductoToProduct(producto));
}
