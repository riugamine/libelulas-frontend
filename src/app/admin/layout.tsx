'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBagShopping, faFolder, faUsers, faGear, } from '@fortawesome/free-solid-svg-icons';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-white shadow-md md:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center border-b border-gray-200 p-4">
            <Link href="/admin">
              <Image
                src="/images/logo/libelulas-logo.png"
                alt="Libélulas Design"
                width={120}
                height={48}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon={faHouse} className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon={faBagShopping} className="mr-3 h-5 w-5" />
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon={faFolder} className="mr-3 h-5 w-5" />
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-3 h-5 w-5" />
                  Usuarios
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon={faGear} className="mr-3 h-5 w-5" />
                  Configuración
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {/* Rest of the component remains unchanged, but update FontAwesomeIcon usage */}
    </div>
  );
}