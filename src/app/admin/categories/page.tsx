"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { categories, subcategories } from "@/lib/data/categories";

export default function AdminCategoriesPage() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategorySlug, setNewSubcategorySlug] = useState("");
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleAddCategory = () => {
    // In a real app, you would call an API to add the category
    console.log("Adding category:", { name: newCategoryName, slug: newCategorySlug });
    
    // Reset form and close dialog
    setNewCategoryName("");
    setNewCategorySlug("");
    setIsAddCategoryOpen(false);
  };
  
  const handleAddSubcategory = () => {
    // In a real app, you would call an API to add the subcategory
    console.log("Adding subcategory:", { 
      name: newSubcategoryName, 
      slug: newSubcategorySlug,
      categoryId: selectedCategory 
    });
    
    // Reset form and close dialog
    setNewSubcategoryName("");
    setNewSubcategorySlug("");
    setSelectedCategory(null);
    setIsAddSubcategoryOpen(false);
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría? También se eliminarán todas sus subcategorías.")) {
      // In a real app, you would call an API to delete the category
      console.log(`Deleting category ${categoryId}`);
    }
  };
  
  const handleDeleteSubcategory = (subcategoryId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta subcategoría?")) {
      // In a real app, you would call an API to delete the subcategory
      console.log(`Deleting subcategory ${subcategoryId}`);
    }
  };
  
  const openAddSubcategoryDialog = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsAddSubcategoryOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Categorías</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAddCategoryOpen(true)}>
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Button>
          <Button variant="outline" onClick={() => setIsAddSubcategoryOpen(true)}>
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Nueva Subcategoría
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {categories.map((category) => {
            const categorySubcategories = subcategories.filter(
              (subcategory) => subcategory.categoryId === category.id
            );
            const isExpanded = expandedCategories.includes(category.id);
            
            return (
              <li key={category.id}>
                <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="mr-2 text-gray-500 hover:text-gray-700"
                    >
                      <FontAwesomeIcon 
                        icon={isExpanded ? faChevronDown : faChevronRight} 
                        className="h-4 w-4" 
                      />
                    </button>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">Slug: {category.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openAddSubcategoryDialog(category.id)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="h-4 w-4 text-primary-600" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4 text-primary-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
                
                {isExpanded && categorySubcategories.length > 0 && (
                  <ul className="bg-gray-50 border-t border-gray-200">
                    {categorySubcategories.map((subcategory) => (
                      <li 
                        key={subcategory.id}
                        className="px-6 py-3 pl-12 flex items-center justify-between hover:bg-gray-100"
                      >
                        <div>
                          <h4 className="text-md font-medium text-gray-900">{subcategory.name}</h4>
                          <p className="text-sm text-gray-500">Slug: {subcategory.slug}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <FontAwesomeIcon icon={faEdit} className="h-4 w-4 text-primary-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteSubcategory(subcategory.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Categoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="category-name" className="text-sm font-medium">
                Nombre de la categoría
              </label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Ej: Libretas"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category-slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                id="category-slug"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                placeholder="Ej: libretas"
              />
              <p className="text-xs text-gray-500">
                El slug se usa en las URLs. Usa solo letras minúsculas, números y guiones.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCategory}>
              Añadir Categoría
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Subcategory Dialog */}
      <Dialog open={isAddSubcategoryOpen} onOpenChange={setIsAddSubcategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Subcategoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="subcategory-category" className="text-sm font-medium">
                Categoría
              </label>
              <select
                id="subcategory-category"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="subcategory-name" className="text-sm font-medium">
                Nombre de la subcategoría
              </label>
              <Input
                id="subcategory-name"
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
                placeholder="Ej: Libretas A5"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subcategory-slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                id="subcategory-slug"
                value={newSubcategorySlug}
                onChange={(e) => setNewSubcategorySlug(e.target.value)}
                placeholder="Ej: libretas-a5"
              />
              <p className="text-xs text-gray-500">
                El slug se usa en las URLs. Usa solo letras minúsculas, números y guiones.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubcategoryOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAddSubcategory}
              disabled={!selectedCategory || !newSubcategoryName || !newSubcategorySlug}
            >
              Añadir Subcategoría
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}