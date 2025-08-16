// src/pages/ShopPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("category") || "";

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();

    const tempProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );

    setFilteredProducts(tempProducts);
  }, [searchQuery]);

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-100 text-center py-6">
        <h1 className="text-xl font-bold">WELCOME TO SHOPWITHCOCHIES</h1>
        <p className="text-gray-600">YOUR HOME FOR ALL RETAIL PRODUCTS</p>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid grid-cols-2 gap-6 mt-6 justify-items-center
          sm:gap-8
          p-4
        "
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="w-full max-w-[160px] sm:max-w-xs">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No products found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
