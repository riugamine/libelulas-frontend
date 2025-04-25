export type ProductColor = {
  id: string;
  name: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  colors: ProductColor[];
  images: string[];
  collectionIds?: string[];
  featured: boolean;
  stock: number;
  image: string;
};

export const colors: ProductColor[] = [
  { id: "1", name: "Verde", value: "#6A9750" },
  { id: "2", name: "Azul", value: "#4A90E2" },
  { id: "3", name: "Rosa", value: "#E24A8D" },
  { id: "4", name: "Dorado", value: "#B5935F" },
  { id: "5", name: "Negro", value: "#333333" },
];

export const products: Product[] = [
  {
    id: "7",
    name: "Agenda Atemporal",
    slug: "agenda-atemporal",
    description: "Agenda versátil y atemporal con diseño minimalista. Perfecta para organizar tus actividades en cualquier momento del año sin fechas predefinidas.",
    price: 29.99,
    categoryId: "1",
    subcategoryId: "1",
    colors: [colors[0], colors[1], colors[4]],
    images: [
      "/images/products/agenda-atemporal/agenda-atemporal-1.jpg",
      "/images/products/agenda-atemporal/agenda-atemporal-2.jpg",
      "/images/products/agenda-atemporal/agenda-atemporal-3.jpg",
      "/images/products/agenda-atemporal/agenda-atemporal-4.jpg",
      "/images/products/agenda-atemporal/agenda-atemporal-5.jpg",
      "/images/products/agenda-atemporal/agenda-atemporal-6.jpg"
    ],
    collectionIds: ["1", "2"], // Ahora pertenece a las colecciones "Día del Padre" y "Abogados"
    featured: true,
    stock: 20,
    image: "/images/products/agenda-atemporal/agenda-atemporal-1.jpg"
  },
  {
    id: "1",
    name: "Agenda Ejecutiva 2024",
    slug: "agenda-ejecutiva-2024",
    description: "Agenda ejecutiva personalizada con diseños exclusivos. Incluye planificador mensual, semanal y espacio para notas.",
    price: 25.99,
    categoryId: "1",
    subcategoryId: "1",
    colors: [colors[0], colors[1], colors[4]],
    images: [
      "/images/products/agenda-floral-1.jpg", 
      "/images/products/agenda-floral-2.jpg", 
      "/images/products/agenda-floral-3.jpg"
    ],
    collectionIds: ["2"], // Pertenece solo a la colección "Abogados"
    featured: true,
    stock: 15,
    image: "/images/products/agenda-floral-1.jpg"
  },
  {
    id: "15",
    name: "Taza Personalizada",
    slug: "taza-personalizada",
    description: "Taza de cerámica de alta calidad con diseños personalizados. Perfecta para regalo o uso diario.",
    price: 15.99,
    categoryId: "3",
    subcategoryId: "6",
    colors: [colors[0], colors[1], colors[3]],
    images: [
      "/images/products/taza-personalizada/taza-1.jpg",
      "/images/products/taza-personalizada/taza-2.jpg"
    ],
    collectionIds: ["1"], // Pertenece solo a la colección "Día del Padre"
    featured: false,
    stock: 30,
    image: "/images/products/taza-personalizada/taza-1.jpg"
  },
  {
    id: "16",
    name: "Llavero Personalizado",
    slug: "llavero-personalizado",
    description: "Llavero metálico con diseños personalizados. Ideal para regalo o uso personal.",
    price: 9.99,
    categoryId: "4",
    subcategoryId: "7",
    colors: [colors[3], colors[4]],
    images: [
      "/images/products/llavero-personalizado/llavero-1.jpg",
      "/images/products/llavero-personalizado/llavero-2.jpg"
    ],
    collectionIds: ["1"], // Pertenece solo a la colección "Día del Padre"
    featured: false,
    stock: 50,
    image: "/images/products/llavero-personalizado/llavero-1.jpg"
  }
];