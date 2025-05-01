"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js'
import { useAuthStore } from '@/lib/store/useAuthStore'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faSearch, 
  faShoppingCart, 
  faUser, 
  faTimes,
  faSignOutAlt,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/data/categories";
import { User } from '@supabase/supabase-js';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, setUser, isLoading, setLoading, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const isActive = (path: string) => pathname === path;

  // Verificar sesión al cargar el componente
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error al obtener la sesión:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, setUser, setLoading]);

  // Manejar cierre de sesión
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      logout(); // Usar el método logout del store
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Menú móvil */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menú" className="hover:bg-transparent">
              <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-6 mt-8">
              <Link href="/" className="text-lg font-medium hover:text-primary transition-colors no-underline">
                Inicio
              </Link>
              {categories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="text-lg font-medium hover:text-primary transition-colors no-underline"
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <Link 
                        key={subcategory.id} 
                        href={`/category/${category.slug}/${subcategory.slug}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors no-underline">
                Nosotros
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-24">
              <Image 
                src="/logo-green.png" 
                alt="Libélulas Design Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navegación principal - centrada */}
        <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-primary no-underline ${
              isActive('/') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Inicio
          </Link>
          
          {categories.map((category) => (
            <DropdownMenu key={category.id}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`px-0 h-auto text-sm font-medium transition-colors hover:text-primary hover:bg-transparent ${
                    pathname.includes(`/category/${category.slug}`) ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {category.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <Link href={`/category/${category.slug}`} className="w-full no-underline">
                  <DropdownMenuItem className="cursor-pointer">
                    Ver todo {category.name}
                  </DropdownMenuItem>
                </Link>
                {category.subcategories.map((subcategory) => (
                  <Link 
                    key={subcategory.id} 
                    href={`/category/${category.slug}/${subcategory.slug}`}
                    className="w-full no-underline"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      {subcategory.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary no-underline ${
              isActive('/about') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Nosotros
          </Link>
          
        </nav>

        {/* Iconos de acción - derecha */}
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-[150px] md:w-[200px]"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(false)}
                className="ml-1 hover:bg-transparent"
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
              className="hover:bg-transparent"
            >
              <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
            </Button>
          )}
          
          {!isLoading && (user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Mi cuenta" 
                  className="hover:bg-transparent"
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {user.email}
                </div>
                <DropdownMenuSeparator />
                <Link href="/profile" className="no-underline">
                  <DropdownMenuItem className="cursor-pointer">
                    <FontAwesomeIcon icon={faUserCircle} className="mr-2 h-4 w-4" />
                    Mi Perfil
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="ghost" size="icon" aria-label="Mi cuenta" className="hover:bg-transparent">
                <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
              </Button>
            </Link>
          ))}
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Carrito" className="hover:bg-transparent">
              <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

