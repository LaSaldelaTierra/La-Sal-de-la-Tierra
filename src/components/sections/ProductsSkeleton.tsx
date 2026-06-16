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
            title="Nuestros productos 100% naturales"
            description="Una selección de sales y mezclas artesanales. Cada pieza es una invitación a cocinar con intención, sin prisa y con alma."
          />
        </ScrollReveal>

        <div className="section-content grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-9">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col animate-pulse">
              <div className="aspect-[4/5] rounded-sm bg-warm-beige" />
              <div className="pt-5 sm:pt-6">
                <div className="mb-2 h-3 w-20 rounded bg-warm-beige" />
                <div className="h-6 w-3/4 rounded bg-warm-beige" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full rounded bg-warm-beige" />
                  <div className="h-3 w-5/6 rounded bg-warm-beige" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
