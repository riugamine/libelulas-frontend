import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { getProductById } from '@/lib/data/products';

export default function EditProduct({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
      <ProductForm product={product} isEditing={true} />
    </div>
  );
}