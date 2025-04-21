"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data/categories";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Inicio
                </Link>
                {categories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <Link href={`/category/${category.slug}`} className="text-lg font-medium hover:text-primary transition-colors">
                      {category.name}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <Link 
                          key={subcategory.id} 
                          href={`/category/${category.slug}/${subcategory.slug}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                  Nosotros
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                  Contacto
                </Link>
                <Link href="/faq" className="text-lg font-medium hover:text-primary transition-colors">
                  FAQ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl text-primary-600">Libélulas Design</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </Link>
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <Link href={`/category/${category.slug}`} className="text-sm font-medium hover:text-primary transition-colors">
                  {category.name}
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-md p-2 min-w-[200px] z-10">
                  {category.subcategories.map((subcategory) => (
                    <Link 
                      key={subcategory.id} 
                      href={`/category/${category.slug}/${subcategory.slug}`}
                      className="block p-2 text-sm hover:bg-primary-50 rounded-sm"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-[200px] md:w-[300px]"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(false)}
                className="ml-1"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar"
            >
              <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
            </Button>
          )}
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Carrito">
              <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/admin">
            <Button variant="ghost" size="icon" aria-label="Admin">
              <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}