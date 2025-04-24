import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/lib/data/products";

// Componente de carga para productos relacionados
function RelatedProductsLoading() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-primary-900">Productos relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-primary-50 rounded-lg h-64 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

// Componente para productos relacionados
function RelatedProducts({ categoryId, currentProductId }: { categoryId: string, currentProductId: string }) {
  const relatedProducts = products
    .filter(p => p.categoryId === categoryId && p.id !== currentProductId)
    .slice(0, 4);
  
  if (relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 mt-16">
      <h2 className="text-2xl font-bold mb-6 text-primary-900">Productos relacionados</h2>
      <ProductGrid products={relatedProducts} />
    </div>
  );
}

interface ProductPageProps {
  params: {
    slug: string;
  };
}

/**
 * Página de detalle de producto
 * @param params - Parámetros de la ruta, incluye el slug del producto
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = products.find(p => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "MXN",
              "price": product.price,
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
      
      <div className="container mx-auto px-4">
        <ProductDetail product={product} />
        
        <Suspense fallback={<RelatedProductsLoading />}>
          <RelatedProducts 
            categoryId={product.categoryId} 
            currentProductId={product.id} 
          />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Generamos metadatos para la página
 * @param params - Parámetros de la ruta
 */
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = products.find(p => p.slug === resolvedParams.slug);
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe'
    };
  }
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mundolibelulas.com'),
    title: `${product.name} | Libélulas Design`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }]
    }
  };
}