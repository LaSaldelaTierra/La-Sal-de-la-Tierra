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
    src: IMAGES.gallery.placeholder,
    alt: "Próximamente",
    span: "wide",
  },
  {
    id: "g2",
    src: IMAGES.gallery.placeholder,
    alt: "Próximamente",
    span: "normal",
  },
  {
    id: "g3",
    src: IMAGES.gallery.placeholder,
    alt: "Próximamente",
    span: "tall",
  },
  {
    id: "g4",
    src: IMAGES.gallery.placeholder,
    alt: "Próximamente",
    span: "normal",
  },
  {
    id: "g5",
    src: IMAGES.gallery.placeholder,
    alt: "Próximamente",
    span: "normal",
  },
  {
    id: "g6",
    src: IMAGES.gallery.placeholder,
    alt: "Próximamente",
    span: "wide",
  },
];
