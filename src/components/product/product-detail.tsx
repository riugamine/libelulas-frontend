"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Product, ProductColor } from "@/lib/data/products";
import { Collection } from "@/lib/data/collections";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  // Estados para manejar las selecciones del usuario
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("original");
  const [selectedDesignId, setSelectedDesignId] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].id);

  // Obtener las colecciones que contienen este producto usando collectionIds
  const availableCollections = collections.filter(collection => 
    product.collectionIds?.includes(collection.id)
  );

  // Obtener la colección seleccionada actualmente
  const selectedCollection = selectedCollectionId 
    ? collections.find(c => c.id === selectedCollectionId)
    : null;

  // Obtener los diseños disponibles para la colección seleccionada
  const availableDesigns = selectedCollection?.designs.filter(design => 
    design.products.some(p => p.productId === product.id)
  ) || [];

  // Obtener el diseño seleccionado y sus productos asociados
  const selectedDesign = selectedCollection && selectedDesignId
    ? selectedCollection.designs.find(d => d.id === selectedDesignId)
    : null;

  const selectedProductDesign = selectedDesign
    ? selectedDesign.products.find(p => p.productId === product.id)
    : null;

  // Obtener las imágenes a mostrar (del diseño seleccionado o del producto original)
  const displayImages = selectedProductDesign?.images || product.images;

  // Obtener la categoría del producto
  const category = categories.find((cat) => cat.id === product.categoryId);

  // Resetear el diseño cuando cambia la colección
  useEffect(() => {
    setSelectedDesignId("");
  }, [selectedCollectionId]);

  // Construir el mensaje para WhatsApp
  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en el producto "${product.name}"${
      selectedCollection ? ` de la colección "${selectedCollection.name}"` : ''
    }${selectedDesign ? ` con el diseño "${selectedDesign.name}"` : ''
    } en color "${product.colors.find(c => c.id === selectedColor)?.name}". ¿Podrían darme más información?`
  );
  
  const whatsappUrl = `https://wa.me/+584123598478?text=${whatsappMessage}`;
  
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Carrusel de imágenes */}
        <div className="md:sticky md:top-24 z-10">
          <ProductCarousel 
            images={displayImages}
            alt={product.name} 
          />
        </div>
        
        {/* Detalles del producto */}
        <div className="space-y-6">
          {/* Encabezado del producto */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {category && (
                <Badge variant="secondary" className="mb-1">
                  {category.name}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-primary">
              ${(selectedProductDesign?.price || product.price).toFixed(2)}
            </p>
          </div>
          
          {/* Descripción del producto */}
          <div className="prose max-w-none">
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {/* Selectores de colección y diseño */}
          {availableCollections.length > 0 && (
            <div className="space-y-4">
              {/* Selector de Colección */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Colección</h3>
                <Select
                  value={selectedCollectionId}
                  onValueChange={setSelectedCollectionId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una colección" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Diseño Original</SelectItem>
                    {availableCollections.map((collection) => (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selector de Diseño */}
              {selectedCollection && availableDesigns.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Diseño</h3>
                  <Select
                    value={selectedDesignId}
                    onValueChange={setSelectedDesignId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un diseño" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDesigns.map((design) => (
                        <SelectItem key={design.id} value={design.id}>
                          {design.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedDesign && (
                    <p className="text-sm text-gray-600">
                      {selectedDesign.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Selector de Color */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-105 ${
                    selectedColor === color.id ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Botón de WhatsApp */}
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