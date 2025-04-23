import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { categories } from "@/lib/data/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Libélulas Design</h3>
            <p className="text-gray-300 text-base">
              Libretas y agendas personalizadas para todos los gustos y necesidades.
            </p>
            <div className="flex space-x-6 mt-6">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="h-7 w-7" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                <FontAwesomeIcon icon={faInstagram} className="h-7 w-7" />
              </Link>
              <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                <FontAwesomeIcon icon={faWhatsapp} className="h-7 w-7" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Productos</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="text-gray-300 hover:text-white transition-colors text-base">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-base">
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-base">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-base">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-base">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-base">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-base">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contacto</h3>
            <address className="not-italic space-y-3 text-gray-300 text-base">
              <p>Ciudad, País</p>
              <p>Email: info@libelulasdesign.com</p>
              <p>Teléfono: +1 234 567 890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400">
          <p className="text-base">&copy; {currentYear} Libélulas Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}