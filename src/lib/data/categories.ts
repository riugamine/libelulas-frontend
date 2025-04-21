export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
};

export const categories: Category[] = [
  {
    id: "1",
    name: "Agendas",
    slug: "agendas",
    description: "Agendas personalizadas para organizar tu día a día",
    subcategories: [
      {
        id: "1",
        name: "Agendas Ejecutivas",
        slug: "agendas-ejecutivas",
        categoryId: "1"
      },
      {
        id: "2",
        name: "Planners",
        slug: "planners",
        categoryId: "1"
      }
    ]
  },
  {
    id: "2",
    name: "Libretas",
    slug: "libretas",
    description: "Libretas personalizadas para todas tus necesidades",
    subcategories: [
      {
        id: "3",
        name: "Libretas Artísticas",
        slug: "libretas-artisticas",
        categoryId: "2"
      },
      {
        id: "4",
        name: "Cuadernos",
        slug: "cuadernos",
        categoryId: "2"
      },
      {
        id: "5",
        name: "Libretas de Viaje",
        slug: "libretas-viaje",
        categoryId: "2"
      }
    ]
  }
];

export const subcategories: Subcategory[] = categories.flatMap(category => 
  category.subcategories
);