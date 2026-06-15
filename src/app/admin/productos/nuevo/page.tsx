"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/products-admin";
import type { ProductoInput } from "@/types/product";

export default function NuevoProductoPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductoInput) => {
    await createProduct(data);
    router.push("/admin/productos");
    router.refresh();
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
