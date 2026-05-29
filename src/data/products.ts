import { IMAGES } from "@/lib/images";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: "sal-mar-pimienta-negra",
    name: "Sal de Mar con Pimienta Negra",
    description:
      "Cristales de mar con pimienta negra. Ideal para carnes, vegetales asados y platos con carácter.",
    category: "Sal Gourmet",
    image: IMAGES.products.salPimientaNegra,
    imageAlt: "Cristales de sal de mar en recipiente artesanal",
  },
  {
    id: "sal-mar-parrillera-chimichurri-merken",
    name: "Sal de Mar Parrillera con Chimichurri y Merken",
    description:
      "Mezcla equilibrada de Sal de Mar con Oregano, Pimenton, Ajo, Perejil y Merken.",
    category: "Especias",
    image: IMAGES.products.salParrillera,
    imageAlt: "Sal parrillera artesanal con mezcla de especias",
  },
  {
    id: "sal-rosada-gourmet",
    name: "Proximamente!",
    description:
      "Estamos trabajando para más productos.",
    category: "Proximamente!",
    image: IMAGES.products.placeholder,
    imageAlt: "Sal rosada del Himalaya",
  },
  {
    id: "aderezo-mediterraneo",
    name: "Aderezo Mediterráneo",
    description:
      "Hierbas secas, ajo y especias en perfecta armonía. El sabor del Mediterráneo en cada cucharada.",
    category: "Mezclas",
    image: IMAGES.products.placeholder,
    imageAlt: "Hierbas de Provenza y especias mediterráneas secas",
  },
  {
    id: "sal-ajo-artesanal",
    name: "Sal de Ajo Artesanal",
    description:
      "Ajo deshidratado lentamente mezclado con sal de mar. Sabor profundo y auténtico para tus recetas favoritas.",
    category: "Sal Gourmet",
    image: IMAGES.products.placeholder,
    imageAlt: "Cabezas de ajo fresco para sal de ajo artesanal",
  },
];
