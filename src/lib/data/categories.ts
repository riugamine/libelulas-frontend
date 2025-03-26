import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Libretas',
    slug: 'libretas',
    description: 'Libretas personalizadas para todas tus necesidades',
    image: '/images/categories/libretas.jpg',
    parentId: null,
    subcategories: [
      {
        id: '1-1',
        name: 'Libretas Pequeñas',
        slug: 'libretas-pequenas',
        description: 'Libretas de tamaño pequeño, ideales para llevar a cualquier lugar',
        image: '/images/categories/libretas-pequenas.jpg',
        parentId: '1'
      },
      {
        id: '1-2',
        name: 'Libretas Medianas',
        slug: 'libretas-medianas',
        description: 'Libretas de tamaño mediano, perfectas para el día a día',
        image: '/images/categories/libretas-medianas.jpg',
        parentId: '1'
      },
      {
        id: '1-3',
        name: 'Libretas Grandes',
        slug: 'libretas-grandes',
        description: 'Libretas de tamaño grande, ideales para proyectos extensos',
        image: '/images/categories/libretas-grandes.jpg',
        parentId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Agendas',
    slug: 'agendas',
    description: 'Agendas personalizadas para organizar tu vida',
    image: '/images/categories/agendas.jpg',
    parentId: null,
    subcategories: [
      {
        id: '2-1',
        name: 'Agendas Anuales',
        slug: 'agendas-anuales',
        description: 'Agendas para planificar todo tu año',
        image: '/images/categories/agendas-anuales.jpg',
        parentId: '2'
      },
      {
        id: '2-2',
        name: 'Agendas Semanales',
        slug: 'agendas-semanales',
        description: 'Agendas con enfoque semanal para mayor detalle',
        image: '/images/categories/agendas-semanales.jpg',
        parentId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Planificadores',
    slug: 'planificadores',
    description: 'Planificadores para proyectos y metas específicas',
    image: '/images/categories/planificadores.jpg',
    parentId: null
  }
];

export const getAllCategories = () => categories;

export const getCategoryBySlug = (slug: string): Category | undefined => {
  // Check main categories
  const mainCategory = categories.find(cat => cat.slug === slug);
  if (mainCategory) return mainCategory;
  
  // Check subcategories
  for (const category of categories) {
    if (!category.subcategories) continue;
    
    const subcategory = category.subcategories.find(sub => sub.slug === slug);
    if (subcategory) return subcategory;
  }
  
  return undefined;
};