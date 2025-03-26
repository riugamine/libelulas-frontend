'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllProducts } from '@/lib/data/products';
import { getAllCategories } from '@/lib/data/categories';
import { Product } from '@/lib/types';

export default function AdminProducts() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  
  // Handle search and filter
  const handleSearch = () => {
    let results = allProducts;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter((product) => {
        // Check if product belongs to main category or any of its subcategories
        const categoryParts = product.categoryId.split('-');
        return categoryParts[0] === selectedCategory || product.categoryId === selectedCategory;
      });
    }
    
    setFilteredProducts(results);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setFilteredProducts(allProducts);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-md bg-[#D9E17F] px-4 py-2 font-medium text-gray-800 hover:bg-[#C9D16F]"
        >
          <FontAwesomeIcon icon="plus" className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Link>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="relative">
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
          
          {/* Category Filter */}
          <div>
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
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="flex-1 rounded-md bg-[#D9E17F] px-4 py-2 font-medium text-gray-800 hover:bg-[#C9D16F]"
            >
              Filtrar
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destacado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const category = product.categoryId.includes('-')
                    ? product.categoryId.split('-')[1]
                    : product.categoryId;
                  
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              src={product.variants[0]?.images[0] || '/images/placeholder.jpg'}
                              alt={product.name}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.featured ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Sí
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="text-[#D9E17F] hover:text-[#C9D16F] mr-3"
                        >
                          Editar
                        </Link>
                        <button className="text-red-500 hover:text-red-700">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}