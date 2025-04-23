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
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-white/40 h-[50vh]"></div>
        
        {/* Contenido centrado */}
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
          <div className="max-w-2xl z-10 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-500">
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
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">5.000+</p>
              <p className="text-sm text-primary-600">Productos vendidos</p>
            </div>
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">2.500+</p>
              <p className="text-sm text-primary-600">Clientes satisfechos</p>
            </div>
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">10.000+</p>
              <p className="text-sm text-primary-600">Diseños personalizados</p>
            </div>
            <div className="p-4">
              <p className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">15%</p>
              <p className="text-sm text-primary-600">Descuento en primera compra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-300">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-center">
            Clave para un futuro mejor
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-primary-200/50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-900">Diseño Único</h3>
              <p className="text-primary-700">Creamos productos personalizados que reflejan tu estilo y personalidad.</p>
            </div>
            
            <div className="bg-primary-200/50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-900">Eco-Friendly</h3>
              <p className="text-primary-700">Utilizamos materiales sostenibles y procesos respetuosos con el medio ambiente.</p>
            </div>
            
            <div className="bg-primary-200/50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-900">Alta Calidad</h3>
              <p className="text-primary-700">Cada producto está fabricado con los mejores materiales para garantizar durabilidad.</p>
            </div>
            
            <div className="bg-primary-200/50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-900">Entrega Rápida</h3>
              <p className="text-primary-700">Procesamos y enviamos tu pedido en el menor tiempo posible para tu comodidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-6">
            Nuestro compromiso con el diseño personalizado está abriendo camino para un mundo más creativo y único.
          </h2>
          <Button className="bg-primary-800 hover:bg-primary-700 text-white" size="lg">
            Conoce más
          </Button>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="relative h-64 overflow-hidden rounded-lg">
                <Image 
                  src={`/images/gallery/item-${item}.jpg`} 
                  alt={`Galería ${item}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary-800 flex justify-between items-center cursor-pointer">
                ¿Cuáles son sus materiales?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary-800 flex justify-between items-center cursor-pointer">
                ¿Qué opciones de personalización ofrecen?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-primary-800 flex justify-between items-center cursor-pointer">
                ¿Cuál es el tiempo de entrega?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative h-80 w-80 mx-auto rounded-full overflow-hidden">
                <Image 
                  src="/images/testimonial-avatar.jpg" 
                  alt="Cliente satisfecho" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <blockquote className="text-xl md:text-2xl text-primary-800 italic mb-6">
                "Estos productos han transformado la forma en que organizo mi día. La calidad y el cuidado en cada detalle no solo mejoran mi productividad, sino que también han revolucionado todo mi proceso."
              </blockquote>
              <p className="font-semibold text-primary-900">Ana Pérez</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Aprende Desarrollo Web Frontend</h2>
          <Button className="bg-primary-300 hover:bg-primary-200 text-primary-900" size="lg">
            Empezar
          </Button>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
