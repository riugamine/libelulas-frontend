"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to create the product
      console.log("Creating product:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to products list
      router.push("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      setIsSubmitting(false);
    }
  };
  
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
        <h1 className="text-2xl md:text-3xl font-bold">Nuevo Producto</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm 
          onSubmit={handleSubmit} 
          //isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
}