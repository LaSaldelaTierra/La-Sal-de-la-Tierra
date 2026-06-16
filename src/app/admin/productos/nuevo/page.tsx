"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/products-admin";
import type { ProductoInput } from "@/types/product";

export default function NuevoProductoPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductoInput) => {
    console.log("[NuevoProductoPage] handleSubmit start", data);
    try {
      const id = await createProduct(data);
      console.log("[NuevoProductoPage] createProduct completed", { id });
      router.push("/admin/productos");
      console.log("[NuevoProductoPage] router.push called");
      router.refresh();
      console.log("[NuevoProductoPage] router.refresh called");
    } catch (error) {
      console.error("[NuevoProductoPage] handleSubmit failed", error);
      throw error;
    }
  };

  return (
    <AdminShell
      title="Nuevo producto"
      description="Completa los datos para añadir un producto al catálogo."
    >
      <ProductForm submitLabel="Crear producto" onSubmit={handleSubmit} />
    </AdminShell>
  );
}
