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
import { Parallax } from 'react-parallax';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState(products.filter(p => p.featured).slice(0, 4));
  
  return (
    <>
    <Header />
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <Parallax
        blur={0}
        bgImage="/images/pattern.png"
        bgImageAlt="Patrón de libélulas"
        strength={200}
        className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden"
      >
        
        {/* Contenido centrado */}
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
          <div className="max-w-2xl z-10 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              <span className="block">Diseños únicos</span>
              <span className="block text-primary-700">para momentos especiales</span>
            </h1>
            
            <Button 
              size="lg"
              className="bg-primary-300 hover:bg-primary-200 text-primary-900 font-medium mt-4"
              asChild
            >
              <Link href="/products">Ver Productos</Link>
            </Button>
          </div>
        </div>
      </Parallax>
      

      {/* Stats Section */}
      <section className="bg-white py-8 border-b border-gray-100 text-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">500+</p>
              <p className="text-sm text-primary-600">Productos vendidos</p>
            </div>
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">200+</p>
              <p className="text-sm text-primary-600">Clientes satisfechos</p>
            </div>
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">50+</p>
              <p className="text-sm text-primary-600">Diseños personalizados</p>
            </div>
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">10%</p>
              <p className="text-sm text-primary-600">Descuento primera compra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-300">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-12 text-center">
            Clave para un futuro mejor
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-primary-200/50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-paint-brush text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">Diseño Único</h3>
              <p className="text-primary-700">Creamos productos personalizados que reflejan tu estilo y personalidad.</p>
            </div>
            
            <div className="bg-primary-200/50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-leaf text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">Eco-Friendly</h3>
              <p className="text-primary-700">Utilizamos materiales sostenibles y procesos respetuosos con el medio ambiente.</p>
            </div>
            
            <div className="bg-primary-200/50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-award text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">Alta Calidad</h3>
              <p className="text-primary-700">Cada producto está fabricado con los mejores materiales para garantizar durabilidad.</p>
            </div>
            
            <div className="bg-primary-200/50 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-shipping-fast text-2xl text-primary-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">Entrega Rápida</h3>
              <p className="text-primary-700">Procesamos y enviamos tu pedido en el menor tiempo posible para tu comodidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
              Últimos Productos
            </h2>
            <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              Ver todos
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
