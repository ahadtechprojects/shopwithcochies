import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import { CartContext } from "../context/CartContext";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { form, subtotal } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  const generateOrderNumber = () => {
    const characters = "ABCDEFGHIabcdefghi0123456789";
    let randomOrder = "";
    for (let i = 0; i < 9; i++) {
      randomOrder += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomOrder;
  };

  const handlePaymentSuccess = (newOrderNumber) => {
    const orderData = {
      orderNumber: newOrderNumber,
      form,
      subtotal,
      date: new Date().toISOString(),
      items: cartItems,
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    clearCart();
    setPaymentMessage("✅ Payment Successful! Redirecting...");

    setTimeout(() => {
      navigate("/thank-you", {
        state: { form, subtotal, orderNumber: newOrderNumber, items: cartItems },
      });
    }, 2000);
  };

  const payWithPaystack = () => {
    const newOrderNumber = generateOrderNumber();
    setIsProcessing(true);

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_3816c7f0cb9901eb48ce9073fe0eb6044545a526",
      amount: subtotal * 100,
      email: form.email,
      firstname: form.name,
      onSuccess: () => handlePaymentSuccess(newOrderNumber),
      onCancel: () => {
        alert("Payment cancelled");
        setIsProcessing(false);
      },
      callback: () => handlePaymentSuccess(newOrderNumber),
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Payment</h1>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × ₦{item.price.toLocaleString()}
              </p>
            </div>
            <p className="font-medium">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <p>Subtotal</p>
          <p>₦{subtotal?.toLocaleString()}</p>
        </div>
      </div>

      {/* Payment Button */}
      <div className="text-center">
        <button
          onClick={payWithPaystack}
          disabled={isProcessing}
          className={`py-2 px-6 rounded text-white flex items-center justify-center mx-auto ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isProcessing && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"
              ></path>
            </svg>
          )}
          {isProcessing ? "Processing Payment..." : "Pay Now"}
        </button>

        {/* Payment message */}
        {paymentMessage && (
          <p className="mt-4 text-green-700 font-semibold">{paymentMessage}</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
