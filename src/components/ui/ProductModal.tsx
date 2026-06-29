"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Product } from "@/types/product";
import { CategoryBadges } from "@/components/ui/CategoryBadges";
import { formatPrice } from "@/lib/products-utils";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface ProductModalProps {
  product: Product;
  labelBySlug?: ReadonlyMap<string, string>;
  open: boolean;
  onClose: () => void;
}

function preventImageInteraction(event: React.SyntheticEvent) {
  event.preventDefault();
}

export function ProductModal({
  product,
  labelBySlug,
  open,
  onClose,
}: ProductModalProps) {
  useBodyScrollLock(open);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open || typeof document === "undefined") return null;

  const isPlaceholder = product.image.includes("proximamente");
  const stockLabel =
    product.stock === 0
      ? "Sin stock disponible"
      : `${product.stock} ${product.stock === 1 ? "unidad disponible" : "unidades disponibles"}`;

  return createPortal(
    <div
      className="product-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-modal-title-${product.id}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="product-modal-close"
        onClick={onClose}
        aria-label="Cerrar detalle del producto"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="product-modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="product-modal-media">
          <div className="product-modal-image-wrap">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={`image-protected object-contain ${
                isPlaceholder ? "p-6" : "p-4 sm:p-0"
              }`}
              unoptimized
              draggable={false}
              onContextMenu={preventImageInteraction}
              onDragStart={preventImageInteraction}
              priority
            />
          </div>
        </div>

        <div className="product-modal-content">
          <div className="product-modal-header">
            <span className="product-modal-eyebrow">{product.category}</span>
            <h2 id={`product-modal-title-${product.id}`} className="product-modal-title">
              {product.name}
            </h2>
            <p className="product-modal-price">{formatPrice(product.price)}</p>
          </div>

          <div className="product-modal-scroll">
            <section className="product-modal-section">
              <h3 className="product-modal-section-title">Descripción</h3>
              <p className="product-modal-text">{product.description}</p>
            </section>

            {product.ingredientes && (
              <section className="product-modal-section">
                <h3 className="product-modal-section-title">Ingredientes</h3>
                <p className="product-modal-text">{product.ingredientes}</p>
              </section>
            )}

            {product.formato && (
              <section className="product-modal-section">
                <h3 className="product-modal-section-title">Formato</h3>
                <p className="product-modal-text">{product.formato}</p>
              </section>
            )}

            <section className="product-modal-section">
              <h3 className="product-modal-section-title">Disponibilidad</h3>
              <p className="product-modal-text">{stockLabel}</p>
            </section>

            <section className="product-modal-section">
              <h3 className="product-modal-section-title">Categoría</h3>
              <CategoryBadges
                categoryIds={product.categories}
                labelBySlug={labelBySlug}
                size="md"
              />
            </section>

            {product.destacado && (
              <section className="product-modal-section">
                <span className="product-modal-badge">Producto destacado</span>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
