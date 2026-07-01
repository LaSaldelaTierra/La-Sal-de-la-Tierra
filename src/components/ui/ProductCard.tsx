"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products-utils";
import { ProductModal } from "@/components/ui/ProductModal";

interface ProductCardProps {
  product: Product;
  labelBySlug?: ReadonlyMap<string, string>;
}

const DESCRIPTION_PREVIEW_CHARS = 110;

function preventImageInteraction(event: React.SyntheticEvent) {
  event.preventDefault();
}

function getDescriptionPreview(description: string): {
  preview: string;
  showReadMore: boolean;
} {
  if (description.length <= DESCRIPTION_PREVIEW_CHARS) {
    return { preview: description, showReadMore: false };
  }

  const trimmed = description.slice(0, DESCRIPTION_PREVIEW_CHARS).trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  const safePreview = lastSpace > 60 ? trimmed.slice(0, lastSpace) : trimmed;

  return {
    preview: `${safePreview}…`,
    showReadMore: true,
  };
}

export function ProductCard({ product, labelBySlug }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLandscapeImage, setIsLandscapeImage] = useState(false);
  const isPlaceholder = product.image.includes("proximamente");
  const { preview, showReadMore } = getDescriptionPreview(product.description);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleImageLoad = (metadata: { naturalWidth: number; naturalHeight: number }) => {
    setIsLandscapeImage(metadata.naturalWidth > metadata.naturalHeight);
  };

  return (
    <>
      <article className="product-card group min-w-0">
        <button
          type="button"
          className="product-image product-image-btn"
          onClick={openModal}
          aria-label={`Ver detalles de ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 140px, 180px"
            className={`image-protected ${
              isPlaceholder || isLandscapeImage
                ? "image-contain object-contain p-3 transition-transform duration-500 ease-out"
                : "image-cover object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            }`}
            style={{ objectFit: isPlaceholder || isLandscapeImage ? "contain" : "cover" }}
            loading="lazy"
            unoptimized
            draggable={false}
            onContextMenu={preventImageInteraction}
            onDragStart={preventImageInteraction}
            onLoadingComplete={handleImageLoad}
          />
        </button>

        <div className="product-body">
          <div className="product-body-main">
            <span className="product-meta">{product.category}</span>

            <button
              type="button"
              className="product-name-btn"
              onClick={openModal}
            >
              <h3 className="product-name">{product.name}</h3>
            </button>

            <div className="product-description-wrap">
              <p className="product-description">{preview}</p>
              {showReadMore && (
                <button
                  type="button"
                  className="product-read-more"
                  onClick={openModal}
                >
                  Leer más
                </button>
              )}
            </div>
          </div>

          <div className="product-footer">
            <div className="product-price">{formatPrice(product.price)}</div>
            <div className="product-stock">
              Stock: {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
            </div>
            <button
              type="button"
              className="product-details-btn"
              onClick={openModal}
            >
              Ver detalles
            </button>
          </div>
        </div>
      </article>

      <ProductModal
        product={product}
        labelBySlug={labelBySlug}
        open={modalOpen}
        onClose={closeModal}
      />
    </>
  );
}
