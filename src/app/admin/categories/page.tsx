'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCategories } from '@/lib/data/categories';
import { Category } from '@/lib/types';

export default function AdminCategories() {
  const categories = getAllCategories();
  
  // Flatten categories and subcategories into a single array for display
  const flattenedCategories: (Category & { isSubcategory?: boolean; parentName?: string })[] = [
    ...categories,
    ...categories
      .filter(category => category.subcategories && category.subcategories.length > 0)
      .flatMap(category => 
        (category.subcategories || []).map(subcategory => ({
          ...subcategory,
          isSubcategory: true,
          parentName: category.name
        }))
      )
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter categories based on search term
  const filteredCategories = searchTerm
    ? flattenedCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (category.parentName && category.parentName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : flattenedCategories;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center rounded-md bg-[#D9E17F] px-4 py-2 font-medium text-gray-800 hover:bg-[#C9D16F]"
        >
          <FontAwesomeIcon icon="plus" className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Link>
      </div>
      
      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
          />
          <FontAwesomeIcon
            icon="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      
      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id} className={category.isSubcategory ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {category.isSubcategory && (
                          <span className="text-gray-400 mr-2">└─</span>
                        )}
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image
                            src={category.image || '/images/placeholder.jpg'}
                            alt={category.name}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.isSubcategory ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Subcategoría de {category.parentName}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Categoría Principal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">
                        {category.description || 'Sin descripción'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/categories/edit/${category.id}`}
                        className="text-[#D9E17F] hover:text-[#C9D16F] mr-3"
                      >
                        Editar
                      </Link>
                      <button className="text-red-500 hover:text-red-700">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron categorías
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