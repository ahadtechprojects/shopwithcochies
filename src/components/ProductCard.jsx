import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [isAnimating, setIsAnimating] = useState(false);
  const [glow, setGlow] = useState(false);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);

      // Glow effect only when adding
      setGlow(true);
      setTimeout(() => setGlow(false), 500);
    }

    // Trigger pop animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      className="
        bg-white rounded-md overflow-hidden relative flex flex-col
        border border-gray-100 shadow-sm
        transition hover:shadow-lg
      "
    >
      {/* Heart Icon */}
      <motion.button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 text-xl z-10 ${
          glow ? "drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]" : ""
        }`}
        animate={isAnimating ? { scale: 1.3 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {isInWishlist ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-red-500" />
        )}
      </motion.button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain p-3"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-medium text-center text-sm min-h-[40px]">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Price */}
        <div className="mt-1 text-center">
          {product.oldPrice && (
            <p className="text-gray-400 text-sm line-through">
              ₦{product.oldPrice.toLocaleString()}
            </p>
          )}
          <p className="text-black font-semibold">
            ₦{product.price.toLocaleString()}
          </p>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow" />

        {/* Add to Cart / Out of Stock */}
        {product.inStock ? (
          <button
            onClick={() => addToCart(product)}
            className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="mt-3 w-full bg-gray-200 text-gray-500 py-2 rounded-md cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
