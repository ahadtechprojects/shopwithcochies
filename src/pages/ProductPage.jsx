// src/pages/ProductsPage.jsx
import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductsContext } from "../context/ProductsContext";

const ProductsPage = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="px-4 py-6">
      {/* Responsive grid with equal height cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="flex">
              <ProductCard product={product} className="flex flex-col h-full" />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
