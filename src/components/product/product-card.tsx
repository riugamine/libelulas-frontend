import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Usar la primera imagen del primer diseño como imagen principal
  const mainImage = product.designs[0]?.images[0] || "/images/placeholder.jpg";
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
        </Link>
        <p className="text-primary-600 font-bold mt-1">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex space-x-1">
          {product.colors.slice(0, 3).map((color) => (
            <div 
              key={color.id}
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
          {product.colors.length > 3 && (
            <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">
              +{product.colors.length - 3}
            </div>
          )}
        </div>
        <Button size="sm" variant="outline" className="text-xs">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-1 h-3 w-3" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}