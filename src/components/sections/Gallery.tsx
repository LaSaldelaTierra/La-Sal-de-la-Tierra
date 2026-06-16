import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Gallery() {
  return (
    <section
      className="py-3 bg-cream"
      aria-labelledby="gallery-heading"
    >
      <div className="container-padding mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Estilo de vida"
            title="Cocina con alma"
            description="Un vistazo a la estética que nos inspira: cocina consciente, materia prima noble y la belleza de lo simple."
          />
        </ScrollReveal>

        <div className="section-content flex flex-col gap-1 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            {galleryImages.filter((_, index) => index % 2 === 0).map((image, index) => (
              <ScrollReveal
                key={image.id}
                delay={((index % 3) + 1) as 1 | 2 | 3}
              >
                <div className="overflow-hidden rounded-sm bg-earth/5 p-0.5">
                  <div
                    className={
                      image.span === "wide"
                        ? "relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-earth/10"
                        : image.span === "tall"
                        ? "relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-earth/10"
                        : "relative aspect-[1/1] w-full overflow-hidden rounded-sm bg-earth/10"
                    }
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            {galleryImages.filter((_, index) => index % 2 === 1).map((image, index) => (
              <ScrollReveal
                key={image.id}
                delay={((index % 3) + 1) as 1 | 2 | 3}
              >
                <div className="overflow-hidden rounded-sm bg-earth/5 p-0.5">
                  <div
                    className={
                      image.span === "wide"
                        ? "relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-earth/10"
                        : image.span === "tall"
                        ? "relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-earth/10"
                        : "relative aspect-[1/1] w-full overflow-hidden rounded-sm bg-earth/10"
                    }
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
