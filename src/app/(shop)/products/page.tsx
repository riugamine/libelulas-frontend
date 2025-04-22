"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { products } from "@/lib/data/products";

// Definimos una interfaz para los filtros
interface ProductFilters {
  categories: string[];
  subcategories: string[];
  colors: string[];
  priceRange: [number, number];
}

// Valores por defecto para los filtros
const defaultFilters: ProductFilters = {
  categories: [],
  subcategories: [],
  colors: [],
  priceRange: [0, 5000] // Asumiendo un rango de precios máximo
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  
  // Función para obtener filtros de la URL
  const getFiltersFromUrl = useCallback((): ProductFilters => {
    const params = new URLSearchParams(searchParams.toString());
    
    return {
      categories: params.get('categories')?.split(',').filter(Boolean) || [],
      subcategories: params.get('subcategories')?.split(',').filter(Boolean) || [],
      colors: params.get('colors')?.split(',').filter(Boolean) || [],
      priceRange: [
        parseInt(params.get('minPrice') || '0', 10),
        parseInt(params.get('maxPrice') || '5000', 10)
      ] as [number, number]
    };
  }, [searchParams]);
  
  // Función para actualizar la URL con los filtros
  const updateUrlWithFilters = useCallback((filters: ProductFilters) => {
    const params = new URLSearchParams();
    
    if (filters.categories.length > 0) {
      params.set('categories', filters.categories.join(','));
    }
    
    if (filters.subcategories.length > 0) {
      params.set('subcategories', filters.subcategories.join(','));
    }
    
    if (filters.colors.length > 0) {
      params.set('colors', filters.colors.join(','));
    }
    
    params.set('minPrice', filters.priceRange[0].toString());
    params.set('maxPrice', filters.priceRange[1].toString());
    
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router]);
  
  /**
   * Aplica los filtros a los productos y actualiza el estado
   * @param filters - Objeto con los filtros seleccionados
   */
  const applyFilters = useCallback((filters: ProductFilters) => {
    // Optimización: filtramos en una sola pasada
    const result = products.filter(product => {
      // Verificamos categorías
      if (filters.categories.length > 0 && !filters.categories.includes(product.categoryId)) {
        return false;
      }
      
      // Verificamos subcategorías
      if (filters.subcategories.length > 0 && !filters.subcategories.includes(product.subcategoryId)) {
        return false;
      }
      
      // Verificamos colores
      if (filters.colors.length > 0 && !product.colors.some(color => filters.colors.includes(color.id))) {
        return false;
      }
      
      // Verificamos rango de precios
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProducts(result);
  }, []);
  
  /**
   * Maneja los cambios en los filtros, actualiza la URL y aplica los filtros
   * @param filters - Objeto con los filtros seleccionados por el usuario
   */
  const handleFilterChange = useCallback((filters: ProductFilters) => {
    updateUrlWithFilters(filters);
    applyFilters(filters);
  }, [updateUrlWithFilters, applyFilters]);
  
  // Efecto para cargar los filtros iniciales desde la URL
  useEffect(() => {
    const initialFilters = getFiltersFromUrl();
    applyFilters(initialFilters);
    setIsLoading(false);
  }, [getFiltersFromUrl, applyFilters]);
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary-900">Todos los Productos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters 
            initialFilters={getFiltersFromUrl()} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-primary-50 rounded-lg border border-primary-100">
              <h2 className="text-xl font-medium mb-2 text-primary-800">No se encontraron productos</h2>
              <p className="text-primary-600">Intenta con otros filtros</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-primary-600 mb-4">
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </p>
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}