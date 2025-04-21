import { notFound } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { categories, subcategories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";

interface SubcategoryPageProps {
  params: {
    slug: string;
    subcategory: string;
  };
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  const subcategory = subcategories.find(
    s => s.slug === params.subcategory && s.categoryId === category.id
  );
  
  if (!subcategory) {
    notFound();
  }
  
  // Get products in this subcategory
  const subcategoryProducts = products.filter(p => p.subcategoryId === subcategory.id);
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href={`/category/${category.slug}`}>
          <Button variant="ghost" size="sm">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-3 w-3" />
            Volver a {category.name}
          </Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">{subcategory.name}</h1>
      
      {subcategoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No hay productos en esta subcategoría</h2>
          <p className="text-gray-600">Intenta con otra subcategoría o vuelve más tarde</p>
        </div>
      ) : (
        <ProductGrid products={subcategoryProducts} />
      )}
    </div>
  );
}