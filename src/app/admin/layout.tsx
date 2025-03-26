'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                  <FontAwesomeIcon icon="home" className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon="shopping-bag" className="mr-3 h-5 w-5" />
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                >
                  <FontAwesomeIcon icon="folder" className="mr-3 h-5 w-5" />
                  Categorías
                </Link>
              </li>
            </ul>
          </nav>

          {/* User */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9E17F] text-gray-700">
                <FontAwesomeIcon icon="user" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <Link href="/" className="text-xs text-gray-500 hover:text-[#D9E17F]">
                  Ver Tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700"
          >
            <FontAwesomeIcon icon="bars" className="h-6 w-6" />
          </button>
          <Link href="/admin">
            <Image
              src="/images/logo/libelulas-logo.png"
              alt="Libélulas Design"
              width={100}
              height={40}
              className="h-auto"
            />
          </Link>
          <div className="h-6 w-6"></div> {/* Empty div for flex alignment */}
        </div>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <div className="flex h-full flex-col">
              {/* Close button */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <Link href="/admin">
                  <Image
                    src="/images/logo/libelulas-logo.png"
                    alt="Libélulas Design"
                    width={100}
                    height={40}
                    className="h-auto"
                  />
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-700"
                >
                  <FontAwesomeIcon icon="times" className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/admin"
                      className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FontAwesomeIcon icon="home" className="mr-3 h-5 w-5" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/products"
                      className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FontAwesomeIcon icon="shopping-bag" className="mr-3 h-5 w-5" />
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/categories"
                      className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-[#D9E17F] hover:bg-opacity-20"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FontAwesomeIcon icon="folder" className="mr-3 h-5 w-5" />
                      Categorías
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* User */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9E17F] text-gray-700">
                    <FontAwesomeIcon icon="user" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Admin</p>
                    <Link href="/" className="text-xs text-gray-500 hover:text-[#D9E17F]">
                      Ver Tienda
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}