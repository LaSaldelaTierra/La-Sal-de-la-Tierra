export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: "select" | "blend" | "pack" | "quality";
}

export const processSteps: ProcessStep[] = [
  {
    id: "seleccion",
    title: "Selección de ingredientes",
    description:
      "Elegimos materias primas de origen natural, priorizando proveedores locales y estándares de calidad exigentes.",
    icon: "select",
  },
  {
    id: "mezcla",
    title: "Mezcla artesanal",
    description:
      "Cada lote se prepara a mano, en pequeñas cantidades, respetando tiempos y proporciones para lograr el perfil perfecto.",
    icon: "blend",
  },
  {
    id: "envasado",
    title: "Envasado cuidadoso",
    description:
      "Envasamos con precisión para preservar aroma, textura y frescura. Presentación elegante, lista para tu cocina.",
    icon: "pack",
  },
  {
    id: "calidad",
    title: "Control de calidad",
    description:
      "Revisamos cada producto antes de salir. Solo lo que cumple nuestros estándares llega a tus manos.",
    icon: "quality",
  },
];
