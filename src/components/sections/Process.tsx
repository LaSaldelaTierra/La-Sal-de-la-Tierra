import { processSteps } from "@/data/process";
import { ProcessIcon } from "@/components/ui/ProcessIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Process() {
  return (
    <section
      id="proceso"
      className="section-padding bg-cream"
      aria-labelledby="process-heading"
    >
      <div className="container-padding mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Nuestro proceso"
            title="Del ingrediente a tu mesa"
            description="Cuatro etapas cuidadosas que garantizan calidad, sabor y autenticidad en cada producto."
          />
        </ScrollReveal>

        <ol className="section-content relative space-y-0">
          <div
            className="absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-sand via-olive/30 to-sand lg:left-1/2 lg:block lg:-translate-x-1/2"
            aria-hidden="true"
          />

          {processSteps.map((step, index) => (
            <ScrollReveal key={step.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
              <li
                className={`relative flex flex-col gap-6 pb-10 last:pb-0 sm:gap-7 lg:flex-row lg:items-center lg:gap-12 lg:pb-14 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-1 lg:justify-end">
                  <div
                    className={`max-w-md ${index % 2 === 1 ? "lg:text-right" : ""}`}
                  >
                    <div className="mb-4 flex items-center gap-4 lg:hidden">
                      <ProcessIcon type={step.icon} />
                      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-olive">
                        Paso {index + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-earth">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-earth-light">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute left-7 hidden -translate-x-1/2 lg:left-1/2 lg:flex"
                  aria-hidden="true"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-cream ring-4 ring-cream">
                    <ProcessIcon type={step.icon} />
                  </div>
                </div>

                <div className="hidden flex-1 lg:block" />
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
