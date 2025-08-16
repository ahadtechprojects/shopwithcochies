// src/pages/CheckoutPage.jsx
import React, { useState, useContext } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Calculate subtotal dynamically from cart
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const publicKey = "pk_test_3816c7f0cb9901eb48ce9073fe0eb6044545a526";
  const amount = subtotal * 100; // Paystack amount in kobo

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [readyForPayment, setReadyForPayment] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSuccess = () => {
    const uniqueId = uuidv4().split("-")[0].toUpperCase();
    const orderNumber = `ORD-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}${String(new Date().getDate()).padStart(
      2,
      "0"
    )}-${uniqueId}`;
    navigate("/thank-you", { state: { orderNumber, items: cartItems } });
  };

  const componentProps = {
    email: form.email,
    amount,
    metadata: {
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: cartItems,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => alert("Payment cancelled"),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setReadyForPayment(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <FaShoppingCart className="text-4xl text-black mx-auto mb-3" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Checkout</h2>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-100 p-4 rounded-md mb-6 text-left">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-1 text-sm"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <p className="mt-2 text-lg font-semibold">
              Subtotal: ₦{subtotal.toLocaleString()}
            </p>
          </>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="text-left">
        {/* Full Name */}
        <div className="flex items-center bg-gray-100 rounded-md p-3 mb-1">
          <FaUser className="text-green-600 mr-2" />
          <input
            className="flex-1 bg-transparent border-none outline-none text-sm"
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <small className="text-red-500">{errors.name}</small>}

        {/* Email */}
        <div className="flex items-center bg-gray-100 rounded-md p-3 mt-3 mb-1">
          <FaEnvelope className="text-green-600 mr-2" />
          <input
            className="flex-1 bg-transparent border-none outline-none text-sm"
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <small className="text-red-500">{errors.email}</small>}

        {/* Phone */}
        <div className="flex items-center bg-gray-100 rounded-md p-3 mt-3 mb-1">
          <FaPhone className="text-green-600 mr-2" />
          <input
            className="flex-1 bg-transparent border-none outline-none text-sm"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        {errors.phone && <small className="text-red-500">{errors.phone}</small>}

        {/* Address */}
        <div className="flex items-start bg-gray-100 rounded-md p-3 mt-3 mb-1">
          <FaMapMarkerAlt className="text-green-600 mr-2 mt-1" />
          <textarea
            className="flex-1 bg-transparent border-none outline-none text-sm resize-none"
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        {errors.address && (
          <small className="text-red-500">{errors.address}</small>
        )}

        {/* Buttons */}
        {!readyForPayment ? (
          <button
            type="submit"
            className="bg-green-600 text-white py-3 w-full rounded-md font-medium mt-4 hover:bg-green-700 transition"
          >
            Proceed to Payment
          </button>
        ) : (
          <PaystackButton
            {...componentProps}
            className="bg-black text-white py-3 w-full rounded-md font-medium mt-4 border border-green-600 animate-pulse"
          />
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;
