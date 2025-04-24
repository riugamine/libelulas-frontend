"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { categories, subcategories } from "@/lib/data/categories";
import { products, colors as productColors } from "@/lib/data/products";
import { Separator } from "@/components/ui/separator";
interface ProductFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    subcategories: string[];
    colors: string[];
    designs: string[];
    priceRange: [number, number];
  }) => void;
  initialFilters?: {
    categories: string[];
    subcategories: string[];
    colors: string[];
    designs: string[];
    priceRange: [number, number];
  };
}
const uniqueDesigns = Array.from(
  new Set(
    products.flatMap(product => 
      product.designs.map(design => design.name)
    )
  )
);
export function ProductFilters({ onFilterChange, initialFilters }: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories || []);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(initialFilters?.subcategories || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(initialFilters?.colors || []);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || [0, 100]);
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
  // Apply filters when any filter changes
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      subcategories: selectedSubcategories,
      colors: selectedColors,
      designs: selectedDesigns,
      priceRange: [priceRange[0], priceRange[1]],
    });
  }, [selectedCategories, selectedSubcategories, selectedColors, selectedDesigns, priceRange, onFilterChange]);
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };
  
  // Handle subcategory selection
  const handleSubcategoryChange = (subcategoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
    } else {
      setSelectedSubcategories(selectedSubcategories.filter(id => id !== subcategoryId));
    }
  };
  
  // Handle color selection
  const handleColorChange = (colorId: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, colorId]);
    } else {
      setSelectedColors(selectedColors.filter(id => id !== colorId));
    }
  };
  
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]] as [number, number]);
  };
  const handleDesignChange = (design: string, checked: boolean) => {
    if (checked) {
      setSelectedDesigns(prev => [...prev, design]);
    } else {
      setSelectedDesigns(prev => prev.filter(d => d !== design));
    }
  };
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setSelectedDesigns([]);
    setPriceRange([0, 100]);
  };
  
  // Get filtered subcategories based on selected categories
  const filteredSubcategories = selectedCategories.length > 0
    ? subcategories.filter(sub => selectedCategories.includes(sub.categoryId))
    : subcategories;
  
    return (
      <div className="space-y-6">
        {/* Categorías */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Categorías</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                />
                <label htmlFor={category.id} className="ml-2 text-sm text-gray-600">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <Separator />
  
        {/* Diseños */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Diseños</h3>
          <div className="space-y-3">
          {uniqueDesigns.map((design) => (
            <div key={design} className="flex items-center">
              <Checkbox
                id={design}
                checked={selectedDesigns.includes(design)}
                onCheckedChange={(checked) => handleDesignChange(design, !!checked)}
              />
              <label htmlFor={design} className="ml-2 text-sm text-gray-600">
                {design}
              </label>
            </div>
          ))}
          </div>
        </div>
  
        <Separator />
  
        {/* Colores */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Colores</h3>
          <div className="grid grid-cols-2 gap-2">
            {productColors.map((color) => (
              <div key={color.id} className="flex items-center">
                <Checkbox
                  id={color.id}
                  checked={selectedColors.includes(color.id)}
                  onCheckedChange={(checked) => handleColorChange(color.id, !!checked)}
                />
                <label htmlFor={color.id} className="ml-2 text-sm text-gray-600 flex items-center">
                  <span 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <Separator />
  
        {/* Rango de Precio */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Precio</h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              min={0}
              max={100}
              step={5}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    );
}