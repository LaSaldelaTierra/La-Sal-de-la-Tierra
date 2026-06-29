import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section
      id="nosotros"
      className="section-padding bg-warm-beige/30"
      aria-labelledby="about-heading"
    >
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[3/4]">
              <Image
                src={IMAGES.about}
                alt="Sal artesanal y condimentos naturales con estética orgánica"
                unoptimized
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-earth/8" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <SectionHeading
              eyebrow="Nuestra historia"
              title="Un emprendimiento con alma familiar"
              align="left"
            />
            <div className="mt-7 space-y-5 font-sans text-base leading-[1.75] text-earth-light sm:mt-8">
              <p>
                <strong className="font-medium text-earth">{SITE.name}</strong>{" "}
                nació en una cocina familiar, con la convicción de que los
                ingredientes más simples pueden transformar un plato cuando se
                elaboran con dedicación y Amor.
              </p>
              <p>
                Seleccionamos materias primas naturales, priorizamos procesos
                artesanales y rechazamos atajos industriales. Cada frasco que
                sale de nuestro taller lleva horas de cuidado, mezcla y revisión.
              </p>
              <p>
                Creemos en la cocina como un lugar para compartir, crear y
                disfrutar. Diseñamos productos que honran la calidad, la
                autenticidad y el placer de cocinar con pasión.
              </p>
            </div>

            <ul className="mt-8 grid gap-5 border-t border-sand/40 pt-6 sm:mt-9 sm:grid-cols-3 sm:gap-6 sm:pt-7">
              {[
                { value: "100%", label: "Ingredientes naturales" },
                { value: "Artesanal", label: "Producción a mano" },
                { value: "Chile", label: "Origen local" },
              ].map((stat) => (
                <li key={stat.label}>
                  <p className="font-serif text-2xl font-medium text-earth">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.15em] text-earth-light">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
