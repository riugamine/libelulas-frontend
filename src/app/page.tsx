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
import { faPaintBrush, faLeaf, faAward, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  
  return (
    <>
    <Header />
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Optimizado para SEO y conversión */}
      <section className="relative min-h-[70vh] bg-gradient-to-b from-primary to-white flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-50 bg-contain"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 leading-tight">
              <span className="block">Libretas y Agendas</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                Diseñadas para Inspirar
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-700 max-w-2xl mx-auto">
              Creamos piezas únicas que transforman tus momentos cotidianos en experiencias extraordinarias
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-700 text-white min-w-[200px] shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Explorar Colección
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-600 text-primary-600 hover:bg-primary-50 min-w-[200px]"
              >
                <Link href="/about">Conoce Nuestra Historia</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mejorado visualmente */}
      <section className="py-16 bg-white border-y border-primary-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "500+", text: "Productos vendidos" },
              { number: "200+", text: "Clientes satisfechos" },
              { number: "50+", text: "Diseños únicos" },
              { number: "10%", text: "Descuento inicial" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-primary-50/50 hover:bg-primary-50 transition-colors">
                <p className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">{stat.number}</p>
                <p className="text-sm md:text-base text-primary-600">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Features Section */}
       <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-16">
            Por qué elegir Libélulas Design
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: faPaintBrush,
                title: "Diseño Único",
                description: "Cada pieza refleja tu personalidad y estilo individual"
              },
              {
                icon: faLeaf,
                title: "Eco-Friendly",
                description: "Comprometidos con materiales sostenibles y el medio ambiente"
              },
              {
                icon: faAward,
                title: "Alta Calidad",
                description: "Materiales premium para una durabilidad excepcional"
              },
              {
                icon: faShippingFast,
                title: "Entrega Rápida",
                description: "Tu pedido en tus manos en el menor tiempo posible"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <FontAwesomeIcon 
                    icon={feature.icon}
                    className="h-8 w-8 text-primary-600" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary-900 text-center">
                  {feature.title}
                </h3>
                <p className="text-primary-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products Section - Optimizado para mejor presentación */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900">
              Últimas Creaciones
            </h2>
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Ver catálogo completo
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
              />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
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
