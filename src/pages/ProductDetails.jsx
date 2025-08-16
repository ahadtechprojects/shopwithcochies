// src/pages/ProductDetailsPage.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return <div className="p-6 text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded shadow"
      />

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 text-xl mb-4">
          ₦{product.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-6">Category: {product.category}</p>

        {product.inStock ? (
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-300 text-gray-600 py-3 px-6 rounded cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
