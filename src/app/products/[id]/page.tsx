'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getProductBySlug } from '@/lib/data/products';
import { getCategoryBySlug } from '@/lib/data/categories';
import { ProductVariant, ProductDesign } from '@/lib/types';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductBySlug(params.id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <p className="mb-8">Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
        <Link 
          href="/products" 
          className="inline-block bg-[#D9E17F] text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-[#C9D16F] transition-colors"
        >
          Ver Todos los Productos
        </Link>
      </div>
    );
  }

  const category = getCategoryBySlug(product.categoryId.split('-')[0]);
  const subcategory = product.categoryId.includes('-') 
    ? getCategoryBySlug(product.categoryId) 
    : null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedDesign, setSelectedDesign] = useState<ProductDesign>(product.designs[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine the selected variant and design to get the correct images
  const displayImages = selectedDesign.images;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-600 hover:text-[#D9E17F]">
                Inicio
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/products" className="text-gray-600 hover:text-[#D9E17F]">
                  Productos
                </Link>
              </div>
            </li>
            {category && (
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href={`/category/${category.slug}`} className="text-gray-600 hover:text-[#D9E17F]">
                    {category.name}
                  </Link>
                </div>
              </li>
            )}
            {subcategory && (
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href={`/category/${subcategory.slug}`} className="text-gray-600 hover:text-[#D9E17F]">
                    {subcategory.name}
                  </Link>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={displayImages[currentImageIndex]}
              alt={`${product.name} - ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 text-gray-800" />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full"
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 text-gray-800" />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
                  index === currentImageIndex ? 'ring-2 ring-[#D9E17F]' : 'ring-1 ring-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Descripción</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Color</h3>
            <div className="flex space-x-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    selectedVariant.id === variant.id
                      ? 'border-gray-800'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.color}
                  disabled={!variant.inStock}
                >
                  {!variant.inStock && (
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-px w-6 rotate-45 bg-gray-500"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {!selectedVariant.inStock && (
              <p className="mt-2 text-sm text-red-500">Agotado</p>
            )}
          </div>

          {/* Design Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Diseño</h3>
            <div className="grid grid-cols-2 gap-3">
              {product.designs.map((design) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design)}
                  className={`rounded-md border p-2 ${
                    selectedDesign.id === design.id
                      ? 'border-[#D9E17F] bg-[#D9E17F] bg-opacity-10'
                      : 'border-gray-300'
                  }`}
                >
                  {design.name}
                </button>
              ))}
            </div>
          </div>

          {/* Buy Button */}
          <div className="mt-8">
            <Link
              href={`https://wa.me/1234567890?text=Hola, me interesa el producto: ${product.name} en color ${selectedVariant.color} con diseño ${selectedDesign.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full items-center justify-center rounded-md px-6 py-3 text-lg font-medium ${
                selectedVariant.inStock
                  ? 'bg-[#D9E17F] text-gray-800 hover:bg-[#C9D16F]'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              onClick={(e) => {
                if (!selectedVariant.inStock) {
                  e.preventDefault();
                }
              }}
            >
              <FontAwesomeIcon icon={['fab', 'whatsapp']} className="mr-2 h-5 w-5" />
              {selectedVariant.inStock ? 'Comprar por WhatsApp' : 'Agotado'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}