export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  subcategories?: Category[];
};

export type ProductVariant = {
  id: string;
  color: string;
  colorCode: string;
  images: string[];
  inStock: boolean;
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
  variants: ProductVariant[];
  designs: ProductDesign[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};