import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.image || "/images/placeholder.jpg";
  
  // Encontrar la colección a la que pertenece el producto
  const productCollection = collections.find(collection =>
    collection.designs.some(design =>
      design.products.some(p => p.productId === product.id)
    )
  );
  
  return (
    <Card className="group relative overflow-hidden bg-white rounded-3xl border-0 transition-all">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl m-3 bg-gray-100">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* Badge de Categoría */}
            <Badge 
              variant="secondary" 
              className="bg-white/80 backdrop-blur-sm"
            >
              {product.categoryId === "1" ? "Agendas" : 
               product.categoryId === "2" ? "Libretas" : 
               product.categoryId === "3" ? "Tazas" : "Llaveros"}
            </Badge>
            
            {/* Badge de Colección si existe */}
            {productCollection && (
              <Badge 
                variant="default"
                className="bg-primary/80 text-white backdrop-blur-sm"
              >
                {productCollection.name}
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="p-4 pt-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-lg text-gray-900 mb-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-primary-600 font-semibold">${product.price.toFixed(2)}</p>
          <Badge variant={product.stock > 0 ? "outline" : "destructive"} className="text-xs">
            {product.stock > 0 ? "Disponible" : "Agotado"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}