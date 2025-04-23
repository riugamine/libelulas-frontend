export type ProductColor = {
  id: string;
  name: string;
  value: string;
};

export type ProductDesign = {
  id: string;
  name: string;
  images: string[];
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
  designs: ProductDesign[];
  featured: boolean;
  stock: number;
  image: string; // Nueva propiedad para la imagen principal
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
    designs: [
      {
        id: "13",
        name: "Atemporal Clásico",
        images: [
          "/images/products/agenda-atemporal/agenda-atemporal-1.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-2.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-3.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-4.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-5.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-6.jpg"
        ]
      },
      {
        id: "14",
        name: "Atemporal Premium",
        images: [
          "/images/products/agenda-atemporal/agenda-atemporal-7.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-8.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-9.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-10.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-11.jpg",
          "/images/products/agenda-atemporal/agenda-atemporal-12.jpg"
        ]
      }
    ],
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
    designs: [
      {
        id: "1",
        name: "Floral",
        images: ["/images/products/agenda-floral-1.jpg", "/images/products/agenda-floral-2.jpg", "/images/products/agenda-floral-3.jpg"]
      },
      {
        id: "2",
        name: "Geométrico",
        images: ["/images/products/agenda-geometrica-1.jpg", "/images/products/agenda-geometrica-2.jpg", "/images/products/agenda-geometrica-3.jpg"]
      }
    ],
    featured: true,
    stock: 15,
    image: "/images/products/agenda-floral-1.jpg" // Imagen principal
  },
  {
    id: "2",
    name: "Libreta Artística A5",
    slug: "libreta-artistica-a5",
    description: "Libreta de alta calidad con papel especial para dibujo y técnicas artísticas. Personalizable con diferentes diseños.",
    price: 18.50,
    categoryId: "2",
    subcategoryId: "3",
    colors: [colors[0], colors[2], colors[3]],
    designs: [
      {
        id: "3",
        name: "Abstracto",
        images: ["/images/products/libreta-abstracta-1.jpg", "/images/products/libreta-abstracta-2.jpg", "/images/products/libreta-abstracta-3.jpg"]
      },
      {
        id: "4",
        name: "Minimalista",
        images: ["/images/products/libreta-minimalista-1.jpg", "/images/products/libreta-minimalista-2.jpg", "/images/products/libreta-minimalista-3.jpg"]
      }
    ],
    featured: false,
    stock: 25,
    image: "/images/products/libreta-abstracta-1.jpg" // Imagen principal
  },
  {
    id: "3",
    name: "Planner Semanal",
    slug: "planner-semanal",
    description: "Organizador semanal con espacio para metas, hábitos y seguimiento de tareas. Diseño práctico y elegante.",
    price: 22.99,
    categoryId: "1",
    subcategoryId: "2",
    colors: [colors[1], colors[3], colors[4]],
    designs: [
      {
        id: "5",
        name: "Botánico",
        images: ["/images/products/planner-botanico-1.jpg", "/images/products/planner-botanico-2.jpg", "/images/products/planner-botanico-3.jpg"]
      },
      {
        id: "6",
        name: "Moderno",
        images: ["/images/products/planner-moderno-1.jpg", "/images/products/planner-moderno-2.jpg", "/images/products/planner-moderno-3.jpg"]
      }
    ],
    featured: true,
    stock: 10,
    image: "/images/products/planner-botanico-1.jpg" // Imagen principal
  },
  {
    id: "4",
    name: "Cuaderno de Notas Premium",
    slug: "cuaderno-notas-premium",
    description: "Cuaderno de tapa dura con papel de alta calidad. Ideal para tomar notas, hacer bocetos o llevar un diario.",
    price: 15.99,
    categoryId: "2",
    subcategoryId: "4",
    colors: [colors[0], colors[2], colors[4]],
    designs: [
      {
        id: "7",
        name: "Clásico",
        images: ["/images/products/cuaderno-clasico-1.jpg", "/images/products/cuaderno-clasico-2.jpg", "/images/products/cuaderno-clasico-3.jpg"]
      },
      {
        id: "8",
        name: "Contemporáneo",
        images: ["/images/products/cuaderno-contemporaneo-1.jpg", "/images/products/cuaderno-contemporaneo-2.jpg", "/images/products/cuaderno-contemporaneo-3.jpg"]
      }
    ],
    featured: false,
    stock: 30,
    image: "/images/products/cuaderno-clasico-1.jpg" // Imagen principal
  },
  {
    id: "5",
    name: "Agenda Académica 2023-2024",
    slug: "agenda-academica-2023-2024",
    description: "Agenda diseñada para estudiantes con calendario académico, horarios de clases y planificador de exámenes.",
    price: 24.99,
    categoryId: "1",
    subcategoryId: "1",
    colors: [colors[1], colors[2], colors[4]],
    designs: [
      {
        id: "9",
        name: "Universitario",
        images: ["/images/products/agenda-universitaria-1.jpg", "/images/products/agenda-universitaria-2.jpg", "/images/products/agenda-universitaria-3.jpg"]
      },
      {
        id: "10",
        name: "Juvenil",
        images: ["/images/products/agenda-juvenil-1.jpg", "/images/products/agenda-juvenil-2.jpg", "/images/products/agenda-juvenil-3.jpg"]
      }
    ],
    featured: true,
    stock: 20,
    image: "/images/products/agenda-universitaria-1.jpg" // Imagen principal
  },
  {
    id: "6",
    name: "Libreta de Viaje",
    slug: "libreta-viaje",
    description: "Libreta compacta ideal para llevar en tus viajes. Incluye secciones para itinerarios, gastos y recuerdos.",
    price: 16.50,
    categoryId: "2",
    subcategoryId: "5",
    colors: [colors[0], colors[3], colors[4]],
    designs: [
      {
        id: "11",
        name: "Aventura",
        images: ["/images/products/libreta-aventura-1.jpg", "/images/products/libreta-aventura-2.jpg", "/images/products/libreta-aventura-3.jpg"]
      },
      {
        id: "12",
        name: "Mapamundi",
        images: ["/images/products/libreta-mapamundi-1.jpg", "/images/products/libreta-mapamundi-2.jpg", "/images/products/libreta-mapamundi-3.jpg"]
      }
    ],
    featured: false,
    stock: 15,
    image: "/images/products/libreta-aventura-1.jpg" // Imagen principal
  }
];