"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/data/users";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filtrar usuarios basado en término de búsqueda
  const filteredUsers = users.filter(user => 
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Manejar eliminación (simulado)
  const handleDelete = (userId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      console.log(`Eliminando usuario ${userId}`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Usuarios</h1>
        <Link href="/admin/users/new">
          <Button>
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
          </span>
          <Input
            type="text"
            placeholder="Buscar por nombre, cédula o email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cédula
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.nombre}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.cedula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.direccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.rol === "admin" 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/users/edit/${user.id}`}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                  </span>{" "}
                  de <span className="font-medium">{filteredUsers.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Anterior</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Siguiente</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}