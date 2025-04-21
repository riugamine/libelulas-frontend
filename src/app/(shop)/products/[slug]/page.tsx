import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/lib/data/products";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container py-8">
      <ProductDetail product={product} />
      
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}