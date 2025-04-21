"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { products } from "@/lib/data/products";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const handleFilterChange = (filters: any) => {
    let result = [...products];
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.categoryId)
      );
    }
    
    // Filter by subcategories
    if (filters.subcategories.length > 0) {
      result = result.filter(product => 
        filters.subcategories.includes(product.subcategoryId)
      );
    }
    
    // Filter by colors
    if (filters.colors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => filters.colors.includes(color.id))
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    setFilteredProducts(result);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Todos los Productos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No se encontraron productos</h2>
              <p className="text-gray-600">Intenta con otros filtros</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}