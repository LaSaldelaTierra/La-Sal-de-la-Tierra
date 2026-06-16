import { IMAGES } from "@/lib/images";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span: "normal" | "tall" | "wide";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/images/gallery/filosofia1jpg.jpg",
    alt: "Estilo de vida con productos naturales",
    span: "wide",
  },
  {
    id: "g2",
    src: "/images/gallery/filosofia2jpg.jpg",
    alt: "Cocina consciente y materia prima noble",
    span: "wide",
  },
  {
    id: "g3",
    src: "/images/gallery/filosofia3jpg.jpg",
    alt: "Texturas y sabores artesanales",
    span: "wide",
  },
  {
    id: "g4",
    src: "/images/gallery/filosofia4jpg.jpg",
    alt: "Detalles de una cocina con alma",
    span: "tall",
  },
  {
    id: "g5",
    src: "/images/gallery/filosofia5jpg.jpg",
    alt: "Productos 100% naturales en un ambiente cálido",
    span: "tall",
  },
  {
    id: "g6",
    src: "/images/gallery/filosofia6jpg.jpg",
    alt: "Estilo de vida inspirado en la tierra",
    span: "wide",
  },
];
