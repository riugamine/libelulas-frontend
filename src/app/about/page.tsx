import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Sobre Libélulas Design</h1>
      
      {/* Hero Section */}
      <div className="relative h-96 w-full mb-12 rounded-lg overflow-hidden">
        <Image
          src="/images/about/about-hero.jpg"
          alt="Libélulas Design Workshop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Artesanía con Pasión</h2>
            <p className="text-xl max-w-2xl">Creando diseños únicos que celebran la belleza de la naturaleza y la cultura mexicana</p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestra Historia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Libélulas Design nació en 2018 de la pasión de María González por la artesanía mexicana y su amor por la naturaleza. Inspirada por la gracia y belleza de las libélulas, símbolos de transformación y adaptabilidad, María comenzó a crear diseños únicos que combinan técnicas tradicionales con un toque contemporáneo.
            </p>
            <p className="text-gray-700 mb-4">
              Lo que comenzó como un pequeño taller en la Ciudad de México pronto se convirtió en una marca reconocida por su compromiso con la calidad, la sostenibilidad y el apoyo a las comunidades artesanales locales.
            </p>
            <p className="text-gray-700">
              Hoy, Libélulas Design es un equipo de artesanos talentosos que comparten la visión de María: crear productos hermosos que cuenten historias, celebren la cultura mexicana y respeten el medio ambiente.
            </p>
          </div>
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              src="/images/about/founder.jpg"
              alt="Fundadora de Libélulas Design"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-16 bg-gray-50 py-12 px-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#D9E17F] text-gray-800 mb-4">
              <FontAwesomeIcon icon="leaf" className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-medium mb-2">Sostenibilidad</h3>
            <p className="text-gray-600">
              Utilizamos materiales ecológicos y procesos de producción responsables para minimizar nuestro impacto ambiental.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#F8C8DC] text-gray-800 mb-4">
              <FontAwesomeIcon icon="hands-helping" className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-medium mb-2">Comunidad</h3>
            <p className="text-gray-600">
              Colaboramos con artesanos locales y apoyamos a las comunidades que preservan técnicas tradicionales.
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#C9E4CA] text-gray-800 mb-4">
              <FontAwesomeIcon icon="gem" className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-medium mb-2">Calidad</h3>
            <p className="text-gray-600">
              Cada pieza es cuidadosamente elaborada con atención al detalle y materiales de la más alta calidad.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Process */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestro Proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/process-1.jpg"
                alt="Diseño"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-gray-800 text-xl font-bold">1</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Diseño</h3>
            <p className="text-gray-600">
              Cada producto comienza con un boceto inspirado en la naturaleza y la cultura mexicana.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/process-2.jpg"
                alt="Selección de Materiales"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-gray-800 text-xl font-bold">2</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Materiales</h3>
            <p className="text-gray-600">
              Seleccionamos cuidadosamente materiales sostenibles y de alta calidad.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/process-3.jpg"
                alt="Artesanía"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-gray-800 text-xl font-bold">3</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Artesanía</h3>
            <p className="text-gray-600">
              Nuestros artesanos elaboran cada pieza a mano con técnicas tradicionales.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/process-4.jpg"
                alt="Control de Calidad"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-gray-800 text-xl font-bold">4</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Control de Calidad</h3>
            <p className="text-gray-600">
              Cada producto pasa por un riguroso control de calidad antes de llegar a ti.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative mx-auto h-64 w-64 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/team-1.jpg"
                alt="María González - Fundadora"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-medium mb-1">María González</h3>
            <p className="text-gray-500 mb-3">Fundadora y Diseñadora Principal</p>
            <p className="text-gray-600">
              Con más de 15 años de experiencia en diseño y artesanía, María es el corazón creativo de Libélulas Design.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative mx-auto h-64 w-64 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/team-2.jpg"
                alt="Carlos Ramírez - Director de Producción"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-medium mb-1">Carlos Ramírez</h3>
            <p className="text-gray-500 mb-3">Director de Producción</p>
            <p className="text-gray-600">
              Carlos supervisa todos los procesos de producción, asegurando que cada pieza cumpla con nuestros estándares de calidad.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative mx-auto h-64 w-64 rounded-full overflow-hidden mb-4">
              <Image
                src="/images/about/team-3.jpg"
                alt="Luisa Mendoza - Coordinadora de Comunidad"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-medium mb-1">Luisa Mendoza</h3>
            <p className="text-gray-500 mb-3">Coordinadora de Comunidad</p>
            <p className="text-gray-600">
              Luisa trabaja directamente con las comunidades artesanales, fortaleciendo nuestras colaboraciones y programas de apoyo.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center bg-[#D9E17F] bg-opacity-20 py-12 px-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Descubre Nuestros Productos</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Cada producto de Libélulas Design cuenta una historia y lleva consigo el espíritu de México. Explora nuestra colección y encuentra piezas únicas que añadirán belleza a tu vida diaria.
        </p>
        <Link
          href="/products"
          className="inline-block rounded-md bg-[#D9E17F] px-6 py-3 font-medium text-gray-800 hover:bg-[#C9D16F] transition-colors"
        >
          Ver Productos
        </Link>
      </div>
    </div>
  );
}