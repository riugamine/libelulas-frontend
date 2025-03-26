'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCategories } from '@/lib/data/categories';
import { Product, ProductVariant, ProductDesign } from '@/lib/types';

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const categories = getAllCategories();
  
  // Form state
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price.toString() || '',
    categoryId: product?.categoryId || '',
    featured: product?.featured || false
  });
  
  // Variants state
  const [variants, setVariants] = useState<ProductVariant[]>(
    product?.variants || [
      {
        id: Date.now().toString(),
        color: '',
        colorCode: '',
        images: [],
        inStock: true
      }
    ]
  );
  
  // Designs state
  const [designs, setDesigns] = useState<ProductDesign[]>(
    product?.designs || [
      {
        id: Date.now().toString(),
        name: '',
        images: []
      }
    ]
  );
  
  // Generate slug from name
  useEffect(() => {
    if (!isEditing && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setFormData({ ...formData, slug });
    }
  }, [formData.name, isEditing]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  // Add new variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        color: '',
        colorCode: '',
        images: [],
        inStock: true
      }
    ]);
  };
  
  // Remove variant
  const removeVariant = (id: string) => {
    setVariants(variants.filter(variant => variant.id !== id));
  };
  
  // Update variant
  const updateVariant = (id: string, field: keyof ProductVariant, value: any) => {
    setVariants(
      variants.map(variant => 
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };
  
  // Add new design
  const addDesign = () => {
    setDesigns([
      ...designs,
      {
        id: Date.now().toString(),
        name: '',
        images: []
      }
    ]);
  };
  
  // Remove design
  const removeDesign = (id: string) => {
    setDesigns(designs.filter(design => design.id !== id));
  };
  
  // Update design
  const updateDesign = (id: string, field: keyof ProductDesign, value: any) => {
    setDesigns(
      designs.map(design => 
        design.id === id ? { ...design, [field]: value } : design
      )
    );
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.slug || !formData.description || !formData.price || !formData.categoryId) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    // Validate variants
    for (const variant of variants) {
      if (!variant.color || !variant.colorCode) {
        alert('Por favor, completa todos los campos de las variantes.');
        return;
      }
    }
    
    // Validate designs
    for (const design of designs) {
      if (!design.name) {
        alert('Por favor, completa todos los campos de los diseños.');
        return;
      }
    }
    
    // Create product object
    const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      price: parseFloat(formData.price),
      categoryId: formData.categoryId,
      variants,
      designs,
      featured: formData.featured
    };
    
    // In a real application, you would send this data to your API
    console.log('Product data:', productData);
    
    // Redirect to products list
    alert(isEditing ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.');
    router.push('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Información Básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Precio <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full rounded-md border border-gray-300 pl-7 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
              required
            >
              <option value="">Seleccionar categoría</option>
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
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-[#D9E17F] focus:ring-[#D9E17F]"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Producto destacado
            </label>
          </div>
        </div>
      </div>
      
      {/* Variants */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Variantes de Color</h2>
          <button
            type="button"
            onClick={addVariant}
            className="inline-flex items-center rounded-md bg-[#D9E17F] px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-[#C9D16F]"
          >
            <FontAwesomeIcon icon="plus" className="mr-1 h-3 w-3" />
            Agregar Variante
          </button>
        </div>
        
        {variants.map((variant, index) => (
          <div key={variant.id} className="mb-6 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium">Variante {index + 1}</h3>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(variant.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon="trash" className="mr-1 h-4 w-4" />
                  Eliminar
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Color <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código de Color <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="color"
                    value={variant.colorCode}
                    onChange={(e) => updateVariant(variant.id, 'colorCode', e.target.value)}
                    className="h-10 w-10 rounded-md border border-gray-300 p-1"
                  />
                  <input
                    type="text"
                    value={variant.colorCode}
                    onChange={(e) => updateVariant(variant.id, 'colorCode', e.target.value)}
                    className="ml-2 flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`inStock-${variant.id}`}
                  checked={variant.inStock}
                  onChange={(e) => updateVariant(variant.id, 'inStock', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#D9E17F] focus:ring-[#D9E17F]"
                />
                <label htmlFor={`inStock-${variant.id}`} className="ml-2 block text-sm text-gray-700">
                  En stock
                </label>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes
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
        ))}
      </div>
      
      {/* Designs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Diseños</h2>
          <button
            type="button"
            onClick={addDesign}
            className="inline-flex items-center rounded-md bg-[#D9E17F] px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-[#C9D16F]"
          >
            <FontAwesomeIcon icon="plus" className="mr-1 h-3 w-3" />
            Agregar Diseño
          </button>
        </div>
        
        {designs.map((design, index) => (
          <div key={design.id} className="mb-6 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium">Diseño {index + 1}</h3>
              {designs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDesign(design.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon="trash" className="mr-1 h-4 w-4" />
                  Eliminar
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Diseño <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={design.name}
                  onChange={(e) => updateDesign(design.id, 'name', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#D9E17F] focus:outline-none focus:ring-1 focus:ring-[#D9E17F]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes
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
        ))}
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#D9E17F] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-[#C9D16F]"
        >
          {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}