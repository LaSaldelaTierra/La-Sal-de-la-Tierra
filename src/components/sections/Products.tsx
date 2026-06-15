import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function Products() {
  let products;
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch {
    error =
      "No pudimos cargar los productos en este momento. Por favor, intenta de nuevo más tarde.";
  }

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

        {error ? (
          <p
            role="alert"
            className="section-content text-center font-sans text-sm text-earth-light"
          >
            {error}
          </p>
        ) : products && products.length > 0 ? (
          <div className="section-content grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4 lg:max-w-none [&>*]:min-w-0">
            {products.slice(0, 8).map((product, index) => (
              <ScrollReveal key={product.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="section-content text-center font-sans text-sm text-earth-light">
            Próximamente tendremos nuevos productos disponibles.
          </p>
        )}
      </div>
    </section>
  );
}
