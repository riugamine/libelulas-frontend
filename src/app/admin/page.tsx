"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBoxOpen, 
  faShoppingCart, 
  faUsers, 
  faChartLine,
  faArrowUp,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for dashboard
const recentOrders = [
  { id: "ORD-001", customer: "María González", date: "2023-06-15", total: 45.99, status: "Completado" },
  { id: "ORD-002", customer: "Carlos Rodríguez", date: "2023-06-14", total: 32.50, status: "Enviado" },
  { id: "ORD-003", customer: "Laura Martínez", date: "2023-06-14", total: 78.25, status: "Procesando" },
  { id: "ORD-004", customer: "Juan Pérez", date: "2023-06-13", total: 22.99, status: "Completado" },
  { id: "ORD-005", customer: "Ana López", date: "2023-06-12", total: 54.75, status: "Enviado" },
];

const topProducts = [
  { id: "1", name: "Libreta Floral", sales: 42, revenue: 1089.58 },
  { id: "2", name: "Agenda 2023", sales: 38, revenue: 760.00 },
  { id: "3", name: "Libreta Minimalista", sales: 35, revenue: 568.75 },
  { id: "4", name: "Planner Anual", sales: 30, revenue: 1642.50 },
  { id: "5", name: "Agenda Ejecutiva", sales: 28, revenue: 1260.00 },
];

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("week");
  
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
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <FontAwesomeIcon icon={faChartLine} className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3 mr-1" />
              <span>12% desde el mes pasado</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3 mr-1" />
              <span>8% desde el mes pasado</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <FontAwesomeIcon icon={faBoxOpen} className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3 mr-1" />
              <span>4 nuevos este mes</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <FontAwesomeIcon icon={faArrowDown} className="h-3 w-3 mr-1" />
              <span>3% desde el mes pasado</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pedidos Recientes</CardTitle>
              <Link href="/admin/orders">
                <Button variant="link" size="sm" className="text-primary-600">
                  Ver Todos
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="pb-2 font-medium text-left">ID</th>
                    <th className="pb-2 font-medium text-left">Cliente</th>
                    <th className="pb-2 font-medium text-left">Fecha</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                    <th className="pb-2 font-medium text-right">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 text-sm">{order.id}</td>
                      <td className="py-3 text-sm">{order.customer}</td>
                      <td className="py-3 text-sm">{order.date}</td>
                      <td className="py-3 text-sm text-right">${order.total.toFixed(2)}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Productos Más Vendidos</CardTitle>
              <Tabs defaultValue="week" value={timeRange} onValueChange={setTimeRange}>
                <TabsList className="grid grid-cols-3 h-8">
                  <TabsTrigger value="week" className="text-xs">Semana</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">Mes</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs">Año</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                      <FontAwesomeIcon icon={faBoxOpen} className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.sales} vendidos</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">${product.revenue.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Gráfico de ventas (simulado)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}