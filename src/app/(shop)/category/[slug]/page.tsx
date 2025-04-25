import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { Separator } from "@/components/ui/separator";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const category = categories.find(c => c.slug === resolvedParams.slug);
  
  if (!category) {
    notFound();
  }
  
  // Get products in this category
  const categoryProducts = products.filter(p => p.categoryId === category.id);
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
      </div>
      
      {category.subcategories.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {category.subcategories.map((subcategory) => (
              <a
                key={subcategory.id}
                href={`/category/${category.slug}/${subcategory.slug}`}
                className="px-6 py-2.5 bg-primary-50 hover:bg-primary-100 rounded-full 
                          text-sm font-medium transition-colors duration-200 
                          text-primary-900 hover:text-primary-800"
              >
                {subcategory.name}
              </a>
            ))}
          </div>
          <Separator className="mb-12" />
        </>
      )}
      
      {categoryProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium mb-3">No hay productos en esta categoría</h2>
          <p className="text-gray-600">Intenta con otra categoría o vuelve más tarde</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-sm text-gray-500 text-center">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'producto' : 'productos'} encontrados
          </div>
          <ProductGrid products={categoryProducts} />
        </div>
      )}
    </div>
  );
}