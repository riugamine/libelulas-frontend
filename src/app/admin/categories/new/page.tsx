'use client';

import { useState } from 'react';
import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategory() {
  const [categoryType, setCategoryType] = useState<'main' | 'sub'>('main');
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Categoría</h1>
      
      {/* Category Type Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCategoryType('main')}
            className={`flex-1 py-2 px-4 rounded-md ${
              categoryType === 'main'
                ? 'bg-[#D9E17F] text-gray-800'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Categoría Principal
          </button>
          <button
            type="button"
            onClick={() => setCategoryType('sub')}
            className={`flex-1 py-2 px-4 rounded-md ${
              categoryType === 'sub'
                ? 'bg-[#D9E17F] text-gray-800'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Subcategoría
          </button>
        </div>
      </div>
      
      <CategoryForm isSubcategory={categoryType === 'sub'} />
    </div>
  );
}