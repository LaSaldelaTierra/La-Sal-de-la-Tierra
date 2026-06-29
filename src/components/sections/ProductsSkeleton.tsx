import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductsSkeleton() {
  return (
    <section
      id="productos"
      className="section-padding bg-cream"
      aria-labelledby="products-heading"
      aria-busy="true"
    >
      <div className="container-padding mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Productos"
            title="Nuestras selecciones 100% naturales"
            description="Una selección de sales y mezclas artesanales. Cada pieza es una invitación a cocinar con intención, sin prisa y con alma."
          />
        </ScrollReveal>

        <div className="section-content grid items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 [&>*]:min-w-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="product-skeleton animate-pulse">
              <div className="product-skeleton-image" />
              <div className="product-skeleton-body">
                <div className="h-3 w-16 rounded bg-warm-beige" />
                <div className="h-5 w-3/4 rounded bg-warm-beige" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-warm-beige" />
                  <div className="h-3 w-5/6 rounded bg-warm-beige" />
                </div>
                <div className="mt-auto h-4 w-24 rounded bg-warm-beige" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
