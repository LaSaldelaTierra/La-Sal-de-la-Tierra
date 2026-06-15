import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products-utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isPlaceholder = product.image.includes("proximamente");

  return (
    <article className="product-card group min-w-0 rounded-sm border border-sand/40 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={
            isPlaceholder
              ? "object-contain p-4 transition-transform duration-500 ease-out"
              : "transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
          }
          loading="lazy"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="product-body">
        <span className="product-meta">{product.category}</span>

        <h3 className="product-name line-clamp-2">{product.name}</h3>

        <p className="product-description line-clamp-3">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">{formatPrice(product.price)}</div>
          <div className="product-stock">Stock: {product.stock} {product.stock === 1 ? "unidad" : "unidades"}</div>
        </div>
      </div>
    </article>
  );
}
