"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTachometerAlt, 
  faBoxOpen, 
  faListAlt, 
  faShoppingCart, 
  faUsers, 
  faCog,
  faBars,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: faTachometerAlt },
  { name: "Productos", href: "/admin/products", icon: faBoxOpen },
  { name: "Categorías", href: "/admin/categories", icon: faListAlt },
  { name: "Pedidos", href: "/admin/orders", icon: faShoppingCart },
  { name: "Usuarios", href: "/admin/users", icon: faUsers },
  { name: "Configuración", href: "/admin/settings", icon: faCog },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
          <div className="text-lg font-semibold">Libélulas Admin</div>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-gray-800 bg-opacity-75">
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-30">
            <div className="flex items-center justify-between h-16 px-6 border-b">
              <div className="text-xl font-semibold">Libélulas Admin</div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-4 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={item.icon} className={`mr-3 h-5 w-5 ${isActive ? "text-primary-600" : "text-gray-500"}`} />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 h-5 w-5 text-gray-500" />
                  Cerrar Sesión
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:bg-white md:border-r md:border-gray-200 md:w-64">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <div className="text-xl font-semibold">Libélulas Admin</div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className={`mr-3 h-5 w-5 ${isActive ? "text-primary-600" : "text-gray-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-3 py-4 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 h-5 w-5 text-gray-500" />
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}