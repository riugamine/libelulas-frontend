"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Product, ProductColor, ProductDesign } from "@/lib/data/products";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/data/categories";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedDesign, setSelectedDesign] = useState<ProductDesign>(product.designs[0]);
  const category = categories.find((cat) => cat.id === product.categoryId);
  // Mensaje para WhatsApp
  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en el producto "${product.name}" con el diseño "${selectedDesign.name}" en color "${selectedColor.name}". ¿Podrían darme más información?`
  );
  
  // URL de WhatsApp (reemplazar con el número real)
  const whatsappUrl = `https://wa.me/+584123598478?text=${whatsappMessage}`;
  
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:sticky md:top-24 z-10">
          <ProductCarousel 
            images={selectedDesign.images} 
            alt={product.name} 
          />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary" className="mb-1">
              {category?.name || "Categoría no encontrada"}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Diseño</h3>
              <div className="flex flex-wrap gap-2">
                {product.designs.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedDesign.id === design.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {design.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-105 ${
                      selectedColor.id === color.id ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full h-10 text-base" size="default">
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-4 w-4" />
                Comprar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}