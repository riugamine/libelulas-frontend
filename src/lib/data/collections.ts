export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  designs: CollectionDesign[];
};

export type CollectionDesign = {
  id: string;
  name: string;
  description: string;
  products: CollectionProduct[];
};

export type CollectionProduct = {
  id: string;
  productId: string;
  productType: string; // 'agenda' | 'libreta' | 'taza' | 'llavero'
  images: string[];
  price: number;
  colors: string[]; // IDs de los colores disponibles
};

export const collections: Collection[] = [
  {
    id: "1",
    name: "Día del Padre",
    slug: "dia-del-padre",
    description: "Colección especial para celebrar el día del padre",
    designs: [
      {
        id: "dp-1",
        name: "Súper Papá",
        description: "Diseño inspirado en superhéroes para papá",
        products: [
          {
            id: "dp1-agenda",
            productId: "7",
            productType: "agenda",
            images: [
              "/images/collections/dia-padre/super-papa/agenda-1.jpg",
              "/images/collections/dia-padre/super-papa/agenda-2.jpg"
            ],
            price: 29.99,
            colors: ["1", "2", "4"]
          },
          {
            id: "dp1-taza",
            productId: "15",
            productType: "taza",
            images: [
              "/images/collections/dia-padre/super-papa/taza-1.jpg",
              "/images/collections/dia-padre/super-papa/taza-2.jpg"
            ],
            price: 15.99,
            colors: ["1", "4"]
          }
        ]
      },
      {
        id: "dp-2",
        name: "Papá Hogareño",
        description: "Diseño dedicado a los padres que aman el hogar y la familia",
        products: [
          {
            id: "dp2-agenda",
            productId: "7",
            productType: "agenda",
            images: [
              "/images/collections/dia-padre/papa-hogareno/agenda-1.jpg",
              "/images/collections/dia-padre/papa-hogareno/agenda-2.jpg"
            ],
            price: 29.99,
            colors: ["1", "3", "5"]
          },
          {
            id: "dp2-llavero",
            productId: "16",
            productType: "llavero",
            images: [
              "/images/collections/dia-padre/papa-hogareno/llavero-1.jpg",
              "/images/collections/dia-padre/papa-hogareno/llavero-2.jpg"
            ],
            price: 9.99,
            colors: ["1", "4"]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Abogados",
    slug: "abogados",
    description: "Colección especial para profesionales del derecho",
    designs: [
      {
        id: "ab-1",
        name: "Justicia Clásica",
        description: "Diseño elegante con elementos clásicos de la justicia",
        products: [
          {
            id: "ab1-agenda",
            productId: "7",
            productType: "agenda",
            images: [
              "/images/collections/abogados/justicia-clasica/agenda-1.jpg",
              "/images/collections/abogados/justicia-clasica/agenda-2.jpg"
            ],
            price: 34.99,
            colors: ["4", "5"]
          },
          {
            id: "ab1-taza",
            productId: "15",
            productType: "taza",
            images: [
              "/images/collections/abogados/justicia-clasica/taza-1.jpg",
              "/images/collections/abogados/justicia-clasica/taza-2.jpg"
            ],
            price: 17.99,
            colors: ["4", "5"]
          }
        ]
      },
      {
        id: "ab-2",
        name: "Leyes Modernas",
        description: "Diseño contemporáneo para abogados modernos",
        products: [
          {
            id: "ab2-agenda",
            productId: "7",
            productType: "agenda",
            images: [
              "/images/collections/abogados/leyes-modernas/agenda-1.jpg",
              "/images/collections/abogados/leyes-modernas/agenda-2.jpg"
            ],
            price: 34.99,
            colors: ["2", "5"]
          }
        ]
      }
    ]
  }
];