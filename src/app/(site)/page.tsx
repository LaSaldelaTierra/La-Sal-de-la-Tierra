import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { ProductsSkeleton } from "@/components/sections/ProductsSkeleton";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Philosophy } from "@/components/sections/Philosophy";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ProductsSkeleton />}>
        <Products />
      </Suspense>
      <About />
      <Process />
      <Philosophy />
      <Gallery />
      <Contact />
    </>
  );
}
