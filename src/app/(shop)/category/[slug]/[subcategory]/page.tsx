import { notFound } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { categories, subcategories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { Separator } from "@/components/ui/separator";

interface SubcategoryPageProps {
  params: {
    slug: string;
    subcategory: string;
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  // Validar y obtener la categoría
  const category = categories.find(c => c.slug === resolvedParams.slug);
  
  if (!category) {
    notFound();
  }
  
  // Validar y obtener la subcategoría
  const subcategory = subcategories.find(
    s => s.slug === resolvedParams.subcategory && s.categoryId === category.id
  );
  
  if (!subcategory) {
    notFound();
  }
  
  // Obtener productos de esta subcategoría
  const subcategoryProducts = products.filter(p => p.subcategoryId === subcategory.id);
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      {/* Navegación */}
      <div className="mb-12">
        <Link href={`/category/${category.slug}`}>
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:bg-primary/10 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-3 w-3" />
            Volver a {category.name}
          </Button>
        </Link>
      </div>
      
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{subcategory.name}</h1>
      </div>
      
      <Separator className="mb-12" />
      
      {/* Contenido Principal */}
      {subcategoryProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium mb-3">
            No hay productos en esta subcategoría
          </h2>
          <p className="text-gray-600">
            Intenta con otra subcategoría o vuelve más tarde
          </p>
          <Link href={`/category/${category.slug}`} className="mt-6 inline-block">
            <Button variant="outline" size="lg">
              Ver todos los productos de {category.name}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-sm text-gray-500 text-center">
            {subcategoryProducts.length} {subcategoryProducts.length === 1 ? 'producto' : 'productos'} encontrados
          </div>
          <ProductGrid products={subcategoryProducts} />
        </div>
      )}
    </div>
  );
}