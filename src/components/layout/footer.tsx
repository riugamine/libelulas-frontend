import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { categories } from "@/lib/data/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Libélulas Design</h3>
            <p className="text-primary-100">
              Libretas y agendas personalizadas para todos los gustos y necesidades.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-200 transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-200 transition-colors">
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
              </Link>
              <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary-200 transition-colors">
                <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Productos</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="hover:text-primary-200 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="hover:text-primary-200 transition-colors">
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary-200 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-200 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-200 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-200 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-200 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <address className="not-italic space-y-2 text-primary-100">
              <p>Ciudad, País</p>
              <p>Email: info@libelulasdesign.com</p>
              <p>Teléfono: +1 234 567 890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-200">
          <p>&copy; {currentYear} Libélulas Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}