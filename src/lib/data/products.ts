import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Libreta Floral',
    slug: 'libreta-floral',
    description: 'Libreta personalizada con diseño floral, perfecta para tus notas diarias. Incluye 100 hojas de papel de alta calidad y encuadernación resistente.',
    price: 15.99,
    categoryId: '1-2',
    variants: [
      {
        id: '1-1',
        color: 'Amarillo',
        colorCode: '#FFF9A6',
        images: [
          '/images/products/libreta-floral-amarillo-1.jpg',
          '/images/products/libreta-floral-amarillo-2.jpg',
          '/images/products/libreta-floral-amarillo-3.jpg',
        ],
        inStock: true
      },
      {
        id: '1-2',
        color: 'Lavanda',
        colorCode: '#D8C2E5',
        images: [
          '/images/products/libreta-floral-lavanda-1.jpg',
          '/images/products/libreta-floral-lavanda-2.jpg',
          '/images/products/libreta-floral-lavanda-3.jpg',
        ],
        inStock: true
      },
      {
        id: '1-3',
        color: 'Verde Menta',
        colorCode: '#C9E4CA',
        images: [
          '/images/products/libreta-floral-verde-1.jpg',
          '/images/products/libreta-floral-verde-2.jpg',
          '/images/products/libreta-floral-verde-3.jpg',
        ],
        inStock: false
      }
    ],
    designs: [
      {
        id: 'd1',
        name: 'Flores Silvestres',
        images: [
          '/images/products/libreta-floral-amarillo-1.jpg',
          '/images/products/libreta-floral-amarillo-2.jpg',
          '/images/products/libreta-floral-amarillo-3.jpg',
        ]
      },
      {
        id: 'd2',
        name: 'Rosas',
        images: [
          '/images/products/libreta-rosas-amarillo-1.jpg',
          '/images/products/libreta-rosas-amarillo-2.jpg',
          '/images/products/libreta-rosas-amarillo-3.jpg',
        ]
      }
    ],
    featured: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Agenda Anual Minimalista',
    slug: 'agenda-anual-minimalista',
    description: 'Agenda anual con diseño minimalista, incluye calendario, planificador mensual y semanal, y páginas para notas. Encuadernación de alta calidad.',
    price: 24.99,
    categoryId: '2-1',
    variants: [
      {
        id: '2-1',
        color: 'Rosa',
        colorCode: '#F8C8DC',
        images: [
          '/images/products/agenda-minimalista-rosa-1.jpg',
          '/images/products/agenda-minimalista-rosa-2.jpg',
          '/images/products/agenda-minimalista-rosa-3.jpg',
        ],
        inStock: true
      },
      {
        id: '2-2',
        color: 'Verde Lima',
        colorCode: '#D9E17F',
        images: [
          '/images/products/agenda-minimalista-verde-1.jpg',
          '/images/products/agenda-minimalista-verde-2.jpg',
          '/images/products/agenda-minimalista-verde-3.jpg',
        ],
        inStock: true
      }
    ],
    designs: [
      {
        id: 'd3',
        name: 'Líneas',
        images: [
          '/images/products/agenda-minimalista-rosa-1.jpg',
          '/images/products/agenda-minimalista-rosa-2.jpg',
          '/images/products/agenda-minimalista-rosa-3.jpg',
        ]
      },
      {
        id: 'd4',
        name: 'Puntos',
        images: [
          '/images/products/agenda-puntos-rosa-1.jpg',
          '/images/products/agenda-puntos-rosa-2.jpg',
          '/images/products/agenda-puntos-rosa-3.jpg',
        ]
      }
    ],
    featured: true,
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-02-10T00:00:00Z'
  },
  // Add more products as needed
];

export const getAllProducts = () => products;

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};