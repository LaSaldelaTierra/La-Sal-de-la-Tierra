import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
            eyebrow="Galería"
            title="Nuestra galería de sabores"
            description="Una selección de sales y mezclas artesanales. Cada pieza es una invitación a cocinar con intención, sin prisa y con alma."
          />
        </ScrollReveal>

        <div className="section-content grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-9 [&>*:last-child]:sm:col-span-2 [&>*:last-child]:sm:max-w-sm [&>*:last-child]:sm:justify-self-center lg:[&>*:last-child]:col-span-1 lg:max-w-none">
          {products.slice(0, 3).map((product, index) => (
            <ScrollReveal key={product.id} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
