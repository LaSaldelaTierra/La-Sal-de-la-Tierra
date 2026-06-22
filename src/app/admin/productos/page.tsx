"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { deleteProduct, getAdminProducts } from "@/lib/products-admin";
import { getAdminCategories } from "@/lib/categories-admin";
import { buildCategoryLabelMap } from "@/lib/categories-client";
import { CategoryBadges } from "@/components/ui/CategoryBadges";
import { formatPrice } from "@/lib/products-utils";
import type { Producto } from "@/types/product";

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriesWarning, setCategoriesWarning] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [categoryLabelMap, setCategoryLabelMap] = useState<Map<string, string>>(
    () => new Map(),
  );

  const loadProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCategoriesWarning(null);

    try {
      const data = await getAdminProducts();
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudieron cargar los productos.");
      setProductos([]);
      setLoading(false);
      return;
    }

    try {
      const categorias = await getAdminCategories();
      setCategoryLabelMap(buildCategoryLabelMap(categorias));
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      setCategoryLabelMap(new Map());
      setCategoriesWarning(
        "Los productos se cargaron, pero no fue posible obtener las categorías. Despliega las reglas de Firestore o revisa permisos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  const handleDelete = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("No se pudo eliminar el producto. Verifica tus permisos.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminShell
      title="Productos"
      description="Gestiona el catálogo que aparece en el sitio público."
      action={
        <Button href="/admin/productos/nuevo" size="sm">
          Nuevo producto
        </Button>
      }
    >
      {loading && (
        <p className="font-sans text-sm text-earth-light">Cargando productos…</p>
      )}

      {categoriesWarning && (
        <p role="status" className="mb-4 font-sans text-sm text-amber-800">
          {categoriesWarning}
        </p>
      )}

      {error && (
        <p role="alert" className="mb-4 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && productos.length === 0 && !error && (
        <div className="rounded-sm border border-dashed border-sand/60 p-8 text-center">
          <p className="font-sans text-sm text-earth-light">
            No hay productos todavía.
          </p>
          <Button href="/admin/productos/nuevo" className="mt-4" size="sm">
            Crear el primero
          </Button>
        </div>
      )}

      {!loading && productos.length > 0 && (
        <div className="overflow-x-auto rounded-sm border border-sand/50">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="border-b border-sand/50 bg-warm-beige/40">
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Producto
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Categorías
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Precio
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Stock
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Estado
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b border-sand/30 last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-warm-beige">
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-earth">
                          {producto.nombre}
                        </p>
                        {producto.destacado && (
                          <span className="font-sans text-xs text-olive">Destacado</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <CategoryBadges
                      categoryIds={producto.categories}
                      labelBySlug={categoryLabelMap}
                    />
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-earth">
                    {formatPrice(producto.precio)}
                  </td>
                  <td className="px-4 py-4 font-sans text-sm text-earth">
                    {producto.stock}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-sm px-2 py-1 font-sans text-xs font-medium ${
                        producto.activo
                          ? "bg-olive/15 text-olive"
                          : "bg-sand/40 text-earth-light"
                      }`}
                    >
                      {producto.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/productos/${producto.id}/editar`}
                        className="font-sans text-sm text-earth underline-offset-2 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(producto.id, producto.nombre)}
                        disabled={deletingId === producto.id}
                        className="font-sans text-sm text-red-700 underline-offset-2 hover:underline disabled:opacity-50"
                      >
                        {deletingId === producto.id ? "Eliminando…" : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
