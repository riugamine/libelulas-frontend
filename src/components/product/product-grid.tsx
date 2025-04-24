"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data/products";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length > 0 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 text-sm">
              &laquo;
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-primary-500 bg-primary-50 text-primary-600 text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 text-sm">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 text-sm">
              &raquo;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}