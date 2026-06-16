import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const pillars = [
  {
    title: "Filosofía",
    description:
      "Creemos que lo esencial tiene poder. Cada grano de sal y cada especia llevan una intención: realzar sin opacar, acompañar sin imponer.",
  },
  {
    title: "Ingredientes naturales",
    description:
      "Seleccionamos materias primas de origen natural, sin aditivos innecesarios. Lo puro, lo honesto y lo que la tierra ofrece con generosidad.",
  },
  {
    title: "Compromiso artesanal",
    description:
      "Producimos en lotes pequeños, a mano, con tiempos respetados. La paciencia y el cuidado son parte inseparable de nuestro oficio.",
  },
];

export function Philosophy() {
  return (
    <section
      id="filosofia"
      className="section-padding relative overflow-hidden bg-earth"
      aria-labelledby="philosophy-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #e8dccb 0%, transparent 50%), radial-gradient(circle at 80% 50%, #7a8450 0%, transparent 40%)",
        }}
      />

      <div className="container-padding relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Nuestra esencia"
            title="Más que sal, una manera de cocinar"
            description="Una marca nacida del respeto por la tierra, la cocina consciente y el placer de lo auténtico."
            variant="dark"
          />
        </ScrollReveal>

        <div className="section-content grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <article className="group border-t border-cream/15 pt-6 transition-colors duration-500 hover:border-cream/30 sm:pt-7">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-olive/80">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-medium text-cream">
                  {pillar.title}
                </h3>
                <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-cream/65 sm:text-sm md:text-[0.95rem]">
                  {pillar.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 sm:mt-14 md:mt-16">
          <figure className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-px w-16 bg-cream/20 sm:mb-7" />
            <blockquote>
              <p className="font-serif text-xl font-medium italic leading-snug text-cream min-[375px]:text-2xl sm:text-3xl md:text-4xl md:leading-tight">
                Cocinar bien es un acto de cuidado.
                <br className="hidden sm:block" />
                Nosotros ponemos el alma; tú pones el corazón.
              </p>
            </blockquote>
            <figcaption className="mt-6 font-sans text-xs font-medium uppercase tracking-[0.3em] text-cream/45 sm:mt-7">
              La Sal de la Tierra
            </figcaption>
            <div className="mx-auto mt-6 h-px w-16 bg-cream/20 sm:mt-7" />
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
