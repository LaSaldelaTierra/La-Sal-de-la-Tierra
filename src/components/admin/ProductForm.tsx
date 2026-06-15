"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import type { Producto, ProductoInput } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { sanitizeDigits } from "@/lib/products-utils";
import { uploadProductImage } from "@/lib/storage";

interface ProductFormProps {
  initialData?: Producto;
  onSubmit: (data: ProductoInput) => Promise<void>;
  submitLabel: string;
}

interface FormFields {
  nombre: string;
  descripcion: string;
  precio: string;
  stock: string;
  activo: boolean;
  destacado: boolean;
  categoria: string;
}

function buildInitialFields(initialData?: Producto): FormFields {
  if (!initialData) {
    return {
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      activo: true,
      destacado: false,
      categoria: "",
    };
  }

  return {
    nombre: initialData.nombre,
    descripcion: initialData.descripcion,
    precio: String(initialData.precio),
    stock: String(initialData.stock),
    activo: initialData.activo,
    destacado: initialData.destacado ?? false,
    categoria: initialData.categoria ?? "",
  };
}

function validateForm(
  fields: FormFields,
  hasImage: boolean,
): string | null {
  if (!fields.nombre.trim()) return "El nombre es obligatorio.";
  if (!fields.descripcion.trim()) return "La descripción es obligatoria.";
  if (!fields.precio.trim()) return "El precio es obligatorio.";
  if (!fields.stock.trim()) return "El stock es obligatorio.";
  if (!hasImage) return "Debes subir una imagen del producto.";

  const precio = Number(fields.precio);
  const stock = Number(fields.stock);

  if (!Number.isFinite(precio) || precio < 0) {
    return "El precio debe ser un número válido.";
  }
  if (!Number.isInteger(stock) || stock < 0) {
    return "El stock debe ser un número entero válido.";
  }

  return null;
}

export function ProductForm({ initialData, onSubmit, submitLabel }: ProductFormProps) {
  const [fields, setFields] = useState<FormFields>(() => buildInitialFields(initialData));
  const existingImage = initialData?.imagen ?? "";
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imagen ?? null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) return;

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const updateField = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const hasImage = Boolean(imageFile || existingImage);
    const validationError = validateForm(fields, hasImage);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      let imagenUrl = existingImage;

      if (imageFile) {
        setUploading(true);
        imagenUrl = await uploadProductImage(imageFile, initialData?.id);
        setUploading(false);
      }

      await onSubmit({
        nombre: fields.nombre.trim(),
        descripcion: fields.descripcion.trim(),
        precio: Number(fields.precio),
        stock: Number(fields.stock),
        activo: fields.activo,
        imagen: imagenUrl,
        destacado: fields.destacado,
        categoria: fields.categoria.trim() || undefined,
      });
    } catch (err) {
      setUploading(false);
      setSaving(false);
      setError(
        err instanceof Error ? err.message : "No se pudo guardar el producto.",
      );
    }
  };

  const isBusy = saving || uploading;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-6 rounded-sm border border-sand/50 bg-warm-beige/30 p-6 sm:p-8"
    >
      <div className="space-y-2">
        <label htmlFor="nombre" className="block font-sans text-sm font-medium text-earth">
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          required
          value={fields.nombre}
          onChange={(e) => updateField("nombre", e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="descripcion"
          className="block font-sans text-sm font-medium text-earth"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          required
          rows={4}
          value={fields.descripcion}
          onChange={(e) => updateField("descripcion", e.target.value)}
          className="admin-input resize-y"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="precio" className="block font-sans text-sm font-medium text-earth">
            Precio (CLP)
          </label>
          <input
            id="precio"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Ej: 5990"
            value={fields.precio}
            onChange={(e) => updateField("precio", sanitizeDigits(e.target.value))}
            className="admin-input"
          />
          <p className="font-sans text-xs text-earth-light">
            Solo números. El formato $X.XXX CLP se aplica al mostrar.
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="stock" className="block font-sans text-sm font-medium text-earth">
            Stock
          </label>
          <input
            id="stock"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Ej: 10"
            value={fields.stock}
            onChange={(e) => updateField("stock", sanitizeDigits(e.target.value))}
            className="admin-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="imagen" className="block font-sans text-sm font-medium text-earth">
          Imagen del producto
        </label>
        <input
          id="imagen"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageChange}
          className="admin-input cursor-pointer file:mr-4 file:rounded-sm file:border-0 file:bg-earth file:px-4 file:py-2 file:font-sans file:text-sm file:text-cream"
        />
        {imagePreview && (
          <div className="relative mt-3 aspect-[4/5] w-40 overflow-hidden rounded-sm bg-warm-beige">
            <Image
              src={imagePreview}
              alt="Vista previa"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        {!imageFile && existingImage && (
          <p className="font-sans text-xs text-earth-light">
            Imagen actual cargada. Selecciona un archivo para reemplazarla.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="categoria" className="block font-sans text-sm font-medium text-earth">
          Categoría (opcional)
        </label>
        <input
          id="categoria"
          type="text"
          placeholder="Sal Gourmet"
          value={fields.categoria}
          onChange={(e) => updateField("categoria", e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex cursor-pointer items-center gap-2 font-sans text-sm text-earth">
          <input
            type="checkbox"
            checked={fields.activo}
            onChange={(e) => updateField("activo", e.target.checked)}
            className="h-4 w-4 rounded border-sand text-earth focus:ring-olive"
          />
          Activo (visible en el sitio)
        </label>
        <label className="flex cursor-pointer items-center gap-2 font-sans text-sm text-earth">
          <input
            type="checkbox"
            checked={fields.destacado}
            onChange={(e) => updateField("destacado", e.target.checked)}
            className="h-4 w-4 rounded border-sand text-earth focus:ring-olive"
          />
          Destacado
        </label>
      </div>

      {error && (
        <p role="alert" className="font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isBusy}>
        {uploading ? "Subiendo imagen…" : saving ? "Guardando…" : submitLabel}
      </Button>
    </form>
  );
}
