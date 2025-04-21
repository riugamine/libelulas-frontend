"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { categories, subcategories } from "@/lib/data/categories";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export function ProductForm({ initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    subcategoryId: "",
    featured: false,
    designs: [
      {
        name: "Default",
        description: "",
        images: [""],
      },
    ],
  });
  
  const [availableSubcategories, setAvailableSubcategories] = useState<any[]>([]);
  
  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
      });
    }
  }, [initialData]);
  
  // Update available subcategories when category changes
  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.categoryId === formData.categoryId
      );
      setAvailableSubcategories(filtered);
      
      // Reset subcategory if current one doesn't belong to the selected category
      const subcategoryBelongsToCategory = filtered.some(
        (subcategory) => subcategory.id === formData.subcategoryId
      );
      
      if (!subcategoryBelongsToCategory) {
        setFormData((prev) => ({
          ...prev,
          subcategoryId: "",
        }));
      }
    } else {
      setAvailableSubcategories([]);
      setFormData((prev) => ({
        ...prev,
        subcategoryId: "",
      }));
    }
  }, [formData.categoryId, formData.subcategoryId]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle switch toggle
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      featured: checked,
    }));
  };
  
  // Handle design changes
  const handleDesignChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedDesigns = [...prev.designs];
      updatedDesigns[index] = {
        ...updatedDesigns[index],
        [field]: value,
      };
      return {
        ...prev,
        designs: updatedDesigns,
      };
    });
  };
  
  // Handle image changes
  const handleImageChange = (designIndex: number, imageIndex: number, value: string) => {
    setFormData((prev) => {
      const updatedDesigns = [...prev.designs];
      const updatedImages = [...updatedDesigns[designIndex].images];
      updatedImages[imageIndex] = value;
      updatedDesigns[designIndex] = {
        ...updatedDesigns[designIndex],
        images: updatedImages,
      };
      return {
        ...prev,
        designs: updatedDesigns,
      };
    });
  };
  
  // Add new design
  const addDesign = () => {
    setFormData((prev) => ({
      ...prev,
      designs: [
        ...prev.designs,
        {
          name: "",
          description: "",
          images: [""],
        },
      ],
    }));
  };
  
  // Remove design
  const removeDesign = (index: number) => {
    if (formData.designs.length <= 1) return;
    
    setFormData((prev) => {
      const updatedDesigns = [...prev.designs];
      updatedDesigns.splice(index, 1);
      return {
        ...prev,
        designs: updatedDesigns,
      };
    });
  };
  
  // Add new image to design
  const addImage = (designIndex: number) => {
    setFormData((prev) => {
      const updatedDesigns = [...prev.designs];
      updatedDesigns[designIndex] = {
        ...updatedDesigns[designIndex],
        images: [...updatedDesigns[designIndex].images, ""],
      };
      return {
        ...prev,
        designs: updatedDesigns,
      };
    });
  };
  
  // Remove image from design
  const removeImage = (designIndex: number, imageIndex: number) => {
    if (formData.designs[designIndex].images.length <= 1) return;
    
    setFormData((prev) => {
      const updatedDesigns = [...prev.designs];
      const updatedImages = [...updatedDesigns[designIndex].images];
      updatedImages.splice(imageIndex, 1);
      updatedDesigns[designIndex] = {
        ...updatedDesigns[designIndex],
        images: updatedImages,
      };
      return {
        ...prev,
        designs: updatedDesigns,
      };
    });
  };
  
  // Generate slug from name
  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    
    setFormData((prev) => ({
      ...prev,
      slug,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string values to appropriate types
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };
    
    onSubmit(processedData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={generateSlug}
                className="mb-0.5"
              >
                Generar
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="categoryId">Categoría</Label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="subcategoryId">Subcategoría</Label>
            <select
              id="subcategoryId"
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={!formData.categoryId}
              required
            >
              <option value="">Selecciona una subcategoría</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="featured">Destacado</Label>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Diseños</h3>
          <Button type="button" variant="outline" onClick={addDesign}>
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Añadir Diseño
          </Button>
        </div>
        
        <div className="space-y-6">
          {formData.designs.map((design, designIndex) => (
            <div key={designIndex} className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Diseño {designIndex + 1}</h4>
                {formData.designs.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDesign(designIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`design-name-${designIndex}`}>Nombre del Diseño</Label>
                  <Input
                    id={`design-name-${designIndex}`}
                    value={design.name}
                    onChange={(e) => handleDesignChange(designIndex, "name", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`design-description-${designIndex}`}>Descripción</Label>
                  <Input
                    id={`design-description-${designIndex}`}
                    value={design.description}
                    onChange={(e) => handleDesignChange(designIndex, "description", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Imágenes</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addImage(designIndex)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2 h-3 w-3" />
                    Añadir Imagen
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {design.images.map((image, imageIndex) => (
                    <div key={imageIndex} className="flex space-x-2">
                      <Input
                        value={image}
                        onChange={(e) => handleImageChange(designIndex, imageIndex, e.target.value)}
                        placeholder="URL de la imagen"
                        required
                      />
                      {design.images.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(designIndex, imageIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : initialData ? "Actualizar Producto" : "Crear Producto"}
        </Button>
      </div>
    </form>
  );
}