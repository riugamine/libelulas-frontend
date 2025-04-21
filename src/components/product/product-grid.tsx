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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              &laquo;
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-primary-500 bg-primary-50 text-primary-600">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              &raquo;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}