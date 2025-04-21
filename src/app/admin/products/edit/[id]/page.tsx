"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";
import { products } from "@/lib/data/products";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch the product from an API
    const foundProduct = products.find(p => p.id === params.id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Product not found, redirect to products list
      router.push("/admin/products");
    }
    
    setIsLoading(false);
  }, [params.id, router]);
  
  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to update the product
      console.log("Updating product:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to products list
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Editar Producto</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm 
          initialData={product}
          onSubmit={handleSubmit} 
          //isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
}