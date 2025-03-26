'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories } from '@/lib/data/categories';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo/libelulas-logo.png" 
              alt="Libélulas Design" 
              width={150} 
              height={60} 
              className="h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#D9E17F] font-medium">
              Inicio
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setActiveCategory('products')}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link href="/products" className="text-gray-700 hover:text-[#D9E17F] font-medium">
                Productos
              </Link>
              {activeCategory === 'products' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" className="text-gray-700 hover:text-[#D9E17F] font-medium">
              Nosotros
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#D9E17F] font-medium">
              Contacto
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#D9E17F]">
              <FontAwesomeIcon icon="search" className="h-5 w-5" />
            </button>
            <Link href="/cart" className="text-gray-700 hover:text-[#D9E17F]">
              <FontAwesomeIcon icon="shopping-bag" className="h-5 w-5" />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon icon="bars" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-[#D9E17F] font-medium">
              Inicio
            </Link>
            <div className="py-2">
              <button 
                className="flex items-center justify-between w-full text-gray-700 hover:text-[#D9E17F] font-medium"
                onClick={() => setActiveCategory(activeCategory === 'mobile-products' ? null : 'mobile-products')}
              >
                <span>Productos</span>
                <FontAwesomeIcon 
                  icon={activeCategory === 'mobile-products' ? 'chevron-up' : 'chevron-down'} 
                  className="h-4 w-4" 
                />
              </button>
              {activeCategory === 'mobile-products' && (
                <div className="mt-2 ml-4 space-y-2">
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="block py-1 text-gray-700 hover:text-[#D9E17F]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-[#D9E17F] font-medium">
              Nosotros
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-[#D9E17F] font-medium">
              Contacto
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}