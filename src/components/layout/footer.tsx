import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Información de la Tienda */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">TIENDA</h3>
            <p className="text-sm text-gray-600">© {currentYear} Libélulas Design™. Todos los derechos reservados.</p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">RECURSOS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">SOPORTE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Enlaces de Redes Sociales */}
        <div className="flex justify-center space-x-6 mt-8 pt-8 border-t border-gray-200">
          <Link 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
          </Link>
          <Link 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FontAwesomeIcon icon={faTiktok} className="h-5 w-5" />
          </Link>
          <Link 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}