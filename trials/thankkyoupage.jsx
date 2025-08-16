import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion"; // For animation

const ThankYou = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || "N/A";
  const cartItems = location.state?.items || [];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Save order to Firestore on mount
  useEffect(() => {
    if (cartItems.length === 0) return;

    const saveOrder = async () => {
      try {
        await addDoc(collection(db, "orders"), {
          orderNumber,
          items: cartItems,
          subtotal,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };

    saveOrder();
  }, [cartItems, orderNumber, subtotal]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <FaCheckCircle className="text-green-600 text-6xl mb-6 animate-bounce" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6 text-center">
        Thank you for your order. We’ll process it shortly.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md text-center">
        <p className="text-gray-500 mb-1">Your Order Number</p>
        <h2 className="text-xl font-semibold">{orderNumber}</h2>
      </div>

      {cartItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md">
          <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex justify-between py-1 border-b border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span>{item.name} x {item.quantity}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </motion.div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Subtotal:</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
        </div>
      )}

      <Link
        to="/"
        className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Go Back to Store
      </Link>
    </div>
  );
};

export default ThankYou;
