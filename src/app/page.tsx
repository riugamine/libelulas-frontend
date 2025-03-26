import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/data/products';
import { getAllCategories } from '@/lib/data/categories';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/images/hero-banner.jpg"
          alt="Libélulas Design - Libretas y Agendas Personalizadas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Libretas y Agendas Personalizadas</h1>
            <p className="text-xl mb-8">Diseños únicos para momentos especiales</p>
            <Link 
              href="/products" 
              className="inline-block bg-[#D9E17F] text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-[#C9D16F] transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <div className="relative h-64 rounded-lg overflow-hidden group">
                  <Image
                    src={category.image || '/images/placeholder.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="inline-block bg-[#D9E17F] text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-[#C9D16F] transition-colors"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-[#D9E17F] rounded-full mb-4">
                <FontAwesomeIcon icon="star" className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">Utilizamos materiales de la más alta calidad para crear productos duraderos y hermosos.</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-[#F8C8DC] rounded-full mb-4">
                <FontAwesomeIcon icon="heart" className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diseños Personalizados</h3>
              <p className="text-gray-600">Cada producto es único y personalizado según tus preferencias y necesidades.</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-[#C9E4CA] rounded-full mb-4">
                <FontAwesomeIcon icon={['fab', 'whatsapp']} className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">Te atendemos directamente por WhatsApp para brindarte la mejor experiencia de compra.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
