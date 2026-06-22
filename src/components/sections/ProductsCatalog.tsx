"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  buildCategoryLabelMap,
  fetchActiveCategoriesClient,
  resolveCategoryFromList,
} from "@/lib/categories-client";
import { fetchActiveProductsClient } from "@/lib/products-client";
import { filterProducts } from "@/lib/products-utils";
import type { Categoria } from "@/types/categoria";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const HOME_HASH = "#productos";
const SEARCH_DEBOUNCE_MS = 300;

function ProductsGridSkeleton() {
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 [&>*]:min-w-0">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="product-skeleton animate-pulse">
          <div className="product-skeleton-image" />
          <div className="product-skeleton-body">
            <div className="h-3 w-16 rounded bg-warm-beige" />
            <div className="h-5 w-3/4 rounded bg-warm-beige" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-warm-beige" />
              <div className="h-3 w-5/6 rounded bg-warm-beige" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function buildHomeUrl(category: string | null, search: string): string {
  const params = new URLSearchParams();
  if (category) params.set("categoria", category);
  const trimmed = search.trim();
  if (trimmed) params.set("buscar", trimmed);
  const query = params.toString();
  return query ? `/?${query}${HOME_HASH}` : `/${HOME_HASH}`;
}

export function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("buscar") ?? "";
  const rawCategory = searchParams.get("categoria");

  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoriesWarning, setCategoriesWarning] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const pendingUrlUpdate = useRef<ReturnType<typeof setTimeout> | null>(null);

  const urlCategory = useMemo(
    () => resolveCategoryFromList(rawCategory, categories),
    [rawCategory, categories],
  );

  const categoryLabelMap = useMemo(
    () => buildCategoryLabelMap(categories),
    [categories],
  );

  const displayProducts = useMemo(() => {
    if (!products) return [];
    return products.map((product) => ({
      ...product,
      category:
        categoryLabelMap.get(product.categories[0] ?? "") ??
        product.category,
    }));
  }, [products, categoryLabelMap]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasFilters = params.get("categoria") || params.get("buscar");
    const hashTargetsProducts = window.location.hash === HOME_HASH;

    if (hasFilters || hashTargetsProducts) {
      requestAnimationFrame(() => {
        document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let productData: Product[] = [];
      let productLoadFailed = false;

      try {
        productData = await fetchActiveProductsClient();
      } catch (err) {
        console.error("Error al cargar productos:", err);
        productLoadFailed = true;
      }

      try {
        const categoryData = await fetchActiveCategoriesClient();
        if (!cancelled) {
          setCategories(categoryData);
          setCategoriesWarning(null);
        }
      } catch (err) {
        console.error("Error al cargar categorías:", err);
        if (!cancelled) {
          setCategories([]);
          setCategoriesWarning(
            "No pudimos cargar los filtros por categoría. Los productos siguen disponibles.",
          );
        }
      }

      if (!cancelled) {
        if (productLoadFailed) {
          setError(
            "No pudimos cargar los productos en este momento. Por favor, intenta de nuevo más tarde.",
          );
        } else {
          setProducts(productData);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const syncUrl = useCallback(
    (category: string | null, search: string) => {
      router.replace(buildHomeUrl(category, search), { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    if (pendingUrlUpdate.current) {
      clearTimeout(pendingUrlUpdate.current);
    }

    if (searchQuery === urlSearch) return;

    pendingUrlUpdate.current = setTimeout(() => {
      syncUrl(urlCategory, searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (pendingUrlUpdate.current) {
        clearTimeout(pendingUrlUpdate.current);
      }
    };
  }, [searchQuery, urlCategory, urlSearch, syncUrl]);

  const handleCategoryChange = useCallback(
    (slug: string | null) => {
      if (pendingUrlUpdate.current) {
        clearTimeout(pendingUrlUpdate.current);
        pendingUrlUpdate.current = null;
      }
      syncUrl(slug, searchQuery);
    },
    [searchQuery, syncUrl],
  );

  const handleClearFilters = useCallback(() => {
    if (pendingUrlUpdate.current) {
      clearTimeout(pendingUrlUpdate.current);
      pendingUrlUpdate.current = null;
    }
    setSearchQuery("");
    syncUrl(null, "");
  }, [syncUrl]);

  const filteredProducts = useMemo(() => {
    return filterProducts(displayProducts, urlCategory, searchQuery);
  }, [displayProducts, urlCategory, searchQuery]);

  const hasActiveFilters = Boolean(urlCategory || searchQuery.trim());

  if (error) {
    return (
      <p role="alert" className="section-content text-center font-sans text-sm text-earth-light">
        {error}
      </p>
    );
  }

  if (products === null) {
    return (
      <div className="section-content">
        <ProductsGridSkeleton />
      </div>
    );
  }

  return (
    <div className="section-content space-y-6">
      {categoriesWarning && (
        <p role="status" className="rounded-sm border border-sand/50 bg-warm-beige/30 px-4 py-3 text-center font-sans text-sm text-earth-light">
          {categoriesWarning}
        </p>
      )}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md flex-1">
          <label htmlFor="product-search" className="sr-only">
            Buscar productos
          </label>
          <input
            id="product-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="admin-input"
            autoComplete="off"
          />
        </div>
        <p className="font-sans text-sm text-earth-light" aria-live="polite">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            onClick={() => handleCategoryChange(null)}
            aria-pressed={urlCategory === null}
            className={cn("catalog-chip", urlCategory === null && "catalog-chip-active")}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              aria-pressed={urlCategory === cat.slug}
              className={cn(
                "catalog-chip",
                urlCategory === cat.slug && "catalog-chip-active",
              )}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="rounded-sm border border-dashed border-sand/50 bg-warm-beige/20 px-6 py-12 text-center">
          <p className="font-serif text-lg text-earth">
            {hasActiveFilters
              ? "No encontramos productos para tu búsqueda."
              : "Próximamente tendremos nuevos productos disponibles."}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 font-sans text-sm text-earth underline-offset-2 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div
          key={`${urlCategory ?? "all"}-${searchQuery.trim()}`}
          className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 [&>*]:min-w-0"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              labelBySlug={categoryLabelMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
