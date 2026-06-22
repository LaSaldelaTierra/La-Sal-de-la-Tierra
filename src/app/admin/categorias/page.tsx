"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  updateCategory,
} from "@/lib/categories-admin";
import { getFirestoreErrorMessage } from "@/lib/firestore-errors";
import type { Categoria } from "@/types/categoria";

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const loadCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminCategories();
      setCategorias(data);
    } catch (err) {
      setError(
        getFirestoreErrorMessage(err, "No se pudieron cargar las categorías."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategorias();
  }, [loadCategorias]);

  const handleCreate = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    setCreating(true);
    setError(null);
    try {
      await createCategory(trimmed);
      setNewName("");
      await loadCategorias();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : getFirestoreErrorMessage(err, "No se pudo crear la categoría."),
      );
    } finally {
      setCreating(false);
    }
  };

  const handleToggleActive = async (categoria: Categoria) => {
    setSavingSlug(categoria.slug);
    setError(null);
    try {
      await updateCategory(categoria.slug, { activo: !categoria.activo });
      setCategorias((prev) =>
        prev.map((item) =>
          item.slug === categoria.slug ? { ...item, activo: !item.activo } : item,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : getFirestoreErrorMessage(err, "No se pudo actualizar la categoría."),
      );
    } finally {
      setSavingSlug(null);
    }
  };

  const handleRename = async (categoria: Categoria, nombre: string) => {
    const trimmed = nombre.trim();
    if (!trimmed || trimmed === categoria.nombre) return;

    setSavingSlug(categoria.slug);
    setError(null);
    try {
      await updateCategory(categoria.slug, { nombre: trimmed });
      setCategorias((prev) =>
        prev.map((item) =>
          item.slug === categoria.slug ? { ...item, nombre: trimmed } : item,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : getFirestoreErrorMessage(err, "No se pudo renombrar la categoría."),
      );
    } finally {
      setSavingSlug(null);
    }
  };

  const handleDelete = async (categoria: Categoria) => {
    if (
      !window.confirm(
        `¿Eliminar "${categoria.nombre}"? Los productos que la usen conservarán el slug en su historial, pero dejará de aparecer en los filtros.`,
      )
    ) {
      return;
    }

    setDeletingSlug(categoria.slug);
    setError(null);
    try {
      await deleteCategory(categoria.slug);
      setCategorias((prev) => prev.filter((item) => item.slug !== categoria.slug));
    } catch (err) {
      setError(
        getFirestoreErrorMessage(err, "No se pudo eliminar la categoría."),
      );
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <AdminShell
      title="Categorías"
      description="Las categorías activas aparecen automáticamente como filtros en el sitio público."
      action={
        <Button href="/admin/productos" variant="outline" size="sm">
          Ver productos
        </Button>
      }
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1">
          <label htmlFor="new-categoria" className="block font-sans text-sm font-medium text-earth">
            Nueva categoría
          </label>
          <input
            id="new-categoria"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Ej: Regalos Corporativos"
            className="admin-input max-w-md"
          />
        </div>
        <Button
          type="button"
          size="sm"
          disabled={creating || !newName.trim()}
          onClick={() => void handleCreate()}
        >
          {creating ? "Creando…" : "Crear categoría"}
        </Button>
      </div>

      {error && (
        <p role="alert" className="mb-4 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      {loading && (
        <p className="font-sans text-sm text-earth-light">Cargando categorías…</p>
      )}

      {!loading && categorias.length === 0 && !error && (
        <div className="rounded-sm border border-dashed border-sand/60 p-8 text-center">
          <p className="font-sans text-sm text-earth-light">
            No hay categorías todavía. Crea la primera arriba.
          </p>
        </div>
      )}

      {!loading && categorias.length > 0 && (
        <div className="overflow-x-auto rounded-sm border border-sand/50">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-sand/50 bg-warm-beige/40">
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Nombre
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-earth-light">
                  Identificador
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
              {categorias.map((categoria) => (
                <tr key={categoria.slug} className="border-b border-sand/30 last:border-0">
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      defaultValue={categoria.nombre}
                      disabled={savingSlug === categoria.slug}
                      onBlur={(e) => void handleRename(categoria, e.target.value)}
                      className="admin-input max-w-xs py-1.5 text-sm"
                    />
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-earth-light">
                    {categoria.slug}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      disabled={savingSlug === categoria.slug}
                      onClick={() => void handleToggleActive(categoria)}
                      className={`inline-block rounded-sm px-2 py-1 font-sans text-xs font-medium ${
                        categoria.activo
                          ? "bg-olive/15 text-olive"
                          : "bg-sand/40 text-earth-light"
                      }`}
                    >
                      {categoria.activo ? "Activa" : "Inactiva"}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      disabled={deletingSlug === categoria.slug}
                      onClick={() => void handleDelete(categoria)}
                      className="font-sans text-sm text-red-700 underline-offset-2 hover:underline disabled:opacity-50"
                    >
                      {deletingSlug === categoria.slug ? "Eliminando…" : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 rounded-sm border border-sand/40 bg-warm-beige/20 px-4 py-3 font-sans text-xs text-earth-light">
        <strong className="font-medium text-earth">Nota:</strong> el identificador (slug) se genera al crear la categoría y no cambia al renombrar.
        Asigna categorías a productos desde{" "}
        <Link href="/admin/productos" className="text-earth underline-offset-2 hover:underline">
          Productos
        </Link>
        .
      </p>
    </AdminShell>
  );
}
