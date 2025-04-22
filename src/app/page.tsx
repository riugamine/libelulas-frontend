"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState(products.filter(p => p.featured).slice(0, 4));
  
  return (
    <>
    <Header />
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-primary-600 to-primary-400 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-up animate-once animate-duration-[800ms] animate-delay-100 animate-ease-in-out">
              <span className="block animate-fade-right animate-once animate-duration-[1200ms]">Diseños únicos</span>
              <span className="block mt-2 animate-fade-right animate-once animate-duration-[1200ms] animate-delay-300">para momentos</span>
              <span className="block mt-2 text-primary-100 animate-fade-right animate-once animate-duration-[1200ms] animate-delay-500">especiales</span>
            </h1>
            <p className="text-xl text-white mb-8 animate-fade-up animate-once animate-duration-[800ms] animate-delay-700 animate-ease-in-out">
              Descubre nuestra colección de papelería personalizada, agendas y accesorios diseñados con amor para hacer tu día a día más especial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-once animate-duration-[800ms] animate-delay-1000 animate-ease-in-out">
              <Button size="lg" className="bg-white hover:bg-primary-50 text-primary-700 hover:text-primary-800 font-bold" asChild>
                <Link href="/products">Ver Productos</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-500/20" asChild>
                <Link href="/about">Conoce Nuestra Historia</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary-500/90 z-10"></div>
          <Image 
            src="/images/hero-image.jpg" 
            alt="Libélulas Design Productos" 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800">Productos Destacados</h2>
            <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium text-lg group flex items-center">
              Ver todos <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-12 text-center">
            Explora Nuestras Categorías
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.id}`}
                className="group relative h-80 rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02]"
              >
                <Image 
                  src={`/images/categories/${category.id}.jpg`} 
                  alt={category.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent group-hover:from-primary-800/80 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-end p-8">
                  <h3 className="text-white text-2xl font-bold group-hover:translate-y-[-8px] transition-transform duration-300">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-16 text-center">
            ¿Por qué elegir Libélulas Design?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover:translate-y-[-8px] transition-transform duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center shadow-md group-hover:bg-primary-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-primary-700">Diseños Exclusivos</h3>
              <p className="text-primary-600 text-lg">Todos nuestros productos son diseñados con amor y dedicación para ofrecerte piezas únicas.</p>
            </div>
            
            <div className="text-center group hover:translate-y-[-8px] transition-transform duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center shadow-md group-hover:bg-primary-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-primary-700">Calidad Premium</h3>
              <p className="text-primary-600 text-lg">Utilizamos materiales de la más alta calidad para garantizar productos duraderos y hermosos.</p>
            </div>
            
            <div className="text-center group hover:translate-y-[-8px] transition-transform duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center shadow-md group-hover:bg-primary-200 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-primary-700">Envío Rápido</h3>
              <p className="text-primary-600 text-lg">Procesamos tu pedido en 24-48 horas para que recibas tus productos lo antes posible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-16 text-center">
            Lo que dicen nuestros clientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold text-xl">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-800 text-lg">María González</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-primary-700 text-lg">"Mi agenda personalizada es hermosa, la calidad del papel y la impresión son excelentes. ¡Definitivamente volveré a comprar!"</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold text-xl">C</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-800 text-lg">Carlos Rodríguez</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-primary-700 text-lg">"Compré varios artículos de papelería como regalo y quedaron encantados. El empaque es precioso y los diseños son únicos."</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold text-xl">L</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-800 text-lg">Laura Martínez</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-primary-700 text-lg">"El servicio al cliente es excepcional. Tuve un problema con mi pedido y lo resolvieron de inmediato. ¡Muy recomendable!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-pulse animate-infinite animate-duration-[3000ms]">
              Únete a nuestra comunidad
            </h2>
            <p className="mb-8 text-primary-50 text-xl">
              Suscríbete para recibir noticias sobre nuevos productos, ofertas especiales y contenido exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-1 px-6 py-4 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-white text-lg"
              />
              <Button className="bg-white hover:bg-primary-50 text-primary-700 hover:text-primary-800 font-bold" size="lg">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
