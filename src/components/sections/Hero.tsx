import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] overflow-hidden grain-overlay"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Sal de cocina artesanal, estilo gourmet"
          unoptimized
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-cream/75 sm:bg-cream/70 dark:bg-[#100e0c]/80" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-cream dark:to-[#100e0c]" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-4xl flex-col items-center justify-center px-4 pb-10 pt-[calc(4.25rem+1rem)] text-center sm:px-8 sm:pb-12 sm:pt-[calc(4.75rem+1.25rem)]">
        <div className="animate-[fade-up_1s_cubic-bezier(0.22,1,0.36,1)_forwards]">
          <p className="mb-4 font-sans text-[12px] font-bold uppercase tracking-[0.32em] text-earth/80 sm:mb-5 sm:text-[14px] sm:tracking-[0.36em]">
            El sabor de Chile en tu mesa
          </p>

          <h1
            id="hero-heading"
            className="font-serif text-[1.75rem] font-medium leading-[1.1] text-earth min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            El sabor auténtico
            <br />
            <span className="mt-1 block italic text-earth-light">
              de la tierra
            </span>
          </h1>

          <blockquote className="scripture-quote mx-auto mt-7 max-w-lg sm:mt-9">
            <p className="font-serif text-base leading-relaxed text-earth/90 sm:text-xl md:text-[1.35rem] md:leading-relaxed">
              Vosotros sois <b>la sal de la tierra</b>;
              <br />
              pero si la sal se desvaneciere,
              <br />
              ¿con qué será salada?
            </p>
            <footer className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.25em] text-earth-light">
              Mateo 5:13
            </footer>
          </blockquote>

          <p className="mx-auto mt-7 max-w-xl px-1 font-sans text-[0.9375rem] leading-relaxed text-earth-light sm:mt-8 sm:px-0 sm:text-base md:text-[1.05rem]">
            Ingredientes naturales para quienes cocinan con Amor y Cariño. 🤎
          </p>

          <div className="mt-9 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <Button href="#productos" size="lg">
              Explorar colección
            </Button>
            <Button href="#contacto" variant="outline" size="lg">
              Escríbenos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
