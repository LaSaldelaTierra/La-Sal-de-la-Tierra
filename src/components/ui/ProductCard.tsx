import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products-utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isPlaceholder = product.image.includes("proximamente");

  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-warm-beige">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={
            isPlaceholder
              ? "object-contain p-4 transition-transform duration-500 ease-out"
              : "object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
          }
          loading="lazy"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-5 sm:pt-6">
        <span className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
          {product.category}
        </span>
        <h3 className="break-words font-serif text-xl font-medium text-earth transition-colors duration-300 group-hover:text-earth-dark">
          {product.name}
        </h3>
        <p className="mt-3 break-words font-sans text-sm leading-relaxed text-earth-light">
          {product.description}
        </p>
        <p className="mt-4 font-sans text-base font-semibold text-earth">
          {formatPrice(product.price)}
        </p>
        <p className="mt-1 font-sans text-sm text-earth-light">
          Stock: {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
        </p>
      </div>
    </article>
  );
}
