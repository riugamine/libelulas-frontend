import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  // Get products in this category
  const categoryProducts = products.filter(p => p.categoryId === category.id);
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>
      
      {category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {category.subcategories.map((subcategory) => (
            <a
              key={subcategory.id}
              href={`/category/${category.slug}/${subcategory.slug}`}
              className="px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded-full text-sm font-medium"
            >
              {subcategory.name}
            </a>
          ))}
        </div>
      )}
      
      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No hay productos en esta categoría</h2>
          <p className="text-gray-600">Intenta con otra categoría o vuelve más tarde</p>
        </div>
      ) : (
        <ProductGrid products={categoryProducts} />
      )}
    </div>
  );
}