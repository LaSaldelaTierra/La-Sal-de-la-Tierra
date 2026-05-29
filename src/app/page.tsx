import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Philosophy } from "@/components/sections/Philosophy";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <About />
      <Process />
      <Philosophy />
      <Gallery />
      <Contact />
    </>
  );
}
