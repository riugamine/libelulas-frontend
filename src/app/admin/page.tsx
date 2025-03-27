import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faFolder, faFolderOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getAllProducts } from '@/lib/data/products';
import { getAllCategories } from '@/lib/data/categories';

export default function AdminDashboard() {
  const products = getAllProducts();
  const categories = getAllCategories();
  
  // Count subcategories
  const subcategoriesCount = categories.reduce((count, category) => {
    return count + (category.subcategories?.length || 0);
  }, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#D9E17F] bg-opacity-20 p-3 rounded-full">
              <FontAwesomeIcon icon={faBagShopping} className="h-6 w-6 text-[#D9E17F]" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Productos</p>
              <h3 className="text-2xl font-semibold text-gray-900">{products.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#F8C8DC] bg-opacity-20 p-3 rounded-full">
              <FontAwesomeIcon icon={faFolder} className="h-6 w-6 text-[#F8C8DC]" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Categorías</p>
              <h3 className="text-2xl font-semibold text-gray-900">{categories.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#C9E4CA] bg-opacity-20 p-3 rounded-full">
              <FontAwesomeIcon icon={faFolderOpen} className="h-6 w-6 text-[#C9E4CA]" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Subcategorías</p>
              <h3 className="text-2xl font-semibold text-gray-900">{subcategoriesCount}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/admin/products/new" 
            className="flex items-center justify-center rounded-md bg-[#D9E17F] px-4 py-2 font-medium text-gray-800 hover:bg-[#C9D16F]"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Link>
          <Link 
            href="/admin/categories/new" 
            className="flex items-center justify-center rounded-md bg-[#F8C8DC] px-4 py-2 font-medium text-gray-800 hover:bg-[#E8B8CC]"
          >
            <FontAwesomeIcon icon="plus" className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Link>
        </div>
      </div>
      
      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Productos Recientes</h2>
          <Link 
            href="/admin/products" 
            className="text-sm text-[#D9E17F] hover:underline"
          >
            Ver Todos
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destacado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.slice(0, 5).map((product) => {
                const category = product.categoryId.includes('-')
                  ? product.categoryId.split('-')[1]
                  : product.categoryId;
                
                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <img
                            src={product.variants[0]?.images[0] || '/images/placeholder.jpg'}
                            alt={product.name}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.featured ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Sí
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-[#D9E17F] hover:text-[#C9D16F] mr-3"
                      >
                        Editar
                      </Link>
                      <button className="text-red-500 hover:text-red-700">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}