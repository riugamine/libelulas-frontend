'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '@/components/product/ProductCard';
import { getCategoryBySlug } from '@/lib/data/categories';
import { getAllProducts } from '@/lib/data/products';
import { Product } from '@/lib/types';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
        <p className="mb-8">Lo sentimos, la categoría que buscas no existe o ha sido eliminada.</p>
        <Link 
          href="/products" 
          className="inline-block bg-[#D9E17F] text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-[#C9D16F] transition-colors"
        >
          Ver Todos los Productos
        </Link>
      </div>
    );
  }

  const allProducts = getAllProducts();
  
  // Get products for this category and its subcategories
  const categoryProducts = allProducts.filter(product => {
    // Check if product belongs directly to this category
    if (product.categoryId === category.id) return true;
    
    // Check if product belongs to a subcategory of this category
    if (category.subcategories && product.categoryId.startsWith(category.id + '-')) return true;
    
    return false;
  });

  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on search term
  const filteredProducts = searchTerm 
    ? categoryProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categoryProducts;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mb-6">{category.description}</p>
        )}
        
        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Subcategorías</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.subcategories.map(subcategory => (
                <Link 
                  key={subcategory.id} 
                  href={`/category/${subcategory.slug}`}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#D9E17F] hover:bg-[#D9E17F] hover:bg-opacity-10 transition-colors"
                >
                  {subcategory.image && (
                    <div className="relative h-12 w-12 mr-4 overflow-hidden rounded-md">
                      <Image
                        src={subcategory.image}
                        alt={subcategory.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium">{subcategory.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mb-8">
        <input
          type="text"
          placeholder={`Buscar en ${category.name}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No se encontraron productos en esta categoría</p>
          {searchTerm ? (
            <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
          ) : (
            <p className="text-gray-500">Pronto agregaremos nuevos productos</p>
          )}
        </div>
      )}
    </div>
  );
}