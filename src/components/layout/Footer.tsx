import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterestP } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image 
                src="/images/logo/libelulas-logo.png" 
                alt="Libélulas Design" 
                width={150} 
                height={60} 
                className="h-auto mb-4"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Libretas y agendas personalizadas para todos tus momentos especiales.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D9E17F]">
                <FontAwesomeIcon icon={faFacebookF} className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D9E17F]">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D9E17F]">
                <FontAwesomeIcon icon={faPinterestP} className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#D9E17F]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-[#D9E17F]">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#D9E17F]">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#D9E17F]">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/libretas" className="text-gray-600 hover:text-[#D9E17F]">
                  Libretas
                </Link>
              </li>
              <li>
                <Link href="/category/agendas" className="text-gray-600 hover:text-[#D9E17F]">
                  Agendas
                </Link>
              </li>
              <li>
                <Link href="/category/planificadores" className="text-gray-600 hover:text-[#D9E17F]">
                  Planificadores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FontAwesomeIcon icon="envelope" className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                <a href="mailto:info@libelulasdesign.com" className="text-gray-600 hover:text-[#D9E17F]">
                  info@libelulasdesign.com
                </a>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon="phone" className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-[#D9E17F]">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon="map-marker-alt" className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                <span className="text-gray-600">
                  Ciudad de México, México
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Libélulas Design. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}