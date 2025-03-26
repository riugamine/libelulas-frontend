import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use the first variant's first image as the product image
  const productImage = product.variants[0]?.images[0] || '/images/placeholder.jpg';

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
        {/* Product Image */}
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="absolute right-3 top-3 flex flex-col space-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="rounded-full bg-white p-2 shadow-md hover:bg-[#D9E17F]">
            <FontAwesomeIcon icon="heart" className="h-4 w-4 text-gray-700" />
          </button>
          <button className="rounded-full bg-white p-2 shadow-md hover:bg-[#D9E17F]">
            <FontAwesomeIcon icon="share" className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-medium text-gray-800 hover:text-[#D9E17F]">{product.name}</h3>
        </Link>
        <p className="mt-1 text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        
        {/* Available Colors */}
        <div className="mt-2 flex space-x-2">
          {product.variants.map((variant) => (
            <div 
              key={variant.id}
              className="h-5 w-5 rounded-full border border-gray-300"
              style={{ backgroundColor: variant.colorCode }}
              title={variant.color}
            />
          ))}
        </div>
        
        {/* Add to Cart Button */}
        <Link 
          href={`https://wa.me/1234567890?text=Hola, me interesa el producto: ${product.name}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-[#D9E17F] px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-[#C9D16F]"
        >
          <FontAwesomeIcon icon={['fab', 'whatsapp']} className="mr-2 h-5 w-5" />
          Comprar por WhatsApp
        </Link>
      </div>
    </div>
  );
}