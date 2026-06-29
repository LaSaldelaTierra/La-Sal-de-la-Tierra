import { Suspense } from "react";
import { ProductsCatalog } from "@/components/sections/ProductsCatalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function CatalogFallback() {
  return <div className="section-content h-48 animate-pulse rounded-sm bg-warm-beige/40" />;
}

export function Products() {
  return (
    <section
      id="productos"
      className="section-padding bg-cream"
      aria-labelledby="products-heading"
    >
      <div className="container-padding mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Productos"
            title="Nuestras selecciones 100% naturales"
            description="Explora nuestras sales y mezclas artesanales. Filtra por categoría o busca por nombre."
          />
        </ScrollReveal>

        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog />
        </Suspense>
      </div>
    </section>
  );
}
