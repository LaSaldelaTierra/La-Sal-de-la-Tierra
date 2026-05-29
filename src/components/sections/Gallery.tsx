import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const spanClasses: Record<string, string> = {
  normal: "col-span-1 row-span-1",
  tall: "col-span-1 row-span-1 sm:row-span-2",
  wide: "col-span-1 row-span-1 sm:col-span-2",
};

export function Gallery() {
  return (
    <section
      className="section-padding bg-cream"
      aria-labelledby="gallery-heading"
    >
      <div className="container-padding mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Estilo de vida"
            title="Cocina con alma"
            description="Un vistazo a la estética que nos inspira: cocina consciente, materia prima noble y la belleza de lo simple."
          />
        </ScrollReveal>

        <div className="section-content grid auto-rows-[minmax(180px,1fr)] grid-cols-1 gap-3 sm:auto-rows-[200px] sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:auto-rows-[220px]">
          {galleryImages.map((image, index) => {
            const isPlaceholder = image.src.includes("proximamente");

            return (
              <ScrollReveal
                key={image.id}
                className={spanClasses[image.span]}
                delay={((index % 3) + 1) as 1 | 2 | 3}
              >
                <div className="group relative h-full min-h-[200px] overflow-hidden rounded-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={
                      isPlaceholder
                        ? "object-contain p-4 transition-transform duration-500 ease-out"
                        : "object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    }
                    loading="lazy"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-earth/0 transition-colors duration-500 group-hover:bg-earth/10" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
