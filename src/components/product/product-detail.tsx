"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Product, ProductColor, ProductDesign } from "@/lib/data/products";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedDesign, setSelectedDesign] = useState<ProductDesign>(product.designs[0]);
  
  // Mensaje para WhatsApp
  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en el producto "${product.name}" con el diseño "${selectedDesign.name}" en color "${selectedColor.name}". ¿Podrían darme más información?`
  );
  
  // URL de WhatsApp (reemplazar con el número real)
  const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <ProductCarousel 
          images={selectedDesign.images} 
          alt={product.name} 
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-primary-600 mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Descripción:</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Diseño:</h3>
            <div className="flex space-x-2">
              {product.designs.map((design) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedDesign.id === design.id
                      ? "bg-primary-100 text-primary-800 font-medium"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {design.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Color:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${
                    selectedColor.id === color.id ? "ring-2 ring-primary-600 ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-5 w-5" />
                Comprar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}