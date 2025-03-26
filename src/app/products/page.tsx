'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCard from '@/components/product/ProductCard';
import { getAllProducts } from '@/lib/data/products';
import { getAllCategories } from '@/lib/data/categories';
import { Product, Category } from '@/lib/types';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search term, category, and price range
  useEffect(() => {
    let result = allProducts;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((product) => {
        // Check if product belongs to main category or any of its subcategories
        const categoryParts = product.categoryId.split('-');
        return categoryParts[0] === selectedCategory || product.categoryId === selectedCategory;
      });
    }

    // Filter by price range
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, priceRange, allProducts]);

  // Find min and max prices from all products
  const minPrice = Math.min(...allProducts.map((product) => product.price));
  const maxPrice = Math.max(...allProducts.map((product) => product.price));

  // Initialize price range with actual min and max
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Todos los Productos</h1>

      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
            />
            <FontAwesomeIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-gray-700"
          >
            <FontAwesomeIcon icon="filter" className="mr-2 h-4 w-4" />
            Filtros
          </button>
        </div>

        {/* Filters Section */}
        <div className={`md:flex ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                {/* Add subcategories */}
                {categories
                  .filter((category) => category.subcategories && category.subcategories.length > 0)
                  .flatMap((category) => category.subcategories || [])
                  .map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      &nbsp;&nbsp;{subcategory.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="1"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step="1"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setPriceRange([minPrice, maxPrice]);
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-6 text-gray-600">
        Mostrando {filteredProducts.length} de {allProducts.length} productos
      </p>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No se encontraron productos</p>
          <p className="text-gray-500">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}