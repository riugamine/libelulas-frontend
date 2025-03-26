'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCategories } from '@/lib/data/categories';
import { Category } from '@/lib/types';

interface CategoryFormProps {
  category?: Category;
  isEditing?: boolean;
  isSubcategory?: boolean;
  parentId?: string;
}

export default function CategoryForm({ 
  category, 
  isEditing = false,
  isSubcategory = false,
  parentId
}: CategoryFormProps) {
  const router = useRouter();
  const categories = getAllCategories();
  
  // Form state
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    parentId: parentId || category?.id.split('-')[0] || '',
  });
  
  // Generate slug from name
  useEffect(() => {
    if (!isEditing && formData.name) {
      let slug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      // If it's a subcategory, prepend the parent slug
      if (isSubcategory && formData.parentId) {
        const parentCategory = categories.find(cat => cat.id === formData.parentId);
        if (parentCategory) {
          slug = `${formData.parentId}-${slug}`;
        }
      }
      
      setFormData({ ...formData, slug });
    }
  }, [formData.name, formData.parentId, isEditing, isSubcategory, categories]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.slug) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    // Create category object
    const categoryData: Partial<Category> = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description || undefined,
    };
    
    // In a real application, you would send this data to your API
    console.log('Category data:', categoryData);
    
    // Redirect to categories list
    alert(isEditing ? 'Categoría actualizada correctamente.' : 'Categoría creada correctamente.');
    router.push('/admin/categories');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          {isSubcategory ? 'Información de Subcategoría' : 'Información de Categoría'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isSubcategory && (
            <div className="md:col-span-2">
              <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría Padre <span className="text-red-500">*</span>
              </label>
              <select
                id="parentId"
                name="parentId"
                value={formData.parentId}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                required
                disabled={isEditing}
              >
                <option value="">Seleccionar categoría padre</option>
                {categories
                  .filter(cat => !cat.id.includes('-')) // Only main categories
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
              required
              readOnly={!isEditing}
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen
            </label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Subir
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              En una aplicación real, aquí se implementaría la carga de imágenes.
            </p>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/admin/categories')}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#D9E17F] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-[#C9D16F]"
        >
          {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
        </button>
      </div>
    </form>
  );
}