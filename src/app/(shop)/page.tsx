import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

export default function HomePage() {
  // Obtener productos destacados
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60 z-10" />
        <Image
          src="/images/hero-bg.jpg"
          alt="Libélulas Design - Libretas y Agendas Personalizadas"
          fill
          className="object-cover"
          priority
        />
        <div className="container relative z-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Libretas y Agendas Personalizadas
            </h1>
            <p className="text-xl text-white/90">
              Diseños exclusivos para organizar tu vida con estilo
            </p>
            <div className="pt-4">
              <Link href="/products">
                <Button size="lg">
                  Ver Catálogo
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Productos Destacados</h2>
          <Link href="/products">
            <Button variant="outline">
              Ver todos
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
      
      {/* Categories */}
      <section className="bg-primary-50 py-12">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Explora Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent z-10" />
                <Image
                  src={`/images/categories/${category.slug}.jpg`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="text-white/90">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Diseños Exclusivos</h3>
            <p className="text-gray-600">
              Creamos diseños únicos y personalizados para que tu libreta o agenda sea especial.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Calidad Premium</h3>
            <p className="text-gray-600">
              Utilizamos materiales de alta calidad para garantizar durabilidad y una experiencia de uso excepcional.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Entrega Rápida</h3>
            <p className="text-gray-600">
              Procesamos tu pedido rápidamente para que recibas tu producto en el menor tiempo posible.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-primary-50 py-12">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Me encantó mi agenda personalizada. La calidad es excelente y el diseño quedó hermoso. Definitivamente volveré a comprar."
              </p>
              <p className="font-medium">María González</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Las libretas son perfectas para mi trabajo. El papel es de buena calidad y los diseños son muy originales. Recomendado al 100%."
              </p>
              <p className="font-medium">Carlos Rodríguez</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Compré una agenda para mi hermana y quedó encantada. La atención al cliente fue excelente y el producto llegó en perfecto estado."
              </p>
              <p className="font-medium">Laura Martínez</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}