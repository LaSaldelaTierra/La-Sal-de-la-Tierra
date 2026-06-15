"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminProductById, updateProduct } from "@/lib/products-admin";
import type { Producto, ProductoInput } from "@/types/product";

export default function EditarProductoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminProductById(params.id);
        if (!data) {
          setError("Producto no encontrado.");
        } else {
          setProducto(data);
        }
      } catch {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  const handleSubmit = async (data: ProductoInput) => {
    await updateProduct(params.id, data);
    router.push("/admin/productos");
    router.refresh();
  };

  if (loading) {
    return (
      <AdminShell title="Editar producto">
        <p className="font-sans text-sm text-earth-light">Cargando…</p>
      </AdminShell>
    );
  }

  if (error || !producto) {
    return (
      <AdminShell title="Editar producto">
        <p role="alert" className="font-sans text-sm text-red-700">
          {error ?? "Producto no encontrado."}
        </p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Editar producto"
      description={`Modificando: ${producto.nombre}`}
    >
      <ProductForm
        initialData={producto}
        submitLabel="Guardar cambios"
        onSubmit={handleSubmit}
      />
    </AdminShell>
  );
}
