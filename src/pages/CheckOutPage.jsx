import React, { useState, useContext, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Shipping options
const shippingOptions = [
  { id: "standard", label: "Standard Delivery", details: "3-5 business days", price: 2000 },
  { id: "express", label: "Express Delivery", details: "1-2 business days", price: 5000 },
  { id: "pickup", label: "Store Pickup", details: "Available same day", price: 0 },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  // subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [shippingMethod, setShippingMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [readyForPayment, setReadyForPayment] = useState(false);

  const selectedOption = shippingOptions.find(
    (opt) => opt.id === shippingMethod
  );

  const total = subtotal + (selectedOption?.price || 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!shippingMethod) newErrors.shippingMethod = "Please select a shipping method";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle shipping choice
  const chooseShipping = (id) => {
    setShippingMethod(id);
    setIsModalOpen(false);
  };

  // handle Paystack success
  const handleSuccess = async (reference) => {
    try {
      const orderId = uuidv4();
      const user = auth.currentUser;

      await addDoc(collection(db, "orders"), {
        orderId,
        userId: user ? user.uid : null,
        customer: form,
        items: cartItems,
        shipping: selectedOption,
        total,
        reference,
        timestamp: serverTimestamp(),
      });

      clearCart();
      navigate("/order-success", { state: { orderId } });
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  // paystack config
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: form.email,
    amount: total * 100, // kobo
    publicKey: "pk_test_xxxxxxxxxx", // replace with your key
  };

  const handlePayNow = () => {
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
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-1 text-sm">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <p className="mt-2 text-sm">Subtotal: ₦{subtotal.toLocaleString()}</p>
        {selectedOption && (
          <p className="text-sm">
            Shipping: ₦{selectedOption.price.toLocaleString()}
          </p>
        )}
        <p className="mt-2 text-lg font-semibold">
          Total: ₦{total.toLocaleString()}
        </p>
      </div>

      {/* FORM */}
      <form className="text-left">
        <div className="mb-3">
          <label className="block text-gray-600">
            <FaUser className="inline mr-2" /> Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        <div className="mb-3">
          <label className="block text-gray-600">
            <FaEnvelope className="inline mr-2" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label className="block text-gray-600">
            <FaPhone className="inline mr-2" /> Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.phone && <small className="text-red-500">{errors.phone}</small>}
        </div>

        <div className="mb-3">
          <label className="block text-gray-600">
            <FaMapMarkerAlt className="inline mr-2" /> Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.address && (
            <small className="text-red-500">{errors.address}</small>
          )}
        </div>

        {/* Shipping Method */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md border text-center">
          <h3 className="font-semibold mb-2">Shipping Method</h3>
          <p className="text-gray-500 text-sm mb-2">
            {selectedOption
              ? `${selectedOption.label} - ₦${selectedOption.price.toLocaleString()}`
              : "Click below to choose a shipping method"}
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="border px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
          >
            {selectedOption ? "Change Shipping Method" : "Select a Shipping Method"}
          </button>
          {errors.shippingMethod && (
            <small className="text-red-500 block mt-1">{errors.shippingMethod}</small>
          )}
        </div>
      </form>

      {/* PAY BUTTON */}
      {!readyForPayment ? (
        <button
          onClick={handlePayNow}
          className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Pay Now
        </button>
      ) : (
        <PaystackButton
          {...paystackConfig}
          text="Pay Now"
          onSuccess={handleSuccess}
          onClose={() => alert("Payment closed")}
          className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        />
      )}

      {/* SHIPPING MODAL */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <Dialog.Title className="text-lg font-semibold mb-4">
                  Select Shipping
                </Dialog.Title>
                <div className="space-y-4">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => chooseShipping(option.id)}
                      className="flex justify-between items-start p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-bold">{option.label}</p>
                        <p className="text-gray-600 text-sm">{option.details}</p>
                      </div>
                      <p className="font-semibold">
                        ₦{option.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CheckoutPage;
