"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "María González",
      email: "maria@example.com",
      phone: "+1234567890"
    },
    date: "2023-06-15",
    total: 45.99,
    status: "Completado",
    items: [
      { id: "1", name: "Libreta Floral", quantity: 1, price: 25.99 },
      { id: "2", name: "Agenda 2023", quantity: 1, price: 20.00 }
    ],
    shipping: {
      address: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      postalCode: "01000",
      country: "México"
    },
    payment: {
      method: "Tarjeta de crédito",
      cardLast4: "4242"
    }
  },
  {
    id: "ORD-002",
    customer: {
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      phone: "+1234567891"
    },
    date: "2023-06-14",
    total: 32.50,
    status: "Enviado",
    items: [
      { id: "3", name: "Libreta Minimalista", quantity: 2, price: 16.25 }
    ],
    shipping: {
      address: "Av. Reforma 456",
      city: "Guadalajara",
      state: "Jalisco",
      postalCode: "44100",
      country: "México"
    },
    payment: {
      method: "PayPal",
      email: "carlos@example.com"
    }
  },
  {
    id: "ORD-003",
    customer: {
      name: "Laura Martínez",
      email: "laura@example.com",
      phone: "+1234567892"
    },
    date: "2023-06-14",
    total: 78.25,
    status: "Procesando",
    items: [
      { id: "4", name: "Agenda Ejecutiva", quantity: 1, price: 45.00 },
      { id: "5", name: "Set de Stickers", quantity: 3, price: 11.08 }
    ],
    shipping: {
      address: "Calle Norte 789",
      city: "Monterrey",
      state: "Nuevo León",
      postalCode: "64000",
      country: "México"
    },
    payment: {
      method: "Transferencia bancaria"
    }
  },
  {
    id: "ORD-004",
    customer: {
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "+1234567893"
    },
    date: "2023-06-13",
    total: 22.99,
    status: "Completado",
    items: [
      { id: "6", name: "Libreta de Bolsillo", quantity: 1, price: 12.99 },
      { id: "7", name: "Bolígrafo Premium", quantity: 1, price: 10.00 }
    ],
    shipping: {
      address: "Av. Sur 321",
      city: "Puebla",
      state: "Puebla",
      postalCode: "72000",
      country: "México"
    },
    payment: {
      method: "Tarjeta de débito",
      cardLast4: "1234"
    }
  },
  {
    id: "ORD-005",
    customer: {
      name: "Ana López",
      email: "ana@example.com",
      phone: "+1234567894"
    },
    date: "2023-06-12",
    total: 54.75,
    status: "Enviado",
    items: [
      { id: "8", name: "Planner Anual", quantity: 1, price: 54.75 }
    ],
    shipping: {
      address: "Calle Este 654",
      city: "Querétaro",
      state: "Querétaro",
      postalCode: "76000",
      country: "México"
    },
    payment: {
      method: "Tarjeta de crédito",
      cardLast4: "5678"
    }
  }
];

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  
  const itemsPerPage = 10;
  
  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsViewOrderOpen(true);
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800";
      case "Enviado":
        return "bg-blue-100 text-blue-800";
      case "Procesando":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Pedidos</h1>
        <Button>
          <FontAwesomeIcon icon={faFileDownload} className="mr-2 h-4 w-4" />
          Exportar Pedidos
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
          </span>
          <Input
            type="text"
            placeholder="Buscar por ID, cliente o email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1); // Reset to first page on filter change
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos los estados</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
              <SelectItem value="Enviado">Enviado</SelectItem>
              <SelectItem value="Procesando">Procesando</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron pedidos
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-primary-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
                  </span>{" "}
                  de <span className="font-medium">{filteredOrders.length}</span> resultados
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
      
      {/* Order Details Dialog */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">Información del Cliente</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer.phone}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Dirección de Envío</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">{selectedOrder.shipping.address}</p>
                    <p className="text-sm">{selectedOrder.shipping.city}, {selectedOrder.shipping.state}</p>
                    <p className="text-sm">{selectedOrder.shipping.postalCode}</p>
                    <p className="text-sm">{selectedOrder.shipping.country}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Información de Pago</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">Método: {selectedOrder.payment.method}</p>
                    {selectedOrder.payment.cardLast4 && (
                      <p className="text-sm">Tarjeta: **** **** **** {selectedOrder.payment.cardLast4}</p>
                    )}
                    {selectedOrder.payment.email && (
                      <p className="text-sm">Email: {selectedOrder.payment.email}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Productos</h3>
                <div className="bg-gray-50 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cantidad
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Total
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          ${selectedOrder.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  Fecha del pedido: {selectedOrder.date}
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    Imprimir
                  </Button>
                  <Button>
                    Actualizar Estado
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}