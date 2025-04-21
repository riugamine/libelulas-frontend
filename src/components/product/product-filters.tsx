"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { categories, subcategories } from "@/lib/data/categories";
import { colors } from "@/lib/data/products";

interface ProductFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    subcategories: string[];
    colors: string[];
    priceRange: number[];
  }) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  
  // Apply filters when any filter changes
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      subcategories: selectedSubcategories,
      colors: selectedColors,
      priceRange: [priceRange[0], priceRange[1]],
    });
  }, [selectedCategories, selectedSubcategories, selectedColors, priceRange, onFilterChange]);
  
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
    setPriceRange(value);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setPriceRange([0, 100]);
  };
  
  // Get filtered subcategories based on selected categories
  const filteredSubcategories = selectedCategories.length > 0
    ? subcategories.filter(sub => selectedCategories.includes(sub.categoryId))
    : subcategories;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Filtros</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetFilters}
        >
          Limpiar
        </Button>
      </div>
      
      <Accordion type="multiple" defaultValue={["categories", "price", "colors"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked === true)
                    }
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {selectedCategories.length > 0 && (
          <AccordionItem value="subcategories">
            <AccordionTrigger>Subcategorías</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {filteredSubcategories.map((subcategory) => (
                  <div key={subcategory.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`subcategory-${subcategory.id}`}
                      checked={selectedSubcategories.includes(subcategory.id)}
                      onCheckedChange={(checked) => 
                        handleSubcategoryChange(subcategory.id, checked === true)
                      }
                    />
                    <Label 
                      htmlFor={`subcategory-${subcategory.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {subcategory.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        
        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="colors">
          <AccordionTrigger>Colores</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${color.id}`}
                    checked={selectedColors.includes(color.id)}
                    onCheckedChange={(checked) => 
                      handleColorChange(color.id, checked === true)
                    }
                  />
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300" 
                      style={{ backgroundColor: color.value }}
                    />
                    <Label 
                      htmlFor={`color-${color.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {color.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}