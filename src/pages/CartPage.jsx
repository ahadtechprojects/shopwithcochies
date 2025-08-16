import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import { auth } from "../firebase";
import AuthModal from "../components/AuthModal";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [showRemove, setShowRemove] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!auth.currentUser) {
      // 🔑 open login/signup modal instead of redirecting
      setAuthModalOpen(true);
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <ShoppingCart size={64} className="mb-4" />
          <p className="text-lg font-semibold">Your cart is empty</p>
          <Link
            to="/"
            className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b py-4 gap-4 relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>₦{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={item.quantity <= 1}
                  >
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    ➕
                  </button>
                </div>
              </div>
              {showRemove && (
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-6 gap-3">
            <p className="text-lg font-semibold">
              Subtotal: ₦{subtotal.toLocaleString()}
            </p>
            <div className="flex gap-3 sm:flex-row flex-col">
              <button
                onClick={() => setShowRemove((prev) => !prev)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                {showRemove ? "Cancel Remove" : "Remove Item"}
              </button>
              <button
                onClick={handleCheckout}
                className="bg-black text-white text-center py-2 px-6 rounded hover:bg-gray-800"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirectTo="/checkout"
      />
    </div>
  );
};

export default CartPage;
