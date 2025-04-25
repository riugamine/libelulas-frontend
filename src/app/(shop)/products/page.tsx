"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { products } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";

// Definimos una interfaz para los filtros
interface ProductFilters {
  categories: string[];
  subcategories: string[];
  colors: string[];
  collections: string[];
  priceRange: [number, number];
}

// Valores por defecto para los filtros
const defaultFilters: ProductFilters = {
  categories: [],
  subcategories: [],
  colors: [],
  collections: [],
  priceRange: [0, 5000] as [number, number],
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
      categories: params.get("categories")?.split(",").filter(Boolean) || [],
      subcategories:
        params.get("subcategories")?.split(",").filter(Boolean) || [],
      colors: params.get("colors")?.split(",").filter(Boolean) || [],
      collections: params.get("collections")?.split(",").filter(Boolean) || [],
      priceRange: [
        parseInt(params.get("minPrice") || "0", 10),
        parseInt(params.get("maxPrice") || "5000", 10),
      ] as [number, number],
    };
  }, [searchParams]);

  // Función para actualizar la URL con los filtros
  const updateUrlWithFilters = useCallback(
    (filters: ProductFilters) => {
      const params = new URLSearchParams();

      if (filters.categories.length > 0) {
        params.set("categories", filters.categories.join(","));
      }

      if (filters.subcategories.length > 0) {
        params.set("subcategories", filters.subcategories.join(","));
      }

      if (filters.colors.length > 0) {
        params.set("colors", filters.colors.join(","));
      }

      params.set("minPrice", filters.priceRange[0].toString());
      params.set("maxPrice", filters.priceRange[1].toString());

      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  /**
   * Aplica los filtros a los productos y actualiza el estado
   * @param filters - Objeto con los filtros seleccionados
   */
  const applyFilters = useCallback((filters: ProductFilters) => {
    // Optimización: filtramos en una sola pasada
    const result = products.filter((product) => {
      // Verificamos categorías
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.categoryId)
      ) {
        return false;
      }

      // Verificamos subcategorías
      if (
        filters.subcategories.length > 0 &&
        !filters.subcategories.includes(product.subcategoryId)
      ) {
        return false;
      }

      // Verificamos colores
      if (
        filters.colors.length > 0 &&
        !product.colors.some((color) => filters.colors.includes(color.id))
      ) {
        return false;
      }
      // Verificamos colecciones usando collectionIds
      if (filters.collections.length > 0) {
        if (!product.collectionIds || !product.collectionIds.some(id => filters.collections.includes(id))) {
          return false;
        }
      }
      // Verificamos rango de precios
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
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
  const handleFilterChange = useCallback(
    (filters: ProductFilters) => {
      updateUrlWithFilters(filters);
      applyFilters(filters);
    },
    [updateUrlWithFilters, applyFilters]
  );

  // Efecto para cargar los filtros iniciales desde la URL
  useEffect(() => {
    const initialFilters = getFiltersFromUrl();
    applyFilters(initialFilters);
    setIsLoading(false);
  }, [getFiltersFromUrl, applyFilters]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col space-y-8">
        {/* Encabezado y Contador de Productos */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-gray-900">Productos</h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Panel de Filtros */}
          <aside className="space-y-6 self-start bg-white p-6 rounded-lg border border-gray-100">
            <ProductFilters
              initialFilters={getFiltersFromUrl()}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Grid de Productos */}
          <main>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-lg text-gray-600 mb-2">
                  No se encontraron productos
                </p>
                <p className="text-sm text-gray-500">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
