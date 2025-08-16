// src/pages/WishlistPage.jsx
import React, { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } =
    useContext(WishlistContext);

  const [localWishlist, setLocalWishlist] = useState(wishlist);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setLocalWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (product) => {
    moveToCart(product);
    setLocalWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Wishlist
      </h1>

      {localWishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <FaHeart className="text-red-500 text-6xl mb-4 animate-pulse" />
          <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
          <p className="text-gray-400 mb-4">
            Browse products and click the <FaHeart className="inline text-red-500" /> icon to add them here.
          </p>
          <Link
            to="/"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {localWishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                <p className="text-gray-700 font-medium mt-1">
                  ₦{product.price.toLocaleString()}
                </p>

                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
